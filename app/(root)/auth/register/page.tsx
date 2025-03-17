"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailOrPhone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Ro‘yxatdan o‘tish ma'lumotlari:", form);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Ro‘yxatdan o‘tish
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="Ism"
            value={form.firstName}
            onChange={handleChange}
            className="w-full p-3 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Familiya"
            value={form.lastName}
            onChange={handleChange}
            className="w-full p-3 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
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
              {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Ro‘yxatdan o‘tish
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Hisobingiz bormi?{" "}
          <a href="/auth/login" className="text-blue-500 hover:underline">
            Kirish
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
