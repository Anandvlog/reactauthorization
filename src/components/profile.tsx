import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfileData = async () => {
      const profileUrl = import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}/auth/profile`
        : "https://api.escuelajs.co/api/v1/auth/profile";
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
      } finally {
        setLoading(false);
      }
    };

    getProfileData();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <>
      {user && (
        <div>
          <h2>{user?.name || "N/A"}</h2>
          <img alt="user_img" src={user?.avatar || "/default-avatar.png"} />
        </div>
      )}
    </>
  );
};

export default Profile;
