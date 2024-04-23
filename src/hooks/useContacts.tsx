import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserContext } from "../context/ContextProvider";
import { useContext } from "react";
import { toast } from "react-toastify";
import { UserResponse } from "../typings";

const fetchContacts = async (userData: UserResponse) => {
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${userData.token}`,
  };

  try {
    const { data } = await axios.get(
      "http://127.0.0.1:8000/api/v1/contact/list-contacts/",
      { headers: headers }
    );
    //console.log(data);
    return data;
  } catch (error: any) {
    const errorBody = error.response.data;
    console.log(errorBody);
    toast.error(`${errorBody.detail}`, {
      autoClose: 2000,
      theme: "light",
    });
  }
};

const useContacts = () => {
  const { userData } = useContext(UserContext);
  // const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["contacts"],
    queryFn: () => fetchContacts(userData),
    // onSuccess: () => {
    //   // Invalidate any queries that match the "contacts" query key
    //   queryClient.invalidateQueries({ queryKey: ["contacts"] });
    // },
  });
};

export default useContacts;
