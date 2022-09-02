import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Nav } from "./components";
import { Login, Signup, Profile, Home } from "./pages";
import ProtectedRoute from "./routing/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Nav />
      <main className="container content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/user-profile" element={<Profile />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
