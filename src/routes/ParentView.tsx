import { Plus } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ParentView = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
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
  );
};

export default ParentView;
