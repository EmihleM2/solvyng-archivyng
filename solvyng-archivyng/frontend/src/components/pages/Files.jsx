import React, { useState } from "react";
import useQuery from "../../hooks/useQuery.js";
import NavBar from "../pages/Navbar.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CameraIcon } from "lucide-react";

const URL = "/images";

const Files = () => {
  const [refetch] = useState(0);
  const {
    data: imageUrls = [],
    isLoading: imagesLoading,
    error: fetchError,
  } = useQuery(URL, refetch);

  if (imagesLoading) return <div>Loading...</div>;
  if (fetchError) return <div>Error: {fetchError.message}</div>;

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center p-6 pl-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageUrls.length > 0 ? (
            imageUrls.map((url) => (
              <Card key={url} className="rounded-lg shadow-lg">
                <CardHeader>
                  <CardTitle>
                    <CameraIcon className="h-5 w-5" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={url}
                    alt="Uploaded File"
                    className="w-full h-auto"
                  />
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No images found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Files;
