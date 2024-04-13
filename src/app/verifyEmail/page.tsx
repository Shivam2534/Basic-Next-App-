"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

function VerifyEmail() {
  const [token, setToken] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const router = useRouter();

  const verifyEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyEmail", { token });
      console.log("Response from server:", response);
      setIsEmailVerified(true);
      toast.success("Email Verification Successful!! 🥳");
    } catch (error) {
      console.error("Error while Verifying user:", error);
      toast.error("Verification Failed");
    }
  };

  useEffect(() => {
    const token = window.location.search.split("=")[1];
    setToken(token);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-black">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Verify Your Email
        </h2>
        <button
          onClick={verifyEmail}
          className="w-full py-2 px-4 mb-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isEmailVerified ? "Verified" : "verify"}
        </button>
        {isEmailVerified && (
          <div>
            <p className="text-green-600 text-center">
              Email Verification Successful!
            </p>
            <Link
              href="/login"
              className="block text-center mt-4 text-blue-600 underline"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
