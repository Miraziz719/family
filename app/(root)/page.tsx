"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useEffect } from "react";

const page = () => {

  return (
    <div>
      <Link className="underline" href={"/content"}>
        click content
      </Link>
    </div>
  );
};

export default page;
