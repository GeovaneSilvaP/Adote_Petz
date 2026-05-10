import { BrowserRouter, Route, Routes } from "react-router-dom";

//pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";

//components
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />}></Route>


        <Route path="/register" element={<Register />}></Route>

        <Route path="/" element={<Home />}></Route> 
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
