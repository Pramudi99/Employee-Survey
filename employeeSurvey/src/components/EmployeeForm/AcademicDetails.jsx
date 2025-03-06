// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   Grid,
//   Typography,
//   Paper,
//   Button,
//   IconButton,
//   MenuItem
// } from "@mui/material";
// import { Add, Delete } from "@mui/icons-material";

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

//   // When parentData changes, update the form data
//   useEffect(() => {
//     if (parentData && Object.keys(parentData).length > 0) {
//       // Prevent infinite loops by checking if data is actually different
//       if (JSON.stringify(formData) !== JSON.stringify(parentData)) {
//         setFormData(parentData);
//       }
//     }
//   }, [parentData]);

//   // Only notify parent when form data changes due to user input, not from parent data changes
//   const updateParent = (updatedData) => {
//     // Only update parent if the data is actually different
//     if (JSON.stringify(updatedData) !== JSON.stringify(parentData)) {
//       setAcademicDetails(updatedData);
//     }
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
//     // Update parent after user input
//     updateParent(updatedFormData);
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
//     setFormData(updatedFormData);
//     updateParent(updatedFormData);
//   };

//   const removeExam = (index) => {
//     const updatedExams = formData.examResults.filter((_, i) => i !== index);
//     const updatedFormData = { ...formData, examResults: updatedExams };
//     setFormData(updatedFormData);
//     updateParent(updatedFormData);
//   };

//   const addSubject = (examIndex) => {
//     const updatedExams = [...formData.examResults];
//     updatedExams[examIndex].subjectTable.push({ subjectName: "", subjectResults: "" });
//     const updatedFormData = { ...formData, examResults: updatedExams };
//     setFormData(updatedFormData);
//     updateParent(updatedFormData);
//   };

//   const removeSubject = (examIndex, subjectIndex) => {
//     const updatedExams = [...formData.examResults];
//     updatedExams[examIndex].subjectTable = updatedExams[examIndex].subjectTable.filter((_, i) => i !== subjectIndex);
//     const updatedFormData = { ...formData, examResults: updatedExams };
//     setFormData(updatedFormData);
//     updateParent(updatedFormData);
//   };

//   const isLastSubjectFilled = (examIndex) => {
//     const lastExam = formData.examResults[examIndex]; 
//     if (!lastExam || lastExam.subjectTable.length === 0) return false;
  
//     const lastSubject = lastExam.subjectTable[lastExam.subjectTable.length - 1];
//     return lastSubject.subjectName.trim() !== "" && lastSubject.subjectResults.trim() !== "";
//   };
  
//   return (
//     <Grid item xs={11.7} container spacing={2}  sx={{ ml: 0, mt: 4 }}>
//       <Typography 
//         sx={{ ml: 2, mt: 0 }} 
//         variant="h4" 
//         gutterBottom 
//         style={{ 
//           fontStyle: "italic", 
//           color: "rgb(129, 43, 57)", 
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
//             required
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField 
//             label="School Leaving Grade" 
//             fullWidth 
//             value={formData.schoolLeavingGrade} 
//             onChange={(e) => handleChange(e, "schoolLeavingGrade")} 
//             required 
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField 
//             label="School Name" 
//             fullWidth 
//             value={formData.schoolName} 
//             onChange={(e) => handleChange(e, "schoolName")} 
//             required
//           />
//         </Grid>
        

//         <Grid>
//         <Typography>
//         <Grid item xs={12} container spacing={2} sx={{ mt: 2}}>
//           {formData.examResults.map((exam, examIndex) => (
//             <React.Fragment key={examIndex}>
//               <Grid item xs={11.8} sx={{ ml:2, mt: 4, borderBottom: "1px solid #ccc", pb: 2 }}>
//               <Grid container spacing={2}>
//               <Grid item xs={3}>
//                 <TextField
//                   select label="Exam Type" 
//                   fullWidth 
//                   value={exam.examType} 
//                   onChange={(e) => handleChange(e, "examType", examIndex)} >
//                     <MenuItem value="O/L">G.C.E O/L</MenuItem>
//                     <MenuItem value="A/L">G.C.E A/L</MenuItem>
//                 </TextField>
//               </Grid>
//               <Grid item xs={3}>
//                 <TextField 
//                   label="Index Number" 
//                   fullWidth 
//                   value={exam.indexNumber} 
//                   onChange={(e) => handleChange(e, "indexNumber", examIndex)} 
//                 />
//               </Grid>
//               <Grid item xs={3}>
//                 <TextField 
//                   label="Attempt Year" 
//                   type="number" 
//                   fullWidth 
//                   value={exam.attemptYear} 
//                   onChange={(e) => handleChange(e, "attemptYear", examIndex)} 
//                 />
//               </Grid>
//               <Grid item xs={3}>
//                 <TextField 
//                   select label="Attempt" 
//                   type="number" 
//                   fullWidth 
//                   value={exam.attempt} 
//                   onChange={(e) => handleChange(e, "attempt", examIndex)} 
//                 >
//                    <MenuItem value="01">01</MenuItem>
//                     <MenuItem value="02">02</MenuItem>
//                     <MenuItem value="03">03</MenuItem>
//                     <MenuItem value="04">04</MenuItem>
//                 </TextField>
//               </Grid>
              
//               {exam.subjectTable.map((subject, subjectIndex) => (
//                 <React.Fragment key={subjectIndex}>
//                   <Grid item xs={5}>
//                     <TextField 
//                       label="Subject Name" 
//                       fullWidth 
//                       value={subject.subjectName} 
//                       onChange={(e) => handleChange(e, "subjectName", examIndex, subjectIndex)} 
//                       variant="standard"
//                     />
//                   </Grid>
//                   <Grid item xs={1.5}>
//                     <TextField 
//                        select label="Result" 
//                       fullWidth 
//                       value={subject.subjectResults} 
//                       onChange={(e) => handleChange(e, "subjectResults", examIndex, subjectIndex)} 
//                       variant="standard"
//                       >
//                       <MenuItem value="A">A</MenuItem>
//                        <MenuItem value="B">B</MenuItem>
//                        <MenuItem value="C">C</MenuItem>
//                        <MenuItem value="D">D</MenuItem>
//                        <MenuItem value="F">F</MenuItem>
//                        <MenuItem value="S">S</MenuItem>
//                        <MenuItem value="W">W</MenuItem>

//                    </TextField>
//                   </Grid>
//                   <Grid item xs={2}>
//                     <IconButton 
//                       onClick={() => addSubject(examIndex)} 
//                       disabled={!isLastSubjectFilled(examIndex)}
//                     >
//                       <Add />
//                     </IconButton>

//                     {formData.examResults[examIndex]?.subjectTable?.length > 1 && (
//                       <IconButton onClick={() => removeSubject(examIndex, subjectIndex)}>
//                         <Delete />
//                       </IconButton>
//                     )}
//                   </Grid>
//                 </React.Fragment>

                
//               ))}
              
//               <Grid item xs={12} sm={6}>
//                 {formData.examResults.length > 1 && (
//                   <Button 
//                     onClick={() => removeExam(examIndex)} 
//                     startIcon={<Delete />} 
//                     color="error"
//                   >
//                     Remove Exam
//                   </Button>
//                 )}
//               </Grid>
//               </Grid>
//               </Grid>
//             </React.Fragment>
//           ))}
          
//            </Grid>
//           </Typography>
         
//           <Grid item xs={12} sm={2}>
//             <Button 
//               onClick={addExam} 
//               startIcon={<Add />} 
//               variant="text" 
//               color="primary"
//             >
//               Add Exam
//             </Button>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default AcademicDetails;









// import React, { useState, useEffect, useRef } from "react";
// import {
//   TextField,
//   Grid,
//   Typography,
//   Paper,
//   Button,
//   IconButton,
//   MenuItem
// } from "@mui/material";
// import { Add, Delete } from "@mui/icons-material";

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

//   // Create refs for field navigation
//   const fieldRefs = useRef({});

//   // When parentData changes, update the form data
//   useEffect(() => {
//     if (parentData && Object.keys(parentData).length > 0) {
//       // Prevent infinite loops by checking if data is actually different
//       if (JSON.stringify(formData) !== JSON.stringify(parentData)) {
//         setFormData(parentData);
//       }
//     }
//   }, [parentData]);

//   // Only notify parent when form data changes due to user input, not from parent data changes
//   const updateParent = (updatedData) => {
//     // Only update parent if the data is actually different
//     if (JSON.stringify(updatedData) !== JSON.stringify(parentData)) {
//       setAcademicDetails(updatedData);
//     }
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
//     // Update parent after user input
//     updateParent(updatedFormData);
//   };

//   const handleKeyDown = (e, nextFieldId) => {
//     if (e.key === 'Enter') {
//       e.preventDefault(); // Prevent form submission
//       // Focus the next field if it exists
//       if (nextFieldId && fieldRefs.current[nextFieldId]) {
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
//     setFormData(updatedFormData);
//     updateParent(updatedFormData);
//   };

//   const removeExam = (index) => {
//     const updatedExams = formData.examResults.filter((_, i) => i !== index);
//     const updatedFormData = { ...formData, examResults: updatedExams };
//     setFormData(updatedFormData);
//     updateParent(updatedFormData);
//   };

//   const addSubject = (examIndex) => {
//     const updatedExams = [...formData.examResults];
//     updatedExams[examIndex].subjectTable.push({ subjectName: "", subjectResults: "" });
//     const updatedFormData = { ...formData, examResults: updatedExams };
//     setFormData(updatedFormData);
//     updateParent(updatedFormData);
//   };

//   const removeSubject = (examIndex, subjectIndex) => {
//     const updatedExams = [...formData.examResults];
//     updatedExams[examIndex].subjectTable = updatedExams[examIndex].subjectTable.filter((_, i) => i !== subjectIndex);
//     const updatedFormData = { ...formData, examResults: updatedExams };
//     setFormData(updatedFormData);
//     updateParent(updatedFormData);
//   };

//   const isLastSubjectFilled = (examIndex) => {
//     const lastExam = formData.examResults[examIndex]; 
//     if (!lastExam || lastExam.subjectTable.length === 0) return false;
  
//     const lastSubject = lastExam.subjectTable[lastExam.subjectTable.length - 1];
//     return lastSubject.subjectName.trim() !== "" && lastSubject.subjectResults.trim() !== "";
//   };
  
//   return (
//     <Grid item xs={11.7} container spacing={2} sx={{ ml: 0, mt: 4 }}>
//       <Typography 
//         sx={{ ml: 2, mt: 0 }} 
//         variant="h4" 
//         gutterBottom 
//         style={{ 
//           fontStyle: "italic", 
//           color: "rgb(129, 43, 57)", 
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
//             onKeyDown={(e) => handleKeyDown(e, "schoolLeavingGrade")}
//             inputRef={(el) => fieldRefs.current["schoolLeavingYear"] = el}
//             required
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField 
//             label="School Leaving Grade" 
//             fullWidth 
//             value={formData.schoolLeavingGrade} 
//             onChange={(e) => handleChange(e, "schoolLeavingGrade")} 
//             onKeyDown={(e) => handleKeyDown(e, "schoolName")}
//             inputRef={(el) => fieldRefs.current["schoolLeavingGrade"] = el}
//             required 
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField 
//             label="School Name" 
//             fullWidth 
//             value={formData.schoolName} 
//             onChange={(e) => handleChange(e, "schoolName")}
//             onKeyDown={(e) => handleKeyDown(e, getFieldId("examType", 0))}
//             inputRef={(el) => fieldRefs.current["schoolName"] = el}
//             required
//           />
//         </Grid>
        
//         <Grid>
//         <Typography>
//         <Grid item xs={12} container spacing={2} sx={{ mt: 2}}>
//           {formData.examResults.map((exam, examIndex) => (
//             <React.Fragment key={examIndex}>
//               <Grid item xs={11.8} sx={{ ml:2, mt: 4, borderBottom: "1px solid #ccc", pb: 2 }}>
//               <Grid container spacing={2}>
//               <Grid item xs={3}>
//                 <TextField
//                   select 
//                   label="Exam Type" 
//                   fullWidth 
//                   value={exam.examType} 
//                   onChange={(e) => handleChange(e, "examType", examIndex)}
//                   onKeyDown={(e) => handleKeyDown(e, getFieldId("indexNumber", examIndex))}
//                   inputRef={(el) => fieldRefs.current[getFieldId("examType", examIndex)] = el}
//                 >
//                   <MenuItem value="O/L">G.C.E O/L</MenuItem>
//                   <MenuItem value="A/L">G.C.E A/L</MenuItem>
//                 </TextField>
//               </Grid>
//               <Grid item xs={3}>
//                 <TextField 
//                   label="Index Number" 
//                   fullWidth 
//                   value={exam.indexNumber} 
//                   onChange={(e) => handleChange(e, "indexNumber", examIndex)}
//                   onKeyDown={(e) => handleKeyDown(e, getFieldId("attemptYear", examIndex))}
//                   inputRef={(el) => fieldRefs.current[getFieldId("indexNumber", examIndex)] = el}
//                 />
//               </Grid>
//               <Grid item xs={3}>
//                 <TextField 
//                   label="Attempt Year" 
//                   type="number" 
//                   fullWidth 
//                   value={exam.attemptYear} 
//                   onChange={(e) => handleChange(e, "attemptYear", examIndex)}
//                   onKeyDown={(e) => handleKeyDown(e, getFieldId("attempt", examIndex))}
//                   inputRef={(el) => fieldRefs.current[getFieldId("attemptYear", examIndex)] = el}
//                 />
//               </Grid>
//               <Grid item xs={3}>
//                 <TextField 
//                   select 
//                   label="Attempt" 
//                   fullWidth 
//                   value={exam.attempt} 
//                   onChange={(e) => handleChange(e, "attempt", examIndex)}
//                   onKeyDown={(e) => handleKeyDown(e, getFieldId("subjectName", examIndex, 0))}
//                   inputRef={(el) => fieldRefs.current[getFieldId("attempt", examIndex)] = el}
//                 >
//                   <MenuItem value="01">01</MenuItem>
//                   <MenuItem value="02">02</MenuItem>
//                   <MenuItem value="03">03</MenuItem>
//                   <MenuItem value="04">04</MenuItem>
//                 </TextField>
//               </Grid>
              
//               {exam.subjectTable.map((subject, subjectIndex) => (
//                 <React.Fragment key={subjectIndex}>
//                   <Grid item xs={5}>
//                     <TextField 
//                       label="Subject Name" 
//                       fullWidth 
//                       value={subject.subjectName} 
//                       onChange={(e) => handleChange(e, "subjectName", examIndex, subjectIndex)} 
//                       onKeyDown={(e) => handleKeyDown(e, getFieldId("subjectResults", examIndex, subjectIndex))}
//                       inputRef={(el) => fieldRefs.current[getFieldId("subjectName", examIndex, subjectIndex)] = el}
//                       variant="standard"
//                     />
//                   </Grid>
//                   <Grid item xs={1.5}>
//                     <TextField 
//                       select 
//                       label="Result" 
//                       fullWidth 
//                       value={subject.subjectResults} 
//                       onChange={(e) => handleChange(e, "subjectResults", examIndex, subjectIndex)}
//                       onKeyDown={(e) => {
//                         if (e.key === 'Enter') {
//                           e.preventDefault();
//                           // If this is the last subject in the table, add a new subject and focus on it
//                           if (subjectIndex === exam.subjectTable.length - 1 && isLastSubjectFilled(examIndex)) {
//                             addSubject(examIndex);
//                             // Will focus on the next subject name field after it's created
//                             setTimeout(() => {
//                               const nextId = getFieldId("subjectName", examIndex, subjectIndex + 1);
//                               if (fieldRefs.current[nextId]) {
//                                 fieldRefs.current[nextId].focus();
//                               }
//                             }, 0);
//                           } else if (subjectIndex < exam.subjectTable.length - 1) {
//                             // If there's a next subject, focus on its name field
//                             const nextId = getFieldId("subjectName", examIndex, subjectIndex + 1);
//                             if (fieldRefs.current[nextId]) {
//                               fieldRefs.current[nextId].focus();
//                             }
//                           }
//                         }
//                       }}
//                       inputRef={(el) => fieldRefs.current[getFieldId("subjectResults", examIndex, subjectIndex)] = el}
//                       variant="standard"
//                     >
//                       <MenuItem value="A">A</MenuItem>
//                       <MenuItem value="B">B</MenuItem>
//                       <MenuItem value="C">C</MenuItem>
//                       <MenuItem value="D">D</MenuItem>
//                       <MenuItem value="F">F</MenuItem>
//                       <MenuItem value="S">S</MenuItem>
//                       <MenuItem value="W">W</MenuItem>
//                     </TextField>
//                   </Grid>
//                   <Grid item xs={2}>
//                     <IconButton 
//                       onClick={() => addSubject(examIndex)} 
//                       disabled={!isLastSubjectFilled(examIndex)}
//                     >
//                       <Add />
//                     </IconButton>

//                     {formData.examResults[examIndex]?.subjectTable?.length > 1 && (
//                       <IconButton onClick={() => removeSubject(examIndex, subjectIndex)}>
//                         <Delete />
//                       </IconButton>
//                     )}
//                   </Grid>
//                 </React.Fragment>
//               ))}
              
//               <Grid item xs={12} sm={6}>
//                 {formData.examResults.length > 1 && (
//                   <Button 
//                     onClick={() => removeExam(examIndex)} 
//                     startIcon={<Delete />} 
//                     color="error"
//                   >
//                     Remove Exam
//                   </Button>
//                 )}
//               </Grid>
//               </Grid>
//               </Grid>
//             </React.Fragment>
//           ))}
          
//           </Grid>
//           </Typography>
         
//           <Grid item xs={12} sm={2}>
//             <Button 
//               onClick={addExam} 
//               startIcon={<Add />} 
//               variant="text" 
//               color="primary"
//             >
//               Add Exam
//             </Button>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
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
//   MenuItem
// } from "@mui/material";
// import { Add, Delete } from "@mui/icons-material";

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

//   // Create refs for field navigation
//   const fieldRefs = useRef({});

//   // When parentData changes, update the form data
//   useEffect(() => {
//     if (parentData && Object.keys(parentData).length > 0) {
//       // Prevent infinite loops by checking if data is actually different
//       if (JSON.stringify(formData) !== JSON.stringify(parentData)) {
//         setFormData(parentData);
//       }
//     }
//   }, [parentData]);

//   // Only notify parent when form data changes due to user input, not from parent data changes
//   const updateParent = (updatedData) => {
//     // Only update parent if the data is actually different
//     if (JSON.stringify(updatedData) !== JSON.stringify(parentData)) {
//       setAcademicDetails(updatedData);
//     }
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
//     // Update parent after user input
//     updateParent(updatedFormData);
//   };

//   const handleKeyDown = (e, nextFieldId) => {
//     if (e.key === 'Enter') {
//       e.preventDefault(); // Prevent form submission
//       // Focus the next field if it exists
//       if (nextFieldId && fieldRefs.current[nextFieldId]) {
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
//     setFormData(updatedFormData);
//     updateParent(updatedFormData);
//   };

//   const removeExam = (index) => {
//     const updatedExams = formData.examResults.filter((_, i) => i !== index);
//     const updatedFormData = { ...formData, examResults: updatedExams };
//     setFormData(updatedFormData);
//     updateParent(updatedFormData);
//   };

//   const addSubject = (examIndex) => {
//     const updatedExams = [...formData.examResults];
//     updatedExams[examIndex].subjectTable.push({ subjectName: "", subjectResults: "" });
//     const updatedFormData = { ...formData, examResults: updatedExams };
//     setFormData(updatedFormData);
//     updateParent(updatedFormData);
//   };

//   const removeSubject = (examIndex, subjectIndex) => {
//     const updatedExams = [...formData.examResults];
//     updatedExams[examIndex].subjectTable = updatedExams[examIndex].subjectTable.filter((_, i) => i !== subjectIndex);
//     const updatedFormData = { ...formData, examResults: updatedExams };
//     setFormData(updatedFormData);
//     updateParent(updatedFormData);
//   };

//   const isLastSubjectFilled = (examIndex) => {
//     const lastExam = formData.examResults[examIndex]; 
//     if (!lastExam || lastExam.subjectTable.length === 0) return false;
  
//     const lastSubject = lastExam.subjectTable[lastExam.subjectTable.length - 1];
//     return lastSubject.subjectName.trim() !== "" && lastSubject.subjectResults.trim() !== "";
//   };
  
//   return (
//     <Grid item xs={11.7} container spacing={2} sx={{ ml: 0, mt: 4 }}>
//       <Typography 
//         sx={{ ml: 2, mt: 0 }} 
//         variant="h4" 
//         gutterBottom 
//         style={{ 
//           fontStyle: "italic", 
//           color: "rgb(129, 43, 57)", 
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
//             onKeyDown={(e) => handleKeyDown(e, "schoolLeavingGrade")}
//             inputRef={(el) => fieldRefs.current["schoolLeavingYear"] = el}
//             required
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField 
//             label="School Leaving Grade" 
//             fullWidth 
//             value={formData.schoolLeavingGrade} 
//             onChange={(e) => handleChange(e, "schoolLeavingGrade")} 
//             onKeyDown={(e) => handleKeyDown(e, "schoolName")}
//             inputRef={(el) => fieldRefs.current["schoolLeavingGrade"] = el}
//             required 
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField 
//             label="School Name" 
//             fullWidth 
//             value={formData.schoolName} 
//             onChange={(e) => handleChange(e, "schoolName")}
//             onKeyDown={(e) => handleKeyDown(e, getFieldId("examType", 0))}
//             inputRef={(el) => fieldRefs.current["schoolName"] = el}
//             required
//           />
//         </Grid>
        
//         {/* Remove the Typography component that's causing the issue */}
//         <Grid item xs={12} container spacing={2} sx={{ mt: 2 }}>
//           {formData.examResults.map((exam, examIndex) => (
//             <React.Fragment key={examIndex}>
//               <Grid item xs={11.8} sx={{ ml:2, mt: 4, borderBottom: "1px solid #ccc", pb: 2 }}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={3}>
//                     <TextField
//                       select 
//                       label="Exam Type" 
//                       fullWidth 
//                       value={exam.examType || ''} 
//                       onChange={(e) => handleChange(e, "examType", examIndex)}
//                       onKeyDown={(e) => handleKeyDown(e, getFieldId("indexNumber", examIndex))}
//                       inputRef={(el) => fieldRefs.current[getFieldId("examType", examIndex)] = el}
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
//                       onKeyDown={(e) => handleKeyDown(e, getFieldId("attemptYear", examIndex))}
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
//                       onKeyDown={(e) => handleKeyDown(e, getFieldId("attempt", examIndex))}
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
//                       onKeyDown={(e) => handleKeyDown(e, getFieldId("subjectName", examIndex, 0))}
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
//                           onKeyDown={(e) => handleKeyDown(e, getFieldId("subjectResults", examIndex, subjectIndex))}
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
//   );
// };

// export default AcademicDetails;










import React, { useState, useEffect, useRef } from "react";
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

const AcademicDetails = ({ setAcademicDetails, parentData }) => {
  const [formData, setFormData] = useState({
    schoolLeavingYear: "",
    schoolLeavingGrade: "",
    schoolName: "",
    examResults: [
      {
        indexNumber: "",
        examType: "",
        attemptYear: "",
        attempt: "",
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

        

  // Add errors state to track validation errors
  const [errors, setErrors] = useState({
    schoolLeavingYear: false,
    schoolLeavingGrade: false,
    schoolName: false,
    examResults: [
      {
        examType: false,
        indexNumber: false,
        attemptYear: false,
        attempt: false,
        subjectTable: [
          {
            subjectName: false,
            subjectResults: false,
          },
        ],
      },
    ],
  });

  // Create refs for field navigation
  const fieldRefs = useRef({});

  // When parentData changes, update the form data
  useEffect(() => {
    if (parentData && Object.keys(parentData).length > 0) {
      // Prevent infinite loops by checking if data is actually different
      if (JSON.stringify(formData) !== JSON.stringify(parentData)) {
        setFormData(parentData);
        
        // Initialize errors state based on the structure of parentData
        const initialErrors = {
          schoolLeavingYear: !parentData.schoolLeavingYear,
          schoolLeavingGrade: !parentData.schoolLeavingGrade,
          schoolName: !parentData.schoolName,
          examResults: parentData.examResults.map(exam => ({
            examType: !exam.examType,
            indexNumber: false, // Not required
            attemptYear: false, // Not required
            attempt: false, // Not required
            subjectTable: exam.subjectTable.map(subject => ({
              subjectName: false, // Not required
              subjectResults: false, // Not required
            })),
          })),
        };
        setErrors(initialErrors);
      }
    }
  }, [parentData]);

  // Only notify parent when form data changes due to user input, not from parent data changes
  const updateParent = (updatedData) => {
    // Only update parent if the data is actually different
    if (JSON.stringify(updatedData) !== JSON.stringify(parentData)) {
      setAcademicDetails(updatedData);
    }
  };

  const validateField = (value, field, examIndex = null, subjectIndex = null) => {
    let isValid = true;
    // Determine which fields are required
    if (field === "schoolLeavingYear" || field === "schoolLeavingGrade" || field === "schoolName") {
      isValid = value.trim() !== "";
    } else if (field === "examType" && examIndex !== null) {
      isValid = value.trim() !== "";
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

  const handleChange = (e, field, examIndex = null, subjectIndex = null) => {
    const { value } = e.target;
    let updatedFormData = { ...formData };

    if (examIndex !== null) {
      if (subjectIndex !== null) {
        updatedFormData.examResults[examIndex].subjectTable[subjectIndex][field] = value;
      } else {
        updatedFormData.examResults[examIndex][field] = value;
      }
    } else {
      updatedFormData[field] = value;
    }

    setFormData(updatedFormData);
    // Validate the field
    validateField(value, field, examIndex, subjectIndex);
    // Update parent after user input
    updateParent(updatedFormData);
  };

  const handleKeyDown = (e, nextFieldId, field, examIndex = null, subjectIndex = null) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      
      // Get the current value to validate
      let currentValue = "";
      if (examIndex !== null) {
        if (subjectIndex !== null) {
          currentValue = formData.examResults[examIndex].subjectTable[subjectIndex][field];
        } else {
          currentValue = formData.examResults[examIndex][field];
        }
      } else {
        currentValue = formData[field];
      }
      
      // Validate the current field
      const isValid = validateField(currentValue, field, examIndex, subjectIndex);
      
      // Focus the next field only if current field is valid
      if (isValid && nextFieldId && fieldRefs.current[nextFieldId]) {
        fieldRefs.current[nextFieldId].focus();
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
    <Grid item xs={11.7} container spacing={2} sx={{ ml: 0, mt: 4 }}>
      <Typography 
        sx={{ ml: 2, mt: 0 }} 
        variant="h4" 
        gutterBottom 
        style={{ 
          fontStyle: "italic", 
          color: "rgb(129, 43, 57)", 
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
            onChange={(e) => handleChange(e, "schoolLeavingYear")} 
            onKeyDown={(e) => handleKeyDown(e, "schoolLeavingGrade", "schoolLeavingYear")}
            inputRef={(el) => fieldRefs.current["schoolLeavingYear"] = el}
            required
            error={errors.schoolLeavingYear}
            helperText={errors.schoolLeavingYear ? "School Leaving Year is required" : ""}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField 
            label="School Leaving Grade" 
            fullWidth 
            value={formData.schoolLeavingGrade} 
            onChange={(e) => handleChange(e, "schoolLeavingGrade")} 
            onKeyDown={(e) => handleKeyDown(e, "schoolName", "schoolLeavingGrade")}
            inputRef={(el) => fieldRefs.current["schoolLeavingGrade"] = el}
            required 
            error={errors.schoolLeavingGrade}
            helperText={errors.schoolLeavingGrade ? "School Leaving Grade is required" : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            label="School Name" 
            fullWidth 
            value={formData.schoolName} 
            onChange={(e) => handleChange(e, "schoolName")}
            onKeyDown={(e) => handleKeyDown(e, getFieldId("examType", 0), "schoolName")}
            inputRef={(el) => fieldRefs.current["schoolName"] = el}
            required
            error={errors.schoolName}
            helperText={errors.schoolName ? "School Name is required" : ""}
          />
        </Grid>
        
        <Grid item xs={12} container spacing={2} sx={{ mt: 2 }}>
          {formData.examResults.map((exam, examIndex) => (
            <React.Fragment key={examIndex}>
              <Grid item xs={11.8} sx={{ ml:2, mt: 4, borderBottom: "1px solid #ccc", pb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      select 
                      label="Exam Type" 
                      fullWidth 
                      value={exam.examType || ''} 
                      onChange={(e) => handleChange(e, "examType", examIndex)}
                      onKeyDown={(e) => handleKeyDown(e, getFieldId("indexNumber", examIndex), "examType", examIndex)}
                      inputRef={(el) => fieldRefs.current[getFieldId("examType", examIndex)] = el}
                      required
                      error={errors.examResults[examIndex]?.examType}
                      helperText={errors.examResults[examIndex]?.examType ? "Exam Type is required" : ""}
                    >
                      <MenuItem value="O/L">G.C.E O/L</MenuItem>
                      <MenuItem value="A/L">G.C.E A/L</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField 
                      label="Index Number" 
                      fullWidth 
                      value={exam.indexNumber} 
                      onChange={(e) => handleChange(e, "indexNumber", examIndex)}
                      onKeyDown={(e) => handleKeyDown(e, getFieldId("attemptYear", examIndex), "indexNumber", examIndex)}
                      inputRef={(el) => fieldRefs.current[getFieldId("indexNumber", examIndex)] = el}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField 
                      label="Attempt Year" 
                      type="number" 
                      fullWidth 
                      value={exam.attemptYear} 
                      onChange={(e) => handleChange(e, "attemptYear", examIndex)}
                      onKeyDown={(e) => handleKeyDown(e, getFieldId("attempt", examIndex), "attemptYear", examIndex)}
                      inputRef={(el) => fieldRefs.current[getFieldId("attemptYear", examIndex)] = el}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField 
                      select 
                      label="Attempt" 
                      fullWidth 
                      value={exam.attempt || ''} 
                      onChange={(e) => handleChange(e, "attempt", examIndex)}
                      onKeyDown={(e) => handleKeyDown(e, getFieldId("subjectName", examIndex, 0), "attempt", examIndex)}
                      inputRef={(el) => fieldRefs.current[getFieldId("attempt", examIndex)] = el}
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
                        <TextField 
                          label="Subject Name" 
                          fullWidth 
                          value={subject.subjectName} 
                          onChange={(e) => handleChange(e, "subjectName", examIndex, subjectIndex)} 
                          onKeyDown={(e) => handleKeyDown(e, getFieldId("subjectResults", examIndex, subjectIndex), "subjectName", examIndex, subjectIndex)}
                          inputRef={(el) => fieldRefs.current[getFieldId("subjectName", examIndex, subjectIndex)] = el}
                          variant="standard"
                        />
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
                              
                              // If this is the last subject in the table, add a new subject and focus on it
                              if (subjectIndex === exam.subjectTable.length - 1 && isLastSubjectFilled(examIndex)) {
                                addSubject(examIndex);
                                // Will focus on the next subject name field after it's created
                                setTimeout(() => {
                                  const nextId = getFieldId("subjectName", examIndex, subjectIndex + 1);
                                  if (fieldRefs.current[nextId]) {
                                    fieldRefs.current[nextId].focus();
                                  }
                                }, 0);
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
                        <IconButton 
                          onClick={() => addSubject(examIndex)} 
                          disabled={!isLastSubjectFilled(examIndex)}
                        >
                          <Add />
                        </IconButton>

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
  );
};

export default AcademicDetails;