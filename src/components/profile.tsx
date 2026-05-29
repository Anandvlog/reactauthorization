import axios from "axios";
import { useState } from "react";

const profile = () => {
    const [user, setUser] = useState<string | null>(null);
    
      console.log("we", user)

    const profileUrl = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/auth/profile`
    : "https://api.escuelajs.co/api/v1/auth/profile";
    
  const getProfileData = async () => {
    const token = JSON.parse(localStorage.getItem("token") || "null");
    console.log("token", token);

    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    

    console.log("header", header);
        try {
    const res = await axios.get(profileUrl, header);
    console.log("profile response", res.data);
    setUser(res.data);
        } catch (error) {
          console.log("error", error);
        }
  };

const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    alert("Logged out successfully");
};

  return (
    <>
      <div>profile</div>
      <div className="flex gap-4 mb-4 ml-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={getProfileData}>Get Profile</button>
        <button className="bg-red-500 text-white py-2 px-4 rounded-md cursor-pointer" onClick={handleLogout}>
          Log out
        </button>
      </div>
    {user &&

      <div>
        <h2>{user?.name || "N/A"}</h2>
        <img alt="user_img" src={user?.avatar || "/default-avatar.png"  } />
      </div>
    }
    
    </>
  );
};

export default profile;
