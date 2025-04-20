



// import React, { useState, useEffect } from 'react';
// import { TextField, Grid, Typography, Button, IconButton, MenuItem, FormHelperText } from "@mui/material";
// import { Add, Delete } from "@mui/icons-material";
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

// const DependentDetails = ({ setDependentDetails, parentData }) => {
//     const [dependentDetails, setLocalDependentDetails] = useState({
//         dependents: [],
//     });

//     const [errors, setErrors] = useState([]);
//     const [showAddDependent, setShowAddDependent] = useState(false);
//     const [activeDependents, setActiveDependents] = useState([]);

//     useEffect(() => {
//         setLocalDependentDetails((prevDetails) => {
//             const newDetails = {
//                 ...prevDetails,
//                 dependents: Array.isArray(parentData?.dependents) ? parentData.dependents : prevDetails.dependents,
//             };

//             // Prevent unnecessary updates
//             if (JSON.stringify(prevDetails) === JSON.stringify(newDetails)) {
//                 return prevDetails;
//             }
            
//             return newDetails;
//         });
        
//         // Initialize errors and active arrays based on dependents
//         if (Array.isArray(parentData?.dependents)) {
//             setErrors(Array(parentData.dependents.length).fill({}));
//             setActiveDependents(parentData.dependents.map(dep => 
//                 Object.values(dep).some(val => val && val.trim() !== "")
//             ));
//         }
//     }, [parentData]);
    
//     useEffect(() => {
//         // Only update parent if there are no validation errors
//         if (!hasValidationErrors()) {
//             setDependentDetails((prev) => {
//                 if (JSON.stringify(prev) !== JSON.stringify(dependentDetails)) {
//                     return dependentDetails;
//                 }
//                 return prev;
//             });
//         }
//     }, [dependentDetails, setDependentDetails]);

//     // Validate a single dependent
//     const validateDependent = (dependent, index) => {
//         const dependentErrors = {};
        
//         // Check if this dependent has any value filled
//         const hasAnyValue = Object.values(dependent).some(val => val && val.trim() !== "");
        
//         // Update active status
//         const newActiveDependents = [...activeDependents];
//         newActiveDependents[index] = hasAnyValue;
//         setActiveDependents(newActiveDependents);
        
//         // If this dependent is active, validate all required fields
//         if (hasAnyValue) {
//             if (!dependent.fullName || dependent.fullName.trim() === "") {
//                 dependentErrors.fullName = "Full name is required";
//             }
            
//             if (!dependent.gender || dependent.gender.trim() === "") {
//                 dependentErrors.gender = "Gender is required";
//             }
            
//             if (!dependent.dateOfBirth || dependent.dateOfBirth.trim() === "") {
//                 dependentErrors.dateOfBirth = "Date of birth is required";
//             }
            
//             if (!dependent.occupation || dependent.occupation.trim() === "") {
//                 dependentErrors.occupation = "Occupation is required";
//             }
            
//             // Occupation address is required if occupation is "Employed"
//             if (dependent.occupation === "Employed" && 
//                 (!dependent.occupationAddress || dependent.occupationAddress.trim() === "")) {
//                 dependentErrors.occupationAddress = "Occupation address is required";
//             }
//         }
        
//         // Update errors for this dependent
//         const newErrors = [...errors];
//         newErrors[index] = dependentErrors;
//         setErrors(newErrors);
        
//         return Object.keys(dependentErrors).length === 0;
//     };
    
//     // Check if there are any validation errors
//     const hasValidationErrors = () => {
//         return errors.some(errorObj => Object.keys(errorObj).length > 0);
//     };

//     // Handle field updates
//     const handleDependentChange = (index, field, value) => {
//         const updatedDependents = [...dependentDetails.dependents];
//         updatedDependents[index][field] = value;
        
//         // Update local state
//         setLocalDependentDetails({ dependents: updatedDependents });
        
//         // Immediately validate this dependent
//         setTimeout(() => {
//             validateDependent(updatedDependents[index], index);
//         }, 0);
//     };

//     // Add a new dependent
//     const addDependent = () => {
//         setShowAddDependent(true);
//         const newDependent = { 
//             fullName: "", 
//             gender: "", 
//             dateOfBirth: "", 
//             occupation: "", 
//             occupationAddress: "" 
//         };
        
//         setLocalDependentDetails((prevDetails) => ({
//             dependents: [...prevDetails.dependents, newDependent]
//         }));
        
//         // Initialize errors and active for new dependent
//         setErrors([...errors, {}]);
//         setActiveDependents([...activeDependents, false]);
//     };

//     // Remove a dependent
//     const removeDependent = (index) => {
//         setLocalDependentDetails((prevDetails) => ({
//             dependents: prevDetails.dependents.filter((_, i) => i !== index)
//         }));
        
//         // Remove corresponding error and active states
//         setErrors(errors.filter((_, i) => i !== index));
//         setActiveDependents(activeDependents.filter((_, i) => i !== index));
//     };

//     return (
//         <Grid  item xs={11.7} container spacing={2} sx={{ ml: 2, mt: 2 }}>
//            <Grid   item xs={7}
//                      container 
//                      alignItems="center" 
//                      sx={{ 
//                        ml: 20, 
//                        mt: 5, 
//                        backgroundColor: "rgb(27, 186, 214)" ,
//                        borderRadius: 1, 
//                        boxShadow: 3,  
//                     transparent: "0.8"
//                      }}
                     
//                    >
//                 <Typography
//                     variant="h6"
//                     gutterBottom
//                     sx={{ ml: 15, mt: -1 }}
//                     style={{ 
//                     fontStyle: "italic", 
//                     color: "rgb(17, 17, 16)", 
//                     fontFamily: 'Roboto, sans-serif', 
//                     textAlign: "left" ,
                  
//                     }}
//                 >
                   
//                         If you have dependents{" "}
//                     {/* If you have dependents{" "} */}
//                     <Button
//                     onClick={addDependent}
//                     variant="contained"
//                     //  variant="text"
//                     color="secondary"
//                     sx={{ fontSize: "1rem", textTransform: "none" , height: "20px" , ml: 3}}
//                     >
//                     Click Here
//                     </Button>
//                 </Typography>
//                 </Grid>

//             {dependentDetails.dependents.map((dependent, index) => {
//                 // Use the tracked active state
//                 const isActive = activeDependents[index];
                
//                 return (
//                     <Grid container spacing={2} key={index} sx={{ mt: -1, p: 2, borderBottom: "1px solid #ddd" }}>
//                         <Grid item xs={12} sm={6}>
//                             <TextField 
//                                 fullWidth 
//                                 label="Full Name" 
//                                 value={dependent.fullName} 
//                                 onChange={(e) => handleDependentChange(index, "fullName", e.target.value)}
//                                 error={isActive && !!errors[index]?.fullName}
//                                 helperText={isActive && errors[index]?.fullName}
//                                 required={isActive}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField 
//                                 fullWidth 
//                                 select 
//                                 label="Gender" 
//                                 value={dependent.gender} 
//                                 onChange={(e) => handleDependentChange(index, "gender", e.target.value)}
//                                 error={isActive && !!errors[index]?.gender}
//                                 required={isActive}
//                             >
//                                 <MenuItem value="Male">Male</MenuItem>
//                                 <MenuItem value="Female">Female</MenuItem>
//                             </TextField>
//                             {isActive && errors[index]?.gender && (
//                                 <FormHelperText error>{errors[index].gender}</FormHelperText>
//                             )}
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField 
//                                 fullWidth 
//                                 label="Date of Birth" 
//                                 type="date" 
//                                 InputLabelProps={{ shrink: true }} 
//                                 value={dependent.dateOfBirth} 
//                                 onChange={(e) => handleDependentChange(index, "dateOfBirth", e.target.value)}
//                                 error={isActive && !!errors[index]?.dateOfBirth}
//                                 helperText={isActive && errors[index]?.dateOfBirth}
//                                 required={isActive}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField 
//                                 fullWidth 
//                                 select 
//                                 label="Occupation" 
//                                 value={dependent.occupation} 
//                                 onChange={(e) => handleDependentChange(index, "occupation", e.target.value)}
//                                 error={isActive && !!errors[index]?.occupation}
//                                 required={isActive}
//                             >
//                                 <MenuItem value="Employed">Employed</MenuItem>
//                                 <MenuItem value="Studies">Studies</MenuItem>
//                                 <MenuItem value="None">None</MenuItem>
//                             </TextField>
//                             {isActive && errors[index]?.occupation && (
//                                 <FormHelperText error>{errors[index].occupation}</FormHelperText>
//                             )}
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField 
//                                 fullWidth 
//                                 label="Occupation Address" 
//                                 value={dependent.occupationAddress} 
//                                 onChange={(e) => handleDependentChange(index, "occupationAddress", e.target.value)}
//                                 error={isActive && !!errors[index]?.occupationAddress}
//                                 helperText={isActive && errors[index]?.occupationAddress}
//                                 required={isActive && dependent.occupation === "Employed"}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6} sx={{ display: "flex", alignItems: "center" }}>
//                             <IconButton color="error" onClick={() => removeDependent(index)}>
//                                 <Delete />
//                             </IconButton>
//                         </Grid>
//                     </Grid>
//                 );
//             })}

//             <Grid item xs={12}>
//                 {showAddDependent && (
//                     <Button 
//                         variant="text" 
//                         startIcon={<Add />} 
//                         onClick={addDependent} 
//                         sx={{ mt: 2 }}
//                     >
//                         Add Dependent
//                     </Button>
//                 )}
//             </Grid>
//         </Grid>
//     );
// };

// export default DependentDetails;

















import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { 
    TextField, 
    Grid, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    MenuItem, 
    FormHelperText 
} from "@mui/material";
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

const DependentDetailsTable = forwardRef(({ setDependentDetails, parentData, numberOfDependents, spouseDetails }, ref) => {
    const [dependentDetails, setLocalDependentDetails] = useState({
        dependents: [],
    });

    const [errors, setErrors] = useState([]);
    const [touched, setTouched] = useState([]);

    // Effect to create dependent sections based on numberOfDependents
    useEffect(() => {
        if (numberOfDependents && numberOfDependents > 0) {
            const newDependents = Array(numberOfDependents).fill().map((_, index) => {
                return parentData?.dependents?.[index] || { 
                    relationship: "",
                    fullName: "", 
                    gender: "", 
                    dateOfBirth: "", 
                    occupation: "", 
                    occupationAddress: "" 
                };
            });

            setLocalDependentDetails({ dependents: newDependents });
            
            // Initialize errors and touched arrays
            setErrors(Array(numberOfDependents).fill({}));
            setTouched(Array(numberOfDependents).fill({
                relationship: false,
                fullName: false,
                gender: false,
                dateOfBirth: false,
                occupation: false,
                occupationAddress: false
            }));
        } else {
            // Reset state when numberOfDependents is 0 or undefined
            setLocalDependentDetails({ dependents: [] });
            setErrors([]);
            setTouched([]);
        }
    }, [numberOfDependents, parentData]);

    useEffect(() => {
        if (!numberOfDependents || numberOfDependents <= 0) return;
      
        const hasErrors = dependentDetails.dependents.some((dep, idx) => !validateDependent(dep, idx));
      
        if (!hasErrors) {
          setDependentDetails((prev) => {
            if (JSON.stringify(prev) !== JSON.stringify(dependentDetails)) {
              return dependentDetails;
            }
            return prev;
          });
        }
      }, [dependentDetails, numberOfDependents]);
      



      useImperativeHandle(ref, () => ({
        validateForm: () => {
          if (numberOfDependents > 0) {
            const hasErrors = errors.some(errorObj => Object.keys(errorObj).length > 0);
            if (hasErrors) {
              // optionally, trigger touched state to show errors
              const newTouched = dependentDetails.dependents.map(() => ({
                relationship: true,
                fullName: true,
                gender: true,
                dateOfBirth: true,
                occupation: true,
                occupationAddress: true,
              }));
              setTouched(newTouched);
            }
            return !hasErrors;
          }
          return true; // if numberOfDependents is 0, no validation needed
        }
      }));
      

    // Mark a field as touched
    const handleBlur = (index, field) => {
        const newTouched = [...touched];
        if (!newTouched[index]) {
            newTouched[index] = {};
        }
        newTouched[index][field] = true;
        setTouched(newTouched);
        
        // Validate on blur
        validateDependent(dependentDetails.dependents[index], index);
    };

    // Validate a single dependent
    const validateDependent = (dependent, index) => {
        const dependentErrors = {};
        
        if (!dependent.relationship || dependent.relationship.trim() === "") {
            dependentErrors.relationship = "Relationship is required";
          }
          

        if (!dependent.fullName || dependent.fullName.trim() === "") {
            dependentErrors.fullName = "Full name is required";
        }
        
        if (!dependent.gender || dependent.gender.trim() === "") {
            dependentErrors.gender = "Gender is required";
        }
        
        if (!dependent.dateOfBirth || dependent.dateOfBirth.trim() === "") {
            dependentErrors.dateOfBirth = "Date of birth is required";
        }
        
        if (!dependent.occupation || dependent.occupation.trim() === "") {
            dependentErrors.occupation = "Occupation is required";
        }
        
        // Occupation address is required if occupation is "Employed"
        if (dependent.occupation === "Employed" && 
            (!dependent.occupationAddress || dependent.occupationAddress.trim() === "")) {
            dependentErrors.occupationAddress = "Occupation address is required";
        }
        
        // Update errors for this dependent
        const newErrors = [...errors];
        newErrors[index] = dependentErrors;
        setErrors(newErrors);
        
        return Object.keys(dependentErrors).length === 0;
    };
    
    // Check if there are any validation errors
    const hasValidationErrors = () => {
        return errors.some(errorObj => Object.keys(errorObj).length > 0);
    };


    const isRowDisabled = (index) => {
        if (index === 0) return false; // First row is always enabled
      
        const prev = dependentDetails.dependents[index - 1];
        const prevErrors = errors[index - 1];
      
        const requiredFields = ["relationship", "fullName", "gender", "dateOfBirth", "occupation"];
        const isPrevValid = requiredFields.every(field => 
          prev?.[field] && !prevErrors?.[field]
        );
      
        if (prev.occupation === "Employed") {
          return !(isPrevValid && prev.occupationAddress && !prevErrors?.occupationAddress);
        }
      
        return !isPrevValid;
      };
      

      const handleDependentChange = (index, field, value) => {
        const updatedDependents = [...dependentDetails.dependents];
      
        updatedDependents[index][field] = value;
      
        if (field === "relationship") {
            if (value === "Spouse" && spouseDetails) {
              // Autofill from spouse details
              updatedDependents[index] = {
                ...updatedDependents[index],
                relationship: value,
                fullName: spouseDetails.fullName || "",
                dateOfBirth: spouseDetails.dateOfBirth || "",
                occupation: spouseDetails.workPlaceAddress ? "Employed" : "",
                occupationAddress: spouseDetails.workPlaceAddress || "",
                gender: spouseDetails.title?.toLowerCase() === "mr" ? "Male" : "Female",
              };
            } else {
              // Clear the auto-filled fields if switching away from Spouse
              updatedDependents[index] = {
                ...updatedDependents[index],
                relationship: value,
                fullName: "",
                dateOfBirth: "",
                occupation: "",
                occupationAddress: "",
                gender: "",
              };
            }
          }          
      
        setLocalDependentDetails({ dependents: updatedDependents });
      
        // Mark field as touched and validate
        const newTouched = [...touched];
        if (!newTouched[index]) newTouched[index] = {};
        newTouched[index][field] = true;
        setTouched(newTouched);
      
        setTimeout(() => {
          validateDependent(updatedDependents[index], index);
        }, 0);
      };
      

    // Should display error for a field?
    const shouldShowError = (index, field) => {
        return touched[index]?.[field] && !!errors[index]?.[field];
    };

    // Only render table if there are dependents to show
    if (!numberOfDependents || numberOfDependents <= 0 || dependentDetails.dependents.length === 0) {
        return null;
    }

    return (
        <ThemeProvider theme={textFieldTheme}>
            <Grid item xs={12}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Relationship*</TableCell>
                                <TableCell>Full Name*</TableCell>
                                <TableCell>Gender*</TableCell>
                                <TableCell>Date of Birth*</TableCell>
                                <TableCell>Occupation*</TableCell>
                                <TableCell>Occupation Address*</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dependentDetails.dependents.map((dependent, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>

                                    <TableCell>
                                        <TextField
                                        fullWidth
                                        select
                                        label="Relationship"
                                        value={dependent.relationship}
                                        onChange={(e) => handleDependentChange(index, "relationship", e.target.value)}
                                        onBlur={() => handleBlur(index, "relationship")}
                                        error={shouldShowError(index, "relationship")}
                                        disabled={isRowDisabled(index)}
                                        required
                                        >
                                        <MenuItem value="Spouse">Spouse</MenuItem>
                                        <MenuItem value="Parent">Parent</MenuItem>
                                        <MenuItem value="Child">Child</MenuItem>
                                        <MenuItem value="Sibling">Sibling</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                        </TextField>
                                        {shouldShowError(index, "relationship") && (
                                        <FormHelperText error>{errors[index]?.relationship}</FormHelperText>
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        <TextField 
                                            fullWidth 
                                            label="Full Name" 
                                            value={dependent.fullName} 
                                            onChange={(e) => handleDependentChange(index, "fullName", e.target.value)}
                                            onBlur={() => handleBlur(index, "fullName")}
                                            error={shouldShowError(index, "fullName")}
                                            helperText={shouldShowError(index, "fullName") ? errors[index].fullName : ""}
                                            required
                                            disabled={isRowDisabled(index)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField 
                                            fullWidth 
                                            select 
                                            label="Gender" 
                                            value={dependent.gender} 
                                            onChange={(e) => handleDependentChange(index, "gender", e.target.value)}
                                            onBlur={() => handleBlur(index, "gender")}
                                            error={shouldShowError(index, "gender")}
                                            required
                                            disabled={isRowDisabled(index)}
                                        >
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                        </TextField>
                                        {shouldShowError(index, "gender") && (
                                            <FormHelperText error>{errors[index].gender}</FormHelperText>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <TextField 
                                            fullWidth 
                                            label="Date of Birth" 
                                            type="date" 
                                            InputLabelProps={{ shrink: true }} 
                                            value={dependent.dateOfBirth} 
                                            onChange={(e) => handleDependentChange(index, "dateOfBirth", e.target.value)}
                                            onBlur={() => handleBlur(index, "dateOfBirth")}
                                            error={shouldShowError(index, "dateOfBirth")}
                                            helperText={shouldShowError(index, "dateOfBirth") ? errors[index].dateOfBirth : ""}
                                            required
                                            disabled={isRowDisabled(index)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField 
                                            fullWidth 
                                            select 
                                            label="Occupation" 
                                            value={dependent.occupation} 
                                            onChange={(e) => handleDependentChange(index, "occupation", e.target.value)}
                                            onBlur={() => handleBlur(index, "occupation")}
                                            error={shouldShowError(index, "occupation")}
                                            required
                                            disabled={isRowDisabled(index)}
                                        >
                                            <MenuItem value="Employed">Employed</MenuItem>
                                            <MenuItem value="Studies">Studies</MenuItem>
                                            <MenuItem value="None">None</MenuItem>
                                        </TextField>
                                        {shouldShowError(index, "occupation") && (
                                            <FormHelperText error>{errors[index].occupation}</FormHelperText>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <TextField 
                                            fullWidth 
                                            label="Occupation Address" 
                                            value={dependent.occupationAddress} 
                                            onChange={(e) => handleDependentChange(index, "occupationAddress", e.target.value)}
                                            onBlur={() => handleBlur(index, "occupationAddress")}
                                            error={shouldShowError(index, "occupationAddress")}
                                            helperText={shouldShowError(index, "occupationAddress") ? errors[index].occupationAddress : ""}
                                            required={dependent.occupation === "Employed"}
                                            disabled={dependent.occupation !== "Employed"}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </ThemeProvider>
    );
});

export default DependentDetailsTable;