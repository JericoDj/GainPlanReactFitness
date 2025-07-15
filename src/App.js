import { UserContext } from "./context/UserContext";
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProvider from "./context/UserProvider";
import WorkoutProvider from "./context/WorkoutProvider";
import AppNavBar from "./components/AppNavBar";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Workout from "./pages/Workout/Workout";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";




export default function App() {
  function AppRoutes() {


    return (
      <Routes>
        <Route path="/" element={ <Home />} />
   
        {/* <Route path="/products" element={user.isAdmin ? <AdminDashboard /> : <Product />} /> */}
        {/* <Route path="/myOrders" element={<MyOrders />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/workout" element={<Workout/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        {/* <Route path="/adminDashboard" element={<AdminDashboard />} /> */}
        {/* <Route path="/cart" element={<Cart />} /> */}

        {/* <Route path="/profile" element={<Profile />} /> */} 
      </Routes>
    );
  }

  return (
    <UserProvider>
      <WorkoutProvider>
       <div className="app-background d-flex flex-column min-vh-100">
          <Router>
            <AppNavBar />
            <main className="flex-grow-1 py-4">
              {/* <Container> */}
                <AppRoutes />
              {/* </Container> */}
            </main>
            {/* <Footer />  */}
          </Router>
        </div>
      </WorkoutProvider>
    </UserProvider>
  );
}
