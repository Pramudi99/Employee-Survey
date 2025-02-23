import { useState } from "react";
import PersonalDetailsForm from "./PersonalDetails";
import SpouseDetailsForm from "./SpouseDetails";
import { submitEmployeeData } from "../../services/Api";
import { Button, Container, Typography } from "@mui/material";

const EmployeeForm = () => {
  const [personalDetails, setPersonalDetails] = useState({});
  const [spouseDetails, setSpouseDetails] = useState({});

  const handleSubmit = async () => {
    try {
      await submitEmployeeData(personalDetails, spouseDetails);
      alert("Data submitted successfully!");
    } catch (error) {
      alert("Error submitting data");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Employee Registration</Typography>
      <PersonalDetailsForm setPersonalDetails={setPersonalDetails} />
      <SpouseDetailsForm setSpouseDetails={setSpouseDetails} />
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>Submit</Button>
    </Container>
  );
};

export default EmployeeForm;
