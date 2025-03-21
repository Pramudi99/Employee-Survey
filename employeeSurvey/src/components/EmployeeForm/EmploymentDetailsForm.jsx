







// import React, { useState, useEffect, useRef } from "react";
// import {
//   TextField,
//   Grid,
//   Typography,
//   MenuItem,
//   Button,
//   IconButton,
//   FormHelperText,
// } from "@mui/material";
// import { Add, Delete } from "@mui/icons-material";

// const EmploymentDetailsForm = ({ setEmploymentDetails, parentData }) => {
//   const [employmentDetails, setLocalEmploymentDetails] = useState({
//     presentJobCategory: "",
//     presentDesignation: "",
//     presentGrade: "",
//     joinedAs: "",
//     joinedDetails: {},
//     employmentAddresses: [
//       { addressType: "Permanent", location: "", function: "", subFunction: "" },
//       { addressType: "Temporary", location: "", function: "", subFunction: "" },
//     ],
//     promotions: [],
//   });

//   const [showAddPromotion, setShowAddPromotion] = useState(false);
//   // State to track validation errors
//   const [errors, setErrors] = useState({});

//   const handleShowButton = () => {
//     setShowAddPromotion(true); // Show the "Add Promotion" button when clicked
//   };

//   // Reference to track if update is from parent data
//   const isUpdatingFromParent = useRef(false);
//   // Reference to track initial render
//   const isInitialRender = useRef(true);
//   // Reference to store previous value for comparison
//   const prevEmploymentDetails = useRef(employmentDetails);
//   // Create refs for all required fields to enable focus navigation
//   const fieldRefs = useRef({});

//   // Function to register input field refs for navigation
//   const registerFieldRef = (fieldName, element) => {
//     if (element) {
//       fieldRefs.current[fieldName] = element;
//     }
//   };

//   // Handle parent data updates
//   useEffect(() => {
//     if (!parentData) return;
    
//     isUpdatingFromParent.current = true;
    
//     setLocalEmploymentDetails((prevDetails) => {
//       const newDetails = {
//         ...prevDetails,
//         presentJobCategory: parentData?.presentJobCategory || prevDetails.presentJobCategory,
//         presentDesignation: parentData?.presentDesignation || prevDetails.presentDesignation,
//         presentGrade: parentData?.presentGrade || prevDetails.presentGrade,
//         joinedAs: parentData?.joinedDetails?.joinedType || prevDetails.joinedAs,
//         joinedDetails: parentData?.joinedDetails
//           ? {
//               joinedType: parentData.joinedDetails.joinedType || prevDetails.joinedDetails.joinedType,
//               epfNumber: parentData.joinedDetails.epfNumber || prevDetails.joinedDetails.epfNumber,
//               designation: parentData.joinedDetails.designation || prevDetails.joinedDetails.designation,
//               grade: parentData.joinedDetails.grade || prevDetails.joinedDetails.grade,
//               date: parentData.joinedDetails.date || prevDetails.joinedDetails.date,
//             }
//           : prevDetails.joinedDetails,
//         promotions: Array.isArray(parentData?.promotions) ? parentData.promotions : prevDetails.promotions,
//         employmentAddresses: Array.isArray(parentData?.employmentAddresses) ? parentData.employmentAddresses : prevDetails.employmentAddresses,
//       };
  
//       // Prevent unnecessary updates
//       if (JSON.stringify(prevDetails) === JSON.stringify(newDetails)) {
//         return prevDetails;
//       }
      
//       return newDetails;
//     });
//   }, [parentData]);
  
//   // Update parent component with changes
//   useEffect(() => {
//     // Skip initial render
//     if (isInitialRender.current) {
//       isInitialRender.current = false;
//       return;
//     }
    
//     // Skip if update is from parent
//     if (isUpdatingFromParent.current) {
//       isUpdatingFromParent.current = false;
//       return;
//     }
    
//     // Check if the data has actually changed
//     if (JSON.stringify(prevEmploymentDetails.current) !== JSON.stringify(employmentDetails)) {
//       setEmploymentDetails(employmentDetails);
//       prevEmploymentDetails.current = employmentDetails;
//     }
//   }, [employmentDetails, setEmploymentDetails]);

//   // Function to validate a field
//   const validateField = (name, value) => {
//     if (name === "presentJobCategory" || name === "presentDesignation" || 
//         name === "presentGrade" || name === "joinedAs") {
//       return value ? "" : "This field is required";
//     }
    
//     // For joined details validation
//     if (name.startsWith('joinedDetails.')) {
//       const field = name.split('.')[1];
//       return value ? "" : `${field} is required`;
//     }
    
//     return "";
//   };

//   // Function to handle key down event
//   const handleKeyDown = (e, fieldName, nextFieldName) => {
//     // If Enter key is pressed
//     if (e.key === "Enter") {
//       e.preventDefault();
      
//       // Get the current field value
//       const value = e.target.value;
//       const error = validateField(fieldName, value);
      
//       // Update errors state
//       setErrors(prev => ({
//         ...prev,
//         [fieldName]: error
//       }));
      
//       // If field is valid and nextFieldName exists, focus on next field
//       if (!error && nextFieldName && fieldRefs.current[nextFieldName]) {
//         fieldRefs.current[nextFieldName].focus();
//       }
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     // Clear error when user types
//     setErrors(prev => ({
//       ...prev,
//       [name]: ""
//     }));
    
//     setLocalEmploymentDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//       ...(name === "joinedAs" && {
//         joinedDetails: value === "Permanent"
//           ? { joinedType: "Permanent", epfNumber: "", designation: "", grade: "", date: "" }
//           : { joinedType: "Contract", epfNumber: "", designation: "", grade: "", date: "" },
//       }),
//     }));
//   };

//   const handleJoinedDetailsChange = (field, value) => {
//     // Clear error when user types
//     setErrors(prev => ({
//       ...prev,
//       [`joinedDetails.${field}`]: ""
//     }));
    
//     setLocalEmploymentDetails((prevDetails) => ({
//       ...prevDetails,
//       joinedDetails: { ...prevDetails.joinedDetails, [field]: value },
//     }));
//   };

//   // const handleEmploymentAddressChange = (index, field, value) => {
//   //   setLocalEmploymentDetails((prevDetails) => {
//   //     const updatedAddresses = prevDetails.employmentAddresses.map((address, i) =>
//   //       i === index ? { ...address, [field]: value } : address
//   //     );
//   //     return { ...prevDetails, employmentAddresses: updatedAddresses };
//   //   });
//   // };
  
//   // const handlePromotionChange = (index, field, value) => {
//   //   setLocalEmploymentDetails((prevDetails) => {
//   //     const updatedPromotions = [...prevDetails.promotions];
//   //     updatedPromotions[index][field] = value;
//   //     return {
//   //       ...prevDetails,
//   //       promotions: updatedPromotions,
//   //     };
//   //   });
//   // };

//   // Add this function to handle the dynamic sub-function options
//       const getSubFunctionOptions = (functionValue) => {
//         switch(functionValue) {
//           case "Head Office":
//             return ["IT", "HR"];
//           case "Refinery":
//             return ["Transport", "WorkStation"];
//           default:
//             return [];
//         }
//       };

//       // Modify the employmentAddressChange handler to reset subFunction when function changes
//       const handleEmploymentAddressChange = (index, field, value) => {
//         setLocalEmploymentDetails((prevDetails) => {
//           const updatedAddresses = prevDetails.employmentAddresses.map((address, i) => {
//             if (i === index) {
//               // If changing the function field, reset the subFunction
//               if (field === "function") {
//                 return { ...address, [field]: value, subFunction: "" };
//               }
//               return { ...address, [field]: value };
//             }
//             return address;
//           });
//           return { ...prevDetails, employmentAddresses: updatedAddresses };
//         });
//       };

//       // Similar modification for promotion function change
//       const handlePromotionChange = (index, field, value) => {
//         setLocalEmploymentDetails((prevDetails) => {
//           const updatedPromotions = [...prevDetails.promotions];
          
//           // If changing the function field, reset the subFunction
//           if (field === "function") {
//             updatedPromotions[index] = { 
//               ...updatedPromotions[index], 
//               [field]: value,
//               subFunction: "" 
//             };
//           } else {
//             updatedPromotions[index][field] = value;
//           }
          
//           return {
//             ...prevDetails,
//             promotions: updatedPromotions,
//           };
//         });
//       };

//   const addPromotion = () => {
//     setShowAddPromotion(true);
//     const newPromotion = { grade: "", designation: "", durationFrom: "", durationTo: "", location: "", function: "", subFunction: "" };
//     setLocalEmploymentDetails((prevDetails) => ({
//       ...prevDetails,
//       promotions: [...prevDetails.promotions, newPromotion],
//     }));
//   };

//   const removePromotion = (index) => {
//     setLocalEmploymentDetails((prevDetails) => ({
//         promotions: prevDetails.promotions.filter((_, i) => i !== index)
//     }));
//   };
 
//   return (
//     <Grid container spacing={2} sx={{ mt: 3}}>
//        <Typography sx={{ ml: 3, mt: 2 }} variant="h4" gutterBottom style={{ fontStyle: "italic", color:"rgb(129, 43, 57)", fontFamily: 'Roboto, sans-serif', }}>
//         Employment Details 
//         </Typography>
//         <Grid item xs={11.8} container spacing={1} sx={{ ml: 1 }}>
//         <Grid container spacing={2}>
//   <Grid item xs={12}>
//     <Typography 
//       sx={{ ml: 1.5, mt: 3 }} 
//       variant="h5" 
//       gutterBottom 
//       style={{ fontStyle: "italic", color: "rgb(58, 53, 54)", fontFamily: 'Roboto, sans-serif', textAlign: "left" }}
//     >
//       Details of Employment location
//     </Typography>
//   </Grid>

//   {employmentDetails?.employmentAddresses?.map((address, index) => (
//     <Grid item xs={12} sx={{ ml: 2}} sm={5.7} key={index}> {/* Each address takes half width */}
//       <Grid
//         container
//         spacing={1}
//         sx={{ mb: 2,  }} 
//       >
//         <Grid item xs={12}>
//           <Typography variant="subtitle1" style={{ fontStyle: "italic" }} >
//             {address.addressType} Location
//           </Typography>
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             label="Location"
//             value={address.location}
//             onChange={(e) => handleEmploymentAddressChange(index, "location", e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 e.preventDefault();
//                 const functionField = document.querySelector(`input[name="address-${index}-function"]`);
//                 if (functionField) functionField.focus();
//               }
//             }}
//             inputRef={(el) => registerFieldRef(`address-${index}-location`, el)}
//             name={`address-${index}-location`}
//             />
//         </Grid>
//         {/* <Grid item xs={12}>
//           <TextField
//             fullWidth
//             label="Function"
//             value={address.function}
//             onChange={(e) => handleEmploymentAddressChange(index, "function", e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 e.preventDefault();
//                 const subFunctionField = document.querySelector(`input[name="address-${index}-subFunction"]`);
//                 if (subFunctionField) subFunctionField.focus();
//               }
//             }}
//             inputRef={(el) => registerFieldRef(`address-${index}-function`, el)}
//             name={`address-${index}-function`}
//           />
//         </Grid> */}

//         {/* Update Function field in employment addresses */}
//         <Grid item xs={12}>
//           <TextField
//             select
//             fullWidth
//             label="Function"
//             value={address.function}
//             onChange={(e) => handleEmploymentAddressChange(index, "function", e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 e.preventDefault();
//                 const subFunctionField = document.querySelector(`input[name="address-${index}-subFunction"]`);
//                 if (subFunctionField) subFunctionField.focus();
//               }
//             }}
//             inputRef={(el) => registerFieldRef(`address-${index}-function`, el)}
//             name={`address-${index}-function`}
//           >
//             <MenuItem value="Head Office">Head Office</MenuItem>
//             <MenuItem value="Refinery">Refinery</MenuItem>
//           </TextField>
//         </Grid>

//         {/* Replace the Sub Function TextField in the employment addresses section */}
// <Grid item xs={12}>
//   <TextField
//     select
//     fullWidth
//     label="Sub Function"
//     value={address.subFunction}
//     onChange={(e) => handleEmploymentAddressChange(index, "subFunction", e.target.value)}
//     onKeyDown={(e) => {
//       if (e.key === "Enter") {
//         e.preventDefault();
//         // Focus on the next logical field
//         const nextIndex = index + 1;
//         if (nextIndex < employmentDetails.employmentAddresses.length) {
//           const nextField = document.querySelector(`input[name="address-${nextIndex}-location"]`);
//           if (nextField) nextField.focus();
//         } else {
//           // If this is the last address, move to presentJobCategory
//           if (fieldRefs.current.presentJobCategory) {
//             fieldRefs.current.presentJobCategory.focus();
//           }
//         }
//       }
//     }}
//     inputRef={(el) => registerFieldRef(`address-${index}-subFunction`, el)}
//     name={`address-${index}-subFunction`}
//     disabled={!address.function} // Disable if no function is selected
//   >
//     {getSubFunctionOptions(address.function).map((option) => (
//       <MenuItem key={option} value={option}>
//         {option}
//       </MenuItem>
//     ))}
//   </TextField>
// </Grid>

//         {/* <Grid item xs={12}>
//           <TextField
//             fullWidth
//             label="Sub Function"
//             value={address.subFunction}
//             onChange={(e) => handleEmploymentAddressChange(index, "subFunction", e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 e.preventDefault();
//                 // Focus on the next logical field
//                 const nextIndex = index + 1;
//                 if (nextIndex < employmentDetails.employmentAddresses.length) {
//                   const nextField = document.querySelector(`input[name="address-${nextIndex}-location"]`);
//                   if (nextField) nextField.focus();
//                 } else {
//                   // If this is the last address, move to presentJobCategory
//                   if (fieldRefs.current.presentJobCategory) {
//                     fieldRefs.current.presentJobCategory.focus();
//                   }
//                 }
//               }
//             }}
//             inputRef={(el) => registerFieldRef(`address-${index}-subFunction`, el)}
//             name={`address-${index}-subFunction`}
//           />
//         </Grid> */}
//       </Grid>
//     </Grid>
//   ))}
// </Grid>


//       <Grid item xs={11.7} container spacing={1} sx={{ ml: 0 }}>
//         <Grid item xs={12} sm={3}>
//           <TextField
//             select
//             label="Present Job Category"
//             name="presentJobCategory"
//             fullWidth
//             variant="outlined"
//             value={employmentDetails.presentJobCategory}
//             onChange={handleChange}
//             required
//             error={!!errors.presentJobCategory}
//             helperText={errors.presentJobCategory}
//             onKeyDown={(e) => handleKeyDown(e, "presentJobCategory", "presentDesignation")}
//             inputRef={(el) => registerFieldRef("presentJobCategory", el)}
//           >
//             <MenuItem value="Executive">Executive</MenuItem>
//             <MenuItem value="Non Executive">Non Executive</MenuItem>
//           </TextField>
//         </Grid>
//         <Grid item xs={12} sm={3}>
//           <TextField
//             fullWidth
//             label="Present Designation"
//             name="presentDesignation"
//             value={employmentDetails.presentDesignation}
//             onChange={handleChange}
//             required
//             error={!!errors.presentDesignation}
//             helperText={errors.presentDesignation}
//             onKeyDown={(e) => handleKeyDown(e, "presentDesignation", "presentGrade")}
//             inputRef={(el) => registerFieldRef("presentDesignation", el)}
//           />
           
//         </Grid>
//         <Grid item xs={12} sm={3}>
//           <TextField
//             fullWidth
//             select label="Present Grade"
//             name="presentGrade"
//             value={employmentDetails.presentGrade}
//             onChange={handleChange}
//             required
//             error={!!errors.presentGrade}
//             helperText={errors.presentGrade}
//             onKeyDown={(e) => handleKeyDown(e, "presentGrade", "joinedAs")}
//             inputRef={(el) => registerFieldRef("presentGrade", el)}
//           >
//              <MenuItem value="A1">A1</MenuItem> <MenuItem value="A2"></MenuItem>A2<MenuItem value="A3">A3</MenuItem>
//             <MenuItem value="A4">A4</MenuItem> <MenuItem value="A5"></MenuItem>A5<MenuItem value="A6">A6</MenuItem>
//             <MenuItem value="A7">A7</MenuItem>
//             <MenuItem value="B1">B1</MenuItem><MenuItem value="B2">B2</MenuItem><MenuItem value="B3">B3</MenuItem>
//             <MenuItem value="C1">C1</MenuItem>
//             <MenuItem value="C2">C2</MenuItem>
//             <MenuItem value="C3">C3</MenuItem>
//             <MenuItem value="C4">C4</MenuItem>
//             </TextField>
//         </Grid>
//         <Grid item xs={12} sm={3}>
//           <TextField
//             select
//             label="Joined As"
//             name="joinedAs"
//             value={employmentDetails.joinedAs}
//             onChange={handleChange}
//             fullWidth
//             required
//             error={!!errors.joinedAs}
//             helperText={errors.joinedAs}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 e.preventDefault();
//                 // Focus on the first field of the joinedDetails section based on selection
//                 if (employmentDetails.joinedAs) {
//                   if (fieldRefs.current["joinedDetails.epfNumber"]) {
//                     fieldRefs.current["joinedDetails.epfNumber"].focus();
//                   }
//                 }
//               }
//             }}
//             inputRef={(el) => registerFieldRef("joinedAs", el)}
//           >
//             <MenuItem value="Permanent">Permanent</MenuItem>
//             <MenuItem value="Contract">Contract</MenuItem>
//           </TextField>
//         </Grid>
//       </Grid>

//       {employmentDetails.joinedAs === "Permanent" && (
//         <Grid container spacing={2} sx={{ mt: 3, ml: 2 }}>
//           <Grid item xs={12} sm={5.5}>
//             <TextField
//               fullWidth
//               label="EPF Number"
//               value={employmentDetails.joinedDetails.epfNumber || ""}
//               onChange={(e) => handleJoinedDetailsChange("epfNumber", e.target.value)}
//               required
//               error={!!errors["joinedDetails.epfNumber"]}
//               helperText={errors["joinedDetails.epfNumber"]}
//               onKeyDown={(e) => handleKeyDown(e, "joinedDetails.epfNumber", "joinedDetails.designation")}
//               inputRef={(el) => registerFieldRef("joinedDetails.epfNumber", el)}
//             />
//           </Grid>
//           <Grid item xs={12} sm={5.5}>
//             <TextField
//               fullWidth
//               label="Designation"
//               value={employmentDetails.joinedDetails.designation || ""}
//               onChange={(e) => handleJoinedDetailsChange("designation", e.target.value)}
//               required
//               error={!!errors["joinedDetails.designation"]}
//               helperText={errors["joinedDetails.designation"]}
//               onKeyDown={(e) => handleKeyDown(e, "joinedDetails.designation", "joinedDetails.grade")}
//               inputRef={(el) => registerFieldRef("joinedDetails.designation", el)}
//             />
//           </Grid>
//           <Grid item xs={12} sm={5.5}>
//             <TextField
//               fullWidth
//               select label="Grade"
//               value={employmentDetails.joinedDetails.grade || ""}
//               onChange={(e) => handleJoinedDetailsChange("grade", e.target.value)}
//               required
//               error={!!errors["joinedDetails.grade"]}
//               helperText={errors["joinedDetails.grade"]}
//               onKeyDown={(e) => handleKeyDown(e, "joinedDetails.grade", "joinedDetails.date")}
//               inputRef={(el) => registerFieldRef("joinedDetails.grade", el)}
//               >
//               <MenuItem value="A1">A1</MenuItem> <MenuItem value="A2"></MenuItem>A2<MenuItem value="A3">A3</MenuItem>
//              <MenuItem value="A4">A4</MenuItem> <MenuItem value="A5"></MenuItem>A5<MenuItem value="A6">A6</MenuItem>
//              <MenuItem value="A7">A7</MenuItem>
//              <MenuItem value="B1">B1</MenuItem><MenuItem value="B2">B2</MenuItem><MenuItem value="B3">B3</MenuItem>
//              <MenuItem value="C1">C1</MenuItem>
//              <MenuItem value="C2">C2</MenuItem>
//              <MenuItem value="C3">C3</MenuItem>
//              <MenuItem value="C4">C4</MenuItem>
//              </TextField>
//           </Grid>
//           <Grid item xs={12} sm={5.5}>
//             <TextField
//               fullWidth
//               label="Date of Joining"
//               type="date"
//               InputLabelProps={{ shrink: true }}
//               value={employmentDetails.joinedDetails.date || ""}
//               onChange={(e) => handleJoinedDetailsChange("date", e.target.value)}
//               required
//               error={!!errors["joinedDetails.date"]}
//               helperText={errors["joinedDetails.date"]}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   e.preventDefault();
//                   if (!e.target.value) {
//                     setErrors(prev => ({
//                       ...prev,
//                       "joinedDetails.date": "Date is required"
//                     }));
//                   }
//                 }
//               }}
//               inputRef={(el) => registerFieldRef("joinedDetails.date", el)}
//             />
//           </Grid>
//         </Grid>
//       )}

//       {employmentDetails.joinedAs === "Contract" && (
//         <Grid container spacing={2} sx={{ mt: 3 , ml : 2}}>
//           <Grid item xs={12} sm={5.5}>
//             <TextField
//               fullWidth
//               label="Contract No"
//               value={employmentDetails.joinedDetails.epfNumber || ""}
//               onChange={(e) => handleJoinedDetailsChange("epfNumber", e.target.value)}
//               required
//               error={!!errors["joinedDetails.epfNumber"]}
//               helperText={errors["joinedDetails.epfNumber"]}
//               onKeyDown={(e) => handleKeyDown(e, "joinedDetails.epfNumber", "joinedDetails.designation")}
//               inputRef={(el) => registerFieldRef("joinedDetails.epfNumber", el)}
//             />
//           </Grid>
//           <Grid item xs={12} sm={5.5}>
//             <TextField
//               fullWidth
//               label="Designation"
//               value={employmentDetails.joinedDetails.designation || ""}
//               onChange={(e) => handleJoinedDetailsChange("designation", e.target.value)}
//               required
//               error={!!errors["joinedDetails.designation"]}
//               helperText={errors["joinedDetails.designation"]}
//               onKeyDown={(e) => handleKeyDown(e, "joinedDetails.designation", "joinedDetails.grade")}
//               inputRef={(el) => registerFieldRef("joinedDetails.designation", el)}
//             />
//           </Grid>
//           <Grid item xs={12} sm={5.5}>
//             <TextField
//               fullWidth
//               select label="Grade"
//               value={employmentDetails.joinedDetails.grade || ""}
//               onChange={(e) => handleJoinedDetailsChange("grade", e.target.value)}
//               required
//               error={!!errors["joinedDetails.grade"]}
//               helperText={errors["joinedDetails.grade"]}
//               onKeyDown={(e) => handleKeyDown(e, "joinedDetails.grade", "joinedDetails.date")}
//               inputRef={(el) => registerFieldRef("joinedDetails.grade", el)}
//               >
//               <MenuItem value="A1">A1</MenuItem>
//               <MenuItem value="A2">A1</MenuItem>
//               <MenuItem value="A3">A3</MenuItem>
//              <MenuItem value="A4">A4</MenuItem>
//              <MenuItem value="A5">A5</MenuItem>
//              <MenuItem value="A6">A6</MenuItem>
//              <MenuItem value="A7">A7</MenuItem>

//              <MenuItem value="B1">B1</MenuItem>
//              <MenuItem value="B2">B2</MenuItem>
//              <MenuItem value="B3">B3</MenuItem>
             
//              <MenuItem value="C1">C1</MenuItem>
//              <MenuItem value="C2">C2</MenuItem>
//              <MenuItem value="C3">C3</MenuItem>
//              <MenuItem value="C4">C4</MenuItem>
//              </TextField>
//           </Grid>
//           <Grid item xs={12} sm={5.5}>
//             <TextField
//               fullWidth
//               label="Date of Joining"
//               type="date"
//               InputLabelProps={{ shrink: true }}
//               value={employmentDetails.joinedDetails.date || ""}
//               onChange={(e) => handleJoinedDetailsChange("date", e.target.value)}
//               required
//               error={!!errors["joinedDetails.date"]}
//               helperText={errors["joinedDetails.date"]}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   e.preventDefault();
//                   if (!e.target.value) {
//                     setErrors(prev => ({
//                       ...prev,
//                       "joinedDetails.date": "Date is required"
//                     }));
//                   }
//                 }
//               }}
//               inputRef={(el) => registerFieldRef("joinedDetails.date", el)}
//             />
//           </Grid>
//         </Grid>
//       )}
 

//      <Grid>
//         <Grid container alignItems="center" sx={{ ml: 0, mt: 4 }}>
//           <Typography 
//             variant="h6" 
//             gutterBottom 
//             style={{ fontStyle: "italic", color: "gold", fontFamily: 'Roboto, sans-serif', textAlign: "left" }}
//           >
//             If you have a promotion{" "}
//             <Button 
//               onClick={addPromotion} 
//               variant="text" 
//               color="secondary"
//               sx={{ fontSize: "1rem", textTransform: "none" }} 
//             >
//               Click Here
//             </Button> 
//           </Typography>
//         </Grid>
        
//       {employmentDetails?.promotions?.map((promotion, index) => (
//         <Grid
//           container
//           spacing={2}
//           key={index}
//           sx={{ mt: -3, p: 2, }}
//         >
//           <Grid item xs={12} sm={2}>
//             <TextField
//               fullWidth
//               label="Grade"
//               value={promotion.grade}
//               onChange={(e) => handlePromotionChange(index, "grade", e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   e.preventDefault();
//                   const designationField = document.querySelector(`input[name="promotion-${index}-designation"]`);
//                   if (designationField) designationField.focus();
//                 }
//               }}
//               inputRef={(el) => registerFieldRef(`promotion-${index}-grade`, el)}
//               name={`promotion-${index}-grade`}
//             />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <TextField
//               fullWidth
//               label="Designation"
//               value={promotion.designation}
//               onChange={(e) => handlePromotionChange(index, "designation", e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   e.preventDefault();
//                   const fromField = document.querySelector(`input[name="promotion-${index}-durationFrom"]`);
//                   if (fromField) fromField.focus();
//                 }
//               }}
//               inputRef={(el) => registerFieldRef(`promotion-${index}-designation`, el)}
//               name={`promotion-${index}-designation`}
//             />
//           </Grid>
//           <Grid item xs={12} sm={3}>
//             <TextField
//               fullWidth
//               label="Start From"
//               type="date"
//               InputLabelProps={{ shrink: true }}
//               value={promotion.durationFrom}
//               onChange={(e) => handlePromotionChange(index, "durationFrom", e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   e.preventDefault();
//                   const toField = document.querySelector(`input[name="promotion-${index}-durationTo"]`);
//                   if (toField) toField.focus();
//                 }
//               }}
//               inputRef={(el) => registerFieldRef(`promotion-${index}-durationFrom`, el)}
//               name={`promotion-${index}-durationFrom`}
//             />
//           </Grid>
//           <Grid item xs={12} sm={3}>
//             <TextField
//               fullWidth
//               label="To"
//               type="date"
//               InputLabelProps={{ shrink: true }}
//               value={promotion.durationTo}
//               onChange={(e) => handlePromotionChange(index, "durationTo", e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   e.preventDefault();
//                   const locationField = document.querySelector(`input[name="promotion-${index}-location"]`);
//                   if (locationField) locationField.focus();
//                 }
//               }}
//               inputRef={(el) => registerFieldRef(`promotion-${index}-durationTo`, el)}
//               name={`promotion-${index}-durationTo`}
//             />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <TextField
//               fullWidth
//               label="Location"
//               value={promotion.location}
//               onChange={(e) => handlePromotionChange(index, "location", e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   e.preventDefault();
//                   const functionField = document.querySelector(`input[name="promotion-${index}-function"]`);
//                   if (functionField) functionField.focus();
//                 }
//               }}
//               inputRef={(el) => registerFieldRef(`promotion-${index}-location`, el)}
//               name={`promotion-${index}-location`}
//             />
//           </Grid>
//           {/* <Grid item xs={12} sm={4}>
//             <TextField
//               fullWidth
//               label="Function"
//               value={promotion.function}
//               onChange={(e) => handlePromotionChange(index, "function", e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   e.preventDefault();
//                   const subFunctionField = document.querySelector(`input[name="promotion-${index}-subFunction"]`);
//                   if (subFunctionField) subFunctionField.focus();
//                 }
//               }}
//               inputRef={(el) => registerFieldRef(`promotion-${index}-function`, el)}
//               name={`promotion-${index}-function`}
//             />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <TextField
//               fullWidth
//               label="Sub Function"
//               value={promotion.subFunction}
//               onChange={(e) => handlePromotionChange(index, "subFunction", e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   e.preventDefault();
//                   // Focus on the first field of the next promotion if available
//                   const nextIndex = index + 1;
//                   if (nextIndex < employmentDetails.promotions.length) {
//                     const nextField = document.querySelector(`input[name="promotion-${nextIndex}-grade"]`);
//                     if (nextField) nextField.focus();
//                   }
//                 }
//               }}
//               inputRef={(el) => registerFieldRef(`promotion-${index}-subFunction`, el)}
//               name={`promotion-${index}-subFunction`}
//             />
//           </Grid> */}


//         {/* Update Function field in promotions */}
// <Grid item xs={12} sm={4}>
//   <TextField
//     select
//     fullWidth
//     label="Function"
//     value={promotion.function}
//     onChange={(e) => handlePromotionChange(index, "function", e.target.value)}
//     onKeyDown={(e) => {
//       if (e.key === "Enter") {
//         e.preventDefault();
//         const subFunctionField = document.querySelector(`input[name="promotion-${index}-subFunction"]`);
//         if (subFunctionField) subFunctionField.focus();
//       }
//     }}
//     inputRef={(el) => registerFieldRef(`promotion-${index}-function`, el)}
//     name={`promotion-${index}-function`}
//   >
//     <MenuItem value="Head Office">Head Office</MenuItem>
//     <MenuItem value="Refinery">Refinery</MenuItem>
//   </TextField>
// </Grid>


//         {/* Replace the Sub Function TextField in the promotions section */}
// <Grid item xs={12} sm={4}>
//   <TextField
//     select
//     fullWidth
//     label="Sub Function"
//     value={promotion.subFunction}
//     onChange={(e) => handlePromotionChange(index, "subFunction", e.target.value)}
//     onKeyDown={(e) => {
//       if (e.key === "Enter") {
//         e.preventDefault();
//         // Focus on the first field of the next promotion if available
//         const nextIndex = index + 1;
//         if (nextIndex < employmentDetails.promotions.length) {
//           const nextField = document.querySelector(`input[name="promotion-${nextIndex}-grade"]`);
//           if (nextField) nextField.focus();
//         }
//       }
//     }}
//     inputRef={(el) => registerFieldRef(`promotion-${index}-subFunction`, el)}
//     name={`promotion-${index}-subFunction`}
//     disabled={!promotion.function} // Disable if no function is selected
//   >
//     {getSubFunctionOptions(promotion.function).map((option) => (
//       <MenuItem key={option} value={option}>
//         {option}
//       </MenuItem>
//     ))}
//   </TextField>
// </Grid>





//           <Grid item xs={12}>
//               <IconButton onClick={() => removePromotion(index)} color="error">
//                 <Delete />
//               </IconButton>
//           </Grid>
//         </Grid>
//       ))}

//       <Grid item xs={12}>
//         {showAddPromotion && (
//             <Button variant="text" startIcon={<Add />} onClick={addPromotion} sx={{ mt: 2 }}>
//                 Add Promotion
//             </Button>
//         )}
//       </Grid>
//       </Grid>
//     </Grid>
//     </Grid>
//   );
// };

// export default EmploymentDetailsForm;




















import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Grid,
  Typography,
  MenuItem,
  Button,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const EmploymentDetailsForm = ({ setEmploymentDetails, parentData }) => {
  const [employmentDetails, setLocalEmploymentDetails] = useState({
    presentJobCategory: "",
    presentDesignation: "",
    presentGrade: "",
    joinedAs: "",
    joinedDetails: {},
    employmentAddresses: [
      { addressType: "Permanent", location: "", function: "", subFunction: "" },
      { addressType: "Temporary", location: "", function: "", subFunction: "" },
    ],
    promotions: [],
  });

  const [showAddPromotion, setShowAddPromotion] = useState(false);
  // State to track validation errors
  const [errors, setErrors] = useState({});

  const handleShowButton = () => {
    setShowAddPromotion(true); // Show the "Add Promotion" button when clicked
  };

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


// In EmploymentDetailsForm.jsx - modify the useEffect that handles parent data updates:

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
        presentJobCategory: "",
        presentDesignation: "",
        presentGrade: "",
        joinedAs: "",
        joinedDetails: {},
        employmentAddresses: [
          { addressType: "Permanent", location: "", function: "", subFunction: "" },
          { addressType: "Temporary", location: "", function: "", subFunction: "" },
        ],
        promotions: [],
      };
    }
    
    // Otherwise, handle regular updates
    const newDetails = {
      ...prevDetails,
      presentJobCategory: parentData?.presentJobCategory || prevDetails.presentJobCategory,
      presentDesignation: parentData?.presentDesignation || prevDetails.presentDesignation,
      presentGrade: parentData?.presentGrade || prevDetails.presentGrade,
      joinedAs: parentData?.joinedDetails?.joinedType || prevDetails.joinedAs,
      joinedDetails: parentData?.joinedDetails
        ? {
            joinedType: parentData.joinedDetails.joinedType || prevDetails.joinedDetails.joinedType,
            epfNumber: parentData.joinedDetails.epfNumber || prevDetails.joinedDetails.epfNumber,
            designation: parentData.joinedDetails.designation || prevDetails.joinedDetails.designation,
            grade: parentData.joinedDetails.grade || prevDetails.joinedDetails.grade,
            date: parentData.joinedDetails.date || prevDetails.joinedDetails.date,
          }
        : prevDetails.joinedDetails,
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



  // // Handle parent data updates
  // useEffect(() => {
  //   if (!parentData) return;
    
  //   isUpdatingFromParent.current = true;
    
  //   setLocalEmploymentDetails((prevDetails) => {
  //     const newDetails = {
  //       ...prevDetails,
  //       presentJobCategory: parentData?.presentJobCategory || prevDetails.presentJobCategory,
  //       presentDesignation: parentData?.presentDesignation || prevDetails.presentDesignation,
  //       presentGrade: parentData?.presentGrade || prevDetails.presentGrade,
  //       joinedAs: parentData?.joinedDetails?.joinedType || prevDetails.joinedAs,
  //       joinedDetails: parentData?.joinedDetails
  //         ? {
  //             joinedType: parentData.joinedDetails.joinedType || prevDetails.joinedDetails.joinedType,
  //             epfNumber: parentData.joinedDetails.epfNumber || prevDetails.joinedDetails.epfNumber,
  //             designation: parentData.joinedDetails.designation || prevDetails.joinedDetails.designation,
  //             grade: parentData.joinedDetails.grade || prevDetails.joinedDetails.grade,
  //             date: parentData.joinedDetails.date || prevDetails.joinedDetails.date,
  //           }
  //         : prevDetails.joinedDetails,
  //       promotions: Array.isArray(parentData?.promotions) ? parentData.promotions : prevDetails.promotions,
  //       employmentAddresses: Array.isArray(parentData?.employmentAddresses) ? parentData.employmentAddresses : prevDetails.employmentAddresses,
  //     };
  
  //     // Prevent unnecessary updates
  //     if (JSON.stringify(prevDetails) === JSON.stringify(newDetails)) {
  //       return prevDetails;
  //     }
      
  //     return newDetails;
  //   });
  // }, [parentData]);
  
 // Update the useEffect that updates the parent component
useEffect(() => {
  // Skip initial render
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
    
    // Clear error when user types
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
    
    setLocalEmploymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
      ...(name === "joinedAs" && {
        joinedDetails: value === "Permanent"
          ? { joinedType: "Permanent", epfNumber: "", designation: "", grade: "", date: "" }
          : { joinedType: "Contract", epfNumber: "", designation: "", grade: "", date: "" },
      }),
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

  // const handleEmploymentAddressChange = (index, field, value) => {
  //   setLocalEmploymentDetails((prevDetails) => {
  //     const updatedAddresses = prevDetails.employmentAddresses.map((address, i) =>
  //       i === index ? { ...address, [field]: value } : address
  //     );
  //     return { ...prevDetails, employmentAddresses: updatedAddresses };
  //   });
  // };
  
  // const handlePromotionChange = (index, field, value) => {
  //   setLocalEmploymentDetails((prevDetails) => {
  //     const updatedPromotions = [...prevDetails.promotions];
  //     updatedPromotions[index][field] = value;
  //     return {
  //       ...prevDetails,
  //       promotions: updatedPromotions,
  //     };
  //   });
  // };

  // Add this function to handle the dynamic sub-function options
      const getSubFunctionOptions = (functionValue) => {
        switch(functionValue) {
          case "Head Office":
            return ["IT", "HR"];
          case "Refinery":
            return ["Transport", "WorkStation"];
          default:
            return [];
        }
      };

      // Modify the employmentAddressChange handler to reset subFunction when function changes
      const handleEmploymentAddressChange = (index, field, value) => {
        setLocalEmploymentDetails((prevDetails) => {
          const updatedAddresses = prevDetails.employmentAddresses.map((address, i) => {
            if (i === index) {
              // If changing the function field, reset the subFunction
              if (field === "function") {
                return { ...address, [field]: value, subFunction: "" };
              }
              return { ...address, [field]: value };
            }
            return address;
          });
          return { ...prevDetails, employmentAddresses: updatedAddresses };
        });
      };

  // Modify the handlePromotionChange function to show errors immediately when fields are touched
const handlePromotionChange = (index, field, value) => {
  setLocalEmploymentDetails((prevDetails) => {
    const updatedPromotions = [...prevDetails.promotions];
    
    // If changing the function field, reset the subFunction
    if (field === "function") {
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
  setShowAddPromotion(true);
  const newPromotion = { grade: "", designation: "", durationFrom: "", durationTo: "", location: "", function: "", subFunction: "" };
  
  setLocalEmploymentDetails((prevDetails) => ({
    ...prevDetails,
    promotions: [...prevDetails.promotions, newPromotion],
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
    <Grid container spacing={2} sx={{ mt: 3}}>
       <Typography sx={{ ml: 3, mt: 2 }} variant="h4" gutterBottom style={{ fontStyle: "italic", color:"rgb(129, 43, 57)", fontFamily: 'Roboto, sans-serif', }}>
        Employment Details 
        </Typography>
        <Grid item xs={11.8} container spacing={1} sx={{ ml: 1 }}>
        <Grid container spacing={2}>
  <Grid item xs={12}>
    <Typography 
      sx={{ ml: 1.5, mt: 3 }} 
      variant="h5" 
      gutterBottom 
      style={{ fontStyle: "italic", color: "rgb(58, 53, 54)", fontFamily: 'Roboto, sans-serif', textAlign: "left" }}
    >
      Details of Employment location
    </Typography>
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
          <TextField
            fullWidth
            label="Location"
            value={address.location}
            onChange={(e) => handleEmploymentAddressChange(index, "location", e.target.value)}
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
        </Grid>
        {/* <Grid item xs={12}>
          <TextField
            fullWidth
            label="Function"
            value={address.function}
            onChange={(e) => handleEmploymentAddressChange(index, "function", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const subFunctionField = document.querySelector(`input[name="address-${index}-subFunction"]`);
                if (subFunctionField) subFunctionField.focus();
              }
            }}
            inputRef={(el) => registerFieldRef(`address-${index}-function`, el)}
            name={`address-${index}-function`}
          />
        </Grid> */}

        {/* Update Function field in employment addresses */}
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Function"
            value={address.function}
            onChange={(e) => handleEmploymentAddressChange(index, "function", e.target.value)}
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
            <MenuItem value="Head Office">Head Office</MenuItem>
            <MenuItem value="Refinery">Refinery</MenuItem>
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
    disabled={!address.function} // Disable if no function is selected
  >
    {getSubFunctionOptions(address.function).map((option) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ))}
  </TextField>
</Grid>

        {/* <Grid item xs={12}>
          <TextField
            fullWidth
            label="Sub Function"
            value={address.subFunction}
            onChange={(e) => handleEmploymentAddressChange(index, "subFunction", e.target.value)}
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
          />
        </Grid> */}
      </Grid>
    </Grid>
  ))}
</Grid>


      <Grid item xs={11.7} container spacing={1} sx={{ ml: 0 }}>
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
          <TextField
            fullWidth
            label="Present Designation"
            name="presentDesignation"
            value={employmentDetails.presentDesignation}
            onChange={handleChange}
            required
            error={!!errors.presentDesignation}
            helperText={errors.presentDesignation}
            onKeyDown={(e) => handleKeyDown(e, "presentDesignation", "presentGrade")}
            inputRef={(el) => registerFieldRef("presentDesignation", el)}
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
             <MenuItem value="A1">A1</MenuItem> <MenuItem value="A2"></MenuItem>A2<MenuItem value="A3">A3</MenuItem>
            <MenuItem value="A4">A4</MenuItem> <MenuItem value="A5"></MenuItem>A5<MenuItem value="A6">A6</MenuItem>
            <MenuItem value="A7">A7</MenuItem>
            <MenuItem value="B1">B1</MenuItem><MenuItem value="B2">B2</MenuItem><MenuItem value="B3">B3</MenuItem>
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
          <Grid item xs={12} sm={5.5}>
            <TextField
              fullWidth
              label="EPF Number"
              value={employmentDetails.joinedDetails.epfNumber || ""}
              onChange={(e) => handleJoinedDetailsChange("epfNumber", e.target.value)}
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
              <MenuItem value="A1">A1</MenuItem> <MenuItem value="A2"></MenuItem>A2<MenuItem value="A3">A3</MenuItem>
             <MenuItem value="A4">A4</MenuItem> <MenuItem value="A5"></MenuItem>A5<MenuItem value="A6">A6</MenuItem>
             <MenuItem value="A7">A7</MenuItem>
             <MenuItem value="B1">B1</MenuItem><MenuItem value="B2">B2</MenuItem><MenuItem value="B3">B3</MenuItem>
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
              value={employmentDetails.joinedDetails.epfNumber || ""}
              onChange={(e) => handleJoinedDetailsChange("epfNumber", e.target.value)}
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
              <MenuItem value="A2">A1</MenuItem>
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
 

     <Grid>
        <Grid container alignItems="center" sx={{ ml: 0, mt: 4 }}>
          <Typography 
            variant="h6" 
            gutterBottom 
            style={{ fontStyle: "italic", color: "gold", fontFamily: 'Roboto, sans-serif', textAlign: "left" }}
          >
            If you have a promotion{" "}
            <Button 
              onClick={addPromotion} 
              variant="text" 
              color="secondary"
              sx={{ fontSize: "1rem", textTransform: "none" }} 
            >
              Click Here
            </Button> 
          </Typography>
        </Grid>
        
      {employmentDetails?.promotions?.map((promotion, index) => (
        <Grid
          container
          spacing={2}
          key={index}
          sx={{ mt: -3, p: 2, }}
        >
       <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Grade"
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
          />
          </Grid>

          <Grid item xs={12} sm={3}>
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
             <TextField
                  fullWidth
                  label="Location"
                  InputLabelProps={{ shrink: true }}
                  value={promotion.location}
                  onChange={(e) => handlePromotionChange(index, "location", e.target.value)}
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
              </Grid>

              <Grid item xs={12} sm={3}>
              <TextField
                select
                fullWidth
                label="Function"
                value={promotion.function}
                onChange={(e) => handlePromotionChange(index, "function", e.target.value)}
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
                <MenuItem value="Head Office">Head Office</MenuItem>
                <MenuItem value="Refinery">Refinery</MenuItem>
              </TextField>
              </Grid>


              <Grid item xs={12} sm={3}>
              <TextField
                select
                fullWidth
                label="Sub Function"
                value={promotion.subFunction}
                onChange={(e) => handlePromotionChange(index, "subFunction", e.target.value)}
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
                disabled={!promotion.function}
                required={promotion.function && Object.values(promotion).some(val => val !== "")}
              >
                {getSubFunctionOptions(promotion.function).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
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
        {showAddPromotion && (
            <Button variant="text" startIcon={<Add />} onClick={addPromotion} sx={{ mt: 2 }}>
                Add Promotion
            </Button>
        )}
      </Grid>
      </Grid>
    </Grid>
    </Grid>
  );
};

export default EmploymentDetailsForm;