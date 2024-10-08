import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const WithoutQuery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <h1 className="text-3xl text-center my-8 font-bold text-gray-400">
        Loading...
      </h1>
    );
  }
  if (error) {
    return (
      <h1 className="text-3xl text-center my-8 font-bold text-gray-400">
        Error: {error.message}
      </h1>
    );
  }

  return (
    <div className="m-4 max-w-[600px] w-4/5 mx-auto">
      <div className="text-center">
        <Link to="/withQuery">
          <button className="py-2 px-5 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75 text-center">
            With Query
          </button>
        </Link>
      </div>
      <h1 className="text-3xl text-center my-8 font-bold text-gray-400">
        Posts Data
      </h1>
      {data.map((post) => (
        <div
          key={post.id}
          className="p-4 rounded-lg border border-gray-200 my-6 cursor-pointer hover:bg-gray-900"
        >
          <h2 className="font-bold text-lg mb-2 text-gray-400">{post.title}</h2>
          <p className="text-gray-400">{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default WithoutQuery;
