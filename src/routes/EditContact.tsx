import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { UserContext } from "../context/ContextProvider";
import { useContext } from "react";
import { ContactParams } from "../typings";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useDelete from "../hooks/useDelete";
// import useContactId from "../hooks/useContactId";

const contactFormSchema = z.object({
  lastname: z
    .string({
      invalid_type_error: "Lastname must be a string",
      required_error: "This field is required",
    })
    .min(3, "Minimum 3 characters")
    .max(100, "Maximum 50 characters")
    .trim(),
  firstname: z
    .string({
      invalid_type_error: "Firstname must be a string",
      required_error: "This field is required",
    })
    .min(3, "Minimum 3 characters")
    .max(100, "Maximum 50 characters")
    .trim(),
  phone_number: z
    .string({
      invalid_type_error: "Phone Number must be a string",
      required_error: "This field is required",
    })
    .min(11, "Minimum 11 characters")
    .max(15, "Maximum 15 characters"),
});

const requiredForm = contactFormSchema.required();

const EditContact = () => {
  const { contact_id = "" } = useParams<{ contact_id: string }>();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState<boolean>(false);
  const { userData } = useContext(UserContext);
  //const { data, isPending } = useContactId({ contact_id });

  // 1. Define your form.
  const form = useForm<z.infer<typeof requiredForm>>({
    resolver: zodResolver(requiredForm),
    defaultValues: {
      lastname: "",
      firstname: "",
      phone_number: "",
    },
  });

  // useEffect(() => {
  //   if (data) {
  //     form.reset({
  //       lastname: data.lastname,
  //       firstname: data.firstname,
  //       phone_number: data.phone_number,
  //     });
  //   }
  // }, [data, form]);

  // if (isPending) {
  //   return <div>Loading...</div>;
  // }

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof requiredForm>) {
    setDisabled(true);

    const body: ContactParams = {
      lastname: values.lastname,
      firstname: values.firstname,
      phone_number: values.phone_number,
    };

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${userData.token}`,
    };

    try {
      const addContactResponse = await axios.put(
        `http://127.0.0.1:8000/api/v1/contact/update-contact/${contact_id}/`,
        body,
        { headers: headers }
      );

      if (addContactResponse.status === 200) {
        toast.success("Contact updated successfully", {
          autoClose: 2000,
          theme: "light",
        });
        navigate("/contacts/all-contacts");
      }
    } catch (error: any) {
      const errorBody = error.response.data;
      toast.error(`${errorBody.detail}`, {
        autoClose: 2000,
        theme: "light",
      });
    } finally {
      setDisabled(false);
    }
  }

  const mutate = useDelete();

  const deleteContact = (contact_id: string) => {
    if (contact_id) {
      mutate(contact_id);
      navigate("/contacts/all-contacts");
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4 p-6 lg:py-6 lg:px-56">
      <h2 className="text-3xl self-center text-blue-900">Edit Contact</h2>
      <div>
        <form
          className="w-full flex flex-col space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Lastname Input */}
          <div className="w-full gap-2 flex flex-col ">
            <label className="text-sm" htmlFor="lastname">
              Lastname
            </label>
            <input
              type="text"
              {...form.register("lastname")}
              className="border rounded-md p-2 bg-slate-300"
            />
            <p className="text-red-500 text-sm">
              {form.formState.errors.lastname?.message}
            </p>
          </div>

          {/* Firstname Input */}
          <div className="w-full gap-2 flex flex-col ">
            <label className="text-sm" htmlFor="firstname">
              Firstname
            </label>
            <input
              type="text"
              {...form.register("firstname")}
              className="border rounded-md p-2 bg-slate-300"
            />
            <p className="text-red-500 text-sm">
              {form.formState.errors.firstname?.message}
            </p>
          </div>

          {/* Phone Number Input */}
          <div className="w-full gap-2 flex flex-col ">
            <label className="text-sm" htmlFor="phone_number">
              Phone Number
            </label>
            <input
              type="text"
              {...form.register("phone_number")}
              className="border rounded-md p-2 bg-slate-300"
            />
            <p className="text-red-500 text-sm">
              {form.formState.errors.phone_number?.message}
            </p>
          </div>

          <div className="w-full flex flex-row space-x-5 mt-6">
            {/* Delete button */}
            <div
              onClick={() => deleteContact(contact_id)}
              className="w-full bg-red-700 text-white py-2 flex rounded-md items-center justify-center"
            >
              Delete
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={disabled}
              className={`${
                disabled ? "bg-gray-500" : "bg-blue-900"
              } w-full text-white py-2 rounded-md items-center justify-center`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContact;
