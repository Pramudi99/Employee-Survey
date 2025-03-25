// // import { useState } from "react";
// // import PersonalDetailsForm from "./PersonalDetails";
// // import SpouseDetailsForm from "./SpouseDetails";
// // import ContactDetails from "./ContactDetails";
// // import EmploymentDetailsForm from "./EmploymentDetailsForm";
// // import AcademicDetails from "./AcademicDetails";
// // import { submitEmployeeData, fetchEmployeeData } from "../../services/Api";
// // import { Button, Container, Typography, Paper, Box, TextField } from "@mui/material";
// // import DependentDetails from "./DependentDetails";
// // import DownloadPDFButton from "./DownloadPDFButton";

// // const initialPersonalDetails = {};
// // const initialSpouseDetails = {};
// // const initialContactDetails = {};
// // const initialEmploymentDetails = {};
// // const initialAcademicDetails = {
// //   schoolLeavingYear: "",
// //   schoolLeavingGrade: "",
// //   schoolName: "",
// //   examResults: [
// //     {
// //       indexNumber: "",
// //       examType: "",
// //       attemptYear: "",
// //       attempt: "",
// //       academicDetailsId: 0,
// //       subjectTable: [
// //         {
// //           subjectName: "",
// //           subjectResults: "",
// //         },
// //       ],
// //     },
// //   ]
// // };
// // const initialDependentDetails = { dependents: [] };

// // const EmployeeForm = () => {
// //   const [personalDetails, setPersonalDetails] = useState(initialPersonalDetails);
// //   const [spouseDetails, setSpouseDetails] = useState(initialSpouseDetails);
// //   const [contactDetails, setContactDetails] = useState(initialContactDetails);
// //   const [employmentDetails, setEmploymentDetails] = useState(initialEmploymentDetails);
// //   const [academicDetails, setAcademicDetails] = useState(initialAcademicDetails);
// //   const [dependentDetails, setDependentDetails] = useState(initialDependentDetails);
// //   const [epfNumber, setEpfNumber] = useState("");
// //   const [submissionCompleted, setSubmissionCompleted] = useState(false);

// //   const handleFetchEmployeeData = async () => {
// //     if (!epfNumber) {
// //       console.error("❌ Please enter an EPF number.");
// //       return;
// //     }
  
// //     try {
// //       const data = await fetchEmployeeData(epfNumber);
// //       console.log("✅ Employee Data Fetched:", data);
  
// //       // Set personal details
// //       setPersonalDetails(data || {});
      
// //       // Set spouse details
// //       setSpouseDetails(data.spouseDetails || {});
      
// //       // Handle contact details - extract the first item if it's an array
// //       let contactData = {};
// //       if (data.contactDetails) {
// //         // Check if it's an array with elements
// //         if (Array.isArray(data.contactDetails) && data.contactDetails.length > 0) {
// //           contactData = data.contactDetails[0];
// //         } 
// //         // Check if it has a $values property (sometimes returned by .NET APIs)
// //         else if (data.contactDetails.$values && data.contactDetails.$values.length > 0) {
// //           contactData = data.contactDetails.$values[0];
// //         }
// //         // Otherwise, assume it's already the right format
// //         else {
// //           contactData = data.contactDetails;
// //         }
// //       }
// //       setContactDetails(contactData);
      
// //       // Set employment details
// //       setEmploymentDetails(data.employmentDetails || {});
      
// //       // Set dependent details - transform to expected format
// //       setDependentDetails({ 
// //         dependents: (data.dependents || []).map(dep => ({ 
// //           fullName: dep.dependentFullName, 
// //           gender: dep.dependentGender, 
// //           dateOfBirth: dep.dependentDateOfBirth, 
// //           occupation: dep.dependentOccupation, 
// //           occupationAddress: dep.occupationAddress 
// //         })) 
// //       });
      
// //       // Set academic details - transform to expected format
// //       if (data.academicDetails) {
// //         setAcademicDetails({
// //           schoolLeavingYear: data.academicDetails.schoolLeavingYear?.toString() || "",
// //           schoolLeavingGrade: data.academicDetails.schoolLeavingGrade?.toString() || "",
// //           schoolName: data.academicDetails.schoolName || "",
// //           examResults: (data.academicDetails.examResults || []).map(exam => ({
// //             indexNumber: exam.indexNumber?.toString() || "",
// //             examType: exam.examType || "",
// //             attemptYear: exam.attemptYear?.toString() || "",
// //             attempt: exam.attempt?.toString() || "",
// //             academicDetailsId: exam.academicDetailsId || 0,
// //             subjectTable: (exam.subjectTable || []).map(subject => ({
// //               subjectName: subject.subjectName || "",
// //               subjectResults: subject.subjectResults || ""
// //             }))
// //           }))
// //         });
// //       } else {
// //         setAcademicDetails(initialAcademicDetails);
// //       }
// //     } catch (error) {
// //       console.error("❌ Error fetching employee data:", error.message);
// //     }
// //   };

// //   // In EmployeeForm.jsx
// // const handleSubmit = async (e) => {
// //   e.preventDefault();
// //   console.log("Submitting data:", {
// //     personalDetails,
// //     spouseDetails,
// //     contactDetails,
// //     employmentDetails,
// //     academicDetails,
// //     dependentDetails
// //   });

// //   if (!employmentDetails || Object.keys(employmentDetails).length === 0) {
// //     console.error("❌ Employment details are missing.");
// //     return;
// //   }

// //   try {
// //     await submitEmployeeData(personalDetails, spouseDetails, contactDetails, employmentDetails, academicDetails, dependentDetails);
// //     console.log("🎉 Data submitted successfully!");

// //     // Reset all form states with proper initial values
// //     // In EmployeeForm.jsx after successful submission
// //       setPersonalDetails({});  // Empty object instead of initialPersonalDetails
// //       setSpouseDetails({});
// //       setContactDetails({});
// //        // Properly reset employment details with null values instead of empty strings
// //     setEmploymentDetails({
// //       presentJobCategory: null,
// //       presentDesignation: null,
// //       presentGrade: null,
// //       joinedAs: null,
// //       joinedDetails: {
// //         joinedType: null,
// //         epfNumber: null,
// //         designation: null,
// //         grade: null,
// //         date: null
// //       },
// //       employmentAddresses: [
// //         { addressType: "Permanent", location: null, function: null, subFunction: null },
// //         { addressType: "Temporary", location: null, function: null, subFunction: null },
// //       ],
// //       promotions: []
// //     });
// //       setAcademicDetails({
// //         schoolLeavingYear: "",
// //         schoolLeavingGrade: "",
// //         schoolName: "",
// //         examResults: [
// //           {
// //             indexNumber: "",
// //             examType: "",
// //             attemptYear: "",
// //             attempt: "",
// //             academicDetailsId: 0,
// //             subjectTable: [
// //               {
// //                 subjectName: "",
// //                 subjectResults: "",
// //               },
// //             ],
// //           },
// //         ]
// //       });
// //       setDependentDetails({ dependents: [] });
// //     setEpfNumber("");

// //     // Force a re-render of all child components
// //     setSubmissionCompleted(true);
// //     // Use a longer timeout to ensure all state updates have propagated
// //     setTimeout(() => setSubmissionCompleted(false), 300);
// //   } catch (error) {
// //     console.error("❌ Submission failed:", error.message);
// //   }
// // };

// //   return (
// //     <Container maxWidth={false} sx={{ width: "110vw", maxWidth: "1200px" }}>
// //      <Typography
// //         variant="h2"
// //         gutterBottom
// //         style={{
// //           fontWeight: "bold",
// //           textAlign: "center",
// //           color: "Gray",
// //           fontFamily: "Roboto, sans-serif",
// //         }}
// //       >
// //         Employee Survey CPC - 2025
// //       </Typography>

// //       {/* EPF Input & Fetch Button */}
// //       <Box display="flex" alignItems="center" gap={2} mt={2}>
// //         <TextField
// //           label="Enter EPF Number"
// //           variant="outlined"
// //           value={epfNumber}
// //           onChange={(e) => setEpfNumber(e.target.value)}
// //         />
// //         <Button variant="contained" color="secondary" onClick={handleFetchEmployeeData}>
// //           Fetch Employee Data
// //         </Button>
// //       </Box>

// //      <Box display="flex" gap={2} mt={2} width="100%">
// //      <Paper elevation={3} sx={{ padding: 3, flex: 1, width: "100%" }}>
// //      <PersonalDetailsForm parentData={personalDetails} setPersonalDetails={setPersonalDetails} />
// //      <ContactDetails parentData={contactDetails} setContactDetails={setContactDetails} />
// //      <EmploymentDetailsForm parentData={employmentDetails} setEmploymentDetails={setEmploymentDetails} />
// //      <SpouseDetailsForm parentData={spouseDetails} setSpouseDetails={setSpouseDetails} />
// //      <DependentDetails parentData={dependentDetails} setDependentDetails={setDependentDetails}/>
// //      <AcademicDetails setAcademicDetails={setAcademicDetails} parentData={academicDetails}/>
// //      </Paper></Box>
// //      <Box display="flex" gap={2} mt={2}>
// //   <Button
// //     variant="contained"
// //     color="#800020"
// //     onClick={handleSubmit}
// //   >
// //     Submit
// //   </Button>
// //   {personalDetails && Object.keys(personalDetails).length > 0 && (
// //     <DownloadPDFButton epfNumber={epfNumber} />
// //   )}
// // </Box>
// //     </Container>
// //   );
// // };

// // export default EmployeeForm;












// import { useState, useEffect } from "react";
// import PersonalDetailsForm from "./PersonalDetails";
// import SpouseDetailsForm from "./SpouseDetails";
// import ContactDetails from "./ContactDetails";
// import EmploymentDetailsForm from "./EmploymentDetailsForm";
// import AcademicDetails from "./AcademicDetails";
// import { submitEmployeeData, fetchEmployeeData } from "../../services/Api";
// import { Button, Container, Typography, Paper, Box, TextField } from "@mui/material";
// import DependentDetails from "./DependentDetails";
// import DownloadPDFButton from "./DownloadPDFButton";

// const initialPersonalDetails = {};
// const initialSpouseDetails = {};
// const initialContactDetails = {};
// const initialEmploymentDetails = {};
// const initialAcademicDetails = {
//   schoolLeavingYear: "",
//   schoolLeavingGrade: "",
//   schoolName: "",
//   examResults: [
//     {
//       indexNumber: "",
//       examType: "",
//       attemptYear: "",
//       attempt: "",
//       academicDetailsId: 0,
//       subjectTable: [
//         {
//           subjectName: "",
//           subjectResults: "",
//         },
//       ],
//     },
//   ]
// };
// const initialDependentDetails = { dependents: [] };

// const EmployeeForm = () => {
//   const [personalDetails, setPersonalDetails] = useState(initialPersonalDetails);
//   const [spouseDetails, setSpouseDetails] = useState(initialSpouseDetails);
//   const [contactDetails, setContactDetails] = useState(initialContactDetails);
//   const [employmentDetails, setEmploymentDetails] = useState(initialEmploymentDetails);
//   const [academicDetails, setAcademicDetails] = useState(initialAcademicDetails);
//   const [dependentDetails, setDependentDetails] = useState(initialDependentDetails);
//   const [epfNumber, setEpfNumber] = useState("");
//   const [submissionCompleted, setSubmissionCompleted] = useState(false);
//   const [isMarried, setIsMarried] = useState(false);


//   useEffect(() => {
//     if (personalDetails.epfNumber) {
//       setEmploymentDetails(prev => ({
//         ...prev,
//         epfNumber: personalDetails.epfNumber
//       }));
//     }
//   }, [personalDetails.epfNumber]);
  
//   // Update isMarried state whenever personalDetails changes
//   useEffect(() => {
//     if (personalDetails && personalDetails.maritalStatus) {
//       setIsMarried(personalDetails.maritalStatus.toLowerCase() === "married");
//     }
//   }, [personalDetails]);

//   // Custom setPersonalDetails function that also updates the isMarried state
//   const handlePersonalDetailsChange = (newDetails) => {
//     setPersonalDetails(newDetails);
//     // Check if maritalStatus is being updated and update isMarried accordingly
//     if (newDetails.maritalStatus) {
//       setIsMarried(newDetails.maritalStatus.toLowerCase() === "married");
//     }
//   };

//   const handleFetchEmployeeData = async () => {
//     if (!epfNumber) {
//       console.error("❌ Please enter an EPF number.");
//       return;
//     }
  
//     try {
//       const data = await fetchEmployeeData(epfNumber);
//       console.log("✅ Employee Data Fetched:", data);
  
//       // Set personal details
//       setPersonalDetails(data || {});
      
//       // Set spouse details
//       setSpouseDetails(data.spouseDetails || {});
      
//       // Update marital status
//       if (data && data.maritalStatus) {
//         setIsMarried(data.maritalStatus.toLowerCase() === "married");
//       }
      
//       // Handle contact details - extract the first item if it's an array
//       let contactData = {};
//       if (data.contactDetails) {
//         // Check if it's an array with elements
//         if (Array.isArray(data.contactDetails) && data.contactDetails.length > 0) {
//           contactData = data.contactDetails[0];
//         } 
//         // Check if it has a $values property (sometimes returned by .NET APIs)
//         else if (data.contactDetails.$values && data.contactDetails.$values.length > 0) {
//           contactData = data.contactDetails.$values[0];
//         }
//         // Otherwise, assume it's already the right format
//         else {
//           contactData = data.contactDetails;
//         }
//       }
//       setContactDetails(contactData);
      
//       // // Set employment details
//       // setEmploymentDetails(data.employmentDetails || {});
       
//     // Set employment details with EPF number
//     setEmploymentDetails(prev => ({
//       ...(data.employmentDetails || {}),
//       epfNumber: data.epfNumber || epfNumber // Use the EPF from data or the input field
//     }));
      
//       // Set dependent details - transform to expected format
//       setDependentDetails({ 
//         dependents: (data.dependents || []).map(dep => ({ 
//           fullName: dep.dependentFullName, 
//           gender: dep.dependentGender, 
//           dateOfBirth: dep.dependentDateOfBirth, 
//           occupation: dep.dependentOccupation, 
//           occupationAddress: dep.occupationAddress 
//         })) 
//       });
      
//       // Set academic details - transform to expected format
//       if (data.academicDetails) {
//         setAcademicDetails({
//           schoolLeavingYear: data.academicDetails.schoolLeavingYear?.toString() || "",
//           schoolLeavingGrade: data.academicDetails.schoolLeavingGrade?.toString() || "",
//           schoolName: data.academicDetails.schoolName || "",
//           examResults: (data.academicDetails.examResults || []).map(exam => ({
//             indexNumber: exam.indexNumber?.toString() || "",
//             examType: exam.examType || "",
//             attemptYear: exam.attemptYear?.toString() || "",
//             attempt: exam.attempt?.toString() || "",
//             academicDetailsId: exam.academicDetailsId || 0,
//             subjectTable: (exam.subjectTable || []).map(subject => ({
//               subjectName: subject.subjectName || "",
//               subjectResults: subject.subjectResults || ""
//             }))
//           }))
//         });
//       } else {
//         setAcademicDetails(initialAcademicDetails);
//       }
//     } catch (error) {
//       console.error("❌ Error fetching employee data:", error.message);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submitting data:", {
//       personalDetails,
//       spouseDetails,
//       contactDetails,
//       employmentDetails,
//       academicDetails,
//       dependentDetails
//     });

//     if (!employmentDetails || Object.keys(employmentDetails).length === 0) {
//       console.error("❌ Employment details are missing.");
//       return;
//     }

//     try {
//       await submitEmployeeData(personalDetails, spouseDetails, contactDetails, employmentDetails, academicDetails, dependentDetails);
//       console.log("🎉 Data submitted successfully!");

//       // Reset all form states with proper initial values
//       setPersonalDetails({});  // Empty object instead of initialPersonalDetails
//       setSpouseDetails({});
//       setContactDetails({});
//       // Properly reset employment details with null values instead of empty strings
//       setEmploymentDetails({
//         presentJobCategory: null,
//         presentDesignation: null,
//         presentGrade: null,
//         joinedAs: null,
//         joinedDetails: {
//           joinedType: null,
//           epfNumber: null,
//           designation: null,
//           grade: null,
//           date: null
//         },
//         employmentAddresses: [
//           { addressType: "Permanent", location: null, function: null, subFunction: null },
//           { addressType: "Temporary", location: null, function: null, subFunction: null },
//         ],
//         promotions: []
//       });
//       setAcademicDetails({
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
//         ]
//       });
//       setDependentDetails({ dependents: [] });
//       setEpfNumber("");
//       setIsMarried(false);

//       // Force a re-render of all child components
//       setSubmissionCompleted(true);
//       // Use a longer timeout to ensure all state updates have propagated
//       setTimeout(() => setSubmissionCompleted(false), 300);
//     } catch (error) {
//       console.error("❌ Submission failed:", error.message);
//     }
//   };

//   return (
//     <Container maxWidth={false} sx={{ width: "110vw", maxWidth: "1200px" }}>
//       <Typography
//         variant="h2"
//         gutterBottom
//         style={{
//           fontWeight: "bold",
//           textAlign: "center",
//           color: "Gray",
//           fontFamily: "Roboto, sans-serif",
//         }}
//       >
//         Employee Survey CPC - 2025
//       </Typography>

//       {/* EPF Input & Fetch Button */}
//       <Box display="flex" alignItems="center" gap={2} mt={2}>
//         <TextField
//           label="Enter EPF Number"
//           variant="outlined"
//           value={epfNumber}
//           onChange={(e) => setEpfNumber(e.target.value)}
//         />
//         <Button variant="contained" color="secondary" onClick={handleFetchEmployeeData}>
//           Fetch Employee Data
//         </Button>
//       </Box>

//       <Box display="flex" gap={2} mt={2} width="100%">
//         <Paper elevation={3} sx={{ padding: 3, flex: 1, width: "100%" }} style={{ backgroundColor: "#FDFDFD" }}>
//           <PersonalDetailsForm parentData={personalDetails} setPersonalDetails={handlePersonalDetailsChange} />
//           <ContactDetails parentData={contactDetails} setContactDetails={setContactDetails} />
//           {/* Conditionally render SpouseDetailsForm based on isMarried state */}
//                   {isMarried && (
//                     <SpouseDetailsForm parentData={spouseDetails} setSpouseDetails={setSpouseDetails} />
//                   )}
                  
                  
//           <DependentDetails parentData={dependentDetails} setDependentDetails={setDependentDetails}/>
//           <EmploymentDetailsForm parentData={employmentDetails} setEmploymentDetails={setEmploymentDetails} />
          
        
//           <AcademicDetails setAcademicDetails={setAcademicDetails} parentData={academicDetails}/>
//         </Paper>
//       </Box>
      
//       <Box display="flex" gap={2} mt={2}>
//         <Button
//           variant="contained"
//           color="#800020"
//           onClick={handleSubmit}
//         >
//           Submit
//         </Button>
//         {/* {personalDetails && Object.keys(personalDetails).length > 0 && (
//           <DownloadPDFButton epfNumber={epfNumber} />
//         )} */}
//          {epfNumber && Object.keys(epfNumber).length > 0 && (
//           <DownloadPDFButton epfNumber={epfNumber} />
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default EmployeeForm;




import { useState, useEffect } from "react";
import PersonalDetailsForm from "./PersonalDetails";
import SpouseDetailsForm from "./SpouseDetails";
import ContactDetails from "./ContactDetails";
import EmploymentDetailsForm from "./EmploymentDetailsForm";
import AcademicDetails from "./AcademicDetails";
import { submitEmployeeData, fetchEmployeeData } from "../../services/Api";
import { Button, Container, Typography, Paper, Box, TextField, Snackbar, Alert } from "@mui/material";
import DependentDetails from "./DependentDetails";
import DownloadPDFButton from "./DownloadPDFButton";

const initialPersonalDetails = {};
const initialSpouseDetails = {};
const initialContactDetails = {};
const initialEmploymentDetails = {};
const initialAcademicDetails = {
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
  ]
};
const initialDependentDetails = { dependents: [] };

const EmployeeForm = () => {
  const [personalDetails, setPersonalDetails] = useState(initialPersonalDetails);
  const [spouseDetails, setSpouseDetails] = useState(initialSpouseDetails);
  const [contactDetails, setContactDetails] = useState(initialContactDetails);
  const [employmentDetails, setEmploymentDetails] = useState(initialEmploymentDetails);
  const [academicDetails, setAcademicDetails] = useState(initialAcademicDetails);
  const [dependentDetails, setDependentDetails] = useState(initialDependentDetails);
  const [epfNumber, setEpfNumber] = useState("");
  const [submissionCompleted, setSubmissionCompleted] = useState(false);
  const [isMarried, setIsMarried] = useState(false);
  
  // Add states for success and error popups
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (personalDetails.epfNumber) {
      setEmploymentDetails(prev => ({
        ...prev,
        epfNumber: personalDetails.epfNumber
      }));
    }
  }, [personalDetails.epfNumber]);
  
  // Update isMarried state whenever personalDetails changes
  useEffect(() => {
    if (personalDetails && personalDetails.maritalStatus) {
      setIsMarried(personalDetails.maritalStatus.toLowerCase() === "married");
    }
  }, [personalDetails]);

  // Custom setPersonalDetails function that also updates the isMarried state
  const handlePersonalDetailsChange = (newDetails) => {
    setPersonalDetails(newDetails);
    // Check if maritalStatus is being updated and update isMarried accordingly
    if (newDetails.maritalStatus) {
      setIsMarried(newDetails.maritalStatus.toLowerCase() === "married");
    }
  };

  const handleFetchEmployeeData = async () => {
    if (!epfNumber) {
      setErrorMessage("Please enter an EPF number.");
      setErrorOpen(true);
      return;
    }
  
    try {
      const data = await fetchEmployeeData(epfNumber);
      console.log("✅ Employee Data Fetched:", data);
  
      // Set personal details
      setPersonalDetails(data || {});
      
      // Set spouse details
      setSpouseDetails(data.spouseDetails || {});
      
      // Update marital status
      if (data && data.maritalStatus) {
        setIsMarried(data.maritalStatus.toLowerCase() === "married");
      }
      
      // Handle contact details - extract the first item if it's an array
      let contactData = {};
      if (data.contactDetails) {
        // Check if it's an array with elements
        if (Array.isArray(data.contactDetails) && data.contactDetails.length > 0) {
          contactData = data.contactDetails[0];
        } 
        // Check if it has a $values property (sometimes returned by .NET APIs)
        else if (data.contactDetails.$values && data.contactDetails.$values.length > 0) {
          contactData = data.contactDetails.$values[0];
        }
        // Otherwise, assume it's already the right format
        else {
          contactData = data.contactDetails;
        }
      }
      setContactDetails(contactData);
      
      // Set employment details with EPF number
      setEmploymentDetails(prev => ({
        ...(data.employmentDetails || {}),
        epfNumber: data.epfNumber || epfNumber // Use the EPF from data or the input field
      }));
      
      // Set dependent details - transform to expected format
      setDependentDetails({ 
        dependents: (data.dependents || []).map(dep => ({ 
          fullName: dep.dependentFullName, 
          gender: dep.dependentGender, 
          dateOfBirth: dep.dependentDateOfBirth, 
          occupation: dep.dependentOccupation, 
          occupationAddress: dep.occupationAddress 
        })) 
      });
      
      // Set academic details - transform to expected format
      if (data.academicDetails) {
        setAcademicDetails({
          schoolLeavingYear: data.academicDetails.schoolLeavingYear?.toString() || "",
          schoolLeavingGrade: data.academicDetails.schoolLeavingGrade?.toString() || "",
          schoolName: data.academicDetails.schoolName || "",
          examResults: (data.academicDetails.examResults || []).map(exam => ({
            indexNumber: exam.indexNumber?.toString() || "",
            examType: exam.examType || "",
            attemptYear: exam.attemptYear?.toString() || "",
            attempt: exam.attempt?.toString() || "",
            academicDetailsId: exam.academicDetailsId || 0,
            subjectTable: (exam.subjectTable || []).map(subject => ({
              subjectName: subject.subjectName || "",
              subjectResults: subject.subjectResults || ""
            }))
          }))
        });
      } else {
        setAcademicDetails(initialAcademicDetails);
      }
    } catch (error) {
      console.error("❌ Error fetching employee data:", error.message);
      setErrorMessage("Error fetching employee data: " + error.message);
      setErrorOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", {
      personalDetails,
      spouseDetails,
      contactDetails,
      employmentDetails,
      academicDetails,
      dependentDetails
    });

    if (!employmentDetails || Object.keys(employmentDetails).length === 0) {
      setErrorMessage("Employment details are missing.");
      setErrorOpen(true);
      return;
    }

    try {
      await submitEmployeeData(personalDetails, spouseDetails, contactDetails, employmentDetails, academicDetails, dependentDetails);
      console.log("🎉 Data submitted successfully!");
      
      // Show success popup
      setSuccessOpen(true);

      // Reset all form states with proper initial values
      setPersonalDetails({});  // Empty object instead of initialPersonalDetails
      setSpouseDetails({});
      setContactDetails({});
      // Properly reset employment details with null values instead of empty strings
      setEmploymentDetails({
        presentJobCategory: null,
        presentDesignation: null,
        presentGrade: null,
        joinedAs: null,
        joinedDetails: {
          joinedType: null,
          epfNumber: null,
          designation: null,
          grade: null,
          date: null
        },
        employmentAddresses: [
          { addressType: "Permanent", location: null, function: null, subFunction: null },
          { addressType: "Temporary", location: null, function: null, subFunction: null },
        ],
        promotions: []
      });
      setAcademicDetails({
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
        ]
      });
      setDependentDetails({ dependents: [] });
      setEpfNumber("");
      setIsMarried(false);

      // Force a re-render of all child components
      setSubmissionCompleted(true);
      // Use a longer timeout to ensure all state updates have propagated
      setTimeout(() => setSubmissionCompleted(false), 300);
    } catch (error) {
      console.error("❌ Submission failed:", error.message);
      setErrorMessage("Submission failed: " + error.message);
      setErrorOpen(true);
    }
  };

  // Handle close events for snackbars
  const handleSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessOpen(false);
  };

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorOpen(false);
  };

  return (
    <Container maxWidth={false} sx={{ width: "110vw", maxWidth: "1200px" }}>
      <Typography
        variant="h2"
        gutterBottom
        style={{
          fontWeight: "bold",
          textAlign: "center",
          color: "Gray",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        Employee Survey CPC - 2025
      </Typography>

      {/* EPF Input & Fetch Button */}
      <Box display="flex" alignItems="center" gap={2} mt={2}>
        <TextField
          label="Enter EPF Number"
          variant="outlined"
          value={epfNumber}
          onChange={(e) => setEpfNumber(e.target.value)}
        />
        <Button variant="contained" color="secondary" onClick={handleFetchEmployeeData}>
          Fetch Employee Data
        </Button>
      </Box>

      <Box display="flex" gap={2} mt={2} width="100%">
        <Paper elevation={3} sx={{ padding: 3, flex: 1, width: "100%" }} style={{ backgroundColor: "#FDFDFD" }}>
          <PersonalDetailsForm parentData={personalDetails} setPersonalDetails={handlePersonalDetailsChange} />
          <ContactDetails parentData={contactDetails} setContactDetails={setContactDetails} />
          {/* Conditionally render SpouseDetailsForm based on isMarried state */}
          {isMarried && (
            <SpouseDetailsForm parentData={spouseDetails} setSpouseDetails={setSpouseDetails} />
          )}
          <DependentDetails parentData={dependentDetails} setDependentDetails={setDependentDetails}/>
          <EmploymentDetailsForm parentData={employmentDetails} setEmploymentDetails={setEmploymentDetails} />
          <AcademicDetails setAcademicDetails={setAcademicDetails} parentData={academicDetails}/>
        </Paper>
      </Box>
      
      <Box display="flex" gap={2} mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        {epfNumber && epfNumber.length > 0 && (
          <DownloadPDFButton epfNumber={epfNumber} />
        )}
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSuccessClose} 
          severity="success" 
          sx={{ width: '100%', fontSize: '1rem', backgroundColor: '#4CAF50', color: 'white' }}
          variant="filled"
        >
          Data submitted successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleErrorClose} 
          severity="error" 
          sx={{ width: '100%', fontSize: '1rem' }}
          variant="filled"
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EmployeeForm;