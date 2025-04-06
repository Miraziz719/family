import React from "react";
import { mainNews } from "../../api/api";
import Image from "next/image";

interface PageProps {
  params: {
    contentid: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const paramsId = params.contentid;
  const main = mainNews.find((item) => item.id === Number(paramsId));

  if (!main) {
    return <div className="text-center py-10">Yangilik topilmadi</div>;
  }

  return (
    <div className="p-4">
        <Image src={main.image} alt={main.title}/>
      <h1 className="text-2xl font-bold mb-2">{main.title}</h1>
      <p className="text-sm text-gray-500 mb-1">
        {main.location} | {main.time} | {main.date}
      </p>
      <p className="text-base text-gray-700">{main.description}</p>
    </div>
  );
};

export default Page;
