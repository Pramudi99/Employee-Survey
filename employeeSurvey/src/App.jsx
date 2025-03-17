



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



// // In your main application file
// import SriLankaAddressAutocomplete from './SriLankaAddressAutocomplete';

// function App() {
//   return (
//     <div className="App">
//       <SriLankaAddressAutocomplete apiKey="YOUR_NEW_API_KEY" />
//     </div>
//   );
// }