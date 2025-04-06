"use client";

import { Ambulance, BookUser, FileIcon, Utensils } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/content">
          <div className="border p-6 rounded-2xl transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2 text-xl text-center font-bold h-40 cursor-pointer">
            <FileIcon size={35} />
            Hujjatlar
          </div>
        </Link>

        <Link href="/content">
          <div className="border p-6 rounded-2xl transition-all duration-300 hover:shadow-xl flex items-center gap-2 justify-center text-center text-xl font-bold h-40 cursor-pointer">
          <BookUser size={35}/>
            Yosh onalar uchun
          </div>
        </Link>

        <Link href="/content">
          <div className="border p-6 rounded-2xl transition-all duration-300 hover:shadow-xl flex items-center gap-2 justify-center text-center text-xl font-bold h-40 cursor-pointer">
          <Utensils size={35} />
            Taomnoma
          </div>
        </Link>

        <Link href="/content">
          <div className="border p-6 rounded-2xl transition-all duration-300 hover:shadow-xl flex items-center gap-2 text-center justify-center text-xl font-bold h-40 cursor-pointer">
            <Ambulance size={35} />
            Birinchi tez tibbiy yordam
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Page;
