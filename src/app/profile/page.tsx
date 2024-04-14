"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Profilepage() {
  const [data, setdata] = useState(null);
  const router = useRouter();

  const GetUserData = async () => {
    try {
      const response = await axios.get("/api/users/profile");
      console.log(response);
      setdata(response.data.data._id);
      toast.success("UserData fetched successfully");
    } catch (error) {
      console.log("Error while geting data to display");
      toast.error("Error in Fetching");
    }
  };
  const UserLogout = async () => {
    try {
      const response = await axios.post("/api/users/logout");
      console.log(response.data.message);
      toast.success("logout successfull");
      router.push("/login");
    } catch (error) {
      console.log("Error while logout");
      toast.error("Error in logout user");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-white">Profile Details</h1>
      <Link href={`/profile/${data}`} className="text-white">
        {data}
      </Link>
      <button onClick={GetUserData} className="text-white">
        Get Data
      </button>
      <button onClick={UserLogout} className="text-white">
        Logout
      </button>
    </div>
  );
}

export default Profilepage;
