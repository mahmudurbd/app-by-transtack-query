import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const WithQuery = () => {
  const getPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    return res.json();
  };

  const {
    isPending,
    error,
    isError,
    data: posts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: 10000,
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>An error occurred: {error}</div>;

  return (
    <div className="m-4 max-w-[600px] w-4/5 mx-auto">
      <div className="text-center">
        <Link to="/withoutQuery">
          <button className="bg-violet-500 hover:bg-violet-600 focus:ring  focus:ring-opacity-75 rounded-full text-white font-semibold py-2 px-5">
            Without Query
          </button>
        </Link>
      </div>
      <h1 className="text-3xl text-center my-8 font-bold text-gray-400">
        Posts Data
      </h1>
      {posts &&
        posts?.map((post) => (
          <div
            key={post.id}
            className="p-4 rounded-lg border border-gray-200 my-6 cursor-pointer hover:bg-gray-900"
          >
            <h2 className="font-bold text-lg mb-2 text-gray-400">
              {post.title}
            </h2>
            <p className="text-gray-400">{post.body}</p>
          </div>
        ))}
    </div>
  );
};

export default WithQuery;
