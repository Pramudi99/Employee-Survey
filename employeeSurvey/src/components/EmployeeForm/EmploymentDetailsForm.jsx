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

const EmploymentDetailsForm = ({ setEmploymentDetails }) => {
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

  const handleEmploymentAddressChange = (index, field, value) => {
    const updatedAddresses = [...employmentDetails.employmentAddresses];
    updatedAddresses[index][field] = value;
    setLocalEmploymentDetails((prevDetails) => ({
      ...prevDetails,
      employmentAddresses: updatedAddresses,
    }));
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
    const updatedPromotions = employmentDetails.promotions.filter((_, i) => i !== index);
    setLocalEmploymentDetails((prevDetails) => ({
      ...prevDetails,
      promotions: updatedPromotions,
    }));
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2}}>
      <Typography variant="h4" gutterBottom>
        Employment Details
      </Typography>

      <Typography variant="h5" sx={{ mt: 4, mb: 1}}>
        Details of Permanent Location
      </Typography>
      {employmentDetails.employmentAddresses.map((address, index) => (
        <Grid
          container
          spacing={2}
          key={index}
          sx={{ mb: 2, p: 2, border: "non", borderRadius: "5px" }}
        >
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              {address.addressType} Address
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Location"
              value={address.location}
              onChange={(e) => handleEmploymentAddressChange(index, "location", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
      ))}

      <Grid container spacing={2} sx={{ mt: 3 }}>
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Present Grade"
            name="presentGrade"
            value={employmentDetails.presentGrade}
            onChange={handleChange}
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
          >
            <MenuItem value="Permanent">Permanent</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {employmentDetails.joinedAs === "Permanent" && (
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="EPF Number"
              value={employmentDetails.joinedDetails.epfNumber || ""}
              onChange={(e) => handleJoinedDetailsChange("epfNumber", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Designation"
              value={employmentDetails.joinedDetails.designation || ""}
              onChange={(e) => handleJoinedDetailsChange("designation", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Grade"
              value={employmentDetails.joinedDetails.grade || ""}
              onChange={(e) => handleJoinedDetailsChange("grade", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date of Joining"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={employmentDetails.joinedDetails.date || ""}
              onChange={(e) => handleJoinedDetailsChange("date", e.target.value)}
            />
          </Grid>
        </Grid>
      )}

      {employmentDetails.joinedAs === "Contract" && (
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contract No"
              value={employmentDetails.joinedDetails.epfNumber || ""}
              onChange={(e) => handleJoinedDetailsChange("epfNumber", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Designation"
              value={employmentDetails.joinedDetails.designation || ""}
              onChange={(e) => handleJoinedDetailsChange("designation", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Grade"
              value={employmentDetails.joinedDetails.grade || ""}
              onChange={(e) => handleJoinedDetailsChange("grade", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date of Joining"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={employmentDetails.joinedDetails.date || ""}
              onChange={(e) => handleJoinedDetailsChange("date", e.target.value)}
            />
          </Grid>
        </Grid>
      )}

      <Typography variant="h5" sx={{ mt: 4 }}>
        Promotions
      </Typography>
      {employmentDetails.promotions.map((promotion, index) => (
        <Grid
          container
          spacing={2}
          key={index}
          sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: "5px" }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Grade"
              value={promotion.grade}
              onChange={(e) => handlePromotionChange(index, "grade", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Designation"
              value={promotion.designation}
              onChange={(e) => handlePromotionChange(index, "designation", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Duration From"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={promotion.durationFrom}
              onChange={(e) => handlePromotionChange(index, "durationFrom", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Duration To"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={promotion.durationTo}
              onChange={(e) => handlePromotionChange(index, "durationTo", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Location"
              value={promotion.location}
              onChange={(e) => handlePromotionChange(index, "location", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Function"
              value={promotion.function}
              onChange={(e) => handlePromotionChange(index, "function", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Sub Function"
              value={promotion.subFunction}
              onChange={(e) => handlePromotionChange(index, "subFunction", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <IconButton color="error" onClick={() => removePromotion(index)}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button variant="outlined" startIcon={<Add />} onClick={addPromotion} sx={{ mt: 2 }}>
        Add Promotion
      </Button>
    </Grid>
  );
};

export default EmploymentDetailsForm;
