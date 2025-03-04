import { useState, useEffect, useRef } from "react";
import { TextField, Grid, Typography, MenuItem } from "@mui/material";

const SpouseDetailsForm = ({ setSpouseDetails, parentData }) => {
  const [formData, setFormData] = useState({
    title: "",
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
       
  // Only update formData when parentData changes
  useEffect(() => {
    if (parentData && JSON.stringify(parentData) !== JSON.stringify(formData)) {
      setFormData(parentData);
    }
  }, [parentData]);
  
  // Only update parent when formData changes due to user input
  // NOT when formData changes due to parentData updates
  const isUserChange = useRef(false);
  
  useEffect(() => {
    // Only update the parent if this was a user-initiated change
    if (isUserChange.current) {
      setSpouseDetails(formData);
      isUserChange.current = false;
    }
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
    // Flag that this change was initiated by the user
    isUserChange.current = true;
    
    setFormData((prevFormData) => {
      let updatedFormData = { ...prevFormData, [name]: value };
  
      if (name === "nicNumber") {
        const { dateOfBirth, gender } = extractNICDetails(value);
        updatedFormData = { ...updatedFormData, dateOfBirth, gender };
      }
  
      return updatedFormData;
    });
  };

  return (
    <Grid container spacing={2} sx={{ mt: -2, ml:1 }}>
     <Typography sx={{ ml: 1, mt: 10 }} variant="h4" gutterBottom style={{ fontWeight: 'bold', color:"rgb(129, 43, 57)", fontFamily: 'Roboto, sans-serif', textAlign:'center'}}>
             Details of Spouse 
             </Typography>
             <Grid item xs={11.5} container spacing={1} sx={{ ml: 0, mt:0}}>
          <Grid item xs={12} sm={1.5}>
            <TextField  select label="Title"  name="title"  fullWidth  variant="outlined"  value={formData.title || "Mr"}  onChange={handleChange}  required  >
              <MenuItem value="Mr">Mr.</MenuItem>
              <MenuItem value="Mrs">Mrs.</MenuItem>
              <MenuItem value="Miss">Miss.</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={10.5}>
            <TextField label="Name with Initials" name="nameWithInitials"fullWidth variant="outlined" value={formData.nameWithInitials} onChange={handleChange}  required />
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
    </Grid>
  );
};

export default SpouseDetailsForm;