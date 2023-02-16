import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./Components/landingpage/homepage";
import Login from "./Components/landingpage/login";
import Signup from "./Components/landingpage/signup";
import Navbar from './Components/Navbar/Navbar';
import Services from "./Components/landingpage/services";
import NoteState from "./context/notes/NoteState";


function App() {
  return (
    <>
    <NoteState>
    <Router>
    <Navbar />
      <Routes>
        <Route path="/homepage" element={<Homepage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signup" element={<Navbar/>}/>
        <Route path="/services" element={<Services/>}/>
      </Routes>
    </Router>
    </NoteState>
      {/* <Navbar /> */}
    </>
  );
}

export default App;
