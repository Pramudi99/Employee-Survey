// import { useState, useEffect } from "react";
// import { TextField, Grid, MenuItem, Typography } from "@mui/material";

// const PersonalDetailsForm = ({ setPersonalDetails, parentData }) => {
//   const [formData, setFormData] = useState({
//     epfNumber: "",
//     nameWithInitials: "",
//     title:'',
//     fullName: "",
//     gender: "",
//     maritalStatus: "",
//     bloodGroup: "",
//     dateOfBirth: "",
//     nicNumber: "",
//     drivingLicense: "",
//     passportNumber: "",
//     religion: "",
//     race: "",
//     numberOfDependents: 0,  
//   });

//   useEffect(() => {
//     if (parentData) {
//       setFormData((prevData) => ({
//         ...prevData,
//         ...parentData,
//       }));
//     }
//   }, [parentData]);

  

//     // Function to extract birthday and gender from NIC number
//     const extractNICDetails = (nic) => {
//         let birthYear, dayOfYear;
        
//         if (/^\d{9}[VX]$/.test(nic)) {
//           // Old NIC format: 921532345V
//           birthYear = `19${nic.substring(0, 2)}`;
//           dayOfYear = parseInt(nic.substring(2, 5), 10);
//         } else if (/^\d{12}$/.test(nic)) {
//           // New NIC format: 20021230345V
//           birthYear = nic.substring(0, 4);
//           dayOfYear = parseInt(nic.substring(4, 7), 10);
//         } else {
//           return { dateOfBirth: "", gender: "" }; // Invalid NIC format
//         }
    
//         // Determine gender
//         let gender = "Male";
//         if (dayOfYear > 500) {
//           dayOfYear -= 500;
//           gender = "Female";
//         }
        
//         if (((birthYear % 4) === 0) || (dayOfYear <= 59 ) ) {  // Corrected condition syntax
//             const dob = new Date(birthYear, 0, dayOfYear + 1); 
//             var dateOfBirth = dob.toISOString().split("T")[0]; // Declare with var/let to use outside if block
//         } else {
//             // Convert dayOfYear to actual date
//             const dob = new Date(birthYear, 0, dayOfYear);
//             var dateOfBirth = dob.toISOString().split("T")[0]; // Declare with var/let
//         }
       
    
//         return { dateOfBirth, gender };
//       };

//       const handleChange = (e) => {
//         const { name, value } = e.target;
    
//         setFormData((prevFormData) => {
//             let updatedFormData = { ...prevFormData, [name]: value };
    
//             if (name === "nicNumber") {
//                 const { dateOfBirth, gender } = extractNICDetails(value);
//                 updatedFormData = { ...updatedFormData, dateOfBirth, gender };
//             }
    
//             if (name === "numberOfDependents") {
//                 updatedFormData[name] = value ? Number(value) : 0;
//             }
    
//             setPersonalDetails(updatedFormData);  // Pass updated data to parent
//             return updatedFormData; // Ensures React gets the correct state update
//         });
//     };
    

//   return (
    
//     <Grid container spacing={2}>
//       <Typography sx={{ ml: 3, mt: 4 }} variant="h4" gutterBottom style={{ fontStyle: "italic", color:"rgb(129, 43, 57)", fontFamily: 'Roboto, sans-serif', textAlign:'center'}}>
//         General Details 
//         </Typography>
//         <Grid item xs={11.5} container spacing={1} sx={{ ml: 2 , mt:3}}>
//         <Grid >
//        <Typography sx={{ ml: 1 , mt: -2  }} variant="h5" gutterBottom style={{ fontStyle: "italic", color:"rgb(58, 53, 54)", fontFamily: 'Roboto, sans-serif', textAlign: "left",  }}>
//         Personal Details 
//         </Typography>
//       </Grid>
//       <Grid item xs={12}>
//         <TextField label="EPF Number" name="epfNumber" fullWidth variant="outlined" value={formData.epfNumber} onChange={handleChange} required />
//       </Grid>

//       <Grid item xs={12} sm={1.5}>
//         <TextField select label="Title" name="title" fullWidth variant="outlined" value={formData.title} onChange={handleChange} required>
//           <MenuItem value="Mr">Mr.</MenuItem>
//           <MenuItem value="Mrs">Mrs.</MenuItem>
//           <MenuItem value="Miss">Miss.</MenuItem>
//         </TextField>
//       </Grid>
//       <Grid item xs={10.5}>
//         <TextField label="Name with Initials" name="nameWithInitials" fullWidth variant="outlined" value={formData.nameWithInitials} onChange={handleChange} required />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField label="Full Name" name="fullName" fullWidth variant="outlined" value={formData.fullName} onChange={handleChange} required />
//       </Grid>
//        <Grid item xs={12}>
//         <TextField label="NIC Number" name="nicNumber" fullWidth variant="outlined" value={formData.nicNumber} onChange={handleChange} required />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField label="Date of Birth" name="dateOfBirth" type="date" fullWidth variant="outlined" InputLabelProps={{ shrink: true }} value={formData.dateOfBirth} onChange={handleChange} required />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField label="Gender" name="gender" fullWidth variant="outlined" value={formData.gender} onChange={handleChange}  InputProps={{readOnly: true,}} />
          
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField select label="Marital Status" name="maritalStatus" fullWidth variant="outlined" value={formData.maritalStatus} onChange={handleChange} required>
//           <MenuItem value="Single">Single</MenuItem>
//           <MenuItem value="Married">Married</MenuItem>
//           <MenuItem value="Divorced">Divorced</MenuItem>
//           <MenuItem value="Separated">Separated</MenuItem>
//           <MenuItem value="Widowed">Widow</MenuItem>
//           <MenuItem value="Widowed">Widower</MenuItem>
//         </TextField>
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField select label="Blood Group" name="bloodGroup" fullWidth variant="outlined" value={formData.bloodGroup} onChange={handleChange} required>
//           <MenuItem value="O+">O+</MenuItem>
//           <MenuItem value="O-">O-</MenuItem>
//           <MenuItem value="A+">A+</MenuItem>
//           <MenuItem value="A-">A-</MenuItem>
//           <MenuItem value="B+">B+</MenuItem>
//           <MenuItem value="B-">B-</MenuItem>
//           <MenuItem value="AB+">AB+</MenuItem>
//           <MenuItem value="AB-">AB-</MenuItem>
//         </TextField>
//       </Grid>
//       {/* <Grid item xs={12} sm={6}>
//         <TextField label="Date of Birth" name="dateOfBirth" type="date" fullWidth variant="outlined" InputLabelProps={{ shrink: true }} value={formData.dateOfBirth} onChange={handleChange} required />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField label="NIC Number" name="nicNumber" fullWidth variant="outlined" value={formData.nicNumber} onChange={handleChange} required />
//       </Grid> */}
     
//       <Grid item xs={12}>
//         <TextField label="Driving License" name="drivingLicense" fullWidth variant="outlined" value={formData.drivingLicense} onChange={handleChange} />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField label="Passport Number" name="passportNumber" fullWidth variant="outlined" value={formData.passportNumber} onChange={handleChange} />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField select label="Religion" name="religion" fullWidth variant="outlined" value={formData.religion} onChange={handleChange} required >
//           <MenuItem value="Buddhism">Buddhism</MenuItem>
//           <MenuItem value="Hindu">Hindu</MenuItem>
//           <MenuItem value="Islam">Islam</MenuItem>
//           <MenuItem value="Christianity">Christianity</MenuItem>
//         </TextField>
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField select label="Race" name="race" fullWidth variant="outlined" value={formData.race} onChange={handleChange} required >
//         <MenuItem value="Sinhala">Sinhala</MenuItem>
//           <MenuItem value="Tamil">Tamil</MenuItem>
//           <MenuItem value="Muslim">Muslim</MenuItem>
//           <MenuItem value="Burgher">Burgher</MenuItem>
//           <MenuItem value="Malay"> Malay</MenuItem>
//         </TextField>
//       </Grid>
//       <Grid item xs={12}>
//         <TextField label="Number of Dependents" name="numberOfDependents"  fullWidth variant="outlined" value={formData.numberOfDependents} onChange={handleChange} required />
//       </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default PersonalDetailsForm;





// import { useState, useEffect, useRef } from "react";
// import { TextField, Grid, MenuItem, Typography, FormHelperText } from "@mui/material";

// const PersonalDetailsForm = ({ setPersonalDetails, parentData }) => {
//   const [formData, setFormData] = useState({
//     epfNumber: "",
//     nameWithInitials: "",
//     title: "",
//     fullName: "",
//     gender: "",
//     maritalStatus: "",
//     bloodGroup: "",
//     dateOfBirth: "",
//     nicNumber: "",
//     drivingLicense: "",
//     passportNumber: "",
//     religion: "",
//     race: "",
//     numberOfDependents: 0,
//   });

//   // Add errors state to track validation errors
//   const [errors, setErrors] = useState({
//     epfNumber: false,
//     nameWithInitials: false,
//     title: false,
//     fullName: false,
//     nicNumber: false,
//     dateOfBirth: false,
//     maritalStatus: false,
//     bloodGroup: false,
//     religion: false,
//     race: false,
//     numberOfDependents: false,
//   });

//   // Track which fields have been visited (for validation on blur)
//   const [touched, setTouched] = useState({
//     epfNumber: false,
//     nameWithInitials: false,
//     title: false,
//     fullName: false,
//     nicNumber: false,
//     dateOfBirth: false,
//     maritalStatus: false,
//     bloodGroup: false,
//     religion: false,
//     race: false,
//     numberOfDependents: false,
//   });

//   // Create refs for field navigation
//   const fieldRefs = useRef({});

//   // Order of fields for navigation
//   const fieldOrder = [
//     "epfNumber",
//     "title",
//     "nameWithInitials",
//     "fullName",
//     "nicNumber",
//     "dateOfBirth", 
//     "maritalStatus",
//     "bloodGroup",
//     "drivingLicense",
//     "passportNumber",
//     "religion",
//     "race",
//     "numberOfDependents"
//   ];

//   useEffect(() => {
//     if (parentData) {
//       setFormData((prevData) => ({
//         ...prevData,
//         ...parentData,
//       }));

//       // Initialize errors state based on parentData
//       const initialErrors = {};
//       Object.keys(errors).forEach(field => {
//         // Check if field is required and empty in parentData
//         if (isFieldRequired(field) && (!parentData[field] || parentData[field] === "")) {
//           initialErrors[field] = true;
//         } else {
//           initialErrors[field] = false;
//         }
//       });
//       setErrors(initialErrors);
//     }
//   }, [parentData]);

//   // Function to determine if a field is required
//   const isFieldRequired = (field) => {
//     const requiredFields = [
//       "epfNumber", "nameWithInitials", "title", "fullName", 
//       "nicNumber", "dateOfBirth", "maritalStatus", "bloodGroup", 
//       "religion", "race", "numberOfDependents"
//     ];
//     return requiredFields.includes(field);
//   };

//   // Function to validate a field
//   const validateField = (name, value) => {
//     if (!isFieldRequired(name)) return true;
    
//     let isValid = value && value.toString().trim() !== "";
    
//     // Update errors state
//     setErrors(prev => ({
//       ...prev,
//       [name]: !isValid
//     }));
    
//     return isValid;
//   };

//   // Handle field blur (when user leaves a field)
//   const handleBlur = (e) => {
//     const { name } = e.target;
    
//     // Mark field as touched
//     setTouched(prev => ({
//       ...prev,
//       [name]: true
//     }));
    
//     // Validate the field
//     validateField(name, formData[name]);
//   };

//   // Get the next field in the tab order
//   const getNextFieldId = (currentField) => {
//     const currentIndex = fieldOrder.indexOf(currentField);
//     if (currentIndex < fieldOrder.length - 1) {
//       return fieldOrder[currentIndex + 1];
//     }
//     return null;
//   };

//   // Function to handle Enter key navigation
//   const handleKeyDown = (e, fieldName) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
      
//       // Mark field as touched
//       setTouched(prev => ({
//         ...prev,
//         [fieldName]: true
//       }));
      
//       // Validate current field
//       const isValid = validateField(fieldName, formData[fieldName]);
      
//       // If valid, move to next field
//       if (isValid) {
//         const nextFieldId = getNextFieldId(fieldName);
//         if (nextFieldId && fieldRefs.current[nextFieldId]) {
//           fieldRefs.current[nextFieldId].focus();
//         }
//       }
//     }
//   };

//   // Function to extract birthday and gender from NIC number
//   const extractNICDetails = (nic) => {
//     let birthYear, dayOfYear;
    
//     if (/^\d{9}[VX]$/.test(nic)) {
//       // Old NIC format: 921532345V
//       birthYear = `19${nic.substring(0, 2)}`;
//       dayOfYear = parseInt(nic.substring(2, 5), 10);
//     } else if (/^\d{12}$/.test(nic)) {
//       // New NIC format: 20021230345V
//       birthYear = nic.substring(0, 4);
//       dayOfYear = parseInt(nic.substring(4, 7), 10);
//     } else {
//       return { dateOfBirth: "", gender: "" }; // Invalid NIC format
//     }

//     // Determine gender
//     let gender = "Male";
//     if (dayOfYear > 500) {
//       dayOfYear -= 500;
//       gender = "Female";
//     }
    
//     if (((birthYear % 4) === 0) || (dayOfYear <= 59 ) ) {  // Corrected condition syntax
//         const dob = new Date(birthYear, 0, dayOfYear + 1); 
//         var dateOfBirth = dob.toISOString().split("T")[0]; // Declare with var/let to use outside if block
//     } else {
//         // Convert dayOfYear to actual date
//         const dob = new Date(birthYear, 0, dayOfYear);
//         var dateOfBirth = dob.toISOString().split("T")[0]; // Declare with var/let
//     }
   
//     return { dateOfBirth, gender };
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prevFormData) => {
//       let updatedFormData = { ...prevFormData, [name]: value };

//       if (name === "nicNumber") {
//         const { dateOfBirth, gender } = extractNICDetails(value);
//         updatedFormData = { ...updatedFormData, dateOfBirth, gender };
        
//         // If dateOfBirth was auto-filled, mark it as touched
//         if (dateOfBirth) {
//           setTouched(prev => ({
//             ...prev,
//             dateOfBirth: true
//           }));
//         }
        
//         // Also validate the date of birth field since it was auto-filled
//         validateField("dateOfBirth", dateOfBirth);
//       }

//       if (name === "numberOfDependents") {
//         updatedFormData[name] = value ? Number(value) : 0;
//       }

//       // If field has been touched, validate it as user types
//       if (touched[name]) {
//         validateField(name, value);
//       }

//       setPersonalDetails(updatedFormData);  // Pass updated data to parent
//       return updatedFormData; // Ensures React gets the correct state update
//     });
//   };

//   // Function to get error helper text
//   const getHelperText = (fieldName) => {
//     if (errors[fieldName] && touched[fieldName]) {
//       return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
//     }
//     return "";
//   };

//   return (
//     <Grid container spacing={2}>
//       <Typography 
//         sx={{ ml: 3, mt: 4 }} 
//         variant="h4" 
//         gutterBottom 
//         style={{ 
//           fontStyle: "italic", 
//           color:"rgb(129, 43, 57)", 
//           fontFamily: 'Roboto, sans-serif', 
//           textAlign:'center'
//         }}
//       >
//         General Details 
//       </Typography>
//       <Grid item xs={11.5} container spacing={1} sx={{ ml: 2, mt: 3 }}>
//         <Grid>
//           <Typography 
//             sx={{ ml: 1, mt: -2 }} 
//             variant="h5" 
//             gutterBottom 
//             style={{ 
//               fontStyle: "italic", 
//               color:"rgb(58, 53, 54)", 
//               fontFamily: 'Roboto, sans-serif', 
//               textAlign: "left" 
//             }}
//           >
//             Personal Details 
//           </Typography>
//         </Grid>
//         <Grid item xs={12}>
//           <TextField 
//             label="EPF Number" 
//             name="epfNumber" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.epfNumber} 
//             onChange={handleChange} 
//             onBlur={handleBlur}
//             onKeyDown={(e) => handleKeyDown(e, "epfNumber")}
//             inputRef={(el) => fieldRefs.current["epfNumber"] = el}
//             required 
//             error={errors.epfNumber && touched.epfNumber}
//             helperText={getHelperText("epfNumber")}
//           />
//         </Grid>

//         <Grid item xs={12} sm={1.5}>
//           <TextField 
//             select 
//             label="Title" 
//             name="title" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.title || ""} 
//             onChange={handleChange} 
//             onBlur={handleBlur}
//             onKeyDown={(e) => handleKeyDown(e, "title")}
//             inputRef={(el) => fieldRefs.current["title"] = el}
//             required
//             error={errors.title && touched.title}
//             helperText={getHelperText("title")}
//           >
//             <MenuItem value="Mr">Mr.</MenuItem>
//             <MenuItem value="Mrs">Mrs.</MenuItem>
//             <MenuItem value="Miss">Miss.</MenuItem>
//           </TextField>
//         </Grid>
//         <Grid item xs={10.5}>
//           <TextField 
//             label="Name with Initials" 
//             name="nameWithInitials" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.nameWithInitials} 
//             onChange={handleChange} 
//             onBlur={handleBlur}
//             onKeyDown={(e) => handleKeyDown(e, "nameWithInitials")}
//             inputRef={(el) => fieldRefs.current["nameWithInitials"] = el}
//             required 
//             error={errors.nameWithInitials && touched.nameWithInitials}
//             helperText={getHelperText("nameWithInitials")}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField 
//             label="Full Name" 
//             name="fullName" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.fullName} 
//             onChange={handleChange} 
//             onBlur={handleBlur}
//             onKeyDown={(e) => handleKeyDown(e, "fullName")}
//             inputRef={(el) => fieldRefs.current["fullName"] = el}
//             required 
//             error={errors.fullName && touched.fullName}
//             helperText={getHelperText("fullName")}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField 
//             label="NIC Number" 
//             name="nicNumber" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.nicNumber} 
//             onChange={handleChange} 
//             onBlur={handleBlur}
//             onKeyDown={(e) => handleKeyDown(e, "nicNumber")}
//             inputRef={(el) => fieldRefs.current["nicNumber"] = el}
//             required 
//             error={errors.nicNumber && touched.nicNumber}
//             helperText={getHelperText("nicNumber")}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField 
//             label="Date of Birth" 
//             name="dateOfBirth" 
//             type="date" 
//             fullWidth 
//             variant="outlined" 
//             InputLabelProps={{ shrink: true }} 
//             value={formData.dateOfBirth} 
//             onChange={handleChange} 
//             onBlur={handleBlur}
//             onKeyDown={(e) => handleKeyDown(e, "dateOfBirth")}
//             inputRef={(el) => fieldRefs.current["dateOfBirth"] = el}
//             required 
//             error={errors.dateOfBirth && touched.dateOfBirth}
//             helperText={getHelperText("dateOfBirth")}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField 
//             label="Gender" 
//             name="gender" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.gender} 
//             onChange={handleChange} 
//             InputProps={{ readOnly: true }}
//             inputRef={(el) => fieldRefs.current["gender"] = el}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField 
//             select 
//             label="Marital Status" 
//             name="maritalStatus" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.maritalStatus} 
//             onChange={handleChange} 
//             onBlur={handleBlur}
//             onKeyDown={(e) => handleKeyDown(e, "maritalStatus")}
//             inputRef={(el) => fieldRefs.current["maritalStatus"] = el}
//             required
//             error={errors.maritalStatus && touched.maritalStatus}
//             helperText={getHelperText("maritalStatus")}
//           >
//             <MenuItem value="Single">Single</MenuItem>
//             <MenuItem value="Married">Married</MenuItem>
//             <MenuItem value="Divorced">Divorced</MenuItem>
//             <MenuItem value="Separated">Separated</MenuItem>
//             <MenuItem value="Widowed">Widow</MenuItem>
//             <MenuItem value="Widower">Widower</MenuItem>
//           </TextField>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField 
//             select 
//             label="Blood Group" 
//             name="bloodGroup" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.bloodGroup} 
//             onChange={handleChange} 
//             onBlur={handleBlur}
//             onKeyDown={(e) => handleKeyDown(e, "bloodGroup")}
//             inputRef={(el) => fieldRefs.current["bloodGroup"] = el}
//             required
//             error={errors.bloodGroup && touched.bloodGroup}
//             helperText={getHelperText("bloodGroup")}
//           >
//             <MenuItem value="O+">O+</MenuItem>
//             <MenuItem value="O-">O-</MenuItem>
//             <MenuItem value="A+">A+</MenuItem>
//             <MenuItem value="A-">A-</MenuItem>
//             <MenuItem value="B+">B+</MenuItem>
//             <MenuItem value="B-">B-</MenuItem>
//             <MenuItem value="AB+">AB+</MenuItem>
//             <MenuItem value="AB-">AB-</MenuItem>
//           </TextField>
//         </Grid>
//         <Grid item xs={12}>
//           <TextField 
//             label="Driving License" 
//             name="drivingLicense" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.drivingLicense} 
//             onChange={handleChange} 
//             onBlur={handleBlur}
//             onKeyDown={(e) => handleKeyDown(e, "drivingLicense")}
//             inputRef={(el) => fieldRefs.current["drivingLicense"] = el}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField 
//             label="Passport Number" 
//             name="passportNumber" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.passportNumber} 
//             onChange={handleChange} 
//             onBlur={handleBlur}
//             onKeyDown={(e) => handleKeyDown(e, "passportNumber")}
//             inputRef={(el) => fieldRefs.current["passportNumber"] = el}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField 
//             select 
//             label="Religion" 
//             name="religion" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.religion} 
//             onChange={handleChange} 
//             onBlur={handleBlur}
//             onKeyDown={(e) => handleKeyDown(e, "religion")}
//             inputRef={(el) => fieldRefs.current["religion"] = el}
//             required
//             error={errors.religion && touched.religion}
//             helperText={getHelperText("religion")}
//           >
//             <MenuItem value="Buddhism">Buddhism</MenuItem>
//             <MenuItem value="Hindu">Hindu</MenuItem>
//             <MenuItem value="Islam">Islam</MenuItem>
//             <MenuItem value="Christianity">Christianity</MenuItem>
//           </TextField>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField 
//             select 
//             label="Race" 
//             name="race" 
//             fullWidth 
//             variant="outlined" 
//             value={formData.race} 
//             onChange={handleChange} 
//             onBlur={handleBlur}
//             onKeyDown={(e) => handleKeyDown(e, "race")}
//             inputRef={(el) => fieldRefs.current["race"] = el}
//             required
//             error={errors.race && touched.race}
//             helperText={getHelperText("race")}
//           >
//             <MenuItem value="Sinhala">Sinhala</MenuItem>
//             <MenuItem value="Tamil">Tamil</MenuItem>
//             <MenuItem value="Muslim">Muslim</MenuItem>
//             <MenuItem value="Burgher">Burgher</MenuItem>
//             <MenuItem value="Malay">Malay</MenuItem>
//           </TextField>
//         </Grid>
//         <Grid item xs={12}>
//           <TextField 
//             label="Number of Dependents" 
//             name="numberOfDependents" 
//             type="number"
//             fullWidth 
//             variant="outlined" 
//             value={formData.numberOfDependents} 
//             onChange={handleChange} 
//             onBlur={handleBlur}
//             onKeyDown={(e) => handleKeyDown(e, "numberOfDependents")}
//             inputRef={(el) => fieldRefs.current["numberOfDependents"] = el}
//             required
//             error={errors.numberOfDependents && touched.numberOfDependents}
//             helperText={getHelperText("numberOfDependents")}
//           />
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default PersonalDetailsForm;


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
    "bloodGroup",
    "drivingLicense",
    "passportNumber",
    "religion",
    "race",
    "numberOfDependents"
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

  // Function to validate a field
  // const validateField = (name, value) => {
  //   if (!isFieldRequired(name)) return true;
    
  //   let isValid = value && value.toString().trim() !== "";
    
  //   // Update errors state (but don't show them yet)
  //   setErrors(prev => ({
  //     ...prev,
  //     [name]: !isValid
  //   }));
    
  //   return isValid;
  // };


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
    } else {
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
    
    if (/^\d{9}[VX]$/.test(nic)) {
      // Old NIC format: 921532345V
      birthYear = `19${nic.substring(0, 2)}`;
      dayOfYear = parseInt(nic.substring(2, 5), 10);
    } else if (/^\d{12}$/.test(nic)) {
      // New NIC format: 20021230345V
      birthYear = nic.substring(0, 4);
      dayOfYear = parseInt(nic.substring(4, 7), 10);
    } else {
      return { dateOfBirth: "", gender: "" }; // Invalid NIC format
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

    setFormData((prevFormData) => {
      let updatedFormData = { ...prevFormData, [name]: value };

      if (name === "nicNumber") {
        const { dateOfBirth, gender } = extractNICDetails(value);
        updatedFormData = { ...updatedFormData, dateOfBirth, gender };
        
        // Also validate the date of birth field since it was auto-filled
        validateField("dateOfBirth", dateOfBirth);
      }

      if (name === "numberOfDependents") {
        updatedFormData[name] = value ? Number(value) : 0;
      }

      // Validate field without showing error yet
      validateField(name, value);

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
                type="number"
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