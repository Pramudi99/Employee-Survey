

import { useState } from "react";
import PersonalDetailsForm from "./PersonalDetails";
import SpouseDetailsForm from "./SpouseDetails";
import ContactDetails from "./ContactDetails";
import EmploymentDetailsForm from "./EmploymentDetailsForm";
import AcademicDetails from "./AcademicDetails";
import { submitEmployeeData } from "../../services/Api";
import { Button, Container, Typography, Paper, Box } from "@mui/material";

const EmployeeForm = () => {
  const [personalDetails, setPersonalDetails] = useState({});
  const [spouseDetails, setSpouseDetails] = useState({});
  const [contactDetails, setContactDetails] = useState({});
  const [employmentDetails, setEmploymentDetails] = useState({});
  const [academicDetails, setAcademicDetails] = useState ({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", {
      personalDetails,
      spouseDetails,
      contactDetails,
      employmentDetails,
      academicDetails,
    });

    if (!employmentDetails || Object.keys(employmentDetails).length === 0) {
      console.error("❌ Employment details are missing.");
      return;
    }

    try {
      await submitEmployeeData(personalDetails, spouseDetails, contactDetails, employmentDetails,academicDetails);
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
     <Typography variant="h2" gutterBottom style={{ fontWeight: 'bold', textAlign: 'center', color: 'Gray', fontFamily: 'Roboto, sans-serif', }}>
       Employee Survey CPC - 2025
     </Typography>

     <Box display="flex" gap={2} mt={2} width="100%">

     <Paper elevation={3} sx={{ padding: 3, flex: 1, width: "100%" }}>
      <PersonalDetailsForm setPersonalDetails={setPersonalDetails} />
      <ContactDetails setContactDetails={setContactDetails} />
      </Paper>
     <Paper elevation={3} sx={{ padding: 3, flex: 1, width: "100%" }}>
      <EmploymentDetailsForm setEmploymentDetails={setEmploymentDetails} />
      </Paper>

     
      </Box>
    
      <Box display="flex" gap={2} mt={2} width="100%">
        <Paper elevation={3} sx={{ padding: 3, flex: 1, width: "100%" }}>
              <SpouseDetailsForm setSpouseDetails={setSpouseDetails} />
              </Paper>
      

      <Paper elevation={3} sx={{ padding: 3, flex: 1, width: "100%" }}>
      <AcademicDetails setAcademicDetails={setAcademicDetails}/>
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
