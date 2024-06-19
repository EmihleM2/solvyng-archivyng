import { Link } from "react-router-dom";
import NavBar from "../pages/Navbar.jsx";

import {
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useState } from "react";
import useMutation from "../../hooks/useMutation";
import useQuery from "../../hooks/useQuery";
import axiosClient from "../../config/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ErrorText = ({ children, ...props }) => (
  <p className="text-lg text-red-300" {...props}>
    {children}
  </p>
);

export function Dashboard() {
  const [uploadProgress, setUploadProgress] = useState(0);

  // const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];
  const URL = "/images";

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


  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
  } = useMutation({ url: URL, onUploadProgress: setUploadProgress });

  const [refetch, setRefetch] = useState(0);
  const [error, setError] = useState("");
  const {
    data,
    isLoading: imagesLoading,
    error: fetchError,
  } = useQuery(URL, refetch);

  const imageUrls = Array.isArray(data) ? data : [];

  const handleUpload = async (e) => {
    console.log(e);
    const file = e.target.files[0];
    console.log(file);

    // if (!validFileTypes.find((type) => type === file.type)) {
    //   setError("File must be in JPG/PNG format");
    //   return;
    // }

    const form = new FormData();
    form.append("image", file);

    try {
      await uploadImage(form);
      toast.success("File uploaded successfully", {
        position: "bottom-right",
        autoClose: 4000,
      });
      setRefetch((prevRefetch) => prevRefetch + 1);
    } catch (error) {
      console.error(error);
      toast.error("Error uploading file", {
        position: "bottom-right",
        autoClose: 4000,
      });
    }
  };

  return (
    <>
      <NavBar />
      {/* <ToastContainer /> */}
      <TooltipProvider>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          {/* Upload Starts here*/}

          <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              {/* <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 text-white">
                  <Card
                    x-chunk="dashboard-01-chunk-0"
                    style={{ backgroundColor: "#003366", color: "#ffffff" }}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Videos
                      </CardTitle>
                      <VideoIcon className="h-4 w-4 text-muted-foreground text-white" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-semibold">350</div>
                    </CardContent>
                  </Card>
                  <Card
                    x-chunk="dashboard-01-chunk-1"
                    style={{ backgroundColor: "#003366", color: "#ffffff" }}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Audios
                      </CardTitle>
                      <AudioLines className="h-4 w-4 text-muted-foreground text-white" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-semibold">150</div>
                    </CardContent>
                  </Card>
                  <Card
                    className="text-white"
                    x-chunk="dashboard-01-chunk-2"
                    style={{ backgroundColor: "#003366", color: "#ffffff" }}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Documents
                      </CardTitle>
                      <File className="h-4 w-4 text-muted-foreground text-white" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1000</div>
                    </CardContent>
                  </Card>
                  <Card
                    x-chunk="dashboard-01-chunk-3"
                    style={{ backgroundColor: "#003366", color: "#ffffff" }}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Photos
                      </CardTitle>
                      <CameraIcon className="h-4 w-4 text-muted-foreground text-white" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">65</div>
                    </CardContent>
                  </Card>
                </div> */}
              <Tabs defaultValue="week">
                <TabsContent value="week">
                  <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="flex flex-row items-center px-7 ">
                      <CardTitle>Recent Uploads</CardTitle>
                      <Button
                        variant="teal"
                        asChild
                        size="sm"
                        className="ml-auto gap-1"
                      >
                        <Link to="/files">
                          View All
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                              <span className="sr-only">img</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="hidden md:table-cell">
                              Options
                            </TableHead>
                            <TableHead>
                              <span className="sr-only">Actions</span>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {imageUrls?.length > 0 ? (
                            imageUrls.map((url) => (
                              <TableRow key={url}>
                                <TableCell className="hidden sm:table-cell">
                                  <img
                                    className="aspect-square rounded-md object-cover"
                                    src={url}
                                    width="64"
                                    height="64"
                                  />
                                </TableCell>
                                <TableCell className="font-medium">
                                  {url.split("/").pop().split("?")[0]}{" "}
                                </TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        aria-haspopup="true"
                                        size="icon"
                                        className="bg-transparent hover:bg-transparent"
                                      >
                                        <MoreHorizontal className="h-4 w-4 text-black" />
                                        <span className="sr-only">
                                          Toggle menu
                                        </span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>
                                        Actions
                                      </DropdownMenuLabel>
                                      <DropdownMenuItem>Edit</DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleDelete(
                                            url.split("/").pop().split("?")[0]
                                          )
                                        }
                                      >
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell className="hidden sm:table-cell">
                                <img
                                  alt="Dummy img"
                                  className="aspect-square rounded-md object-cover"
                                  src="https://placehold.co/600x400" // Replace with your dummy image path
                                  width="64"
                                  height="64"
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                No files
                              </TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            <div
              className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-30vh md:h-90vh"
              x-chunk="dashboard-02-chunk-1"
            >
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  Upload your files here
                </h3>
                <p className="text-sm text-muted-foreground">
                  You can drag and drop your files.
                </p>
                <input
                  id="imageInput"
                  type="file"
                  className="hidden"
                  onChange={handleUpload}
                />
                <label
                  htmlFor="imageInput"
                  variant="teal"
                  className="mt-4 cursor-pointer isLoading={uploading} h-9 rounded-md px-3 inline-block text-primary-foreground hover:bg-primary/90 text-white py-2"
                  style={{ backgroundColor: "#FFA500" }}
                >
                  Upload
                </label>
                {error && <ErrorText>{error}</ErrorText>}
                {uploadError && <ErrorText>{uploadError}</ErrorText>}
                {uploading && <div>Upload progress: {uploadProgress}%</div>}
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </>
  );
}

export default Dashboard;
