import { useEffect } from "react";
import { useNavigate } from "react-router";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (navigate) {
      localStorage.removeItem("user");
      navigate("/");
    }
  }, [navigate]);

  return <div />;
}

export default Logout;
