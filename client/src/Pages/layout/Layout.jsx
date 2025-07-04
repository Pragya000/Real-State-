import './layout.scss';
import Navbar from "../../components/navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { useContext } from "react";


export function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export function RequireAuth({children}) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <Navigate to="/login" />;

   return children; // ✅ No extra <Navbar /> or <Layout />
}

// /* <Outlet/>  