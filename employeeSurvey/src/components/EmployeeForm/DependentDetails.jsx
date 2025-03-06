import React, { useState, useEffect } from 'react';
import { TextField, Grid, Typography, Button, IconButton, MenuItem } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const DependentDetails = ({ setDependentDetails, parentData }) => {
    const [dependentDetails, setLocalDependentDetails] = useState({
        dependents: [
        ],
    });

    const [showAddDependent, setShowAddDependent] = useState(false);

     useEffect(() => {
        // console.log("Parent data:", parentData); // Debugging output
      
        setLocalDependentDetails((prevDetails) => {
          const newDetails = {
            ...prevDetails,
            dependents: Array.isArray(parentData?.dependents) ? parentData.dependents : prevDetails.dependents,
            
          };
      
          // Prevent unnecessary updates
          if (JSON.stringify(prevDetails) === JSON.stringify(newDetails)) {
            return prevDetails;
          }
          
          return newDetails;
        });
      }, [parentData]);
      
      useEffect(() => {
        setDependentDetails((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(dependentDetails)) {
            return dependentDetails;
          }
          return prev;
        });
      }, [dependentDetails, setDependentDetails]);
      


    // Sync local state with parent state
    useEffect(() => {
        setDependentDetails(dependentDetails);
    }, [dependentDetails, setDependentDetails]);

    // Handle field updates
    const handleDependentChange = (index, field, value) => {
        const updatedDependents = [...dependentDetails.dependents];
        updatedDependents[index][field] = value;
        setLocalDependentDetails({ dependents: updatedDependents });
    };

    // Add a new dependent
    const addDependent = () => {
        setShowAddDependent(true);
        setLocalDependentDetails((prevDetails) => ({
            dependents: [
                ...prevDetails.dependents,
                { fullName: "", gender: "", dateOfBirth: "", occupation: "", occupationAddress: "" }
            ]
        }));
    };

    // Remove a dependent
    const removeDependent = (index) => {
        setLocalDependentDetails((prevDetails) => ({
            dependents: prevDetails.dependents.filter((_, i) => i !== index)
        }));
    };

    return (
        <Grid container item xs={11.7} spacing={2} sx={{ ml: 2, mt: 2 }}>
            {/* <Grid item xs={12}>
                <Typography sx={{ ml: 1.5, mt: 4 }} variant="h5" gutterBottom style={{ fontWeight: 'bold', color: "rgb(58, 53, 54)", fontFamily: 'Roboto, sans-serif', textAlign: "left" }}>
                    Details of Dependent
                </Typography>
            </Grid> */}

            <Grid container alignItems="center" sx={{ ml: 0, mt: 4 }}>
                      <Typography 
                        variant="h6" 
                        gutterBottom 
                        style={{  fontStyle: "italic", color: "gold", fontFamily: 'Roboto, sans-serif', textAlign: "left" }}
                      >
                        If you have dependents{" "}
                        <Button 
                          onClick={addDependent} 
                          variant="text" 
                          color="secondary"
                          sx={{ fontSize: "1rem", textTransform: "none" }} 
                        >
                          Click Here
                        </Button> 
                      </Typography>
                    </Grid>

            {dependentDetails.dependents.map((dependent, index) => (
                <Grid container spacing={2} key={index} sx={{ mt: -1, p: 2, borderBottom: "1px solid #ddd" }}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Full Name" value={dependent.fullName} onChange={(e) => handleDependentChange(index, "fullName", e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth select label="Gender" value={dependent.gender} onChange={(e) => handleDependentChange(index, "gender", e.target.value)} >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} value={dependent.dateOfBirth} onChange={(e) => handleDependentChange(index, "dateOfBirth", e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth select label="Occupation" value={dependent.occupation} onChange={(e) => handleDependentChange(index, "occupation", e.target.value)} >
                            <MenuItem value="Employed">Employed</MenuItem>
                            <MenuItem value="Studies">Studies</MenuItem>
                            <MenuItem value="None">None</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Occupation Address" value={dependent.occupationAddress} onChange={(e) => handleDependentChange(index, "occupationAddress", e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton color="error" onClick={() => removeDependent(index)}>
                            <Delete />
                        </IconButton>
                    </Grid>
                </Grid>
            ))}

            <Grid item xs={12}>
            {showAddDependent && (
                <Button variant="text" startIcon={<Add />} onClick={addDependent} sx={{ mt: 2 }}>
                    Add Dependent
                </Button>
            )}
            </Grid>
        </Grid>
    );
};

export default DependentDetails;
