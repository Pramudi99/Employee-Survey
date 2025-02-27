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

  return (
    <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
      <Typography variant="h6">Academic Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField label="School Name" fullWidth value={formData.schoolName} onChange={(e) => handleChange(e, "schoolName")} />
        </Grid>
        <Grid item xs={3}>
          <TextField label="School Leaving Year" type="number" fullWidth value={formData.schoolLeavingYear} onChange={(e) => handleChange(e, "schoolLeavingYear")} />
        </Grid>
        <Grid item xs={3}>
          <TextField label="School Leaving Grade" fullWidth value={formData.schoolLeavingGrade} onChange={(e) => handleChange(e, "schoolLeavingGrade")} />
        </Grid>
        {formData.examResults.map((exam, examIndex) => (
          <React.Fragment key={examIndex}>
            <Grid item xs={3}>
              <TextField label="Index Number" fullWidth value={exam.indexNumber} onChange={(e) => handleChange(e, "indexNumber", examIndex)} />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Exam Type" fullWidth value={exam.examType} onChange={(e) => handleChange(e, "examType", examIndex)} />
            </Grid>
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
                  <IconButton onClick={() => removeSubject(examIndex, subjectIndex)}><Delete /></IconButton>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button onClick={() => addSubject(examIndex)} startIcon={<Add />}>Add Subject</Button>
              <Button onClick={() => removeExam(examIndex)} startIcon={<Delete />} color="error">Remove Exam</Button>
            </Grid>
          </React.Fragment>
        ))}
        <Grid item xs={12}>
          <Button onClick={addExam} startIcon={<Add />} variant="contained" color="primary">Add Exam</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AcademicDetails;
