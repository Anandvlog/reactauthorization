import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(6).required("Password is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const apiUrl =
    import.meta.env.VITE_API_URL
      ? `${import.meta.env.VITE_API_URL}/auth/login`
      : "https://api.escuelajs.co/api/v1/auth/login";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {

    try {
      const res = await axios.post(apiUrl, data);
      localStorage.setItem("token", JSON.stringify(res.data.access_token));
      onLogin();
      navigate("/");
      alert("Login Successful");
      reset();
    } catch (error) {
      console.log("error", error);

      alert("Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {/* Email */}
        <div className="mb-4">
          <div className="flex items-baseline gap-1 mb-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <span className="text-red-500">*</span>
          </div>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1 mb-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <span className="text-red-500">*</span>
          </div>

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter password"
            {...register("password")}
          />

          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Button */}
        <div className="flex items-center justify-between">
          <button
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;