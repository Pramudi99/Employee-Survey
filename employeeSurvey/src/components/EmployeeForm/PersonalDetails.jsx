import React, { useState, useEffect, useRef, useCallback } from "react";
import { TextField, Grid, MenuItem, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Button, IconButton } from "@mui/material";

// Religion mapping between UI strings and DB numbers
const religionMapping = {
  // String to number (for DB storage)
  stringToNumber: {
    "Buddhism": 1,
    "Hindu": 2,
    "Islam": 3,
    "Christianity": 4,
    "Other": 5
  },
  // Number to string (for UI display)
  numberToString: {
    1: "Buddhism",
    2: "Hindu",
    3: "Islam",
    4: "Christianity",
    5: "Other"
  }
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

const PersonalDetailsForm = ({ setPersonalDetails, parentData, checkEPFExistence }) => {
  const [formData, setFormData] = useState({
    profileImage: null,
    imageContentType: "",
    epfNumber: "",
    nameWithInitials: "",
    title: "",
    fullName: "",
    gender: "",
    maritalStatus: "",
    bloodGroup: "",
    dateOfBirth: "",
    nicNumber: "",
    drivingLicense: "",
    passportNumber: "",
    religion: "",  // Will store numeric value
    religionDisplay: "", // For internal use to handle the UI display
    race: "",
    numberOfDependents: "",
  });

  const [errors, setErrors] = useState({
    epfNumber: false,
    nameWithInitials: false,
    title: false,
    fullName: false,
    nicNumber: false,
    dateOfBirth: false,
    maritalStatus: false,
    religion: false,
    race: false,
    numberOfDependents: false,
  });

  const [errorMessages, setErrorMessages] = useState({
    epfNumber: "",
    nameWithInitials: "",
    title: "",
    fullName: "",
    nicNumber: "",
    dateOfBirth: "",
    maritalStatus: "",
    religion: "",
    race: "",
    numberOfDependents: "",
  });

  const [showErrors, setShowErrors] = useState({
    epfNumber: false,
    nameWithInitials: false,
    title: false,
    fullName: false,
    nicNumber: false,
    dateOfBirth: false,
    maritalStatus: false,
    religion: false,
    race: false,
    numberOfDependents: false,
  });

  // Define the order and dependencies of fields
  const fieldDependencies = {
    title: ["epfNumber"],
    nameWithInitials: ["epfNumber", "title"],
    fullName: ["epfNumber", "title", "nameWithInitials"],
    nicNumber: ["epfNumber", "title", "nameWithInitials", "fullName"],
    dateOfBirth: ["epfNumber", "title", "nameWithInitials", "fullName", "nicNumber"],
    drivingLicense: ["epfNumber", "title", "nameWithInitials", "fullName", "nicNumber", "dateOfBirth"],
    passportNumber: ["epfNumber", "title", "nameWithInitials", "fullName", "nicNumber", "dateOfBirth"],
    maritalStatus: ["epfNumber", "title", "nameWithInitials", "fullName", "nicNumber", "dateOfBirth"],
    religion: ["epfNumber", "title", "nameWithInitials", "fullName", "nicNumber", "dateOfBirth", "maritalStatus"],
    race: ["epfNumber", "title", "nameWithInitials", "fullName", "nicNumber", "dateOfBirth", "maritalStatus", "religion"],
    bloodGroup: ["epfNumber", "title", "nameWithInitials", "fullName", "nicNumber", "dateOfBirth", "maritalStatus", "religion", "race"],
    numberOfDependents: ["epfNumber", "title", "nameWithInitials", "fullName", "nicNumber", "dateOfBirth", "maritalStatus", "religion", "race"]
  };

  // Add this new state for the image preview
  const [imagePreview, setImagePreview] = useState(null);

  const [isNicValidated, setIsNicValidated] = useState(false);

  const fieldRefs = useRef({});

  const fieldOrder = [
    "epfNumber", "title", "nameWithInitials", "fullName", "nicNumber",
    "dateOfBirth", "drivingLicense", "passportNumber",
    "maritalStatus", "religion", "race", "bloodGroup", "numberOfDependents"
  ];

  // Reset form when parent data changes
  useEffect(() => {
    if (parentData) {
      // Convert numeric religion to display string if present
      const processedData = { ...parentData };

      if (parentData.profileImage && parentData.imageContentType) {
        setImagePreview(`data:${parentData.imageContentType};base64,${parentData.profileImage}`);
      }
      
      if (processedData.religion && typeof processedData.religion === 'number') {
        // Store the display string in religionDisplay
        processedData.religionDisplay = religionMapping.numberToString[processedData.religion] || "";
      }
      
      setFormData((prevData) => ({
        ...prevData,
        ...processedData,
      }));

      const initialErrors = {};
      Object.keys(errors).forEach(field => {
        initialErrors[field] = isFieldRequired(field) && 
          (!parentData[field] || parentData[field] === "");
      });
      setErrors(initialErrors);
    }
  }, [parentData]);

  // Field requirement check
  const isFieldRequired = (field) => {
    const requiredFields = [
      "epfNumber", "nameWithInitials", "title", "fullName", 
      "nicNumber", "dateOfBirth", "maritalStatus",
      "religion", "race", "numberOfDependents"
    ];
    return requiredFields.includes(field);
  };


   // NIC validation logic
   const validateNIC = (nic) => {
    // Check NIC format (either 9 digits + V/X or 12 digits)
    const isValid = /^\d{9}[VvXx]$/.test(nic) || /^\d{12}$/.test(nic);
    if (isValid) {
      setIsNicValidated(true); // Lock the NIC field after validation
      return true;
    }
    setIsNicValidated(false); // Reset validation status if NIC is invalid
    return false;
  };

  // Enhanced EPF Number Validation Function
  const validateEPFNumber = useCallback(async (value) => {
    // Reset previous errors specific to EPF number
    setErrors(prev => ({...prev, epfNumber: false}));
    setErrorMessages(prev => ({...prev, epfNumber: ""}));
    
    // Check if empty
    if (!value || value.trim() === "") {
      setErrors(prev => ({...prev, epfNumber: true}));
      setErrorMessages(prev => ({...prev, epfNumber: "EPF Number is required"}));
      setShowErrors(prev => ({...prev, epfNumber: true}));
      return false;
    }

    // Check if contains only numbers
    if (!/^\d*$/.test(value)) {
      setErrors(prev => ({...prev, epfNumber: true}));
      setErrorMessages(prev => ({...prev, epfNumber: "EPF Number must contain only numbers"}));
      setShowErrors(prev => ({...prev, epfNumber: true}));
      return false;
    }

    // Check length constraints
    if (value.length < 4) {
      setErrors(prev => ({...prev, epfNumber: true}));
      setErrorMessages(prev => ({...prev, epfNumber: "EPF Number must be at least 4 digits"}));
      setShowErrors(prev => ({...prev, epfNumber: true}));
      return false;
    }

    if (value.length > 7) {
      setErrors(prev => ({...prev, epfNumber: true}));
      setErrorMessages(prev => ({...prev, epfNumber: "EPF Number cannot exceed 7 digits"}));
      setShowErrors(prev => ({...prev, epfNumber: true}));
      return false;
    }

    // Check existence in the system
    try {
      const exists = await checkEPFExistence(value);
      
      if (exists) {
        setErrors(prev => ({...prev, epfNumber: true}));
        setErrorMessages(prev => ({
          ...prev, 
          epfNumber: "EPF Number already exists in the system"
        }));
        setShowErrors(prev => ({...prev, epfNumber: true}));
        return false;
      }

      // If all validations pass
      return true;
    } catch (error) {
      console.error("EPF Existence Check Error:", error);
      setErrors(prev => ({...prev, epfNumber: true}));
      setErrorMessages(prev => ({
        ...prev, 
        epfNumber: "Error checking EPF Number. Please try again."
      }));
      setShowErrors(prev => ({...prev, epfNumber: true}));
      return false;
    }
  }, [checkEPFExistence]);

 
 
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // For image preview (full data URL)
        setImagePreview(reader.result);
        
        // Strip the data URI prefix for storage
        const base64String = reader.result.split(',')[1];
        
        // Update local form data with proper types
        setFormData(prevData => ({
          ...prevData,
          profileImage: base64String, // Ensure this is a string
          imageContentType: file.type
        }));
        
        // Update parent component data with proper types
        setPersonalDetails(prev => ({
          ...prev,
          profileImage: base64String, // Ensure this is a string
          imageContentType: file.type
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to validate a field
  const validateField = (name, value) => {
    if (!isFieldRequired(name)) return true;
    
    let isValid = value && value.toString().trim() !== "";
    let message = "";
    
    // Special validation for EPF number
    if (name === "epfNumber") {
      // Check if it's empty
      if (!value || value.toString().trim() === "") {
        isValid = false;
        message = "EPF Number is required";
      } 
      // Check if it's numeric
      else if (!/^\d*$/.test(value)) {
        isValid = false;
        message = "EPF Number must contain only numbers";
        setShowErrors(prev => ({...prev, [name]: true}));
      } 
      // Check if it's 7 digits maximum
      else if (value.length > 7) {
        isValid = false;
        message = "EPF Number cannot exceed 7 digits";
        setShowErrors(prev => ({...prev, [name]: true}));
      }
    }
    
    else if (name === "nicNumber") {
      // Check if it's empty
      if (!value || value.toString().trim() === "") {
        isValid = false;
        message = "NIC Number is required";
      } 
      else if (!/^\d{9}[VvXx]$/.test(value) && !/^\d{12}$/.test(value)) {
        isValid = false;
        
        // More specific error messages based on format problems
        if (/^\d{9}[^VvXx]/.test(value)) {
          message = "10th character must be V or X";
        } else if (/^\d{9}[VvXx].+/.test(value)) {
          message = "No characters allowed after V/X";
        } else if (/^\d{10,11}$/.test(value)) {
          message = "NIC must be exactly 12 digits";
        } else if (/\D/.test(value.substring(0, 9))) {
          message = "First 9 characters must be digits";
        } else {
          message = "Invalid NIC format. Use 9 digits + V/X or 12 digits";
        }
        
        setShowErrors(prev => ({...prev, [name]: true}));
      }
    } 

    else if (name === "numberOfDependents") {
      // Check if it's empty
      if (!value || value.toString().trim() === "") {
        isValid = false;
        message = "Number of Dependents is required";
      } 
      // Check if it's a valid number between 0 and 15
      else {
        const numValue = parseInt(value, 10);
        if (isNaN(numValue)) {
          isValid = false;
          message = "Please enter a valid number";
          setShowErrors(prev => ({...prev, [name]: true}));
        } 
        else if (numValue < 0) {
          isValid = false;
          message = "Minimum value is 0";
          setShowErrors(prev => ({...prev, [name]: true}));
        }
        else if (numValue > 15) {
          isValid = false;
          message = "Maximum value is 15";
          setShowErrors(prev => ({...prev, [name]: true}));
        }
      }
    }

    else {
      // Default message for other fields
      message = isValid ? "" : `${name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
    }
    
    // Update errors state
    setErrors(prev => ({
      ...prev,
      [name]: !isValid
    }));
    
    // Update error messages
    setErrorMessages(prev => ({
      ...prev,
      [name]: message
    }));
    
    return isValid;
  };

  // Modify handleBlur to include comprehensive EPF validation
  const handleBlur = async (e) => {
    const { name, value } = e.target;

    if (name === "nicNumber" && !isNicValidated) {
      const isValid = validateNIC(value);
      if (!isValid) {
        setShowErrors((prev) => ({
          ...prev,
          nicNumber: true,
        }));
        setErrorMessages((prev) => ({
          ...prev,
          nicNumber: "Invalid NIC number",
        }));
      }
    }
    
    // Special handling for EPF Number
    if (name === "epfNumber") {
      await validateEPFNumber(value);
    } else {
      // Validate other fields, potentially showing EPF error if it exists
      validateField(name, value);
      
      // If EPF Number is invalid, we want to keep showing its error
      if (errors.epfNumber) {
        setShowErrors(prev => ({...prev, epfNumber: true}));
      }
    }
  };

  // Check if a field is filled
  const isFieldFilled = (fieldName) => {
    return formData[fieldName] && formData[fieldName].toString().trim() !== "";
  };

  // Validate field dependencies before allowing focus
  const validateFieldDependencies = (fieldName) => {
    const dependencies = fieldDependencies[fieldName] || [];
    
    for (let depField of dependencies) {
      if (!isFieldFilled(depField)) {
        // Set error for the missing dependency
        setErrors(prev => ({...prev, [depField]: true}));
        setErrorMessages(prev => ({
          ...prev, 
          [depField]: `Please fill ${depField.replace(/([A-Z])/g, ' $1').toLowerCase()} first`
        }));
        setShowErrors(prev => ({...prev, [depField]: true}));
        return false;
      }
    }
    return true;
  };

  // Modify handleFocus to check dependencies
  const handleFocus = (e) => {
    const { name } = e.target;
    
    // First validate dependencies
    const dependenciesValid = validateFieldDependencies(name);
    
    // If dependencies are not valid, prevent focus
    if (!dependenciesValid) {
      e.preventDefault();
      
      // Find the first unfilled dependency and focus on it
      const dependencies = fieldDependencies[name] || [];
      for (let depField of dependencies) {
        if (!isFieldFilled(depField) && fieldRefs.current[depField]) {
          fieldRefs.current[depField].focus();
          break;
        }
      }
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;


    // If NIC number is changed, validate it
    if (name === "nicNumber" && !isNicValidated) {
      validateNIC(value);
    }



   // Special handling for drivingLicense and passportNumber fields to prevent symbols
  if (name === "drivingLicense" || name === "passportNumber") {
    // Regular expression to allow only alphanumeric characters (letters and digits)
    const cleanedValue = value.replace(/[^a-zA-Z0-9]/g, "");
    setFormData((prevFormData) => {
      const updatedFormData = { 
        ...prevFormData, 
        [name]: cleanedValue 
      };
      setPersonalDetails(updatedFormData);
      return updatedFormData;
    });
    return;
  }
  
    // Special handling for religion field
    if (name === "religion") {
      // Get numeric value for database storage
      const numericValue = religionMapping.stringToNumber[value];
      
      // Update form data
      setFormData((prevFormData) => {
        const updatedFormData = { 
          ...prevFormData, 
          religion: numericValue, // Store numeric value
          religionDisplay: value  // Keep display value for UI
        };
        
        // Update parent component with personal details
        setPersonalDetails(updatedFormData);
        
        return updatedFormData;
      });
      
      // Validate the field
      validateField(name, numericValue);
      return;
    }
  
    // Special handling for EPF number
    if (name === "epfNumber") {
      // Only allow numeric input
      if (!/^\d*$/.test(value)) {
        return;
      }
  
      // Validate EPF number as user types
      await validateEPFNumber(value);
    }
  
    // Special handling for NIC number
    if (name === "nicNumber") {
      // First 9 characters must be digits
      if (value.length <= 9) {
        if (!/^\d*$/.test(value)) {
          validateField(name, value);
          setShowErrors(prev => ({...prev, [name]: true}));
          return; // Prevent update with invalid character
        }
      } 
      // 10th character can be V, X, or a digit
      else if (value.length === 10) {
        if (!/^\d{9}([VvXx]|\d)$/.test(value)) {
          validateField(name, value);
          setShowErrors(prev => ({...prev, [name]: true}));
          return;
        }
      } 
      // If 10th character was V or X, no more characters allowed
      else if (value.length > 10 && /^\d{9}[VvXx]/.test(value)) {
        validateField(name, value);
        setShowErrors(prev => ({...prev, [name]: true}));
        return;
      } 
      // If continuing with digits, only allow up to 12 total
      else if (value.length > 10 && value.length <= 12) {
        if (!/^\d+$/.test(value)) {
          validateField(name, value);
          setShowErrors(prev => ({...prev, [name]: true}));
          return;
        }
      } 
      // Never allow more than 12 characters
      else if (value.length > 12) {
        validateField(name, value);
        setShowErrors(prev => ({...prev, [name]: true}));
        return;
      }
      
      // Run validation anyway to update error state
      validateField(name, value);
    }
  
    // Special handling for numberOfDependents
    if (name === "numberOfDependents") {
      const numValue = parseInt(value, 10);
      
      // Allow empty string (for user to clear input) but validate it
      if (value === "") {
        validateField(name, value);
        setShowErrors(prev => ({...prev, [name]: true}));
      }
      // Validate number range and show error if needed
      else if (!isNaN(numValue) && (numValue < 0 || numValue > 15)) {
        validateField(name, value);
        setShowErrors(prev => ({...prev, [name]: true}));
      }
    }
  
    // Update form data
    setFormData((prevFormData) => {
      let updatedFormData = { ...prevFormData, [name]: value };
  
      // Special handling for NIC number to extract details
      if (name === "nicNumber") {
        const { dateOfBirth, gender } = extractNICDetails(value);
        
        // Only update date of birth and gender if a valid NIC was provided
        if (dateOfBirth) {
          updatedFormData = { 
            ...updatedFormData, 
            dateOfBirth, 
            gender 
          };
          
          // Also validate the date of birth field since it was auto-filled
          validateField("dateOfBirth", dateOfBirth);
        }
      }
      
      // Update parent component with personal details
      setPersonalDetails(updatedFormData);
      
      return updatedFormData;
    });
  };

  // Handle key down for field navigation and validation
  const handleKeyDown = async (e, fieldName) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      // Special handling for EPF Number
      if (fieldName === "epfNumber") {
        const isValid = await validateEPFNumber(formData[fieldName]);
        
        if (isValid) {
          // Move to next field
          const nextFieldIndex = fieldOrder.indexOf(fieldName) + 1;
          if (nextFieldIndex < fieldOrder.length) {
            const nextField = fieldOrder[nextFieldIndex];
            if (fieldRefs.current[nextField]) {
              fieldRefs.current[nextField].focus();
            }
          }
        }
      } else {
        // Validate other fields
        const isValid = validateField(fieldName, formData[fieldName]);
        
        if (isValid) {
          // Move to next field
          const nextFieldIndex = fieldOrder.indexOf(fieldName) + 1;
          if (nextFieldIndex < fieldOrder.length) {
            const nextField = fieldOrder[nextFieldIndex];
            if (fieldRefs.current[nextField]) {
              fieldRefs.current[nextField].focus();
            }
          }
        }
      }
    }
  };

  // NIC Details Extraction (existing method)
  const extractNICDetails = (nic) => {
    let birthYear, dayOfYear;
    
    const cleanNic = nic.toUpperCase();
    
    if (/^\d{9}[VX]$/.test(cleanNic)) {
      birthYear = `19${cleanNic.substring(0, 2)}`;
      dayOfYear = parseInt(cleanNic.substring(2, 5), 10);
    } else if (/^\d{12}$/.test(cleanNic)) {
      birthYear = cleanNic.substring(0, 4);
      dayOfYear = parseInt(cleanNic.substring(4, 7), 10);
    } else {
      return { dateOfBirth: "", gender: "" };
    }

    let gender = "Male";
    if (dayOfYear > 500) {
      dayOfYear -= 500;
      gender = "Female";
    }
    
    const dob = ((birthYear % 4) === 0 || dayOfYear <= 59) 
      ? new Date(birthYear, 0, dayOfYear + 1)
      : new Date(birthYear, 0, dayOfYear);
    
    const dateOfBirth = dob.toISOString().split("T")[0];
   
    return { dateOfBirth, gender };
  };

  // Helper text and error state determination
  const getHelperText = (fieldName) => {
    if (errors[fieldName] && showErrors[fieldName]) {
      return errorMessages[fieldName] || `${fieldName} is required`;
    }
    return "";
  };

  const shouldShowError = (fieldName) => {
    return errors[fieldName] && showErrors[fieldName];
  };

  // Get the display value for religion dropdown
  const getReligionDisplayValue = () => {
    // If we have a numeric religion value, convert it to string for display
    if (formData.religion && typeof formData.religion === 'number') {
      return religionMapping.numberToString[formData.religion] || "";
    }
    // If we have a display value saved, use that
    if (formData.religionDisplay) {
      return formData.religionDisplay;
    }
    // Default to empty string
    return "";
  };


  return (
    <ThemeProvider theme={textFieldTheme}>
       <Grid item xs={12} container justifyContent="center" alignItems="center" sx={{ mt: 2, mb: 2 }}>
    <Grid item xs={12} sm={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div 
        style={{ 
          width: '150px', 
          height: '150px', 
          border: '1px dashed #ccc', 
          borderRadius: '50%', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {imagePreview ? (
          <img 
            src={imagePreview} 
            alt="Profile Preview" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <CameraAltIcon style={{ fontSize: 40, color: '#aaa' }} />
        )}
      </div>
      
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="profile-image-upload"
        type="file"
        onChange={handleImageChange}
      />
      
      <label htmlFor="profile-image-upload">
        <Button 
          variant="outlined" 
          component="span"
          size="small"
          sx={{ mt: 1 }}
        >
          {imagePreview ? 'Change Photo' : 'Upload Photo'}
        </Button>
      </label>
    </Grid>
  </Grid>

    <Grid container spacing={2}>
      <Typography 
        sx={{ ml: 3, mt: 4 }} 
        variant="h4" 
        gutterBottom 
        style={{ 
          fontStyle: "italic", 
          color:"#800020", 
          fontFamily: 'Roboto, sans-serif', 
          textAlign:'center'
        }}
      >
        Personal Details 
      </Typography>
      <Grid item xs={11.5} container spacing={1} sx={{ ml: 2, mt: 3 }}>
         <Grid  
                  container 
                  alignItems="center" 
                  sx={{ 
                    mr: 0, 
                    mt: -5, 
                    backgroundColor: "#E0E0E0" ,
                    borderRadius: 1, 
                    boxShadow: 3,
                  }}
                  
                >
        <Grid>
          <Typography 
            sx={{ ml: 1, mt: 0 }} 
            variant="h6" 
            gutterBottom 
            style={{ 
              fontStyle: "italic", 
              color:"rgb(58, 53, 54)", 
              fontFamily: 'Roboto, sans-serif', 
              textAlign: "left" 
            }}
          >
            General Information 
          </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ mt: 1}} >
             {/* <TextField 
        label="EPF Number" 
        name="epfNumber" 
        fullWidth 
        variant="outlined" 
        value={formData.epfNumber} 
        onChange={handleChange} 
        onBlur={handleBlur}
        required 
        error={shouldShowError("epfNumber")}
        helperText={getHelperText("epfNumber")}
        placeholder="Enter 7-digit EPF number"
        inputProps={{ maxLength: 7 }}           
      /> */}

      <TextField 
            label="EPF Number" 
            name="epfNumber" 
            fullWidth 
            variant="outlined" 
            value={formData.epfNumber} 
            onChange={handleChange} 
            onBlur={handleBlur}
            required 
            error={shouldShowError("epfNumber")}
            helperText={getHelperText("epfNumber")}
            placeholder="Enter 7-digit EPF number"
            inputProps={{ maxLength: 7 }}           
          />
          </Grid>

          <Grid item xs={12} sm={1.5}>
          <TextField 
            select
            label="Title" 
            name="title" 
            fullWidth 
            variant="outlined" 
            value={formData.title || ""} 
            onChange={handleChange} 
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={(e) => handleKeyDown(e, "title")}
            inputRef={(el) => fieldRefs.current["title"] = el}
            required
            error={shouldShowError("title")}
            helperText={getHelperText("title")}
          >
            <MenuItem value="Mr">Mr.</MenuItem>
            <MenuItem value="Mrs">Mrs.</MenuItem>
            <MenuItem value="Miss">Miss.</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={10.5}>
          <TextField 
            label="Name with Initials" 
            name="nameWithInitials" 
            fullWidth 
            variant="outlined" 
            value={formData.nameWithInitials} 
            onChange={handleChange} 
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, "nameWithInitials")}
            inputRef={(el) => fieldRefs.current["nameWithInitials"] = el}
            required 
            error={shouldShowError("nameWithInitials")}
            helperText={getHelperText("nameWithInitials")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            label="Full Name" 
            name="fullName" 
            fullWidth 
            variant="outlined" 
            value={formData.fullName} 
            onChange={handleChange} 
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, "fullName")}
            inputRef={(el) => fieldRefs.current["fullName"] = el}
            required 
            error={shouldShowError("fullName")}
            helperText={getHelperText("fullName")}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField 
            label="NIC Number" 
            name="nicNumber" 
            fullWidth 
            variant="outlined" 
            value={formData.nicNumber} 
            onChange={handleChange} 
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, "nicNumber")}
            inputRef={(el) => fieldRefs.current["nicNumber"] = el}
            required 
            error={shouldShowError("nicNumber")}
            helperText={getHelperText("nicNumber")}
            inputProps={{ maxLength: 12 }}
            placeholder="9 digits + V/X or 12 digits"
            InputProps={{
              readOnly: isNicValidated, // Lock the NIC field once validated
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField 
            label="Date of Birth" 
            name="dateOfBirth" 
            type="date" 
            fullWidth 
            variant="outlined" 
            InputLabelProps={{ shrink: true }} 
            value={formData.dateOfBirth} 
            onChange={handleChange} 
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, "dateOfBirth")}
            inputRef={(el) => fieldRefs.current["dateOfBirth"] = el}
            required 
            error={shouldShowError("dateOfBirth")}
            helperText={getHelperText("dateOfBirth")}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField 
            label="Gender" 
            name="gender" 
            fullWidth 
            variant="outlined" 
            value={formData.gender} 
            onChange={handleChange} 
            InputProps={{ readOnly: true }}
            inputRef={(el) => fieldRefs.current["gender"] = el}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Driving License" 
            name="drivingLicense" 
            fullWidth 
            variant="outlined" 
            value={formData.drivingLicense} 
            onChange={handleChange} 
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, "drivingLicense")}
            inputRef={(el) => fieldRefs.current["drivingLicense"] = el}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Passport Number" 
            name="passportNumber" 
            fullWidth 
            variant="outlined" 
            value={formData.passportNumber} 
            onChange={handleChange} 
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, "passportNumber")}
            inputRef={(el) => fieldRefs.current["passportNumber"] = el}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField 
            select 
            label="Marital Status" 
            name="maritalStatus" 
            fullWidth 
            variant="outlined" 
            value={formData.maritalStatus} 
            onChange={handleChange} 
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, "maritalStatus")}
            inputRef={(el) => fieldRefs.current["maritalStatus"] = el}
            required
            error={shouldShowError("maritalStatus")}
            helperText={getHelperText("maritalStatus")}
          >
            <MenuItem value="Single">Single</MenuItem>
            <MenuItem value="Married">Married</MenuItem>
            <MenuItem value="Divorced">Divorced</MenuItem>
            <MenuItem value="Separated">Separated</MenuItem>
            <MenuItem value="Widowed">Widow</MenuItem>
            <MenuItem value="Widower">Widower</MenuItem>
          </TextField>
        </Grid>
        

        <Grid item xs={12} sm={3}>
  <TextField 
    select 
    label="Religion" 
    name="religion" 
    fullWidth 
    variant="outlined" 
    // Convert numeric value to display string if it exists
    value={formData.religion ? 
           religionMapping.numberToString[formData.religion] || "" : 
           ""}
    onChange={handleChange} 
    onFocus={handleFocus}
    onBlur={handleBlur}
    onKeyDown={(e) => handleKeyDown(e, "religion")}
    inputRef={(el) => fieldRefs.current["religion"] = el}
    required
    error={shouldShowError("religion")}
    helperText={getHelperText("religion")}
  >
    <MenuItem value="Buddhism">Buddhism</MenuItem>
    <MenuItem value="Hindu">Hindu</MenuItem>
    <MenuItem value="Islam">Islam</MenuItem>
    <MenuItem value="Christianity">Christianity</MenuItem>
    <MenuItem value="Other">Other</MenuItem>
  </TextField>
</Grid>

            <Grid item xs={12} sm={2.5}>
              <TextField 
                select 
                label="Race" 
                name="race" 
                fullWidth 
                variant="outlined" 
                value={formData.race} 
                onChange={handleChange} 
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={(e) => handleKeyDown(e, "race")}
                inputRef={(el) => fieldRefs.current["race"] = el}
                required
                error={shouldShowError("race")}
                helperText={getHelperText("race")}
              >
                <MenuItem value="Sinhala">Sinhala</MenuItem>
                <MenuItem value="Tamil">Tamil</MenuItem>
                <MenuItem value="Muslim">Muslim</MenuItem>
                <MenuItem value="Burgher">Burgher</MenuItem>
                <MenuItem value="Malay">Malay</MenuItem>
              </TextField>
            </Grid>
             
            <Grid item xs={12} sm={1.5}>
          <TextField 
            select 
            label="Blood Group" 
            name="bloodGroup" 
            fullWidth 
            variant="outlined" 
            value={formData.bloodGroup} 
            onChange={handleChange} 
            // onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, "bloodGroup")}
            inputRef={(el) => fieldRefs.current["bloodGroup"] = el}
            // required
            // error={shouldShowError("bloodGroup")}
            helperText={getHelperText("bloodGroup")}
          >
            <MenuItem value="O+">O+</MenuItem>
            <MenuItem value="O-">O-</MenuItem>
            <MenuItem value="A+">A+</MenuItem>
            <MenuItem value="A-">A-</MenuItem>
            <MenuItem value="B+">B+</MenuItem>
            <MenuItem value="B-">B-</MenuItem>
            <MenuItem value="AB+">AB+</MenuItem>
            <MenuItem value="AB-">AB-</MenuItem>
          </TextField>
        </Grid>

                <Grid item xs={2}>
          <TextField 
            label="Number of Dependents" 
            name="numberOfDependents" 
            type="number"
            fullWidth 
            variant="outlined" 
            value={formData.numberOfDependents} 
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);

              // Only allow integers between 0 and 15
              if (!isNaN(value) && value >= 0 && value <= 15) {
                setFormData((prevFormData) => {
                  const updatedFormData = { 
                    ...prevFormData, 
                    numberOfDependents: value 
                  };
                  setPersonalDetails(updatedFormData);
                  return updatedFormData;
                });
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  numberOfDependents: false,
                }));
                setErrorMessages((prevErrorMessages) => ({
                  ...prevErrorMessages,
                  numberOfDependents: "",
                }));
              } else {
                // If the value is out of range, reset to previous value or 0
                setFormData((prevFormData) => {
                  const updatedFormData = { 
                    ...prevFormData, 
                    numberOfDependents: value < 0 ? 0 : 15 
                  };
                  setPersonalDetails(updatedFormData);
                  return updatedFormData;
                });
                
                // Show an error if invalid input
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  numberOfDependents: true,
                }));
                setErrorMessages((prevErrorMessages) => ({
                  ...prevErrorMessages,
                  numberOfDependents: "Number of Dependents must be between 0 and 15",
                }));
              }
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, "numberOfDependents")}
            inputRef={(el) => fieldRefs.current["numberOfDependents"] = el}
            required
            error={shouldShowError("numberOfDependents")}
            helperText={getHelperText("numberOfDependents")}
            inputProps={{ 
              min: 0, 
              max: 15,
              inputMode: 'numeric',
              pattern: '[0-9]*'
            }}
          />
        </Grid>

      
       
      </Grid>
    </Grid>
    </ThemeProvider>
  );
};

export default PersonalDetailsForm;

















