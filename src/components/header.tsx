import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ setUser}) => {
  const navigate = useNavigate();
  const profileUrl = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/auth/profile`
    : "https://api.escuelajs.co/api/v1/auth/profile";

  const getProfileData = async () => {
    const token = JSON.parse(localStorage.getItem("token") || "null");

    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.get(profileUrl, header);
      setUser(res.data);
    } catch (error) {
      alert("you are not authorized to access this resource");
      console.log("error", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    alert("Logged out successfully");
    navigate("/");
  };
  return (
    <header>
      <div className="flex  items-center bg-gray-800 py-4  text-white justify-between px-8">
        <h1 className="text-3xl font-bold text-center ">
          {" "}
          React Authorization App
        </h1>
        <nav className="">
          <ul className="flex justify-center space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                    onClick={getProfileData}
                    >
                    Get Profile
        </button>
            </li>
            <li>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md cursor-pointer"
                onClick={handleLogout}
              >
                {localStorage.getItem("token") ? "Log out" : "Login"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
