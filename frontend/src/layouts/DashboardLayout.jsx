import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function DashboardLayout({ title, children }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
          borderBottom: "1px solid gray",
          paddingBottom: "10px"
        }}
      >
        <h2>{title}</h2>

        <div>
          <span>
            Welcome, {user?.name}
          </span>

          <button
            style={{ marginLeft: "15px" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      {children}
    </div>
  );
}

export default DashboardLayout;