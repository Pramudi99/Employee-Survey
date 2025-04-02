





import React, { useState, useEffect, useRef, useMemo} from "react";
import {
  TextField,
  Grid,
  Typography,
  MenuItem,
  Button,
  IconButton,
  FormHelperText,
  Autocomplete
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import designations from "../../data/designation.json";
import organizationStructure from "../../data/organizationStructure.json";


// Location suggestions list
const LOCATION_SUGGESTIONS = [
  "Head Office",
  "Refinery",
  
];


const jobTypeMapping = {
  1: "Permanent",
  2: "Contract"
};

// Reverse mapping to convert string value to integer for the backend
const jobTypeReverseMapping = {
  "Permanent": 1,
  "Contract": 2
};


const textFieldTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            height: '45px',
            '& input': {
              color: '#2C3E50'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2C3E50'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2C3E50'
            }
          },
          '& .MuiInputLabel-root': {
            color: '#2C3E50'
          }
        }
      }
    }
  }
});

const EmploymentDetailsForm = ({ setEmploymentDetails, parentData }) => {
  const [employmentDetails, setLocalEmploymentDetails] = useState({
    epfNumber: "",
    presentJobType: "",
    presentJobCategory: "",
    presentDesignation: "",
    presentGrade: "",
    joinedAs: "",
    joinedDetails: {},
    employmentAddresses: [
      { addressType: "Permanent", location: "", function: "", subFunction: "" },
      { addressType: "Temporary", location: "", function: "", subFunction: "" },
    ],
    promotions: [{ 
      grade: "", 
      designation: "", 
      durationFrom: "", 
      durationTo: "", 
      location: "", 
      function: "", 
      subFunction: "" 
    }],
  });

  
 // Create a sorted array of unique designations for suggestions
 const DESIGNATION_SUGGESTIONS = useMemo(() => {
  // Remove duplicates and sort alphabetically
  return [...new Set(designations.map(d => d.designation))]
    .sort((a, b) => a.localeCompare(b));
}, []);


  

  
  // State to track validation errors
  const [errors, setErrors] = useState({});

  

  // Reference to track if update is from parent data
  const isUpdatingFromParent = useRef(false);
  // Reference to track initial render
  const isInitialRender = useRef(true);
  // Reference to store previous value for comparison
  const prevEmploymentDetails = useRef(employmentDetails);
  // Create refs for all required fields to enable focus navigation
  const fieldRefs = useRef({});

  // Function to register input field refs for navigation
  const registerFieldRef = (fieldName, element) => {
    if (element) {
      fieldRefs.current[fieldName] = element;
    }
  };



useEffect(() => {
  if (!parentData) return;
  
  isUpdatingFromParent.current = true;
  
  setLocalEmploymentDetails((prevDetails) => {
    // Check if this is a reset operation (all main fields are null)
    const isReset = parentData.presentJobCategory === null && 
                  parentData.presentDesignation === null && 
                  parentData.presentGrade === null;
    
    // If it's a reset, return the initial state
    if (isReset) {
      return {
        epfNumber: "",
        presentJobCategory: "",
        presentDesignation: "",
        presentGrade: "",
        joinedAs: "",
        joinedDetails: {
          joinedType: "",
          epfNumber: "", // Make sure this is initialized
          designation: "",
          grade: "",
          date: ""
        },
        employmentAddresses: [
          { addressType: "Permanent", location: "", function: "", subFunction: "" },
          { addressType: "Temporary", location: "", function: "", subFunction: "" },
        ],
        promotions: [],
      };
    }
    
    // Get the EPF number from parentData
    const epfNumber = parentData?.epfNumber || prevDetails.epfNumber;
    
    // Otherwise, handle regular updates
    const newDetails = {
      ...prevDetails,
      epfNumber: epfNumber, // Set at root level
      presentJobCategory: parentData?.presentJobCategory || prevDetails.presentJobCategory,
      presentDesignation: parentData?.presentDesignation || prevDetails.presentDesignation,
      presentGrade: parentData?.presentGrade || prevDetails.presentGrade,
      joinedAs: parentData?.joinedDetails?.joinedType || prevDetails.joinedAs,
      joinedDetails: parentData?.joinedDetails
        ? {
            joinedType: parentData.joinedDetails.joinedType || prevDetails.joinedDetails.joinedType,
            epfNumber: epfNumber, // Make sure to set here too
            designation: parentData.joinedDetails.designation || prevDetails.joinedDetails.designation,
            grade: parentData.joinedDetails.grade || prevDetails.joinedDetails.grade,
            date: parentData.joinedDetails.date || prevDetails.joinedDetails.date,
          }
        : {
          ...prevDetails.joinedDetails,
          // Also update EPF number in joinedDetails
          epfNumber: epfNumber
        },
      promotions: Array.isArray(parentData?.promotions) ? parentData.promotions : prevDetails.promotions,
      employmentAddresses: Array.isArray(parentData?.employmentAddresses) ? parentData.employmentAddresses : prevDetails.employmentAddresses,
    };

    // Prevent unnecessary updates
    if (JSON.stringify(prevDetails) === JSON.stringify(newDetails)) {
      return prevDetails;
    }
    
    return newDetails;
  });
}, [parentData]);


  
 // Update the useEffect that updates the parent component
useEffect(() => {
  if (isInitialRender.current) {
    isInitialRender.current = false;
    return;
  }
  
  // Skip if update is from parent
  if (isUpdatingFromParent.current) {
    isUpdatingFromParent.current = false;
    return;
  }
  
  // Validate all promotions
  const hasPromotionErrors = validateAllPromotions();
  
  // Check if the data has actually changed and there are no promotion errors
  if (!hasPromotionErrors && JSON.stringify(prevEmploymentDetails.current) !== JSON.stringify(employmentDetails)) {
    setEmploymentDetails(employmentDetails);
    prevEmploymentDetails.current = employmentDetails;
  }
}, [employmentDetails, setEmploymentDetails]);
  // Add this function to validate all promotions
const validateAllPromotions = () => {
  let hasErrors = false;
  const newPromotionErrors = [];
  
  employmentDetails.promotions.forEach((promotion, index) => {
    const hasAnyValue = Object.values(promotion).some(val => val !== "");
    
    if (hasAnyValue) {
      const errors = {};
      if (!promotion.grade) errors.grade = "Required";
      if (!promotion.designation) errors.designation = "Required";
      if (!promotion.durationFrom) errors.durationFrom = "Required";
      if (!promotion.durationTo) errors.durationTo = "Required";
      if (!promotion.location) errors.location = "Required";
      if (!promotion.function) errors.function = "Required";
      if (promotion.function && !promotion.subFunction) errors.subFunction = "Required";
      
      if (Object.keys(errors).length > 0) {
        hasErrors = true;
      }
      
      newPromotionErrors[index] = errors;
    } else {
      newPromotionErrors[index] = {};
    }
  });
  
  setPromotionErrors(newPromotionErrors);
  return hasErrors;
};
// Update the state to track promotion errors
const [promotionErrors, setPromotionErrors] = useState([]);



  // Function to handle key down event
  const handleKeyDown = (e, fieldName, nextFieldName) => {
    // If Enter key is pressed
    if (e.key === "Enter") {
      e.preventDefault();
      
      // Get the current field value
      const value = e.target.value;
      const error = validateField(fieldName, value);
      
      // Update errors state
      setErrors(prev => ({
        ...prev,
        [fieldName]: error
      }));
      
      // If field is valid and nextFieldName exists, focus on next field
      if (!error && nextFieldName && fieldRefs.current[nextFieldName]) {
        fieldRefs.current[nextFieldName].focus();
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for presentJobType
    if (name === "presentJobType") {
      // Check if the value exists in jobTypeReverseMapping
      const intValue = jobTypeReverseMapping[value];
      
      if (intValue !== undefined) {
        // If it's a valid value, store the corresponding integer in the state
        setLocalEmploymentDetails((prevDetails) => ({
          ...prevDetails,
          [name]: intValue, // Store the integer value for presentJobType
        }));
      } else {
        // Handle invalid value case
        console.error(`Invalid value selected for presentJobType: ${value}`);
      }
    } else {
      // For other fields, update the state normally
      setLocalEmploymentDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
        // If the 'joinedAs' field is updated, also update the 'joinedDetails' structure accordingly
        ...(name === "joinedAs" && {
          joinedDetails: value === "Permanent"
            ? { joinedType: "Permanent", epfNumber: "", designation: "", grade: "", date: "" }
            : { joinedType: "Contract", epfNumber: "", designation: "", grade: "", date: "" },
        }),
      }));
    }
  
    // Clear any errors for the changed field
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  
  


  const handleJoinedDetailsChange = (field, value) => {
    // Clear error when user types
    setErrors(prev => ({
      ...prev,
      [`joinedDetails.${field}`]: ""
    }));
    
    setLocalEmploymentDetails((prevDetails) => ({
      ...prevDetails,
      joinedDetails: { ...prevDetails.joinedDetails, [field]: value },
    }));
  };


   // New function to get function suggestions based on location
  const getFunctionSuggestions = (location) => {
    // Convert location to uppercase for case-insensitive matching
    const normalizedLocation = location.toUpperCase();
    
    // Check if the location exists in the organization structure
    const matchingLocation = Object.keys(organizationStructure).find(
      key => key.toUpperCase() === normalizedLocation
    );

    if (matchingLocation) {
      // Return the functions for the matching location
      return Object.keys(organizationStructure[matchingLocation]);
    }

    return [];
  };


 // New function to get sub-function suggestions based on location and function
 const getSubFunctionSuggestions = (location, functionValue) => {
  // Convert location and function to uppercase for case-insensitive matching
  const normalizedLocation = location.toUpperCase();
  const normalizedFunction = functionValue.toUpperCase();
  
  // Check if the location exists in the organization structure
  const matchingLocation = Object.keys(organizationStructure).find(
    key => key.toUpperCase() === normalizedLocation
  );

  if (matchingLocation) {
    // Find the matching function
    const matchingFunction = Object.keys(organizationStructure[matchingLocation]).find(
      func => func.toUpperCase() === normalizedFunction
    );

    if (matchingFunction) {
      // Return the sub-functions for the matching function
      return organizationStructure[matchingLocation][matchingFunction];
    }
  }

  return [];
};

     // Modify handleEmploymentAddressChange to incorporate new suggestions
  const handleEmploymentAddressChange = (index, field, value) => {
    setLocalEmploymentDetails((prevDetails) => {
      const updatedAddresses = prevDetails.employmentAddresses.map((address, i) => {
        if (i === index) {
          // If changing the location, reset function and subFunction
          if (field === "location") {
            return { 
              ...address, 
              [field]: value, 
              function: "", 
              subFunction: "" 
            };
          }
          // If changing the function, reset subFunction
          if (field === "function") {
            return { 
              ...address, 
              [field]: value, 
              subFunction: "" 
            };
          }
          return { ...address, [field]: value };
        }
        return address;
      });
      return { ...prevDetails, employmentAddresses: updatedAddresses };
    });
  };




  // Modify the promotion-related changes similarly
  const handlePromotionChange = (index, field, value) => {
    setLocalEmploymentDetails((prevDetails) => {
      const updatedPromotions = [...prevDetails.promotions];
      
      // If changing the location, reset function and subFunction
      if (field === "location") {
        updatedPromotions[index] = { 
          ...updatedPromotions[index], 
          [field]: value,
          function: "",
          subFunction: "" 
        };
      }
      // If changing the function, reset subFunction
      else if (field === "function") {
        updatedPromotions[index] = { 
          ...updatedPromotions[index], 
          [field]: value,
          subFunction: "" 
        };
      } else {
        updatedPromotions[index][field] = value;
      }
    
    // Check if any field has a value - if so, validate all fields
    const promotionData = updatedPromotions[index];
    const hasAnyValue = Object.values(promotionData).some(val => val !== "");
    
    if (hasAnyValue) {
      // If any field has a value, validate all fields
      const newErrors = {};
      if (!promotionData.grade) newErrors.grade = "Required";
      if (!promotionData.designation) newErrors.designation = "Required";
      if (!promotionData.durationFrom) newErrors.durationFrom = "Required";
      if (!promotionData.durationTo) newErrors.durationTo = "Required";
      if (!promotionData.location) newErrors.location = "Required";
      if (!promotionData.function) newErrors.function = "Required";
      if (promotionData.function && !promotionData.subFunction) newErrors.subFunction = "Required";
      
      // Update promotion errors state
      setPromotionErrors(prev => {
        const updated = [...prev];
        updated[index] = newErrors;
        return updated;
      });
    }
    
    return {
      ...prevDetails,
      promotions: updatedPromotions,
    };
  });
};
// Update the addPromotion function to initialize errors
const addPromotion = () => {
  setLocalEmploymentDetails((prevDetails) => ({
    ...prevDetails,
    promotions: [...prevDetails.promotions, { 
      grade: "", 
      designation: "", 
      durationFrom: "", 
      durationTo: "", 
      location: "", 
      function: "", 
      subFunction: "" 
    }],
  }));
  
  // Add empty errors object for the new promotion
  setPromotionErrors(prev => [...prev, {}]);
};

// Update the removePromotion function to also remove errors
const removePromotion = (index) => {
  setLocalEmploymentDetails((prevDetails) => ({
    ...prevDetails,
    promotions: prevDetails.promotions.filter((_, i) => i !== index)
  }));
  
  setPromotionErrors(prev => prev.filter((_, i) => i !== index));
};
 
  return (
     <ThemeProvider theme={textFieldTheme}>
    <Grid container spacing={2} sx={{ mt: 2}}>
       <Typography sx={{ ml: 3.5, mt: 2 }} variant="h4" gutterBottom style={{ fontStyle: "italic", color:"#800020", fontFamily: 'Roboto, sans-serif', }}>
        Employment Details 
        </Typography>
        <Grid item xs={11.8} container spacing={1} sx={{ ml: 1 }}>
        <Grid container spacing={2}>
  <Grid item xs={12}>
              <Grid  
                       container 
                       alignItems="center" 
                       sx={{ 
                         ml: 2, 
                         mt: -1, 
                         backgroundColor: "#E0E0E0" ,
                         borderRadius: 1, 
                         boxShadow: 3,
                        
                       }}
                       
                     >
                      <Typography 
                        sx={{ ml: 2, mt: 0 }} 
                        variant="h6" 
                        gutterBottom 
                        style={{ fontStyle: "italic", color: "rgb(58, 53, 54)", fontFamily: 'Roboto, sans-serif', textAlign: "left" }}
                      >
                        Details of Employment location
                      </Typography>
                    </Grid>
                    </Grid>

  {employmentDetails?.employmentAddresses?.map((address, index) => (
    <Grid item xs={12} sx={{ ml: 2}} sm={5.7} key={index}> {/* Each address takes half width */}
      <Grid
        container
        spacing={1}
        sx={{ mb: 2,  }} 
      >
        <Grid item xs={12}>
          <Typography variant="subtitle1" style={{ fontStyle: "italic" }} >
            {address.addressType} Location
          </Typography>
        </Grid>
        <Grid item xs={12}>
        <Autocomplete
          freeSolo
          options={LOCATION_SUGGESTIONS}
          value={address.location}
          onChange={(_, newValue) => handleEmploymentAddressChange(index, "location", newValue || "")}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Location"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const functionField = document.querySelector(`input[name="address-${index}-function"]`);
                  if (functionField) functionField.focus();
                }
              }}
              inputRef={(el) => registerFieldRef(`address-${index}-location`, el)}
              name={`address-${index}-location`}
            />
          )}
        />
      </Grid>

        {/* Update Function field in employment addresses */}
        <Grid item xs={12}>
        <TextField
          select
          fullWidth
          label="Function"
          value={address.function}
          onChange={(e) => handleEmploymentAddressChange(index, "function", e.target.value)}
          disabled={!address.location} // Disable if no location is selected
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const subFunctionField = document.querySelector(`input[name="address-${index}-subFunction"]`);
              if (subFunctionField) subFunctionField.focus();
            }
          }}
          inputRef={(el) => registerFieldRef(`address-${index}-function`, el)}
          name={`address-${index}-function`}
        >
          {getFunctionSuggestions(address.location).map((func) => (
            <MenuItem key={func} value={func}>
              {func}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

        {/* Replace the Sub Function TextField in the employment addresses section */}
        <Grid item xs={12}>
        <TextField
          select
          fullWidth
          label="Sub Function"
          value={address.subFunction}
          onChange={(e) => handleEmploymentAddressChange(index, "subFunction", e.target.value)}
          disabled={!address.function} // Disable if no function is selected
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              // Focus on the next logical field
              const nextIndex = index + 1;
              if (nextIndex < employmentDetails.employmentAddresses.length) {
                const nextField = document.querySelector(`input[name="address-${nextIndex}-location"]`);
                if (nextField) nextField.focus();
              } else {
                // If this is the last address, move to presentJobCategory
                if (fieldRefs.current.presentJobCategory) {
                  fieldRefs.current.presentJobCategory.focus();
                }
              }
            }
          }}
          inputRef={(el) => registerFieldRef(`address-${index}-subFunction`, el)}
          name={`address-${index}-subFunction`}
        >
          {getSubFunctionSuggestions(address.location, address.function).map((subFunc) => (
            <MenuItem key={subFunc} value={subFunc}>
              {subFunc}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      </Grid>
    </Grid>
  ))}
</Grid>

      


      <Grid item xs={11.7} container spacing={1} sx={{ ml: 0 }}>
      <Grid item xs={12} sm={3}>
      <TextField
          select
          label="Present Job Type"
          name="presentJobType"
          fullWidth
          variant="outlined"
          value={employmentDetails.presentJobType ? jobTypeMapping[employmentDetails.presentJobType] : "Permanent"}
          onChange={handleChange}
          required
          error={!!errors.presentJobType}
          helperText={errors.presentJobType}
          inputRef={(el) => registerFieldRef("presentJobType", el)}
        >
          <MenuItem value="Permanent">Permanent</MenuItem>
          <MenuItem value="Contract">Contract</MenuItem>
        </TextField>

              </Grid>





        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Present Job Category"
            name="presentJobCategory"
            fullWidth
            variant="outlined"
            value={employmentDetails.presentJobCategory}
            onChange={handleChange}
            required
            error={!!errors.presentJobCategory}
            helperText={errors.presentJobCategory}
            onKeyDown={(e) => handleKeyDown(e, "presentJobCategory", "presentDesignation")}
            inputRef={(el) => registerFieldRef("presentJobCategory", el)}
          >
            <MenuItem value="Executive">Executive</MenuItem>
            <MenuItem value="Non Executive">Non Executive</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
  <Autocomplete
    freeSolo
    options={DESIGNATION_SUGGESTIONS}
    value={employmentDetails.presentDesignation || ""}  // Set the value of presentDesignation
    onChange={(_, newValue) => handleChange({
      target: { name: "presentDesignation", value: newValue || "" }
    })}
    renderInput={(params) => (
      <TextField
        {...params}
        fullWidth
        label="Present Designation"
        required
        error={!!errors.presentDesignation}
        helperText={errors.presentDesignation || ""}
        onKeyDown={(e) => handleKeyDown(e, "presentDesignation", "presentGrade")}
        inputRef={(el) => registerFieldRef("presentDesignation", el)}
      />
    )}
    filterOptions={(options, { inputValue }) => {
      return options.filter(option => 
        option.toLowerCase().includes(inputValue.toLowerCase())
      );
    }}
  />
</Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            select label="Present Grade"
            name="presentGrade"
            value={employmentDetails.presentGrade}
            onChange={handleChange}
            required
            error={!!errors.presentGrade}
            helperText={errors.presentGrade}
            onKeyDown={(e) => handleKeyDown(e, "presentGrade", "joinedAs")}
            inputRef={(el) => registerFieldRef("presentGrade", el)}
          >
            <MenuItem value="A1">A1</MenuItem>
            <MenuItem value="A2">A2</MenuItem>
            <MenuItem value="A3">A3</MenuItem>
            <MenuItem value="A4">A4</MenuItem>
            <MenuItem value="A5">A5</MenuItem>
            <MenuItem value="A6">A6</MenuItem>
            <MenuItem value="A7">A7</MenuItem>
            <MenuItem value="B1">B1</MenuItem>
            <MenuItem value="B2">B2</MenuItem>
            <MenuItem value="B3">B3</MenuItem>
            <MenuItem value="C1">C1</MenuItem>
            <MenuItem value="C2">C2</MenuItem>
            <MenuItem value="C3">C3</MenuItem>
            <MenuItem value="C4">C4</MenuItem>
            </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Joined As"
            name="joinedAs"
            value={employmentDetails.joinedAs}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.joinedAs}
            helperText={errors.joinedAs}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                // Focus on the first field of the joinedDetails section based on selection
                if (employmentDetails.joinedAs) {
                  if (fieldRefs.current["joinedDetails.epfNumber"]) {
                    fieldRefs.current["joinedDetails.epfNumber"].focus();
                  }
                }
              }
            }}
            inputRef={(el) => registerFieldRef("joinedAs", el)}
          >
            <MenuItem value="Permanent">Permanent</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {employmentDetails.joinedAs === "Permanent" && (
        <Grid container spacing={2} sx={{ mt: 3, ml: 2 }}>
          {/* <Grid item xs={12} sm={5.5}>
            <TextField
              fullWidth
              label="EPF Number"
              // value={employmentDetails.joinedDetails.epfNumber || ""}
              value={employmentDetails.epfNumber}
          InputProps={{ readOnly: true }}
              onChange={(e) => handleJoinedDetailsChange("epfNumber", e.target.value)}
              required
              error={!!errors["joinedDetails.epfNumber"]}
              helperText={errors["joinedDetails.epfNumber"]}
              onKeyDown={(e) => handleKeyDown(e, "joinedDetails.epfNumber", "joinedDetails.designation")}
              inputRef={(el) => registerFieldRef("joinedDetails.epfNumber", el)}
            />
          </Grid> */}
           <Grid item xs={12} sm={5.5}>
            <TextField
              fullWidth
              label="EPF Number"
              value={employmentDetails.epfNumber || employmentDetails.joinedDetails.epfNumber || ""}
              InputProps={{ readOnly: true }}
              onChange={(e) => {
                // Update both locations to keep them in sync
                setLocalEmploymentDetails(prev => ({
                  ...prev,
                  epfNumber: e.target.value,
                  joinedDetails: {
                    ...prev.joinedDetails,
                    epfNumber: e.target.value
                  }
                }));
              }}
              required
              error={!!errors["joinedDetails.epfNumber"]}
              helperText={errors["joinedDetails.epfNumber"]}
              onKeyDown={(e) => handleKeyDown(e, "joinedDetails.epfNumber", "joinedDetails.designation")}
              inputRef={(el) => registerFieldRef("joinedDetails.epfNumber", el)}
            />
          </Grid>

          <Grid item xs={12} sm={5.5}>
        <Autocomplete
          freeSolo
          options={DESIGNATION_SUGGESTIONS}
          value={employmentDetails.joinedDetails.designation || ""}
          onChange={(_, newValue) => handleJoinedDetailsChange("designation", newValue || "")}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Designation"
              required
              error={!!errors["joinedDetails.designation"]}
              helperText={errors["joinedDetails.designation"]}
              onKeyDown={(e) => handleKeyDown(e, "joinedDetails.designation", "joinedDetails.grade")}
              inputRef={(el) => registerFieldRef("joinedDetails.designation", el)}
            />
          )}
          filterOptions={(options, { inputValue }) => {
            return options.filter(option => 
              option.toLowerCase().includes(inputValue.toLowerCase())
            );
          }}
        />
      </Grid>
          <Grid item xs={12} sm={5.5}>
            <TextField
              fullWidth
              select label="Grade"
              value={employmentDetails.joinedDetails.grade || ""}
              onChange={(e) => handleJoinedDetailsChange("grade", e.target.value)}
              required
              error={!!errors["joinedDetails.grade"]}
              helperText={errors["joinedDetails.grade"]}
              onKeyDown={(e) => handleKeyDown(e, "joinedDetails.grade", "joinedDetails.date")}
              inputRef={(el) => registerFieldRef("joinedDetails.grade", el)}
              >
             <MenuItem value="A1">A1</MenuItem>
              <MenuItem value="A2">A2</MenuItem>
              <MenuItem value="A3">A3</MenuItem>
              <MenuItem value="A4">A4</MenuItem>
              <MenuItem value="A5">A5</MenuItem>
              <MenuItem value="A6">A6</MenuItem>
              <MenuItem value="A7">A7</MenuItem>
              <MenuItem value="B1">B1</MenuItem>
              <MenuItem value="B2">B2</MenuItem>
              <MenuItem value="B3">B3</MenuItem>
              <MenuItem value="C1">C1</MenuItem>
              <MenuItem value="C2">C2</MenuItem>
              <MenuItem value="C3">C3</MenuItem>
              <MenuItem value="C4">C4</MenuItem>
             </TextField>
          </Grid>
          <Grid item xs={12} sm={5.5}>
            <TextField
              fullWidth
              label="Date of Joining"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={employmentDetails.joinedDetails.date || ""}
              onChange={(e) => handleJoinedDetailsChange("date", e.target.value)}
              required
              error={!!errors["joinedDetails.date"]}
              helperText={errors["joinedDetails.date"]}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (!e.target.value) {
                    setErrors(prev => ({
                      ...prev,
                      "joinedDetails.date": "Date is required"
                    }));
                  }
                }
              }}
              inputRef={(el) => registerFieldRef("joinedDetails.date", el)}
            />
          </Grid>
        </Grid>
      )}

      {employmentDetails.joinedAs === "Contract" && (
        <Grid container spacing={2} sx={{ mt: 3 , ml : 2}}>
          <Grid item xs={12} sm={5.5}>
            <TextField
              fullWidth
              label="Contract No"
              value={employmentDetails.epfNumber || employmentDetails.joinedDetails.epfNumber || ""}
              InputProps={{ readOnly: true }}
              onChange={(e) => {
                // Update both locations to keep them in sync
                setLocalEmploymentDetails(prev => ({
                  ...prev,
                  epfNumber: e.target.value,
                  joinedDetails: {
                    ...prev.joinedDetails,
                    epfNumber: e.target.value
                  }
                }));
              }}
              required
              error={!!errors["joinedDetails.epfNumber"]}
              helperText={errors["joinedDetails.epfNumber"]}
              onKeyDown={(e) => handleKeyDown(e, "joinedDetails.epfNumber", "joinedDetails.designation")}
              inputRef={(el) => registerFieldRef("joinedDetails.epfNumber", el)}
            />
          </Grid>
          <Grid item xs={12} sm={5.5}>
            <TextField
              fullWidth
              label="Designation"
              value={employmentDetails.joinedDetails.designation || ""}
              onChange={(e) => handleJoinedDetailsChange("designation", e.target.value)}
              required
              error={!!errors["joinedDetails.designation"]}
              helperText={errors["joinedDetails.designation"]}
              onKeyDown={(e) => handleKeyDown(e, "joinedDetails.designation", "joinedDetails.grade")}
              inputRef={(el) => registerFieldRef("joinedDetails.designation", el)}
            />
          </Grid>
          <Grid item xs={12} sm={5.5}>
            <TextField
              fullWidth
              select label="Grade"
              value={employmentDetails.joinedDetails.grade || ""}
              onChange={(e) => handleJoinedDetailsChange("grade", e.target.value)}
              required
              error={!!errors["joinedDetails.grade"]}
              helperText={errors["joinedDetails.grade"]}
              onKeyDown={(e) => handleKeyDown(e, "joinedDetails.grade", "joinedDetails.date")}
              inputRef={(el) => registerFieldRef("joinedDetails.grade", el)}
              >
             <MenuItem value="A1">A1</MenuItem>
              <MenuItem value="A2">A2</MenuItem>
              <MenuItem value="A3">A3</MenuItem>
              <MenuItem value="A4">A4</MenuItem>
              <MenuItem value="A5">A5</MenuItem>
              <MenuItem value="A6">A6</MenuItem>
              <MenuItem value="A7">A7</MenuItem>
              <MenuItem value="B1">B1</MenuItem>
              <MenuItem value="B2">B2</MenuItem>
              <MenuItem value="B3">B3</MenuItem>
              <MenuItem value="C1">C1</MenuItem>
              <MenuItem value="C2">C2</MenuItem>
              <MenuItem value="C3">C3</MenuItem>
              <MenuItem value="C4">C4</MenuItem>
             </TextField>
          </Grid>
          <Grid item xs={12} sm={5.5}>
            <TextField
              fullWidth
              label="Date of Joining"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={employmentDetails.joinedDetails.date || ""}
              onChange={(e) => handleJoinedDetailsChange("date", e.target.value)}
              required
              error={!!errors["joinedDetails.date"]}
              helperText={errors["joinedDetails.date"]}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (!e.target.value) {
                    setErrors(prev => ({
                      ...prev,
                      "joinedDetails.date": "Date is required"
                    }));
                  }
                }
              }}
              inputRef={(el) => registerFieldRef("joinedDetails.date", el)}
            />
          </Grid>
        </Grid>
      )}
 

     <Grid >
        <Grid   container alignItems="center" sx={{ ml: 4, mt: 6 }}>
          <Grid item xs={11.7}>
          <Grid  
                      container 
                      alignItems="center" 
                      sx={{ 
                        ml: -2, 
                        mt: 10, 
                        backgroundColor: "#E0E0E0" ,
                        borderRadius: 1, 
                        boxShadow: 3,  
                      }}
                            >
          <Typography 
          sx={{ ml: 0, mt: 1 }}
            variant="h6" 
            gutterBottom 
            style={{ fontStyle: "italic", color: "rgb(36, 36, 30)", 
              fontFamily: 'Roboto, sans-serif', textAlign: "left", 
             }}
          >
            If you have promotions
           
          </Typography>
        </Grid>
        </Grid>
        </Grid>
      {employmentDetails?.promotions?.map((promotion, index) => (
        <Grid
          container
          spacing={2}
          key={index}
          sx={{ mt: 0, p: 2, }}
        >
       <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            select label="Grade"
            value={promotion.grade}
            onChange={(e) => handlePromotionChange(index, "grade", e.target.value)}
            error={!!(promotionErrors[index] && promotionErrors[index].grade)}
            helperText={promotionErrors[index]?.grade || ""}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const designationField = document.querySelector(`input[name="promotion-${index}-designation"]`);
                if (designationField) designationField.focus();
              }
            }}
            inputRef={(el) => registerFieldRef(`promotion-${index}-grade`, el)}
            name={`promotion-${index}-grade`}
            required={Object.values(promotion).some(val => val !== "")}
          >
          <MenuItem value="A1">A1</MenuItem>
          <MenuItem value="A2">A2</MenuItem>
          <MenuItem value="A3">A3</MenuItem>
          <MenuItem value="A4">A4</MenuItem>
          <MenuItem value="A5">A5</MenuItem>
          <MenuItem value="A6">A6</MenuItem>
          <MenuItem value="A7">A7</MenuItem>
          <MenuItem value="B1">B1</MenuItem>
          <MenuItem value="B2">B2</MenuItem>
          <MenuItem value="B3">B3</MenuItem>
          <MenuItem value="C1">C1</MenuItem>
          <MenuItem value="C2">C2</MenuItem>
          <MenuItem value="C3">C3</MenuItem>
          <MenuItem value="C4">C4</MenuItem>
          </TextField> 
          </Grid>

          {/* <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Designation"
            value={promotion.designation}
            onChange={(e) => handlePromotionChange(index, "designation", e.target.value)}
            error={!!(promotionErrors[index] && promotionErrors[index].designation)}
            helperText={promotionErrors[index]?.designation || ""}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const fromField = document.querySelector(`input[name="promotion-${index}-durationFrom"]`);
                if (fromField) fromField.focus();
              }
            }}
            inputRef={(el) => registerFieldRef(`promotion-${index}-designation`, el)}
            name={`promotion-${index}-designation`}
            required={Object.values(promotion).some(val => val !== "")}
          />
          </Grid> */}


<Grid item xs={12} sm={3}>
        <Autocomplete
          freeSolo
          options={DESIGNATION_SUGGESTIONS}
          value={promotion.designation}
          onChange={(_, newValue) => handlePromotionChange(index, "designation", newValue || "")}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Designation"
              error={!!(promotionErrors[index] && promotionErrors[index].designation)}
              helperText={promotionErrors[index]?.designation || ""}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const fromField = document.querySelector(`input[name="promotion-${index}-durationFrom"]`);
                  if (fromField) fromField.focus();
                }
              }}
              inputRef={(el) => registerFieldRef(`promotion-${index}-designation`, el)}
              name={`promotion-${index}-designation`}
              required={Object.values(promotion).some(val => val !== "")}
            />
          )}
          filterOptions={(options, { inputValue }) => {
            return options.filter(option => 
              option.toLowerCase().includes(inputValue.toLowerCase())
            );
          }}
        />
      </Grid>

          <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Start From"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={promotion.durationFrom}
            onChange={(e) => handlePromotionChange(index, "durationFrom", e.target.value)}
            error={!!(promotionErrors[index] && promotionErrors[index].durationFrom)}
            helperText={promotionErrors[index]?.durationFrom || ""}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const toField = document.querySelector(`input[name="promotion-${index}-durationTo"]`);
                if (toField) toField.focus();
              }
            }}
            inputRef={(el) => registerFieldRef(`promotion-${index}-durationFrom`, el)}
            name={`promotion-${index}-durationFrom`}
            required={Object.values(promotion).some(val => val !== "")}
          />
          </Grid>



          <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Start To"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={promotion.durationTo}
            onChange={(e) => handlePromotionChange(index, "durationTo", e.target.value)}
            error={!!(promotionErrors[index] && promotionErrors[index].durationTo)}
            helperText={promotionErrors[index]?.durationTo ||""}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const toField = document.querySelector(`input[name="promotion-${index}-location"]`);
                if (toField) toField.focus();
              }
            }}
            inputRef={(el) => registerFieldRef(`promotion-${index}-durationTo`, el)}
            name={`promotion-${index}-durationTo`}
            required={Object.values(promotion).some(val => val !== "")}
          />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Autocomplete
              freeSolo
              options={LOCATION_SUGGESTIONS}
              value={promotion.location}
              onChange={(_, newValue) => handlePromotionChange(index, "location", newValue || "")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Location"
                  error={!!(promotionErrors[index] && promotionErrors[index].location)}
                  helperText={promotionErrors[index]?.location || ""}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const functionField = document.querySelector(`input[name="promotion-${index}-function"]`);
                      if (functionField) functionField.focus();
                    }
                  }}
                  inputRef={(el) => registerFieldRef(`promotion-${index}-location`, el)}
                  name={`promotion-${index}-location`}
                  required={Object.values(promotion).some(val => val !== "")}
                />
              )}
            />
          </Grid>

              <Grid item xs={12} sm={3}>
        <TextField
          select
          fullWidth
          label="Function"
          value={promotion.function}
          onChange={(e) => handlePromotionChange(index, "function", e.target.value)}
          disabled={!promotion.location}
          error={!!(promotionErrors[index] && promotionErrors[index].function)}
          helperText={promotionErrors[index]?.function || ""}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const subFunctionField = document.querySelector(`input[name="promotion-${index}-subFunction"]`);
              if (subFunctionField) subFunctionField.focus();
            }
          }}
          inputRef={(el) => registerFieldRef(`promotion-${index}-function`, el)}
          name={`promotion-${index}-function`}
          required={Object.values(promotion).some(val => val !== "")}
        >
          {getFunctionSuggestions(promotion.location).map((func) => (
            <MenuItem key={func} value={func}>
              {func}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField
          select
          fullWidth
          label="Sub Function"
          value={promotion.subFunction}
          onChange={(e) => handlePromotionChange(index, "subFunction", e.target.value)}
          disabled={!promotion.function}
          error={!!(promotionErrors[index] && promotionErrors[index].subFunction)}
          helperText={promotionErrors[index]?.subFunction || ""}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              // Focus on the first field of the next promotion if available
              const nextIndex = index + 1;
              if (nextIndex < employmentDetails.promotions.length) {
                const nextField = document.querySelector(`input[name="promotion-${nextIndex}-grade"]`);
                if (nextField) nextField.focus();
              }
            }
          }}
          inputRef={(el) => registerFieldRef(`promotion-${index}-subFunction`, el)}
          name={`promotion-${index}-subFunction`}
          required={promotion.function && Object.values(promotion).some(val => val !== "")}
        >
          {getSubFunctionSuggestions(promotion.location, promotion.function).map((subFunc) => (
            <MenuItem key={subFunc} value={subFunc}>
              {subFunc}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

          <Grid item xs={12}>
              <IconButton onClick={() => removePromotion(index)} color="error">
                <Delete />
              </IconButton>
          </Grid>
        </Grid>
      ))}

      <Grid item xs={12}>
            <Button variant="text" startIcon={<Add />} onClick={addPromotion} sx={{ mt: 2 }}>
                Add Promotion
            </Button>
      </Grid>
      </Grid>
    </Grid>
    </Grid>
    </ThemeProvider>
  );
};

export default EmploymentDetailsForm;









