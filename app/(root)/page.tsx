"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useEffect } from "react";

const page = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   const token = false
  //   if (token) {
  //     router.push("/");
  //   }else{
  //     router.push("/auth/register");
  //     }
  // }, [router]);

  return (
    <div>
      <Link className="underline" href={"/content"}>
        click content
      </Link>
    </div>
  );
};

export default page;
