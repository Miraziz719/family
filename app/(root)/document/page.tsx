"use client";

import Link from "next/link";

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/document/personal">
          <div className="border p-6 rounded-2xl transition-all duration-300 hover:shadow-xl flex items-center justify-center text-xl font-bold h-40 cursor-pointer">
            Shaxsiy
          </div>
        </Link>

        <Link href="/document/medical">
          <div className="border p-6 rounded-2xl transition-all duration-300 hover:shadow-xl flex items-center justify-center text-xl font-bold h-40 cursor-pointer">
            Tibbiy
          </div>
        </Link>

        <Link href="/document/other">
          <div className="border p-6 rounded-2xl transition-all duration-300 hover:shadow-xl flex items-center justify-center text-xl font-bold h-40 cursor-pointer">
            Boshqa
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Page;
