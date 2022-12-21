import React from "react";
import "./App.css";
import Home from "./pages/home/home";
import TopBar from "./Components/topbar/TopBar";
import Login from "./pages/login/login";
import Register from "./pages/Register/Register";
import Settings from "./pages/Settings/Settings";
import Single from "./pages/Single/Single";
import Write from "./pages/Write/Write";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { userContext } from "./Context/Context";
import Contact from "./pages/Contact/Contact";

function App() {
  const { user } = React.useContext(userContext);

  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />

        <Route path="/login" element={user ? <Home /> : <Login />} />

        <Route path="/write" element={user ? <Write /> : <Register />} />

        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/post/:postID" element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;
export { userContext };
