import React, { useState, useEffect } from "react";
import useQuery from "../../hooks/useQuery.js";
import NavBar from "../pages/Navbar.jsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bookmark, Trash, MoreVertical, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../../config/axios";
import { Input } from "@/components/ui/input";


const URL = "/images";

const Files = () => {
  const [bookmarks, setBookmarks] = useState(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });
  const [refetch, setRefetch] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: imageUrls = [],
    isLoading: imagesLoading,
    error: fetchError,
  } = useQuery(URL, refetch);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const clearBookmarks = () => {
    setBookmarks([]);
    localStorage.setItem("bookmarks", JSON.stringify([]));
  };

  const toggleBookmark = (url) => {
    if (bookmarks.includes(url)) {
      setBookmarks(bookmarks.filter((bookmark) => bookmark !== url));
      toast.info("Bookmark removed", {
        position: "bottom-right",
        autoClose: 4000,
      });
    } else {
      setBookmarks([...bookmarks, url]);
      toast.success("Item bookmarked", {
        position: "bottom-right",
        autoClose: 4000,
      });
    }
  };

  const handleDelete = async (key) => {
    try {
      const response = await axiosClient.delete(`/images/${key}`);
      console.log(response.data);
      toast.success("Image deleted successfully", {
        position: "bottom-right",
        autoClose: 4000,
      });
      setRefetch((prevRefetch) => prevRefetch + 1);
    } catch (error) {
      console.error(error);
      toast.error("Error deleting file", {
        position: "bottom-right",
        autoClose: 4000,
      });
    }
  };

  // Ensure imageUrls is always an array
 const filteredImages = (Array.isArray(imageUrls) ? imageUrls : []).filter(
   (url) => url.toLowerCase().includes(searchTerm.toLowerCase())
 );


  if (imagesLoading) return <div>Loading...</div>;
  if (fetchError) return <div>Error: {fetchError.message}</div>;

  return (
    <>
      <NavBar />
      <ToastContainer />
      <div className="flex justify-center items-center p-6 ml-10">
        <div className="relative w-full md:w-[200px] lg:w-[336px]">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg bg-background pl-8"
          />
        </div>
      </div>
      <div className="flex justify-center items-center p-6 ml-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.length > 0 ? (
            filteredImages.map((url) => (
              <Card key={url} className="rounded-lg">
                <CardHeader></CardHeader>
                <CardContent>
                  <img
                    src={url}
                    alt="Uploaded File"
                    className="w-full h-50 aspect-square rounded-md object-cover"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm">
                      {url.split("/").pop().split("?")[0]}
                    </p>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(url);
                      }}
                    >
                      <Bookmark fill="white" className="h-4 w-4 m-4" />
                    </div>
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
                        <DropdownMenuItem onClick={() => toggleBookmark(url)}>
                          Add bookmark
                        </DropdownMenuItem>
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
            <p>No files found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Files;
