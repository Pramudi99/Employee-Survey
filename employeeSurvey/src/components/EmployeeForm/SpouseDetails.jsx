import { useState } from "react";
import { TextField, Grid } from "@mui/material";

const SpouseDetailsForm = ({ setSpouseDetails }) => {
  const [formData, setFormData] = useState({
    nameWithInitials: "",
    fullName: "",
    dateOfBirth: "",
    nicNumber: "",
    address: "",
    postalCode: 0,  // Ensure this is a number
    contactNumber: "",
    workPlaceAddress: "",
    workPlaceTeleNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    
    // Convert postalCode and contactNumber to numbers if fields are updated
    if (name === "postalCode" || name === "workPlaceTeleNumber" || name === "contactNumber") {
      updatedFormData[name] = Number(value);
    }

    setFormData(updatedFormData);
    setSpouseDetails(updatedFormData);  // Pass updated data to parent
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {Object.keys(formData).map((key) => (
        <Grid item xs={12} sm={6} key={key}>
          <TextField
            fullWidth
            label={key.replace(/([A-Z])/g, " $1").trim()}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            type={key === "dateOfBirth" ? "date" : "text"}  // For dateOfBirth, use type="date"
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default SpouseDetailsForm;
