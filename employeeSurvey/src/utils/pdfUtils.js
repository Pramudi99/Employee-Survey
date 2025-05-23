



// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import { fetchEmployeeData } from '../services/Api';

// // Function to download employee data as PDF
// export const downloadEmployeeDataAsPDF = async (epfNumber) => {
//   try {
//     // 1. Fetch the employee data
//     const employeeData = await fetchEmployeeData(epfNumber);
    
//     // 2. Initialize PDF document
//     const pdf = new jsPDF('p', 'mm', 'a4');
    
//     // Define reusable styles
//     const styles = {
//       title: { fontSize: 18, fontStyle: 'bold' },
//       sectionHeader: { fontSize: 14, fontStyle: 'bold' },
//       normal: { fontSize: 11, fontStyle: 'normal' },
//       small: { fontSize: 10, fontStyle: 'normal' },
//     };
    
//     // Define margins and positioning
//     const margin = {
//       left: 20,
//       right: 190,
//       top: 20,
//     };
    
//     let currentY = margin.top;
//     const lineHeight = 7;
    
//     // Helper function to add section headers
//     const addSectionHeader = (text) => {
//       currentY += lineHeight * 1.5;
//       pdf.setFontSize(styles.sectionHeader.fontSize);
//       pdf.setFont(undefined, styles.sectionHeader.fontStyle);
//       pdf.text(text, margin.left, currentY);
//       pdf.line(margin.left, currentY + 1, margin.right, currentY + 1);
//       currentY += lineHeight;
//       pdf.setFontSize(styles.normal.fontSize);
//       pdf.setFont(undefined, styles.normal.fontStyle);
//     };
    
//     // Helper function to add field and value
//     const addField = (label, value, indent = 0) => {
//       const displayValue = value !== undefined && value !== null ? value : 'N/A';
//       pdf.text(`${label}: ${displayValue}`, margin.left + indent, currentY);
//       currentY += lineHeight;
//     };
    
//     // Helper function to format date
//     const formatDate = (dateString) => {
//       if (!dateString) return 'N/A';
//       return new Date(dateString).toLocaleDateString();
//     };
    
//     // Helper function to check page space and add new page if needed
//     const checkPageSpace = (requiredSpace = 40) => {
//       if (currentY + requiredSpace > 280) {
//         pdf.addPage();
//         currentY = margin.top;
//         return true;
//       }
//           return false;
//         };
        
//         // Document title and company logo placeholder
//         pdf.setFontSize(styles.title.fontSize);
//         pdf.setFont(undefined, styles.title.fontStyle);
//         pdf.text('EMPLOYEE SURVEY CPC - 2025', margin.left, currentY);
//         currentY += lineHeight * 1.5;
        
//         pdf.setFillColor(240, 240, 240);
//         pdf.rect(margin.left, currentY - 5, 40, 8, 'F'); // Background rectangle for EPF number section
//         pdf.setFontSize(styles.normal.fontSize);
//         pdf.setFont(undefined, 'bold');
//         pdf.text(`EPF Number: ${employeeData.epfNumber || 'N/A'}`, margin.left + 2, currentY);
        
//         // Profile Image on the right side of the EPF number
//         if (employeeData.profileImage) {
//           const imageData = `data:image/png;base64,${employeeData.profileImage}`; // Base64 image string
//           const imageWidth = 30; // Width of the image
//           const imageHeight = 30; // Height of the image
        
//           // Position the image on the right side (adjust the X and Y position accordingly)
//           const imageX = margin.left + 140; // Positioning it to the right of the EPF number
          
//           // Move the image upwards by 10 units from the current Y position
//           const imageY = currentY - 17; // Adjust this value to move the image upwards
          
//           pdf.addImage(imageData, 'PNG', imageX, imageY, imageWidth, imageHeight);
//         }
        
//         currentY += lineHeight * 1.5; // Move down after the EPF number and image

//         // 1. PERSONAL DETAILS SECTION
//         addSectionHeader('1. PERSONAL DETAILS');
//         pdf.setFont(undefined, styles.normal.fontStyle);
        
//         // Create a two-column layout for personal details
//         const col1 = margin.left;
//         const col2 = margin.left + 0;
//               // Define a consistent position for all values
//             const labelWidth = 65; // Adjust based on your longest label

//             // Row 1
//             pdf.setFont(undefined, 'bold');
//             pdf.text('Full Name:', col1, currentY);
//             pdf.setFont(undefined, 'normal');
//             pdf.text(`${employeeData.title || ''} ${employeeData.fullName || 'N/A'}`.trim(), col1 + labelWidth, currentY);
//             currentY += lineHeight;

//             // Single column layout for personal information
//             pdf.setFont(undefined, 'bold');
//             pdf.text('Name with Initials:', col1, currentY);
//             pdf.setFont(undefined, 'normal');
//             pdf.text(String(employeeData.nameWithInitials || 'N/A'), col1 + labelWidth, currentY);
//             currentY += lineHeight;

//             pdf.setFont(undefined, 'bold');
//             pdf.text('Gender:', col1, currentY);
//             pdf.setFont(undefined, 'normal');
//             pdf.text(String(employeeData.gender || 'N/A'), col1 + labelWidth, currentY);
//             currentY += lineHeight;

//             pdf.setFont(undefined, 'bold');
//             pdf.text('Marital Status:', col1, currentY);
//             pdf.setFont(undefined, 'normal');
//             pdf.text(String(employeeData.maritalStatus || 'N/A'), col1 + labelWidth, currentY);
//             currentY += lineHeight;

//             pdf.setFont(undefined, 'bold');
//             pdf.text('Blood Group:', col1, currentY);
//             pdf.setFont(undefined, 'normal');
//             pdf.text(String(employeeData.bloodGroup || 'N/A'), col1 + labelWidth, currentY);
//             currentY += lineHeight;

//             pdf.setFont(undefined, 'bold');
//             pdf.text('Date of Birth:', col1, currentY);
//             pdf.setFont(undefined, 'normal');
//             pdf.text(String(formatDate(employeeData.dateOfBirth) || 'N/A'), col1 + labelWidth, currentY);
//             currentY += lineHeight;

//             pdf.setFont(undefined, 'bold');
//             pdf.text('NIC Number:', col1, currentY);
//             pdf.setFont(undefined, 'normal');
//             pdf.text(String(employeeData.nicNumber || 'N/A'), col1 + labelWidth, currentY);
//             currentY += lineHeight;

//             // pdf.setFont(undefined, 'bold');
//             // pdf.text('Religion:', col1, currentY);
//             // pdf.setFont(undefined, 'normal');
//             // pdf.text(String(employeeData.religion || 'N/A'), col1 + labelWidth, currentY);
//             // currentY += lineHeight;

//             const numberToString = {
//               1: "Buddhism",
//               2: "Hindu",
//               3: "Islam",
//               4: "Christianity",
//               5: "Other"
//             };
            
//             // Helper function to get the religion name from a number
//             const getReligionString = (religionNumber) => {
//               return numberToString[religionNumber] || 'N/A'; // Default to 'N/A' if not found
//             };
            
//             // Use it when printing religion
//             pdf.setFont(undefined, 'bold');
//             pdf.text('Religion:', col1, currentY);
//             pdf.setFont(undefined, 'normal');
//             pdf.text(getReligionString(employeeData.religion), col1 + labelWidth, currentY);
//             currentY += lineHeight;
            


//             pdf.setFont(undefined, 'bold');
//             pdf.text('Race:', col1, currentY);
//             pdf.setFont(undefined, 'normal');
//             pdf.text(String(employeeData.race || 'N/A'), col1 + labelWidth, currentY);
//             currentY += lineHeight;

//             pdf.setFont(undefined, 'bold');
//             pdf.text('Driving License:', col1, currentY);
//             pdf.setFont(undefined, 'normal');
//             pdf.text(String(employeeData.drivingLicense || 'N/A'), col1 + labelWidth, currentY);
//             currentY += lineHeight;

//             pdf.setFont(undefined, 'bold');
//             pdf.text('Passport Number:', col1, currentY);
//             pdf.setFont(undefined, 'normal');
//             pdf.text(String(employeeData.passportNumber || 'N/A'), col1 + labelWidth, currentY);
//             currentY += lineHeight;

//             pdf.setFont(undefined, 'bold');
//             pdf.text('Number of Dependents:', col1, currentY);
//             pdf.setFont(undefined, 'normal');
//             pdf.text(String(employeeData.numberOfDependents || '0'), col1 + labelWidth, currentY);
//             currentY += lineHeight;




//      // 2. CONTACT DETAILS SECTION
//      pdf.addPage(); // <-- This forces a new page
//      currentY = margin.top; // Reset Y position on the new page
//      addSectionHeader('2. CONTACT DETAILS');
     

// if (employeeData.contactDetails && employeeData.contactDetails.length > 0) {
//   const contact = employeeData.contactDetails[0];
  
//   // Temporary Address subsection
//   pdf.setFillColor(235, 235, 235);
//   pdf.rect(margin.left - 2, currentY - 4, 173, 6, 'F');
//   pdf.setFont(undefined, 'bold');
//   pdf.text('Temporary Address:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   currentY += lineHeight;
  
//   // Define a consistent position for all values
//   const labelWidth = 65; // Adjust based on your longest label
  
  
//   pdf.setFont(undefined, 'bold');
//   pdf.text('Address:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text(String(contact.temporaryAddress || 'N/A'), margin.left + labelWidth, currentY);
//   currentY += lineHeight;
  
//   pdf.setFont(undefined, 'bold');
//   pdf.text('Postal Code:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text(String(contact.temporaryPostalCode || 'N/A'), margin.left + labelWidth, currentY);
//   currentY += lineHeight;
  
//   pdf.setFont(undefined, 'bold');
//   pdf.text('District:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text(String(contact.temporaryDistrict || 'N/A'), margin.left + labelWidth, currentY);
//   currentY += lineHeight;
  
//   pdf.setFont(undefined, 'bold');
//   pdf.text('Province:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text(String(contact.temporaryProvince || 'N/A'), margin.left + labelWidth, currentY);
//   currentY += lineHeight;
  
//   pdf.setFont(undefined, 'bold');
//   pdf.text('Distance to Workplace (km):', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text(String(contact.distantBetWorkPlaceAndTemporyAddress || 'N/A'), margin.left + labelWidth, currentY);
//   currentY += lineHeight * 1.5;
  
//   // Permanent Address subsection
//   checkPageSpace();
//   pdf.setFillColor(235, 235, 235);
//   pdf.rect(margin.left - 2, currentY - 4, 173, 6, 'F');
//   pdf.setFont(undefined, 'bold');
//   pdf.text('Permanent Address:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   currentY += lineHeight;
  
//   pdf.setFont(undefined, 'bold');
//   pdf.text('Address:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text(String(contact.permanentAddress || 'N/A'), margin.left + labelWidth, currentY);
//   currentY += lineHeight;
  
//   pdf.setFont(undefined, 'bold');
//   pdf.text('Postal Code:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text(String(contact.permanentPostalCode || 'N/A'), margin.left + labelWidth, currentY);
//   currentY += lineHeight;
  
//   pdf.setFont(undefined, 'bold');
//   pdf.text('Grama Division:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text(String(contact.permanentGramaDivision || 'N/A'), margin.left + labelWidth, currentY);
//   currentY += lineHeight;
  
//   pdf.setFont(undefined, 'bold');
//   pdf.text('AGA Division:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text(String(contact.permanentAGADivision || 'N/A'), margin.left + labelWidth, currentY);
//   currentY += lineHeight;
  
//   pdf.setFont(undefined, 'bold');
//   pdf.text('Electoral:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text(String(contact.permanentElectoral || 'N/A'), margin.left + labelWidth, currentY);
//   currentY += lineHeight;
  
//   pdf.setFont(undefined, 'bold');
//   pdf.text('Police Division:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text(String(contact.policeDivision || 'N/A'), margin.left + labelWidth, currentY);
//   currentY += lineHeight;
  
//   pdf.setFont(undefined, 'bold');
//   pdf.text('District:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text(String(contact.permanentDistrict || 'N/A'), margin.left + labelWidth, currentY);
//   currentY += lineHeight;
  
//   pdf.setFont(undefined, 'bold');
//   pdf.text('Province:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text(String(contact.permanentProvince || 'N/A'), margin.left + labelWidth, currentY);
//   currentY += lineHeight;
  
//   pdf.setFont(undefined, 'bold');
//   pdf.text('Distance to Workplace:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text(String(contact.distantBetWorkPlaceAndPermanentAddress || 'N/A'), margin.left + labelWidth, currentY);
//   currentY += lineHeight;
  
//   pdf.setFont(undefined, 'bold');
//   pdf.text('Telephone Number:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text(String(contact.telephoneNumber || 'N/A'), margin.left + labelWidth, currentY);
//   currentY += lineHeight * 1.5;
  

//   checkPageSpace(); // Optional, in case content is near page bottom

// pdf.setFillColor(235, 235, 235);
// pdf.rect(margin.left - 2, currentY - 4, 173, 6, 'F');
// pdf.setFont(undefined, 'bold');
// pdf.text('Emergency Contact Details:', margin.left, currentY);
// pdf.setFont(undefined, 'normal');
// currentY += lineHeight;

// pdf.setFont(undefined, 'bold');
// pdf.text('Relation:', margin.left, currentY);
// pdf.setFont(undefined, 'normal');
// pdf.text(String(contact.emergencyContactRelation || 'N/A'), margin.left + labelWidth, currentY);
// currentY += lineHeight;

// pdf.setFont(undefined, 'bold');
// pdf.text('Name:', margin.left, currentY);
// pdf.setFont(undefined, 'normal');
// pdf.text(String(contact.emergencyContactName || 'N/A'), margin.left + labelWidth, currentY);
// currentY += lineHeight;

// pdf.setFont(undefined, 'bold');
// pdf.text('Mobile Number:', margin.left, currentY);
// pdf.setFont(undefined, 'normal');
// pdf.text(String(contact.emergencyContactMobile || 'N/A'), margin.left + labelWidth, currentY);
// currentY += lineHeight;

// pdf.setFont(undefined, 'bold');
// pdf.text('Land Number:', margin.left, currentY);
// pdf.setFont(undefined, 'normal');
// pdf.text(String(contact.emergencyContactLandNo || 'N/A'), margin.left + labelWidth, currentY);
// currentY += lineHeight;

// pdf.setFont(undefined, 'bold');
// pdf.text('Address:', margin.left, currentY);
// pdf.setFont(undefined, 'normal');
// pdf.text(String(contact.emergencyContactAddress || 'N/A'), margin.left + labelWidth, currentY);
// currentY += lineHeight;

// } else {
//   pdf.setFont(undefined, 'bold');
//   pdf.text('Contact Information:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text('No contact details available', margin.left + labelWidth, currentY);
//   currentY += lineHeight;
// }





// // 3. EMPLOYMENT DETAILS SECTION
// pdf.addPage(); // <-- This forces a new page
// currentY = margin.top; // Reset Y position on the new page
// addSectionHeader('3. EMPLOYMENT DETAILS');

// if (employeeData.employmentDetails) {
//   const employment = employeeData.employmentDetails;
//   const labelWidth = 65;
  
//   // Current position details
//   pdf.setFillColor(235, 235, 235);
//   pdf.rect(margin.left - 2, currentY - 4, 173, 6, 'F');
//   pdf.setFont(undefined, 'bold');
//   pdf.text('Current Position:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   currentY += lineHeight;

//   const jobTypeMap = {
//     1: "Permanent",
//     2: "Contract"
//   };
  
//   pdf.setFont(undefined, 'bold');
//   pdf.text('Present Job Type:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text(jobTypeMap[employment.presentJobType] || 'N/A', margin.left + labelWidth, currentY);
//   currentY += lineHeight ;
  
  
//   pdf.setFont(undefined, 'bold');
//   pdf.text('Job Category:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text(String(employment.presentJobCategory || 'N/A'), margin.left + labelWidth, currentY);
//   currentY += lineHeight;
  
//   pdf.setFont(undefined, 'bold');
//   pdf.text('Designation:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text(String(employment.presentDesignation || 'N/A'), margin.left + labelWidth, currentY);
//   currentY += lineHeight;
  
//   pdf.setFont(undefined, 'bold');
//   pdf.text('Grade:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text(String(employment.presentGrade || 'N/A'), margin.left + labelWidth, currentY);
//   currentY += lineHeight * 1.5;
  
//   // Joined details
//   if (employment.joinedDetails && Object.keys(employment.joinedDetails).length > 0) {
//     checkPageSpace();
//     pdf.setFillColor(235, 235, 235);
//     pdf.rect(margin.left - 2, currentY - 4, 173, 6, 'F');
//     pdf.setFont(undefined, 'bold');
//     pdf.text('Joined Information:', margin.left, currentY);
//     pdf.setFont(undefined, 'normal');
//     currentY += lineHeight;
    
//     // pdf.setFont(undefined, 'bold');
//     // pdf.text('Joined As:', margin.left, currentY);
//     // pdf.setFont(undefined, 'normal');
//     // pdf.text(String(employment.joinedAs || 'N/A'), margin.left + labelWidth, currentY);
//     // currentY += lineHeight;

    
//     pdf.setFont(undefined, 'bold');
//     pdf.text('Joined Type:', margin.left, currentY);
//     pdf.setFont(undefined, 'normal');
//     pdf.text(String(employment.joinedDetails.joinedType || 'N/A'), margin.left + labelWidth, currentY);
//     currentY += lineHeight;
    
//     pdf.setFont(undefined, 'bold');
//     pdf.text('Original EPF Number:', margin.left, currentY);
//     pdf.setFont(undefined, 'normal');
//     pdf.text(String(employment.joinedDetails.epfNumber || 'N/A'), margin.left + labelWidth, currentY);
//     currentY += lineHeight;
    
//     pdf.setFont(undefined, 'bold');
//     pdf.text('Initial Designation:', margin.left, currentY);
//     pdf.setFont(undefined, 'normal');
//     pdf.text(String(employment.joinedDetails.designation || 'N/A'), margin.left + labelWidth, currentY);
//     currentY += lineHeight;
    
//     pdf.setFont(undefined, 'bold');
//     pdf.text('Initial Grade:', margin.left, currentY);
//     pdf.setFont(undefined, 'normal');
//     pdf.text(String(employment.joinedDetails.grade || 'N/A'), margin.left + labelWidth, currentY);
//     currentY += lineHeight;
    
//     pdf.setFont(undefined, 'bold');
//     pdf.text('Joined Date:', margin.left, currentY);
//     pdf.setFont(undefined, 'normal');
//     pdf.text(String(formatDate(employment.joinedDetails.date) || 'N/A'), margin.left + labelWidth, currentY);
//     currentY += lineHeight;


//     currentY += lineHeight * 2; 
//   }
// // } else {
// //   pdf.setFont(undefined, 'bold');
// //   pdf.text('Employment Information:', margin.left, currentY);
// //   pdf.setFont(undefined, 'normal');
// //   pdf.text('No employment details available', margin.left + labelWidth, currentY);
// //   currentY += lineHeight;
// // }
      
//       // Employment addresses
// if (employment.employmentAddresses && employment.employmentAddresses.length > 0) {
//   checkPageSpace();
//   pdf.setFont(undefined, 'bold');
//   pdf.text('Employment Locations:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   currentY += lineHeight;

//   // Define column widths and positions
//   const col1 = margin.left;
//   const col2 = margin.left + 90;
//   const colWidth = 85;

//   // Table headers with background
//   pdf.setFillColor(235, 235, 235);
//   pdf.rect(col1, currentY - 5, colWidth, 7, 'F');
//   pdf.rect(col2, currentY - 5, colWidth, 7, 'F');

//   pdf.setFont(undefined, 'bold');
//   pdf.text('Permanent Location', col1 + 5, currentY);
//   pdf.text('Temporary Location', col2 + 5, currentY);
//   pdf.setFont(undefined, 'normal');
//   currentY += lineHeight;

//   // Find permanent and temporary addresses
//   const permanentAddresses = employment.employmentAddresses.filter(addr =>
//     addr.addressType?.toLowerCase() === 'permanent');
//   const temporaryAddresses = employment.employmentAddresses.filter(addr =>
//     addr.addressType?.toLowerCase() === 'temporary');

//   // Calculate how many rows we need
//   const rowCount = Math.max(permanentAddresses.length, temporaryAddresses.length);

//   for (let i = 0; i < rowCount; i++) {
//     checkPageSpace();

//     const rowHeight = lineHeight * 3;
//     const pAddr = permanentAddresses[i] || {};
//     const tAddr = temporaryAddresses[i] || {};

//     const baseY = currentY;

//     // Permanent column
//     pdf.text(`Location: ${pAddr.location || 'N/A'}`, col1 + 5, baseY);
//     pdf.text(`Function: ${pAddr.function || 'N/A'}`, col1 + 5, baseY + lineHeight);
//     pdf.text(`Sub-Function: ${pAddr.subFunction || 'N/A'}`, col1 + 5, baseY + lineHeight * 2);

//     // Temporary column
//     pdf.text(`Location: ${tAddr.location || 'N/A'}`, col2 + 5, baseY);
//     pdf.text(`Function: ${tAddr.function || 'N/A'}`, col2 + 5, baseY + lineHeight);
//     pdf.text(`Sub-Function: ${tAddr.subFunction || 'N/A'}`, col2 + 5, baseY + lineHeight * 2);

//     // Divider lines (optional)
//     if (i < rowCount - 1) {
//       pdf.setDrawColor(200, 200, 200);
//       pdf.line(col1 + 5, baseY + rowHeight, col1 + colWidth - 5, baseY + rowHeight);
//       pdf.line(col2 + 5, baseY + rowHeight, col2 + colWidth - 5, baseY + rowHeight);
//     }

//     currentY += rowHeight + 2; // spacing between rows
//   }

//   currentY += lineHeight; // extra spacing after section
// }

      
//      // Promotion history
//      if (employment.promotions && employment.promotions.length > 0) {
//       checkPageSpace();
//       pdf.setFont(undefined, 'bold');
//       pdf.text('Promotion History:', margin.left, currentY);
//       pdf.setFont(undefined, 'normal');
//       currentY += lineHeight;
    
//       // Table header
//       pdf.setFillColor(235, 235, 235);
//       pdf.rect(margin.left, currentY - 5, 175, 7, 'F');
//       pdf.setFont(undefined, 'bold');
    
//       const colWidths = {
//         grade: 15,
//         designation: 25,
//         from: 18,
//         to: 18,
//         location: 25,
//         function: 25,
//         subFunction: 30,
//       };
    
//       const colPositions = {
//         grade: margin.left + 2,
//         designation: margin.left + 18,
//         from: margin.left + 45,
//         to: margin.left + 65,
//         location: margin.left + 85,
//         function: margin.left + 110,
//         subFunction: margin.left + 135,
//       };
    
//       pdf.text('Grade', colPositions.grade, currentY);
//       pdf.text('Designation', colPositions.designation, currentY);
//       pdf.text('From', colPositions.from, currentY);
//       pdf.text('To', colPositions.to, currentY);
//       pdf.text('Location', colPositions.location, currentY);
//       pdf.text('Function', colPositions.function, currentY);
//       pdf.text('Sub-Function', colPositions.subFunction, currentY);
//       pdf.setFont(undefined, 'normal');
//       currentY += lineHeight;
    
//       employment.promotions.forEach((promotion) => {
//         checkPageSpace(15);
    
//         // Use splitTextToSize for each column cell
//         const lines = {
//           grade: pdf.splitTextToSize(promotion.grade || '', colWidths.grade),
//           designation: pdf.splitTextToSize(promotion.designation || '', colWidths.designation),
//           from: pdf.splitTextToSize(formatDate(promotion.durationFrom), colWidths.from),
//           to: pdf.splitTextToSize(formatDate(promotion.durationTo), colWidths.to),
//           location: pdf.splitTextToSize(promotion.location || '', colWidths.location),
//           function: pdf.splitTextToSize(promotion.function || '', colWidths.function),
//           subFunction: pdf.splitTextToSize(promotion.subFunction || '', colWidths.subFunction),
//         };
    
//         const maxLines = Math.max(
//           lines.grade.length,
//           lines.designation.length,
//           lines.from.length,
//           lines.to.length,
//           lines.location.length,
//           lines.function.length,
//           lines.subFunction.length
//         );
    
//         for (let i = 0; i < maxLines; i++) {
//           if (i > 0) checkPageSpace(7); // each wrapped line might need space
//           pdf.text(lines.grade[i] || '', colPositions.grade, currentY);
//           pdf.text(lines.designation[i] || '', colPositions.designation, currentY);
//           pdf.text(lines.from[i] || '', colPositions.from, currentY);
//           pdf.text(lines.to[i] || '', colPositions.to, currentY);
//           pdf.text(lines.location[i] || '', colPositions.location, currentY);
//           pdf.text(lines.function[i] || '', colPositions.function, currentY);
//           pdf.text(lines.subFunction[i] || '', colPositions.subFunction, currentY);
//           currentY += lineHeight;
//         }
    
//         pdf.setDrawColor(200, 200, 200);
//         pdf.line(margin.left, currentY, margin.left + 175, currentY);
//         pdf.setDrawColor(0, 0, 0);
//         currentY += lineHeight * 0.5;
//       });
//     }
//     //  else {
//     //   pdf.setFont(undefined, 'bold');
//     //   pdf.text('Promotion History:', margin.left, currentY);
//     //   pdf.setFont(undefined, 'normal');
//     //   currentY += lineHeight;
//     //   pdf.text('No promotions available', margin.left + 5, currentY);
//     //   currentY += lineHeight;
//     // }
    
    
      
//     } else {
//       addField('Employment Information', 'No employment details available');
//     }
    


//    // 4. SPOUSE DETAILS SECTION - Only if available and marital status is married
// // Check both spouse details exist AND marital status is married
// if (employeeData.spouseDetails && 
//   Object.keys(employeeData.spouseDetails).length > 0 && 
//   employeeData.maritalStatus && 
//   employeeData.maritalStatus.toLowerCase() === 'married') {
 
//  // Force a new page for spouse details
//  pdf.addPage();
//  currentY = margin.top; 
//  addSectionHeader('4. SPOUSE DETAILS');

//  const spouse = employeeData.spouseDetails;
//  const labelWidth = 65;

//  pdf.setFont(undefined, 'bold');
//  pdf.text('Name with Initials:', col1, currentY);
//  pdf.setFont(undefined, 'normal');
//  pdf.text(`${spouse.title || ''} ${spouse.nameWithInitials || 'N/A'}`.trim(), col1 + labelWidth, currentY);
//  currentY += lineHeight;

//  pdf.setFont(undefined, 'bold');
//  pdf.text('Date of Birth:', margin.left, currentY);
//  pdf.setFont(undefined, 'normal');
//  pdf.text(String(formatDate(spouse.dateOfBirth) || 'N/A'), margin.left + labelWidth, currentY);
//  currentY += lineHeight;

//  pdf.setFont(undefined, 'bold');
//  pdf.text('NIC Number:', margin.left, currentY);
//  pdf.setFont(undefined, 'normal');
//  pdf.text(String(spouse.nicNumber || 'N/A'), margin.left + labelWidth, currentY);
//  currentY += lineHeight;

//  pdf.setFont(undefined, 'bold');
//  pdf.text('Address:', margin.left, currentY);
//  pdf.setFont(undefined, 'normal');
//  pdf.text(String(spouse.address || 'N/A'), margin.left + labelWidth, currentY);
//  currentY += lineHeight;

//  pdf.setFont(undefined, 'bold');
//  pdf.text('Postal Code:', margin.left, currentY);
//  pdf.setFont(undefined, 'normal');
//  pdf.text(String(spouse.postalCode || 'N/A'), margin.left + labelWidth, currentY);
//  currentY += lineHeight;

//  pdf.setFont(undefined, 'bold');
//  pdf.text('Contact Number:', margin.left, currentY);
//  pdf.setFont(undefined, 'normal');
//  pdf.text(String(spouse.contactNumber || 'N/A'), margin.left + labelWidth, currentY);
//  currentY += lineHeight;

//  pdf.setFont(undefined, 'bold');
//  pdf.text('Work Place Address:', margin.left, currentY);
//  pdf.setFont(undefined, 'normal');
//  pdf.text(String(spouse.workPlaceAddress || 'N/A'), margin.left + labelWidth, currentY);
//  currentY += lineHeight;

//  pdf.setFont(undefined, 'bold');
//  pdf.text('Work Place Telephone:', margin.left, currentY);
//  pdf.setFont(undefined, 'normal');
//  pdf.text(String(spouse.workPlaceTeleNumber || 'N/A'), margin.left + labelWidth, currentY);
//  currentY += lineHeight;
// }




//     // 6/7. DEPENDENT DETAILS SECTION
//     const dependentSectionNumber = employeeData.spouseDetails && Object.keys(employeeData.spouseDetails).length > 0 ? '5' : '4';
//     const dependents = employeeData.dependentDetails?.dependents || employeeData.dependents || [];
    
//     if (dependents.length > 0) {
//       checkPageSpace();
//       addSectionHeader(`${dependentSectionNumber}. DEPENDENT DETAILS`);
    
//       pdf.setFont(undefined, 'normal');
//       pdf.text(`Total Number of Dependents: ${employeeData.numberOfDependents || dependents.length}`, margin.left, currentY);
//       currentY += lineHeight * 1.5;
    
//       const headers = ['Relationship', 'Name', 'Gender', 'Date of Birth', 'Occupation', 'Occupation Address'];
//       const columnWidths = [25, 43, 18, 25, 25, 42];
//       const columnX = columnWidths.reduce((acc, width, i) => {
//         acc.push(i === 0 ? margin.left : acc[i - 1] + columnWidths[i - 1]);
//         return acc;
//       }, []);
    
//       // Draw header background
//       pdf.setFillColor(220, 220, 220);
//       pdf.rect(margin.left, currentY, columnWidths.reduce((a, b) => a + b), 10, 'F');
    
//       pdf.setTextColor(0, 0, 0);
//       pdf.setFont(undefined, 'bold');
//       columnX.forEach((x, i) => {
//         pdf.text(headers[i], x + 2, currentY + 7);
//       });
    
//       currentY += 11;
//       pdf.setFont(undefined, 'normal');
    
//       dependents.forEach((dep, index) => {
//         checkPageSpace(12);
    
//         const rowData = [
//           dep.relationship || dep.dependentRelationship || 'N/A',
//           dep.fullName || dep.dependentFullName || 'N/A',
//           dep.gender || dep.dependentGender || 'N/A',
//           formatDate(dep.dateOfBirth || dep.dependentDateOfBirth),
//           dep.occupation || dep.dependentOccupation || 'N/A',
//           dep.occupationAddress || 'N/A',
//         ];
    
//         const lines = rowData.map((text, i) =>
//           pdf.splitTextToSize(text, columnWidths[i] - 4)
//         );
//         const rowHeight = lines.reduce((max, arr) => Math.max(max, arr.length), 1) * lineHeight;
    
//         if (index % 2 === 0) {
//           pdf.setFillColor(245, 245, 245);
//           pdf.rect(margin.left, currentY - 2, columnWidths.reduce((a, b) => a + b), rowHeight + 4, 'F');
//         }
    
//         lines.forEach((cellLines, i) => {
//           const x = columnX[i];
//           const y = currentY;
//           cellLines.forEach((line, j) => {
//             pdf.text(line, x + 2, y + (j + 1) * lineHeight);
//           });
//         });
    
//         currentY += rowHeight + 4;
//       });
//     } 
//     // else {
      
//     //   pdf.setFont(undefined, 'normal');
//     //   pdf.text('No dependents available', margin.left, currentY);
//     //   currentY += lineHeight;
//     // }
    

    


// // Update section numbers based on whether spouse details exist AND marital status is married
// const isMarriedWithSpouseDetails = 
//   employeeData.spouseDetails && 
//   Object.keys(employeeData.spouseDetails).length > 0 && 
//   employeeData.maritalStatus && 
//   employeeData.maritalStatus.toLowerCase() === 'married';

//   pdf.addPage();
//  currentY = margin.top; 
// const academicSectionNumber = isMarriedWithSpouseDetails ? '6' : '5';
// checkPageSpace();
// addSectionHeader(`${academicSectionNumber}. ACADEMIC DETAILS`);

// if (employeeData.academicDetails) {
//   const academic = employeeData.academicDetails;
//   const labelWidth = 65;
  
//   // pdf.setFont(undefined, 'bold');
//   // pdf.text('School:', margin.left, currentY);
//   // pdf.setFont(undefined, 'normal');
//   // pdf.text(String(academic.schoolName || 'N/A'), margin.left + labelWidth, currentY);
//   // currentY += lineHeight;
  
//   pdf.setFont(undefined, 'bold');
//   pdf.text('School Leaving Year:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text(String(academic.schoolLeavingYear || 'N/A'), margin.left + labelWidth, currentY);
//   currentY += lineHeight;
  
//   pdf.setFont(undefined, 'bold');
//   pdf.text('School Leaving Grade:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text(String(academic.schoolLeavingGrade || 'N/A'), margin.left + labelWidth, currentY);
//   currentY += lineHeight * 1.5;
      
//       // Add exam results if available
//       if (academic.examResults && academic.examResults.length > 0) {
//         currentY += lineHeight * 0.5;
//         pdf.setFont(undefined, 'bold');
//         pdf.text('Examination Results:', margin.left, currentY);
//         pdf.setFont(undefined, 'normal');
//         currentY += lineHeight;
        
//         academic.examResults.forEach((exam, index) => {
//           checkPageSpace(20);
//           pdf.setFillColor(240, 240, 240);
//           pdf.rect(margin.left, currentY - 5, 170, 7, 'F');
//           pdf.setFont(undefined, 'bold');
//           let examHeader = `${index + 1}. ${exam.examType || 'Exam'} (Year: ${exam.attemptYear || 'N/A'}, Attempt: ${exam.attempt || 'N/A'})`;

//           // Check if the exam type is A/L and append stream if available
//           const examType = (exam.examType || '').toLowerCase().replace(/\s+/g, '');
//           if (examType.includes('a/l')) {
//             examHeader += `, Stream: ${exam.stream || 'N/A'}`;
//           }

//           pdf.text(examHeader, margin.left + 5, currentY);

//           pdf.setFont(undefined, 'normal');
//           currentY += lineHeight;
          
//           // Add index number
//           pdf.text(`Index Number: ${exam.indexNumber || 'N/A'}`, margin.left + 10, currentY);
//           currentY += lineHeight;
          
//           if (exam.subjectTable && exam.subjectTable.length > 0) {
//             // Create table header for subjects
//             pdf.setFillColor(245, 245, 245);
//             pdf.rect(margin.left + 10, currentY - 5, 160, 7, 'F');
//             pdf.setFont(undefined, 'bold');
//             pdf.text('Subject', margin.left + 15, currentY);
//             pdf.text('Result', margin.left + 100, currentY);
//             pdf.setFont(undefined, 'normal');
//             currentY += lineHeight;
            
//             exam.subjectTable.forEach((subject) => {
//               checkPageSpace();
//               pdf.text(subject.subjectName || 'Subject', margin.left + 15, currentY);
//               pdf.text(subject.subjectResults || 'N/A', margin.left + 100, currentY);
//               currentY += lineHeight;
//             });
//           }
//           currentY += lineHeight * 0.5;
//         });
//       }
//     } else {
//       addField('Academic Information', 'No academic details available');
//     }




    
// //     // 6/7. DEPENDENT DETAILS SECTION
// // const dependentSectionNumber =
// // employeeData.spouseDetails && Object.keys(employeeData.spouseDetails).length > 0
// //   ? '6'
// //   : '5';

// // const dependents = employeeData.dependentDetails?.dependents || employeeData.dependents || [];

// // if (dependents.length > 0) {
// // checkPageSpace();
// // addSectionHeader(`${dependentSectionNumber}. DEPENDENT DETAILS`);

// // pdf.setFont(undefined, 'normal');
// // pdf.text(`Total Number of Dependents: ${employeeData.numberOfDependents || dependents.length}`, margin.left, currentY);
// // currentY += lineHeight * 1.5;

// // const headers = ['Name', 'Gender', 'Date of Birth', 'Occupation', 'Occupation Address'];
// // const columnWidths = [45, 25, 30, 35, 60];

// // // Draw header background
// // // Draw header background
// // pdf.setFillColor(220, 220, 220); // Light gray background for header
// // let x = margin.left;
// // headers.forEach((header, i) => {
// //   pdf.rect(x, currentY, columnWidths[i], 10, ); // 'F' fills the cell
// //   pdf.setTextColor(0, 0, 0); // Ensure text color is black
// //   pdf.setFont(undefined, 'bold');
// //   pdf.text(header, x + 2, currentY + 7);
// //   x += columnWidths[i];
// // });


// // currentY += 11;

// // pdf.setFont(undefined, 'normal');

// // dependents.forEach((dep) => {
// //   checkPageSpace(12);

// //   const rowData = [
// //     dep.fullName || dep.dependentFullName || 'N/A',
// //     dep.gender || dep.dependentGender || 'N/A',
// //     formatDate(dep.dateOfBirth || dep.dependentDateOfBirth),
// //     dep.occupation || dep.dependentOccupation || 'N/A',
// //     dep.occupationAddress || 'N/A',
// //   ];

// //   let x = margin.left;
// //   const rowHeight = 10;

// //   // Draw row background and text
// //   rowData.forEach((text, i) => {
// //     pdf.rect(x, currentY, columnWidths[i], rowHeight); // Draw border
// //     const lines = pdf.splitTextToSize(text, columnWidths[i] - 4);
// //     pdf.text(lines, x + 2, currentY + 5);
// //     x += columnWidths[i];
// //   });

// //   currentY += rowHeight;
// // });
// // }

  
    
    
//     // Add footer with page numbers
//     const totalPages = pdf.internal.getNumberOfPages();
//     for (let i = 1; i <= totalPages; i++) {
//       pdf.setPage(i);
//       pdf.setFontSize(8);
//       pdf.setFont(undefined, 'normal');
//       pdf.text(`Page ${i} of ${totalPages}`, pdf.internal.pageSize.width / 2, 290, { align: 'center' });
//       pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 290);
//       pdf.text(`EPF Number: ${employeeData.epfNumber || 'N/A'}`, 170, 290);
//     }
    
//     // 3. Save the PDF with the employee's name or EPF number
//     pdf.save(`Employee_${employeeData.epfNumber || 'Data'}.pdf`);
    
//     return { success: true, message: "PDF downloaded successfully!" };
//   } catch (error) {
//     console.error("❌ Error generating PDF:", error.message);
//     throw new Error("Failed to generate PDF. Please try again later.");
//   }
// };




// // Alternative approach using HTML rendering for more complex layouts
// export const downloadEmployeeDataAsPDFFromHTML = async (epfNumber, elementId) => {
//   try {
//     // 1. First fetch the data
//     const employeeData = await fetchEmployeeData(epfNumber);
    
//     // 2. Make sure the data is displayed in the HTML element
//     // This assumes you have an HTML element with the specified ID that contains 
//     // the rendered employee data in the format you want for the PDF
    
//     // 3. Use html2canvas to capture the element as an image
//     const element = document.getElementById(elementId);
//     if (!element) {
//       throw new Error("Element not found. Make sure the element ID is correct.");
//     }
    
//     const canvas = await html2canvas(element, {
//       scale: 2, // Higher scale for better quality
//       useCORS: true,
//       logging: false
//     });
    
//     // 4. Create a PDF from the canvas
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'mm', 'a4');
    
//     // Calculate dimensions to fit the image in the PDF
//     const imgWidth = 210; // A4 width in mm (210mm)
//     const imgHeight = canvas.height * imgWidth / canvas.width;
    
//     pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    
//     // If the content is longer than one page, add more pages
//     if (imgHeight > 297) { // A4 height is 297mm
//       let remainingHeight = imgHeight;
//       let position = 0;
//       const pageHeight = 297;
      
//       while (remainingHeight > 0) {
//         position -= pageHeight;
//         remainingHeight -= pageHeight;
        
//         if (remainingHeight > 0) {
//           pdf.addPage();
//           pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//         }
//       }
//     }
    
//     // Add footer with timestamp and document identifier
//     const totalPages = pdf.internal.getNumberOfPages();
//     for (let i = 1; i <= totalPages; i++) {
//       pdf.setPage(i);
//       pdf.setFontSize(8);
//       pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 290);
//       pdf.text(`Page ${i} of ${totalPages}`, pdf.internal.pageSize.width / 2, 290, { align: 'center' });
//       pdf.text(`EPF Number: ${employeeData.epfNumber || 'N/A'}`, 170, 290);
//     }
    
//     // 5. Save the PDF
//     pdf.save(`Employee_${employeeData.epfNumber || 'Data'}.pdf`);
    
//     return { success: true, message: "PDF downloaded successfully!" };
//   } catch (error) {
//     console.error("❌ Error generating PDF from HTML:", error.message);
//     throw new Error("Failed to generate PDF. Please try again later.");
//   }
// };











import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { fetchEmployeeData } from '../services/Api';

// Function to download employee data as PDF
export const downloadEmployeeDataAsPDF = async (epfNumber) => {
  try {
    // 1. Fetch the employee data
    const employeeData = await fetchEmployeeData(epfNumber);
    
    // 2. Initialize PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Define reusable styles
    const styles = {
      title: { fontSize: 18, fontStyle: 'bold' },
      sectionHeader: { fontSize: 14, fontStyle: 'bold' },
      normal: { fontSize: 11, fontStyle: 'normal' },
      small: { fontSize: 10, fontStyle: 'normal' },
    };
    
    // Define margins and positioning
    const margin = {
      left: 20,
      right: 190,
      top: 20,
    };
    
    let currentY = margin.top;
    const lineHeight = 7;
    
    // Helper function to add section headers
    const addSectionHeader = (text) => {
      currentY += lineHeight * 1.5;
      pdf.setFontSize(styles.sectionHeader.fontSize);
      pdf.setFont(undefined, styles.sectionHeader.fontStyle);
      pdf.text(text, margin.left, currentY);
      pdf.line(margin.left, currentY + 1, margin.right, currentY + 1);
      currentY += lineHeight;
      pdf.setFontSize(styles.normal.fontSize);
      pdf.setFont(undefined, styles.normal.fontStyle);
    };
    
    // Helper function to add field and value
    const addField = (label, value, indent = 0) => {
      const displayValue = value !== undefined && value !== null ? value : 'N/A';
      pdf.text(`${label}: ${displayValue}`, margin.left + indent, currentY);
      currentY += lineHeight;
    };
    
    // Helper function to format date
    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString();
    };
    
    // Helper function to check page space and add new page if needed
    const checkPageSpace = (requiredSpace = 40) => {
      if (currentY + requiredSpace > 280) {
        pdf.addPage();
        currentY = margin.top;
        return true;
      }
          return false;
        };
        
        // Document title and company logo placeholder
        pdf.setFontSize(styles.title.fontSize);
        pdf.setFont(undefined, styles.title.fontStyle);
        pdf.text('EMPLOYEE SURVEY CPC - 2025', margin.left, currentY);
        currentY += lineHeight * 1.5;
        
        pdf.setFillColor(240, 240, 240);
        pdf.rect(margin.left, currentY - 5, 40, 8, 'F'); // Background rectangle for EPF number section
        pdf.setFontSize(styles.normal.fontSize);
        pdf.setFont(undefined, 'bold');
        pdf.text(`EPF Number: ${employeeData.epfNumber || 'N/A'}`, margin.left + 2, currentY);
        
        // Profile Image on the right side of the EPF number
        if (employeeData.profileImage) {
          const imageData = `data:image/png;base64,${employeeData.profileImage}`; // Base64 image string
          const imageWidth = 30; // Width of the image
          const imageHeight = 30; // Height of the image
        
          // Position the image on the right side (adjust the X and Y position accordingly)
          const imageX = margin.left + 140; // Positioning it to the right of the EPF number
          
          // Move the image upwards by 10 units from the current Y position
          const imageY = currentY - 17; // Adjust this value to move the image upwards
          
          pdf.addImage(imageData, 'PNG', imageX, imageY, imageWidth, imageHeight);
        }
        
        currentY += lineHeight * 1.5; // Move down after the EPF number and image

        // 1. PERSONAL DETAILS SECTION
        addSectionHeader('1. PERSONAL DETAILS');
        pdf.setFont(undefined, styles.normal.fontStyle);
        
        // Create a two-column layout for personal details
        const col1 = margin.left;
        const col2 = margin.left + 0;
              // Define a consistent position for all values
            const labelWidth = 65; // Adjust based on your longest label

            // Row 1
            pdf.setFont(undefined, 'bold');
            pdf.text('Full Name:', col1, currentY);
            pdf.setFont(undefined, 'normal');
            pdf.text(`${employeeData.title || ''} ${employeeData.fullName || 'N/A'}`.trim(), col1 + labelWidth, currentY);
            currentY += lineHeight;

            // Single column layout for personal information
            pdf.setFont(undefined, 'bold');
            pdf.text('Name with Initials:', col1, currentY);
            pdf.setFont(undefined, 'normal');
            pdf.text(String(employeeData.nameWithInitials || 'N/A'), col1 + labelWidth, currentY);
            currentY += lineHeight;

            pdf.setFont(undefined, 'bold');
            pdf.text('Gender:', col1, currentY);
            pdf.setFont(undefined, 'normal');
            pdf.text(String(employeeData.gender || 'N/A'), col1 + labelWidth, currentY);
            currentY += lineHeight;

            pdf.setFont(undefined, 'bold');
            pdf.text('Marital Status:', col1, currentY);
            pdf.setFont(undefined, 'normal');
            pdf.text(String(employeeData.maritalStatus || 'N/A'), col1 + labelWidth, currentY);
            currentY += lineHeight;

            pdf.setFont(undefined, 'bold');
            pdf.text('Blood Group:', col1, currentY);
            pdf.setFont(undefined, 'normal');
            pdf.text(String(employeeData.bloodGroup || 'N/A'), col1 + labelWidth, currentY);
            currentY += lineHeight;

            pdf.setFont(undefined, 'bold');
            pdf.text('Date of Birth:', col1, currentY);
            pdf.setFont(undefined, 'normal');
            pdf.text(String(formatDate(employeeData.dateOfBirth) || 'N/A'), col1 + labelWidth, currentY);
            currentY += lineHeight;

            pdf.setFont(undefined, 'bold');
            pdf.text('NIC Number:', col1, currentY);
            pdf.setFont(undefined, 'normal');
            pdf.text(String(employeeData.nicNumber || 'N/A'), col1 + labelWidth, currentY);
            currentY += lineHeight;

            // pdf.setFont(undefined, 'bold');
            // pdf.text('Religion:', col1, currentY);
            // pdf.setFont(undefined, 'normal');
            // pdf.text(String(employeeData.religion || 'N/A'), col1 + labelWidth, currentY);
            // currentY += lineHeight;

            const numberToString = {
              1: "Buddhism",
              2: "Hindu",
              3: "Islam",
              4: "Christianity",
              5: "Other"
            };
            
            // Helper function to get the religion name from a number
            const getReligionString = (religionNumber) => {
              return numberToString[religionNumber] || 'N/A'; // Default to 'N/A' if not found
            };
            
            // Use it when printing religion
            pdf.setFont(undefined, 'bold');
            pdf.text('Religion:', col1, currentY);
            pdf.setFont(undefined, 'normal');
            pdf.text(getReligionString(employeeData.religion), col1 + labelWidth, currentY);
            currentY += lineHeight;
            


            pdf.setFont(undefined, 'bold');
            pdf.text('Race:', col1, currentY);
            pdf.setFont(undefined, 'normal');
            pdf.text(String(employeeData.race || 'N/A'), col1 + labelWidth, currentY);
            currentY += lineHeight;

            pdf.setFont(undefined, 'bold');
            pdf.text('Driving License:', col1, currentY);
            pdf.setFont(undefined, 'normal');
            pdf.text(String(employeeData.drivingLicense || 'N/A'), col1 + labelWidth, currentY);
            currentY += lineHeight;

            pdf.setFont(undefined, 'bold');
            pdf.text('Passport Number:', col1, currentY);
            pdf.setFont(undefined, 'normal');
            pdf.text(String(employeeData.passportNumber || 'N/A'), col1 + labelWidth, currentY);
            currentY += lineHeight;

            pdf.setFont(undefined, 'bold');
            pdf.text('Number of Dependents:', col1, currentY);
            pdf.setFont(undefined, 'normal');
            pdf.text(String(employeeData.numberOfDependents || '0'), col1 + labelWidth, currentY);
            currentY += lineHeight;




     // 2. CONTACT DETAILS SECTION
     pdf.addPage(); // <-- This forces a new page
     currentY = margin.top; // Reset Y position on the new page
     addSectionHeader('2. CONTACT DETAILS');
     

if (employeeData.contactDetails && employeeData.contactDetails.length > 0) {
  const contact = employeeData.contactDetails[0];
  
  // Temporary Address subsection
  pdf.setFillColor(235, 235, 235);
  pdf.rect(margin.left - 2, currentY - 4, 173, 6, 'F');
  pdf.setFont(undefined, 'bold');
  pdf.text('Temporary Address:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  currentY += lineHeight;
  
  // Define a consistent position for all values
  const labelWidth = 65; // Adjust based on your longest label
  
  
  pdf.setFont(undefined, 'bold');
  pdf.text('Address:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text(String(contact.temporaryAddress || 'N/A'), margin.left + labelWidth, currentY);
  currentY += lineHeight;
  
  pdf.setFont(undefined, 'bold');
  pdf.text('Postal Code:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text(String(contact.temporaryPostalCode || 'N/A'), margin.left + labelWidth, currentY);
  currentY += lineHeight;
  
  pdf.setFont(undefined, 'bold');
  pdf.text('District:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text(String(contact.temporaryDistrict || 'N/A'), margin.left + labelWidth, currentY);
  currentY += lineHeight;
  
  pdf.setFont(undefined, 'bold');
  pdf.text('Province:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text(String(contact.temporaryProvince || 'N/A'), margin.left + labelWidth, currentY);
  currentY += lineHeight;
  
  pdf.setFont(undefined, 'bold');
  pdf.text('Distance to Workplace (km):', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text(String(contact.distantBetWorkPlaceAndTemporyAddress || 'N/A'), margin.left + labelWidth, currentY);
  currentY += lineHeight * 1.5;
  
  // Permanent Address subsection
  checkPageSpace();
  pdf.setFillColor(235, 235, 235);
  pdf.rect(margin.left - 2, currentY - 4, 173, 6, 'F');
  pdf.setFont(undefined, 'bold');
  pdf.text('Permanent Address:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  currentY += lineHeight;
  
  pdf.setFont(undefined, 'bold');
  pdf.text('Address:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text(String(contact.permanentAddress || 'N/A'), margin.left + labelWidth, currentY);
  currentY += lineHeight;
  
  pdf.setFont(undefined, 'bold');
  pdf.text('Postal Code:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text(String(contact.permanentPostalCode || 'N/A'), margin.left + labelWidth, currentY);
  currentY += lineHeight;
  
  pdf.setFont(undefined, 'bold');
  pdf.text('Grama Division:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text(String(contact.permanentGramaDivision || 'N/A'), margin.left + labelWidth, currentY);
  currentY += lineHeight;
  
  pdf.setFont(undefined, 'bold');
  pdf.text('AGA Division:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text(String(contact.permanentAGADivision || 'N/A'), margin.left + labelWidth, currentY);
  currentY += lineHeight;
  
  pdf.setFont(undefined, 'bold');
  pdf.text('Electoral:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text(String(contact.permanentElectoral || 'N/A'), margin.left + labelWidth, currentY);
  currentY += lineHeight;
  
  pdf.setFont(undefined, 'bold');
  pdf.text('Police Division:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text(String(contact.policeDivision || 'N/A'), margin.left + labelWidth, currentY);
  currentY += lineHeight;
  
  pdf.setFont(undefined, 'bold');
  pdf.text('District:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text(String(contact.permanentDistrict || 'N/A'), margin.left + labelWidth, currentY);
  currentY += lineHeight;
  
  pdf.setFont(undefined, 'bold');
  pdf.text('Province:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text(String(contact.permanentProvince || 'N/A'), margin.left + labelWidth, currentY);
  currentY += lineHeight;
  
  pdf.setFont(undefined, 'bold');
  pdf.text('Distance to Workplace:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text(String(contact.distantBetWorkPlaceAndPermanentAddress || 'N/A'), margin.left + labelWidth, currentY);
  currentY += lineHeight;
  
  pdf.setFont(undefined, 'bold');
  pdf.text('Telephone Number:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text(String(contact.telephoneNumber || 'N/A'), margin.left + labelWidth, currentY);
  currentY += lineHeight * 1.5;
  

  checkPageSpace(); // Optional, in case content is near page bottom

pdf.setFillColor(235, 235, 235);
pdf.rect(margin.left - 2, currentY - 4, 173, 6, 'F');
pdf.setFont(undefined, 'bold');
pdf.text('Emergency Contact Details:', margin.left, currentY);
pdf.setFont(undefined, 'normal');
currentY += lineHeight;

pdf.setFont(undefined, 'bold');
pdf.text('Relation:', margin.left, currentY);
pdf.setFont(undefined, 'normal');
pdf.text(String(contact.emergencyContactRelation || 'N/A'), margin.left + labelWidth, currentY);
currentY += lineHeight;

pdf.setFont(undefined, 'bold');
pdf.text('Name:', margin.left, currentY);
pdf.setFont(undefined, 'normal');
pdf.text(String(contact.emergencyContactName || 'N/A'), margin.left + labelWidth, currentY);
currentY += lineHeight;

pdf.setFont(undefined, 'bold');
pdf.text('Mobile Number:', margin.left, currentY);
pdf.setFont(undefined, 'normal');
pdf.text(String(contact.emergencyContactMobile || 'N/A'), margin.left + labelWidth, currentY);
currentY += lineHeight;

pdf.setFont(undefined, 'bold');
pdf.text('Land Number:', margin.left, currentY);
pdf.setFont(undefined, 'normal');
pdf.text(String(contact.emergencyContactLandNo || 'N/A'), margin.left + labelWidth, currentY);
currentY += lineHeight;

pdf.setFont(undefined, 'bold');
pdf.text('Address:', margin.left, currentY);
pdf.setFont(undefined, 'normal');
pdf.text(String(contact.emergencyContactAddress || 'N/A'), margin.left + labelWidth, currentY);
currentY += lineHeight;

} else {
  pdf.setFont(undefined, 'bold');
  pdf.text('Contact Information:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text('No contact details available', margin.left + labelWidth, currentY);
  currentY += lineHeight;
}





// 3. EMPLOYMENT DETAILS SECTION
pdf.addPage(); // <-- This forces a new page
currentY = margin.top; // Reset Y position on the new page
addSectionHeader('3. EMPLOYMENT DETAILS');

if (employeeData.employmentDetails) {
  const employment = employeeData.employmentDetails;
  const labelWidth = 65;
  
  // Current position details
  pdf.setFillColor(235, 235, 235);
  pdf.rect(margin.left - 2, currentY - 4, 173, 6, 'F');
  pdf.setFont(undefined, 'bold');
  pdf.text('Current Position:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  currentY += lineHeight;

  const jobTypeMap = {
    1: "Permanent",
    2: "Contract"
  };
  
  pdf.setFont(undefined, 'bold');
  pdf.text('Present Job Type:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text(jobTypeMap[employment.presentJobType] || 'N/A', margin.left + labelWidth, currentY);
  currentY += lineHeight ;
  
  
  pdf.setFont(undefined, 'bold');
  pdf.text('Job Category:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text(String(employment.presentJobCategory || 'N/A'), margin.left + labelWidth, currentY);
  currentY += lineHeight;
  
  pdf.setFont(undefined, 'bold');
  pdf.text('Designation:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text(String(employment.presentDesignation || 'N/A'), margin.left + labelWidth, currentY);
  currentY += lineHeight;
  
  pdf.setFont(undefined, 'bold');
  pdf.text('Grade:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text(String(employment.presentGrade || 'N/A'), margin.left + labelWidth, currentY);
  currentY += lineHeight * 1.5;
  
  // Joined details
  if (employment.joinedDetails && Object.keys(employment.joinedDetails).length > 0) {
    checkPageSpace();
    pdf.setFillColor(235, 235, 235);
    pdf.rect(margin.left - 2, currentY - 4, 173, 6, 'F');
    pdf.setFont(undefined, 'bold');
    pdf.text('Joined Information:', margin.left, currentY);
    pdf.setFont(undefined, 'normal');
    currentY += lineHeight;
    
    // pdf.setFont(undefined, 'bold');
    // pdf.text('Joined As:', margin.left, currentY);
    // pdf.setFont(undefined, 'normal');
    // pdf.text(String(employment.joinedAs || 'N/A'), margin.left + labelWidth, currentY);
    // currentY += lineHeight;

    
    pdf.setFont(undefined, 'bold');
    pdf.text('Joined Type:', margin.left, currentY);
    pdf.setFont(undefined, 'normal');
    pdf.text(String(employment.joinedDetails.joinedType || 'N/A'), margin.left + labelWidth, currentY);
    currentY += lineHeight;
    
    pdf.setFont(undefined, 'bold');
    pdf.text('Original EPF Number:', margin.left, currentY);
    pdf.setFont(undefined, 'normal');
    pdf.text(String(employment.joinedDetails.epfNumber || 'N/A'), margin.left + labelWidth, currentY);
    currentY += lineHeight;
    
    pdf.setFont(undefined, 'bold');
    pdf.text('Initial Designation:', margin.left, currentY);
    pdf.setFont(undefined, 'normal');
    pdf.text(String(employment.joinedDetails.designation || 'N/A'), margin.left + labelWidth, currentY);
    currentY += lineHeight;
    
    pdf.setFont(undefined, 'bold');
    pdf.text('Initial Grade:', margin.left, currentY);
    pdf.setFont(undefined, 'normal');
    pdf.text(String(employment.joinedDetails.grade || 'N/A'), margin.left + labelWidth, currentY);
    currentY += lineHeight;
    
    pdf.setFont(undefined, 'bold');
    pdf.text('Joined Date:', margin.left, currentY);
    pdf.setFont(undefined, 'normal');
    pdf.text(String(formatDate(employment.joinedDetails.date) || 'N/A'), margin.left + labelWidth, currentY);
    currentY += lineHeight;


    currentY += lineHeight * 2; 
  }
// } else {
//   pdf.setFont(undefined, 'bold');
//   pdf.text('Employment Information:', margin.left, currentY);
//   pdf.setFont(undefined, 'normal');
//   pdf.text('No employment details available', margin.left + labelWidth, currentY);
//   currentY += lineHeight;
// }
      
      // Employment addresses
if (employment.employmentAddresses && employment.employmentAddresses.length > 0) {
  checkPageSpace();
  pdf.setFont(undefined, 'bold');
  pdf.text('Employment Locations:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  currentY += lineHeight;

  // Define column widths and positions
  const col1 = margin.left;
  const col2 = margin.left + 90;
  const colWidth = 85;

  // Table headers with background
  pdf.setFillColor(235, 235, 235);
  pdf.rect(col1, currentY - 5, colWidth, 7, 'F');
  pdf.rect(col2, currentY - 5, colWidth, 7, 'F');

  pdf.setFont(undefined, 'bold');
  pdf.text('Permanent Location', col1 + 5, currentY);
  pdf.text('Temporary Location', col2 + 5, currentY);
  pdf.setFont(undefined, 'normal');
  currentY += lineHeight;

  // Find permanent and temporary addresses
  const permanentAddresses = employment.employmentAddresses.filter(addr =>
    addr.addressType?.toLowerCase() === 'permanent');
  const temporaryAddresses = employment.employmentAddresses.filter(addr =>
    addr.addressType?.toLowerCase() === 'temporary');

  // Calculate how many rows we need
  const rowCount = Math.max(permanentAddresses.length, temporaryAddresses.length);

  for (let i = 0; i < rowCount; i++) {
    checkPageSpace();

    const rowHeight = lineHeight * 3;
    const pAddr = permanentAddresses[i] || {};
    const tAddr = temporaryAddresses[i] || {};

    const baseY = currentY;

    // Permanent column
    pdf.text(`Location: ${pAddr.location || 'N/A'}`, col1 + 5, baseY);
    pdf.text(`Function: ${pAddr.function || 'N/A'}`, col1 + 5, baseY + lineHeight);
    pdf.text(`Sub-Function: ${pAddr.subFunction || 'N/A'}`, col1 + 5, baseY + lineHeight * 2);

    // Temporary column
    pdf.text(`Location: ${tAddr.location || 'N/A'}`, col2 + 5, baseY);
    pdf.text(`Function: ${tAddr.function || 'N/A'}`, col2 + 5, baseY + lineHeight);
    pdf.text(`Sub-Function: ${tAddr.subFunction || 'N/A'}`, col2 + 5, baseY + lineHeight * 2);

    // Divider lines (optional)
    if (i < rowCount - 1) {
      pdf.setDrawColor(200, 200, 200);
      pdf.line(col1 + 5, baseY + rowHeight, col1 + colWidth - 5, baseY + rowHeight);
      pdf.line(col2 + 5, baseY + rowHeight, col2 + colWidth - 5, baseY + rowHeight);
    }

    currentY += rowHeight + 2; // spacing between rows
  }

  currentY += lineHeight; // extra spacing after section
}

      
     // Promotion history
     if (employment.promotions && employment.promotions.length > 0) {
      checkPageSpace();
      pdf.setFont(undefined, 'bold');
      pdf.text('Promotion History:', margin.left, currentY);
      pdf.setFont(undefined, 'normal');
      currentY += lineHeight;
    
      // Table header
      pdf.setFillColor(235, 235, 235);
      pdf.rect(margin.left, currentY - 5, 175, 7, 'F');
      pdf.setFont(undefined, 'bold');
    
      const colWidths = {
        grade: 15,
        designation: 25,
        from: 18,
        to: 18,
        location: 25,
        function: 25,
        subFunction: 30,
      };
    
      const colPositions = {
        grade: margin.left + 2,
        designation: margin.left + 18,
        from: margin.left + 45,
        to: margin.left + 65,
        location: margin.left + 85,
        function: margin.left + 110,
        subFunction: margin.left + 135,
      };
    
      pdf.text('Grade', colPositions.grade, currentY);
      pdf.text('Designation', colPositions.designation, currentY);
      pdf.text('From', colPositions.from, currentY);
      pdf.text('To', colPositions.to, currentY);
      pdf.text('Location', colPositions.location, currentY);
      pdf.text('Function', colPositions.function, currentY);
      pdf.text('Sub-Function', colPositions.subFunction, currentY);
      pdf.setFont(undefined, 'normal');
      currentY += lineHeight;
    
      employment.promotions.forEach((promotion) => {
        checkPageSpace(15);
    
        // Use splitTextToSize for each column cell
        const lines = {
          grade: pdf.splitTextToSize(promotion.grade || '', colWidths.grade),
          designation: pdf.splitTextToSize(promotion.designation || '', colWidths.designation),
          from: pdf.splitTextToSize(formatDate(promotion.durationFrom), colWidths.from),
          to: pdf.splitTextToSize(formatDate(promotion.durationTo), colWidths.to),
          location: pdf.splitTextToSize(promotion.location || '', colWidths.location),
          function: pdf.splitTextToSize(promotion.function || '', colWidths.function),
          subFunction: pdf.splitTextToSize(promotion.subFunction || '', colWidths.subFunction),
        };
    
        const maxLines = Math.max(
          lines.grade.length,
          lines.designation.length,
          lines.from.length,
          lines.to.length,
          lines.location.length,
          lines.function.length,
          lines.subFunction.length
        );
    
        for (let i = 0; i < maxLines; i++) {
          if (i > 0) checkPageSpace(7); // each wrapped line might need space
          pdf.text(lines.grade[i] || '', colPositions.grade, currentY);
          pdf.text(lines.designation[i] || '', colPositions.designation, currentY);
          pdf.text(lines.from[i] || '', colPositions.from, currentY);
          pdf.text(lines.to[i] || '', colPositions.to, currentY);
          pdf.text(lines.location[i] || '', colPositions.location, currentY);
          pdf.text(lines.function[i] || '', colPositions.function, currentY);
          pdf.text(lines.subFunction[i] || '', colPositions.subFunction, currentY);
          currentY += lineHeight;
        }
    
        pdf.setDrawColor(200, 200, 200);
        pdf.line(margin.left, currentY, margin.left + 175, currentY);
        pdf.setDrawColor(0, 0, 0);
        currentY += lineHeight * 0.5;
      });
    }
    //  else {
    //   pdf.setFont(undefined, 'bold');
    //   pdf.text('Promotion History:', margin.left, currentY);
    //   pdf.setFont(undefined, 'normal');
    //   currentY += lineHeight;
    //   pdf.text('No promotions available', margin.left + 5, currentY);
    //   currentY += lineHeight;
    // }
    
    
      
    } else {
      addField('Employment Information', 'No employment details available');
    }
    


    const hasSpouseDetails =
    employeeData.spouseDetails &&
    Object.keys(employeeData.spouseDetails).length > 0 &&
    employeeData.maritalStatus?.toLowerCase() === 'married';
  
  const hasDependentDetails =
    Array.isArray(employeeData.dependentDetails?.dependents) &&
    employeeData.dependentDetails.dependents.length > 0;
  

   // 4. SPOUSE DETAILS SECTION - Only if available and marital status is married
// Check both spouse details exist AND marital status is married
if (employeeData.spouseDetails && 
  Object.keys(employeeData.spouseDetails).length > 0 && 
  employeeData.maritalStatus && 
  employeeData.maritalStatus.toLowerCase() === 'married') {
 
 // Force a new page for spouse details
 pdf.addPage();
 currentY = margin.top; 
 addSectionHeader('4. SPOUSE DETAILS');

 const spouse = employeeData.spouseDetails;
 const labelWidth = 65;

 pdf.setFont(undefined, 'bold');
 pdf.text('Name with Initials:', col1, currentY);
 pdf.setFont(undefined, 'normal');
 pdf.text(`${spouse.title || ''} ${spouse.nameWithInitials || 'N/A'}`.trim(), col1 + labelWidth, currentY);
 currentY += lineHeight;

 pdf.setFont(undefined, 'bold');
 pdf.text('Date of Birth:', margin.left, currentY);
 pdf.setFont(undefined, 'normal');
 pdf.text(String(formatDate(spouse.dateOfBirth) || 'N/A'), margin.left + labelWidth, currentY);
 currentY += lineHeight;

 pdf.setFont(undefined, 'bold');
 pdf.text('NIC Number:', margin.left, currentY);
 pdf.setFont(undefined, 'normal');
 pdf.text(String(spouse.nicNumber || 'N/A'), margin.left + labelWidth, currentY);
 currentY += lineHeight;

 pdf.setFont(undefined, 'bold');
 pdf.text('Address:', margin.left, currentY);
 pdf.setFont(undefined, 'normal');
 pdf.text(String(spouse.address || 'N/A'), margin.left + labelWidth, currentY);
 currentY += lineHeight;

 pdf.setFont(undefined, 'bold');
 pdf.text('Postal Code:', margin.left, currentY);
 pdf.setFont(undefined, 'normal');
 pdf.text(String(spouse.postalCode || 'N/A'), margin.left + labelWidth, currentY);
 currentY += lineHeight;

 pdf.setFont(undefined, 'bold');
 pdf.text('Contact Number:', margin.left, currentY);
 pdf.setFont(undefined, 'normal');
 pdf.text(String(spouse.contactNumber || 'N/A'), margin.left + labelWidth, currentY);
 currentY += lineHeight;

 pdf.setFont(undefined, 'bold');
 pdf.text('Work Place Address:', margin.left, currentY);
 pdf.setFont(undefined, 'normal');
 pdf.text(String(spouse.workPlaceAddress || 'N/A'), margin.left + labelWidth, currentY);
 currentY += lineHeight;

 pdf.setFont(undefined, 'bold');
 pdf.text('Work Place Telephone:', margin.left, currentY);
 pdf.setFont(undefined, 'normal');
 pdf.text(String(spouse.workPlaceTeleNumber || 'N/A'), margin.left + labelWidth, currentY);
 currentY += lineHeight;
}




    // 6/7. DEPENDENT DETAILS SECTION
    const dependentSectionNumber = hasSpouseDetails ? '5' : '4';

    const dependents = employeeData.dependentDetails?.dependents || employeeData.dependents || [];
    
    if (dependents.length > 0) {
      checkPageSpace();
      addSectionHeader(`${dependentSectionNumber}. DEPENDENT DETAILS`);
    
      pdf.setFont(undefined, 'normal');
      pdf.text(`Total Number of Dependents: ${employeeData.numberOfDependents || dependents.length}`, margin.left, currentY);
      currentY += lineHeight * 1.5;
    
      const headers = ['Relationship', 'Name', 'Gender', 'Date of Birth', 'Occupation', 'Occupation Address'];
      const columnWidths = [25, 43, 18, 25, 25, 42];
      const columnX = columnWidths.reduce((acc, width, i) => {
        acc.push(i === 0 ? margin.left : acc[i - 1] + columnWidths[i - 1]);
        return acc;
      }, []);
    
      // Draw header background
      pdf.setFillColor(220, 220, 220);
      pdf.rect(margin.left, currentY, columnWidths.reduce((a, b) => a + b), 10, 'F');
    
      pdf.setTextColor(0, 0, 0);
      pdf.setFont(undefined, 'bold');
      columnX.forEach((x, i) => {
        pdf.text(headers[i], x + 2, currentY + 7);
      });
    
      currentY += 11;
      pdf.setFont(undefined, 'normal');
    
      dependents.forEach((dep, index) => {
        checkPageSpace(12);
    
        const rowData = [
          dep.relationship || dep.dependentRelationship || 'N/A',
          dep.fullName || dep.dependentFullName || 'N/A',
          dep.gender || dep.dependentGender || 'N/A',
          formatDate(dep.dateOfBirth || dep.dependentDateOfBirth),
          dep.occupation || dep.dependentOccupation || 'N/A',
          dep.occupationAddress || 'N/A',
        ];
    
        const lines = rowData.map((text, i) =>
          pdf.splitTextToSize(text, columnWidths[i] - 4)
        );
        const rowHeight = lines.reduce((max, arr) => Math.max(max, arr.length), 1) * lineHeight;
    
        if (index % 2 === 0) {
          pdf.setFillColor(245, 245, 245);
          pdf.rect(margin.left, currentY - 2, columnWidths.reduce((a, b) => a + b), rowHeight + 4, 'F');
        }
    
        lines.forEach((cellLines, i) => {
          const x = columnX[i];
          const y = currentY;
          cellLines.forEach((line, j) => {
            pdf.text(line, x + 2, y + (j + 1) * lineHeight);
          });
        });
    
        currentY += rowHeight + 4;
      });
    } 
    // else {
      
    //   pdf.setFont(undefined, 'normal');
    //   pdf.text('No dependents available', margin.left, currentY);
    //   currentY += lineHeight;
    // }
    

    


// Update section numbers based on whether spouse details exist AND marital status is married
const isMarriedWithSpouseDetails = 
  employeeData.spouseDetails && 
  Object.keys(employeeData.spouseDetails).length > 0 && 
  employeeData.maritalStatus && 
  employeeData.maritalStatus.toLowerCase() === 'married';

  pdf.addPage();
 currentY = margin.top; 
 const academicSectionNumber = (() => {
  if (hasSpouseDetails && hasDependentDetails) return '6';
  if (hasSpouseDetails || hasDependentDetails) return '5';
  return '4';
})();

checkPageSpace();
addSectionHeader(`${academicSectionNumber}. ACADEMIC DETAILS`);

if (employeeData.academicDetails) {
  const academic = employeeData.academicDetails;
  const labelWidth = 65;
  
  // pdf.setFont(undefined, 'bold');
  // pdf.text('School:', margin.left, currentY);
  // pdf.setFont(undefined, 'normal');
  // pdf.text(String(academic.schoolName || 'N/A'), margin.left + labelWidth, currentY);
  // currentY += lineHeight;
  
  pdf.setFont(undefined, 'bold');
  pdf.text('School Leaving Year:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text(String(academic.schoolLeavingYear || 'N/A'), margin.left + labelWidth, currentY);
  currentY += lineHeight;
  
  pdf.setFont(undefined, 'bold');
  pdf.text('School Leaving Grade:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text(String(academic.schoolLeavingGrade || 'N/A'), margin.left + labelWidth, currentY);
  currentY += lineHeight * 1.5;
      
      // Add exam results if available
      if (academic.examResults && academic.examResults.length > 0) {
        currentY += lineHeight * 0.5;
        pdf.setFont(undefined, 'bold');
        pdf.text('Examination Results:', margin.left, currentY);
        pdf.setFont(undefined, 'normal');
        currentY += lineHeight;
        
        academic.examResults.forEach((exam, index) => {
          checkPageSpace(20);
          pdf.setFillColor(240, 240, 240);
          pdf.rect(margin.left, currentY - 5, 170, 7, 'F');
          pdf.setFont(undefined, 'bold');
          let examHeader = `${index + 1}. ${exam.examType || 'Exam'} (Year: ${exam.attemptYear || 'N/A'}, Attempt: ${exam.attempt || 'N/A'})`;

          // Check if the exam type is A/L and append stream if available
          const examType = (exam.examType || '').toLowerCase().replace(/\s+/g, '');
          if (examType.includes('a/l')) {
            examHeader += `, Stream: ${exam.stream || 'N/A'}`;
          }

          pdf.text(examHeader, margin.left + 5, currentY);

          pdf.setFont(undefined, 'normal');
          currentY += lineHeight;
          
          // Add index number
          pdf.text(`Index Number: ${exam.indexNumber || 'N/A'}`, margin.left + 10, currentY);
          currentY += lineHeight;
          
          if (exam.subjectTable && exam.subjectTable.length > 0) {
            // Create table header for subjects
            pdf.setFillColor(245, 245, 245);
            pdf.rect(margin.left + 10, currentY - 5, 160, 7, 'F');
            pdf.setFont(undefined, 'bold');
            pdf.text('Subject', margin.left + 15, currentY);
            pdf.text('Result', margin.left + 100, currentY);
            pdf.setFont(undefined, 'normal');
            currentY += lineHeight;
            
            exam.subjectTable.forEach((subject) => {
              checkPageSpace();
              pdf.text(subject.subjectName || 'Subject', margin.left + 15, currentY);
              pdf.text(subject.subjectResults || 'N/A', margin.left + 100, currentY);
              currentY += lineHeight;
            });
          }
          currentY += lineHeight * 0.5;
        });
      }
    } else {
      addField('Academic Information', 'No academic details available');
    }




    
//     // 6/7. DEPENDENT DETAILS SECTION
// const dependentSectionNumber =
// employeeData.spouseDetails && Object.keys(employeeData.spouseDetails).length > 0
//   ? '6'
//   : '5';

// const dependents = employeeData.dependentDetails?.dependents || employeeData.dependents || [];

// if (dependents.length > 0) {
// checkPageSpace();
// addSectionHeader(`${dependentSectionNumber}. DEPENDENT DETAILS`);

// pdf.setFont(undefined, 'normal');
// pdf.text(`Total Number of Dependents: ${employeeData.numberOfDependents || dependents.length}`, margin.left, currentY);
// currentY += lineHeight * 1.5;

// const headers = ['Name', 'Gender', 'Date of Birth', 'Occupation', 'Occupation Address'];
// const columnWidths = [45, 25, 30, 35, 60];

// // Draw header background
// // Draw header background
// pdf.setFillColor(220, 220, 220); // Light gray background for header
// let x = margin.left;
// headers.forEach((header, i) => {
//   pdf.rect(x, currentY, columnWidths[i], 10, ); // 'F' fills the cell
//   pdf.setTextColor(0, 0, 0); // Ensure text color is black
//   pdf.setFont(undefined, 'bold');
//   pdf.text(header, x + 2, currentY + 7);
//   x += columnWidths[i];
// });


// currentY += 11;

// pdf.setFont(undefined, 'normal');

// dependents.forEach((dep) => {
//   checkPageSpace(12);

//   const rowData = [
//     dep.fullName || dep.dependentFullName || 'N/A',
//     dep.gender || dep.dependentGender || 'N/A',
//     formatDate(dep.dateOfBirth || dep.dependentDateOfBirth),
//     dep.occupation || dep.dependentOccupation || 'N/A',
//     dep.occupationAddress || 'N/A',
//   ];

//   let x = margin.left;
//   const rowHeight = 10;

//   // Draw row background and text
//   rowData.forEach((text, i) => {
//     pdf.rect(x, currentY, columnWidths[i], rowHeight); // Draw border
//     const lines = pdf.splitTextToSize(text, columnWidths[i] - 4);
//     pdf.text(lines, x + 2, currentY + 5);
//     x += columnWidths[i];
//   });

//   currentY += rowHeight;
// });
// }

  
    
    
    // Add footer with page numbers
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setFont(undefined, 'normal');
      pdf.text(`Page ${i} of ${totalPages}`, pdf.internal.pageSize.width / 2, 290, { align: 'center' });
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 290);
      pdf.text(`EPF Number: ${employeeData.epfNumber || 'N/A'}`, 170, 290);
    }
    
    // 3. Save the PDF with the employee's name or EPF number
    pdf.save(`Employee_${employeeData.epfNumber || 'Data'}.pdf`);
    
    return { success: true, message: "PDF downloaded successfully!" };
  } catch (error) {
    console.error("❌ Error generating PDF:", error.message);
    throw new Error("Failed to generate PDF. Please try again later.");
  }
};




// Alternative approach using HTML rendering for more complex layouts
export const downloadEmployeeDataAsPDFFromHTML = async (epfNumber, elementId) => {
  try {
    // 1. First fetch the data
    const employeeData = await fetchEmployeeData(epfNumber);
    
    // 2. Make sure the data is displayed in the HTML element
    // This assumes you have an HTML element with the specified ID that contains 
    // the rendered employee data in the format you want for the PDF
    
    // 3. Use html2canvas to capture the element as an image
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Element not found. Make sure the element ID is correct.");
    }
    
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false
    });
    
    // 4. Create a PDF from the canvas
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Calculate dimensions to fit the image in the PDF
    const imgWidth = 210; // A4 width in mm (210mm)
    const imgHeight = canvas.height * imgWidth / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    
    // If the content is longer than one page, add more pages
    if (imgHeight > 297) { // A4 height is 297mm
      let remainingHeight = imgHeight;
      let position = 0;
      const pageHeight = 297;
      
      while (remainingHeight > 0) {
        position -= pageHeight;
        remainingHeight -= pageHeight;
        
        if (remainingHeight > 0) {
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        }
      }
    }
    
    // Add footer with timestamp and document identifier
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 290);
      pdf.text(`Page ${i} of ${totalPages}`, pdf.internal.pageSize.width / 2, 290, { align: 'center' });
      pdf.text(`EPF Number: ${employeeData.epfNumber || 'N/A'}`, 170, 290);
    }
    
    // 5. Save the PDF
    pdf.save(`Employee_${employeeData.epfNumber || 'Data'}.pdf`);
    
    return { success: true, message: "PDF downloaded successfully!" };
  } catch (error) {
    console.error("❌ Error generating PDF from HTML:", error.message);
    throw new Error("Failed to generate PDF. Please try again later.");
  }
};