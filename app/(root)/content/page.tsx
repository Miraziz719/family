import Image from "next/image";
import React from "react";
import { mainNews } from "../../api/api";
import Link from "next/link";

const Page = () => {
  const main = mainNews[0];
  const related = mainNews.slice(1);

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Asosiy yangilik */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row gap-5 mb-5">
              <div className="w-full md:w-1/2">
                <div className="text-gray-500 text-sm">
                  {main.location} | {main.time} | {main.date}
                </div>
                <Link href={`${main.id}`} className="text-2xl md:text-3xl font-bold leading-snug hover:text-blue-500 cursor-pointer duration-100 line-clamp-4">
                  {main.title}
                </Link>
                <p className="text-gray-700 text-base leading-relaxed line-clamp-5">
                  {main.description}
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <Image
                  src={main.image}
                  alt="content"
                  className="rounded-xl w-full h-auto"
                />
              </div>
            </div>

            {/* Related news */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {related.map((news, idx) => (
                <Link href={`${news.id}`} key={news.id} className="space-y-2 cursor-pointer group">
                  <div className="overflow-hidden rounded-xl">
                    <Image
                      src={news.image}
                      alt="news"
                      className="w-full h-[200px] object-cover"
                    />
                  </div>
                  <div className="text-gray-500 text-sm">
                    {news.time} / {news.date}
                  </div>
                  <h3 className="font-medium text-base leading-snug group-hover:text-blue-500 duration-100">
                    {news.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar - bu yerda oldingi latestNews qismi bo'lishi mumkin */}
          <div className="w-full lg:w-[350px] space-y-4">
            <h3 className="text-xl font-bold border-b pb-2">
              So‘nggi yangiliklar
            </h3>
            {mainNews.map((item, idx) => (
              <div
                key={item.id}
                className={`border-b pb-2 ${
                  idx === mainNews.length - 1 ? "border-none pb-0" : ""
                }`}
              >
                <h4 className="font-medium">{item.title}</h4>
                <span className="text-sm text-gray-500">
                  {item.location} | {item.time} | {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
