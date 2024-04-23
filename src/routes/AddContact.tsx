import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { UserContext } from "../context/ContextProvider";
import { useContext } from "react";
import { ContactParams } from "../typings";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

const AddContact = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState<boolean>(false);
  const { userData } = useContext(UserContext);

  // 1. Define your form.
  const form = useForm<z.infer<typeof requiredForm>>({
    resolver: zodResolver(requiredForm),
    defaultValues: {
      lastname: "",
      firstname: "",
      phone_number: "",
    },
  });

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
      const addContactResponse = await axios.post(
        "http://127.0.0.1:8000/api/v1/contact/create-contact/",
        body,
        { headers: headers }
      );

      if (addContactResponse.status === 201) {
        toast.success("Contact added successfully", {
          autoClose: 2000,
          theme: "light",
        });
        navigate("/contacts/all-contacts");
        form.reset();
      }
    } catch (error: any) {
      const errorBody = error.response.data;
      toast.error(`${errorBody.errors}`, {
        autoClose: 2000,
        theme: "light",
      });
    } finally {
      setDisabled(false);
    }
  }

  return (
    <div className="w-full flex flex-col space-y-4 p-6 lg:py-6 lg:px-56">
      <h2 className="text-3xl self-center text-blue-900">Add Contact</h2>
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={disabled}
            className={`${
              disabled ? "bg-gray-500" : "bg-blue-900"
            } text-white py-2 rounded-md items-center justify-center`}
          >
            Done
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
