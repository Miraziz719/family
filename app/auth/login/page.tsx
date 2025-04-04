"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter, redirect } from "next/navigation";
import { signIn, useSession } from "next-auth/react";


interface LoginPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const Login = ({ searchParams }: LoginPageProps) => {
  const [form, setForm] = useState({
    emailOrPhone: "miraziz719@gmail.com",
    password: "sadssaddas",
  });
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const {status} = useSession()
  // const searchParams = useSearchParams();

  let callbackUrl = searchParams.callbackUrl || "/";
  if (Array.isArray(callbackUrl)) {
    callbackUrl = callbackUrl[0]; // birinchi qiymatni olamiz
  }
  // const callbackUrl = searchParams.get("callbackUrl") || "/";
  if(status === 'authenticated') redirect(callbackUrl);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)

    const res = await signIn("credentials", {
      email: form.emailOrPhone,
      password: form.password,
      redirect: false,
    })

    if (res?.error) {
      toast.error(res.error)
    }
    setLoading(false)
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Tizimga kirish
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="emailOrPhone"
            placeholder="Elektron pochta yoki telefon"
            value={form.emailOrPhone}
            onChange={handleChange}
            className="w-full p-3 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Parol"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="flex justify-between items-center w-full text-sm text-gray-600">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 flex justify-center items-center"
          >
            {
              loading 
                ? <Loader2 className="animate-spin" />
                : "Kirish"
              }
          </button>
        </form>
        <div className="flex items-center my-2">
          <div className="w-full border-t border-gray-300"></div>
          <span className="px-2 text-gray-500 whitespace-nowrap">or with</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <button className="flex items-center mb-4 justify-center space-x-2 px-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 48 48"
          >
            <path
              fill="#fbc02d"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#e53935"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4caf50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1565c0"
              d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          <span>Login with Google</span>
        </button>
        <button className="flex items-center justify-center space-x-2 px-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 48 48"
          >
            <path
              fill="#3F51B5"
              d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
            ></path>
            <path
              fill="#FFF"
              d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
            ></path>
          </svg>
          <span>Login with Facebook</span>
        </button>
        <p className="text-center mt-4 text-gray-600">
          Hisobingiz yo‘qmi?{" "}
          <a href="/auth/register" className="text-blue-500 hover:underline">
            Ro‘yxatdan o‘tish
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
