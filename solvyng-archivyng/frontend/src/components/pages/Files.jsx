import React, { useState } from "react";
import useQuery from "../../hooks/useQuery.js";
import NavBar from "../pages/Navbar.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Share2,
  Share2Icon,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";


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
      <div className="flex justify-center items-center p-6 ml-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {
          imageUrls.length > 0 ? (
            imageUrls.map((url) => (
              <Card key={url} className="rounded-lg">
                <CardHeader>
                </CardHeader>
                <CardContent>
                  <img
                    src={url}
                    alt="Uploaded File"
                    className="w-full h-50 aspect-square rounded-md object-cover"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm">{url.split("/").pop().split("?")[0]}</p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          className="bg-transparent hover:bg-transparent"
                        >
                          <MoreVertical className="h-4 w-4 text-black" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleDelete(url.split("/").pop().split("?")[0])
                          }
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
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
