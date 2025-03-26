import axios from "axios";

const API_BASE_URL = "https://localhost:7277/api/PersonalDetails";

const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString();  // Keeps time information
};

export const fetchEmployeeData = async (epfNumber) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${epfNumber}`);
    return response.data;
  } catch (error) {
    console.error("❌ API Error:", error.message);
    throw error;
  }
};

export const submitEmployeeData = async (
  personalDetails,
  spouseDetails,
  contactDetails,
  employmentDetails,
  academicDetails,
  dependentDetails
) => {
  try {
    const payload = {
      epfNumber: personalDetails?.epfNumber || "",
      title: personalDetails?.title || "",
      nameWithInitials: personalDetails?.nameWithInitials || "",
      fullName: personalDetails?.fullName || "",
      gender: personalDetails?.gender || "",
      maritalStatus: personalDetails?.maritalStatus || "",
      bloodGroup: personalDetails?.bloodGroup || "",
      dateOfBirth: formatDate(personalDetails?.dateOfBirth),
      nicNumber: personalDetails?.nicNumber || "",
      drivingLicense: personalDetails?.drivingLicense || "",
      passportNumber: personalDetails?.passportNumber || "",
      religion: personalDetails?.religion || "",
      race: personalDetails?.race || "",
      numberOfDependents: personalDetails?.numberOfDependents
        ? Number(personalDetails.numberOfDependents)
        : 0,

      spouseDetails: spouseDetails
        ? {
            title: spouseDetails.title || "",
            nameWithInitials: spouseDetails.nameWithInitials || "",
            fullName: spouseDetails.fullName || "",
            dateOfBirth: formatDate(spouseDetails.dateOfBirth),
            nicNumber: spouseDetails.nicNumber || "",
            address: spouseDetails.address || "",
            postalCode: spouseDetails.postalCode ? Number(spouseDetails.postalCode) : 0,
            contactNumber: spouseDetails.contactNumber ? Number(spouseDetails.contactNumber) : 0,
            workPlaceAddress: spouseDetails.workPlaceAddress || "",
            workPlaceTeleNumber: spouseDetails.workPlaceTeleNumber ? Number(spouseDetails.workPlaceTeleNumber) : 0,
          }
        : {},
      
      // Fixed contact details to match the expected format
      contactDetails: contactDetails
        ? [
            {
              contactId: contactDetails.contactId
                ? Number(contactDetails.contactId)
                : 0,
              temporaryAddress: contactDetails.temporaryAddress || "",
              temporaryPostalCode: contactDetails.temporaryPostalCode
                ? Number(contactDetails.temporaryPostalCode)
                : 0,
              temporaryDistrict: contactDetails.temporaryDistrict || "",
              temporaryProvince: contactDetails.temporaryProvince || "",
              // Convert to string instead of number to match API expectation
              distantBetWorkPlaceAndTemporyAddress: contactDetails.distantBetWorkPlaceAndTemporyAddress
                ? String(contactDetails.distantBetWorkPlaceAndTemporyAddress)
                : "",
              permanentAddress: contactDetails.permanentAddress || "",
              permanentPostalCode: contactDetails.permanentPostalCode
                ? Number(contactDetails.permanentPostalCode)
                : 0,
              // Add missing fields from expected format
              permanentGramaDivision: contactDetails.permanentGramaDivision || "",
              permanentAGADivision: contactDetails.permanentAGADivision || "",
              permanentElectoral: contactDetails.permanentElectoral || "",
              policeDivision: contactDetails.policeDivision || "",
              permanentDistrict: contactDetails.permanentDistrict || "",
              permanentProvince: contactDetails.permanentProvince || "",
              // Convert to string instead of number to match API expectation
              distantBetWorkPlaceAndPermanentAddress: contactDetails.distantBetWorkPlaceAndPermanentAddress
                ? String(contactDetails.distantBetWorkPlaceAndPermanentAddress)
                : "",
              telephoneNumber: contactDetails.telephoneNumber
                ? Number(contactDetails.telephoneNumber)
                : 0,
            },
          ]
        : [],

      employmentDetails: employmentDetails
        ? {
            presentJobCategory: employmentDetails.presentJobCategory || "",
            presentDesignation: employmentDetails.presentDesignation || "",
            presentGrade: employmentDetails.presentGrade || "",
            joinedAs: employmentDetails.joinedAs || "",
            joinedDetails: employmentDetails.joinedDetails
              ? {
                  joinedType: employmentDetails.joinedDetails.joinedType || "",
                  epfNumber: employmentDetails.joinedDetails.epfNumber || "",
                  designation: employmentDetails.joinedDetails.designation || "",
                  grade: employmentDetails.joinedDetails.grade || "",
                  date: formatDate(employmentDetails.joinedDetails.date),
                }
              : {},
            employmentAddresses: Array.isArray(employmentDetails.employmentAddresses)
              ? employmentDetails.employmentAddresses.map((address) => ({
                  addressType: address?.addressType || "",
                  location: address?.location || "",
                  function: address?.function || "",
                  subFunction: address?.subFunction || "",
                }))
              : [],
              
            promotions: Array.isArray(employmentDetails.promotions)
              ? employmentDetails.promotions.map((promotion) => ({
                  grade: promotion?.grade || "",
                  designation: promotion?.designation || "",
                  durationFrom: promotion ? formatDate(promotion?.durationFrom) : "",
                  durationTo: promotion ? formatDate(promotion?.durationTo) : "",
                  location: promotion?.location || "",
                  function: promotion?.function || "",
                  subFunction: promotion?.subFunction || "",
                }))
              : [],
          }
        : null,

      dependentDetails: Array.isArray(dependentDetails.dependents)
        ? dependentDetails.dependents.map((dependent) => ({
            dependentDetailsID: dependent?.dependentDetailsID || 0,
            dependentFullName: dependent?.fullName || "",
            dependentGender: dependent?.gender || "",
            dependentDateOfBirth: formatDate(dependent?.dateOfBirth),
            dependentOccupation: dependent?.occupation || "",
            occupationAddress: dependent?.occupationAddress || "",
            epfNumber: personalDetails?.epfNumber || "",
          }))
        : [],

      academicDetails: academicDetails
        ? {
            academicDetailsId: academicDetails.academicDetailsId || 0, 
            schoolLeavingYear: academicDetails.schoolLeavingYear || 0,
            // Fix type: schoolLeavingGrade should be a string, not a number
            schoolLeavingGrade: academicDetails.schoolLeavingGrade || "",
            schoolName: academicDetails.schoolName || "",
            examResults: Array.isArray(academicDetails.examResults)
              ? academicDetails.examResults.map((exam) => ({
                  indexNumber: exam.indexNumber || 0,
                  examType: exam.examType || "",
                  attemptYear: exam.attemptYear || 0,
                  attempt: exam.attempt || 0,
                  academicDetailsId: exam.academicDetailsId || 0,
                  subjectTable: Array.isArray(exam.subjectTable)
                    ? exam.subjectTable.map((subject) => ({
                        subjectId: subject.subjectId || 0,
                        subjectName: subject.subjectName || "",
                        subjectResults: subject.subjectResults || "",
                        indexNumber: subject.indexNumber || 0,
                      }))
                    : [],
                }))
              : [],
          }
        : null,
    };

    console.log("🚀 Sending Payload:", JSON.stringify(payload, null, 2));

    const response = await axios.post(`${API_BASE_URL}/add`, JSON.stringify(payload), {
      headers: { "Content-Type": "application/json" },
    });

    console.log("✅ Response:", response.data);
    
    if (response.status >= 200 && response.status < 300) {
      return { message: "Data submitted successfully!", data: response.data };
    } else {
      throw new Error(`Unexpected server response (Status: ${response.status}).`);
    }
  } catch (error) {
    console.error("❌ Error submitting data:", error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || "Failed to submit data.");
  }
};

// export const checkEPFExistence = async (epfNumber) => {
//   try {
//     // Validate input
//     if (!epfNumber || epfNumber.trim() === '') {
//       return false;
//     }

//     // Make API call to check EPF number existence
//     const response = await axios.get(`${API_BASE_URL}/check-epf/${epfNumber}`);
    
//     // Return the full response to handle different scenarios
//     return response.data;
//   } catch (error) {
//     // Log the error for debugging
//     console.error("❌ Error checking EPF existence:", error.response?.data || error.message);
    
//     // Throw the error to be caught in the calling function
//     throw error;
//   }
// };

export const checkEPFExistence = async (epfNumber) => {
  try {
    // Validate input
    if (!epfNumber || epfNumber.trim() === '') {
      return false;
    }

    // Make API call to check EPF number existence
    const response = await axios.get(`${API_BASE_URL}/check-epf/${epfNumber}`);
    
    // Return a boolean for easier handling
    return false; // EPF number does not exist
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return true; // EPF number exists
    }
    
    console.error("❌ Error checking EPF existence:", error.response?.data || error.message);
    throw error;
  }
};