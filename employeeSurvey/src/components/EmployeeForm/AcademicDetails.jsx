

// import React, { useState, useEffect, useRef } from "react";
// import {
//   TextField,
//   Grid,
//   Typography,
//   Button,
//   IconButton,
//   MenuItem,
//   FormHelperText
// } from "@mui/material";
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

// const AcademicDetails = ({ setAcademicDetails, parentData }) => {
//   const [formData, setFormData] = useState({
//     schoolLeavingYear: "",
//     schoolLeavingGrade: "",
//     schoolName: "",
//     examResults: [
//       {
//         indexNumber: "",
//         examType: "",
//         attemptYear: "",
//         attempt: "",
//         academicDetailsId: 0,
//         subjectTable: [
//           {
//             subjectName: "",
//             subjectResults: "",
//           },
//         ],
//       },
//     ],
//   });

        

//   // Add errors state to track validation errors
//   const [errors, setErrors] = useState({
//     schoolLeavingYear: false,
//     schoolLeavingGrade: false,
//     schoolName: false,
//     examResults: [
//       {
//         examType: false,
//         indexNumber: false,
//         attemptYear: false,
//         attempt: false,
//         subjectTable: [
//           {
//             subjectName: false,
//             subjectResults: false,
//           },
//         ],
//       },
//     ],
//   });

//   // Create refs for field navigation
//   const fieldRefs = useRef({});

//   useEffect(() => {
//     if (!parentData || Object.keys(parentData).length === 0) {
//       // Handle reset case - revert to initial state
//       setFormData({
//         schoolLeavingYear: "",
//         schoolLeavingGrade: "",
//         schoolName: "",
//         examResults: [
//           {
//             indexNumber: "",
//             examType: "",
//             attemptYear: "",
//             attempt: "",
//             academicDetailsId: 0,
//             subjectTable: [
//               {
//                 subjectName: "",
//                 subjectResults: "",
//               },
//             ],
//           },
//         ],
//       });
      
//       // Reset errors state too
//       setErrors({
//         schoolLeavingYear: false,
//         schoolLeavingGrade: false,
//         schoolName: false,
//         examResults: [
//           {
//             examType: false,
//             indexNumber: false,
//             attemptYear: false,
//             attempt: false,
//             subjectTable: [
//               {
//                 subjectName: false,
//                 subjectResults: false,
//               },
//             ],
//           },
//         ],
//       });
//       return;
//     }
    
//     // Regular update case (existing code)
//     if (JSON.stringify(formData) !== JSON.stringify(parentData)) {
//       setFormData(parentData);
      
//       // Initialize errors state based on the structure of parentData
//       const initialErrors = {
//         schoolLeavingYear: !parentData.schoolLeavingYear,
//         schoolLeavingGrade: !parentData.schoolLeavingGrade,
//         schoolName: !parentData.schoolName,
//         examResults: parentData.examResults.map(exam => ({
//           examType: !exam.examType,
//           indexNumber: false,
//           attemptYear: false,
//           attempt: false,
//           subjectTable: exam.subjectTable.map(subject => ({
//             subjectName: false,
//             subjectResults: false,
//           })),
//         })),
//       };
//       setErrors(initialErrors);
//     }
//   }, [parentData]);

// // In PersonalDetailsForm.jsx
// useEffect(() => {
//   // Reset internal form state when parent data changes to an empty object
//   if (parentData && Object.keys(parentData).length === 0) {
//     setFormData({
//       epfNumber: "",
//       nameWithInitials: "",
//       title: "",
//       fullName: "",
//       gender: "",
//       maritalStatus: "",
//       bloodGroup: "",
//       dateOfBirth: "",
//       nicNumber: "",
//       drivingLicense: "",
//       passportNumber: "",
//       religion: "",
//       race: "",
//       numberOfDependents: "",
//     });
    
//     // Reset errors and showErrors states as well
//     setErrors({
//       epfNumber: false,
//       nameWithInitials: false,
//       title: false,
//       fullName: false,
//       nicNumber: false,
//       dateOfBirth: false,
//       maritalStatus: false,
//       bloodGroup: false,
//       religion: false,
//       race: false,
//       numberOfDependents: false,
//     });
    
//     setShowErrors({
//       epfNumber: false,
//       nameWithInitials: false,
//       title: false,
//       fullName: false,
//       nicNumber: false,
//       dateOfBirth: false,
//       maritalStatus: false,
//       bloodGroup: false,
//       religion: false,
//       race: false,
//       numberOfDependents: false,
//     });
    
//     // Also reset error messages if needed
//     setErrorMessages({
//       epfNumber: "",
//       nameWithInitials: "",
//       title: "",
//       fullName: "",
//       nicNumber: "",
//       dateOfBirth: "",
//       maritalStatus: "",
//       bloodGroup: "",
//       religion: "",
//       race: "",
//       numberOfDependents: "",
//     });
//   }
// }, [parentData]);
  

//   // Only notify parent when form data changes due to user input, not from parent data changes
//   const updateParent = (updatedData) => {
//     // Only update parent if the data is actually different
//     if (JSON.stringify(updatedData) !== JSON.stringify(parentData)) {
//       setAcademicDetails(updatedData);
//     }
//   };

//   const validateField = (value, field, examIndex = null, subjectIndex = null) => {
//     let isValid = true;
//     // Determine which fields are required
//     if (field === "schoolLeavingYear" || field === "schoolLeavingGrade" || field === "schoolName") {
//       isValid = value.trim() !== "";
//     } else if (field === "examType" && examIndex !== null) {
//       isValid = value.trim() !== "";
//     }
    
//     // Update errors state
//     let updatedErrors = { ...errors };
//     if (examIndex !== null) {
//       if (subjectIndex !== null) {
//         updatedErrors.examResults[examIndex].subjectTable[subjectIndex][field] = !isValid;
//       } else {
//         updatedErrors.examResults[examIndex][field] = !isValid;
//       }
//     } else {
//       updatedErrors[field] = !isValid;
//     }
    
//     setErrors(updatedErrors);
//     return isValid;
//   };

//   const handleChange = (e, field, examIndex = null, subjectIndex = null) => {
//     const { value } = e.target;
//     let updatedFormData = { ...formData };

//     if (examIndex !== null) {
//       if (subjectIndex !== null) {
//         updatedFormData.examResults[examIndex].subjectTable[subjectIndex][field] = value;
//       } else {
//         updatedFormData.examResults[examIndex][field] = value;
//       }
//     } else {
//       updatedFormData[field] = value;
//     }

//     setFormData(updatedFormData);
//     // Validate the field
//     validateField(value, field, examIndex, subjectIndex);
//     // Update parent after user input
//     updateParent(updatedFormData);
//   };

//   const handleKeyDown = (e, nextFieldId, field, examIndex = null, subjectIndex = null) => {
//     if (e.key === 'Enter') {
//       e.preventDefault(); // Prevent form submission
      
//       // Get the current value to validate
//       let currentValue = "";
//       if (examIndex !== null) {
//         if (subjectIndex !== null) {
//           currentValue = formData.examResults[examIndex].subjectTable[subjectIndex][field];
//         } else {
//           currentValue = formData.examResults[examIndex][field];
//         }
//       } else {
//         currentValue = formData[field];
//       }
      
//       // Validate the current field
//       const isValid = validateField(currentValue, field, examIndex, subjectIndex);
      
//       // Focus the next field only if current field is valid
//       if (isValid && nextFieldId && fieldRefs.current[nextFieldId]) {
//         fieldRefs.current[nextFieldId].focus();
//       }
//     }
//   };

//   // Function to create unique field IDs
//   const getFieldId = (field, examIndex = null, subjectIndex = null) => {
//     if (examIndex !== null) {
//       if (subjectIndex !== null) {
//         return `exam_${examIndex}_subject_${subjectIndex}_${field}`;
//       }
//       return `exam_${examIndex}_${field}`;
//     }
//     return field;
//   };

//   const addExam = () => {
//     const updatedFormData = {
//       ...formData,
//       examResults: [
//         ...formData.examResults,
//         {
//           indexNumber: "",
//           examType: "",
//           attemptYear: "",
//           attempt: "",
//           academicDetailsId: 0,
//           subjectTable: [{ subjectName: "", subjectResults: "" }],
//         },
//       ],
//     };
    
//     // Update errors structure for the new exam
//     const updatedErrors = {
//       ...errors,
//       examResults: [
//         ...errors.examResults,
//         {
//           examType: true, // Required field is empty initially
//           indexNumber: false,
//           attemptYear: false,
//           attempt: false,
//           subjectTable: [{ subjectName: false, subjectResults: false }],
//         },
//       ],
//     };
    
//     setFormData(updatedFormData);
//     setErrors(updatedErrors);
//     updateParent(updatedFormData);
//   };

//   const removeExam = (index) => {
//     const updatedExams = formData.examResults.filter((_, i) => i !== index);
//     const updatedExamErrors = errors.examResults.filter((_, i) => i !== index);
    
//     const updatedFormData = { ...formData, examResults: updatedExams };
//     const updatedErrors = { ...errors, examResults: updatedExamErrors };
    
//     setFormData(updatedFormData);
//     setErrors(updatedErrors);
//     updateParent(updatedFormData);
//   };

//   const addSubject = (examIndex) => {
//     const updatedExams = [...formData.examResults];
//     updatedExams[examIndex].subjectTable.push({ subjectName: "", subjectResults: "" });
    
//     const updatedExamErrors = [...errors.examResults];
//     updatedExamErrors[examIndex].subjectTable.push({ subjectName: false, subjectResults: false });
    
//     const updatedFormData = { ...formData, examResults: updatedExams };
//     const updatedErrors = { ...errors, examResults: updatedExamErrors };
    
//     setFormData(updatedFormData);
//     setErrors(updatedErrors);
//     updateParent(updatedFormData);
//   };

//   const removeSubject = (examIndex, subjectIndex) => {
//     const updatedExams = [...formData.examResults];
//     updatedExams[examIndex].subjectTable = updatedExams[examIndex].subjectTable.filter((_, i) => i !== subjectIndex);
    
//     const updatedExamErrors = [...errors.examResults];
//     updatedExamErrors[examIndex].subjectTable = updatedExamErrors[examIndex].subjectTable.filter((_, i) => i !== subjectIndex);
    
//     const updatedFormData = { ...formData, examResults: updatedExams };
//     const updatedErrors = { ...errors, examResults: updatedExamErrors };
    
//     setFormData(updatedFormData);
//     setErrors(updatedErrors);
//     updateParent(updatedFormData);
//   };

//   const isLastSubjectFilled = (examIndex) => {
//     const lastExam = formData.examResults[examIndex]; 
//     if (!lastExam || lastExam.subjectTable.length === 0) return false;
  
//     const lastSubject = lastExam.subjectTable[lastExam.subjectTable.length - 1];
//     return lastSubject.subjectName.trim() !== "" && lastSubject.subjectResults.trim() !== "";
//   };
  
//   return (
//      <ThemeProvider theme={textFieldTheme}>
//     <Grid item xs={11.7} container spacing={2} sx={{ ml: 0, mt: 4 }}>
//       <Typography 
//         sx={{ ml: 2, mt: 0 }} 
//         variant="h4" 
//         gutterBottom 
//         style={{ 
//           fontStyle: "italic", 
//           color: "#800020", 
//           fontFamily: 'Roboto, sans-serif', 
//           textAlign: 'left'
//         }}
//       >
//         Academic Qualification 
//       </Typography>

//       <Grid item xs={11.7} container spacing={1} sx={{ ml: 1 }}>
//         <Grid item xs={6}>
//           <TextField 
//             label="School Leaving Year"  
//             fullWidth 
//             value={formData.schoolLeavingYear} 
//             onChange={(e) => handleChange(e, "schoolLeavingYear")} 
//             onKeyDown={(e) => handleKeyDown(e, "schoolLeavingGrade", "schoolLeavingYear")}
//             inputRef={(el) => fieldRefs.current["schoolLeavingYear"] = el}
//             required
//             error={errors.schoolLeavingYear}
//             helperText={errors.schoolLeavingYear ? "School Leaving Year is required" : ""}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField 
//             label="School Leaving Grade" 
//             fullWidth 
//             value={formData.schoolLeavingGrade} 
//             onChange={(e) => handleChange(e, "schoolLeavingGrade")} 
//             onKeyDown={(e) => handleKeyDown(e, "schoolName", "schoolLeavingGrade")}
//             inputRef={(el) => fieldRefs.current["schoolLeavingGrade"] = el}
//             required 
//             error={errors.schoolLeavingGrade}
//             helperText={errors.schoolLeavingGrade ? "School Leaving Grade is required" : ""}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField 
//             label="School Name" 
//             fullWidth 
//             value={formData.schoolName} 
//             onChange={(e) => handleChange(e, "schoolName")}
//             onKeyDown={(e) => handleKeyDown(e, getFieldId("examType", 0), "schoolName")}
//             inputRef={(el) => fieldRefs.current["schoolName"] = el}
//             required
//             error={errors.schoolName}
//             helperText={errors.schoolName ? "School Name is required" : ""}
//           />
//         </Grid>
        
//         <Grid item xs={12} container spacing={2} sx={{ mt: 2 }}>
//            <Grid  
//                     container 
//                     alignItems="center" 
//                     sx={{ 
//                       ml: 2, 
//                       mt: 2, 
//                       backgroundColor: "#E0E0E0" ,
//                       borderRadius: 1, 
//                       boxShadow: 3,
                     
//                     }}       
//                   >
//                 <Grid >
//                   <Typography
//                     sx={{ ml: 2, mt: 0 }}
//                     variant="h6"
//                     gutterBottom
//                     style={{
//                       fontStyle: "italic",
//                       color: "rgb(58, 53, 54)",
//                       fontFamily: "Roboto, sans-serif",
//                       textAlign: "left",
//                     }}
//                   >
//                     Education Qualification
//                   </Typography>
//                 </Grid>
//                </Grid>
//           {formData.examResults.map((exam, examIndex) => (
//             <React.Fragment key={examIndex}>
//               <Grid item xs={11.8} sx={{ ml:2, mt: 2, borderBottom: "1px solid #ccc", pb: 2 }}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={3}>
//                     <TextField
//                       select 
//                       label="Exam Type" 
//                       fullWidth 
//                       value={exam.examType || ''} 
//                       onChange={(e) => handleChange(e, "examType", examIndex)}
//                       onKeyDown={(e) => handleKeyDown(e, getFieldId("indexNumber", examIndex), "examType", examIndex)}
//                       inputRef={(el) => fieldRefs.current[getFieldId("examType", examIndex)] = el}
//                       required
//                       error={errors.examResults[examIndex]?.examType}
//                       helperText={errors.examResults[examIndex]?.examType ? "Exam Type is required" : ""}
//                     >
//                       <MenuItem value="O/L">G.C.E O/L</MenuItem>
//                       <MenuItem value="A/L">G.C.E A/L</MenuItem>
//                     </TextField>
//                   </Grid>
//                   <Grid item xs={3}>
//                     <TextField 
//                       label="Index Number" 
//                       fullWidth 
//                       value={exam.indexNumber} 
//                       onChange={(e) => handleChange(e, "indexNumber", examIndex)}
//                       onKeyDown={(e) => handleKeyDown(e, getFieldId("attemptYear", examIndex), "indexNumber", examIndex)}
//                       inputRef={(el) => fieldRefs.current[getFieldId("indexNumber", examIndex)] = el}
//                     />
//                   </Grid>
//                   <Grid item xs={3}>
//                     <TextField 
//                       label="Attempt Year" 
//                       type="number" 
//                       fullWidth 
//                       value={exam.attemptYear} 
//                       onChange={(e) => handleChange(e, "attemptYear", examIndex)}
//                       onKeyDown={(e) => handleKeyDown(e, getFieldId("attempt", examIndex), "attemptYear", examIndex)}
//                       inputRef={(el) => fieldRefs.current[getFieldId("attemptYear", examIndex)] = el}
//                     />
//                   </Grid>
//                   <Grid item xs={3}>
//                     <TextField 
//                       select 
//                       label="Attempt" 
//                       fullWidth 
//                       value={exam.attempt || ''} 
//                       onChange={(e) => handleChange(e, "attempt", examIndex)}
//                       onKeyDown={(e) => handleKeyDown(e, getFieldId("subjectName", examIndex, 0), "attempt", examIndex)}
//                       inputRef={(el) => fieldRefs.current[getFieldId("attempt", examIndex)] = el}
//                     >
//                       <MenuItem value="01">01</MenuItem>
//                       <MenuItem value="02">02</MenuItem>
//                       <MenuItem value="03">03</MenuItem>
//                       <MenuItem value="04">04</MenuItem>
//                     </TextField>
//                   </Grid>
                  
//                   {exam.subjectTable.map((subject, subjectIndex) => (
//                     <React.Fragment key={subjectIndex}>
//                       <Grid item xs={5}>
//                         <TextField 
//                           label="Subject Name" 
//                           fullWidth 
//                           value={subject.subjectName} 
//                           onChange={(e) => handleChange(e, "subjectName", examIndex, subjectIndex)} 
//                           onKeyDown={(e) => handleKeyDown(e, getFieldId("subjectResults", examIndex, subjectIndex), "subjectName", examIndex, subjectIndex)}
//                           inputRef={(el) => fieldRefs.current[getFieldId("subjectName", examIndex, subjectIndex)] = el}
//                           variant="standard"
//                         />
//                       </Grid>
//                       <Grid item xs={1.5}>
//                         <TextField 
//                           select 
//                           label="Result" 
//                           fullWidth 
//                           value={subject.subjectResults || ''} 
//                           onChange={(e) => handleChange(e, "subjectResults", examIndex, subjectIndex)}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') {
//                               e.preventDefault();
//                               // Validate current field
//                               const isValid = validateField(subject.subjectResults, "subjectResults", examIndex, subjectIndex);
                              
//                               if (!isValid) return;
                              
//                               // If this is the last subject in the table, add a new subject and focus on it
//                               if (subjectIndex === exam.subjectTable.length - 1 && isLastSubjectFilled(examIndex)) {
//                                 addSubject(examIndex);
//                                 // Will focus on the next subject name field after it's created
//                                 setTimeout(() => {
//                                   const nextId = getFieldId("subjectName", examIndex, subjectIndex + 1);
//                                   if (fieldRefs.current[nextId]) {
//                                     fieldRefs.current[nextId].focus();
//                                   }
//                                 }, 0);
//                               } else if (subjectIndex < exam.subjectTable.length - 1) {
//                                 // If there's a next subject, focus on its name field
//                                 const nextId = getFieldId("subjectName", examIndex, subjectIndex + 1);
//                                 if (fieldRefs.current[nextId]) {
//                                   fieldRefs.current[nextId].focus();
//                                 }
//                               }
//                             }
//                           }}
//                           inputRef={(el) => fieldRefs.current[getFieldId("subjectResults", examIndex, subjectIndex)] = el}
//                           variant="standard"
//                         >
//                           <MenuItem value="A">A</MenuItem>
//                           <MenuItem value="B">B</MenuItem>
//                           <MenuItem value="C">C</MenuItem>
//                           <MenuItem value="D">D</MenuItem>
//                           <MenuItem value="F">F</MenuItem>
//                           <MenuItem value="S">S</MenuItem>
//                           <MenuItem value="W">W</MenuItem>
//                         </TextField>
//                       </Grid>
//                       <Grid item xs={2}>
//                         <IconButton 
//                           onClick={() => addSubject(examIndex)} 
//                           disabled={!isLastSubjectFilled(examIndex)}
//                         >
//                           <Add />
//                         </IconButton>

//                         {formData.examResults[examIndex]?.subjectTable?.length > 1 && (
//                           <IconButton onClick={() => removeSubject(examIndex, subjectIndex)}>
//                             <Delete />
//                           </IconButton>
//                         )}
//                       </Grid>
//                     </React.Fragment>
//                   ))}
                  
//                   <Grid item xs={12} sm={6}>
//                     {formData.examResults.length > 1 && (
//                       <Button 
//                         onClick={() => removeExam(examIndex)} 
//                         startIcon={<Delete />} 
//                         color="error"
//                       >
//                         Remove Exam
//                       </Button>
//                     )}
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </React.Fragment>
//           ))}
//         </Grid>
         
//         <Grid item xs={12} sm={2}>
//           <Button 
//             onClick={addExam} 
//             startIcon={<Add />} 
//             variant="text" 
//             color="primary"
//           >
//             Add Exam
//           </Button>
//         </Grid>
//       </Grid>
//     </Grid>
//     </ThemeProvider>
//   );
// };

// export default AcademicDetails;









// import React, { useState, useEffect, useRef } from "react";
// import {
//   TextField,
//   Grid,
//   Typography,
//   Button,
//   IconButton,
//   MenuItem,
//   FormHelperText
// } from "@mui/material";
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

// const AcademicDetails = ({ setAcademicDetails, parentData }) => {
//   // Define the streams and subjects
//   const streams = {
//     "Maths_Stream": ["Combined Mathematics", "Physics", "Chemistry", "ICT"],
//     "Bio_Science_Stream": ["Biology", "Chemistry", "Physics", "Agricultural Science"],
//     "Commerce_Stream": ["Business Studies", "Accounting", "Economics", "Business Statistics"],
//     "Arts_Stream": [
//       "Buddhism", "Hinduism", "Islam", "Christianity", "Buddhist Civilization", "Hindu Civilization", 
//       "Islam Civilization", "Christian Civilization", "Greek and Roman Civilization", "Sinhala", 
//       "Tamil", "English", "Pali", "Sanskrit", "Arabic", "Hindi", "Japanese", "Chinese", "Korean", 
//       "Malay", "French", "German", "Russian", "Political Science", "History", "Geography", "Logic", 
//       "Mass Media", "Dancing", "Music", "Drama", "Arts", "Home Science", "ICT"
//     ],
//     "Technology_Stream": ["Engineering Technology", "Science for Technology", "Bio-system Technology", "ICT"]
//   };

//   const [formData, setFormData] = useState({
//     schoolLeavingYear: "",
//     schoolLeavingGrade: "",
//     schoolName: "",
//     examResults: [
//       {
//         indexNumber: "",
//         examType: "",
//         attemptYear: "",
//         attempt: "",
//         stream: "", // Added stream field
//         academicDetailsId: 0,
//         subjectTable: [
//           {
//             subjectName: "",
//             subjectResults: "",
//           },
//         ],
//       },
//     ],
//   });

        

//   // Add errors state to track validation errors
//   const [errors, setErrors] = useState({
//     schoolLeavingYear: false,
//     schoolLeavingGrade: false,
//     schoolName: false,
//     examResults: [
//       {
//         examType: false,
//         indexNumber: false,
//         attemptYear: false,
//         attempt: false,
//         stream: false, // Added stream validation
//         subjectTable: [
//           {
//             subjectName: false,
//             subjectResults: false,
//           },
//         ],
//       },
//     ],
//   });

//   // Create refs for field navigation
//   const fieldRefs = useRef({});

//   useEffect(() => {
//     if (!parentData || Object.keys(parentData).length === 0) {
//       // Handle reset case - revert to initial state
//       setFormData({
//         schoolLeavingYear: "",
//         schoolLeavingGrade: "",
//         schoolName: "",
//         examResults: [
//           {
//             indexNumber: "",
//             examType: "",
//             attemptYear: "",
//             attempt: "",
//             stream: "", // Added stream field
//             academicDetailsId: 0,
//             subjectTable: [
//               {
//                 subjectName: "",
//                 subjectResults: "",
//               },
//             ],
//           },
//         ],
//       });
      
//       // Reset errors state too
//       setErrors({
//         schoolLeavingYear: false,
//         schoolLeavingGrade: false,
//         schoolName: false,
//         examResults: [
//           {
//             examType: false,
//             indexNumber: false,
//             attemptYear: false,
//             attempt: false,
//             stream: false, // Added stream field
//             subjectTable: [
//               {
//                 subjectName: false,
//                 subjectResults: false,
//               },
//             ],
//           },
//         ],
//       });
//       return;
//     }
    
//     // Regular update case (existing code)
//     if (JSON.stringify(formData) !== JSON.stringify(parentData)) {
//       setFormData(parentData);
      
//       // Initialize errors state based on the structure of parentData
//       const initialErrors = {
//         schoolLeavingYear: !parentData.schoolLeavingYear,
//         schoolLeavingGrade: !parentData.schoolLeavingGrade,
//         schoolName: !parentData.schoolName,
//         examResults: parentData.examResults.map(exam => ({
//           examType: !exam.examType,
//           indexNumber: false,
//           attemptYear: false,
//           attempt: false,
//           stream: false, // Added stream field
//           subjectTable: exam.subjectTable.map(subject => ({
//             subjectName: false,
//             subjectResults: false,
//           })),
//         })),
//       };
//       setErrors(initialErrors);
//     }
//   }, [parentData]);



//   useEffect(() => {
//     if (formData.examResults.some(exam => 
//         exam.subjectTable.some(subject => 
//           subject.subjectName === "Combined Mathematics" || 
//           subject.subjectName.includes("Combined")
//         )
//       )) {
//       console.log("Found Combined Mathematics in form data:", 
//         formData.examResults.map(exam => 
//           exam.subjectTable.filter(subject => 
//             subject.subjectName === "Combined Mathematics" || 
//             subject.subjectName.includes("Combined")
//           )
//         ).filter(arr => arr.length > 0)
//       );
//     }
//   }, [formData]);

//   // Only notify parent when form data changes due to user input, not from parent data changes
//   const updateParent = (updatedData) => {
//     // Only update parent if the data is actually different
//     if (JSON.stringify(updatedData) !== JSON.stringify(parentData)) {
//       setAcademicDetails(updatedData);
//     }
//   };

//   const validateField = (value, field, examIndex = null, subjectIndex = null) => {
//     let isValid = true;
//     // Determine which fields are required
//     if (field === "schoolLeavingYear" || field === "schoolLeavingGrade" || field === "schoolName") {
//       isValid = value.trim() !== "";
//     } else if (field === "examType" && examIndex !== null) {
//       isValid = value.trim() !== "";
//     } else if (field === "stream" && examIndex !== null) {
//       // Stream is required when examType is A/L
//       const examType = formData.examResults[examIndex].examType;
//       if (examType === "A/L") {
//         isValid = value.trim() !== "";
//       }
//     } else if (field === "subjectName" && examIndex !== null && subjectIndex !== null) {
//       // Subject name is required
//       const examType = formData.examResults[examIndex].examType;
//       if (examType === "A/L") {
//         isValid = value.trim() !== "";
//       }
//     }
    
//     // Update errors state
//     let updatedErrors = { ...errors };
//     if (examIndex !== null) {
//       if (subjectIndex !== null) {
//         updatedErrors.examResults[examIndex].subjectTable[subjectIndex][field] = !isValid;
//       } else {
//         updatedErrors.examResults[examIndex][field] = !isValid;
//       }
//     } else {
//       updatedErrors[field] = !isValid;
//     }
    
//     setErrors(updatedErrors);
//     return isValid;
//   };

//   const handleChange = (e, field, examIndex = null, subjectIndex = null) => {
//     const { value } = e.target;
//     let updatedFormData = { ...formData };

//     if (examIndex !== null) {
//       if (subjectIndex !== null) {
//         updatedFormData.examResults[examIndex].subjectTable[subjectIndex][field] = value;
//       } else {
//         updatedFormData.examResults[examIndex][field] = value;
        
//         // If changing exam type to A/L, make stream field required
//         if (field === "examType" && value === "A/L") {
//           updatedFormData.examResults[examIndex].stream = "";
          
//           // Clear subject table and start with empty subject when exam type changes to A/L
//           updatedFormData.examResults[examIndex].subjectTable = [
//             { subjectName: "", subjectResults: "" }
//           ];
//         } else if (field === "examType" && value !== "A/L") {
//           // If changing to O/L, clear stream
//           updatedFormData.examResults[examIndex].stream = "";
          
//           // Reset subject table for O/L
//           updatedFormData.examResults[examIndex].subjectTable = [
//             { subjectName: "", subjectResults: "" }
//           ];
//         }
        
//         // When stream changes, ensure we have at least one empty subject entry
//         if (field === "stream" && value !== "") {
//           // Start with one empty subject instead of pre-populating
//           if (updatedFormData.examResults[examIndex].subjectTable.length === 0) {
//             updatedFormData.examResults[examIndex].subjectTable = [
//               { subjectName: "", subjectResults: "" }
//             ];
//           }
//         }
//       }
//     } else {
//       updatedFormData[field] = value;
//     }

//     setFormData(updatedFormData);
//     // Validate the field
//     validateField(value, field, examIndex, subjectIndex);
//     // Update parent after user input
//     updateParent(updatedFormData);
//   };

//   const handleKeyDown = (e, nextFieldId, field, examIndex = null, subjectIndex = null) => {
//     if (e.key === 'Enter') {
//       e.preventDefault(); // Prevent form submission
      
//       // Get the current value to validate
//       let currentValue = "";
//       if (examIndex !== null) {
//         if (subjectIndex !== null) {
//           currentValue = formData.examResults[examIndex].subjectTable[subjectIndex][field];
//         } else {
//           currentValue = formData.examResults[examIndex][field];
//         }
//       } else {
//         currentValue = formData[field];
//       }
      
//       // Validate the current field
//       const isValid = validateField(currentValue, field, examIndex, subjectIndex);
      
//       // Focus the next field only if current field is valid
//       if (isValid && nextFieldId && fieldRefs.current[nextFieldId]) {
//         fieldRefs.current[nextFieldId].focus();
//       }
//     }
//   };

//   // Function to create unique field IDs
//   const getFieldId = (field, examIndex = null, subjectIndex = null) => {
//     if (examIndex !== null) {
//       if (subjectIndex !== null) {
//         return `exam_${examIndex}_subject_${subjectIndex}_${field}`;
//       }
//       return `exam_${examIndex}_${field}`;
//     }
//     return field;
//   };

//   // Function to check if a subject has already been selected
//   const isSubjectAlreadySelected = (examIndex, subjectName) => {
//     // Normalize strings for comparison (trim whitespace, consistent case)
//     const normalizedSubjectName = subjectName.trim();
//     return formData.examResults[examIndex].subjectTable.some(
//       subject => subject.subjectName.trim() === normalizedSubjectName
//     );
//   };

//   // Function to filter out already selected subjects
//   const getAvailableSubjects = (examIndex) => {
//     const exam = formData.examResults[examIndex];
//     if (!exam.stream) return [];
    
//     const allSubjects = streams[exam.stream] || [];
//     return allSubjects.filter(subject => 
//       !isSubjectAlreadySelected(examIndex, subject)
//     );
//   };


//   const addExam = () => {
//     const updatedFormData = {
//       ...formData,
//       examResults: [
//         ...formData.examResults,
//         {
//           indexNumber: "",
//           examType: "",
//           attemptYear: "",
//           attempt: "",
//           stream: "", // Added stream field
//           academicDetailsId: 0,
//           subjectTable: [{ subjectName: "", subjectResults: "" }],
//         },
//       ],
//     };
    
//     // Update errors structure for the new exam
//     const updatedErrors = {
//       ...errors,
//       examResults: [
//         ...errors.examResults,
//         {
//           examType: true, // Required field is empty initially
//           indexNumber: false,
//           attemptYear: false,
//           attempt: false,
//           stream: false, // Added stream field
//           subjectTable: [{ subjectName: false, subjectResults: false }],
//         },
//       ],
//     };
    
//     setFormData(updatedFormData);
//     setErrors(updatedErrors);
//     updateParent(updatedFormData);
//   };

//   const removeExam = (index) => {
//     const updatedExams = formData.examResults.filter((_, i) => i !== index);
//     const updatedExamErrors = errors.examResults.filter((_, i) => i !== index);
    
//     const updatedFormData = { ...formData, examResults: updatedExams };
//     const updatedErrors = { ...errors, examResults: updatedExamErrors };
    
//     setFormData(updatedFormData);
//     setErrors(updatedErrors);
//     updateParent(updatedFormData);
//   };

//   const addSubject = (examIndex) => {
//     const updatedExams = [...formData.examResults];
//     updatedExams[examIndex].subjectTable.push({ subjectName: "", subjectResults: "" });
    
//     const updatedExamErrors = [...errors.examResults];
//     updatedExamErrors[examIndex].subjectTable.push({ subjectName: false, subjectResults: false });
    
//     const updatedFormData = { ...formData, examResults: updatedExams };
//     const updatedErrors = { ...errors, examResults: updatedExamErrors };
    
//     setFormData(updatedFormData);
//     setErrors(updatedErrors);
//     updateParent(updatedFormData);
//   };

//   const removeSubject = (examIndex, subjectIndex) => {
//     const updatedExams = [...formData.examResults];
//     updatedExams[examIndex].subjectTable = updatedExams[examIndex].subjectTable.filter((_, i) => i !== subjectIndex);
    
//     const updatedExamErrors = [...errors.examResults];
//     updatedExamErrors[examIndex].subjectTable = updatedExamErrors[examIndex].subjectTable.filter((_, i) => i !== subjectIndex);
    
//     const updatedFormData = { ...formData, examResults: updatedExams };
//     const updatedErrors = { ...errors, examResults: updatedExamErrors };
    
//     setFormData(updatedFormData);
//     setErrors(updatedErrors);
//     updateParent(updatedFormData);
//   };

//   const isLastSubjectFilled = (examIndex) => {
//     const lastExam = formData.examResults[examIndex]; 
//     if (!lastExam || lastExam.subjectTable.length === 0) return false;
  
//     const lastSubject = lastExam.subjectTable[lastExam.subjectTable.length - 1];
//     return lastSubject.subjectName.trim() !== "" && lastSubject.subjectResults.trim() !== "";
//   };
  
//   return (
//     <ThemeProvider theme={textFieldTheme}>
//     <Grid item xs={11.7} container spacing={2} sx={{ ml: 0, mt: 4 }}>
//       <Typography 
//         sx={{ ml: 2, mt: 0 }} 
//         variant="h4" 
//         gutterBottom 
//         style={{ 
//           fontStyle: "italic", 
//           color: "#800020", 
//           fontFamily: 'Roboto, sans-serif', 
//           textAlign: 'left'
//         }}
//       >
//         Academic Qualification 
//       </Typography>

//       <Grid item xs={11.7} container spacing={1} sx={{ ml: 1 }}>
//         <Grid item xs={6}>
//           <TextField 
//             label="School Leaving Year"  
//             fullWidth 
//             value={formData.schoolLeavingYear} 
//             onChange={(e) => handleChange(e, "schoolLeavingYear")} 
//             onKeyDown={(e) => handleKeyDown(e, "schoolLeavingGrade", "schoolLeavingYear")}
//             inputRef={(el) => fieldRefs.current["schoolLeavingYear"] = el}
//             required
//             error={errors.schoolLeavingYear}
//             helperText={errors.schoolLeavingYear ? "School Leaving Year is required" : ""}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField 
//             label="School Leaving Grade" 
//             fullWidth 
//             value={formData.schoolLeavingGrade} 
//             onChange={(e) => handleChange(e, "schoolLeavingGrade")} 
//             onKeyDown={(e) => handleKeyDown(e, "schoolName", "schoolLeavingGrade")}
//             inputRef={(el) => fieldRefs.current["schoolLeavingGrade"] = el}
//             required 
//             error={errors.schoolLeavingGrade}
//             helperText={errors.schoolLeavingGrade ? "School Leaving Grade is required" : ""}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField 
//             label="School Name" 
//             fullWidth 
//             value={formData.schoolName} 
//             onChange={(e) => handleChange(e, "schoolName")}
//             onKeyDown={(e) => handleKeyDown(e, getFieldId("examType", 0), "schoolName")}
//             inputRef={(el) => fieldRefs.current["schoolName"] = el}
//             required
//             error={errors.schoolName}
//             helperText={errors.schoolName ? "School Name is required" : ""}
//           />
//         </Grid>
        
//         <Grid item xs={12} container spacing={2} sx={{ mt: 2 }}>
//            <Grid  
//             container 
//             alignItems="center" 
//             sx={{ 
//               ml: 2, 
//               mt: 2, 
//               backgroundColor: "#E0E0E0",
//               borderRadius: 1, 
//               boxShadow: 3,
//             }}       
//           >
//             <Grid>
//               <Typography
//                 sx={{ ml: 2, mt: 0 }}
//                 variant="h6"
//                 gutterBottom
//                 style={{
//                   fontStyle: "italic",
//                   color: "rgb(58, 53, 54)",
//                   fontFamily: "Roboto, sans-serif",
//                   textAlign: "left",
//                 }}
//               >
//                 Education Qualification
//               </Typography>
//             </Grid>
//           </Grid>
//           {formData.examResults.map((exam, examIndex) => (
//             <React.Fragment key={examIndex}>
//               <Grid item xs={11.8} sx={{ ml:2, mt: 2, borderBottom: "1px solid #ccc", pb: 2 }}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={3}>
//                     <TextField
//                       select 
//                       label="Exam Type" 
//                       fullWidth 
//                       value={exam.examType || ''} 
//                       onChange={(e) => handleChange(e, "examType", examIndex)}
//                       onKeyDown={(e) => {
//                         // Adjust next field based on exam type
//                         const nextField = e.target.value === "A/L" ? 
//                           getFieldId("stream", examIndex) : 
//                           getFieldId("indexNumber", examIndex);
//                         handleKeyDown(e, nextField, "examType", examIndex);
//                       }}
//                       inputRef={(el) => fieldRefs.current[getFieldId("examType", examIndex)] = el}
//                       required
//                       error={errors.examResults[examIndex]?.examType}
//                       helperText={errors.examResults[examIndex]?.examType ? "Exam Type is required" : ""}
//                     >
//                       <MenuItem value="O/L">G.C.E O/L</MenuItem>
//                       <MenuItem value="A/L">G.C.E A/L</MenuItem>
//                     </TextField>
//                   </Grid>
                  
//                   {/* Show Stream dropdown only for A/L */}
//                   {exam.examType === "A/L" && (
//                     <Grid item xs={3}>
//                       <TextField
//                         select 
//                         label="Stream" 
//                         fullWidth 
//                         value={exam.stream || ''} 
//                         onChange={(e) => handleChange(e, "stream", examIndex)}
//                         onKeyDown={(e) => handleKeyDown(e, getFieldId("indexNumber", examIndex), "stream", examIndex)}
//                         inputRef={(el) => fieldRefs.current[getFieldId("stream", examIndex)] = el}
//                         required
//                         error={errors.examResults[examIndex]?.stream}
//                         helperText={errors.examResults[examIndex]?.stream ? "Stream is required" : ""}
//                       >
//                         <MenuItem value="Maths_Stream">Maths Stream</MenuItem>
//                         <MenuItem value="Bio_Science_Stream">Bio Science Stream</MenuItem>
//                         <MenuItem value="Commerce_Stream">Commerce Stream</MenuItem>
//                         <MenuItem value="Arts_Stream">Arts Stream</MenuItem>
//                         <MenuItem value="Technology_Stream">Technology Stream</MenuItem>
//                       </TextField>
//                     </Grid>
//                   )}

//                   <Grid item xs={exam.examType === "A/L" ? 2 : 3}>
//                     <TextField 
//                       label="Index Number" 
//                       fullWidth 
//                       value={exam.indexNumber} 
//                       onChange={(e) => handleChange(e, "indexNumber", examIndex)}
//                       onKeyDown={(e) => handleKeyDown(e, getFieldId("attemptYear", examIndex), "indexNumber", examIndex)}
//                       inputRef={(el) => fieldRefs.current[getFieldId("indexNumber", examIndex)] = el}
//                     />
//                   </Grid>
//                   <Grid item xs={exam.examType === "A/L" ? 2 : 3}>
//                     <TextField 
//                       label="Attempt Year" 
//                       type="number" 
//                       fullWidth 
//                       value={exam.attemptYear} 
//                       onChange={(e) => handleChange(e, "attemptYear", examIndex)}
//                       onKeyDown={(e) => handleKeyDown(e, getFieldId("attempt", examIndex), "attemptYear", examIndex)}
//                       inputRef={(el) => fieldRefs.current[getFieldId("attemptYear", examIndex)] = el}
//                     />
//                   </Grid>
//                   <Grid item xs={exam.examType === "A/L" ? 2 : 3}>
//                     <TextField 
//                       select 
//                       label="Attempt" 
//                       fullWidth 
//                       value={exam.attempt || ''} 
//                       onChange={(e) => handleChange(e, "attempt", examIndex)}
//                       onKeyDown={(e) => handleKeyDown(e, getFieldId("subjectName", examIndex, 0), "attempt", examIndex)}
//                       inputRef={(el) => fieldRefs.current[getFieldId("attempt", examIndex)] = el}
//                     >
//                       <MenuItem value="01">01</MenuItem>
//                       <MenuItem value="02">02</MenuItem>
//                       <MenuItem value="03">03</MenuItem>
//                       <MenuItem value="04">04</MenuItem>
//                     </TextField>
//                   </Grid>
                  
//                   {exam.subjectTable.map((subject, subjectIndex) => (
//                     <React.Fragment key={subjectIndex}>
//                       <Grid item xs={5}>
//                         {/* For A/L with a selected stream, provide subject dropdown */}
//                         {exam.examType === "A/L" && exam.stream ? (
//                          <TextField 
//                          select
//                          label="Subject Name" 
//                          fullWidth 
//                          value={subject.subjectName || ''}
//                          onChange={(e) => handleChange(e, "subjectName", examIndex, subjectIndex)}
//                          onKeyDown={(e) => handleKeyDown(e, getFieldId("subjectResults", examIndex, subjectIndex), "subjectName", examIndex, subjectIndex)}
//                          inputRef={(el) => fieldRefs.current[getFieldId("subjectName", examIndex, subjectIndex)] = el}
//                          required={exam.examType === "A/L"}
//                          error={errors.examResults[examIndex]?.subjectTable[subjectIndex]?.subjectName}
//                          helperText={errors.examResults[examIndex]?.subjectTable[subjectIndex]?.subjectName ? "Subject is required" : ""}
//                          variant="standard"
//                        >
//                          {/* Default empty option */}
//                          <MenuItem value="">Select a subject</MenuItem>
                         
//                          {/* Always include the current value, even if it's not in the available list */}
//                          {subject.subjectName && 
//                           !getAvailableSubjects(examIndex).includes(subject.subjectName) && 
//                           subject.subjectName !== "" && (
//                            <MenuItem value={subject.subjectName}>{subject.subjectName}</MenuItem>
//                          )}
                         
//                          {/* Stream-specific subjects that haven't been selected yet */}
//                          {getAvailableSubjects(examIndex).map(availableSubject => (
//                            <MenuItem key={availableSubject} value={availableSubject}>
//                              {availableSubject}
//                            </MenuItem>
//                          ))}
//                        </TextField>
//                         ) : (
//                           // For O/L, keep regular text field
//                           <TextField 
//                             label="Subject Name" 
//                             fullWidth 
//                             value={subject.subjectName} 
//                             onChange={(e) => handleChange(e, "subjectName", examIndex, subjectIndex)} 
//                             onKeyDown={(e) => handleKeyDown(e, getFieldId("subjectResults", examIndex, subjectIndex), "subjectName", examIndex, subjectIndex)}
//                             inputRef={(el) => fieldRefs.current[getFieldId("subjectName", examIndex, subjectIndex)] = el}
//                             variant="standard"
//                           />
//                         )}
//                       </Grid>
//                       <Grid item xs={1.5}>
//                         <TextField 
//                           select 
//                           label="Result" 
//                           fullWidth 
//                           value={subject.subjectResults || ''} 
//                           onChange={(e) => handleChange(e, "subjectResults", examIndex, subjectIndex)}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') {
//                               e.preventDefault();
//                               // Validate current field
//                               const isValid = validateField(subject.subjectResults, "subjectResults", examIndex, subjectIndex);
                              
//                               if (!isValid) return;
                              
//                               if (subjectIndex === exam.subjectTable.length - 1 && isLastSubjectFilled(examIndex)) {
//                                 // Check if we still have available subjects for A/L
//                                 if (exam.examType === "A/L" && getAvailableSubjects(examIndex).length > 0) {
//                                   addSubject(examIndex);
//                                   // Will focus on the next subject name field after it's created
//                                   setTimeout(() => {
//                                     const nextId = getFieldId("subjectName", examIndex, subjectIndex + 1);
//                                     if (fieldRefs.current[nextId]) {
//                                       fieldRefs.current[nextId].focus();
//                                     }
//                                   }, 0);
//                                 } else if (exam.examType !== "A/L") {
//                                   // For O/L, always allow adding more subjects
//                                   addSubject(examIndex);
//                                   // Will focus on the next subject name field after it's created
//                                   setTimeout(() => {
//                                     const nextId = getFieldId("subjectName", examIndex, subjectIndex + 1);
//                                     if (fieldRefs.current[nextId]) {
//                                       fieldRefs.current[nextId].focus();
//                                     }
//                                   }, 0);
//                                 }
//                               } else if (subjectIndex < exam.subjectTable.length - 1) {
//                                 // If there's a next subject, focus on its name field
//                                 const nextId = getFieldId("subjectName", examIndex, subjectIndex + 1);
//                                 if (fieldRefs.current[nextId]) {
//                                   fieldRefs.current[nextId].focus();
//                                 }
//                               }
//                             }
//                           }}
//                           inputRef={(el) => fieldRefs.current[getFieldId("subjectResults", examIndex, subjectIndex)] = el}
//                           variant="standard"
//                         >
//                           <MenuItem value="A">A</MenuItem>
//                           <MenuItem value="B">B</MenuItem>
//                           <MenuItem value="C">C</MenuItem>
//                           <MenuItem value="D">D</MenuItem>
//                           <MenuItem value="F">F</MenuItem>
//                           <MenuItem value="S">S</MenuItem>
//                           <MenuItem value="W">W</MenuItem>
//                         </TextField>
//                       </Grid>
//                       <Grid item xs={2}>
//                         {/* Add Subject button - only show if more subjects available for A/L */}
//                         {((exam.examType === "A/L" && getAvailableSubjects(examIndex).length > 0) || 
//                           exam.examType !== "A/L") && (
//                           <IconButton 
//                             onClick={() => addSubject(examIndex)} 
//                             disabled={!isLastSubjectFilled(examIndex) || 
//                                      (exam.examType === "A/L" && getAvailableSubjects(examIndex).length === 0)}
//                           >
//                             <Add />
//                           </IconButton>
//                         )}

//                         {/* Remove Subject button */}
//                         {formData.examResults[examIndex]?.subjectTable?.length > 1 && (
//                           <IconButton onClick={() => removeSubject(examIndex, subjectIndex)}>
//                             <Delete />
//                           </IconButton>
//                         )}
//                       </Grid>
//                     </React.Fragment>
//                   ))}
                  
//                   <Grid item xs={12} sm={6}>
//                     {formData.examResults.length > 1 && (
//                       <Button 
//                         onClick={() => removeExam(examIndex)} 
//                         startIcon={<Delete />} 
//                         color="error"
//                       >
//                         Remove Exam
//                       </Button>
//                     )}
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </React.Fragment>
//           ))}
//         </Grid>
         
//         <Grid item xs={12} sm={2}>
//           <Button 
//             onClick={addExam} 
//             startIcon={<Add />} 
//             variant="text" 
//             color="primary"
//           >
//             Add Exam
//           </Button>
//         </Grid>
//       </Grid>
//     </Grid>
//     </ThemeProvider>
//   );
// };

// export default AcademicDetails;











import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import {
  TextField,
  Grid,
  Typography,
  Button,
  IconButton,
  MenuItem,
  FormHelperText
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
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

const AcademicDetails = forwardRef(({ setAcademicDetails, parentData }, ref) => {

  const OL_SUBJECTS = [
    { code: "11", label: "Buddhism" },
    { code: "12", label: "Saivanery" },
    { code: "14", label: "Catholicism" },
    { code: "15", label: "Christianity" },
    { code: "16", label: "Islam" },
    { code: "21", label: "Sinhala Language & Literature" },
    { code: "22", label: "Tamil Language & Literature" },
    { code: "31", label: "English Language" },
    { code: "32", label: "Mathematics" },
    { code: "33", label: "History" },
    { code: "34", label: "Science" },
    { code: "40", label: "Music (Oriental)" },
    { code: "41", label: "Music (Western)" },
    { code: "42", label: "Music (Carnatic)" },
    { code: "43", label: "Art" },
    { code: "44", label: "Dancing (Oriental)" },
    { code: "45", label: "Dancing (Bharata)" },
    { code: "46", label: "Appreciation of English Literary Texts" },
    { code: "47", label: "Appreciation of Sinhala Literary Texts" },
    { code: "48", label: "Appreciation of Tamil Literary Texts" },
    { code: "49", label: "Appreciation of Arabic Literary Texts" },
    { code: "50", label: "Drama and Theatre (Sinhala)" },
    { code: "51", label: "Drama and Theatre (Tamil)" },
    { code: "52", label: "Drama and Theatre (English)" },
    { code: "60", label: "Business & Accounting Studies" },
    { code: "61", label: "Geography" },
    { code: "62", label: "Civic Education" },
    { code: "63", label: "Entrepreneurship Studies" },
    { code: "64", label: "Second Language (Sinhala)" },
    { code: "65", label: "Second Language (Tamil)" },
    { code: "66", label: "Pali" },
    { code: "67", label: "Sanskrit" },
    { code: "68", label: "French" },
    { code: "69", label: "German" },
    { code: "70", label: "Hindi" },
    { code: "71", label: "Japanese" },
    { code: "72", label: "Arabic" },
    { code: "73", label: "Korean" },
    { code: "74", label: "Chinese" },
    { code: "75", label: "Russian" },
    { code: "80", label: "Information & Communication Technology" },
    { code: "81", label: "Agriculture & Food Technology" },
    { code: "82", label: "Aquatic Bioresources Technology" },
    { code: "84", label: "Art & Crafts" },
    { code: "85", label: "Home Economics" },
    { code: "86", label: "Health & Physical Education" },
    { code: "87", label: "Communication & Media Studies" },
    { code: "88", label: "Design & Construction Technology" },
    { code: "89", label: "Design & Mechanical Technology" },
    { code: "90", label: "Design, Electrical & Electronic Technology" },
    { code: "92", label: "Electronic Writing & Shorthand (Sinhala)" },
    { code: "93", label: "Electronic Writing & Shorthand (Tamil)" },
    { code: "94", label: "Electronic Writing & Shorthand (English)" }
  ];
  

  // Define the streams and subjects
  const streams = {
    "Maths": ["Combined Mathematics", "Physics", "Chemistry", "ICT"],
    "Bio Science": ["Biology", "Chemistry", "Physics", "Agricultural Science"],
    "Commerce": ["Business Studies", "Accounting", "Economics", "Business Statistics"],
    "Arts": [
      "Buddhism", "Hinduism", "Islam", "Christianity", "Buddhist Civilization", "Hindu Civilization", 
      "Islam Civilization", "Christian Civilization", "Greek and Roman Civilization", "Sinhala", 
      "Tamil", "English", "Pali", "Sanskrit", "Arabic", "Hindi", "Japanese", "Chinese", "Korean", 
      "Malay", "French", "German", "Russian", "Political Science", "History", "Geography", "Logic", 
      "Mass Media", "Dancing", "Music", "Drama", "Arts", "Home Science", "ICT"
    ],
    "Technology": ["Engineering Technology", "Science for Technology", "Bio-system Technology", "ICT"]
  };

  const [formData, setFormData] = useState({
    schoolLeavingYear: "",
    schoolLeavingGrade: "",
    examResults: [
      {
        indexNumber: "",
        examType: "",
        stream: "", 
        attemptYear: "",
        attempt: "",
       // Added stream field
        academicDetailsId: 0,
        subjectTable: [
          {
            subjectName: "",
            subjectResults: "",
          },
        ],
      },
    ],
  });


  useImperativeHandle(ref, () => ({
    validateForm: () => {
      let valid = true;
      const newErrors = {
        schoolLeavingYear: false,
        schoolLeavingGrade: false,
        examResults: []
      };

      if (!formData.schoolLeavingYear || !/^\d{4}$/.test(formData.schoolLeavingYear)) {
        newErrors.schoolLeavingYear = true;
        valid = false;
      }
      if (!formData.schoolLeavingGrade || parseInt(formData.schoolLeavingGrade) > 13) {
        newErrors.schoolLeavingGrade = true;
        valid = false;
      }

      // Loop through exams
      formData.examResults.forEach((exam, i) => {
        const examErrors = {
          examType: false,
          indexNumber: false,
          attemptYear: false,
          attempt: false,
          stream: false,
          subjectTable: []
        };

        if (!exam.examType) {
          examErrors.examType = true;
          valid = false;
        }

        if (exam.examType === 'A/L' && !exam.stream) {
          examErrors.stream = true;
          valid = false;
        }

        exam.subjectTable.forEach((subj, j) => {
          const subjectErrors = {
            subjectName: false,
            subjectResults: false
          };
          if (!subj.subjectName) {
            subjectErrors.subjectName = true;
            valid = false;
          }
          if (!subj.subjectResults) {
            subjectErrors.subjectResults = true;
            valid = false;
          }
          examErrors.subjectTable.push(subjectErrors);
        });

        newErrors.examResults.push(examErrors);
      });

      setErrors(newErrors);
      setShowErrors({
        schoolLeavingYear: !!newErrors.schoolLeavingYear,
        schoolLeavingGrade: !!newErrors.schoolLeavingGrade,
      });
      return valid;
    }
  }));
        

  // Add errors state to track validation errors
  const [errors, setErrors] = useState({
    schoolLeavingYear: false,
    schoolLeavingGrade: false,
    examResults: [
      {
        examType: false,
        indexNumber: false,
        attemptYear: false,
        attempt: false,
        stream: false, // Added stream validation
        subjectTable: [
          {
            subjectName: false,
            subjectResults: false,
          },
        ],
      },
    ],
  });

  const [showErrors, setShowErrors] = useState({
    schoolLeavingYear: false,
    schoolLeavingGrade: false,
    // similarly you could track exam fields in detail if needed
  });

  const [errorMessages, setErrorMessages] = useState({
    schoolLeavingYear: "",
    schoolLeavingGrade: "",
    // similarly for exam fields
  });

  // Create refs for field navigation
  const fieldRefs = useRef({});

  const fieldDependencies = {
    schoolLeavingGrade: ["schoolLeavingYear"],
    // Example: If examType depends on schoolName, you'd do:
    // "examResults[0].examType": ["schoolName"]
  };

  const topLevelFieldsOrder = ["schoolLeavingYear", "schoolLeavingGrade"];

  useEffect(() => {
    if (!parentData || Object.keys(parentData).length === 0) {
      // Handle reset case - revert to initial state
      setFormData({
        schoolLeavingYear: "",
        schoolLeavingGrade: "",
        examResults: [
          {
            indexNumber: "",
            examType: "",
            attemptYear: "",
            attempt: "",
            stream: "", // Added stream field
            academicDetailsId: 0,
            subjectTable: [
              {
                subjectName: "",
                subjectResults: "",
              },
            ],
          },
        ],
      });
      
      // Reset errors state too
      setErrors({
        schoolLeavingYear: false,
        schoolLeavingGrade: false,
        examResults: [
          {
            examType: false,
            indexNumber: false,
            attemptYear: false,
            attempt: false,
            stream: false, // Added stream field
            subjectTable: [
              {
                subjectName: false,
                subjectResults: false,
              },
            ],
          },
        ],
      });
      return;
    }
    
    // Regular update case (existing code)
    if (JSON.stringify(formData) !== JSON.stringify(parentData)) {
      setFormData(parentData);
      
      // Initialize errors state based on the structure of parentData
      const initialErrors = {
        schoolLeavingYear: !parentData.schoolLeavingYear,
        schoolLeavingGrade: !parentData.schoolLeavingGrade,
        examResults: parentData.examResults.map(exam => ({
          examType: !exam.examType,
          indexNumber: false,
          attemptYear: false,
          attempt: false,
          stream: false, // Added stream field
          subjectTable: exam.subjectTable.map(subject => ({
            subjectName: false,
            subjectResults: false,
          })),
        })),
      };
      setErrors(initialErrors);
    }
  }, [parentData]);



  useEffect(() => {
    if (formData.examResults.some(exam => 
        exam.subjectTable.some(subject => 
          subject.subjectName === "Combined Mathematics" || 
          subject.subjectName.includes("Combined")
        )
      )) {
      console.log("Found Combined Mathematics in form data:", 
        formData.examResults.map(exam => 
          exam.subjectTable.filter(subject => 
            subject.subjectName === "Combined Mathematics" || 
            subject.subjectName.includes("Combined")
          )
        ).filter(arr => arr.length > 0)
      );
    }
  }, [formData]);

  // Only notify parent when form data changes due to user input, not from parent data changes
  const updateParent = (updatedData) => {
    // Only update parent if the data is actually different
    if (JSON.stringify(updatedData) !== JSON.stringify(parentData)) {
      setAcademicDetails(updatedData);
    }
  };

  const validateField = (value, field, examIndex = null, subjectIndex = null) => {
    let isValid = true;
    let errorMsg = "";

      // If required, check if empty
      if (!value || value.trim() === "") {
        isValid = false;
        errorMsg = "This field is required.";
      }
    // Determine which fields are required
    if (field === "schoolLeavingYear") {
      const yearPattern = /^\d{4}$/;
      isValid = yearPattern.test(value.trim());
      errorMsg = isValid ? "" : "Enter a valid 4-digit year.";
    } else if (field === "schoolLeavingGrade") {
      const gradePattern = /^\d{1,2}$/;
      isValid = gradePattern.test(value.trim()) && parseInt(value) <= 13;
      errorMsg = isValid ? "" : "Enter a valid grade (1-13).";
    }
     else if (field === "examType" && examIndex !== null) {
      isValid = value.trim() !== "";
    } else if (field === "stream" && examIndex !== null) {
      // Stream is required when examType is A/L
      const examType = formData.examResults[examIndex].examType;
      if (examType === "A/L") {
        isValid = value.trim() !== "";
      }
    } else if (field === "subjectName" && examIndex !== null && subjectIndex !== null) {
      // Subject name is required
      const examType = formData.examResults[examIndex].examType;
      if (examType === "A/L") {
        isValid = value.trim() !== "";
      }
    }
    
    // Update errors state
    let updatedErrors = { ...errors };
    if (examIndex !== null) {
      if (subjectIndex !== null) {
        updatedErrors.examResults[examIndex].subjectTable[subjectIndex][field] = !isValid;
      } else {
        updatedErrors.examResults[examIndex][field] = !isValid;
      }
    } else {
      updatedErrors[field] = !isValid;
    }
    
    setErrors(updatedErrors);
    return isValid;
  };

  // Modify the handleChange function to handle nested exam fields
const handleChange = (e, fieldName, examIndex = null, subjectIndex = null) => {
  const { value } = e.target;
  
  if (examIndex !== null) {
    // Handle exam fields
    if (subjectIndex !== null) {
      // Handle subject fields
      const updatedExams = [...formData.examResults];
      updatedExams[examIndex].subjectTable[subjectIndex][fieldName] = value;
      
      const updatedFormData = { ...formData, examResults: updatedExams };
      setFormData(updatedFormData);
      updateParent(updatedFormData);
      
      // Clear errors for this field
      const updatedErrors = { ...errors };
      updatedErrors.examResults[examIndex].subjectTable[subjectIndex][fieldName] = false;
      setErrors(updatedErrors);
    } else {
      // Handle exam level fields (examType, stream, etc.)
      const updatedExams = [...formData.examResults];
      updatedExams[examIndex][fieldName] = value;
      
      const updatedFormData = { ...formData, examResults: updatedExams };
      setFormData(updatedFormData);
      updateParent(updatedFormData);
      
      // Clear errors for this field
      const updatedErrors = { ...errors };
      updatedErrors.examResults[examIndex][fieldName] = false;
      setErrors(updatedErrors);
    }
  } else {
    // Handle top-level fields (schoolName, etc.)
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value
    }));

    // clear old errors on this field
    setErrors((prev) => ({ ...prev, [fieldName]: false }));
    setShowErrors((prev) => ({ ...prev, [fieldName]: false }));
    setErrorMessages((prev) => ({ ...prev, [fieldName]: "" }));

    // notify parent
    setAcademicDetails({
      ...formData,
      [fieldName]: value
    });
  }
};
  const validateFieldDependencies = (fieldName) => {
    const deps = fieldDependencies[fieldName] || [];
    const missing = [];
    for (let dep of deps) {
      const depValue = formData[dep];
      if (!depValue || depValue.trim() === "") {
        missing.push(dep);
      }
    }
    return missing;
  };


  const handleFieldFocus = (fieldName) => {
    const missingDeps = validateFieldDependencies(fieldName);
    if (missingDeps.length > 0) {
      // Mark missing dependencies as errors
      const updatedErrors = { ...errors };
      const updatedShowErrors = { ...showErrors };
      const updatedErrorMessages = { ...errorMessages };

      missingDeps.forEach((depField) => {
        updatedErrors[depField] = true;
        updatedShowErrors[depField] = true;
        updatedErrorMessages[depField] = "Please fill this field first.";
      });

      setErrors(updatedErrors);
      setShowErrors(updatedShowErrors);
      setErrorMessages(updatedErrorMessages);

      // Force user back to the first missing dependency
      const firstMissing = missingDeps[0];
      if (fieldRefs.current[firstMissing]) {
        fieldRefs.current[firstMissing].focus();
      }
    }
  };

  const handleKeyDown = (e, currentField, nextField) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = formData[currentField];
      const { isValid, errorMsg } = validateField(value, currentField);
      
      if (!isValid) {
        // mark error for current field
        setErrors((prev) => ({ ...prev, [currentField]: true }));
        setShowErrors((prev) => ({ ...prev, [currentField]: true }));
        setErrorMessages((prev) => ({ ...prev, [currentField]: errorMsg }));
        // re-focus the same field
        if (fieldRefs.current[currentField]) {
          fieldRefs.current[currentField].focus();
        }
      } else {
        // Clear error on current field
        setErrors((prev) => ({ ...prev, [currentField]: false }));
        setShowErrors((prev) => ({ ...prev, [currentField]: false }));
        setErrorMessages((prev) => ({ ...prev, [currentField]: "" }));
        // Move to next field if specified
        if (nextField && fieldRefs.current[nextField]) {
          fieldRefs.current[nextField].focus();
        }
      }
    }
  };

  // Function to create unique field IDs
  const getFieldId = (field, examIndex = null, subjectIndex = null) => {
    if (examIndex !== null) {
      if (subjectIndex !== null) {
        return `exam_${examIndex}_subject_${subjectIndex}_${field}`;
      }
      return `exam_${examIndex}_${field}`;
    }
    return field;
  };

  // Function to check if a subject has already been selected
  const isSubjectAlreadySelected = (examIndex, subjectName) => {
    // Normalize strings for comparison (trim whitespace, consistent case)
    const normalizedSubjectName = subjectName.trim();
    return formData.examResults[examIndex].subjectTable.some(
      subject => subject.subjectName.trim() === normalizedSubjectName
    );
  };

  // Function to filter out already selected subjects
  const getAvailableSubjects = (examIndex) => {
    const exam = formData.examResults[examIndex];
    if (!exam.stream) return [];
    
    const allSubjects = streams[exam.stream] || [];
    return allSubjects.filter(subject => 
      !isSubjectAlreadySelected(examIndex, subject)
    );
  };


  const addExam = () => {
    const updatedFormData = {
      ...formData,
      examResults: [
        ...formData.examResults,
        {
          indexNumber: "",
          examType: "",
          attemptYear: "",
          attempt: "",
          stream: "", // Added stream field
          academicDetailsId: 0,
          subjectTable: [{ subjectName: "", subjectResults: "" }],
        },
      ],
    };
    
    // Update errors structure for the new exam
    const updatedErrors = {
      ...errors,
      examResults: [
        ...errors.examResults,
        {
          examType: true, // Required field is empty initially
          indexNumber: false,
          attemptYear: false,
          attempt: false,
          stream: false, // Added stream field
          subjectTable: [{ subjectName: false, subjectResults: false }],
        },
      ],
    };
    
    setFormData(updatedFormData);
    setErrors(updatedErrors);
    updateParent(updatedFormData);
  };

  const removeExam = (index) => {
    const updatedExams = formData.examResults.filter((_, i) => i !== index);
    const updatedExamErrors = errors.examResults.filter((_, i) => i !== index);
    
    const updatedFormData = { ...formData, examResults: updatedExams };
    const updatedErrors = { ...errors, examResults: updatedExamErrors };
    
    setFormData(updatedFormData);
    setErrors(updatedErrors);
    updateParent(updatedFormData);
  };

  const addSubject = (examIndex) => {
    const updatedExams = [...formData.examResults];
    updatedExams[examIndex].subjectTable.push({ subjectName: "", subjectResults: "" });
    
    const updatedExamErrors = [...errors.examResults];
    updatedExamErrors[examIndex].subjectTable.push({ subjectName: false, subjectResults: false });
    
    const updatedFormData = { ...formData, examResults: updatedExams };
    const updatedErrors = { ...errors, examResults: updatedExamErrors };
    
    setFormData(updatedFormData);
    setErrors(updatedErrors);
    updateParent(updatedFormData);
  };

  const removeSubject = (examIndex, subjectIndex) => {
    const updatedExams = [...formData.examResults];
    updatedExams[examIndex].subjectTable = updatedExams[examIndex].subjectTable.filter((_, i) => i !== subjectIndex);
    
    const updatedExamErrors = [...errors.examResults];
    updatedExamErrors[examIndex].subjectTable = updatedExamErrors[examIndex].subjectTable.filter((_, i) => i !== subjectIndex);
    
    const updatedFormData = { ...formData, examResults: updatedExams };
    const updatedErrors = { ...errors, examResults: updatedExamErrors };
    
    setFormData(updatedFormData);
    setErrors(updatedErrors);
    updateParent(updatedFormData);
  };

  const isLastSubjectFilled = (examIndex) => {
    const lastExam = formData.examResults[examIndex]; 
    if (!lastExam || lastExam.subjectTable.length === 0) return false;
  
    const lastSubject = lastExam.subjectTable[lastExam.subjectTable.length - 1];
    return lastSubject.subjectName.trim() !== "" && lastSubject.subjectResults.trim() !== "";
  };
  
  return (
    <ThemeProvider theme={textFieldTheme}>
    <Grid item xs={11.7} container spacing={2} sx={{ ml: 0, mt: 4 }}>
      <Typography 
        sx={{ ml: 2, mt: 0 }} 
        variant="h4" 
        gutterBottom 
        style={{ 
          fontStyle: "italic", 
          color: "#800020", 
          fontFamily: 'Roboto, sans-serif', 
          textAlign: 'left'
        }}
      >
        Academic Qualification 
      </Typography>

      <Grid item xs={11.7} container spacing={1} sx={{ ml: 1 }}>
        <Grid item xs={6}>
        <TextField
            label="School Leaving Year"
            fullWidth
            value={formData.schoolLeavingYear}
            inputRef={(el) => (fieldRefs.current["schoolLeavingYear"] = el)}
            onFocus={() => handleFieldFocus("schoolLeavingYear")}
            onKeyDown={(e) => handleKeyDown(e, "schoolLeavingYear", "schoolLeavingGrade")}
            onChange={(e) => handleChange(e, "schoolLeavingYear")}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
            }}
            error={errors.schoolLeavingYear && showErrors.schoolLeavingYear}
            helperText={showErrors.schoolLeavingYear ? errorMessages.schoolLeavingYear : ""}
          />

        </Grid>
        <Grid item xs={6}>
        <TextField
            label="School Leaving Grade"
            fullWidth
            value={formData.schoolLeavingGrade}
            inputRef={(el) => (fieldRefs.current["schoolLeavingGrade"] = el)}
            onFocus={() => handleFieldFocus("schoolLeavingGrade")}
            onKeyDown={(e) => handleKeyDown(e, "schoolLeavingGrade", "schoolName")}
            onChange={(e) => handleChange(e, "schoolLeavingGrade")}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "").slice(0, 2);
            }}
            error={errors.schoolLeavingGrade && showErrors.schoolLeavingGrade}
            helperText={showErrors.schoolLeavingGrade ? errorMessages.schoolLeavingGrade : ""}
          />

        </Grid>
        
        <Grid item xs={12} container spacing={2} sx={{ mt: 2 }}>
           <Grid  
            container 
            alignItems="center" 
            sx={{ 
              ml: 2, 
              mt: 2, 
              backgroundColor: "#E0E0E0",
              borderRadius: 1, 
              boxShadow: 3,
            }}       
          >
            <Grid>
              <Typography
                sx={{ ml: 2, mt: 0 }}
                variant="h6"
                gutterBottom
                style={{
                  fontStyle: "italic",
                  color: "rgb(58, 53, 54)",
                  fontFamily: "Roboto, sans-serif",
                  textAlign: "left",
                }}
              >
                Education Qualification
              </Typography>
            </Grid>
          </Grid>
          {formData.examResults.map((exam, examIndex) => (
            <React.Fragment key={examIndex}>
              <Grid item xs={11.8} sx={{ ml:2, mt: 2, borderBottom: "1px solid #ccc", pb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                  <TextField
                    select 
                    label="Exam Type" 
                    fullWidth 
                    value={exam.examType || ''} 
                    onChange={(e) => handleChange(e, "examType", examIndex)}
                    onKeyDown={(e) => {
                      const nextField = e.target.value === "A/L" ? 
                        getFieldId("stream", examIndex) : 
                        getFieldId("indexNumber", examIndex);
                      handleKeyDown(e, nextField, "examType", examIndex);
                    }}
                    inputRef={(el) => fieldRefs.current[getFieldId("examType", examIndex)] = el}
                    required
                    disabled={!formData.schoolLeavingGrade || parseInt(formData.schoolLeavingGrade) < 10}
                    error={
                      parseInt(formData.schoolLeavingGrade) >= 10 &&
                      errors.examResults[examIndex]?.examType
                    }
                    helperText={
                      parseInt(formData.schoolLeavingGrade) >= 10 &&
                      errors.examResults[examIndex]?.examType
                        ? "Exam Type is required"
                        : ""
                    }
                  >
                    <MenuItem value="O/L">G.C.E O/L</MenuItem>
                    <MenuItem value="A/L">G.C.E A/L</MenuItem>
                  </TextField>

                  </Grid>
                  
                  {/* Show Stream dropdown only for A/L */}
                  {exam.examType === "A/L" && (
                    <Grid item xs={3}>
                      <TextField
                        select 
                        label="Stream" 
                        fullWidth 
                        value={exam.stream || ''} 
                        onChange={(e) => handleChange(e, "stream", examIndex)}
                        onKeyDown={(e) => handleKeyDown(e, getFieldId("indexNumber", examIndex), "stream", examIndex)}
                        inputRef={(el) => fieldRefs.current[getFieldId("stream", examIndex)] = el}
                        required
                        error={errors.examResults[examIndex]?.stream}
                        helperText={errors.examResults[examIndex]?.stream ? "Stream is required" : ""}
                      >
                         <MenuItem value="Maths">Maths Stream</MenuItem>
                          <MenuItem value="Bio Science">Bio Science Stream</MenuItem>
                          <MenuItem value="Commerce">Commerce Stream</MenuItem>
                          <MenuItem value="Arts">Arts Stream</MenuItem>
                          <MenuItem value="Technology">Technology Stream</MenuItem>
                      </TextField>
                    </Grid>
                  )}

                  <Grid item xs={exam.examType === "A/L" ? 2 : 3}>
                    <TextField 
                      label="Index Number" 
                      fullWidth 
                      value={exam.indexNumber} 
                      onChange={(e) => handleChange(e, "indexNumber", examIndex)}
                      onKeyDown={(e) => handleKeyDown(e, getFieldId("attemptYear", examIndex), "indexNumber", examIndex)}
                      inputRef={(el) => fieldRefs.current[getFieldId("indexNumber", examIndex)] = el}
                      disabled={!exam.examType}
                    />
                  </Grid>
                  <Grid item xs={exam.examType === "A/L" ? 2 : 3}>
                    <TextField 
                      label="Attempt Year" 
                      type="number" 
                      fullWidth 
                      value={exam.attemptYear} 
                      onChange={(e) => handleChange(e, "attemptYear", examIndex)}
                      onKeyDown={(e) => handleKeyDown(e, getFieldId("attempt", examIndex), "attemptYear", examIndex)}
                      inputRef={(el) => fieldRefs.current[getFieldId("attemptYear", examIndex)] = el}
                      disabled={!exam.indexNumber}
                    />
                  </Grid>
                  <Grid item xs={exam.examType === "A/L" ? 2 : 3}>
                    <TextField 
                      select 
                      label="Attempt" 
                      fullWidth 
                      value={exam.attempt || ''} 
                      onChange={(e) => handleChange(e, "attempt", examIndex)}
                      onKeyDown={(e) => handleKeyDown(e, getFieldId("subjectName", examIndex, 0), "attempt", examIndex)}
                      inputRef={(el) => fieldRefs.current[getFieldId("attempt", examIndex)] = el}
                      disabled={!exam.attemptYear}
                    >
                      <MenuItem value="01">01</MenuItem>
                      <MenuItem value="02">02</MenuItem>
                      <MenuItem value="03">03</MenuItem>
                      <MenuItem value="04">04</MenuItem>
                    </TextField>
                  </Grid>
                  
                  {exam.subjectTable.map((subject, subjectIndex) => (
                    <React.Fragment key={subjectIndex}>
                      <Grid item xs={5}>
                        {/* For A/L with a selected stream, provide subject dropdown */}
                        {exam.examType === "A/L" && exam.stream ? (
  // A/L subject dropdown based on stream
  <TextField 
    select
    label="Subject Name" 
    fullWidth 
    value={subject.subjectName || ''}
    onChange={(e) => handleChange(e, "subjectName", examIndex, subjectIndex)}
    onKeyDown={(e) => handleKeyDown(e, getFieldId("subjectResults", examIndex, subjectIndex), "subjectName", examIndex, subjectIndex)}
    inputRef={(el) => fieldRefs.current[getFieldId("subjectName", examIndex, subjectIndex)] = el}
    required
    variant="standard"
    error={errors.examResults[examIndex]?.subjectTable[subjectIndex]?.subjectName}
    helperText={errors.examResults[examIndex]?.subjectTable[subjectIndex]?.subjectName ? "Subject is required" : ""}
  >
    <MenuItem value="">Select a subject</MenuItem>
    {subject.subjectName && !getAvailableSubjects(examIndex).includes(subject.subjectName) && (
      <MenuItem value={subject.subjectName}>{subject.subjectName}</MenuItem>
    )}
    {getAvailableSubjects(examIndex).map(sub => (
      <MenuItem key={sub} value={sub}>{sub}</MenuItem>
    ))}
  </TextField>
) : exam.examType === "O/L" ? (
  // O/L subject dropdown
  <TextField 
    select
    label="Subject Name" 
    fullWidth 
    value={subject.subjectName || ''}
    onChange={(e) => handleChange(e, "subjectName", examIndex, subjectIndex)}
    onKeyDown={(e) => handleKeyDown(e, getFieldId("subjectResults", examIndex, subjectIndex), "subjectName", examIndex, subjectIndex)}
    inputRef={(el) => fieldRefs.current[getFieldId("subjectName", examIndex, subjectIndex)] = el}
    required
    variant="standard"
    error={errors.examResults[examIndex]?.subjectTable[subjectIndex]?.subjectName}
    helperText={errors.examResults[examIndex]?.subjectTable[subjectIndex]?.subjectName ? "Subject is required" : ""}
  >
    <MenuItem value="">Select a subject</MenuItem>
    {OL_SUBJECTS.map(s => (
      <MenuItem key={s.code} value={s.label}>{s.label}</MenuItem>
    ))}
  </TextField>
) : (
  // Default input when examType not selected yet
  <TextField 
    label="Subject Name" 
    fullWidth 
    value={subject.subjectName} 
    onChange={(e) => handleChange(e, "subjectName", examIndex, subjectIndex)} 
    onKeyDown={(e) => handleKeyDown(e, getFieldId("subjectResults", examIndex, subjectIndex), "subjectName", examIndex, subjectIndex)}
    inputRef={(el) => fieldRefs.current[getFieldId("subjectName", examIndex, subjectIndex)] = el}
    variant="standard"
  />
)}

                      </Grid>
                      <Grid item xs={1.5}>
                        <TextField 
                          select 
                          label="Result" 
                          fullWidth 
                          value={subject.subjectResults || ''} 
                          onChange={(e) => handleChange(e, "subjectResults", examIndex, subjectIndex)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              // Validate current field
                              const isValid = validateField(subject.subjectResults, "subjectResults", examIndex, subjectIndex);
                              
                              if (!isValid) return;
                              
                              if (subjectIndex === exam.subjectTable.length - 1 && isLastSubjectFilled(examIndex)) {
                                // Check if we still have available subjects for A/L
                                if (exam.examType === "A/L" && getAvailableSubjects(examIndex).length > 0) {
                                  addSubject(examIndex);
                                  // Will focus on the next subject name field after it's created
                                  setTimeout(() => {
                                    const nextId = getFieldId("subjectName", examIndex, subjectIndex + 1);
                                    if (fieldRefs.current[nextId]) {
                                      fieldRefs.current[nextId].focus();
                                    }
                                  }, 0);
                                } else if (exam.examType !== "A/L") {
                                  // For O/L, always allow adding more subjects
                                  addSubject(examIndex);
                                  // Will focus on the next subject name field after it's created
                                  setTimeout(() => {
                                    const nextId = getFieldId("subjectName", examIndex, subjectIndex + 1);
                                    if (fieldRefs.current[nextId]) {
                                      fieldRefs.current[nextId].focus();
                                    }
                                  }, 0);
                                }
                              } else if (subjectIndex < exam.subjectTable.length - 1) {
                                // If there's a next subject, focus on its name field
                                const nextId = getFieldId("subjectName", examIndex, subjectIndex + 1);
                                if (fieldRefs.current[nextId]) {
                                  fieldRefs.current[nextId].focus();
                                }
                              }
                            }
                          }}
                          inputRef={(el) => fieldRefs.current[getFieldId("subjectResults", examIndex, subjectIndex)] = el}
                          variant="standard"
                        >
                          <MenuItem value="A">A</MenuItem>
                          <MenuItem value="B">B</MenuItem>
                          <MenuItem value="C">C</MenuItem>
                          <MenuItem value="D">D</MenuItem>
                          <MenuItem value="F">F</MenuItem>
                          <MenuItem value="S">S</MenuItem>
                          <MenuItem value="W">W</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={2}>
                        {/* Add Subject button - only show if more subjects available for A/L */}
                        {((exam.examType === "A/L" && getAvailableSubjects(examIndex).length > 0) || 
                          exam.examType !== "A/L") && (
                          <IconButton 
                            onClick={() => addSubject(examIndex)} 
                            disabled={!isLastSubjectFilled(examIndex) || 
                                     (exam.examType === "A/L" && getAvailableSubjects(examIndex).length === 0)}
                          >
                            <Add />
                          </IconButton>
                        )}

                        {/* Remove Subject button */}
                        {formData.examResults[examIndex]?.subjectTable?.length > 1 && (
                          <IconButton onClick={() => removeSubject(examIndex, subjectIndex)}>
                            <Delete />
                          </IconButton>
                        )}
                      </Grid>
                    </React.Fragment>
                  ))}
                  
                  <Grid item xs={12} sm={6}>
                    {formData.examResults.length > 1 && (
                      <Button 
                        onClick={() => removeExam(examIndex)} 
                        startIcon={<Delete />} 
                        color="error"
                      >
                        Remove Exam
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
         
        <Grid item xs={12} sm={2}>
          <Button 
            onClick={addExam} 
            startIcon={<Add />} 
            variant="text" 
            color="primary"
          >
            Add Exam
          </Button>
        </Grid>
      </Grid>
    </Grid>
    </ThemeProvider>
  );
});

export default AcademicDetails;