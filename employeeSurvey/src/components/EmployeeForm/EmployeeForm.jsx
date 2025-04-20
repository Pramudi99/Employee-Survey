



// import { useState, useEffect } from "react";
// import PersonalDetailsForm from "./PersonalDetails";
// import SpouseDetailsForm from "./SpouseDetails";
// import ContactDetails from "./ContactDetails";
// import EmploymentDetailsForm from "./EmploymentDetailsForm";
// import AcademicDetails from "./AcademicDetails";
// import { submitEmployeeData, fetchEmployeeData } from "../../services/Api";
// import { Button, Container, Typography, Paper, Box, TextField, Snackbar, Alert } from "@mui/material";
// import DependentDetails from "./DependentDetails";
// import DownloadPDFButton from "./DownloadPDFButton";
// import { checkEPFExistence } from "../../services/Api"; 


// const initialPersonalDetails = {};
// const initialSpouseDetails = {};
// const initialContactDetails = {};
// const initialEmploymentDetails = {};
// const initialAcademicDetails = {
//   schoolLeavingYear: "",
//   schoolLeavingGrade: "",
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
  
//   // Add states for success and error popups
//   const [successOpen, setSuccessOpen] = useState(false);
//   const [errorOpen, setErrorOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

  

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

//   // // Custom setPersonalDetails function that also updates the isMarried state
//   // const handlePersonalDetailsChange = (newDetails) => {
//   //   setPersonalDetails(newDetails);
//   //   // Check if maritalStatus is being updated and update isMarried accordingly
//   //   if (newDetails.maritalStatus) {
//   //     setIsMarried(newDetails.maritalStatus.toLowerCase() === "married");
//   //   }
//   // };

//   const handlePersonalDetailsChange = (newDetails) => {
//     setPersonalDetails(newDetails);
//     const married = newDetails.maritalStatus?.toLowerCase() === "married";
//     setIsMarried(married);
  
//     if (!married) {
//       setSpouseDetails({}); // Clear spouse data
//     }
//   };
  


//   const handleFetchEmployeeData = async () => {
//     if (!epfNumber) {
//       setErrorMessage("Please enter an EPF number.");
//       setErrorOpen(true);
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
      
//       // Set employment details with EPF number
//       setEmploymentDetails(prev => ({
//         ...(data.employmentDetails || {}),
//         epfNumber: data.epfNumber || epfNumber // Use the EPF from data or the input field
//       }));
      
//       // Set dependent details - transform to expected format
//       setDependentDetails({ 
//         dependents: (data.dependents || []).map(dep => ({ 
//           relationship: dep.dependentRelationship,
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
//           examResults: (data.academicDetails.examResults || []).map(exam => ({
//             indexNumber: exam.indexNumber?.toString() || "",
//             examType: exam.examType || "",
//             stream: exam.stream || "",
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
//       setErrorMessage("Error fetching employee data: " + error.message);
//       setErrorOpen(true);
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
//       setErrorMessage("Employment details are missing.");
//       setErrorOpen(true);
//       return;
//     }

//     try {
//       await submitEmployeeData(personalDetails, spouseDetails, contactDetails, employmentDetails, academicDetails, dependentDetails);
//       console.log("🎉 Data submitted successfully!");
      
//       // Show success popup
//       setSuccessOpen(true);

//       // Reset all form states with proper initial values
//       setPersonalDetails({});  // Empty object instead of initialPersonalDetails
//       setSpouseDetails({});
//       setContactDetails({});
//       // Properly reset employment details with null values instead of empty strings
//       setEmploymentDetails({
//         presentJobType: null,
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
//       setErrorMessage("Submission failed: " + error.message);
//       setErrorOpen(true);
//     }
//   };

//   // Handle close events for snackbars
//   const handleSuccessClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setSuccessOpen(false);
//   };

//   const handleErrorClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setErrorOpen(false);
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
//          {epfNumber && epfNumber.length > 0 && (
//           <DownloadPDFButton epfNumber={epfNumber} />
//         )}
//       </Box>

//       <Box display="flex" gap={2} mt={2} width="100%">
//         <Paper elevation={3} sx={{ padding: 3, flex: 1, width: "100%" }} style={{ backgroundColor: "#FDFDFD" }}>
//           <PersonalDetailsForm parentData={personalDetails} setPersonalDetails={handlePersonalDetailsChange} checkEPFExistence={checkEPFExistence}/>
//          <DependentDetails parentData={dependentDetails} setDependentDetails={setDependentDetails}  numberOfDependents={personalDetails.numberOfDependents || 0} />
//          {/* Conditionally render SpouseDetailsForm based on isMarried state */}
//           {isMarried && (
//             <SpouseDetailsForm parentData={spouseDetails} setSpouseDetails={setSpouseDetails} />
//           )}
          
//           <ContactDetails parentData={contactDetails} setContactDetails={setContactDetails} />
         
//           <EmploymentDetailsForm parentData={employmentDetails} setEmploymentDetails={setEmploymentDetails} />
//           <AcademicDetails setAcademicDetails={setAcademicDetails} parentData={academicDetails}/>
//         </Paper>
//       </Box>
      
//       <Box display="flex" gap={2} mt={2}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleSubmit}
//         >
//           Submit
//         </Button>
//         {epfNumber && epfNumber.length > 0 && (
//           <DownloadPDFButton epfNumber={epfNumber} />
//         )}
//       </Box>

//       {/* Success Snackbar */}
//       <Snackbar
//         open={successOpen}
//         autoHideDuration={6000}
//         onClose={handleSuccessClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert 
//           onClose={handleSuccessClose} 
//           severity="success" 
//           sx={{ width: '100%', fontSize: '1rem', backgroundColor: '#4CAF50', color: 'white' }}
//           variant="filled"
//         >
//           Data submitted successfully!
//         </Alert>
//       </Snackbar>

//       {/* Error Snackbar */}
//       <Snackbar
//         open={errorOpen}
//         autoHideDuration={6000}
//         onClose={handleErrorClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert 
//           onClose={handleErrorClose} 
//           severity="error" 
//           sx={{ width: '100%', fontSize: '1rem' }}
//           variant="filled"
//         >
//           {errorMessage}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default EmployeeForm;










import { useState, useEffect, useRef } from "react";
import PersonalDetailsForm from "./PersonalDetails";
import SpouseDetailsForm from "./SpouseDetails";
import ContactDetails from "./ContactDetails";
import EmploymentDetailsForm from "./EmploymentDetailsForm";
import AcademicDetails from "./AcademicDetails";
import { submitEmployeeData, fetchEmployeeData } from "../../services/Api";
import { Button, Container, Typography, Paper, Box, TextField, Snackbar, Alert } from "@mui/material";
import DependentDetails from "./DependentDetails";
import DownloadPDFButton from "./DownloadPDFButton";
import { checkEPFExistence } from "../../services/Api"; 







const initialPersonalDetails = {};
const initialSpouseDetails = {};
const initialContactDetails = {};
const initialEmploymentDetails = {};
const initialAcademicDetails = {
  schoolLeavingYear: "",
  schoolLeavingGrade: "",
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


  const personalRef = useRef();
const contactRef = useRef();
const employmentRef = useRef();
const academicRef = useRef();
const spouseRef = useRef();
const dependentRef = useRef();
  

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

  // // Custom setPersonalDetails function that also updates the isMarried state
  // const handlePersonalDetailsChange = (newDetails) => {
  //   setPersonalDetails(newDetails);
  //   // Check if maritalStatus is being updated and update isMarried accordingly
  //   if (newDetails.maritalStatus) {
  //     setIsMarried(newDetails.maritalStatus.toLowerCase() === "married");
  //   }
  // };

  const handlePersonalDetailsChange = (newDetails) => {
    setPersonalDetails(newDetails);
    const married = newDetails.maritalStatus?.toLowerCase() === "married";
    setIsMarried(married);
  
    if (!married) {
      setSpouseDetails({}); // Clear spouse data
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
          relationship: dep.dependentRelationship,
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
          examResults: (data.academicDetails.examResults || []).map(exam => ({
            indexNumber: exam.indexNumber?.toString() || "",
            examType: exam.examType || "",
            stream: exam.stream || "",
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

  const isPersonalValid = personalRef.current?.validateForm?.() ?? true;
  const isContactValid = contactRef.current?.validateForm?.() ?? true;
  const isEmploymentValid = employmentRef.current?.validateForm?.() ?? true;
  const isAcademicValid = academicRef.current?.validateForm?.() ?? true;
  const isSpouseValid = isMarried ? spouseRef.current?.validateForm?.() ?? true : true;
  const isDependentValid = dependentRef.current?.validateForm?.() ?? true;

  const allValid = [isPersonalValid, isContactValid, isEmploymentValid, isAcademicValid, isSpouseValid, isDependentValid].every(Boolean);

  if (!allValid) {
    setErrorMessage("Please fill all required fields.");
    setErrorOpen(true);
    return;
  }

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
        presentJobType: null,
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
         {epfNumber && epfNumber.length > 0 && (
          <DownloadPDFButton epfNumber={epfNumber} />
        )}
      </Box>

      <Box display="flex" gap={2} mt={2} width="100%">
        <Paper elevation={3} sx={{ padding: 3, flex: 1, width: "100%" }} style={{ backgroundColor: "#FDFDFD" }}>
          <PersonalDetailsForm ref={personalRef} parentData={personalDetails} setPersonalDetails={handlePersonalDetailsChange} checkEPFExistence={checkEPFExistence}/>
         <DependentDetails parentData={dependentDetails} setDependentDetails={setDependentDetails}  numberOfDependents={personalDetails.numberOfDependents || 0} />
         {/* Conditionally render SpouseDetailsForm based on isMarried state */}
          {isMarried && (
            <SpouseDetailsForm parentData={spouseDetails} setSpouseDetails={setSpouseDetails} />
          )}
          
          <ContactDetails ref={contactRef} parentData={contactDetails} setContactDetails={setContactDetails} />
         
          <EmploymentDetailsForm ref={employmentRef} parentData={employmentDetails} setEmploymentDetails={setEmploymentDetails} />
          <AcademicDetails ref={academicRef} setAcademicDetails={setAcademicDetails} parentData={academicDetails}/>
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