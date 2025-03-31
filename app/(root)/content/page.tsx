import Image from "next/image";
import React from "react";
import ContentImg from "../../assets/images/content.jpg";

const Page = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex flex-col md:flex-row gap-5 mb-5">
              <div className="w-full md:w-1/2">
                <div className="text-gray-500 text-sm">
                  Ўзбекистон | 17:09 | 26.03.2025
                </div>
                <h2 className="text-2xl md:text-3xl font-bold leading-snug hover:text-blue-500 cursor-pointer duration-100 line-clamp-3">
                  Dobot Atom nomli robot nonushta tayyorlash, turli hajmdagi
                  yuklarni tashish kabi murakkab vazifalarni uddalashga qodir.
                </h2>
                <p className="text-gray-500 text-base leading-relaxed line-clamp-5">
                  Xitoyning Dobot startapi Atom nomli humanoid robot yordamchini
                  taqdim etdi, deb xabar beradi Kyodo News. Dobot robotning
                  avtonom faoliyatiga oid bir nechta roliklar bilan bo‘lishdi.
                  Unda Atom mustaqil nonushta tayyorlagani, choy quygani, katta
                  hajmli qutilar va hujjatlar solingan papka kabi buyumlarni
                  tashigani tasvirlangan.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <Image
                  src={ContentImg}
                  alt="content"
                  className="rounded-xl w-full h-auto"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <div className="space-y-2 cursor-pointer group">
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={ContentImg}
                    alt="news"
                    className="w-full h-[200px] object-cover"
                  />
                </div>
                <div className="text-gray-500 text-sm">23:34 / 26.03.2025</div>
                <h3 className="font-medium text-base leading-snug group-hover:text-blue-500 duration-100">
                  AQShga ishga yuborishni va’da qilgan shaxslar ushlandi
                </h3>
              </div>

              <div className="space-y-2 cursor-pointer group">
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={ContentImg}
                    alt="news"
                    className="w-full h-[200px] object-cover"
                  />
                </div>
                <div className="text-gray-500 text-sm">23:34 / 26.03.2025</div>
                <h3 className="font-medium text-base leading-snug group-hover:text-blue-500 duration-100">
                  AQShga ishga yuborishni va’da qilgan shaxslar ushlandi
                </h3>
              </div>

              <div className="space-y-2 cursor-pointer group">
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={ContentImg}
                    alt="news"
                    className="w-full h-[200px] object-cover"
                  />
                </div>
                <div className="text-gray-500 text-sm">23:34 / 26.03.2025</div>
                <h3 className="font-medium text-base leading-snug group-hover:text-blue-500 duration-100">
                  AQShga ishga yuborishni va’da qilgan shaxslar ushlandi
                </h3>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[350px] space-y-4">
            <h3 className="text-xl font-bold border-b pb-2">
              So‘nggi yangiliklar
            </h3>

            <div className="border-b pb-2">
              <h4 className="font-medium">
                Yevropa diplomatiyasi rahbari Kaya Kallas O‘zbekistonga keladi
              </h4>
              <span className="text-sm text-gray-500">
                Jahon | 23:50 | 26.03.2025
              </span>
            </div>

            <div className="border-b pb-2">
              <h4 className="font-medium">
                Alyaskada samolyot muzlagan ko‘l ustiga quladı. Uning ichida
                bo‘lgan oila 12 soatdan keyin qutqarildi
              </h4>
              <span className="text-sm text-gray-500">
                Jahon | 23:36 | 26.03.2025
              </span>
            </div>

            <div className="border-b pb-2">
              <h4 className="font-medium">
                AQShga ishga yuborishni va’da qilgan shaxslar ushlandi
              </h4>
              <span className="text-sm text-gray-500">
                Jamiyat | 23:34 | 26.03.2025
              </span>
            </div>

            <div>
              <h4 className="font-medium">
                Braziliya sobiq prezidenti Jair Bolsonaro davlat to‘ntarishiga
                urinish ayblovi bo‘yicha sud qilinadi
              </h4>
              <span className="text-sm text-gray-500">
                Jahon | 22:57 | 26.03.2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
