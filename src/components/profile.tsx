const profile = ({user}) => {
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

export default profile;
