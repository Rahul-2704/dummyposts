import React from "react";
import { useState, useEffect } from "react";
import { CardComponent } from "../components/Card.tsx";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const Posts = () => {
  let [posts, setPosts] = useState<Post[]>([]);

  useEffect<Post>(() => {
    document.title = "Posts";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", "Get the All Posts here");
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <main>
      {/* Header Part */}
      <header className="p-4 ml-4">
        <h2 className="font-bold text-4xl border-b-2 border-black-800 text-gray-900">
          Posts
        </h2>
      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {posts.map((post) => (
          <CardComponent
            key={post.id}
            userId={post.userId}
            id={post.id}
            title={post.title}
            body={post.body}
          />
        ))}
      </section>
    </main>
  );
};
