import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserContext } from "../context/ContextProvider";
import { useContext } from "react";
import { toast } from "react-toastify";
import { UserResponse } from "../typings";

const fetchContactId = async (userData: UserResponse, id: string) => {
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${userData.token}`,
  };

  try {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/v1/contact/retrieve-contact/${id}/`,
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

const useContactId = (id: string) => {
  const { userData } = useContext(UserContext);
  return useQuery({
    queryKey: ["contacts"],
    queryFn: () => fetchContactId(userData, id),
  });
};

export default useContactId;
