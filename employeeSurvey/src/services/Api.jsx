import axios from "axios";

// Correct API Base URL
const API_BASE_URL = "https://localhost:7277/api/PersonalDetails";

export const submitEmployeeData = async (personalDetails, spouseDetails, contactDetails) => {
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
      contactDetails: [
        {
          temporaryAddress: contactDetails.temporaryAddress,
          temporaryPostalCode: contactDetails.temporaryPostalCode,
          temporaryDistrict: contactDetails.temporaryDistrict,
          temporaryProvince: contactDetails.temporaryProvince,
          distantBetWorkPlaceAndTemporyAddress: contactDetails.distantBetWorkPlaceAndTemporyAddress,
          permanentAddress: contactDetails.temporaryAddress, // Replacing with temporaryAddress
          permanentPostalCode: contactDetails.temporaryPostalCode,
          permanentGramaDivision: contactDetails.temporaryGramaDivision || "",
          permanentAGADivision: contactDetails.temporaryAGADivision || "",
          permanentElectoral: contactDetails.temporaryElectoral || "",
          policeDivision: contactDetails.policeDivision || "",
          permanentDistrict: contactDetails.temporaryDistrict,
          permanentProvince: contactDetails.temporaryProvince,
          distantBetWorkPlaceAndPermanentAddress: contactDetails.distantBetWorkPlaceAndTemporyAddress,
          telephoneNumber: contactDetails.telephoneNumber || 0,
        },
      ],
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
