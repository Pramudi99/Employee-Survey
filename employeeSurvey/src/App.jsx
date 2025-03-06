// import EmployeeForm from "./components/EmployeeForm/EmployeeForm";
// import EmploymentDetailsForm from "./components/EmployeeForm/EmploymentDetailsForm";

// function App() {
//   return <EmployeeForm />;
// }

// export default App;



import { Box } from "@mui/material";
import EmployeeForm from "./components/EmployeeForm/EmployeeForm";

function App() {
  return (
    <Box
      sx={{
        backgroundColor: "#ebff79", // Light blue background
        minHeight: "100vh", // Full height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
      }}
    >
      <EmployeeForm />
    </Box>
  );
}

export default App;
