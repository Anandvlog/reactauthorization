import { Link, useNavigate } from "react-router-dom";

const Header = ({ onLogout }: { onLogout: () => void }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
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
              <Link to="/profile" className="hover:text-gray-300">
                Profile
              </Link>
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
