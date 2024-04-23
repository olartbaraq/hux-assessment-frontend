import { useContext, useEffect } from "react";
import { UserContext } from "../context/ContextProvider";
import { Navigate } from "react-router-dom";
import useContacts from "../hooks/useContacts";
import ContactList from "../components/ContactList";
import useRefetchOnPageReload from "../hooks/useRefetchOnPageReload";

const Contacts = () => {
  const { userData } = useContext(UserContext);
  const { data, isPending, refetch } = useContacts();

  useRefetchOnPageReload(refetch);

  useEffect(() => {
    refetch();
  }, [refetch]);

  //console.log(data);

  //const navigate = useNavigate();

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (userData.isLoggedIn == false) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="w-full">
      <h2 className="text-3xl text-black leading-relaxed self-start">
        Contacts
      </h2>

      <div className="w-full">
        <ContactList contacts={data} />
      </div>
    </div>
  );
};

export default Contacts;
