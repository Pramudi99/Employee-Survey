






import { useState, useEffect, useRef } from "react";
import { TextField, Grid, MenuItem, Typography, FormHelperText } from "@mui/material";

const PersonalDetailsForm = ({ setPersonalDetails, parentData }) => {
  const [formData, setFormData] = useState({
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
    religion: "",
    race: "",
    numberOfDependents: "",
  });

 // Add errors state to track validation errors
 const [errors, setErrors] = useState({
  epfNumber: false,
  nameWithInitials: false,
  title: false,
  fullName: false,
  nicNumber: false,
  dateOfBirth: false,
  maritalStatus: false,
  bloodGroup: false,
  religion: false,
  race: false,
  numberOfDependents: false,
});


// Add errorMessages state
const [errorMessages, setErrorMessages] = useState({
  epfNumber: "",
  nameWithInitials: "",
  title: "",
  fullName: "",
  nicNumber: "",
  dateOfBirth: "",
  maritalStatus: "",
  bloodGroup: "",
  religion: "",
  race: "",
  numberOfDependents: "",
});

  // Track which fields should show errors (only after Enter key press)
  const [showErrors, setShowErrors] = useState({
    epfNumber: false,
    nameWithInitials: false,
    title: false,
    fullName: false,
    nicNumber: false,
    dateOfBirth: false,
    maritalStatus: false,
    bloodGroup: false,
    religion: false,
    race: false,
    numberOfDependents: false,
  });

  // Create refs for field navigation
  const fieldRefs = useRef({});

  // Order of fields for navigation
  const fieldOrder = [
    "epfNumber",
    "title",
    "nameWithInitials",
    "fullName",
    "nicNumber",
    "dateOfBirth", 
    "maritalStatus",
     "religion",
    "race",
    "bloodGroup",
     "numberOfDependents",
    "drivingLicense",
    "passportNumber"
   

  ];





  useEffect(() => {
    if (parentData) {
      setFormData((prevData) => ({
        ...prevData,
        ...parentData,
      }));

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

  // Function to determine if a field is required
  const isFieldRequired = (field) => {
    const requiredFields = [
      "epfNumber", "nameWithInitials", "title", "fullName", 
      "nicNumber", "dateOfBirth", "maritalStatus", "bloodGroup", 
      "religion", "race", "numberOfDependents"
    ];
    return requiredFields.includes(field);
  };

  

// In PersonalDetailsForm.jsx (and other similar components)
useEffect(() => {
  // Reset internal form state when parent data changes to an empty object
  if (parentData && Object.keys(parentData).length === 0) {
    setFormData({
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
      religion: "",
      race: "",
      numberOfDependents: "",
    });
    
    // Reset errors and showErrors states as well
    setErrors({
      epfNumber: false,
      nameWithInitials: false,
      title: false,
      fullName: false,
      nicNumber: false,
      dateOfBirth: false,
      maritalStatus: false,
      bloodGroup: false,
      religion: false,
      race: false,
      numberOfDependents: false,
    });
    
    setShowErrors({
      epfNumber: false,
      nameWithInitials: false,
      title: false,
      fullName: false,
      nicNumber: false,
      dateOfBirth: false,
      maritalStatus: false,
      bloodGroup: false,
      religion: false,
      race: false,
      numberOfDependents: false,
    });
  }
}, [parentData]);




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


  // Handle field blur (when user leaves a field)
  const handleBlur = (e) => {
    const { name } = e.target;
    
    // Only validate the field, but don't show error
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
      
      // Validate current field
      const isValid = validateField(fieldName, formData[fieldName]);
      
      // Only show error for this field if Enter is pressed
      setShowErrors(prev => ({
        ...prev,
        [fieldName]: true
      }));
      
      // If valid, move to next field
      if (isValid) {
        const nextFieldId = getNextFieldId(fieldName);
        if (nextFieldId && fieldRefs.current[nextFieldId]) {
          fieldRefs.current[nextFieldId].focus();
        }
      }
    }
  };

  // Function to extract birthday and gender from NIC number
  const extractNICDetails = (nic) => {
    let birthYear, dayOfYear;
    
    // Clean the NIC (handle capital/lowercase V/X)
    const cleanNic = nic.toUpperCase();
    
    if (/^\d{9}[VX]$/.test(cleanNic)) {
      // Old NIC format: 921532345V
      birthYear = `19${cleanNic.substring(0, 2)}`;
      dayOfYear = parseInt(cleanNic.substring(2, 5), 10);
    } else if (/^\d{12}$/.test(cleanNic)) {
      // New NIC format: 200212345678
      birthYear = cleanNic.substring(0, 4);
      dayOfYear = parseInt(cleanNic.substring(4, 7), 10);
    } else {
      // Invalid format - don't extract details
      return { dateOfBirth: "", gender: "" };
    }

    // Determine gender
    let gender = "Male";
    if (dayOfYear > 500) {
      dayOfYear -= 500;
      gender = "Female";
    }
    
    if (((birthYear % 4) === 0) || (dayOfYear <= 59 ) ) {  // Corrected condition syntax
        const dob = new Date(birthYear, 0, dayOfYear + 1); 
        var dateOfBirth = dob.toISOString().split("T")[0]; // Declare with var/let to use outside if block
    } else {
        // Convert dayOfYear to actual date
        const dob = new Date(birthYear, 0, dayOfYear);
        var dateOfBirth = dob.toISOString().split("T")[0]; // Declare with var/let
    }
   
    return { dateOfBirth, gender };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;



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

     // Special handling for EPF number
  if (name === "epfNumber") {
    // Allow input to be processed even with symbols so we can show the error
    // But immediately validate to show errors
    validateField(name, value);
    
    // Only allow valid numeric input for state update
    if (!/^\d*$/.test(value)) {
      // Update formData but don't allow symbols in the actual value
      setFormData(prev => ({...prev})); // Keep previous state
      return;
    }
    // If exceeding max length, also show error but allow update
    if (value.length > 7) {
      setShowErrors(prev => ({...prev, [name]: true}));
    }
    }
 // Special handling for NIC number
 if (name === "nicNumber") {
  // Validate as user types
  
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


    setFormData((prevFormData) => {
      let updatedFormData = { ...prevFormData, [name]: value };

      if (name === "nicNumber") {
        const { dateOfBirth, gender } = extractNICDetails(value);
         // Only update date of birth and gender if a valid NIC was provided
         if (dateOfBirth) {
          updatedFormData = { ...updatedFormData, dateOfBirth, gender };
          
          // Also validate the date of birth field since it was auto-filled
          validateField("dateOfBirth", dateOfBirth);
        }
      }
         
      setPersonalDetails(updatedFormData);  // Pass updated data to parent
      return updatedFormData; // Ensures React gets the correct state update
    });
  };

  // Function to get error helper text
  const getHelperText = (fieldName) => {
    if (errors[fieldName] && showErrors[fieldName]) {
      return errorMessages[fieldName] || `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
    }
    return "";
  };

  // Function to determine if field should show error state
  const shouldShowError = (fieldName) => {
    return errors[fieldName] && showErrors[fieldName];
  };

  return (
    <Grid container spacing={2}>
      <Typography 
        sx={{ ml: 3, mt: 4 }} 
        variant="h4" 
        gutterBottom 
        style={{ 
          fontStyle: "italic", 
          color:"rgb(129, 43, 57)", 
          fontFamily: 'Roboto, sans-serif', 
          textAlign:'center'
        }}
      >
        General Details 
      </Typography>
      <Grid item xs={11.5} container spacing={1} sx={{ ml: 2, mt: 3 }}>
        <Grid>
          <Typography 
            sx={{ ml: 1, mt: -2 }} 
            variant="h5" 
            gutterBottom 
            style={{ 
              fontStyle: "italic", 
              color:"rgb(58, 53, 54)", 
              fontFamily: 'Roboto, sans-serif', 
              textAlign: "left" 
            }}
          >
            Personal Details 
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField 
            label="EPF Number" 
            name="epfNumber" 
            fullWidth 
            variant="outlined" 
            value={formData.epfNumber} 
            onChange={handleChange} 
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, "epfNumber")}
            inputRef={(el) => fieldRefs.current["epfNumber"] = el}
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
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, "nicNumber")}
            inputRef={(el) => fieldRefs.current["nicNumber"] = el}
            required 
            error={shouldShowError("nicNumber")}
            helperText={getHelperText("nicNumber")}
            inputProps={{ maxLength: 12 }}
            placeholder="9 digits + V/X or 12 digits"
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
        <Grid item xs={12} sm={3}>
          <TextField 
            select 
            label="Marital Status" 
            name="maritalStatus" 
            fullWidth 
            variant="outlined" 
            value={formData.maritalStatus} 
            onChange={handleChange} 
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
                value={formData.religion} 
                onChange={handleChange} 
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
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, "bloodGroup")}
            inputRef={(el) => fieldRefs.current["bloodGroup"] = el}
            required
            error={shouldShowError("bloodGroup")}
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
                // type="number"
                fullWidth 
                variant="outlined" 
                value={formData.numberOfDependents} 
                onChange={handleChange} 
                onBlur={handleBlur}
                onKeyDown={(e) => handleKeyDown(e, "numberOfDependents")}
                inputRef={(el) => fieldRefs.current["numberOfDependents"] = el}
                required
                error={shouldShowError("numberOfDependents")}
                helperText={getHelperText("numberOfDependents")}
                inputProps={{ min: 0, max: 15 }}
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
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, "passportNumber")}
            inputRef={(el) => fieldRefs.current["passportNumber"] = el}
          />
        </Grid>
       
      </Grid>
    </Grid>
  );
};

export default PersonalDetailsForm;