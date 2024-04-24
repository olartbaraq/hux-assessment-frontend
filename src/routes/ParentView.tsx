import { Plus } from "lucide-react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/ContextProvider";
import { useContext } from "react";

const ParentView = () => {
  const navigate = useNavigate();
  const { setUser, userData } = useContext(UserContext);

  const logoutHandler = () => {
    setUser({
      token: "",
      user: {
        id: "",
        email: "",
        name: "",
      },
      isLoggedIn: false,
    });
    navigate("/login");
  };

  return (
    <div>
      {userData.isLoggedIn ? (
        <div className="w-full flex flex-col items-center py-5 px-4 md:px-20 lg:px-56">
          <div className="w-full flex flex-row justify-between my-8">
            <button
              onClick={logoutHandler}
              className="text-2xl text-red-600 leading-relaxed"
            >
              Logout
            </button>

            {/* Create contact button */}
            <Link to={"/contacts/add-contacts"}>
              <Plus color="green" size={30} />
            </Link>
          </div>
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to="/login" replace />
      )}
    </div>
  );
};

export default ParentView;
