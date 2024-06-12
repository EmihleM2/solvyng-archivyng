import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import axios from "axios";
import { saveTimezone } from "../../hooks/dynamoDb.mjs";


import {
  SquareUser,
  ArrowUpRight,
  File,
  Home,
  ListFilter,
  Package2,
  PanelLeft,
  Search,
  Settings,
  AudioLines,
  Bell,
  CameraIcon,
  Clock,
  Folder,
  Bookmark,
  MoreHorizontal,
  Share2,
  Share2Icon,
  Star,
  VideoIcon,
  UploadCloudIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiUrl =
  "http://api.timezonedb.com/v2.1/list-time-zone?key=2HK8BQKKV4E8&format=json";

export function Navbar() {
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [timezones, setTimezones] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const location = useLocation();
  const userId = "123";

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        // console.log(response.data);
        setTimezones(response.data.zones);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // Empty dependency array means this effect will only run once, when the component mounts

  // Save timezone on DynamoDB
 const handleSaveChanges = async () => {
   if (!selectedTimezone) {
     console.error("Timezone cannot be empty or undefined.");
     return;
   }

   const response = await saveTimezone(userId, selectedTimezone);
   if (response.error) {
     console.error("Failed to save timezone", response.error);
     toast.error("Failed to save timezone", {
       // Display an error toast when there's an error
       position: "bottom-right",
       autoClose: 4000,
     });
   } else {
     console.log(response.message);
     setShowDialog(false);
     toast.success("Timezone saved successfully", {
       // Display a success toast when the timezone is saved successfully
       position: "bottom-right",
       autoClose: 4000,
     });
   }
 };

  return (
    <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            to="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <img
              src={Logo}
              width={46}
              height={46}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
            <span className="sr-only">Solvyng Archivyng</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  location.pathname === "/"
                    ? "bg-blue-500 text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Home</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/files"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  location.pathname === "/files"
                    ? "bg-blue-500 text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Folder className="h-5 w-5" />
                <span className="sr-only">Files</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Files</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to=""
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  location.pathname === ""
                    ? "bg-blue-500 text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Notifications</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/Bookmarks"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  location.pathname === "/Bookmarks"
                    ? "bg-blue-500 text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Bookmark className="h-5 w-5" />
                <span className="sr-only">Bookmarks</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Bookmarks</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="#"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  location.pathname === "#"
                    ? "bg-blue-500 text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Clock className="h-5 w-5" />
                <span className="sr-only">Recent Files</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Recent Files</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="#"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  location.pathname === "#"
                    ? "bg-blue-500 text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Share2Icon className="h-5 w-5" />
                <span className="sr-only">Shared Files</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Shared Files</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="#"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  location.pathname === "#"
                    ? "bg-blue-500 text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="#"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  location.pathname === "#"
                    ? "bg-blue-500 text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="overflow-hidden"
                    >
                      <SquareUser className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowDialog(true)}>
                      Preferences
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Link>
            </TooltipTrigger>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="teal" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  to="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Solvyng Archivyng</span>
                </Link>
                <Link
                  to="/"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground "
                >
                  <Home className="h-5 w-5" />
                  Home
                </Link>
                <Link
                  to="/files"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Folder className="h-5 w-5" />
                  Files
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Bell className="h-5 w-5" />
                  Notifications
                </Link>
                <Link
                  to="/Bookmarks"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Star className="h-5 w-5" />
                  Bookmarks
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Clock className="h-5 w-5" />
                  Recent Files
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>

      {showDialog && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Select a timezone</DialogTitle>
              <DialogDescription>
                Select your timezone based on your location.
              </DialogDescription>
            </DialogHeader>
            <Select onValueChange={(value) => setSelectedTimezone(value)}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a timezone" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((timezone, index) => (
                  <SelectGroup key={index}>
                    <SelectItem value={timezone.zoneName}>
                      {timezone.zoneName} (GMT {timezone.gmtOffset / 3600})
                    </SelectItem>
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
            <DialogFooter>
              <Button type="submit" onClick={handleSaveChanges}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </TooltipProvider>
  );
}

export default Navbar;
