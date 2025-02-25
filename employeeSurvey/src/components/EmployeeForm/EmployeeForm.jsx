// import { useState } from "react";
// import PersonalDetailsForm from "./PersonalDetails";
// import SpouseDetailsForm from "./SpouseDetails";
// import ContactDetails from "./ContactDetails";
// import { submitEmployeeData } from "../../services/Api";
// import { Button, Container, Typography } from "@mui/material";

// const EmployeeForm = () => {
//   const [personalDetails, setPersonalDetails] = useState({});
//   const [spouseDetails, setSpouseDetails] = useState({});
//   const [contactDetails, setContactDetails] = useState({});

//   const handleSubmit = async () => {
//     try {
//       await submitEmployeeData(personalDetails, spouseDetails, contactDetails);
//       alert("Data submitted successfully!");
//     } catch (error) {
//       alert("Error submitting data");
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>Employee Survey</Typography>
//       <PersonalDetailsForm setPersonalDetails={setPersonalDetails} />
//       <ContactDetails setContactDetails = {setContactDetails}/>
//       <SpouseDetailsForm setSpouseDetails={setSpouseDetails} />
//       <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>Submit</Button>
//     </Container>
//   );
// };

// export default EmployeeForm;



import { useState } from "react";
import PersonalDetailsForm from "./PersonalDetails";
import SpouseDetailsForm from "./SpouseDetails";
import ContactDetails from "./ContactDetails";
import EmploymentDetailsForm from "./EmploymentDetailsForm";
import { submitEmployeeData } from "../../services/Api";
import { Button, Container, Typography } from "@mui/material";

const EmployeeForm = () => {
  const [personalDetails, setPersonalDetails] = useState({});
  const [spouseDetails, setSpouseDetails] = useState({});
  const [contactDetails, setContactDetails] = useState({});
  const [employmentDetails, setEmploymentDetails] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", {
      personalDetails,
      spouseDetails,
      contactDetails,
      employmentDetails,
    });

    if (!employmentDetails || Object.keys(employmentDetails).length === 0) {
      console.error("❌ Employment details are missing.");
      return;
    }

    try {
      await submitEmployeeData(personalDetails, spouseDetails, contactDetails, employmentDetails);
      console.log("🎉 Data submitted successfully!");
    } catch (error) {
      console.error("❌ Submission failed:", error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employee Survey
      </Typography>
      <PersonalDetailsForm setPersonalDetails={setPersonalDetails} />
      <ContactDetails setContactDetails={setContactDetails} />
      <SpouseDetailsForm setSpouseDetails={setSpouseDetails} />
      <EmploymentDetailsForm setEmploymentDetails={setEmploymentDetails} />
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
