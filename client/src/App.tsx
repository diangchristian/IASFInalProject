import {  Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import HashDemo from "./pages/HashDemo";
import Signup from "./pages/Signup";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import GuestRoutes from "./routes/GuestRoutes"; 


export default function App() {

  return (
    <Routes>


    <Route element={<GuestRoutes/>}>

        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        
    </Route>
    <Route element={<ProtectedRoutes/>}>
      <Route
          path="/demo"
          element={<HashDemo/>} />

    </Route>

    </Routes>
  );
}
