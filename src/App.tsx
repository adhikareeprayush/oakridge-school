import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Bottom from "./components/Bottom";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import PricingPage from "./pages/PricingPage";
import Contact from "./pages/Contact";
import FAQPage from "./pages/FAQPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import TeacherDashboard from "./pages/dashboard/TeacherDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import { MockAuthProvider } from "./context/MockAuthProvider";

function AppRoutes() {
  const { pathname } = useLocation();
  const useMarketingChrome = !pathname.startsWith("/dashboard");

  return (
    <div className="App flex min-h-screen flex-col bg-white">
      {useMarketingChrome && <Nav />}
      <main className={useMarketingChrome ? "flex-1" : "min-h-screen flex-1"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      {useMarketingChrome && <Footer />}
      {useMarketingChrome && <Bottom />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MockAuthProvider>
        <AppRoutes />
      </MockAuthProvider>
    </BrowserRouter>
  );
}

export default App;
