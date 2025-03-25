// import { useState, useEffect, useRef } from "react";
// import { TextField, Grid, Typography, MenuItem } from "@mui/material";

// const SpouseDetailsForm = ({ setSpouseDetails, parentData }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     nameWithInitials: "",
//     fullName: "",
//     dateOfBirth: "",
//     nicNumber: "",
//     address: "",
//     postalCode: "",
//     contactNumber: "",
//     workPlaceAddress: "",
//     workPlaceTeleNumber: "",
//     gender: ""
//   });
       
//   // Only update formData when parentData changes
//   useEffect(() => {
//     if (parentData && JSON.stringify(parentData) !== JSON.stringify(formData)) {
//       setFormData(parentData);
//     }
//   }, [parentData]);
  
//   // Only update parent when formData changes due to user input
//   // NOT when formData changes due to parentData updates
//   const isUserChange = useRef(false);
  
//   useEffect(() => {
//     // Only update the parent if this was a user-initiated change
//     if (isUserChange.current) {
//       setSpouseDetails(formData);
//       isUserChange.current = false;
//     }
//   }, [formData, setSpouseDetails]);
  
//   const extractNICDetails = (nic) => {
//     let birthYear, dayOfYear;
//     if (/^\d{9}[VX]$/.test(nic)) {
//       birthYear = `19${nic.substring(0, 2)}`;
//       dayOfYear = parseInt(nic.substring(2, 5), 10);
//     } else if (/^\d{12}$/.test(nic)) {
//       birthYear = nic.substring(0, 4);
//       dayOfYear = parseInt(nic.substring(4, 7), 10);
//     } else {
//       return { dateOfBirth: "", gender: "" };
//     }

//     let gender = "Male";
//     if (dayOfYear > 500) {
//       dayOfYear -= 500;
//       gender = "Female";
//     }
//     const dob = new Date(birthYear, 0, dayOfYear);
//     const dateOfBirth = dob.toISOString().split("T")[0];

//     return { dateOfBirth, gender };
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // Flag that this change was initiated by the user
//     isUserChange.current = true;
    
//     setFormData((prevFormData) => {
//       let updatedFormData = { ...prevFormData, [name]: value };
  
//       if (name === "nicNumber") {
//         const { dateOfBirth, gender } = extractNICDetails(value);
//         updatedFormData = { ...updatedFormData, dateOfBirth, gender };
//       }
  
//       return updatedFormData;
//     });
//   };

//   return (
//     <Grid container spacing={2} sx={{ mt: 4, ml:1 }}>
//      <Typography sx={{ ml: 1, mt: 4 }} variant="h4" gutterBottom style={{ fontStyle: "italic", color:"rgb(129, 43, 57)", fontFamily: 'Roboto, sans-serif', textAlign:'center'}}>
//              Details of Spouse 
//              </Typography>
//              <Grid item xs={11.5} container spacing={1} sx={{ ml: 0, mt:0}}>
//           <Grid item xs={12} sm={1.5}>
//             <TextField  select label="Title"  name="title"  fullWidth  variant="outlined"  value={formData.title}  onChange={handleChange}  required  >
//               <MenuItem value="Mr">Mr.</MenuItem>
//               <MenuItem value="Mrs">Mrs.</MenuItem>
//               <MenuItem value="Miss">Miss.</MenuItem>
//             </TextField>
//           </Grid>

//           <Grid item xs={12} sm={10.5}>
//             <TextField label="Name with Initials" name="nameWithInitials"fullWidth variant="outlined" value={formData.nameWithInitials} onChange={handleChange}  required />
//           </Grid>
        

//       <Grid item xs={12}>
//         <TextField label="NIC Number" name="nicNumber" fullWidth variant="outlined" value={formData.nicNumber} onChange={handleChange} required />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField label="Date of Birth" name="dateOfBirth" type="date" fullWidth variant="outlined" InputLabelProps={{ shrink: true }} value={formData.dateOfBirth} onChange={handleChange} required />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField label="Contact No" name="contactNumber" fullWidth variant="outlined" value={formData.contactNumber} onChange={handleChange} required />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField label="Address" name="address" fullWidth variant="outlined" value={formData.address} onChange={handleChange} required />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField label="Postal Code" name="postalCode" type="number" fullWidth variant="outlined" value={formData.postalCode} onChange={handleChange} required />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField label="Address of the place of work" name="workPlaceAddress" fullWidth variant="outlined" value={formData.workPlaceAddress} onChange={handleChange} required />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField label="Contact No at the place of work" name="workPlaceTeleNumber" fullWidth variant="outlined" value={formData.workPlaceTeleNumber} onChange={handleChange} required />
//       </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default SpouseDetailsForm;



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
    "nicNumber",
    "dateOfBirth",
    "contactNumber",
    "address",
    "postalCode",
    "workPlaceAddress",
    "workPlaceTeleNumber"
  ];
       
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
      "title", "nameWithInitials", "nicNumber", "dateOfBirth", 
      "contactNumber", "address", "postalCode", 
      "workPlaceAddress", "workPlaceTeleNumber"
    ];
    return requiredFields.includes(field);
  };

  // Function to validate a field
  const validateField = (name, value) => {
    if (!isFieldRequired(name)) return true;
    
    let isValid = value && value.toString().trim() !== "";
    
    // Update errors state
    setErrors(prev => ({
      ...prev,
      [name]: !isValid
    }));
    
    return isValid;
  };

  // Handle field blur (when user leaves a field)
  const handleBlur = (e) => {
    const { name } = e.target;
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
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
    if (/^\d{9}[VX]$/.test(nic)) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Flag that this change was initiated by the user
    isUserChange.current = true;
    
    setFormData((prevFormData) => {
      let updatedFormData = { ...prevFormData, [name]: value };
  
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
    if (errors[fieldName] && touched[fieldName]) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
    }
    return "";
  };

  return (
     <ThemeProvider theme={textFieldTheme}>
    <Grid container spacing={2} sx={{ mt: 4, ml:1 }}>
      
     <Typography sx={{ ml: 1, mt: 2 }} variant="h4" gutterBottom style={{ fontStyle: "italic", color:"#800020", fontFamily: 'Roboto, sans-serif', textAlign:'center'}}>
             Details of Spouse 
             </Typography>
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
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={(e) => handleKeyDown(e, "nameWithInitials")}
              inputRef={(el) => fieldRefs.current["nameWithInitials"] = el}
              required
              error={errors.nameWithInitials && touched.nameWithInitials}
              helperText={getHelperText("nameWithInitials")}
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
          onBlur={handleBlur}
          onKeyDown={(e) => handleKeyDown(e, "nicNumber")}
          inputRef={(el) => fieldRefs.current["nicNumber"] = el}
          required
          error={errors.nicNumber && touched.nicNumber}
          helperText={getHelperText("nicNumber")}
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
          value={formData.dateOfBirth} 
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={(e) => handleKeyDown(e, "dateOfBirth")}
          inputRef={(el) => fieldRefs.current["dateOfBirth"] = el}
          required
          error={errors.dateOfBirth && touched.dateOfBirth}
          helperText={getHelperText("dateOfBirth")}
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