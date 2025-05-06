"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: {
    contentid: string;
  };
}

interface Post {
  id: number;
  title: string;
  body: string;
  published_at: string;
  image?: string | null;
}

const Page: React.FC<PageProps> = ({ params }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const contentId = params.contentid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Bitta post
        const postRes = await axiosInstance.get<Post>(
          `/blogs/posts/${contentId}/`
        );

        // 2. Barcha rasm ma'lumotlari
        const imagesRes = await axiosInstance.get<{ results: any[] }>(
          `/blogs/postimages/`
        );

        // 3. Bitta post uchun rasm
        const imageData = imagesRes.data.results.find(
          (img) => img.post === Number(contentId)
        );

        setPost({
          ...postRes.data,
          image: imageData ? imageData.image : null,
        });

        // 4. Barcha postlar
        const allPostsRes = await axiosInstance.get<{ results: Post[] }>(
          "/blogs/posts/"
        );

        // 5. Har bir postga rasm biriktirish
        const imageMap: Record<number, string> = {};
        imagesRes.data.results.forEach((img) => {
          imageMap[img.post] = img.image;
        });

        const combinedPosts = allPostsRes.data.results.map((p) => ({
          ...p,
          image: imageMap[p.id] || null,
        }));

        // Joriy postni chiqarib tashlaymiz
        const filtered = combinedPosts.filter(
          (p) => p.id !== Number(contentId)
        );

        setAllPosts(filtered);
        setLoading(false);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [contentId]);

  if (loading) return <p>Yuklanmoqda...</p>;
  if (!post) return <p>Post topilmadi</p>;

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleString("uz-UZ", {
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="py-10 px-4 w-full">
      {/* Bitta post ko‘rinishi */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-500 text-sm mb-4">
          {formatDate(post.published_at)}
        </p>

        {post.image ? (
          <Image
            src={post.image}
            alt="Post image"
            width={800}
            height={400}
            className="rounded-xl mb-6 w-[80%] h-auto object-cover"
          />
        ) : (
          <div className="bg-gray-200 w-full h-60 flex items-center justify-center text-gray-500 text-sm rounded-xl mb-6">
            Rasm yo‘q
          </div>
        )}

        <p className="text-lg leading-relaxed">{post.body}</p>
      </div>

      {/* Pastki barcha postlar */}
      <h2 className="text-2xl font-semibold mb-4">Boshqa maqolalar</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allPosts.map((p) => (
          <Link
            key={p.id}
            href={`/content/${p.id}`}
            className="block rounded-xl border hover:shadow-md duration-200"
          >
            {p.image ? (
              <Image
                src={p.image}
                alt={p.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-t-xl"
              />
            ) : (
              <div className="bg-gray-200 w-full h-48 flex items-center justify-center text-gray-500 text-sm rounded-t-xl">
                Rasm yo‘q
              </div>
            )}
            <div className="p-4 space-y-1">
              <p className="text-gray-500 text-sm">
                {formatDate(p.published_at)}
              </p>
              <h3 className="font-medium text-base line-clamp-2">{p.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
