import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../context/ContextProvider";
import { useContext } from "react";

const deleteContact = () => {
  const { userData } = useContext(UserContext);

  const queryClient = useQueryClient();

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${userData.token}`,
  };

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/v1/contact/delete-contact/${id}/`,
        { headers: headers }
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch the contacts query after a successful deletion
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: (error) => {
      // Handle the error case
      toast.error(`${error}`, {
        autoClose: 2000,
        theme: "light",
      });
    },
  });

  return mutation.mutate;
};

export default deleteContact;
