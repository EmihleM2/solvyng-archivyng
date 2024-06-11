import React, { useState, useEffect } from "react";
import useQuery from "../../hooks/useQuery.js";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import NavBar from "../pages/Navbar.jsx";

const URL = "/images";

const LandingPage = () => {
  const [refetch, setRefetch] = useState(0);

  const {
    data: imageUrls = [],
    isLoading: imagesLoading,
    error: fetchError,
  } = useQuery(URL, refetch);

  return (
    <>
      <NavBar />
      {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-start mt-0 pt-0">
        {imageUrls?.length > 0 &&
          imageUrls.map((url) => (
            <img
              className="rounded-lg mx-auto mt-0 pt-0"
              src={url}
              alt="File"
              key={url}
              width="100"
              height="100"
            />
          ))}
      </div> */}
    </>
  );
};

export default LandingPage;
