// import { Grid, Typography, TextField } from "@mui/material";
// import React, { useState, useEffect, useRef } from "react";
// import addressData from "../../data/addressData.json";

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

//   // Track if form has been updated by user input
//   const formUpdatedByUser = useRef(false);

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

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     // Set flag to indicate this is a user-initiated update
//     formUpdatedByUser.current = true;

//     // Start with a copy of current form data
//     const updatedFormData = { ...formData };
    
//     // Set the changed field (always ensure it's at least an empty string)
//     updatedFormData[name] = value || "";

//     // Handle dependent fields for permanentGramaDivision
//     if (name === "permanentGramaDivision") {
//       const addressInfo = addressData.find((item) => item.GND_Name === value);
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
//       const addressInfo = addressData.find((item) => item.District_Name === value);
//       updatedFormData.temporaryProvince = addressInfo ? (addressInfo.Province_Name || "") : "";
//     }

//     setFormData(updatedFormData);
//   };

//   return (
//     <Grid item xs={11.4} container spacing={1} sx={{ ml: 3 }}>
//       <Grid>
//         <Typography
//           sx={{ mt: 5 }}
//           variant="h5"
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

//       {/* Temporary Address Section */}
//       <Grid container spacing={2}>
//         <Typography variant="h6" sx={{ mt: 3, ml: 2 }} style={{ fontStyle: "italic", fontSize: "18px", color: "rgb(65, 63, 63)" }}>
//           Temporary Address Details
//         </Typography>
//         <Grid item xs={12}>
//           <TextField label="Temporary Address" name="temporaryAddress" fullWidth variant="outlined" value={formData.temporaryAddress} onChange={handleChange} required />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField label="Postal Code" name="temporaryPostalCode" fullWidth variant="outlined" value={formData.temporaryPostalCode} onChange={handleChange} required />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField label="District" name="temporaryDistrict" fullWidth variant="outlined" value={formData.temporaryDistrict} onChange={handleChange} required />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField label="Province" name="temporaryProvince" fullWidth variant="outlined" value={formData.temporaryProvince} InputProps={{ readOnly: true }} />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField label="Distance to Workplace (km)" name="distantBetWorkPlaceAndTemporyAddress" type="number" fullWidth variant="outlined" value={formData.distantBetWorkPlaceAndTemporyAddress} onChange={handleChange} required />
//         </Grid>
//       </Grid>

//       {/* Permanent Address Section */}
//       <Typography variant="h6" sx={{ mt: 5, ml: 0, mb: 2 }} style={{ fontStyle: "italic", fontSize: "18px", color: "rgb(41, 40, 40)" }}>
//         Permanent Address Details
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <TextField label="Permanent Address" name="permanentAddress" fullWidth variant="outlined" value={formData.permanentAddress} onChange={handleChange} required />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField label="Postal Code" name="permanentPostalCode" fullWidth variant="outlined" value={formData.permanentPostalCode} onChange={handleChange} required />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField label="Grama Division" name="permanentGramaDivision" fullWidth variant="outlined" value={formData.permanentGramaDivision} onChange={handleChange} required />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField label="AGA Division" name="permanentAGADivision" fullWidth variant="outlined" value={formData.permanentAGADivision} InputProps={{ readOnly: true }} />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField label="Electoral Division" name="permanentElectoral" fullWidth variant="outlined" value={formData.permanentElectoral} InputProps={{ readOnly: true }} />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField label="Police Division" name="policeDivision" fullWidth variant="outlined" value={formData.policeDivision} onChange={handleChange} required />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField label="District" name="permanentDistrict" fullWidth variant="outlined" value={formData.permanentDistrict} InputProps={{ readOnly: true }} />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField label="Province" name="permanentProvince" fullWidth variant="outlined" value={formData.permanentProvince} InputProps={{ readOnly: true }} />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField label="Distance to Workplace (km)" name="distantBetWorkPlaceAndPermanentAddress" type="number" fullWidth variant="outlined" value={formData.distantBetWorkPlaceAndPermanentAddress} onChange={handleChange} required />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField label="Telephone Number" name="telephoneNumber" fullWidth variant="outlined" value={formData.telephoneNumber} onChange={handleChange} required />
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default ContactDetails;







import { Grid, Typography, TextField } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import addressData from "../../data/addressData.json";

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
    "temporaryAddress",
    "temporaryPostalCode",
    "temporaryDistrict",
    "distantBetWorkPlaceAndTemporyAddress",
    "permanentAddress",
    "permanentPostalCode",
    "permanentGramaDivision",
    "policeDivision",
    "distantBetWorkPlaceAndPermanentAddress",
    "telephoneNumber"
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Set flag to indicate this is a user-initiated update
    formUpdatedByUser.current = true;

    // Start with a copy of current form data
    const updatedFormData = { ...formData };
    
    // Set the changed field (always ensure it's at least an empty string)
    updatedFormData[name] = value || "";

    // Handle dependent fields for permanentGramaDivision
    if (name === "permanentGramaDivision") {
      const addressInfo = addressData.find((item) => item.GND_Name === value);
      if (addressInfo) {
        updatedFormData.permanentProvince = addressInfo.Province_Name || "";
        updatedFormData.permanentDistrict = addressInfo.District_Name || "";
        updatedFormData.permanentElectoral = addressInfo.Polling_Division_Name || "";
        updatedFormData.permanentAGADivision = addressInfo.DSD_Name || "";
      } else {
        updatedFormData.permanentProvince = "";
        updatedFormData.permanentDistrict = "";
        updatedFormData.permanentElectoral = "";
        updatedFormData.permanentAGADivision = "";
      }
    }

    // Handle dependent fields for temporaryDistrict
    if (name === "temporaryDistrict") {
      const addressInfo = addressData.find((item) => item.District_Name === value);
      updatedFormData.temporaryProvince = addressInfo ? (addressInfo.Province_Name || "") : "";
    }

    // Clear error for this field if value is valid
    const error = validateField(name, value);
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));

    setFormData(updatedFormData);
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
    <Grid item xs={11.4} container spacing={1} sx={{ ml: 3 }}>
      <Grid>
        <Typography
          sx={{ mt: 5 }}
          variant="h5"
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
      {/* <TextField 
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
            error={errors.epfNumber && touched.epfNumber}
            helperText={getHelperText("epfNumber")}
          /> */}
      {/* Temporary Address Section */}
      <Grid container spacing={2}>
        <Typography variant="h6" sx={{ mt: 3, ml: 2 }} style={{ fontStyle: "italic", fontSize: "18px", color: "rgb(65, 63, 63)" }}>
          Temporary Address Details
        </Typography>
        <Grid item xs={12}>
          <TextField 
            label="Temporary Address" 
            name="temporaryAddress" 
            fullWidth 
            variant="outlined" 
            value={formData.temporaryAddress} 
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            error={!!errors.temporaryAddress}
            helperText={errors.temporaryAddress || ''}
            inputRef={el => inputRefs.current.temporaryAddress = el}
            required 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Postal Code" 
            name="temporaryPostalCode" 
            fullWidth 
            variant="outlined" 
            value={formData.temporaryPostalCode} 
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            error={!!errors.temporaryPostalCode}
            helperText={errors.temporaryPostalCode || ''}
            inputRef={el => inputRefs.current.temporaryPostalCode = el}
            required 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="District" 
            name="temporaryDistrict" 
            fullWidth 
            variant="outlined" 
            value={formData.temporaryDistrict} 
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            error={!!errors.temporaryDistrict}
            helperText={errors.temporaryDistrict || ''}
            inputRef={el => inputRefs.current.temporaryDistrict = el}
            required 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Province" 
            name="temporaryProvince" 
            fullWidth 
            variant="outlined" 
            value={formData.temporaryProvince} 
            InputProps={{ readOnly: true }} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Distance to Workplace (km)" 
            name="distantBetWorkPlaceAndTemporyAddress" 
            type="number" 
            fullWidth 
            variant="outlined" 
            value={formData.distantBetWorkPlaceAndTemporyAddress} 
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            error={!!errors.distantBetWorkPlaceAndTemporyAddress}
            helperText={errors.distantBetWorkPlaceAndTemporyAddress || ''}
            inputRef={el => inputRefs.current.distantBetWorkPlaceAndTemporyAddress = el}
            required 
          />
        </Grid>
      </Grid>

      {/* Permanent Address Section */}
      <Typography variant="h6" sx={{ mt: 5, ml: 0, mb: 2 }} style={{ fontStyle: "italic", fontSize: "18px", color: "rgb(41, 40, 40)" }}>
        Permanent Address Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField 
            label="Permanent Address" 
            name="permanentAddress" 
            fullWidth 
            variant="outlined" 
            value={formData.permanentAddress} 
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            error={!!errors.permanentAddress}
            helperText={errors.permanentAddress || ''}
            inputRef={el => inputRefs.current.permanentAddress = el}
            required 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Postal Code" 
            name="permanentPostalCode" 
            fullWidth 
            variant="outlined" 
            value={formData.permanentPostalCode} 
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            error={!!errors.permanentPostalCode}
            helperText={errors.permanentPostalCode || ''}
            inputRef={el => inputRefs.current.permanentPostalCode = el}
            required 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Grama Division" 
            name="permanentGramaDivision" 
            fullWidth 
            variant="outlined" 
            value={formData.permanentGramaDivision} 
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            error={!!errors.permanentGramaDivision}
            helperText={errors.permanentGramaDivision || ''}
            inputRef={el => inputRefs.current.permanentGramaDivision = el}
            required 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="AGA Division" 
            name="permanentAGADivision" 
            fullWidth 
            variant="outlined" 
            value={formData.permanentAGADivision} 
            InputProps={{ readOnly: true }} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Electoral Division" 
            name="permanentElectoral" 
            fullWidth 
            variant="outlined" 
            value={formData.permanentElectoral} 
            InputProps={{ readOnly: true }} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Police Division" 
            name="policeDivision" 
            fullWidth 
            variant="outlined" 
            value={formData.policeDivision} 
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            error={!!errors.policeDivision}
            helperText={errors.policeDivision || ''}
            inputRef={el => inputRefs.current.policeDivision = el}
            required 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="District" 
            name="permanentDistrict" 
            fullWidth 
            variant="outlined" 
            value={formData.permanentDistrict} 
            InputProps={{ readOnly: true }} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
            onKeyPress={handleKeyPress}
            error={!!errors.distantBetWorkPlaceAndPermanentAddress}
            helperText={errors.distantBetWorkPlaceAndPermanentAddress || ''}
            inputRef={el => inputRefs.current.distantBetWorkPlaceAndPermanentAddress = el}
            required 
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            label="Telephone Number" 
            name="telephoneNumber" 
            fullWidth 
            variant="outlined" 
            value={formData.telephoneNumber} 
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            error={!!errors.telephoneNumber}
            helperText={errors.telephoneNumber || ''}
            inputRef={el => inputRefs.current.telephoneNumber = el}
            required 
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContactDetails;