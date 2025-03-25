// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import { fetchEmployeeData } from '../services/Api';

// // Function to download employee data as PDF
// export const downloadEmployeeDataAsPDF = async (epfNumber) => {
//   try {
//     // 1. Fetch the employee data
//     const employeeData = await fetchEmployeeData(epfNumber);
    
//     // 2. Generate PDF with the data
//     const pdf = new jsPDF('p', 'mm', 'a4');
    
//     // Set title
//     pdf.setFontSize(18);
//     pdf.text('Employee Personal Details', 20, 20);
    
//     // Set regular font size for content
//     pdf.setFontSize(12);
    
//     // Personal Details section
//     pdf.setFont(undefined, 'bold');
//     pdf.text('Personal Details', 20, 30);
//     pdf.setFont(undefined, 'normal');
//     pdf.text(`EPF Number: ${employeeData.epfNumber || 'N/A'}`, 20, 40);
//     pdf.text(`Name: ${employeeData.title || ''} ${employeeData.nameWithInitials || 'N/A'}`, 20, 45);
//     pdf.text(`Full Name: ${employeeData.fullName || 'N/A'}`, 20, 50);
//     pdf.text(`Gender: ${employeeData.gender || 'N/A'}`, 20, 55);
//     pdf.text(`Marital Status: ${employeeData.maritalStatus || 'N/A'}`, 20, 60);
//     pdf.text(`Date of Birth: ${employeeData.dateOfBirth ? new Date(employeeData.dateOfBirth).toLocaleDateString() : 'N/A'}`, 20, 65);
//     pdf.text(`NIC Number: ${employeeData.nicNumber || 'N/A'}`, 20, 70);
    
//     // Contact Details section
//     if (employeeData.contactDetails && employeeData.contactDetails.length > 0) {
//       const contact = employeeData.contactDetails[0];
//       pdf.setFont(undefined, 'bold');
//       pdf.text('Contact Details', 20, 85);
//       pdf.setFont(undefined, 'normal');
//       pdf.text(`Permanent Address: ${contact.permanentAddress || 'N/A'}`, 20, 95);
//       pdf.text(`Permanent Postal Code: ${contact.permanentPostalCode || 'N/A'}`, 20, 100);
//       pdf.text(`Temporary Address: ${contact.temporaryAddress || 'N/A'}`, 20, 105);
//       pdf.text(`Telephone Number: ${contact.telephoneNumber || 'N/A'}`, 20, 110);
//     }
    
//     // Employment Details section
//     if (employeeData.employmentDetails) {
//       const employment = employeeData.employmentDetails;
//       pdf.setFont(undefined, 'bold');
//       pdf.text('Employment Details', 20, 125);
//       pdf.setFont(undefined, 'normal');
//       pdf.text(`Current Position: ${employment.presentDesignation || 'N/A'}`, 20, 135);
//       pdf.text(`Current Grade: ${employment.presentGrade || 'N/A'}`, 20, 140);
//       pdf.text(`Job Category: ${employment.presentJobCategory || 'N/A'}`, 20, 145);
      
//       // Add joined details if available
//       if (employment.joinedDetails) {
//         pdf.text(`Joined As: ${employment.joinedAs || 'N/A'}`, 20, 155);
//         pdf.text(`Joined Date: ${employment.joinedDetails.date ? new Date(employment.joinedDetails.date).toLocaleDateString() : 'N/A'}`, 20, 160);
//       }
//     }
    
//     // Add more sections as needed (spouse details, academic details, etc.)
//     if (employeeData.spouseDetails && Object.keys(employeeData.spouseDetails).length > 0) {
//       pdf.addPage();
//       pdf.setFont(undefined, 'bold');
//       pdf.text('Spouse Details', 20, 20);
//       pdf.setFont(undefined, 'normal');
//       pdf.text(`Name: ${employeeData.spouseDetails.title || ''} ${employeeData.spouseDetails.nameWithInitials || 'N/A'}`, 20, 30);
//       pdf.text(`Full Name: ${employeeData.spouseDetails.fullName || 'N/A'}`, 20, 35);
//       pdf.text(`NIC: ${employeeData.spouseDetails.nicNumber || 'N/A'}`, 20, 40);
//       pdf.text(`Date of Birth: ${employeeData.spouseDetails.dateOfBirth ? new Date(employeeData.spouseDetails.dateOfBirth).toLocaleDateString() : 'N/A'}`, 20, 45);
//       pdf.text(`Contact Number: ${employeeData.spouseDetails.contactNumber || 'N/A'}`, 20, 50);
//       pdf.text(`Work Place: ${employeeData.spouseDetails.workPlaceAddress || 'N/A'}`, 20, 55);
//     }
    
//     // Academic Details
//     if (employeeData.academicDetails) {
//       const nextY = employeeData.spouseDetails && Object.keys(employeeData.spouseDetails).length > 0 ? 70 : 20;
//       pdf.setFont(undefined, 'bold');
//       pdf.text('Academic Details', 20, nextY);
//       pdf.setFont(undefined, 'normal');
//       pdf.text(`School: ${employeeData.academicDetails.schoolName || 'N/A'}`, 20, nextY + 10);
//       pdf.text(`School Leaving Year: ${employeeData.academicDetails.schoolLeavingYear || 'N/A'}`, 20, nextY + 15);
//       pdf.text(`School Leaving Grade: ${employeeData.academicDetails.schoolLeavingGrade || 'N/A'}`, 20, nextY + 20);
      
//       // Add exam results if available
//       if (employeeData.academicDetails.examResults && employeeData.academicDetails.examResults.length > 0) {
//         pdf.setFont(undefined, 'bold');
//         pdf.text('Exam Results', 20, nextY + 30);
//         pdf.setFont(undefined, 'normal');
        
//         let yOffset = nextY + 40;
//         employeeData.academicDetails.examResults.forEach((exam, index) => {
//           pdf.text(`${index + 1}. ${exam.examType || 'Exam'} (${exam.attemptYear || 'N/A'})`, 20, yOffset);
//           yOffset += 5;
          
//           if (exam.subjectTable && exam.subjectTable.length > 0) {
//             exam.subjectTable.forEach((subject) => {
//               pdf.text(`   - ${subject.subjectName || 'Subject'}: ${subject.subjectResults || 'N/A'}`, 30, yOffset);
//               yOffset += 5;
//             });
//           }
//           yOffset += 5;
//         });
//       }
//     }
    
//     // Dependent Details
//     if (employeeData.dependentDetails && employeeData.dependentDetails.length > 0) {
//       pdf.addPage();
//       pdf.setFont(undefined, 'bold');
//       pdf.text('Dependent Details', 20, 20);
//       pdf.setFont(undefined, 'normal');
      
//       let yOffset = 30;
//       employeeData.dependentDetails.forEach((dependent, index) => {
//         pdf.text(`Dependent ${index + 1}: ${dependent.dependentFullName || 'N/A'}`, 20, yOffset);
//         pdf.text(`Gender: ${dependent.dependentGender || 'N/A'}`, 30, yOffset + 5);
//         pdf.text(`Date of Birth: ${dependent.dependentDateOfBirth ? new Date(dependent.dependentDateOfBirth).toLocaleDateString() : 'N/A'}`, 30, yOffset + 10);
//         pdf.text(`Occupation: ${dependent.dependentOccupation || 'N/A'}`, 30, yOffset + 15);
//         pdf.text(`Occupation Address: ${dependent.occupationAddress || 'N/A'}`, 30, yOffset + 20);
//         yOffset += 30;
        
//         // Add a new page if we're running out of space
//         if (yOffset > 250 && index < employeeData.dependentDetails.length - 1) {
//           pdf.addPage();
//           yOffset = 20;
//         }
//       });
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
        
        // Employee ID bar
        pdf.setFillColor(240, 240, 240);
        pdf.rect(margin.left, currentY - 5, 173, 8, 'F');
        pdf.setFontSize(styles.normal.fontSize);
        pdf.setFont(undefined, 'bold');
        pdf.text(`EPF Number: ${employeeData.epfNumber || 'N/A'}`, margin.left + 2, currentY);
        currentY += lineHeight * 1.5;
        
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

            pdf.setFont(undefined, 'bold');
            pdf.text('Religion:', col1, currentY);
            pdf.setFont(undefined, 'normal');
            pdf.text(String(employeeData.religion || 'N/A'), col1 + labelWidth, currentY);
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
checkPageSpace();
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
  currentY += lineHeight;
} else {
  pdf.setFont(undefined, 'bold');
  pdf.text('Contact Information:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text('No contact details available', margin.left + labelWidth, currentY);
  currentY += lineHeight;
}

// 3. EMPLOYMENT DETAILS SECTION
checkPageSpace();
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
  
  // Calculate how many rows we need (maximum of permanent or temporary count)
  const rowCount = Math.max(permanentAddresses.length, temporaryAddresses.length);
  
  // Loop through and display addresses side by side
  for (let i = 0; i < rowCount; i++) {
    checkPageSpace();
    
    // Left column - Permanent
    if (i < permanentAddresses.length) {
      const pAddr = permanentAddresses[i];
      pdf.text(`Location: ${pAddr.location || 'N/A'}`, col1 + 5, currentY);
      currentY += lineHeight - 2;
      pdf.text(`Function: ${pAddr.function || 'N/A'}`, col1 + 5, currentY);
      currentY += lineHeight - 2;
      pdf.text(`Sub-Function: ${pAddr.subFunction || 'N/A'}`, col1 + 5, currentY);
      
      // If we have more permanent addresses, add a separator
      if (i < permanentAddresses.length - 1) {
        currentY += lineHeight - 2;
        pdf.setDrawColor(200, 200, 200);
        pdf.line(col1 + 5, currentY, col1 + colWidth - 5, currentY);
      }
    }
    
    // Reset Y position to start of this entry
    const entryStartY = currentY - (lineHeight * 2 - 4); 
    
    // Right column - Temporary
    if (i < temporaryAddresses.length) {
      const tAddr = temporaryAddresses[i];
      pdf.text(`Location: ${tAddr.location || 'N/A'}`, col2 + 5, entryStartY);
      pdf.text(`Function: ${tAddr.function || 'N/A'}`, col2 + 5, entryStartY + lineHeight - 2);
      pdf.text(`Sub-Function: ${tAddr.subFunction || 'N/A'}`, col2 + 5, entryStartY + lineHeight * 2 - 4);
      
      // If we have more temporary addresses, add a separator
      if (i < temporaryAddresses.length - 1) {
        pdf.setDrawColor(200, 200, 200);
        pdf.line(col2 + 5, entryStartY + lineHeight * 3 - 6, col2 + colWidth - 5, entryStartY + lineHeight * 3 - 6);
      }
    }
    
    // Advance to the next set of addresses
    currentY += lineHeight;
  }
  
  currentY += lineHeight * 2; 
}
      
     // Promotion history
if (employment.promotions && employment.promotions.length > 0) {
  checkPageSpace();
  pdf.setFont(undefined, 'bold');
  pdf.text('Promotion History:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  currentY += lineHeight;
  
  // Table header for promotions
  pdf.setFillColor(235, 235, 235);
  pdf.rect(margin.left, currentY - 5, 175, 7, 'F');
  pdf.setFont(undefined, 'bold');
  
  pdf.text('Grade', margin.left + 2, currentY);
  pdf.text('Designation', margin.left + 20, currentY);
  pdf.text('From', margin.left + 47, currentY);
  pdf.text('To', margin.left + 69, currentY);
  pdf.text('Location', margin.left + 91, currentY);
  pdf.text('Function', margin.left + 117, currentY);
  pdf.text('Sub-Function', margin.left + 147, currentY);
  pdf.setFont(undefined, 'normal');
  currentY += lineHeight;
  
  employment.promotions.forEach((promotion) => {
    checkPageSpace(10);
    
    // All details in one line
    pdf.text(promotion.grade || '', margin.left + 2, currentY);
    pdf.text(promotion.designation || '', margin.left + 20, currentY);
    
    pdf.text(formatDate(promotion.durationFrom), margin.left + 47, currentY);
    pdf.text(formatDate(promotion.durationTo), margin.left + 69, currentY);
    pdf.text(promotion.location || '', margin.left + 91, currentY);
    pdf.text(promotion.function || '', margin.left + 117, currentY);
    pdf.text(promotion.subFunction || '', margin.left + 147, currentY);
    
    // Add divider line and spacing
    currentY += lineHeight;
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin.left + 5, currentY, margin.left + 300, currentY);
    pdf.setDrawColor(0, 0, 0);
    currentY += lineHeight * 0.5;
  });
}
      
    } else {
      addField('Employment Information', 'No employment details available');
    }
    
    // 4. SPOUSE DETAILS SECTION - Only if available
if (employeeData.spouseDetails && Object.keys(employeeData.spouseDetails).length > 0) {
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
  
  // pdf.setFont(undefined, 'bold');
  // pdf.text('Title:', margin.left, currentY);
  // pdf.setFont(undefined, 'normal');
  // pdf.text(String(spouse.title || 'N/A'), margin.left + labelWidth, currentY);
  // currentY += lineHeight;
  
  // pdf.setFont(undefined, 'bold');
  // pdf.text('Name with Initials:', margin.left, currentY);
  // pdf.setFont(undefined, 'normal');
  // pdf.text(String(spouse.nameWithInitials || 'N/A'), margin.left + labelWidth, currentY);
  // currentY += lineHeight;
  
  // pdf.setFont(undefined, 'bold');
  // pdf.text('Full Name:', margin.left, currentY);
  // pdf.setFont(undefined, 'normal');
  // pdf.text(String(spouse.fullName || 'N/A'), margin.left + labelWidth, currentY);
  // currentY += lineHeight;
  
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

// 5/6. ACADEMIC DETAILS SECTION (number depends on whether spouse details exist)
checkPageSpace();
const academicSectionNumber = employeeData.spouseDetails && Object.keys(employeeData.spouseDetails).length > 0 ? '5' : '4';
addSectionHeader(`${academicSectionNumber}. ACADEMIC DETAILS`);

if (employeeData.academicDetails) {
  const academic = employeeData.academicDetails;
  const labelWidth = 65;
  
  pdf.setFont(undefined, 'bold');
  pdf.text('School:', margin.left, currentY);
  pdf.setFont(undefined, 'normal');
  pdf.text(String(academic.schoolName || 'N/A'), margin.left + labelWidth, currentY);
  currentY += lineHeight;
  
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
          pdf.text(`${index + 1}. ${exam.examType || 'Exam'} (Year: ${exam.attemptYear || 'N/A'}, Attempt: ${exam.attempt || 'N/A'})`, margin.left + 5, currentY);
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
    
    // 6/7. DEPENDENT DETAILS SECTION (number depends on whether spouse details exist)
    const dependentSectionNumber = 
      (employeeData.spouseDetails && Object.keys(employeeData.spouseDetails).length > 0) ? '6' : '5';
    
    if (employeeData.dependentDetails && employeeData.dependentDetails.length > 0) {
      checkPageSpace();
      addSectionHeader(`${dependentSectionNumber}. DEPENDENT DETAILS`);
      
      // Display number of dependents
      pdf.text(`Total Number of Dependents: ${employeeData.numberOfDependents || employeeData.dependentDetails.length}`, margin.left, currentY);
      currentY += lineHeight * 1.5;
      
      employeeData.dependentDetails.forEach((dependent, index) => {
        checkPageSpace(30);
        pdf.setFillColor(240, 240, 240);
        pdf.rect(margin.left, currentY - 5, 170, 7, 'F');
        pdf.setFont(undefined, 'bold');
        pdf.text(`Dependent ${index + 1}: ${dependent.dependentFullName || 'N/A'}`, margin.left + 5, currentY);
        pdf.setFont(undefined, 'normal');
        currentY += lineHeight;
        
        addField('Gender', dependent.dependentGender, 10);
        addField('Date of Birth', formatDate(dependent.dependentDateOfBirth), 10);
        addField('Occupation', dependent.dependentOccupation, 10);
        addField('Occupation Address', dependent.occupationAddress, 10);
        currentY += lineHeight * 0.5;
      });
    }
    
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