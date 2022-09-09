import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Nav, Edit, FeedBack } from "./components";
import {
  Login,
  Signup,
  Profile,
  Home,
  List,
  Users,
  UserDetails,
} from "./pages";
import ProtectedRoute from "./routing/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Nav />
      <FeedBack />
      <main className="container content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/user-profile" element={<Profile />} />
            <Route path="/list" element={<List />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user-details" element={<UserDetails />} />
            <Route path="/edit" element={<Edit />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
