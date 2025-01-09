import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-6">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <p className="text-2xl md:text-3xl font-semibold mt-4">
          Oops! Page not found.
        </p>
        <p className="mt-2 text-gray-600">
          The page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/posts"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow hover:bg-blue-700 transition duration-300"
        >
          Go Back to Posts
        </Link>
      </div>
    </div>
  );
};
