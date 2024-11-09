// Careful what you import here, the default import of this file is the React component
import { type SidebarItem } from "./sidebar-item";
import { type DropDownItem } from "./dropdown-item";
import { BookText, Calendar, House, Inbox } from 'lucide-react';

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
  },
  {
    icon: <Calendar/>,
    id: "calendar",
    content: <span>Calendar</span>,
    href: "/calendar",
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