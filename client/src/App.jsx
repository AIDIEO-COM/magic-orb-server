import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/users/Users";
import AddUser from "./pages/users/AddUser";
import DefaultLayout from "./layout/DefaultLayout";
import useAuthCheck from "./hooks/useAuthCheck";
import RequireAuth from "./auth/RequireAuth";
import MagicORBUpdate from "./pages/Tools/MagicORB/MagicORBUpdate";
import EditUser from "./pages/users/EditUser";


function App() {

  // authentication checking
  const authChecked = useAuthCheck();

  // states
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
  ) : !authChecked ? <div className='text-center'>Checking authentication....</div> : (

    <Routes>


      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<DefaultLayout><Dashboard /></DefaultLayout>} />

        <Route path="/users" element={<DefaultLayout><Users /></DefaultLayout>} />
        <Route path="/add-user" element={<DefaultLayout><AddUser /></DefaultLayout>} />
        <Route path="/edit-user/:userId" element={<DefaultLayout><EditUser /></DefaultLayout>} />

        <Route path="/tool">
          <Route path="update-magic-orb" element={<DefaultLayout><MagicORBUpdate /></DefaultLayout>} />
        </Route>



      </Route>

      {/* catch all routes */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>

  );
}

export default App;
