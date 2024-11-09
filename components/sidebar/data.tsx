// Careful what you import here, the default import of this file is the React component
import { type SidebarItem } from "./sidebar-item";
import { type DropDownItem } from "./dropdown-item";
import { BarChart, BookText, Calendar, DollarSign, House, Inbox, Monitor, ShoppingCart, Tags, Users } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export  const sideBarItems: SidebarItem[] = [
  {
    icon: <House />,
    id: "home",
    content: <span>Home</span>,
    href: "/"
  },
  {
    icon: <BookText />,
    id: "courses",
    href: "/courses",
  },
  {
    icon: <Calendar/>,
    id: "calender",
    content: <span>Calendar</span>,
    href: "/calender",
  },
  {
    icon: <Inbox/>,
    id: "inbox",
    content: <span>Inbox</span>,
    href: "/inbox",
  },
];

export const dropDownItems: DropDownItem[] = [
  {
    id: "profile",
    action: "link",
    content: <span>Profile</span>,
    href: "#profile",
  },
  {
    id: "settings",
    action: "link",
    content: <span>Settings</span>,
    href: "#settings",
  },
  {
    id: "logout",
    action: () => {
      console.log("logout");
    },
    content: <span>Logout</span>,
  }
]