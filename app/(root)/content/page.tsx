"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

const Page = () => {
  interface Post {
    id: number;
    title: string;
    body: string;
    published_at: string;
    image?: string | null;
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsRes = await axiosInstance.get<{ results: Post[] }>(
          "/blogs/posts/"
        );
        const imagesRes = await axiosInstance.get<{ results: any[] }>(
          "/blogs/postimages/"
        );

        const postsData = postsRes.data.results;
        const imagesData = imagesRes.data.results;

        const imageMap: Record<number, string> = {};
        imagesData.forEach((img) => {
          imageMap[img.post] = img.image;
        });

        const combinedPosts: Post[] = postsData.map((post) => ({
          ...post,
          image: imageMap[post.id] || null,
        }));

        setPosts(combinedPosts);
        setLoading(false);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  const firstPost = posts[0];
  const otherPosts = posts.slice(1);

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    const time = date.toLocaleTimeString("uz-UZ", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const day = date.toLocaleDateString("uz-UZ");
    return `${time} / ${day}`;
  };

  return (
    <section className="py-10">
      <div className="px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {firstPost && (
              <div className="flex flex-col md:flex-row gap-5 mb-5">
                <div className="w-full md:w-1/2">
                  <div className="text-gray-500 text-sm">
                    {formatDate(firstPost.published_at)}
                  </div>
                  <Link href={`${firstPost.id}`}>
                    <h2 className="text-2xl md:text-3xl font-bold leading-snug hover:text-blue-500 cursor-pointer duration-100 line-clamp-3">
                      {firstPost.title}
                    </h2>
                  </Link>
                  <p className="text-gray-500 text-base leading-relaxed line-clamp-5">
                    {firstPost.body}
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  {firstPost.image ? (
                    <Link href={`${firstPost.id}`}>
                      <Image
                        src={firstPost.image}
                        alt="Post image"
                        width={500}
                        height={300}
                        className="rounded-xl w-full h-auto object-cover"
                      />
                    </Link>
                  ) : (
                    <div className="bg-gray-200 w-full h-48 flex items-center justify-center text-gray-500 text-sm rounded-xl">
                      Rasm yo‘q
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {otherPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`${post.id}`}
                  className="space-y-2 cursor-pointer group block"
                >
                  <div className="overflow-hidden rounded-xl">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={300}
                        height={200}
                        className="object-cover w-full h-[200px]"
                      />
                    ) : (
                      <div className="bg-gray-200 w-full h-[200px] flex items-center justify-center text-gray-500 text-sm rounded-xl">
                        Rasm yo‘q
                      </div>
                    )}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {formatDate(post.published_at)}
                  </div>
                  <h3 className="font-medium text-base leading-snug group-hover:text-blue-500 duration-100">
                    {post.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[350px] space-y-4">
            <h3 className="text-xl font-bold border-b pb-2">So‘nggi yangiliklar</h3>

            {posts.slice(0, 4).map((post) => (
              <Link key={post.id} href={`${post.id}`} className="block border-b pb-2">
                <h4 className="font-medium">{post.title}</h4>
                <span className="text-sm text-gray-500">
                  {formatDate(post.published_at)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
