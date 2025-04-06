import { useState, useEffect, useRef } from "react";
import { TextField, Grid, Typography, MenuItem } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";


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

const SpouseDetailsForm = ({ setSpouseDetails, parentData }) => {
  const [formData, setFormData] = useState({
    title: "",
    nameWithInitials: "",
    fullName: "",
    dateOfBirth: "",
    nicNumber: "",
    address: "",
    postalCode: "",
    contactNumber: "",
    workPlaceAddress: "",
    workPlaceTeleNumber: "",
    gender: ""
  });

  // Add errors state to track validation errors
  const [errors, setErrors] = useState({
    title: false,
    nameWithInitials: false,
    fullName: false,
    nicNumber: false,
    dateOfBirth: false,
    contactNumber: false,
    address: false,
    postalCode: false,
    workPlaceAddress: false,
    workPlaceTeleNumber: false
  });

  // Track which fields have been touched (for validation on blur)
  const [touched, setTouched] = useState({
    title: false,
    nameWithInitials: false,
    fullName: false,
    nicNumber: false,
    dateOfBirth: false,
    contactNumber: false,
    address: false,
    postalCode: false,
    workPlaceAddress: false,
    workPlaceTeleNumber: false
  });

  // Create refs for field navigation
  const fieldRefs = useRef({});

  // Order of fields for navigation
  const fieldOrder = [
    "title",
    "nameWithInitials",
    "fullName",
    "nicNumber",
    "dateOfBirth",
    "contactNumber",
    "address",
    "postalCode",
    "workPlaceAddress",
    "workPlaceTeleNumber"
  ];

  // Error messages state - added fullName to match other fields
  const [errorMessages, setErrorMessages] = useState({
    title: "",
    nameWithInitials: "",
    fullName: "",
    nicNumber: "",
    dateOfBirth: "",
    contactNumber: "",
    address: "",
    postalCode: "",
    workPlaceAddress: "",
    workPlaceTeleNumber: ""
  });

  // Only update formData when parentData changes
  useEffect(() => {
    // Special case: if parentData is empty (after form reset), reset the form
    if (parentData && Object.keys(parentData).length === 0) {
      setFormData({
        title: "",
        nameWithInitials: "",
        fullName: "",
        dateOfBirth: "",
        nicNumber: "",
        address: "",
        postalCode: "",
        contactNumber: "",
        workPlaceAddress: "",
        workPlaceTeleNumber: "",
        gender: ""
      });
      
      // Reset errors and touched states as well
      const resetState = Object.keys(errors).reduce((acc, field) => {
        acc[field] = false;
        return acc;
      }, {});
      
      setErrors({...resetState});
      setTouched({...resetState});
      return;
    }
    
    // Normal case: update from parent data
    if (parentData && JSON.stringify(parentData) !== JSON.stringify(formData)) {
      setFormData(parentData);

      // Initialize errors state based on parentData
      const initialErrors = {};
      Object.keys(errors).forEach(field => {
        // Check if field is required and empty in parentData
        if (isFieldRequired(field) && (!parentData[field] || parentData[field] === "")) {
          initialErrors[field] = true;
        } else {
          initialErrors[field] = false;
        }
      });
      setErrors(initialErrors);
    }
  }, [parentData]);

  const [isNicValidated, setIsNicValidated] = useState(false); 

  const fieldDependencies = {
    nameWithInitials: ["title"],
    fullName: ["title", "nameWithInitials"],
    nicNumber: ["title", "nameWithInitials", "fullName"],
    dateOfBirth: ["title", "nameWithInitials", "fullName","nicNumber"],
    contactNumber: ["title", "nameWithInitials", "fullName", "nicNumber"],
    address: ["title", "nameWithInitials", "fullName", "nicNumber", "contactNumber"],
    postalCode: ["title", "nameWithInitials", "fullName", "nicNumber", "contactNumber", "address"],
    workPlaceAddress: ["title", "nameWithInitials", "fullName", "nicNumber", "contactNumber", "address", "postalCode"],
    workPlaceTeleNumber: ["title", "nameWithInitials", "fullName", "nicNumber", "contactNumber", "address", "postalCode", "workPlaceAddress"]
  };

  const isFieldFilled = (fieldName) => {
    return formData[fieldName] && formData[fieldName].toString().trim() !== "";
  };

  const validateFieldDependencies = (fieldName) => {
    const dependencies = fieldDependencies[fieldName] || [];

    for (let depField of dependencies) {
      if (!isFieldFilled(depField)) {
        setErrors(prev => ({ ...prev, [depField]: true }));
        setErrorMessages(prev => ({
          ...prev,
          [depField]: `Please fill ${depField.replace(/([A-Z])/g, ' $1').toLowerCase()} first`
        }));
        // Make sure errors appear immediately
        setTouched(prev => ({ ...prev, [depField]: true }));
        return false;
      }
    }
    return true;
  };

  const handleFocus = (e) => {
    const { name } = e.target;

    const dependenciesValid = validateFieldDependencies(name);
    if (!dependenciesValid) {
      e.preventDefault();

      const dependencies = fieldDependencies[name] || [];
      for (let depField of dependencies) {
        if (!isFieldFilled(depField) && fieldRefs.current[depField]) {
          fieldRefs.current[depField].focus();
          break;
        }
      }
    }
  };
  
  // Only update parent when formData changes due to user input
  // NOT when formData changes due to parentData updates
  const isUserChange = useRef(false);
  
  useEffect(() => {
    // Only update the parent if this was a user-initiated change
    if (isUserChange.current) {
      setSpouseDetails(formData);
      isUserChange.current = false;
    }
  }, [formData, setSpouseDetails]);

  // Function to determine if a field is required
  const isFieldRequired = (field) => {
    const requiredFields = [
      "title", "nameWithInitials", "fullName", "nicNumber", "dateOfBirth", 
      "contactNumber", "address", "postalCode", 
      "workPlaceAddress", "workPlaceTeleNumber"
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

  // Function to validate a field
  const validateField = (name, value) => {
    if (!isFieldRequired(name)) return true;
    
    let isValid = value && value.toString().trim() !== "";
    let message = "";

    if (name === "nicNumber") {
      // First, check if it's empty
      if (!value || value.toString().trim() === "") {
        isValid = false;
        message = "NIC Number is required";
      } 
      // Then check various format issues
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
        
      }
    } 
    
    // Update errors state
    setErrors(prev => ({
      ...prev,
      [name]: !isValid
    }));
    
    // Always update error messages
    setErrorMessages(prev => ({
      ...prev,
      [name]: !isValid ? message : ""
    }));

    return isValid;
  };

  // Handle field blur (when user leaves a field)
  const handleBlur = (e) => {
    const { name, value } = e.target;
  
    if (name === "nicNumber") {
      const isValid = /^\d{9}[VvXx]$/.test(value) || /^\d{12}$/.test(value);
      if (isValid) {
        setIsNicValidated(true);
      } else {
        setIsNicValidated(false);
      }
    }

    if (name === "nameWithInitials") {
      const regex = /^[A-Za-z.\s]*$/;
      if (!regex.test(value)) {
        isValid = false;
        message = "Only letters and '.' are allowed";
      }
    }
    
  
    // Validate the field
    validateField(name, formData[name]);
  };
  

  // Get the next field in the tab order
  const getNextFieldId = (currentField) => {
    const currentIndex = fieldOrder.indexOf(currentField);
    if (currentIndex < fieldOrder.length - 1) {
      return fieldOrder[currentIndex + 1];
    }
    return null;
  };

  // Function to handle Enter key navigation
  const handleKeyDown = (e, fieldName) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // Mark field as touched
      setTouched(prev => ({
        ...prev,
        [fieldName]: true
      }));
      
      // Validate current field
      const isValid = validateField(fieldName, formData[fieldName]);
      
      // If valid, move to next field
      if (isValid) {
        const nextFieldId = getNextFieldId(fieldName);
        if (nextFieldId && fieldRefs.current[nextFieldId]) {
          fieldRefs.current[nextFieldId].focus();
        }
      }
    }
  };
  
  const extractNICDetails = (nic) => {
    let birthYear, dayOfYear;
    if (/^\d{9}[VvXx]$/i.test(nic)) {
      birthYear = `19${nic.substring(0, 2)}`;
      dayOfYear = parseInt(nic.substring(2, 5), 10);
    } else if (/^\d{12}$/.test(nic)) {
      birthYear = nic.substring(0, 4);
      dayOfYear = parseInt(nic.substring(4, 7), 10);
    } else {
      return { dateOfBirth: "", gender: "" };
    }

    let gender = "Male";
    if (dayOfYear > 500) {
      dayOfYear -= 500;
      gender = "Female";
    }
    const dob = new Date(birthYear, 0, dayOfYear);
    const dateOfBirth = dob.toISOString().split("T")[0];

    return { dateOfBirth, gender };
  };

  const capitalizeEachWord = (str) => {
    return str.replace(/\b\w+/g, (word) => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Flag that this change was initiated by the user
    isUserChange.current = true;

    // If NIC number is changed and already validated, don't allow changes
    if (name === "nicNumber" && isNicValidated) {
      return;
    }

    if (name === "nameWithInitials") {
      const regex = /^[A-Za-z.\s]*$/; // allow only letters, dot, and space
    
      if (!regex.test(value)) {
        setErrors(prev => ({ ...prev, [name]: true }));
        setErrorMessages(prev => ({ ...prev, [name]: "Only letters and '.' are allowed" }));
        setTouched(prev => ({ ...prev, [name]: true }));
        return;
      }
    
      const capitalizedValue = capitalizeEachWord(value);
      setFormData((prevFormData) => {
        const updatedFormData = { 
          ...prevFormData, 
          [name]: capitalizedValue 
        };
        return updatedFormData;
      });
      return;
    }
    
    
          // Full Name validation: only letters and spaces
      if (name === "fullName") {
        const regex = /^[A-Za-z\s]*$/;

        if (!regex.test(value)) {
          setErrors(prev => ({ ...prev, [name]: true }));
          setErrorMessages(prev => ({ ...prev, [name]: "Only letters and spaces are allowed" }));
          setTouched(prev => ({ ...prev, [name]: true }));
          return;
        }

        const capitalizedValue = capitalizeEachWord(value);
        setFormData(prev => ({
          ...prev,
          [name]: capitalizedValue
        }));
        return;
      }

      // Contact Number validation: only digits, max 10
      if (name === "contactNumber" || name === "workPlaceTeleNumber") {
        const regex = /^[0-9]{0,10}$/;

        if (!regex.test(value)) {
          setErrors(prev => ({ ...prev, [name]: true }));
          setErrorMessages(prev => ({ ...prev, [name]: "Only digits allowed, max 10 characters" }));
          setTouched(prev => ({ ...prev, [name]: true }));
          return;
        }

        setErrors(prev => ({ ...prev, [name]: false }));
        setErrorMessages(prev => ({ ...prev, [name]: "" }));

        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
        return;
      }

      // Address & Workplace Address validation and formatting
      if (name === "address" || name === "workPlaceAddress") {
        const regex = /^[A-Za-z\s]*$/;

        const capitalizedValue = capitalizeEachWord(value);

        setErrors(prev => ({ ...prev, [name]: false }));
        setErrorMessages(prev => ({ ...prev, [name]: "" }));

        setFormData(prev => ({
          ...prev,
          [name]: capitalizedValue
        }));
        return;
      }



      if (name === "postalCode") {
        const regex = /^[0-9]*$/;
      
        if (!regex.test(value)) {
          setErrors(prev => ({ ...prev, [name]: true }));
          setErrorMessages(prev => ({ ...prev, [name]: "Only digits are allowed" }));
          setTouched(prev => ({ ...prev, [name]: true }));
          return;
        }
      
        setErrors(prev => ({ ...prev, [name]: false }));
        setErrorMessages(prev => ({ ...prev, [name]: "" }));
      
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
        return;
      }
      

    
    
    // Handle different cases for NIC input validation
    if (name === "nicNumber") {
      let valueToUse = value;
      let validInput = true;
      
      // First 9 characters must be digits
      if (value.length <= 9) {
        if (!/^\d*$/.test(value)) {
          validInput = false;
        }
      } 
      // 10th character can be V, X, or a digit
      else if (value.length === 10) {
        if (!/^\d{9}([VvXx]|\d)$/.test(value)) {
          validInput = false;
        }
      } 
      // If 10th character was V or X, no more characters allowed
      else if (value.length > 10 && /^\d{9}[VvXx]/i.test(value.substring(0, 10))) {
        validInput = false;
      } 
      // If continuing with digits, only allow up to 12 total
      else if (value.length > 10 && value.length <= 12) {
        if (!/^\d+$/.test(value)) {
          validInput = false;
        }
      } 
      // Never allow more than 12 characters
      else if (value.length > 12) {
        validInput = false;
      }

      // If input is invalid, validate and show error but don't update state
      if (!validInput) {
        validateField(name, value);
        setTouched(prev => ({ ...prev, [name]: true }));
        return;
      }
    }
    
    setFormData((prevFormData) => {
      let updatedFormData = { ...prevFormData, [name]: value };
  
      // If updating NIC number, extract and auto-fill date of birth and gender
      if (name === "nicNumber") {
        const { dateOfBirth, gender } = extractNICDetails(value);
        updatedFormData = { ...updatedFormData, dateOfBirth, gender };
        
        // If dateOfBirth was auto-filled, mark it as touched
        if (dateOfBirth) {
          setTouched(prev => ({
            ...prev,
            dateOfBirth: true
          }));
        }
        
        // Also validate the date of birth field since it was auto-filled
        validateField("dateOfBirth", dateOfBirth);
        
        // Validate the NIC itself
        validateField(name, value);
      }
  
      // If field has been touched, validate it as user types
      if (touched[name]) {
        validateField(name, value);
      }
  
      return updatedFormData;
    });
  };

  // Function to get error helper text
  const getHelperText = (fieldName) => {
    if (errors[fieldName] && errorMessages[fieldName]) {
      return errorMessages[fieldName];
    }
    return "";
  };
  

  useEffect(() => {
    // Special case: if parentData is empty (after form reset), reset the form
    if (parentData && Object.keys(parentData).length === 0) {
      // Reset code...
      return;
    }
    
    // Normal case: update from parent data
    if (parentData && JSON.stringify(parentData) !== JSON.stringify(formData)) {
      // Create a copy of parentData to modify
      const formattedData = {...parentData};
      
      // Format the date if it exists but isn't in YYYY-MM-DD format
      if (formattedData.dateOfBirth && !/^\d{4}-\d{2}-\d{2}$/.test(formattedData.dateOfBirth)) {
        // Convert the date to YYYY-MM-DD format
        try {
          const dateObj = new Date(formattedData.dateOfBirth);
          if (!isNaN(dateObj.getTime())) { // Check if valid date
            formattedData.dateOfBirth = dateObj.toISOString().split('T')[0];
          }
        } catch (err) {
          console.error("Error formatting date:", err);
        }
      }
      
      setFormData(formattedData);
      
      // Initialize errors state based on formatted data
      const initialErrors = {};
      Object.keys(errors).forEach(field => {
        if (isFieldRequired(field) && (!formattedData[field] || formattedData[field] === "")) {
          initialErrors[field] = true;
        } else {
          initialErrors[field] = false;
        }
      });
      setErrors(initialErrors);
    }
  }, [parentData]);
  

  return (
     <ThemeProvider theme={textFieldTheme}>
    <Grid container spacing={2} sx={{ mt: 4, ml:0 }}>

       <Grid  item xs={11.3}
                        container 
                        alignItems="center" 
                        sx={{ 
                          ml: 2.5, 
                          mt: 1, 
                          backgroundColor: "#E0E0E0" ,
                          borderRadius: 1, 
                          boxShadow: 3,
                        }}
                        
                      >
              <Grid>
                <Typography 
                  sx={{ ml: 0, mt:-2 }} 
                  variant="h6" 
                  gutterBottom 
                  style={{ 
                    fontStyle: "italic", 
                    color:"rgb(58, 53, 54)", 
                    fontFamily: 'Roboto, sans-serif', 
                    textAlign: "left" 
                  }}
                >
                  Spouse Details
                </Typography>
              </Grid>
            </Grid>
             <Grid item xs={11.5} container spacing={1} sx={{ ml: 0, mt:0}}>
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
              onKeyDown={(e) => handleKeyDown(e, "title")}
              inputRef={(el) => fieldRefs.current["title"] = el}
              required
              error={errors.title && touched.title}
              helperText={getHelperText("title")}
            >
              <MenuItem value="Mr">Mr.</MenuItem>
              <MenuItem value="Mrs">Mrs.</MenuItem>
            
            </TextField>
          </Grid>

          <Grid item xs={12} sm={10.5}>
            <TextField 
              label="Name with Initials" 
              name="nameWithInitials"
              fullWidth 
              variant="outlined" 
              value={formData.nameWithInitials} 
              onFocus={handleFocus}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={(e) => handleKeyDown(e, "nameWithInitials")}
              inputRef={(el) => fieldRefs.current["nameWithInitials"] = el}
              required
              error={errors.nameWithInitials && touched.nameWithInitials }
              
              helperText={getHelperText("nameWithInitials")}
            />
          </Grid>

          <Grid item xs={12} sm={10.5}>
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
            error={errors.fullName && touched.fullName}
            helperText={getHelperText("fullName")}
          />

          </Grid>
        

      <Grid item xs={12}>
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
      error={errors.nicNumber && touched.nicNumber}
      helperText={getHelperText("nicNumber")}
      InputProps={{ readOnly: isNicValidated }}
    />

      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField 
          label="Date of Birth" 
          name="dateOfBirth" 
          type="date" 
          fullWidth 
          variant="outlined" 
          InputLabelProps={{ shrink: true }} 
          value={formData.dateOfBirth || ""}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={(e) => handleKeyDown(e, "dateOfBirth")}
          inputRef={(el) => fieldRefs.current["dateOfBirth"] = el}
          required
          error={errors.dateOfBirth && touched.dateOfBirth}
          helperText={getHelperText("dateOfBirth")}
          InputProps={{ readOnly: isNicValidated }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField 
          label="Contact No" 
          name="contactNumber" 
          fullWidth 
          variant="outlined" 
          value={formData.contactNumber} 
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={(e) => handleKeyDown(e, "contactNumber")}
          inputRef={(el) => fieldRefs.current["contactNumber"] = el}
          required
          error={errors.contactNumber && touched.contactNumber}
          helperText={getHelperText("contactNumber")}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField 
          label="Address" 
          name="address" 
          fullWidth 
          variant="outlined" 
          value={formData.address} 
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={(e) => handleKeyDown(e, "address")}
          inputRef={(el) => fieldRefs.current["address"] = el}
          required
          error={errors.address && touched.address}
          helperText={getHelperText("address")}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField 
          label="Postal Code" 
          name="postalCode" 
          type="number" 
          fullWidth 
          variant="outlined" 
          value={formData.postalCode} 
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={(e) => handleKeyDown(e, "postalCode")}
          inputRef={(el) => fieldRefs.current["postalCode"] = el}
          required
          error={errors.postalCode && touched.postalCode}
          helperText={getHelperText("postalCode")}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField 
          label="Address of the place of work" 
          name="workPlaceAddress" 
          fullWidth 
          variant="outlined" 
          value={formData.workPlaceAddress} 
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={(e) => handleKeyDown(e, "workPlaceAddress")}
          inputRef={(el) => fieldRefs.current["workPlaceAddress"] = el}
          required
          error={errors.workPlaceAddress && touched.workPlaceAddress}
          helperText={getHelperText("workPlaceAddress")}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField 
          label="Contact No at the place of work" 
          name="workPlaceTeleNumber" 
          fullWidth 
          variant="outlined" 
          value={formData.workPlaceTeleNumber} 
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={(e) => handleKeyDown(e, "workPlaceTeleNumber")}
          inputRef={(el) => fieldRefs.current["workPlaceTeleNumber"] = el}
          required
          error={errors.workPlaceTeleNumber && touched.workPlaceTeleNumber}
          helperText={getHelperText("workPlaceTeleNumber")}
        />
      </Grid>
      </Grid>
    </Grid>
    </ThemeProvider>
  );
};

export default SpouseDetailsForm;