import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { fetchEmployeeData } from '../services/Api';

// Function to download employee data as PDF
export const downloadEmployeeDataAsPDF = async (epfNumber) => {
  try {
    // 1. Fetch the employee data
    const employeeData = await fetchEmployeeData(epfNumber);
    
    // 2. Generate PDF with the data
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Set title
    pdf.setFontSize(18);
    pdf.text('Employee Personal Details', 20, 20);
    
    // Set regular font size for content
    pdf.setFontSize(12);
    
    // Personal Details section
    pdf.setFont(undefined, 'bold');
    pdf.text('Personal Details', 20, 30);
    pdf.setFont(undefined, 'normal');
    pdf.text(`EPF Number: ${employeeData.epfNumber || 'N/A'}`, 20, 40);
    pdf.text(`Name: ${employeeData.title || ''} ${employeeData.nameWithInitials || 'N/A'}`, 20, 45);
    pdf.text(`Full Name: ${employeeData.fullName || 'N/A'}`, 20, 50);
    pdf.text(`Gender: ${employeeData.gender || 'N/A'}`, 20, 55);
    pdf.text(`Marital Status: ${employeeData.maritalStatus || 'N/A'}`, 20, 60);
    pdf.text(`Date of Birth: ${employeeData.dateOfBirth ? new Date(employeeData.dateOfBirth).toLocaleDateString() : 'N/A'}`, 20, 65);
    pdf.text(`NIC Number: ${employeeData.nicNumber || 'N/A'}`, 20, 70);
    
    // Contact Details section
    if (employeeData.contactDetails && employeeData.contactDetails.length > 0) {
      const contact = employeeData.contactDetails[0];
      pdf.setFont(undefined, 'bold');
      pdf.text('Contact Details', 20, 85);
      pdf.setFont(undefined, 'normal');
      pdf.text(`Permanent Address: ${contact.permanentAddress || 'N/A'}`, 20, 95);
      pdf.text(`Permanent Postal Code: ${contact.permanentPostalCode || 'N/A'}`, 20, 100);
      pdf.text(`Temporary Address: ${contact.temporaryAddress || 'N/A'}`, 20, 105);
      pdf.text(`Telephone Number: ${contact.telephoneNumber || 'N/A'}`, 20, 110);
    }
    
    // Employment Details section
    if (employeeData.employmentDetails) {
      const employment = employeeData.employmentDetails;
      pdf.setFont(undefined, 'bold');
      pdf.text('Employment Details', 20, 125);
      pdf.setFont(undefined, 'normal');
      pdf.text(`Current Position: ${employment.presentDesignation || 'N/A'}`, 20, 135);
      pdf.text(`Current Grade: ${employment.presentGrade || 'N/A'}`, 20, 140);
      pdf.text(`Job Category: ${employment.presentJobCategory || 'N/A'}`, 20, 145);
      
      // Add joined details if available
      if (employment.joinedDetails) {
        pdf.text(`Joined As: ${employment.joinedAs || 'N/A'}`, 20, 155);
        pdf.text(`Joined Date: ${employment.joinedDetails.date ? new Date(employment.joinedDetails.date).toLocaleDateString() : 'N/A'}`, 20, 160);
      }
    }
    
    // Add more sections as needed (spouse details, academic details, etc.)
    if (employeeData.spouseDetails && Object.keys(employeeData.spouseDetails).length > 0) {
      pdf.addPage();
      pdf.setFont(undefined, 'bold');
      pdf.text('Spouse Details', 20, 20);
      pdf.setFont(undefined, 'normal');
      pdf.text(`Name: ${employeeData.spouseDetails.title || ''} ${employeeData.spouseDetails.nameWithInitials || 'N/A'}`, 20, 30);
      pdf.text(`Full Name: ${employeeData.spouseDetails.fullName || 'N/A'}`, 20, 35);
      pdf.text(`NIC: ${employeeData.spouseDetails.nicNumber || 'N/A'}`, 20, 40);
      pdf.text(`Date of Birth: ${employeeData.spouseDetails.dateOfBirth ? new Date(employeeData.spouseDetails.dateOfBirth).toLocaleDateString() : 'N/A'}`, 20, 45);
      pdf.text(`Contact Number: ${employeeData.spouseDetails.contactNumber || 'N/A'}`, 20, 50);
      pdf.text(`Work Place: ${employeeData.spouseDetails.workPlaceAddress || 'N/A'}`, 20, 55);
    }
    
    // Academic Details
    if (employeeData.academicDetails) {
      const nextY = employeeData.spouseDetails && Object.keys(employeeData.spouseDetails).length > 0 ? 70 : 20;
      pdf.setFont(undefined, 'bold');
      pdf.text('Academic Details', 20, nextY);
      pdf.setFont(undefined, 'normal');
      pdf.text(`School: ${employeeData.academicDetails.schoolName || 'N/A'}`, 20, nextY + 10);
      pdf.text(`School Leaving Year: ${employeeData.academicDetails.schoolLeavingYear || 'N/A'}`, 20, nextY + 15);
      pdf.text(`School Leaving Grade: ${employeeData.academicDetails.schoolLeavingGrade || 'N/A'}`, 20, nextY + 20);
      
      // Add exam results if available
      if (employeeData.academicDetails.examResults && employeeData.academicDetails.examResults.length > 0) {
        pdf.setFont(undefined, 'bold');
        pdf.text('Exam Results', 20, nextY + 30);
        pdf.setFont(undefined, 'normal');
        
        let yOffset = nextY + 40;
        employeeData.academicDetails.examResults.forEach((exam, index) => {
          pdf.text(`${index + 1}. ${exam.examType || 'Exam'} (${exam.attemptYear || 'N/A'})`, 20, yOffset);
          yOffset += 5;
          
          if (exam.subjectTable && exam.subjectTable.length > 0) {
            exam.subjectTable.forEach((subject) => {
              pdf.text(`   - ${subject.subjectName || 'Subject'}: ${subject.subjectResults || 'N/A'}`, 30, yOffset);
              yOffset += 5;
            });
          }
          yOffset += 5;
        });
      }
    }
    
    // Dependent Details
    if (employeeData.dependentDetails && employeeData.dependentDetails.length > 0) {
      pdf.addPage();
      pdf.setFont(undefined, 'bold');
      pdf.text('Dependent Details', 20, 20);
      pdf.setFont(undefined, 'normal');
      
      let yOffset = 30;
      employeeData.dependentDetails.forEach((dependent, index) => {
        pdf.text(`Dependent ${index + 1}: ${dependent.dependentFullName || 'N/A'}`, 20, yOffset);
        pdf.text(`Gender: ${dependent.dependentGender || 'N/A'}`, 30, yOffset + 5);
        pdf.text(`Date of Birth: ${dependent.dependentDateOfBirth ? new Date(dependent.dependentDateOfBirth).toLocaleDateString() : 'N/A'}`, 30, yOffset + 10);
        pdf.text(`Occupation: ${dependent.dependentOccupation || 'N/A'}`, 30, yOffset + 15);
        pdf.text(`Occupation Address: ${dependent.occupationAddress || 'N/A'}`, 30, yOffset + 20);
        yOffset += 30;
        
        // Add a new page if we're running out of space
        if (yOffset > 250 && index < employeeData.dependentDetails.length - 1) {
          pdf.addPage();
          yOffset = 20;
        }
      });
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
    
    // 5. Save the PDF
    pdf.save(`Employee_${employeeData.epfNumber || 'Data'}.pdf`);
    
    return { success: true, message: "PDF downloaded successfully!" };
  } catch (error) {
    console.error("❌ Error generating PDF from HTML:", error.message);
    throw new Error("Failed to generate PDF. Please try again later.");
  }
};
