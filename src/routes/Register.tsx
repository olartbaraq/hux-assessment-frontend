import homelogo from "../assets/hux-access.jpeg";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUpResponse, signupUser } from "../typings";

const signUpFormSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be contain @ and .",
    })
    .email({
      message: "Email must contain @ and .",
    }),
  name: z
    .string({
      invalid_type_error: "Name must be a string",
      required_error: "This field is required",
    })
    .min(3, "Minimum 3 characters")
    .max(100, "Maximum 100 characters")
    .trim(),
  password: z.string().min(1, {
    message: "password cannot be empty.",
  }),
});

const requiredForm = signUpFormSchema.required();

const Register = () => {
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState<boolean>(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof requiredForm>>({
    resolver: zodResolver(requiredForm),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof requiredForm>) {
    const body: signupUser = {
      email: values.email,
      password: values.password,
      name: values.name,
    };

    try {
      const registerResponse = await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/register/",
        body
      );
      setDisabled(true);

      if (registerResponse.status === 201) {
        const data: signUpResponse = registerResponse.data;
        //console.log("DATA>>>", data);
        const user = data.data.name;

        //console.log(user);
        toast.success(`${user} registered successfully!!!`, {
          autoClose: 2000,
          theme: "light",
        });
        navigate("/login");
        form.reset();
      } else {
        toast.error("Uh Oh! Something went wrong !!!", {
          autoClose: 2000,
          theme: "light",
        });
      }
    } catch (error: any) {
      const errorBody = error.response.data;
      toast.error(`${errorBody.errors || errorBody.password}`, {
        autoClose: 2000,
        theme: "light",
      });
    }
  }

  return (
    <div className="flex flex-col w-full items-center space-y-10 lg:py-20 lg:px-64">
      <div className="w-full flex items-center space-x-1 mt-10 lg:my-0 justify-center">
        <div>
          <Link to={"/"}>
            <img src={homelogo} alt="hux-home_image" className="w-40 h-40" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col space-y-7 lg:border-slate-200 px-10 py-20 lg:border lg:rounded-md w-full self-center items-center">
        <div className="flex flex-col space-y-0 items-center">
          <p className="text-2xl text-black">Sign Up</p>
          <h5 className="leading-loose text-base">Create an account</h5>
        </div>

        {/* Design form here */}
        <form
          className="w-full flex flex-col space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Email Input */}
          <div className="w-full gap-2 flex flex-col ">
            <label className="text-sm" htmlFor="email">
              Email Address
            </label>
            <input
              type="text"
              placeholder="assessment@gmail.com"
              {...form.register("email")}
              className="border rounded-md p-2 bg-slate-300"
            />
            <p className="text-red-500 text-sm">
              {form.formState.errors.email?.message}
            </p>
          </div>

          {/* Name Input */}
          <div className="w-full gap-2 flex flex-col ">
            <label className="text-sm" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              placeholder="Chukwu Mbah"
              {...form.register("name")}
              className="border rounded-md p-2 bg-slate-300"
            />
            <p className="text-red-500 text-sm">
              {form.formState.errors.email?.message}
            </p>
          </div>

          {/* Password Input */}
          <div className="w-full gap-2 flex flex-col ">
            <label className="text-sm" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              {...form.register("password")}
              className="border rounded-md p-2 bg-slate-300"
            />
            <p className="text-red-500 text-sm">
              {form.formState.errors.password?.message}
            </p>
          </div>

          {/* Forgot Password */}
          <div>
            <h3 className="text-lg leading-relaxed">
              Already have an account?{" "}
              <Link className="text-yellow-500" to={"/login"}>
                Login
              </Link>
            </h3>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={disabled}
            className={`${
              disabled ? "bg-gray-500" : "bg-blue-900"
            } text-white py-2 rounded-md items-center justify-center`}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
