import { Grid } from '@mui/material';
import React from 'react'
import { useState } from 'react' 
import addressData from "../../data/addressData.json"
import { Typography, TextField } from "@mui/material";


const ContactDetails = ( {setContactDetails} ) => {
  const [ formData, setFormData] = useState (
    {
        temporaryAddress: '',
        temporaryPostalCode: '',
        temporaryDistrict: '',
        temporaryProvince: '',
        distantBetWorkPlaceAndTemporyAddress: '',
        permanentAddress: '',
        permanentPostalCode: '',
        permanentGramaDivision: '',
        permanentAGADivision: '',
        permanentElectoral: '',
        policeDivision: '',
        permanentDistrict: '',
        permanentProvince: '',
        distantBetWorkPlaceAndPermanentAddress: '',
        telephoneNumber: '',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
  
    if (name === "permanentGramaDivision") {
      const addressInfo = addressData.find((item) => item.GND_Name === value);
      if (addressInfo) {
        updatedFormData.permanentProvince = addressInfo.Province_Name;
        updatedFormData.permanentDistrict = addressInfo.District_Name;
        updatedFormData.permanentElectoral = addressInfo.Polling_Division_Name;
        updatedFormData.permanentAGADivision = addressInfo.DSD_Name;
      } else {
        updatedFormData.permanentProvince = "";
        updatedFormData.permanentDistrict = "";
        updatedFormData.permanentElectoral = "";
        updatedFormData.permanentAGADivision = "";
      }
    }

    if (name === "temporaryDistrict") {
      const addressInfo = addressData.find((item) => item.District_Name === value);
      if (addressInfo) {
        updatedFormData.temporaryProvince = addressInfo.Province_Name;
        
      } else {
        updatedFormData.permanentProvince = "";
      }
    }
  
    setFormData(updatedFormData);
    setContactDetails(updatedFormData);
  };
  
    
  

  return (
    <Grid item xs={11.4} container spacing={1} sx={{ ml:3}}>
      {/* <Grid item xs={12} container spacing={1} sx={{ ml: 2 }}></Grid> */}
      <Grid >
       <Typography sx={{  mt : 5   }} variant="h5" gutterBottom style={{ fontWeight: 'bold', color:"rgb(58, 53, 54)", fontFamily: 'Roboto, sans-serif', textAlign: "left",  }}>
        Contact Details 
        </Typography>
      </Grid>
        <Grid container spacing={2}>
        <Typography variant="h6" sx={{ mt: 3, ml:2 }} style={{ fontSize:"18px", color:"rgb(65, 63, 63)", }}>
          Temporary Address Details</Typography>
          <Grid item xs={12}>
            <TextField label="Temporary Address" name="temporaryAddress" fullWidth variant="outlined" value={formData.temporaryAddress} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Postal Code" name="temporaryPostalCode" fullWidth variant="outlined" value={formData.temporaryPostalCode} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="District" name="temporaryDistrict" fullWidth variant="outlined" value={formData.temporaryDistrict} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Province" name="temporaryProvince" fullWidth variant="outlined" value={formData.temporaryProvince} readOnly />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Distance to Workplace (km)" name="distantBetWorkPlaceAndTemporyAddress" type="number" fullWidth variant="outlined" value={formData.distantBetWorkPlaceAndTemporyAddress} onChange={handleChange} required />
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 5, ml:0, mb:2 }} style={{ fontSize:"18px", color:"rgb(41, 40, 40)", }}>
          Permanent Address Details
          </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Permanent Address" name="permanentAddress" fullWidth variant="outlined" value={formData.permanentAddress} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Postal Code" name="permanentPostalCode" type="number" fullWidth variant="outlined" value={formData.permanentPostalCode} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Grama Division" name="permanentGramaDivision" fullWidth variant="outlined" value={formData.permanentGramaDivision} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="AGA Division" name="permanentAGADivision" fullWidth variant="outlined" value={formData.permanentAGADivision} readOnly />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Electoral Division" name="permanentElectoral" fullWidth variant="outlined" value={formData.permanentElectoral} readOnly />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Police Division" name="policeDivision" fullWidth variant="outlined" value={formData.policeDivision} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="District" name="permanentDistrict" fullWidth variant="outlined" value={formData.permanentDistrict} readOnly />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Province" name="permanentProvince" fullWidth variant="outlined" value={formData.permanentProvince} readOnly />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Distance to Workplace (km)" name="distantBetWorkPlaceAndPermanentAddress" type="number" fullWidth variant="outlined" value={formData.distantBetWorkPlaceAndPermanentAddress} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Telephone Number" name="telephoneNumber"  fullWidth variant="outlined" value={formData.telephoneNumber} onChange={handleChange} required />
          </Grid>
        </Grid>
    </Grid>
  )
}

export default ContactDetails;
