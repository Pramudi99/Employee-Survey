import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Typography,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const AcademicDetails = ({ setAcademicDetails }) => {
  const [formData, setFormData] = useState({
    schoolLeavingYear: "",
    schoolLeavingGrade: "",
    schoolName: "",
    examResults: [
      {
        indexNumber: "",
        examType: "",
        attemptYear: "",
        attempt: "",
        academicDetailsId: 0,
        subjectTable: [
          {
            subjectName: "",
            subjectResults: "",
          },
        ],
      },
    ],
  });

  useEffect(() => {
    setAcademicDetails(formData);
  }, [formData, setAcademicDetails]);

  const handleChange = (e, field, examIndex = null, subjectIndex = null) => {
    const { value } = e.target;
    let updatedFormData = { ...formData };

    if (examIndex !== null) {
      if (subjectIndex !== null) {
        updatedFormData.examResults[examIndex].subjectTable[subjectIndex][field] = value;
      } else {
        updatedFormData.examResults[examIndex][field] = value;
      }
    } else {
      updatedFormData[field] = value;
    }

    setFormData({ ...updatedFormData });
  };

  const addExam = () => {
    setFormData({
      ...formData,
      examResults: [
        ...formData.examResults,
        {
          indexNumber: "",
          examType: "",
          attemptYear: "",
          attempt: "",
          academicDetailsId: 0,
          subjectTable: [{ subjectName: "", subjectResults: "" }],
        },
      ],
    });
  };

  const removeExam = (index) => {
    const updatedExams = formData.examResults.filter((_, i) => i !== index);
    setFormData({ ...formData, examResults: updatedExams });
  };

  const addSubject = (examIndex) => {
    const updatedExams = [...formData.examResults];
    updatedExams[examIndex].subjectTable.push({ subjectName: "", subjectResults: "" });
    setFormData({ ...formData, examResults: updatedExams });
  };

  const removeSubject = (examIndex, subjectIndex) => {
    const updatedExams = [...formData.examResults];
    updatedExams[examIndex].subjectTable = updatedExams[examIndex].subjectTable.filter((_, i) => i !== subjectIndex);
    setFormData({ ...formData, examResults: updatedExams });
  };

  const isLastSubjectFilled = (examIndex) => {
    const lastExam = formData.examResults[examIndex]; 
    if (!lastExam || lastExam.subjectTable.length === 0) return false;
  
    const lastSubject = lastExam.subjectTable[lastExam.subjectTable.length - 1];
    return lastSubject.subjectName.trim() !== "" && lastSubject.subjectResults.trim() !== "";
  };
  

  return (
    
        <Grid container spacing={2}>
       <Typography sx={{ ml: 2, mt: 4 }} variant="h4" gutterBottom style={{ fontWeight:"bold", color:"rgb(129, 43, 57)", fontFamily: 'Roboto, sans-serif', textAlign:'left'}}>
        Academic Qualification 
        </Typography>

      <Grid item xs={11.7} container spacing={1} sx={{ ml: 1 }}>
        

        <Grid item xs={6}>
          <TextField label="School Leaving Year"  fullWidth value={formData.schoolLeavingYear} onChange={(e) => handleChange(e, "schoolLeavingYear")} required/>
        </Grid>
        <Grid item xs={6}>
          <TextField label="School Leaving Grade" fullWidth value={formData.schoolLeavingGrade} onChange={(e) => handleChange(e, "schoolLeavingGrade")} required />
        </Grid>
        <Grid item xs={12}>
          <TextField label="School Name" fullWidth value={formData.schoolName} onChange={(e) => handleChange(e, "schoolName")} required/>
        </Grid>
        
        


        <Grid item xs={12} container spacing={2} sx={{ mt: 2}}>
        {formData.examResults.map((exam, examIndex) => (
          <React.Fragment key={examIndex}>
            
            <Grid item xs={3} >
              <TextField label="Exam Type" fullWidth value={exam.examType} onChange={(e) => handleChange(e, "examType", examIndex)} />
            </Grid>

           
            <Grid item xs={3} >
              <TextField label="Index Number" fullWidth value={exam.indexNumber} onChange={(e) => handleChange(e, "indexNumber", examIndex)} />
            </Grid>
            {/* <Grid item xs={3}>
              <TextField label="Exam Type" fullWidth value={exam.examType} onChange={(e) => handleChange(e, "examType", examIndex)} />
            </Grid> */}
            <Grid item xs={3}>
              <TextField label="Attempt Year" type="number" fullWidth value={exam.attemptYear} onChange={(e) => handleChange(e, "attemptYear", examIndex)} />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Attempt" type="number" fullWidth value={exam.attempt} onChange={(e) => handleChange(e, "attempt", examIndex)} />
            </Grid>
            


            {exam.subjectTable.map((subject, subjectIndex) => (
              <React.Fragment key={subjectIndex}>
                <Grid item xs={5}>
                  <TextField label="Subject Name" fullWidth value={subject.subjectName} onChange={(e) => handleChange(e, "subjectName", examIndex, subjectIndex)} />
                </Grid>
                <Grid item xs={5}>
                  <TextField label="Subject Results" fullWidth value={subject.subjectResults} onChange={(e) => handleChange(e, "subjectResults", examIndex, subjectIndex)} />
                </Grid>
                <Grid item xs={2}>
                <IconButton onClick={() => addSubject(examIndex)} disabled={!isLastSubjectFilled(examIndex)}> <Add /></IconButton>

                {formData.examResults[examIndex]?.subjectTable?.length > 1 && (
                  <IconButton onClick={() => removeSubject(examIndex, subjectIndex)}><Delete /></IconButton>
                )}
                </Grid>
              </React.Fragment>
            ))}
            
            <Grid item xs={12} sm={6}>
              {/* <Button onClick={() => addSubject(examIndex)} startIcon={<Add />}></Button> */}
              {formData.examResults.length > 1 && (
              <Button onClick={() => removeExam(examIndex)} startIcon={<Delete />} color="error">Remove Exam</Button>
              )}
              </Grid>
          </React.Fragment>
        ))}
        
        <Grid item xs={12} sm={2}>
          <Button onClick={addExam} startIcon={<Add />} variant="text" color="primary">Add Exam</Button>
        </Grid>
      </Grid>
      </Grid>
    
    </Grid>
  );
};

export default AcademicDetails;
