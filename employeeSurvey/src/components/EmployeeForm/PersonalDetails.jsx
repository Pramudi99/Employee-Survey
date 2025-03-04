import { useState, useEffect } from "react";
import { TextField, Grid, MenuItem, Typography } from "@mui/material";

const PersonalDetailsForm = ({ setPersonalDetails, parentData }) => {
  const [formData, setFormData] = useState({
    epfNumber: "",
    nameWithInitials: "",
    title:"",
    fullName: "",
    gender: "",
    maritalStatus: "",
    bloodGroup: "",
    dateOfBirth: "",
    nicNumber: "",
    drivingLicense: "",
    passportNumber: "",
    religion: "",
    race: "",
    numberOfDependents: 0,  
  });

  useEffect(() => {
    if (parentData) {
      setFormData((prevData) => ({
        ...prevData,
        ...parentData,
      }));
    }
  }, [parentData]);

  

    // Function to extract birthday and gender from NIC number
    const extractNICDetails = (nic) => {
        let birthYear, dayOfYear;
        
        if (/^\d{9}[VX]$/.test(nic)) {
          // Old NIC format: 921532345V
          birthYear = `19${nic.substring(0, 2)}`;
          dayOfYear = parseInt(nic.substring(2, 5), 10);
        } else if (/^\d{12}$/.test(nic)) {
          // New NIC format: 20021230345V
          birthYear = nic.substring(0, 4);
          dayOfYear = parseInt(nic.substring(4, 7), 10);
        } else {
          return { dateOfBirth: "", gender: "" }; // Invalid NIC format
        }
    
        // Determine gender
        let gender = "Male";
        if (dayOfYear > 500) {
          dayOfYear -= 500;
          gender = "Female";
        }
        
        if (((birthYear % 4) === 0) || (dayOfYear <= 59 ) ) {  // Corrected condition syntax
            const dob = new Date(birthYear, 0, dayOfYear + 1); 
            var dateOfBirth = dob.toISOString().split("T")[0]; // Declare with var/let to use outside if block
        } else {
            // Convert dayOfYear to actual date
            const dob = new Date(birthYear, 0, dayOfYear);
            var dateOfBirth = dob.toISOString().split("T")[0]; // Declare with var/let
        }
       
    
        return { dateOfBirth, gender };
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormData((prevFormData) => {
            let updatedFormData = { ...prevFormData, [name]: value };
    
            if (name === "nicNumber") {
                const { dateOfBirth, gender } = extractNICDetails(value);
                updatedFormData = { ...updatedFormData, dateOfBirth, gender };
            }
    
            if (name === "numberOfDependents") {
                updatedFormData[name] = value ? Number(value) : 0;
            }
    
            setPersonalDetails(updatedFormData);  // Pass updated data to parent
            return updatedFormData; // Ensures React gets the correct state update
        });
    };
    

  return (
    
    <Grid container spacing={2}>
      <Typography sx={{ ml: 3, mt: 4 }} variant="h4" gutterBottom style={{ fontWeight: 'bold', color:"rgb(129, 43, 57)", fontFamily: 'Roboto, sans-serif', textAlign:'center'}}>
        General Details 
        </Typography>
        <Grid item xs={11.5} container spacing={1} sx={{ ml: 2 , mt:3}}>
        <Grid >
       <Typography sx={{ ml: 1 , mt: -2  }} variant="h5" gutterBottom style={{ fontWeight: 'bold', color:"rgb(58, 53, 54)", fontFamily: 'Roboto, sans-serif', textAlign: "left",  }}>
        Personal Details 
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField label="EPF Number" name="epfNumber" fullWidth variant="outlined" value={formData.epfNumber} onChange={handleChange} required />
      </Grid>

      <Grid item xs={12} sm={1.5}>
        <TextField select label="Title" name="title" fullWidth variant="outlined" value={formData.title || "Mr"} onChange={handleChange} required>
          <MenuItem value="Mr">Mr.</MenuItem>
          <MenuItem value="Mrs">Mrs.</MenuItem>
          <MenuItem value="Miss">Miss.</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={10.5}>
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
        <TextField label="Gender" name="gender" fullWidth variant="outlined" value={formData.gender} onChange={handleChange}  InputProps={{readOnly: true,}} />
          
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField select label="Marital Status" name="maritalStatus" fullWidth variant="outlined" value={formData.maritalStatus} onChange={handleChange} required>
          <MenuItem value="Single">Single</MenuItem>
          <MenuItem value="Married">Married</MenuItem>
          <MenuItem value="Divorced">Divorced</MenuItem>
          <MenuItem value="Separated">Separated</MenuItem>
          <MenuItem value="Widowed">Widow</MenuItem>
          <MenuItem value="Widowed">Widower</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField select label="Blood Group" name="bloodGroup" fullWidth variant="outlined" value={formData.bloodGroup} onChange={handleChange} required>
          <MenuItem value="O+">O+</MenuItem>
          <MenuItem value="O-">O-</MenuItem>
          <MenuItem value="A+">A+</MenuItem>
          <MenuItem value="A-">A-</MenuItem>
          <MenuItem value="B+">B+</MenuItem>
          <MenuItem value="B-">B-</MenuItem>
          <MenuItem value="AB+">AB+</MenuItem>
          <MenuItem value="AB-">AB-</MenuItem>
        </TextField>
      </Grid>
      {/* <Grid item xs={12} sm={6}>
        <TextField label="Date of Birth" name="dateOfBirth" type="date" fullWidth variant="outlined" InputLabelProps={{ shrink: true }} value={formData.dateOfBirth} onChange={handleChange} required />
      </Grid>
      <Grid item xs={12}>
        <TextField label="NIC Number" name="nicNumber" fullWidth variant="outlined" value={formData.nicNumber} onChange={handleChange} required />
      </Grid> */}
     
      <Grid item xs={12}>
        <TextField label="Driving License" name="drivingLicense" fullWidth variant="outlined" value={formData.drivingLicense} onChange={handleChange} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Passport Number" name="passportNumber" fullWidth variant="outlined" value={formData.passportNumber} onChange={handleChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField select label="Religion" name="religion" fullWidth variant="outlined" value={formData.religion || "Buddhism"} onChange={handleChange} required >
          <MenuItem value="Buddhism">Buddhism</MenuItem>
          <MenuItem value="Hindu">Hindu</MenuItem>
          <MenuItem value="Islam">Islam</MenuItem>
          <MenuItem value="Christianity">Christianity</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField select label="Race" name="race" fullWidth variant="outlined" value={formData.race || "Sinhala"} onChange={handleChange} required >
        <MenuItem value="Sinhala">Sinhala</MenuItem>
          <MenuItem value="Tamil">Tamil</MenuItem>
          <MenuItem value="Muslim">Muslim</MenuItem>
          <MenuItem value="Burgher">Burgher</MenuItem>
          <MenuItem value="Malay"> Malay</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField label="Number of Dependents" name="numberOfDependents"  fullWidth variant="outlined" value={formData.numberOfDependents} onChange={handleChange} required />
      </Grid>
      </Grid>
    </Grid>
  );
};

export default PersonalDetailsForm;