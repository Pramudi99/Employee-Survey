



import { useState } from "react";
import PersonalDetailsForm from "./PersonalDetails";
import SpouseDetailsForm from "./SpouseDetails";
import ContactDetails from "./ContactDetails";
import EmploymentDetailsForm from "./EmploymentDetailsForm";
import AcademicDetails from "./AcademicDetails";
import { submitEmployeeData, fetchEmployeeData } from "../../services/Api";
import { Button, Container, Typography, Paper, Box, TextField } from "@mui/material";
import DependentDetails from "./DependentDetails";


const EmployeeForm = () => {
  const [personalDetails, setPersonalDetails] = useState({});
  const [spouseDetails, setSpouseDetails] = useState({});
  const [contactDetails, setContactDetails] = useState({});
  const [employmentDetails, setEmploymentDetails] = useState({});
  const [academicDetails, setAcademicDetails] = useState ({});
  const [dependentDetails, setDependentDetails] = useState ({});
  const [epfNumber, setEpfNumber] = useState("");


  const handleFetchEmployeeData = async () => {
    if (!epfNumber) {
      console.error("❌ Please enter an EPF number.");
      return;
    }
  
    try {
      const data = await fetchEmployeeData(epfNumber);
      console.log("✅ Employee Data Fetched:", data);
  
      // Set personal details
      setPersonalDetails(data || {});
      
      // Set spouse details
      setSpouseDetails(data.spouseDetails || {});
      
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
      
      // Set employment details
      setEmploymentDetails(data.employmentDetails || {});
      
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
        // Keep default state if no data
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
      }
    } catch (error) {
      console.error("❌ Error fetching employee data:", error.message);
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
      console.error("❌ Employment details are missing.");
      return;
    }

    try {
      await submitEmployeeData(personalDetails, spouseDetails, contactDetails, employmentDetails,academicDetails, dependentDetails);
      console.log("🎉 Data submitted successfully!");

      // setPersonalDetails({});
      // setSpouseDetails({});
      // setContactDetails({});
      // setEmploymentDetails({});
      // setAcademicDetails({});

    } catch (error) {
      console.error("❌ Submission failed:", error.message);
    }
  };

  return (
    <Container maxWidth={false} sx={{ width: "90vw", maxWidth: "2000px" }}>
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

     <Paper elevation={3} sx={{ padding: 3, flex: 1, width: "100%" }}>
     <PersonalDetailsForm parentData={personalDetails} setPersonalDetails={setPersonalDetails} />
     <ContactDetails parentData={contactDetails} setContactDetails={setContactDetails} />
      {/* </Paper> */}
     {/* <Paper elevation={3} sx={{ padding: 3, flex: 1, width: "100%" }}> */}
     <EmploymentDetailsForm parentData={employmentDetails} setEmploymentDetails={setEmploymentDetails} />
     <DependentDetails parentData={dependentDetails} setDependentDetails={setDependentDetails}/>
      {/* </Paper> */}

     
      {/* </Box>
    
      <Box display="flex" gap={2} mt={2} width="100%"> */}
        {/* <Paper elevation={3} sx={{ padding: 3, flex: 1, width: "100%" }}> */}
        <SpouseDetailsForm parentData={spouseDetails} setSpouseDetails={setSpouseDetails} />
              {/* </Paper> */}
      

      {/* <Paper elevation={3} sx={{ padding: 3, flex: 1, width: "100%" }}> */}
      <AcademicDetails setAcademicDetails={setAcademicDetails} parentData={academicDetails}/>
      </Paper></Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Container>
  );
};

export default EmployeeForm;