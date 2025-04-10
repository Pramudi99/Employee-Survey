





// // import { Grid, Typography, TextField, MenuItem, Autocomplete } from "@mui/material";
// // import React, { useState, useEffect, useRef } from "react";
// // import addressData from "../../data/addressData.json";
// // import { createTheme, ThemeProvider } from "@mui/material/styles";


// // const textFieldTheme = createTheme({
// //   components: {
// //     MuiTextField: {
// //       styleOverrides: {
// //         root: {
// //           '& .MuiOutlinedInput-root': {
// //             height: '45px',
// //             '& input': {
// //               color: '#2C3E50'
// //             },
// //             '&:hover .MuiOutlinedInput-notchedOutline': {
// //               borderColor: '#2C3E50'
// //             },
// //             '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
// //               borderColor: '#2C3E50'
// //             }
// //           },
// //           '& .MuiInputLabel-root': {
// //             color: '#2C3E50'
// //           }
// //         }
// //       }
// //     }
// //   }
// // });

// // const ContactDetails = ({ setContactDetails, parentData }) => {
// //   // Initialize with empty object if parentData is undefined
// //   const initialData = parentData || {};
// //   const prevParentDataRef = useRef(initialData);
  
// //   // State to store form data - ensure all values are at least empty strings to keep inputs controlled
// //   const [formData, setFormData] = useState({
// //     temporaryAddress: initialData.temporaryAddress || "",
// //     temporaryPostalCode: initialData.temporaryPostalCode || "",
// //     temporaryDistrict: initialData.temporaryDistrict || "",
// //     temporaryProvince: initialData.temporaryProvince || "",
// //     distantBetWorkPlaceAndTemporyAddress: initialData.distantBetWorkPlaceAndTemporyAddress || "",
// //     permanentAddress: initialData.permanentAddress || "",
// //     permanentPostalCode: initialData.permanentPostalCode || "",
// //     permanentGramaDivision: initialData.permanentGramaDivision || "",
// //     permanentAGADivision: initialData.permanentAGADivision || "",
// //     permanentElectoral: initialData.permanentElectoral || "",
// //     policeDivision: initialData.policeDivision || "",
// //     permanentDistrict: initialData.permanentDistrict || "",
// //     permanentProvince: initialData.permanentProvince || "",
// //     distantBetWorkPlaceAndPermanentAddress: initialData.distantBetWorkPlaceAndPermanentAddress || "",
// //     telephoneNumber: initialData.telephoneNumber || "",
// //     contactId: initialData.contactId || 0,  // Preserve contactId for updates
// //   });

// //   // Add state for validation errors
// //   const [errors, setErrors] = useState({});

// //   // Track if form has been updated by user input
// //   const formUpdatedByUser = useRef(false);

// //   // Create refs for all input fields to enable focus movement
// //   const inputRefs = useRef({});

// //   // Define field order for navigation
// //   const fieldOrder = [
// //     "permanentAddress",
// //     "permanentPostalCode",
// //     "permanentGramaDivision",
// //     "policeDivision",
// //     "distantBetWorkPlaceAndPermanentAddress",
// //     "telephoneNumber",
// //     "temporaryAddress",
// //     "temporaryPostalCode",
// //     "temporaryDistrict",
// //     "distantBetWorkPlaceAndTemporyAddress"
  
// //   ];

// //   const sriLankanDistricts = [
// //     "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", 
// //     "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", 
// //     "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", 
// //     "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", 
// //     "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
// //   ];

// //   // Update formData when parentData changes
// //   useEffect(() => {
// //     // Only update if parentData exists
// //     if (parentData && JSON.stringify(prevParentDataRef.current) !== JSON.stringify(parentData)) {
// //       // Create a new object ensuring all fields have at least empty string values
// //       const updatedData = {
// //         temporaryAddress: parentData.temporaryAddress || "",
// //         temporaryPostalCode: parentData.temporaryPostalCode || "",
// //         temporaryDistrict: parentData.temporaryDistrict || "",
// //         temporaryProvince: parentData.temporaryProvince || "",
// //         distantBetWorkPlaceAndTemporyAddress: parentData.distantBetWorkPlaceAndTemporyAddress || "",
// //         permanentAddress: parentData.permanentAddress || "",
// //         permanentPostalCode: parentData.permanentPostalCode || "",
// //         permanentGramaDivision: parentData.permanentGramaDivision || "",
// //         permanentAGADivision: parentData.permanentAGADivision || "",
// //         permanentElectoral: parentData.permanentElectoral || "",
// //         policeDivision: parentData.policeDivision || "",
// //         permanentDistrict: parentData.permanentDistrict || "",
// //         permanentProvince: parentData.permanentProvince || "",
// //         distantBetWorkPlaceAndPermanentAddress: parentData.distantBetWorkPlaceAndPermanentAddress || "",
// //         telephoneNumber: parentData.telephoneNumber || "",
// //         contactId: parentData.contactId || 0,
// //       };

// //       setFormData(updatedData);
// //       prevParentDataRef.current = parentData;
// //       // Reset user update flag when parent data changes
// //       formUpdatedByUser.current = false;
// //       // Clear any errors when loading new data
// //       setErrors({});
// //     }
// //   }, [parentData]);

// //   // Update parent component only when form is changed by user input
// //   useEffect(() => {
// //     if (formUpdatedByUser.current) {
// //       // Make a defensive copy to ensure we don't pass undefined values back up
// //       const dataToSend = { ...formData };
      
// //       // Ensure no undefined values are sent to parent
// //       Object.keys(dataToSend).forEach(key => {
// //         if (dataToSend[key] === undefined) {
// //           dataToSend[key] = "";
// //         }
// //       });
      
// //       setContactDetails(dataToSend);
// //     }
// //   }, [formData, setContactDetails]);

// //   // Function to validate a single field
// //   const validateField = (name, value) => {
// //     // Skip validation for read-only fields
// //     const readOnlyFields = ['temporaryProvince', 'permanentProvince', 'permanentDistrict', 'permanentElectoral', 'permanentAGADivision'];
// //     if (readOnlyFields.includes(name)) return '';
    
// //     // Validate required fields
// //     if (value.trim() === '') return 'This field is required';
    
// //     // Distance fields validation (must be a positive number)
// //     if (name.includes('distant') && (isNaN(value) || Number(value) < 0)) {
// //       return 'Please enter a valid positive number';
// //     }
    
// //     // Telephone number validation
// //     if (name === 'telephoneNumber') {
// //       // Simple regex for phone number validation
// //       const phoneRegex = /^[0-9]{10}$/;
// //       if (!phoneRegex.test(value)) return 'Please enter a valid 10-digit phone number';
// //     }

// //     if (['permanentGramaDivision', 'policeDivision'].includes(name)) {
// //       const letterOnlyRegex = /^[A-Za-z\s]+$/;
// //       if (!letterOnlyRegex.test(value)) return 'Only letters are allowed';
// //     }
    
// //     return '';
// //   };

// //   const fieldDependencies = {
// //     permanentAddress: [],
// //     permanentPostalCode: ['permanentAddress'],
// //     permanentGramaDivision: ['permanentAddress', 'permanentPostalCode'],
// //     policeDivision: ['permanentAddress', 'permanentPostalCode', 'permanentGramaDivision'],
// //     distantBetWorkPlaceAndPermanentAddress: [
// //       'permanentAddress', 
// //       'permanentPostalCode', 
// //       'permanentGramaDivision', 
// //       'policeDivision'
// //     ],
// //     telephoneNumber: [
// //       'permanentAddress', 
// //       'permanentPostalCode', 
// //       'permanentGramaDivision', 
// //       'policeDivision', 
// //       'distantBetWorkPlaceAndPermanentAddress'
// //     ],
// //     temporaryAddress: [],
// //     temporaryPostalCode: ['temporaryAddress'],
// //     temporaryDistrict: ['temporaryAddress', 'temporaryPostalCode'],
// //     distantBetWorkPlaceAndTemporyAddress: [
// //       'temporaryAddress', 
// //       'temporaryPostalCode', 
// //       'temporaryDistrict'
// //     ]
// //   };

// //   // Method to validate field dependencies
// //   const validateFieldDependencies = (fieldName) => {
// //     // Get the dependencies for this field
// //     const dependencies = fieldDependencies[fieldName] || [];
    
// //     // Check if all dependencies are filled
// //     const missingDependencies = dependencies.filter(dep => {
// //       const value = formData[dep];
// //       return !value || value.trim() === '';
// //     });

// //     return missingDependencies;
// //   };

// //   // Handle focus with dependency check
// //   const handleFocus = (e) => {
// //     const { name } = e.target;
    
// //     // Check for missing dependencies
// //     const missingDependencies = validateFieldDependencies(name);
    
// //     if (missingDependencies.length > 0) {
// //       // Find the first missing dependency
// //       const firstMissingField = missingDependencies[0];
      
// //       const newErrors = missingDependencies.reduce((acc, dep) => ({
// //         ...acc,
// //         [dep]: `Please fill out ${dep.replace(/([A-Z])/g, ' $1').toLowerCase()} first`
// //       }), {});
      
// //       // Update errors state
// //       setErrors(prevErrors => ({
// //         ...prevErrors,
// //         ...newErrors
// //       }));
      
// //       if (inputRefs.current[firstMissingField]) {
// //         inputRefs.current[firstMissingField].focus();
// //       }
      
// //       e.preventDefault();
// //     }
// //   };



// //   // Function to move to the next field
// //   const moveToNextField = (currentField) => {
// //     const currentIndex = fieldOrder.indexOf(currentField);
// //     if (currentIndex !== -1 && currentIndex < fieldOrder.length - 1) {
// //       const nextField = fieldOrder[currentIndex + 1];
// //       if (inputRefs.current[nextField]) {
// //         inputRefs.current[nextField].focus();
// //       }
// //     }
// //   };

// //   const capitalizeEachWord = (str) => {
// //     return str
// //       .split(' ')
// //       .map(word => {
// //         const trimmedWord = word.trim();
// //         return trimmedWord
// //           ? trimmedWord.charAt(0).toUpperCase() + trimmedWord.slice(1).toLowerCase()
// //           : '';
// //       })
// //       .join(' ');
// //   };
  
  

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
  
// //     // Format the value to have the first letter in uppercase and the rest lowercase
// //     const formattedValue = capitalizeEachWord(value);

  
// //     // Set flag to indicate this is a user-initiated update
// //     formUpdatedByUser.current = true;

// //     if (name === 'permanentAddress' || name === 'temporaryAddress') {
// //       const allowedCharsRegex = /^[A-Za-z0-9\s.,'\/]*$/;
    
// //       if (!allowedCharsRegex.test(value)) {
// //         return; // Invalid characters; skip update
// //       }
    
// //       const formattedValue = capitalizeEachWord(value);
    
// //       setFormData(prev => ({
// //         ...prev,
// //         [name]: formattedValue
// //       }));
    
// //       setErrors(prev => ({
// //         ...prev,
// //         [name]: ''
// //       }));
    
// //       formUpdatedByUser.current = true;
// //       return;
// //     }
    
    
  
// //     // If the field is related to postal code (both permanent and temporary), ensure it only allows integers
// //     if (name === 'permanentPostalCode' || name === 'temporaryPostalCode') {
// //       if (!/^\d*$/.test(value)) {
// //         return; // Ignore the change if it's not a valid integer
// //       }
// //     }

// //     if (['permanentGramaDivision', 'policeDivision'].includes(name)) {
// //       const onlyLettersSpaces = /^[A-Za-z\s]*$/;
    
// //       if (!onlyLettersSpaces.test(value)) {
// //         return; // block invalid characters
// //       }
    
// //       const capitalized = capitalizeEachWord(value);
    
// //       setFormData(prev => ({
// //         ...prev,
// //         [name]: capitalized
// //       }));
    
// //       setErrors(prev => ({
// //         ...prev,
// //         [name]: ''
// //       }));
    
// //       formUpdatedByUser.current = true;
// //       return;
// //     }
    
  
// //     // Start with a copy of current form data
// //     const updatedFormData = { ...formData };
  
// //     // Set the changed field (always ensure it's at least an empty string)
// //     updatedFormData[name] = formattedValue || "";
  
// //     // Handle dependent fields for permanentGramaDivision
// //     if (name === "permanentGramaDivision") {
// //       const addressInfo = addressData.find(
// //         (item) => item.GND_Name.trim().toLowerCase() === value.trim().toLowerCase()
// //       );
    
// //       if (addressInfo) {
// //         updatedFormData.permanentProvince = addressInfo.Province_Name || "";
// //         updatedFormData.permanentDistrict = addressInfo.District_Name || "";
// //         updatedFormData.permanentElectoral = addressInfo.Polling_Division_Name || "";
// //         updatedFormData.permanentAGADivision = addressInfo.DSD_Name || "";
// //       } else {
// //         updatedFormData.permanentProvince = "";
// //         updatedFormData.permanentDistrict = "";
// //         updatedFormData.permanentElectoral = "";
// //         updatedFormData.permanentAGADivision = "";
// //       }
// //     }
    
    
// //     // Handle dependent fields for temporaryDistrict
// //     if (name === "temporaryDistrict") {
// //       const addressInfo = addressData.find((item) => item.District_Name === formattedValue);
// //       updatedFormData.temporaryProvince = addressInfo ? (addressInfo.Province_Name || "") : "";
// //     }
  
// //     // Clear error for this field if value is valid
// //     const error = validateField(name, formattedValue);
// //     setErrors(prevErrors => ({
// //       ...prevErrors,
// //       [name]: error
// //     }));
  
// //     // Update the form data with the new formatted value
// //     setFormData(updatedFormData);
// //   };

  

  
// //    // Function to generate auto-suggest options for temporary address
// //    const generateTemporaryAddressSuggestions = () => {
// //     // If permanent address is empty, return empty array
// //     if (!formData.permanentAddress) return [];

// //     // Create suggestions based on permanent address
// //     const suggestions = [
// //       {
// //         label: formData.permanentAddress,
// //         postalCode: formData.permanentPostalCode,
// //         district: formData.permanentDistrict,
// //         province: formData.permanentProvince,
// //         distance: formData.distantBetWorkPlaceAndPermanentAddress
// //       },
// //     ];

// //     return suggestions;
// //   };

// //   // Handle address suggestion selection
// //   const handleAddressSuggestionSelect = (event, newValue) => {
// //     // Create a copy of current form data
// //     const updatedFormData = { ...formData };

// //     if (newValue && typeof newValue === 'object') {
// //       // Direct update of fields
// //       updatedFormData.temporaryAddress = newValue.label || "";
// //       updatedFormData.temporaryPostalCode = newValue.postalCode || "";
// //       updatedFormData.distantBetWorkPlaceAndTemporyAddress = newValue.distance || "";

// //       // Find district information from addressData
// //       const districtInfo = addressData.find((item) => 
// //         item.District_Name === newValue.district
// //       );

// //       // Update district and province
// //       if (districtInfo) {
// //         updatedFormData.temporaryDistrict = districtInfo.District_Name || "";
// //         updatedFormData.temporaryProvince = districtInfo.Province_Name || "";
// //       } else {
// //         // Fallback to original values if no match found
// //         updatedFormData.temporaryDistrict = newValue.district || "";
// //         updatedFormData.temporaryProvince = newValue.province || "";
// //       }

// //       // Set the updated form data
// //       setFormData(updatedFormData);

// //       // Set flag to indicate user update
// //       formUpdatedByUser.current = true;
// //     } else {
// //       // If it's a free-form input, just update the address
// //       const syntheticEvent = {
// //         target: {
// //           name: "temporaryAddress",
// //           value: newValue || ""
// //         }
// //       };
// //       handleChange(syntheticEvent);
// //     }
// //   };
  
// //   // Handle key press events
// //   const handleKeyPress = (e) => {
// //     const { name, value } = e.target;
    
// //     // If Enter key is pressed
// //     if (e.key === 'Enter') {
// //       e.preventDefault();
      
// //       // First validate the current field
// //       const error = validateField(name, value);
      
// //       // Update error state for this field only
// //       setErrors(prevErrors => ({
// //         ...prevErrors,
// //         [name]: error
// //       }));
      
// //       // If field is valid, move to next field
// //       if (!error) {
// //         moveToNextField(name);
// //       }
// //     }
// //   };

// //   return (
// //      <ThemeProvider theme={textFieldTheme}>
// //     <Grid item xs={11.4} container spacing={2} sx={{ ml: 3 }}>
// //     <Grid  
// //           container 
// //           alignItems="center" 
// //           sx={{ 
// //             mr: 0, 
// //             mt: 10, 
// //             backgroundColor: "#E0E0E0" ,
// //             borderRadius: 1, 
// //             boxShadow: 3,  
// //           }}
          
// //         >
// //       <Grid >
// //         <Typography
// //           sx={{ ml: 2, mt: 1 }}
// //           variant="h6"
// //           gutterBottom
// //           style={{
// //             fontStyle: "italic",
// //             color: "rgb(58, 53, 54)",
// //             fontFamily: "Roboto, sans-serif",
// //             textAlign: "left",
// //           }}
// //         >
// //           Contact Details
// //         </Typography>
// //       </Grid>
// //      </Grid>
   
// //       {/* Permanent Address Section */}
// //       <Typography variant="h6" sx={{ mt: 5, ml: 0, mb: 2 }} style={{ fontStyle: "italic", fontSize: "18px", color: "rgb(41, 40, 40)" }}>
// //         Permanent Address Details
// //       </Typography>
// //       <Grid container spacing={1}>
// //         <Grid item xs={12} sm={10}>
// //           <TextField 
// //             label="Permanent Address" 
// //             name="permanentAddress" 
// //             fullWidth 
// //             variant="outlined" 
// //             value={formData.permanentAddress} 
// //             onChange={handleChange}
// //             onFocus={handleFocus}
// //             onKeyPress={handleKeyPress}
// //             error={!!errors.permanentAddress}
// //             helperText={errors.permanentAddress || ''}
// //             inputRef={el => inputRefs.current.permanentAddress = el}
// //             required 
// //           />
// //         </Grid>
// //         <Grid item xs={12} sm={2}>
// //           <TextField 
// //             label="Postal Code" 
// //             name="permanentPostalCode" 
// //             fullWidth 
// //             variant="outlined" 
// //             value={formData.permanentPostalCode} 
// //             onChange={handleChange}
// //             onFocus={handleFocus}
// //             onKeyPress={handleKeyPress}
// //             error={!!errors.permanentPostalCode}
// //             helperText={errors.permanentPostalCode || ''}
// //             inputRef={el => inputRefs.current.permanentPostalCode = el}
// //             required 
// //           />
// //         </Grid>
// //         <Grid item xs={12} sm={4}>
// //           <TextField 
// //             label="Grama Division" 
// //             name="permanentGramaDivision" 
// //             fullWidth 
// //             variant="outlined" 
// //             value={formData.permanentGramaDivision} 
// //             onChange={handleChange}
// //             onFocus={handleFocus}
// //             onKeyPress={handleKeyPress}
// //             error={!!errors.permanentGramaDivision}
// //             helperText={errors.permanentGramaDivision || ''}
// //             inputRef={el => inputRefs.current.permanentGramaDivision = el}
// //             required 
// //           />
// //         </Grid>
// //         <Grid item xs={12} sm={4}>
// //           <TextField 
// //             label="AGA Division" 
// //             name="permanentAGADivision" 
// //             fullWidth 
// //             variant="outlined" 
// //             value={formData.permanentAGADivision} 
// //             InputProps={{ readOnly: true }} 
// //           />
// //         </Grid>
// //         <Grid item xs={12} sm={4}>
// //           <TextField 
// //             label="Electoral Division" 
// //             name="permanentElectoral" 
// //             fullWidth 
// //             variant="outlined" 
// //             value={formData.permanentElectoral} 
// //             InputProps={{ readOnly: true }} 
// //           />
// //         </Grid>
// //         <Grid item xs={12} sm={4}>
// //           <TextField 
// //             label="Police Division" 
// //             name="policeDivision" 
// //             fullWidth 
// //             variant="outlined" 
// //             value={formData.policeDivision} 
// //             onChange={handleChange}
// //             onFocus={handleFocus}
// //             onKeyPress={handleKeyPress}
// //             error={!!errors.policeDivision}
// //             helperText={errors.policeDivision || ''}
// //             inputRef={el => inputRefs.current.policeDivision = el}
// //             required 
// //           />
// //         </Grid>
// //         <Grid item xs={12} sm={4}>
// //           <TextField 
// //             label="District" 
// //             name="permanentDistrict" 
// //             fullWidth 
// //             variant="outlined" 
// //             value={formData.permanentDistrict} 
// //             InputProps={{ readOnly: true }} 
// //           />
// //         </Grid>
// //         <Grid item xs={12} sm={4}>
// //           <TextField 
// //             label="Province" 
// //             name="permanentProvince" 
// //             fullWidth 
// //             variant="outlined" 
// //             value={formData.permanentProvince} 
// //             InputProps={{ readOnly: true }} 
// //           />
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //           <TextField 
// //             label="Distance to Workplace (km)" 
// //             name="distantBetWorkPlaceAndPermanentAddress" 
// //             type="number" 
// //             fullWidth 
// //             variant="outlined" 
// //             value={formData.distantBetWorkPlaceAndPermanentAddress} 
// //             onChange={handleChange}
// //             onFocus={handleFocus}
// //             onKeyPress={handleKeyPress}
// //             error={!!errors.distantBetWorkPlaceAndPermanentAddress}
// //             helperText={errors.distantBetWorkPlaceAndPermanentAddress || ''}
// //             inputRef={el => inputRefs.current.distantBetWorkPlaceAndPermanentAddress = el}
// //             required 
// //           />
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //           <TextField 
// //             label="Telephone Number" 
// //             name="telephoneNumber" 
// //             fullWidth 
// //             variant="outlined" 
// //             value={formData.telephoneNumber} 
// //             onChange={handleChange}
// //             onFocus={handleFocus}
// //             onKeyPress={handleKeyPress}
// //             error={!!errors.telephoneNumber}
// //             helperText={errors.telephoneNumber || ''}
// //             inputRef={el => inputRefs.current.telephoneNumber = el}
// //             required 
// //           />
// //         </Grid>
// //       </Grid>

// //         {/* Temporary Address Section */}
// //         <Grid container spacing={1}>
// //           <Typography variant="h6" sx={{ mt: 3, ml: 2 }} style={{ fontStyle: "italic", fontSize: "18px", color: "rgb(41, 40, 40)" }}>
// //             Temporary Address Details
// //           </Typography>
// //           <Grid item xs={10}>
// //           {/* <Autocomplete
// //         freeSolo
// //         options={generateTemporaryAddressSuggestions()}
// //         getOptionLabel={(option) => 
// //           typeof option === 'object' ? option.label : option
// //         }
// //         onChange={handleAddressSuggestionSelect}
        
// //         renderInput={(params) => (
// //           <TextField 
// //             {...params}
// //             label="Temporary Address" 
// //             name="temporaryAddress" 
// //             fullWidth 
// //             variant="outlined"   
// //             error={!!errors.temporaryAddress}
// //             helperText={errors.temporaryAddress || ''}
// //             inputRef={el => inputRefs.current.temporaryAddress = el}
// //             required 
// //             onKeyPress={handleKeyPress}
            
// //           />
// //         )} */}
// //         <Autocomplete
// //               freeSolo
// //               options={generateTemporaryAddressSuggestions()}
// //               value={formData.temporaryAddress} // Add this line
// //               getOptionLabel={(option) => 
// //                 typeof option === 'object' ? option.label : option
// //               }
// //               onChange={handleAddressSuggestionSelect}
// //               renderInput={(params) => (
// //                 <TextField 
// //                   {...params}
// //                   label="Temporary Address" 
// //                   name="temporaryAddress" 
// //                   fullWidth 
// //                   variant="outlined"   
// //                   value={formData.temporaryAddress} // Ensure value is explicitly set
// //                   onChange={(e) => {
// //                     // Add this handler to ensure value updates even without suggestion
// //                     handleChange({
// //                       target: {
// //                         name: 'temporaryAddress',
// //                         value: e.target.value
// //                       }
// //                     });
// //                   }}
// //                   error={!!errors.temporaryAddress}
// //                   helperText={errors.temporaryAddress || ''}
// //                   inputRef={el => inputRefs.current.temporaryAddress = el}
// //                   required 
// //                   onKeyPress={handleKeyPress}
// //                 />
// //               )}
// //             />
      
// //           </Grid>
// //         <Grid item xs={12} sm={2}>
// //           <TextField 
// //             label="Postal Code" 
// //             name="temporaryPostalCode" 
// //             fullWidth 
// //             variant="outlined" 
// //             value={formData.temporaryPostalCode} 
// //             onChange={handleChange}
// //              onFocus={handleFocus}
// //             onKeyPress={handleKeyPress}
// //             error={!!errors.temporaryPostalCode}
// //             helperText={errors.temporaryPostalCode || ''}
// //             inputRef={el => inputRefs.current.temporaryPostalCode = el}
// //             required 
// //           />
// //         </Grid>
        
// //         <Grid item xs={12} sm={4}>
// //           <Autocomplete
// //             options={sriLankanDistricts}
// //             value={formData.temporaryDistrict}
// //             onChange={(event, newValue) => {
// //               // Create a synthetic event object to work with your existing handleChange function
// //               const syntheticEvent = {
// //                 target: {
// //                   name: "temporaryDistrict",
// //                   value: newValue || ""
// //                 }
// //               };
// //               handleChange(syntheticEvent);
// //             }}
// //             onFocus={handleFocus}
// //             renderInput={(params) => (
// //               <TextField
// //                 {...params}
// //                 label="District"
// //                 name="temporaryDistrict"
// //                 fullWidth
// //                 variant="outlined"
// //                 error={!!errors.temporaryDistrict}
// //                 helperText={errors.temporaryDistrict || ''}
// //                 inputRef={el => inputRefs.current.temporaryDistrict = el}
// //                 required
// //                 onKeyPress={handleKeyPress}
// //               />
// //             )}
// //           />
// //         </Grid>
// //         <Grid item xs={12} sm={4}>
// //           <TextField 
// //             label="Province" 
// //             name="temporaryProvince" 
// //             fullWidth 
// //             variant="outlined" 
// //             value={formData.temporaryProvince} 
// //             InputProps={{ readOnly: true }} 
// //           />
// //         </Grid>
// //         <Grid item xs={12} sm={3}>
// //           <TextField 
// //             label="Distance to Workplace (km)" 
// //             name="distantBetWorkPlaceAndTemporyAddress" 
// //             type="number" 
// //             fullWidth 
// //             variant="outlined" 
// //             value={formData.distantBetWorkPlaceAndTemporyAddress} 
// //             onChange={handleChange}
// //             onFocus={handleFocus}
// //             onKeyPress={handleKeyPress}
// //             error={!!errors.distantBetWorkPlaceAndTemporyAddress}
// //             helperText={errors.distantBetWorkPlaceAndTemporyAddress || ''}
// //             inputRef={el => inputRefs.current.distantBetWorkPlaceAndTemporyAddress = el}
// //             required 
// //           />
// //         </Grid>
// //       </Grid>
// //     </Grid>
// //     </ThemeProvider>
// //   );
// // };

// // export default ContactDetails;






















// import { Grid, Typography, TextField, MenuItem, Autocomplete } from "@mui/material";
// import React, { useState, useEffect, useRef } from "react";
// import addressData from "../../data/addressData.json";
// import { createTheme, ThemeProvider } from "@mui/material/styles";


// const textFieldTheme = createTheme({
//   components: {
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           '& .MuiOutlinedInput-root': {
//             height: '45px',
//             '& input': {
//               color: '#2C3E50'
//             },
//             '&:hover .MuiOutlinedInput-notchedOutline': {
//               borderColor: '#2C3E50'
//             },
//             '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//               borderColor: '#2C3E50'
//             }
//           },
//           '& .MuiInputLabel-root': {
//             color: '#2C3E50'
//           }
//         }
//       }
//     }
//   }
// });

// const ContactDetails = ({ setContactDetails, parentData }) => {
//   // Initialize with empty object if parentData is undefined
//   const initialData = parentData || {};
//   const prevParentDataRef = useRef(initialData);
  
//   // State to store form data - ensure all values are at least empty strings to keep inputs controlled
//   const [formData, setFormData] = useState({
//     temporaryAddress: initialData.temporaryAddress || "",
//     temporaryPostalCode: initialData.temporaryPostalCode || "",
//     temporaryDistrict: initialData.temporaryDistrict || "",
//     temporaryProvince: initialData.temporaryProvince || "",
//     distantBetWorkPlaceAndTemporyAddress: initialData.distantBetWorkPlaceAndTemporyAddress || "",
//     permanentAddress: initialData.permanentAddress || "",
//     permanentPostalCode: initialData.permanentPostalCode || "",
//     permanentGramaDivision: initialData.permanentGramaDivision || "",
//     permanentAGADivision: initialData.permanentAGADivision || "",
//     permanentElectoral: initialData.permanentElectoral || "",
//     policeDivision: initialData.policeDivision || "",
//     permanentDistrict: initialData.permanentDistrict || "",
//     permanentProvince: initialData.permanentProvince || "",
//     distantBetWorkPlaceAndPermanentAddress: initialData.distantBetWorkPlaceAndPermanentAddress || "",
//     telephoneNumber: initialData.telephoneNumber || "",
//     contactId: initialData.contactId || 0,  // Preserve contactId for updates
//   });

//   // Add state for validation errors
//   const [errors, setErrors] = useState({});

//   // Track if form has been updated by user input
//   const formUpdatedByUser = useRef(false);

//   // Create refs for all input fields to enable focus movement
//   const inputRefs = useRef({});

//   // Define field order for navigation
//   const fieldOrder = [
//     "permanentAddress",
//     "permanentPostalCode",
//     "permanentGramaDivision",
//     "policeDivision",
//     "distantBetWorkPlaceAndPermanentAddress",
//     "telephoneNumber",
//     "temporaryAddress",
//     "temporaryPostalCode",
//     "temporaryDistrict",
//     "distantBetWorkPlaceAndTemporyAddress"
  
//   ];

//   const sriLankanDistricts = [
//     "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", 
//     "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", 
//     "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", 
//     "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", 
//     "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
//   ];

//   // Update formData when parentData changes
//   useEffect(() => {
//     // Only update if parentData exists
//     if (parentData && JSON.stringify(prevParentDataRef.current) !== JSON.stringify(parentData)) {
//       // Create a new object ensuring all fields have at least empty string values
//       const updatedData = {
//         temporaryAddress: parentData.temporaryAddress || "",
//         temporaryPostalCode: parentData.temporaryPostalCode || "",
//         temporaryDistrict: parentData.temporaryDistrict || "",
//         temporaryProvince: parentData.temporaryProvince || "",
//         distantBetWorkPlaceAndTemporyAddress: parentData.distantBetWorkPlaceAndTemporyAddress || "",
//         permanentAddress: parentData.permanentAddress || "",
//         permanentPostalCode: parentData.permanentPostalCode || "",
//         permanentGramaDivision: parentData.permanentGramaDivision || "",
//         permanentAGADivision: parentData.permanentAGADivision || "",
//         permanentElectoral: parentData.permanentElectoral || "",
//         policeDivision: parentData.policeDivision || "",
//         permanentDistrict: parentData.permanentDistrict || "",
//         permanentProvince: parentData.permanentProvince || "",
//         distantBetWorkPlaceAndPermanentAddress: parentData.distantBetWorkPlaceAndPermanentAddress || "",
//         telephoneNumber: parentData.telephoneNumber || "",
//         contactId: parentData.contactId || 0,
//       };

//       setFormData(updatedData);
//       prevParentDataRef.current = parentData;
//       // Reset user update flag when parent data changes
//       formUpdatedByUser.current = false;
//       // Clear any errors when loading new data
//       setErrors({});
//     }
//   }, [parentData]);

//   // Update parent component only when form is changed by user input
//   useEffect(() => {
//     if (formUpdatedByUser.current) {
//       // Make a defensive copy to ensure we don't pass undefined values back up
//       const dataToSend = { ...formData };
      
//       // Ensure no undefined values are sent to parent
//       Object.keys(dataToSend).forEach(key => {
//         if (dataToSend[key] === undefined) {
//           dataToSend[key] = "";
//         }
//       });
      
//       setContactDetails(dataToSend);
//     }
//   }, [formData, setContactDetails]);

//   // Function to validate a single field
//   const validateField = (name, value) => {
//     // Skip validation for read-only fields
//     const readOnlyFields = ['temporaryProvince', 'permanentProvince', 'permanentDistrict', 'permanentElectoral', 'permanentAGADivision'];
//     if (readOnlyFields.includes(name)) return '';
    
//     // Validate required fields
//     if (value.trim() === '') return 'This field is required';
    
//     // Distance fields validation (must be a positive number)
//     if (name.includes('distant') && (isNaN(value) || Number(value) < 0)) {
//       return 'Please enter a valid positive number';
//     }
    
//     // Telephone number validation
//     if (name === 'telephoneNumber') {
//       // Simple regex for phone number validation
//       const phoneRegex = /^[0-9]{10}$/;
//       if (!phoneRegex.test(value)) return 'Please enter a valid 10-digit phone number';
//     }
    
//     return '';
//   };

//   const fieldDependencies = {
//     permanentAddress: [],
//     permanentPostalCode: ['permanentAddress'],
//     permanentGramaDivision: ['permanentAddress', 'permanentPostalCode'],
//     policeDivision: ['permanentAddress', 'permanentPostalCode', 'permanentGramaDivision'],
//     distantBetWorkPlaceAndPermanentAddress: [
//       'permanentAddress', 
//       'permanentPostalCode', 
//       'permanentGramaDivision', 
//       'policeDivision'
//     ],
//     telephoneNumber: [
//       'permanentAddress', 
//       'permanentPostalCode', 
//       'permanentGramaDivision', 
//       'policeDivision', 
//       'distantBetWorkPlaceAndPermanentAddress'
//     ],
//     temporaryAddress: [],
//     temporaryPostalCode: ['temporaryAddress'],
//     temporaryDistrict: ['temporaryAddress', 'temporaryPostalCode'],
//     distantBetWorkPlaceAndTemporyAddress: [
//       'temporaryAddress', 
//       'temporaryPostalCode', 
//       'temporaryDistrict'
//     ]
//   };

//   // Method to validate field dependencies
//   const validateFieldDependencies = (fieldName) => {
//     // Get the dependencies for this field
//     const dependencies = fieldDependencies[fieldName] || [];
    
//     // Check if all dependencies are filled
//     const missingDependencies = dependencies.filter(dep => {
//       const value = formData[dep];
//       return !value || value.trim() === '';
//     });

//     return missingDependencies;
//   };

//   // Handle focus with dependency check
//   const handleFocus = (e) => {
//     const { name } = e.target;
    
//     // Check for missing dependencies
//     const missingDependencies = validateFieldDependencies(name);
    
//     if (missingDependencies.length > 0) {
//       // Find the first missing dependency
//       const firstMissingField = missingDependencies[0];
      
//       // Set errors for missing dependencies
//       const newErrors = missingDependencies.reduce((acc, dep) => ({
//         ...acc,
//         [dep]: `Please fill out ${dep.replace(/([A-Z])/g, ' $1').toLowerCase()} first`
//       }), {});
      
//       // Update errors state
//       setErrors(prevErrors => ({
//         ...prevErrors,
//         ...newErrors
//       }));
      
//       // Move focus to the first missing dependency
//       if (inputRefs.current[firstMissingField]) {
//         inputRefs.current[firstMissingField].focus();
//       }
      
//       // Prevent focus on the current field
//       e.preventDefault();
//     }
//   };



//   // Function to move to the next field
//   const moveToNextField = (currentField) => {
//     const currentIndex = fieldOrder.indexOf(currentField);
//     if (currentIndex !== -1 && currentIndex < fieldOrder.length - 1) {
//       const nextField = fieldOrder[currentIndex + 1];
//       if (inputRefs.current[nextField]) {
//         inputRefs.current[nextField].focus();
//       }
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
  
//     // Format the value to have the first letter in uppercase and the rest lowercase
//     const formattedValue = formatText(value);
  
//     // Set flag to indicate this is a user-initiated update
//     formUpdatedByUser.current = true;
  
//     // If the field is related to postal code (both permanent and temporary), ensure it only allows integers
//     if (name === 'permanentPostalCode' || name === 'temporaryPostalCode') {
//       if (!/^\d*$/.test(value)) {
//         return; // Ignore the change if it's not a valid integer
//       }
//     }
  
//     // Start with a copy of current form data
//     const updatedFormData = { ...formData };
  
//     // Set the changed field (always ensure it's at least an empty string)
//     updatedFormData[name] = formattedValue || "";
  
//     // Handle dependent fields for permanentGramaDivision
//     if (name === "permanentGramaDivision") {
//       const addressInfo = addressData.find((item) => item.GND_Name === formattedValue);
//       if (addressInfo) {
//         updatedFormData.permanentProvince = addressInfo.Province_Name || "";
//         updatedFormData.permanentDistrict = addressInfo.District_Name || "";
//         updatedFormData.permanentElectoral = addressInfo.Polling_Division_Name || "";
//         updatedFormData.permanentAGADivision = addressInfo.DSD_Name || "";
//       } else {
//         updatedFormData.permanentProvince = "";
//         updatedFormData.permanentDistrict = "";
//         updatedFormData.permanentElectoral = "";
//         updatedFormData.permanentAGADivision = "";
//       }
//     }
  
//     // Handle dependent fields for temporaryDistrict
//     if (name === "temporaryDistrict") {
//       const addressInfo = addressData.find((item) => item.District_Name === formattedValue);
//       updatedFormData.temporaryProvince = addressInfo ? (addressInfo.Province_Name || "") : "";
//     }
  
//     // Clear error for this field if value is valid
//     const error = validateField(name, formattedValue);
//     setErrors(prevErrors => ({
//       ...prevErrors,
//       [name]: error
//     }));
  
//     // Update the form data with the new formatted value
//     setFormData(updatedFormData);
//   };
  
//   // Helper function to format text to first letter uppercase and the rest lowercase
//   const formatText = (text) => {
//     if (!text) return text; // Return if text is empty or undefined
  
//     // Capitalize the first letter and make the rest lowercase
//     return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
//   };
  

  
//    // Function to generate auto-suggest options for temporary address
//    const generateTemporaryAddressSuggestions = () => {
//     // If permanent address is empty, return empty array
//     if (!formData.permanentAddress) return [];

//     // Create suggestions based on permanent address
//     const suggestions = [
//       {
//         label: formData.permanentAddress,
//         postalCode: formData.permanentPostalCode,
//         district: formData.permanentDistrict,
//         province: formData.permanentProvince,
//         distance: formData.distantBetWorkPlaceAndPermanentAddress
//       },
//     ];

//     return suggestions;
//   };

//   // Handle address suggestion selection
//   const handleAddressSuggestionSelect = (event, newValue) => {
//     // Create a copy of current form data
//     const updatedFormData = { ...formData };

//     if (newValue && typeof newValue === 'object') {
//       // Direct update of fields
//       updatedFormData.temporaryAddress = newValue.label || "";
//       updatedFormData.temporaryPostalCode = newValue.postalCode || "";
//       updatedFormData.distantBetWorkPlaceAndTemporyAddress = newValue.distance || "";

//       // Find district information from addressData
//       const districtInfo = addressData.find((item) => 
//         item.District_Name === newValue.district
//       );

//       // Update district and province
//       if (districtInfo) {
//         updatedFormData.temporaryDistrict = districtInfo.District_Name || "";
//         updatedFormData.temporaryProvince = districtInfo.Province_Name || "";
//       } else {
//         // Fallback to original values if no match found
//         updatedFormData.temporaryDistrict = newValue.district || "";
//         updatedFormData.temporaryProvince = newValue.province || "";
//       }

//       // Set the updated form data
//       setFormData(updatedFormData);

//       // Set flag to indicate user update
//       formUpdatedByUser.current = true;
//     } else {
//       // If it's a free-form input, just update the address
//       const syntheticEvent = {
//         target: {
//           name: "temporaryAddress",
//           value: newValue || ""
//         }
//       };
//       handleChange(syntheticEvent);
//     }
//   };
  
//   // Handle key press events
//   const handleKeyPress = (e) => {
//     const { name, value } = e.target;
    
//     // If Enter key is pressed
//     if (e.key === 'Enter') {
//       e.preventDefault();
      
//       // First validate the current field
//       const error = validateField(name, value);
      
//       // Update error state for this field only
//       setErrors(prevErrors => ({
//         ...prevErrors,
//         [name]: error
//       }));
      
//       // If field is valid, move to next field
//       if (!error) {
//         moveToNextField(name);
//       }
//     }
//   };

//   return (
//      <ThemeProvider theme={textFieldTheme}>
//     <Grid item xs={11.4} container spacing={2} sx={{ ml: 3 }}>
//     <Grid  
//           container 
//           alignItems="center" 
//           sx={{ 
//             mr: 0, 
//             mt: 10, 
//             backgroundColor: "#E0E0E0" ,
//             borderRadius: 1, 
//             boxShadow: 3,  
//           }}
          
//         >
//       <Grid >
//         <Typography
//           sx={{ ml: 2, mt: 1 }}
//           variant="h6"
//           gutterBottom
//           style={{
//             fontStyle: "italic",
//             color: "rgb(58, 53, 54)",
//             fontFamily: "Roboto, sans-serif",
//             textAlign: "left",
//           }}
//         >
//           Contact Details
//         </Typography>
//       </Grid>
//      </Grid>
   
//       {/* Permanent Address Section */}
//       <Typography variant="h6" sx={{ mt: 5, ml: 0, mb: 2 }} style={{ fontStyle: "italic", fontSize: "18px", color: "rgb(41, 40, 40)" }}>
//         Permanent Address Details
//       </Typography>
//       <Grid container spacing={1}>
//         <Grid item xs={12} sm={10}>
//           <TextField 
//             label="Permanent Address" 
//             name="permanentAddress" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.permanentAddress} 
//             onChange={handleChange}
//             onFocus={handleFocus}
//             onKeyPress={handleKeyPress}
//             error={!!errors.permanentAddress}
//             helperText={errors.permanentAddress || ''}
//             inputRef={el => inputRefs.current.permanentAddress = el}
//             required 
//           />
//         </Grid>
//         <Grid item xs={12} sm={2}>
//           <TextField 
//             label="Postal Code" 
//             name="permanentPostalCode" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.permanentPostalCode} 
//             onChange={handleChange}
//             onFocus={handleFocus}
//             onKeyPress={handleKeyPress}
//             error={!!errors.permanentPostalCode}
//             helperText={errors.permanentPostalCode || ''}
//             inputRef={el => inputRefs.current.permanentPostalCode = el}
//             required 
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField 
//             label="Grama Division" 
//             name="permanentGramaDivision" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.permanentGramaDivision} 
//             onChange={handleChange}
//             onFocus={handleFocus}
//             onKeyPress={handleKeyPress}
//             error={!!errors.permanentGramaDivision}
//             helperText={errors.permanentGramaDivision || ''}
//             inputRef={el => inputRefs.current.permanentGramaDivision = el}
//             required 
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField 
//             label="AGA Division" 
//             name="permanentAGADivision" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.permanentAGADivision} 
//             InputProps={{ readOnly: true }} 
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField 
//             label="Electoral Division" 
//             name="permanentElectoral" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.permanentElectoral} 
//             InputProps={{ readOnly: true }} 
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField 
//             label="Police Division" 
//             name="policeDivision" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.policeDivision} 
//             onChange={handleChange}
//             onFocus={handleFocus}
//             onKeyPress={handleKeyPress}
//             error={!!errors.policeDivision}
//             helperText={errors.policeDivision || ''}
//             inputRef={el => inputRefs.current.policeDivision = el}
//             required 
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField 
//             label="District" 
//             name="permanentDistrict" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.permanentDistrict} 
//             InputProps={{ readOnly: true }} 
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField 
//             label="Province" 
//             name="permanentProvince" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.permanentProvince} 
//             InputProps={{ readOnly: true }} 
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField 
//             label="Distance to Workplace (km)" 
//             name="distantBetWorkPlaceAndPermanentAddress" 
//             type="number" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.distantBetWorkPlaceAndPermanentAddress} 
//             onChange={handleChange}
//             onFocus={handleFocus}
//             onKeyPress={handleKeyPress}
//             error={!!errors.distantBetWorkPlaceAndPermanentAddress}
//             helperText={errors.distantBetWorkPlaceAndPermanentAddress || ''}
//             inputRef={el => inputRefs.current.distantBetWorkPlaceAndPermanentAddress = el}
//             required 
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField 
//             label="Telephone Number" 
//             name="telephoneNumber" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.telephoneNumber} 
//             onChange={handleChange}
//             onFocus={handleFocus}
//             onKeyPress={handleKeyPress}
//             error={!!errors.telephoneNumber}
//             helperText={errors.telephoneNumber || ''}
//             inputRef={el => inputRefs.current.telephoneNumber = el}
//             required 
//           />
//         </Grid>
//       </Grid>

//         {/* Temporary Address Section */}
//         <Grid container spacing={1}>
//           <Typography variant="h6" sx={{ mt: 3, ml: 2 }} style={{ fontStyle: "italic", fontSize: "18px", color: "rgb(41, 40, 40)" }}>
//             Temporary Address Details
//           </Typography>
//           <Grid item xs={10}>
//           {/* <Autocomplete
//         freeSolo
//         options={generateTemporaryAddressSuggestions()}
//         getOptionLabel={(option) => 
//           typeof option === 'object' ? option.label : option
//         }
//         onChange={handleAddressSuggestionSelect}
        
//         renderInput={(params) => (
//           <TextField 
//             {...params}
//             label="Temporary Address" 
//             name="temporaryAddress" 
//             fullWidth 
//             variant="outlined"   
//             error={!!errors.temporaryAddress}
//             helperText={errors.temporaryAddress || ''}
//             inputRef={el => inputRefs.current.temporaryAddress = el}
//             required 
//             onKeyPress={handleKeyPress}
            
//           />
//         )} */}
//         <Autocomplete
//               freeSolo
//               options={generateTemporaryAddressSuggestions()}
//               value={formData.temporaryAddress} // Add this line
//               getOptionLabel={(option) => 
//                 typeof option === 'object' ? option.label : option
//               }
//               onChange={handleAddressSuggestionSelect}
//               renderInput={(params) => (
//                 <TextField 
//                   {...params}
//                   label="Temporary Address" 
//                   name="temporaryAddress" 
//                   fullWidth 
//                   variant="outlined"   
//                   value={formData.temporaryAddress} // Ensure value is explicitly set
//                   onChange={(e) => {
//                     // Add this handler to ensure value updates even without suggestion
//                     handleChange({
//                       target: {
//                         name: 'temporaryAddress',
//                         value: e.target.value
//                       }
//                     });
//                   }}
//                   error={!!errors.temporaryAddress}
//                   helperText={errors.temporaryAddress || ''}
//                   inputRef={el => inputRefs.current.temporaryAddress = el}
//                   required 
//                   onKeyPress={handleKeyPress}
//                 />
//               )}
//             />
      
//           </Grid>
//         <Grid item xs={12} sm={2}>
//           <TextField 
//             label="Postal Code" 
//             name="temporaryPostalCode" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.temporaryPostalCode} 
//             onChange={handleChange}
//              onFocus={handleFocus}
//             onKeyPress={handleKeyPress}
//             error={!!errors.temporaryPostalCode}
//             helperText={errors.temporaryPostalCode || ''}
//             inputRef={el => inputRefs.current.temporaryPostalCode = el}
//             required 
//           />
//         </Grid>
        
//         <Grid item xs={12} sm={4}>
//           <Autocomplete
//             options={sriLankanDistricts}
//             value={formData.temporaryDistrict}
//             onChange={(event, newValue) => {
//               // Create a synthetic event object to work with your existing handleChange function
//               const syntheticEvent = {
//                 target: {
//                   name: "temporaryDistrict",
//                   value: newValue || ""
//                 }
//               };
//               handleChange(syntheticEvent);
//             }}
//             onFocus={handleFocus}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="District"
//                 name="temporaryDistrict"
//                 fullWidth
//                 variant="outlined"
//                 error={!!errors.temporaryDistrict}
//                 helperText={errors.temporaryDistrict || ''}
//                 inputRef={el => inputRefs.current.temporaryDistrict = el}
//                 required
//                 onKeyPress={handleKeyPress}
//               />
//             )}
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField 
//             label="Province" 
//             name="temporaryProvince" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.temporaryProvince} 
//             InputProps={{ readOnly: true }} 
//           />
//         </Grid>
//         <Grid item xs={12} sm={3}>
//           <TextField 
//             label="Distance to Workplace (km)" 
//             name="distantBetWorkPlaceAndTemporyAddress" 
//             type="number" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.distantBetWorkPlaceAndTemporyAddress} 
//             onChange={handleChange}
//             onFocus={handleFocus}
//             onKeyPress={handleKeyPress}
//             error={!!errors.distantBetWorkPlaceAndTemporyAddress}
//             helperText={errors.distantBetWorkPlaceAndTemporyAddress || ''}
//             inputRef={el => inputRefs.current.distantBetWorkPlaceAndTemporyAddress = el}
//             required 
//           />
//         </Grid>
//       </Grid>
//     </Grid>
//     </ThemeProvider>
//   );
// };

// export default ContactDetails;

















// import { Grid, Typography, TextField, MenuItem, Autocomplete } from "@mui/material";
// import React, { useState, useEffect, useRef } from "react";
// import addressData from "../../data/addressData.json";
// import { createTheme, ThemeProvider } from "@mui/material/styles";


// const textFieldTheme = createTheme({
//   components: {
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           '& .MuiOutlinedInput-root': {
//             height: '45px',
//             '& input': {
//               color: '#2C3E50'
//             },
//             '&:hover .MuiOutlinedInput-notchedOutline': {
//               borderColor: '#2C3E50'
//             },
//             '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//               borderColor: '#2C3E50'
//             }
//           },
//           '& .MuiInputLabel-root': {
//             color: '#2C3E50'
//           }
//         }
//       }
//     }
//   }
// });

// const ContactDetails = ({ setContactDetails, parentData }) => {
//   // Initialize with empty object if parentData is undefined
//   const initialData = parentData || {};
//   const prevParentDataRef = useRef(initialData);
  
//   // State to store form data - ensure all values are at least empty strings to keep inputs controlled
//   const [formData, setFormData] = useState({
//     temporaryAddress: initialData.temporaryAddress || "",
//     temporaryPostalCode: initialData.temporaryPostalCode || "",
//     temporaryDistrict: initialData.temporaryDistrict || "",
//     temporaryProvince: initialData.temporaryProvince || "",
//     distantBetWorkPlaceAndTemporyAddress: initialData.distantBetWorkPlaceAndTemporyAddress || "",
//     permanentAddress: initialData.permanentAddress || "",
//     permanentPostalCode: initialData.permanentPostalCode || "",
//     permanentGramaDivision: initialData.permanentGramaDivision || "",
//     permanentAGADivision: initialData.permanentAGADivision || "",
//     permanentElectoral: initialData.permanentElectoral || "",
//     policeDivision: initialData.policeDivision || "",
//     permanentDistrict: initialData.permanentDistrict || "",
//     permanentProvince: initialData.permanentProvince || "",
//     distantBetWorkPlaceAndPermanentAddress: initialData.distantBetWorkPlaceAndPermanentAddress || "",
//     telephoneNumber: initialData.telephoneNumber || "",
//     contactId: initialData.contactId || 0,  // Preserve contactId for updates
//   });

//   // Add state for validation errors
//   const [errors, setErrors] = useState({});

//   // Track if form has been updated by user input
//   const formUpdatedByUser = useRef(false);

//   // Create refs for all input fields to enable focus movement
//   const inputRefs = useRef({});

//   // Define field order for navigation
//   const fieldOrder = [
//     "permanentAddress",
//     "permanentPostalCode",
//     "permanentGramaDivision",
//     "policeDivision",
//     "distantBetWorkPlaceAndPermanentAddress",
//     "telephoneNumber",
//     "temporaryAddress",
//     "temporaryPostalCode",
//     "temporaryDistrict",
//     "distantBetWorkPlaceAndTemporyAddress"
  
//   ];

//   const sriLankanDistricts = [
//     "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", 
//     "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", 
//     "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", 
//     "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", 
//     "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
//   ];

//   // Update formData when parentData changes
//   useEffect(() => {
//     // Only update if parentData exists
//     if (parentData && JSON.stringify(prevParentDataRef.current) !== JSON.stringify(parentData)) {
//       // Create a new object ensuring all fields have at least empty string values
//       const updatedData = {
//         temporaryAddress: parentData.temporaryAddress || "",
//         temporaryPostalCode: parentData.temporaryPostalCode || "",
//         temporaryDistrict: parentData.temporaryDistrict || "",
//         temporaryProvince: parentData.temporaryProvince || "",
//         distantBetWorkPlaceAndTemporyAddress: parentData.distantBetWorkPlaceAndTemporyAddress || "",
//         permanentAddress: parentData.permanentAddress || "",
//         permanentPostalCode: parentData.permanentPostalCode || "",
//         permanentGramaDivision: parentData.permanentGramaDivision || "",
//         permanentAGADivision: parentData.permanentAGADivision || "",
//         permanentElectoral: parentData.permanentElectoral || "",
//         policeDivision: parentData.policeDivision || "",
//         permanentDistrict: parentData.permanentDistrict || "",
//         permanentProvince: parentData.permanentProvince || "",
//         distantBetWorkPlaceAndPermanentAddress: parentData.distantBetWorkPlaceAndPermanentAddress || "",
//         telephoneNumber: parentData.telephoneNumber || "",
//         contactId: parentData.contactId || 0,
//       };

//       setFormData(updatedData);
//       prevParentDataRef.current = parentData;
//       // Reset user update flag when parent data changes
//       formUpdatedByUser.current = false;
//       // Clear any errors when loading new data
//       setErrors({});
//     }
//   }, [parentData]);

//   // Update parent component only when form is changed by user input
//   useEffect(() => {
//     if (formUpdatedByUser.current) {
//       // Make a defensive copy to ensure we don't pass undefined values back up
//       const dataToSend = { ...formData };
      
//       // Ensure no undefined values are sent to parent
//       Object.keys(dataToSend).forEach(key => {
//         if (dataToSend[key] === undefined) {
//           dataToSend[key] = "";
//         }
//       });
      
//       setContactDetails(dataToSend);
//     }
//   }, [formData, setContactDetails]);

//   // Function to validate a single field
//   const validateField = (name, value) => {
//     // Skip validation for read-only fields
//     const readOnlyFields = ['temporaryProvince', 'permanentProvince', 'permanentDistrict', 'permanentElectoral', 'permanentAGADivision'];
//     if (readOnlyFields.includes(name)) return '';
    
//     // Validate required fields
//     if (value.trim() === '') return 'This field is required';
    
//     // Distance fields validation (must be a positive number)
//     if (name.includes('distant') && (isNaN(value) || Number(value) < 0)) {
//       return 'Please enter a valid positive number';
//     }
    
//     // Telephone number validation
//     if (name === 'telephoneNumber') {
//       // Simple regex for phone number validation
//       const phoneRegex = /^[0-9]{10}$/;
//       if (!phoneRegex.test(value)) return 'Please enter a valid 10-digit phone number';
//     }

//     if (['permanentGramaDivision', 'policeDivision'].includes(name)) {
//       const letterOnlyRegex = /^[A-Za-z\s]+$/;
//       if (!letterOnlyRegex.test(value)) return 'Only letters are allowed';
//     }
    
//     return '';
//   };

//   const fieldDependencies = {
//     permanentAddress: [],
//     permanentPostalCode: ['permanentAddress'],
//     permanentGramaDivision: ['permanentAddress', 'permanentPostalCode'],
//     policeDivision: ['permanentAddress', 'permanentPostalCode', 'permanentGramaDivision'],
//     distantBetWorkPlaceAndPermanentAddress: [
//       'permanentAddress', 
//       'permanentPostalCode', 
//       'permanentGramaDivision', 
//       'policeDivision'
//     ],
//     telephoneNumber: [
//       'permanentAddress', 
//       'permanentPostalCode', 
//       'permanentGramaDivision', 
//       'policeDivision', 
//       'distantBetWorkPlaceAndPermanentAddress'
//     ],
//     temporaryAddress: [],
//     temporaryPostalCode: ['temporaryAddress'],
//     temporaryDistrict: ['temporaryAddress', 'temporaryPostalCode'],
//     distantBetWorkPlaceAndTemporyAddress: [
//       'temporaryAddress', 
//       'temporaryPostalCode', 
//       'temporaryDistrict'
//     ]
//   };

//   // Method to validate field dependencies
//   const validateFieldDependencies = (fieldName) => {
//     // Get the dependencies for this field
//     const dependencies = fieldDependencies[fieldName] || [];
    
//     // Check if all dependencies are filled
//     const missingDependencies = dependencies.filter(dep => {
//       const value = formData[dep];
//       return !value || value.trim() === '';
//     });

//     return missingDependencies;
//   };

//   // Handle focus with dependency check
//   const handleFocus = (e) => {
//     const { name } = e.target;
    
//     // Check for missing dependencies
//     const missingDependencies = validateFieldDependencies(name);
    
//     if (missingDependencies.length > 0) {
//       // Find the first missing dependency
//       const firstMissingField = missingDependencies[0];
      
//       const newErrors = missingDependencies.reduce((acc, dep) => ({
//         ...acc,
//         [dep]: `Please fill out ${dep.replace(/([A-Z])/g, ' $1').toLowerCase()} first`
//       }), {});
      
//       // Update errors state
//       setErrors(prevErrors => ({
//         ...prevErrors,
//         ...newErrors
//       }));
      
//       if (inputRefs.current[firstMissingField]) {
//         inputRefs.current[firstMissingField].focus();
//       }
      
//       e.preventDefault();
//     }
//   };



//   // Function to move to the next field
//   const moveToNextField = (currentField) => {
//     const currentIndex = fieldOrder.indexOf(currentField);
//     if (currentIndex !== -1 && currentIndex < fieldOrder.length - 1) {
//       const nextField = fieldOrder[currentIndex + 1];
//       if (inputRefs.current[nextField]) {
//         inputRefs.current[nextField].focus();
//       }
//     }
//   };

//   const capitalizeEachWord = (str) => {
//     return str
//       .split(' ')
//       .map(word => {
//         const trimmedWord = word.trim();
//         return trimmedWord
//           ? trimmedWord.charAt(0).toUpperCase() + trimmedWord.slice(1).toLowerCase()
//           : '';
//       })
//       .join(' ');
//   };
  
  

//   const handleChange = (e) => {
//     const { name, value } = e.target;
  
//     // Format the value to have the first letter in uppercase and the rest lowercase
//     const formattedValue = capitalizeEachWord(value);

  
//     // Set flag to indicate this is a user-initiated update
//     formUpdatedByUser.current = true;

//     if (name === 'permanentAddress' || name === 'temporaryAddress') {
//       const allowedCharsRegex = /^[A-Za-z0-9\s.,'\/]*$/;
    
//       if (!allowedCharsRegex.test(value)) {
//         return; // Invalid characters; skip update
//       }
    
//       const formattedValue = capitalizeEachWord(value);
    
//       setFormData(prev => ({
//         ...prev,
//         [name]: formattedValue
//       }));
    
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
    
//       formUpdatedByUser.current = true;
//       return;
//     }
    
    
  
//     // If the field is related to postal code (both permanent and temporary), ensure it only allows integers
//     if (name === 'permanentPostalCode' || name === 'temporaryPostalCode') {
//       if (!/^\d*$/.test(value)) {
//         return; // Ignore the change if it's not a valid integer
//       }
//     }

//     if (['permanentGramaDivision', 'policeDivision'].includes(name)) {
//       const onlyLettersSpaces = /^[A-Za-z\s]*$/;
    
//       if (!onlyLettersSpaces.test(value)) {
//         return; // block invalid characters
//       }
    
//       const capitalized = capitalizeEachWord(value);
    
//       setFormData(prev => ({
//         ...prev,
//         [name]: capitalized
//       }));
    
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
    
//       formUpdatedByUser.current = true;
//       return;
//     }
    
  
//     // Start with a copy of current form data
//     const updatedFormData = { ...formData };
  
//     // Set the changed field (always ensure it's at least an empty string)
//     updatedFormData[name] = formattedValue || "";
  
//     // Handle dependent fields for permanentGramaDivision
//     if (name === "permanentGramaDivision") {
//       const addressInfo = addressData.find(
//         (item) => item.GND_Name.trim().toLowerCase() === value.trim().toLowerCase()
//       );
    
//       if (addressInfo) {
//         updatedFormData.permanentProvince = addressInfo.Province_Name || "";
//         updatedFormData.permanentDistrict = addressInfo.District_Name || "";
//         updatedFormData.permanentElectoral = addressInfo.Polling_Division_Name || "";
//         updatedFormData.permanentAGADivision = addressInfo.DSD_Name || "";
//       } else {
//         updatedFormData.permanentProvince = "";
//         updatedFormData.permanentDistrict = "";
//         updatedFormData.permanentElectoral = "";
//         updatedFormData.permanentAGADivision = "";
//       }
//     }
    
    
//     // Handle dependent fields for temporaryDistrict
//     if (name === "temporaryDistrict") {
//       const addressInfo = addressData.find((item) => item.District_Name === formattedValue);
//       updatedFormData.temporaryProvince = addressInfo ? (addressInfo.Province_Name || "") : "";
//     }
  
//     // Clear error for this field if value is valid
//     const error = validateField(name, formattedValue);
//     setErrors(prevErrors => ({
//       ...prevErrors,
//       [name]: error
//     }));
  
//     // Update the form data with the new formatted value
//     setFormData(updatedFormData);
//   };

  

  
//    // Function to generate auto-suggest options for temporary address
//    const generateTemporaryAddressSuggestions = () => {
//     // If permanent address is empty, return empty array
//     if (!formData.permanentAddress) return [];

//     // Create suggestions based on permanent address
//     const suggestions = [
//       {
//         label: formData.permanentAddress,
//         postalCode: formData.permanentPostalCode,
//         district: formData.permanentDistrict,
//         province: formData.permanentProvince,
//         distance: formData.distantBetWorkPlaceAndPermanentAddress
//       },
//     ];

//     return suggestions;
//   };

//   // Handle address suggestion selection
//   const handleAddressSuggestionSelect = (event, newValue) => {
//     // Create a copy of current form data
//     const updatedFormData = { ...formData };

//     if (newValue && typeof newValue === 'object') {
//       // Direct update of fields
//       updatedFormData.temporaryAddress = newValue.label || "";
//       updatedFormData.temporaryPostalCode = newValue.postalCode || "";
//       updatedFormData.distantBetWorkPlaceAndTemporyAddress = newValue.distance || "";

//       // Find district information from addressData
//       const districtInfo = addressData.find((item) => 
//         item.District_Name === newValue.district
//       );

//       // Update district and province
//       if (districtInfo) {
//         updatedFormData.temporaryDistrict = districtInfo.District_Name || "";
//         updatedFormData.temporaryProvince = districtInfo.Province_Name || "";
//       } else {
//         // Fallback to original values if no match found
//         updatedFormData.temporaryDistrict = newValue.district || "";
//         updatedFormData.temporaryProvince = newValue.province || "";
//       }

//       // Set the updated form data
//       setFormData(updatedFormData);

//       // Set flag to indicate user update
//       formUpdatedByUser.current = true;
//     } else {
//       // If it's a free-form input, just update the address
//       const syntheticEvent = {
//         target: {
//           name: "temporaryAddress",
//           value: newValue || ""
//         }
//       };
//       handleChange(syntheticEvent);
//     }
//   };
  
//   // Handle key press events
//   const handleKeyPress = (e) => {
//     const { name, value } = e.target;
    
//     // If Enter key is pressed
//     if (e.key === 'Enter') {
//       e.preventDefault();
      
//       // First validate the current field
//       const error = validateField(name, value);
      
//       // Update error state for this field only
//       setErrors(prevErrors => ({
//         ...prevErrors,
//         [name]: error
//       }));
      
//       // If field is valid, move to next field
//       if (!error) {
//         moveToNextField(name);
//       }
//     }
//   };

//   return (
//      <ThemeProvider theme={textFieldTheme}>
//     <Grid item xs={11.4} container spacing={2} sx={{ ml: 3 }}>
//     <Grid  
//           container 
//           alignItems="center" 
//           sx={{ 
//             mr: 0, 
//             mt: 10, 
//             backgroundColor: "#E0E0E0" ,
//             borderRadius: 1, 
//             boxShadow: 3,  
//           }}
          
//         >
//       <Grid >
//         <Typography
//           sx={{ ml: 2, mt: 1 }}
//           variant="h6"
//           gutterBottom
//           style={{
//             fontStyle: "italic",
//             color: "rgb(58, 53, 54)",
//             fontFamily: "Roboto, sans-serif",
//             textAlign: "left",
//           }}
//         >
//           Contact Details
//         </Typography>
//       </Grid>
//      </Grid>
   
//       {/* Permanent Address Section */}
//       <Typography variant="h6" sx={{ mt: 5, ml: 0, mb: 2 }} style={{ fontStyle: "italic", fontSize: "18px", color: "rgb(41, 40, 40)" }}>
//         Permanent Address Details
//       </Typography>
//       <Grid container spacing={1}>
//         <Grid item xs={12} sm={10}>
//           <TextField 
//             label="Permanent Address" 
//             name="permanentAddress" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.permanentAddress} 
//             onChange={handleChange}
//             onFocus={handleFocus}
//             onKeyPress={handleKeyPress}
//             error={!!errors.permanentAddress}
//             helperText={errors.permanentAddress || ''}
//             inputRef={el => inputRefs.current.permanentAddress = el}
//             required 
//           />
//         </Grid>
//         <Grid item xs={12} sm={2}>
//           <TextField 
//             label="Postal Code" 
//             name="permanentPostalCode" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.permanentPostalCode} 
//             onChange={handleChange}
//             onFocus={handleFocus}
//             onKeyPress={handleKeyPress}
//             error={!!errors.permanentPostalCode}
//             helperText={errors.permanentPostalCode || ''}
//             inputRef={el => inputRefs.current.permanentPostalCode = el}
//             required 
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField 
//             label="Grama Division" 
//             name="permanentGramaDivision" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.permanentGramaDivision} 
//             onChange={handleChange}
//             onFocus={handleFocus}
//             onKeyPress={handleKeyPress}
//             error={!!errors.permanentGramaDivision}
//             helperText={errors.permanentGramaDivision || ''}
//             inputRef={el => inputRefs.current.permanentGramaDivision = el}
//             required 
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField 
//             label="AGA Division" 
//             name="permanentAGADivision" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.permanentAGADivision} 
//             InputProps={{ readOnly: true }} 
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField 
//             label="Electoral Division" 
//             name="permanentElectoral" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.permanentElectoral} 
//             InputProps={{ readOnly: true }} 
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField 
//             label="Police Division" 
//             name="policeDivision" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.policeDivision} 
//             onChange={handleChange}
//             onFocus={handleFocus}
//             onKeyPress={handleKeyPress}
//             error={!!errors.policeDivision}
//             helperText={errors.policeDivision || ''}
//             inputRef={el => inputRefs.current.policeDivision = el}
//             required 
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField 
//             label="District" 
//             name="permanentDistrict" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.permanentDistrict} 
//             InputProps={{ readOnly: true }} 
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField 
//             label="Province" 
//             name="permanentProvince" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.permanentProvince} 
//             InputProps={{ readOnly: true }} 
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField 
//             label="Distance to Workplace (km)" 
//             name="distantBetWorkPlaceAndPermanentAddress" 
//             type="number" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.distantBetWorkPlaceAndPermanentAddress} 
//             onChange={handleChange}
//             onFocus={handleFocus}
//             onKeyPress={handleKeyPress}
//             error={!!errors.distantBetWorkPlaceAndPermanentAddress}
//             helperText={errors.distantBetWorkPlaceAndPermanentAddress || ''}
//             inputRef={el => inputRefs.current.distantBetWorkPlaceAndPermanentAddress = el}
//             required 
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField 
//             label="Telephone Number" 
//             name="telephoneNumber" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.telephoneNumber} 
//             onChange={handleChange}
//             onFocus={handleFocus}
//             onKeyPress={handleKeyPress}
//             error={!!errors.telephoneNumber}
//             helperText={errors.telephoneNumber || ''}
//             inputRef={el => inputRefs.current.telephoneNumber = el}
//             required 
//           />
//         </Grid>
//       </Grid>

//         {/* Temporary Address Section */}
//         <Grid container spacing={1}>
//           <Typography variant="h6" sx={{ mt: 3, ml: 2 }} style={{ fontStyle: "italic", fontSize: "18px", color: "rgb(41, 40, 40)" }}>
//             Temporary Address Details
//           </Typography>
//           <Grid item xs={10}>
//           {/* <Autocomplete
//         freeSolo
//         options={generateTemporaryAddressSuggestions()}
//         getOptionLabel={(option) => 
//           typeof option === 'object' ? option.label : option
//         }
//         onChange={handleAddressSuggestionSelect}
        
//         renderInput={(params) => (
//           <TextField 
//             {...params}
//             label="Temporary Address" 
//             name="temporaryAddress" 
//             fullWidth 
//             variant="outlined"   
//             error={!!errors.temporaryAddress}
//             helperText={errors.temporaryAddress || ''}
//             inputRef={el => inputRefs.current.temporaryAddress = el}
//             required 
//             onKeyPress={handleKeyPress}
            
//           />
//         )} */}
//         <Autocomplete
//               freeSolo
//               options={generateTemporaryAddressSuggestions()}
//               value={formData.temporaryAddress} // Add this line
//               getOptionLabel={(option) => 
//                 typeof option === 'object' ? option.label : option
//               }
//               onChange={handleAddressSuggestionSelect}
//               renderInput={(params) => (
//                 <TextField 
//                   {...params}
//                   label="Temporary Address" 
//                   name="temporaryAddress" 
//                   fullWidth 
//                   variant="outlined"   
//                   value={formData.temporaryAddress} // Ensure value is explicitly set
//                   onChange={(e) => {
//                     // Add this handler to ensure value updates even without suggestion
//                     handleChange({
//                       target: {
//                         name: 'temporaryAddress',
//                         value: e.target.value
//                       }
//                     });
//                   }}
//                   error={!!errors.temporaryAddress}
//                   helperText={errors.temporaryAddress || ''}
//                   inputRef={el => inputRefs.current.temporaryAddress = el}
//                   required 
//                   onKeyPress={handleKeyPress}
//                 />
//               )}
//             />
      
//           </Grid>
//         <Grid item xs={12} sm={2}>
//           <TextField 
//             label="Postal Code" 
//             name="temporaryPostalCode" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.temporaryPostalCode} 
//             onChange={handleChange}
//              onFocus={handleFocus}
//             onKeyPress={handleKeyPress}
//             error={!!errors.temporaryPostalCode}
//             helperText={errors.temporaryPostalCode || ''}
//             inputRef={el => inputRefs.current.temporaryPostalCode = el}
//             required 
//           />
//         </Grid>
        
//         <Grid item xs={12} sm={4}>
//           <Autocomplete
//             options={sriLankanDistricts}
//             value={formData.temporaryDistrict}
//             onChange={(event, newValue) => {
//               // Create a synthetic event object to work with your existing handleChange function
//               const syntheticEvent = {
//                 target: {
//                   name: "temporaryDistrict",
//                   value: newValue || ""
//                 }
//               };
//               handleChange(syntheticEvent);
//             }}
//             onFocus={handleFocus}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="District"
//                 name="temporaryDistrict"
//                 fullWidth
//                 variant="outlined"
//                 error={!!errors.temporaryDistrict}
//                 helperText={errors.temporaryDistrict || ''}
//                 inputRef={el => inputRefs.current.temporaryDistrict = el}
//                 required
//                 onKeyPress={handleKeyPress}
//               />
//             )}
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField 
//             label="Province" 
//             name="temporaryProvince" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.temporaryProvince} 
//             InputProps={{ readOnly: true }} 
//           />
//         </Grid>
//         <Grid item xs={12} sm={3}>
//           <TextField 
//             label="Distance to Workplace (km)" 
//             name="distantBetWorkPlaceAndTemporyAddress" 
//             type="number" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.distantBetWorkPlaceAndTemporyAddress} 
//             onChange={handleChange}
//             onFocus={handleFocus}
//             onKeyPress={handleKeyPress}
//             error={!!errors.distantBetWorkPlaceAndTemporyAddress}
//             helperText={errors.distantBetWorkPlaceAndTemporyAddress || ''}
//             inputRef={el => inputRefs.current.distantBetWorkPlaceAndTemporyAddress = el}
//             required 
//           />
//         </Grid>
//       </Grid>
//     </Grid>
//     </ThemeProvider>
//   );
// };

// export default ContactDetails;






















import { Grid, Typography, TextField, MenuItem, Autocomplete } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import addressData from "../../data/addressData.json";
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

const ContactDetails = ({ setContactDetails, parentData }) => {
  // Initialize with empty object if parentData is undefined
  const initialData = parentData || {};
  const prevParentDataRef = useRef(initialData);
  
  // State to store form data - ensure all values are at least empty strings to keep inputs controlled
  const [formData, setFormData] = useState({
    temporaryAddress: initialData.temporaryAddress || "",
    temporaryPostalCode: initialData.temporaryPostalCode || "",
    temporaryDistrict: initialData.temporaryDistrict || "",
    temporaryProvince: initialData.temporaryProvince || "",
    distantBetWorkPlaceAndTemporyAddress: initialData.distantBetWorkPlaceAndTemporyAddress || "",
    permanentAddress: initialData.permanentAddress || "",
    permanentPostalCode: initialData.permanentPostalCode || "",
    permanentGramaDivision: initialData.permanentGramaDivision || "",
    permanentAGADivision: initialData.permanentAGADivision || "",
    permanentElectoral: initialData.permanentElectoral || "",
    policeDivision: initialData.policeDivision || "",
    permanentDistrict: initialData.permanentDistrict || "",
    permanentProvince: initialData.permanentProvince || "",
    distantBetWorkPlaceAndPermanentAddress: initialData.distantBetWorkPlaceAndPermanentAddress || "",
    telephoneNumber: initialData.telephoneNumber || "",
    contactId: initialData.contactId || 0,  // Preserve contactId for updates
  });

  // Add state for validation errors
  const [errors, setErrors] = useState({});

  // Track if form has been updated by user input
  const formUpdatedByUser = useRef(false);

  // Create refs for all input fields to enable focus movement
  const inputRefs = useRef({});

  // Define field order for navigation
  const fieldOrder = [
    "permanentAddress",
    "permanentPostalCode",
    "permanentGramaDivision",
    "policeDivision",
    "distantBetWorkPlaceAndPermanentAddress",
    "telephoneNumber",
    "temporaryAddress",
    "temporaryPostalCode",
    "temporaryDistrict",
    "distantBetWorkPlaceAndTemporyAddress"
  
  ];

  const sriLankanDistricts = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", 
    "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", 
    "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", 
    "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", 
    "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
  ];

  // Update formData when parentData changes
  useEffect(() => {
    // Only update if parentData exists
    if (parentData && JSON.stringify(prevParentDataRef.current) !== JSON.stringify(parentData)) {
      // Create a new object ensuring all fields have at least empty string values
      const updatedData = {
        temporaryAddress: parentData.temporaryAddress || "",
        temporaryPostalCode: parentData.temporaryPostalCode || "",
        temporaryDistrict: parentData.temporaryDistrict || "",
        temporaryProvince: parentData.temporaryProvince || "",
        distantBetWorkPlaceAndTemporyAddress: parentData.distantBetWorkPlaceAndTemporyAddress || "",
        permanentAddress: parentData.permanentAddress || "",
        permanentPostalCode: parentData.permanentPostalCode || "",
        permanentGramaDivision: parentData.permanentGramaDivision || "",
        permanentAGADivision: parentData.permanentAGADivision || "",
        permanentElectoral: parentData.permanentElectoral || "",
        policeDivision: parentData.policeDivision || "",
        permanentDistrict: parentData.permanentDistrict || "",
        permanentProvince: parentData.permanentProvince || "",
        distantBetWorkPlaceAndPermanentAddress: parentData.distantBetWorkPlaceAndPermanentAddress || "",
        telephoneNumber: parentData.telephoneNumber || "",
        contactId: parentData.contactId || 0,
      };

      setFormData(updatedData);
      prevParentDataRef.current = parentData;
      // Reset user update flag when parent data changes
      formUpdatedByUser.current = false;
      // Clear any errors when loading new data
      setErrors({});
    }
  }, [parentData]);

  // Update parent component only when form is changed by user input
  useEffect(() => {
    if (formUpdatedByUser.current) {
      // Make a defensive copy to ensure we don't pass undefined values back up
      const dataToSend = { ...formData };
      
      // Ensure no undefined values are sent to parent
      Object.keys(dataToSend).forEach(key => {
        if (dataToSend[key] === undefined) {
          dataToSend[key] = "";
        }
      });
      
      setContactDetails(dataToSend);
    }
  }, [formData, setContactDetails]);

  // Function to validate a single field
  const validateField = (name, value) => {
    // Skip validation for read-only fields
    const readOnlyFields = ['temporaryProvince', 'permanentProvince', 'permanentDistrict', 'permanentElectoral', 'permanentAGADivision'];
    if (readOnlyFields.includes(name)) return '';
    
    // Validate required fields
    if (value.trim() === '') return 'This field is required';
    
    // Distance fields validation (must be a positive number)
    if (name.includes('distant') && (isNaN(value) || Number(value) < 0)) {
      return 'Please enter a valid positive number';
    }
    
    // Telephone number validation
    if (name === 'telephoneNumber') {
      // Simple regex for phone number validation
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(value)) return 'Please enter a valid 10-digit phone number';
    }
    
    return '';
  };

  const fieldDependencies = {
    permanentAddress: [],
    permanentPostalCode: ['permanentAddress'],
    permanentGramaDivision: ['permanentAddress', 'permanentPostalCode'],
    policeDivision: ['permanentAddress', 'permanentPostalCode', 'permanentGramaDivision'],
    distantBetWorkPlaceAndPermanentAddress: [
      'permanentAddress', 
      'permanentPostalCode', 
      'permanentGramaDivision', 
      'policeDivision'
    ],
    telephoneNumber: [
      'permanentAddress', 
      'permanentPostalCode', 
      'permanentGramaDivision', 
      'policeDivision', 
      'distantBetWorkPlaceAndPermanentAddress'
    ],
    temporaryAddress: [],
    temporaryPostalCode: ['temporaryAddress'],
    temporaryDistrict: ['temporaryAddress', 'temporaryPostalCode'],
    distantBetWorkPlaceAndTemporyAddress: [
      'temporaryAddress', 
      'temporaryPostalCode', 
      'temporaryDistrict'
    ]
  };

  // Method to validate field dependencies
  const validateFieldDependencies = (fieldName) => {
    // Get the dependencies for this field
    const dependencies = fieldDependencies[fieldName] || [];
    
    // Check if all dependencies are filled
    const missingDependencies = dependencies.filter(dep => {
      const value = formData[dep];
      return !value || value.trim() === '';
    });

    return missingDependencies;
  };

  // Handle focus with dependency check
  const handleFocus = (e) => {
    const { name } = e.target;
    
    // Check for missing dependencies
    const missingDependencies = validateFieldDependencies(name);
    
    if (missingDependencies.length > 0) {
      // Find the first missing dependency
      const firstMissingField = missingDependencies[0];
      
      // Set errors for missing dependencies
      const newErrors = missingDependencies.reduce((acc, dep) => ({
        ...acc,
        [dep]: `Please fill out ${dep.replace(/([A-Z])/g, ' $1').toLowerCase()} first`
      }), {});
      
      // Update errors state
      setErrors(prevErrors => ({
        ...prevErrors,
        ...newErrors
      }));
      
      // Move focus to the first missing dependency
      if (inputRefs.current[firstMissingField]) {
        inputRefs.current[firstMissingField].focus();
      }
      
      // Prevent focus on the current field
      e.preventDefault();
    }
  };



  // Function to move to the next field
  const moveToNextField = (currentField) => {
    const currentIndex = fieldOrder.indexOf(currentField);
    if (currentIndex !== -1 && currentIndex < fieldOrder.length - 1) {
      const nextField = fieldOrder[currentIndex + 1];
      if (inputRefs.current[nextField]) {
        inputRefs.current[nextField].focus();
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
  
    formUpdatedByUser.current = true;
  
    // Capitalize each word for address fields
    if (name === 'permanentAddress' || name === 'temporaryAddress') {
      const allowedCharsRegex = /^[A-Za-z0-9\s.,'\/-]*$/;
      if (!allowedCharsRegex.test(value)) return;
      newValue = capitalizeEachWord(value);
    }
  
    // Postal code restriction: digits only
    if (name === 'permanentPostalCode' || name === 'temporaryPostalCode') {
      if (!/^\d*$/.test(value)) return;
    }
  
    // Validate Grama Division and Police Division: letters and spaces only
    if (['permanentGramaDivision', 'policeDivision'].includes(name)) {
      const letterOnlyRegex = /^[A-Za-z\s]*$/;
      if (!letterOnlyRegex.test(value)) return;
      newValue = capitalizeEachWord(value);
    }
  
    // Clone and update form data
    const updatedFormData = { ...formData, [name]: newValue };
  
    // Handle dependent updates
    if (name === "permanentGramaDivision") {
      const addressInfo = addressData.find(
        item => item.GND_Name.trim().toLowerCase() === newValue.trim().toLowerCase()
      );
      updatedFormData.permanentProvince = addressInfo?.Province_Name || "";
      updatedFormData.permanentDistrict = addressInfo?.District_Name || "";
      updatedFormData.permanentElectoral = addressInfo?.Polling_Division_Name || "";
      updatedFormData.permanentAGADivision = addressInfo?.DSD_Name || "";
    }
  
    if (name === "temporaryDistrict") {
      const addressInfo = addressData.find(item => item.District_Name === newValue);
      updatedFormData.temporaryProvince = addressInfo?.Province_Name || "";
    }
  
    // Update error state
    const error = validateField(name, newValue);
    setErrors(prev => ({ ...prev, [name]: error }));
  
    setFormData(updatedFormData);
  };
  
  // Helper function to format text to first letter uppercase and the rest lowercase
  const capitalizeEachWord = (str) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
  

  
   // Function to generate auto-suggest options for temporary address
   const generateTemporaryAddressSuggestions = () => {
    // If permanent address is empty, return empty array
    if (!formData.permanentAddress) return [];

    // Create suggestions based on permanent address
    const suggestions = [
      {
        label: formData.permanentAddress,
        postalCode: formData.permanentPostalCode,
        district: formData.permanentDistrict,
        province: formData.permanentProvince,
        distance: formData.distantBetWorkPlaceAndPermanentAddress
      },
    ];

    return suggestions;
  };

  // Handle address suggestion selection
  const handleAddressSuggestionSelect = (event, newValue) => {
    // Create a copy of current form data
    const updatedFormData = { ...formData };

    if (newValue && typeof newValue === 'object') {
      // Direct update of fields
      updatedFormData.temporaryAddress = newValue.label || "";
      updatedFormData.temporaryPostalCode = newValue.postalCode || "";
      updatedFormData.distantBetWorkPlaceAndTemporyAddress = newValue.distance || "";

      // Find district information from addressData
      const districtInfo = addressData.find((item) => 
        item.District_Name === newValue.district
      );

      // Update district and province
      if (districtInfo) {
        updatedFormData.temporaryDistrict = districtInfo.District_Name || "";
        updatedFormData.temporaryProvince = districtInfo.Province_Name || "";
      } else {
        // Fallback to original values if no match found
        updatedFormData.temporaryDistrict = newValue.district || "";
        updatedFormData.temporaryProvince = newValue.province || "";
      }

      // Set the updated form data
      setFormData(updatedFormData);

      // Set flag to indicate user update
      formUpdatedByUser.current = true;
    } else {
      // If it's a free-form input, just update the address
      const syntheticEvent = {
        target: {
          name: "temporaryAddress",
          value: newValue || ""
        }
      };
      handleChange(syntheticEvent);
    }
  };
  
  // Handle key press events
  const handleKeyPress = (e) => {
    const { name, value } = e.target;
    
    // If Enter key is pressed
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // First validate the current field
      const error = validateField(name, value);
      
      // Update error state for this field only
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: error
      }));
      
      // If field is valid, move to next field
      if (!error) {
        moveToNextField(name);
      }
    }
  };

  return (
     <ThemeProvider theme={textFieldTheme}>
    <Grid item xs={11.4} container spacing={2} sx={{ ml: 3 }}>
    <Grid  
          container 
          alignItems="center" 
          sx={{ 
            mr: 0, 
            mt: 10, 
            backgroundColor: "#E0E0E0" ,
            borderRadius: 1, 
            boxShadow: 3,  
          }}
          
        >
      <Grid >
        <Typography
          sx={{ ml: 2, mt: 1 }}
          variant="h6"
          gutterBottom
          style={{
            fontStyle: "italic",
            color: "rgb(58, 53, 54)",
            fontFamily: "Roboto, sans-serif",
            textAlign: "left",
          }}
        >
          Contact Details
        </Typography>
      </Grid>
     </Grid>
   
      {/* Permanent Address Section */}
      <Typography variant="h6" sx={{ mt: 5, ml: 0, mb: 2 }} style={{ fontStyle: "italic", fontSize: "18px", color: "rgb(41, 40, 40)" }}>
        Permanent Address Details
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={10}>
          <TextField 
            label="Permanent Address" 
            name="permanentAddress" 
            fullWidth 
            variant="outlined" 
            value={formData.permanentAddress} 
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyPress={handleKeyPress}
            error={!!errors.permanentAddress}
            helperText={errors.permanentAddress || ''}
            inputRef={el => inputRefs.current.permanentAddress = el}
            required 
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField 
            label="Postal Code" 
            name="permanentPostalCode" 
            fullWidth 
            variant="outlined" 
            value={formData.permanentPostalCode} 
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyPress={handleKeyPress}
            error={!!errors.permanentPostalCode}
            helperText={errors.permanentPostalCode || ''}
            inputRef={el => inputRefs.current.permanentPostalCode = el}
            required 
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField 
            label="Grama Division" 
            name="permanentGramaDivision" 
            fullWidth 
            variant="outlined" 
            value={formData.permanentGramaDivision} 
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyPress={handleKeyPress}
            error={!!errors.permanentGramaDivision}
            helperText={errors.permanentGramaDivision || ''}
            inputRef={el => inputRefs.current.permanentGramaDivision = el}
            required 
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField 
            label="AGA Division" 
            name="permanentAGADivision" 
            fullWidth 
            variant="outlined" 
            value={formData.permanentAGADivision} 
            InputProps={{ readOnly: true }} 
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField 
            label="Electoral Division" 
            name="permanentElectoral" 
            fullWidth 
            variant="outlined" 
            value={formData.permanentElectoral} 
            InputProps={{ readOnly: true }} 
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField 
            label="Police Division" 
            name="policeDivision" 
            fullWidth 
            variant="outlined" 
            value={formData.policeDivision} 
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyPress={handleKeyPress}
            error={!!errors.policeDivision}
            helperText={errors.policeDivision || ''}
            inputRef={el => inputRefs.current.policeDivision = el}
            required 
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField 
            label="District" 
            name="permanentDistrict" 
            fullWidth 
            variant="outlined" 
            value={formData.permanentDistrict} 
            InputProps={{ readOnly: true }} 
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField 
            label="Province" 
            name="permanentProvince" 
            fullWidth 
            variant="outlined" 
            value={formData.permanentProvince} 
            InputProps={{ readOnly: true }} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Distance to Workplace (km)" 
            name="distantBetWorkPlaceAndPermanentAddress" 
            type="number" 
            fullWidth 
            variant="outlined" 
            value={formData.distantBetWorkPlaceAndPermanentAddress} 
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyPress={handleKeyPress}
            error={!!errors.distantBetWorkPlaceAndPermanentAddress}
            helperText={errors.distantBetWorkPlaceAndPermanentAddress || ''}
            inputRef={el => inputRefs.current.distantBetWorkPlaceAndPermanentAddress = el}
            required 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Telephone Number" 
            name="telephoneNumber" 
            fullWidth 
            variant="outlined" 
            value={formData.telephoneNumber} 
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyPress={handleKeyPress}
            error={!!errors.telephoneNumber}
            helperText={errors.telephoneNumber || ''}
            inputRef={el => inputRefs.current.telephoneNumber = el}
            required 
          />
        </Grid>
      </Grid>

        {/* Temporary Address Section */}
        <Grid container spacing={1}>
          <Typography variant="h6" sx={{ mt: 3, ml: 2 }} style={{ fontStyle: "italic", fontSize: "18px", color: "rgb(41, 40, 40)" }}>
            Temporary Address Details
          </Typography>
          <Grid item xs={10}>
          {/* <Autocomplete
        freeSolo
        options={generateTemporaryAddressSuggestions()}
        getOptionLabel={(option) => 
          typeof option === 'object' ? option.label : option
        }
        onChange={handleAddressSuggestionSelect}
        
        renderInput={(params) => (
          <TextField 
            {...params}
            label="Temporary Address" 
            name="temporaryAddress" 
            fullWidth 
            variant="outlined"   
            error={!!errors.temporaryAddress}
            helperText={errors.temporaryAddress || ''}
            inputRef={el => inputRefs.current.temporaryAddress = el}
            required 
            onKeyPress={handleKeyPress}
            
          />
        )} */}
        <Autocomplete
              freeSolo
              options={generateTemporaryAddressSuggestions()}
              value={formData.temporaryAddress} // Add this line
              getOptionLabel={(option) => 
                typeof option === 'object' ? option.label : option
              }
              onChange={handleAddressSuggestionSelect}
              renderInput={(params) => (
                <TextField 
                  {...params}
                  label="Temporary Address" 
                  name="temporaryAddress" 
                  fullWidth 
                  variant="outlined"   
                  value={formData.temporaryAddress} // Ensure value is explicitly set
                  onChange={(e) => {
                    // Add this handler to ensure value updates even without suggestion
                    handleChange({
                      target: {
                        name: 'temporaryAddress',
                        value: e.target.value
                      }
                    });
                  }}
                  error={!!errors.temporaryAddress}
                  helperText={errors.temporaryAddress || ''}
                  inputRef={el => inputRefs.current.temporaryAddress = el}
                  required 
                  onKeyPress={handleKeyPress}
                />
              )}
            />
      
          </Grid>
        <Grid item xs={12} sm={2}>
          <TextField 
            label="Postal Code" 
            name="temporaryPostalCode" 
            fullWidth 
            variant="outlined" 
            value={formData.temporaryPostalCode} 
            onChange={handleChange}
             onFocus={handleFocus}
            onKeyPress={handleKeyPress}
            error={!!errors.temporaryPostalCode}
            helperText={errors.temporaryPostalCode || ''}
            inputRef={el => inputRefs.current.temporaryPostalCode = el}
            required 
          />
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Autocomplete
            options={sriLankanDistricts}
            value={formData.temporaryDistrict}
            onChange={(event, newValue) => {
              // Create a synthetic event object to work with your existing handleChange function
              const syntheticEvent = {
                target: {
                  name: "temporaryDistrict",
                  value: newValue || ""
                }
              };
              handleChange(syntheticEvent);
            }}
            onFocus={handleFocus}
            renderInput={(params) => (
              <TextField
                {...params}
                label="District"
                name="temporaryDistrict"
                fullWidth
                variant="outlined"
                error={!!errors.temporaryDistrict}
                helperText={errors.temporaryDistrict || ''}
                inputRef={el => inputRefs.current.temporaryDistrict = el}
                required
                onKeyPress={handleKeyPress}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField 
            label="Province" 
            name="temporaryProvince" 
            fullWidth 
            variant="outlined" 
            value={formData.temporaryProvince} 
            InputProps={{ readOnly: true }} 
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField 
            label="Distance to Workplace (km)" 
            name="distantBetWorkPlaceAndTemporyAddress" 
            type="number" 
            fullWidth 
            variant="outlined" 
            value={formData.distantBetWorkPlaceAndTemporyAddress} 
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyPress={handleKeyPress}
            error={!!errors.distantBetWorkPlaceAndTemporyAddress}
            helperText={errors.distantBetWorkPlaceAndTemporyAddress || ''}
            inputRef={el => inputRefs.current.distantBetWorkPlaceAndTemporyAddress = el}
            required 
          />
        </Grid>
      </Grid>
    </Grid>
    </ThemeProvider>
  );
};

export default ContactDetails;



