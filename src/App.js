import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import RegisterAdmin from "./pages/RegisterAdmin";
import RegisterLegal from "./pages/RegisterLegal";
import SetPassword from "./pages/SetPassword";
import CompleteProfile from "./pages/CompleteProfile";
import UserDashboard from "./pages/UserDashboard";
import Inicio from "./pages/Inicio";
import PresentDemand from "./pages/PresentDemand";
import UploadDemand from "./pages/UploadDemand";
import TrackDemand from "./pages/TrackDemand";
import UploadDocuments from "./pages/UploadDocuments";
import DemandHelp from "./pages/DemandHelp";
import ViewDemand from "./pages/ViewDemand";
import RespondDemand from "./pages/RespondDemand";
import Layout from "./components/Layout";
import PageTransition from "./components/PageTransition";
import "./global.css";

export default function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<PageTransition><Inicio /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/register-user" element={<PageTransition><RegisterUser /></PageTransition>} />
          <Route path="/register-admin" element={<PageTransition><RegisterAdmin /></PageTransition>} />
          <Route path="/register-legal" element={<PageTransition><RegisterLegal /></PageTransition>} />
          <Route path="/set-password" element={<PageTransition><SetPassword /></PageTransition>} />
          <Route path="/complete-profile" element={<PageTransition><CompleteProfile /></PageTransition>} />
          <Route path="/dashboard" element={<Layout><PageTransition><UserDashboard /></PageTransition></Layout>} />
          <Route path="/present-demand" element={<Layout><PageTransition><PresentDemand /></PageTransition></Layout>} />
          <Route path="/upload-demand" element={<Layout><PageTransition><UploadDemand /></PageTransition></Layout>} />
          <Route path="/track-demand" element={<Layout><PageTransition><TrackDemand /></PageTransition></Layout>} />
          <Route path="/upload-documents" element={<Layout><PageTransition><UploadDocuments /></PageTransition></Layout>} />
          <Route path="/demand-help" element={<Layout><PageTransition><DemandHelp /></PageTransition></Layout>} />
          <Route path="/view-demand" element={<Layout><PageTransition><ViewDemand /></PageTransition></Layout>} />
          <Route path="/respond-demand" element={<Layout><PageTransition><RespondDemand /></PageTransition></Layout>} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}
