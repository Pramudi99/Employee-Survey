import axios from "axios";

const API_BASE_URL = "https://localhost:7277/api/PersonalDetails";

const formatDate = (date) => (date ? new Date(date).toISOString() : null);

export const submitEmployeeData = async (
  personalDetails,
  spouseDetails,
  contactDetails,
  employmentDetails,
  academicDetails
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
            title:spouseDetails.title || "",
            nameWithInitials: spouseDetails.nameWithInitials || "",
            fullName: spouseDetails.fullName || "",
            dateOfBirth: formatDate(spouseDetails.dateOfBirth),
            nicNumber: spouseDetails.nicNumber || "",
            address: spouseDetails.address || "",
            postalCode: spouseDetails.postalCode
              ? Number(spouseDetails.postalCode)
              : 0,
            contactNumber: spouseDetails.contactNumber
              ? Number(spouseDetails.contactNumber)
              : 0,
            workPlaceAddress: spouseDetails.workPlaceAddress || "",
            workPlaceTeleNumber: spouseDetails.workPlaceTeleNumber
              ? Number(spouseDetails.workPlaceTeleNumber)
              : 0,
          }
        : null,

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
              distantBetWorkPlaceAndTemporyAddress:
                contactDetails.distantBetWorkPlaceAndTemporyAddress || "",
              permanentAddress: contactDetails.permanentAddress || "",
              permanentPostalCode: contactDetails.permanentPostalCode
                ? Number(contactDetails.permanentPostalCode)
                : 0,
              permanentGramaDivision: contactDetails.permanentGramaDivision || "",
              permanentAGADivision: contactDetails.permanentAGADivision || "",
              permanentElectoral: contactDetails.permanentElectoral || "",
              policeDivision: contactDetails.policeDivision || "",
              permanentDistrict: contactDetails.permanentDistrict || "",
              permanentProvince: contactDetails.permanentProvince || "",
              distantBetWorkPlaceAndPermanentAddress:
                contactDetails.distantBetWorkPlaceAndPermanentAddress || "",
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
                  durationFrom: formatDate(promotion?.durationFrom),
                  durationTo: formatDate(promotion?.durationTo),
                  location: promotion?.location || "",
                  function: promotion?.function || "",
                  subFunction: promotion?.subFunction || "",
                }))
              : [],

                dependents: Array.isArray(employmentDetails.dependents)
                  ? employmentDetails.dependents.map((dependent) => ({
                      dependentFullName: dependent?.fullName || "",
                      dependentGender: dependent?.gender || "",
                      dependentDateOfBirth: formatDate(dependent?.dateOfBirth),
                      dependentOccupation: dependent?.occupation || "",
                      occupationAddress: dependent?.occupationAddress || "",
                    }))
                  : [],
              
          }
        : null,

        // employmentDetails: employmentDetails
        // ? {
        //     dependents: Array.isArray(employmentDetails.dependents)
        //       ? employmentDetails.dependents.map((dependent) => ({
        //           dependentFullName: dependent?.fullName || "",
        //           dependentGender: dependent?.gender || "",
        //           dependentDateOfBirth: formatDate(dependent?.dateOfBirth),
        //           dependentOccupation: dependent?.occupation || "",
        //           occupationAddress: dependent?.occupationAddress || "",
        //         }))
        //       : [],
        //   }
        // : null,

        academicDetails: academicDetails
        ? {
            schoolLeavingYear: academicDetails.schoolLeavingYear || 0,
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
    
    if (response.status === 201) {
      return { message: "Data submitted successfully!", data: response.data };
    } else {
      throw new Error("Unexpected server response.");
    }
  } catch (error) {
    console.error("❌ Error submitting data:", error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || "Failed to submit data.");
  }
};






