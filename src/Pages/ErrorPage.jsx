import React from "react";
import { Link, useRouteError } from "react-router";
import Lottie from "lottie-react";
import errorAnimation from "../assets/eror.json";

const ErrorPage = () => {
  const error = useRouteError();
  // console.error(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-base-content p-6">
  
      <div className="w-64 mb-4">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>

      <h1 className="text-4xl font-bold mb-2">Oops! Something went wrong</h1>
      <p className="text-gray-500 mb-6">
        {error?.statusText || "Page not found."}
      </p>

      
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
