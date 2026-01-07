import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import ProtectedRoutes from "./components/ProtectedRoutes"
import { Home } from "./pages/Home"
import Navigation from "./components/Navigation"
import Register from "./pages/Register"
import PublicRoutes from "./components/PublicRoutes"
import { AuthProvider } from "./context/authContext"
import SuccessPage from './pages/paymentsPages/SuccessPage.jsx'
import FailurePage from './pages/paymentsPages/FailurePage.jsx'
import Default from "./pages/Default.jsx"
import Specializzazioni from "./pages/Specializzazioni.jsx"
import DoctorDetails from "./pages/DoctorDetails.jsx"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Messages from "./pages/Messages.jsx"
import MyFooter from "./components/MyFooter.jsx"


function App() {
  return (
    <>


      <BrowserRouter>
        <AuthProvider>
          <Navigation />
          <Routes>
            {/* ROTTE PUBBLICHE */}

            <Route path="/default" element={
              <PublicRoutes>
                <Default />
              </PublicRoutes>
            } />

            <Route path="/login" element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            } />

            <Route path="/register" element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            } />

            <Route path="/specializzazioni/:specialization" element={
              <PublicRoutes>
                <Specializzazioni />
              </PublicRoutes>
            } />

            <Route path="/doctor/:id" element={
              <PublicRoutes>
                <DoctorDetails />
              </PublicRoutes>
            } />

            <Route path="/payments/success" element={
              <PublicRoutes>
                <SuccessPage />
              </PublicRoutes>
            } />

            <Route path="/payments/cancel" element={
              <PublicRoutes>
                <FailurePage />
              </PublicRoutes>
            } />

            {/* ROTTE PROTETTE */}
            <Route path="/" element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            } />

            <Route path="/messages" element={
              <ProtectedRoutes>
                <Messages />
              </ProtectedRoutes>
            } />

          </Routes>
        </AuthProvider>
      </BrowserRouter>

      <MyFooter />

      <ToastContainer
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        toastStyle={{
          position: 'fixed',      // lo rende fisso sullo schermo
          top: '10%',             // centro verticale
          left: '80%',            // centro orizzontale
          zIndex: 9999            // sopra tutto
        }}
      />
    </>
  )
}

export default App
