import axios from "axios";
import { signOut, getSession } from "next-auth/react";

const API_URL = process.env.API_URL

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Tokenni `useSession` dan olish
axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});

// 🔹 Xatolarni ushlash
axiosInstance.interceptors.response.use(
  (response) => response, // ✅ Agar muvaffaqiyatli bo‘lsa, javobni qaytaramiz
  async (error) => {
    const originalRequest = error.config;

    // 🔺 401 yoki 403 xatolarda sessiyani yangilash
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true; // Qayta so‘rov yuborilmasligi uchun flag qo‘yamiz

      try {
        // 🔹 NextAuth sessiyani yangilash
        await fetch("/api/auth/session", { method: "POST" });

        const session = await getSession(); // Yangilangan sessiyani olish

        if (!session?.accessToken) {
          throw new Error("Sessiya yangilanmadi");
        }

        // 🔹 Yangilangan token bilan so‘rovni qaytadan yuborish
        originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Sessiya yangilash ishlamadi, logout qilinmoqda:", err);
        signOut();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
