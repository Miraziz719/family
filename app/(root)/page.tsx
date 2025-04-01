"use client";

import Link from "next/link";

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/content">
          <div className="border p-6 rounded-2xl transition-all duration-300 hover:shadow-xl flex items-center justify-center text-xl font-bold h-40 cursor-pointer">
            Hujjatlar
          </div>
        </Link>

        <Link href="/content">
          <div className="border p-6 rounded-2xl transition-all duration-300 hover:shadow-xl flex items-center justify-center text-xl font-bold h-40 cursor-pointer">
            Yosh onalar uchun
          </div>
        </Link>

        <Link href="/content">
          <div className="border p-6 rounded-2xl transition-all duration-300 hover:shadow-xl flex items-center justify-center text-xl font-bold h-40 cursor-pointer">
            Taomnoma
          </div>
        </Link>

        <Link href="/content">
          <div className="border p-6 rounded-2xl transition-all duration-300 hover:shadow-xl flex items-center justify-center text-xl font-bold h-40 cursor-pointer">
            Birinchi tez tibbiy yordam
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Page;
