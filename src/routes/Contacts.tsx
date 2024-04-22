import { useContext } from "react";
import { UserContext } from "../context/ContextProvider";
import { Navigate, useNavigate } from "react-router-dom";

const Contacts = () => {
  const { userData } = useContext(UserContext);

  //const navigate = useNavigate();

  if (userData.isLoggedIn == false) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <p>{userData.user.email}</p>
    </div>
  );
};

export default Contacts;
