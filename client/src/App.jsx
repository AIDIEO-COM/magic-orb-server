import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/users/Users";
import AddUser from "./pages/users/AddUser";
import DefaultLayout from "./layout/DefaultLayout";


function App() {
  const [loading, setLoading] = useState(true);

  const preloader = document.getElementById("preloader");

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = "none";
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);


  return loading ? (
    <p className=" text-center text-danger">Failed to lead app</p>
  ) : (

    <Routes>


      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      {/* <Route element={<RequireAuth />}> */}
      <Route path="/dashboard" element={<DefaultLayout><Dashboard /></DefaultLayout>} />

      <Route path="/users" element={<DefaultLayout><Users /></DefaultLayout>} />
      <Route path="/add-user" element={<DefaultLayout><AddUser /></DefaultLayout>} />
      {/* </Route> */}

      {/* catch all routes */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>

  );
}

export default App;
