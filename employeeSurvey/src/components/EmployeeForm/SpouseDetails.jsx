import { useState, useEffect } from "react";
import { TextField, Grid, Typography } from "@mui/material";

const SpouseDetailsForm = ({ setSpouseDetails }) => {
  const [formData, setFormData] = useState({
    nameWithInitials: "",
    fullName: "",
    dateOfBirth: "",
    nicNumber: "",
    address: "",
    postalCode: "",
    contactNumber: "",
    workPlaceAddress: "",
    workPlaceTeleNumber: "",
    gender: ""
  });

  // 🔄 Update parent state AFTER render
  useEffect(() => {
    setSpouseDetails(formData);
  }, [formData, setSpouseDetails]);

  const extractNICDetails = (nic) => {
    let birthYear, dayOfYear;
    if (/^\d{9}[VX]$/.test(nic)) {
      birthYear = `19${nic.substring(0, 2)}`;
      dayOfYear = parseInt(nic.substring(2, 5), 10);
    } else if (/^\d{12}$/.test(nic)) {
      birthYear = nic.substring(0, 4);
      dayOfYear = parseInt(nic.substring(4, 7), 10);
    } else {
      return { dateOfBirth: "", gender: "" };
    }

    let gender = "Male";
    if (dayOfYear > 500) {
      dayOfYear -= 500;
      gender = "Female";
    }
    const dob = new Date(birthYear, 0, dayOfYear);
    const dateOfBirth = dob.toISOString().split("T")[0];

    return { dateOfBirth, gender };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      let updatedFormData = { ...prevFormData, [name]: value };

      // If NIC changes, auto-update DOB & Gender
      if (name === "nicNumber") {
        const { dateOfBirth, gender } = extractNICDetails(value);
        updatedFormData = { ...updatedFormData, dateOfBirth, gender };
      }
      return updatedFormData;
    });
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Typography sx={{ ml: 2, mt: 3 }} variant="h4" gutterBottom>Details of the Spouse</Typography>
      <Grid item xs={12}>
        <TextField label="Name with Initials" name="nameWithInitials" fullWidth variant="outlined" value={formData.nameWithInitials} onChange={handleChange} required />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Full Name" name="fullName" fullWidth variant="outlined" value={formData.fullName} onChange={handleChange} required />
      </Grid>
      <Grid item xs={12}>
        <TextField label="NIC Number" name="nicNumber" fullWidth variant="outlined" value={formData.nicNumber} onChange={handleChange} required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="Date of Birth" name="dateOfBirth" type="date" fullWidth variant="outlined" InputLabelProps={{ shrink: true }} value={formData.dateOfBirth} onChange={handleChange} required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="Contact No" name="contactNumber" fullWidth variant="outlined" value={formData.contactNumber} onChange={handleChange} required />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Address" name="address" fullWidth variant="outlined" value={formData.address} onChange={handleChange} required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="Postal Code" name="postalCode" type="number" fullWidth variant="outlined" value={formData.postalCode} onChange={handleChange} required />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Address of the place of work" name="workPlaceAddress" fullWidth variant="outlined" value={formData.workPlaceAddress} onChange={handleChange} required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="Contact No at the place of work" name="workPlaceTeleNumber" fullWidth variant="outlined" value={formData.workPlaceTeleNumber} onChange={handleChange} required />
      </Grid>
    </Grid>
  );
};

export default SpouseDetailsForm;
