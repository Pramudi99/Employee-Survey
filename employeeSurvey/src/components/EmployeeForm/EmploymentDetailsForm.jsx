import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Typography,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const EmploymentDetailsForm = ({ setEmploymentDetails, parentData }) => {
  const [employmentDetails, setLocalEmploymentDetails] = useState({
    presentJobCategory: "",
    presentDesignation: "",
    presentGrade: "",
    joinedAs: "",
    joinedDetails: {},
    employmentAddresses: [
      { addressType: "Permanent", location: "", function: "", subFunction: "" },
      { addressType: "Temporary", location: "", function: "", subFunction: "" },
    ],
    promotions: [],
  });



  useEffect(() => {
    // console.log("Parent data:", parentData); // Debugging output
  
    setLocalEmploymentDetails((prevDetails) => {
      const newDetails = {
        ...prevDetails,
        presentJobCategory: parentData?.presentJobCategory || prevDetails.presentJobCategory,
        presentDesignation: parentData?.presentDesignation || prevDetails.presentDesignation,
        presentGrade: parentData?.presentGrade || prevDetails.presentGrade,
        joinedAs: parentData?.joinedDetails?.joinedType || prevDetails.joinedAs,
        joinedDetails: parentData?.joinedDetails
          ? {
              joinedType: parentData.joinedDetails.joinedType || prevDetails.joinedDetails.joinedType,
              epfNumber: parentData.joinedDetails.epfNumber || prevDetails.joinedDetails.epfNumber,
              designation: parentData.joinedDetails.designation || prevDetails.joinedDetails.designation,
              grade: parentData.joinedDetails.grade || prevDetails.joinedDetails.grade,
              date: parentData.joinedDetails.date || prevDetails.joinedDetails.date,
            }
          : prevDetails.joinedDetails,
        promotions: Array.isArray(parentData?.promotions) ? parentData.promotions : prevDetails.promotions,
        employmentAddresses: Array.isArray(parentData?.employmentAddresses) ? parentData.employmentAddresses : prevDetails.employmentAddresses,
      };
  
      // Prevent unnecessary updates
      if (JSON.stringify(prevDetails) === JSON.stringify(newDetails)) {
        return prevDetails;
      }
      
      return newDetails;
    });
  }, [parentData]);
  
  useEffect(() => {
    setEmploymentDetails((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(employmentDetails)) {
        return employmentDetails;
      }
      return prev;
    });
  }, [employmentDetails, setEmploymentDetails]);
  
  
  useEffect(() => {
    setEmploymentDetails(employmentDetails);
  }, [employmentDetails, setEmploymentDetails]);
  



  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalEmploymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
      ...(name === "joinedAs" && {
        joinedDetails: value === "Permanent"
          ? { joinedType: "Permanent", epfNumber: "", designation: "", grade: "", date: "" }
          : { joinedType: "Contract", epfNumber: "", designation: "", grade: "", date: "" },
      }),
    }));
  };

  const handleJoinedDetailsChange = (field, value) => {
    setLocalEmploymentDetails((prevDetails) => ({
      ...prevDetails,
      joinedDetails: { ...prevDetails.joinedDetails, [field]: value },
    }));
  };

  // const handleEmploymentAddressChange = (index, field, value) => {
  //   const updatedAddresses = [...employmentDetails.employmentAddresses];
  //   updatedAddresses[index][field] = value;
  //   setLocalEmploymentDetails((prevDetails) => ({
  //     ...prevDetails,
  //     employmentAddresses: updatedAddresses,
  //   }));
  // };

  const handleEmploymentAddressChange = (index, field, value) => {
    setLocalEmploymentDetails((prevDetails) => {
      const updatedAddresses = prevDetails.employmentAddresses.map((address, i) =>
        i === index ? { ...address, [field]: value } : address
      );
      return { ...prevDetails, employmentAddresses: updatedAddresses };
    });
  };
  

  const handlePromotionChange = (index, field, value) => {
    const updatedPromotions = [...employmentDetails.promotions];
    updatedPromotions[index][field] = value;
    setLocalEmploymentDetails((prevDetails) => ({
      ...prevDetails,
      promotions: updatedPromotions,
    }));
  };

  const addPromotion = () => {
    const newPromotion = { grade: "", designation: "", durationFrom: "", durationTo: "", location: "", function: "", subFunction: "" };
    setLocalEmploymentDetails((prevDetails) => ({
      ...prevDetails,
      promotions: [...prevDetails.promotions, newPromotion],
    }));
  };

  const removePromotion = (index) => {
    if (employmentDetails.promotions.length > 1) {
    const updatedPromotions = employmentDetails.promotions.filter((_, i) => i !== index);
    setLocalEmploymentDetails((prevDetails) => ({
      ...prevDetails,
      promotions: updatedPromotions,
    }));
  }
  };


  // const isLastPromotionFilled = () => {
  //   const lastPromotion =     employmentDetails.promotions
  //     [    employmentDetails.promotions.length - 1];
  //   return Object.values(lastPromotion).every((value) => value.trim() !== "");
  // };
 
  return (
    <Grid container spacing={2} sx={{ mt: 2}}>
       <Typography sx={{ ml: 3, mt: -2 }} variant="h4" gutterBottom style={{ fontWeight: 'bold', color:"rgb(129, 43, 57)", fontFamily: 'Roboto, sans-serif', }}>
        Employment Details 
        </Typography>
        <Grid item xs={11.8} container spacing={1} sx={{ ml: 1 }}>
        <Grid container spacing={2}>
  <Grid item xs={12}>
    <Typography 
      sx={{ ml: 1.5, mt: -2 }} 
      variant="h5" 
      gutterBottom 
      style={{ fontWeight: 'bold', color: "rgb(58, 53, 54)", fontFamily: 'Roboto, sans-serif', textAlign: "left" }}
    >
      Details of Employment location
    </Typography>
  </Grid>

  {employmentDetails?.employmentAddresses?.map((address, index) => (
    <Grid item xs={12} sx={{ ml: 2}} sm={5.7} key={index}> {/* Each address takes half width */}
      <Grid
        container
        spacing={1}
        sx={{ mb: 2,  }} // Optional styling
      >
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold" >
            {address.addressType} Address
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Location"
            value={address.location}
            onChange={(e) => handleEmploymentAddressChange(index, "location", e.target.value)}
            />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Function"
            value={address.function}
            onChange={(e) => handleEmploymentAddressChange(index, "function", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Sub Function"
            value={address.subFunction}
            onChange={(e) => handleEmploymentAddressChange(index, "subFunction", e.target.value)}
          />
        </Grid>
      </Grid>
    </Grid>
  ))}
</Grid>


      <Grid item xs={11.7} container spacing={1} sx={{ ml: 0 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Present Job Category"
            name="presentJobCategory"
            fullWidth
            variant="outlined"
            value={employmentDetails.presentJobCategory}
            onChange={handleChange}
            required
          >
            <MenuItem value="Executive">Executive</MenuItem>
            <MenuItem value="Non Executive">Non Executive</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Present Designation"
            name="presentDesignation"
            value={employmentDetails.presentDesignation}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Present Grade"
            name="presentGrade"
            value={employmentDetails.presentGrade}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Joined As"
            name="joinedAs"
            value={employmentDetails.joinedAs}
            onChange={handleChange}
            fullWidth
            required
          >
            <MenuItem value="Permanent">Permanent</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {employmentDetails.joinedAs === "Permanent" && (
        <Grid container spacing={2} sx={{ mt: 3, ml: 2 }}>
          <Grid item xs={12} sm={5.5}>
            <TextField
              fullWidth
              label="EPF Number"
              value={employmentDetails.joinedDetails.epfNumber || ""}
              onChange={(e) => handleJoinedDetailsChange("epfNumber", e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={5.5}>
            <TextField
              fullWidth
              label="Designation"
              value={employmentDetails.joinedDetails.designation || ""}
              onChange={(e) => handleJoinedDetailsChange("designation", e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={5.5}>
            <TextField
              fullWidth
              label="Grade"
              value={employmentDetails.joinedDetails.grade || ""}
              onChange={(e) => handleJoinedDetailsChange("grade", e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={5.5}>
            <TextField
              fullWidth
              label="Date of Joining"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={employmentDetails.joinedDetails.date || ""}
              onChange={(e) => handleJoinedDetailsChange("date", e.target.value)}
              required
            />
          </Grid>
        </Grid>
      )}

      {employmentDetails.joinedAs === "Contract" && (
        <Grid container spacing={2} sx={{ mt: 3 , ml : 2}}>
          <Grid item xs={12} sm={5.5}>
            <TextField
              fullWidth
              label="Contract No"
              value={employmentDetails.joinedDetails.epfNumber || ""}
              onChange={(e) => handleJoinedDetailsChange("epfNumber", e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={5.5}>
            <TextField
              fullWidth
              label="Designation"
              value={employmentDetails.joinedDetails.designation || ""}
              onChange={(e) => handleJoinedDetailsChange("designation", e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={5.5}>
            <TextField
              fullWidth
              label="Grade"
              value={employmentDetails.joinedDetails.grade || ""}
              onChange={(e) => handleJoinedDetailsChange("grade", e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={5.5}>
            <TextField
              fullWidth
              label="Date of Joining"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={employmentDetails.joinedDetails.date || ""}
              onChange={(e) => handleJoinedDetailsChange("date", e.target.value)}
              required
            />
          </Grid>
        </Grid>
      )}

    <Grid >
       <Typography sx={{ ml: 2  , mt:4 }} variant="h5" gutterBottom style={{ fontWeight:'bold', color:"rgb(58, 53, 54)", fontFamily: 'Roboto, sans-serif', textAlign: "left",  }}>
        Promotions
        </Typography>
      </Grid>
      {employmentDetails?.promotions?.map((promotion, index) => (
        <Grid
          container
          spacing={2}
          key={index}
          sx={{ mt: -3, p: 2, }}
        >
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Grade"
              value={promotion.grade}
              onChange={(e) => handlePromotionChange(index, "grade", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Designation"
              value={promotion.designation}
              onChange={(e) => handlePromotionChange(index, "designation", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Duration From"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={promotion.durationFrom}
              onChange={(e) => handlePromotionChange(index, "durationFrom", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Duration To"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={promotion.durationTo}
              onChange={(e) => handlePromotionChange(index, "durationTo", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Location"
              value={promotion.location}
              onChange={(e) => handlePromotionChange(index, "location", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Function"
              value={promotion.function}
              onChange={(e) => handlePromotionChange(index, "function", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Sub Function"
              value={promotion.subFunction}
              onChange={(e) => handlePromotionChange(index, "subFunction", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
          {employmentDetails.promotions.length > 1 && (
              <IconButton onClick={() => removePromotion(index)} color="secondary">
                <Delete />
              </IconButton>
            )}
          </Grid>
        </Grid>
      ))}
      <Button variant="outlined" startIcon={<Add />} onClick={addPromotion} sx={{ mt: 1, ml: 2}} >
        Add Promotion
      </Button>

      </Grid>
    
    </Grid>
  );
};

export default EmploymentDetailsForm;