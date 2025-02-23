import axios from "axios";

// Correct API Base URL
const API_BASE_URL = "https://localhost:7277/api/PersonalDetails";

export const submitEmployeeData = async (personalDetails, spouseDetails) => {
  try {
    // Structure the payload to match backend expectations
    const payload = {
      epfNumber: personalDetails.epfNumber,
      nameWithInitials: personalDetails.nameWithInitials,
      fullName: personalDetails.fullName,
      gender: personalDetails.gender,
      maritalStatus: personalDetails.maritalStatus,
      bloodGroup: personalDetails.bloodGroup,
      dateOfBirth: personalDetails.dateOfBirth,
      nicNumber: personalDetails.nicNumber,
      drivingLicense: personalDetails.drivingLicense,
      passportNumber: personalDetails.passportNumber,
      religion: personalDetails.religion,
      race: personalDetails.race,
      numberOfDependents: personalDetails.numberOfDependents,
      spouseDetails: {
        nameWithInitials: spouseDetails.nameWithInitials,
        fullName: spouseDetails.fullName,
        dateOfBirth: spouseDetails.dateOfBirth,
        nicNumber: spouseDetails.nicNumber,
        address: spouseDetails.address,
        postalCode: spouseDetails.postalCode,
        contactNumber: spouseDetails.contactNumber,
        workPlaceAddress: spouseDetails.workPlaceAddress,
        workPlaceTeleNumber: spouseDetails.workPlaceTeleNumber,
      },
    };

    console.log("Sending Payload:", payload);  // Log for debugging

    // Send data to backend
    const response = await axios.post(`${API_BASE_URL}/add`, payload, {
      headers: { "Content-Type": "application/json" }
    });

    if (response.status === 201) {
      return { message: "Data submitted successfully!", data: response.data };
    } else {
      throw new Error("Unexpected server response.");
    }
  } catch (error) {
    console.error("Error submitting data:", error);
    throw new Error(error.response?.data?.message || "Failed to submit data.");
  }
};
