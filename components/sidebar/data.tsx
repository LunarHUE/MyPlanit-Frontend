// Careful what you import here, the default import of this file is the React component
import { type SidebarItem } from './sidebar-item'
import { type DropDownItem } from './dropdown-item'
import { BookText, Calendar, House, Inbox } from 'lucide-react'
import SendAuthedRequest from '@/app/_actions/send-authed-api'

export const sideBarItems: SidebarItem[] = [
  {
    icon: <House />,
    id: 'home',
    content: <span>Home</span>,
    href: '/',
  },
  {
    icon: <BookText />,
    id: 'courses',
  },
  {
    icon: <Calendar />,
    id: 'calendar',
    content: <span>Calendar</span>,
    href: '/calendar',
  },
  {
    icon: <Inbox />,
    id: 'inbox',
    content: <span>Inbox</span>,
    href: '/inbox',
  },
]

export const dropDownItems: DropDownItem[] = [
  {
    id: 'delete',
    action: () => {
      SendAuthedRequest('/profile', 'DELETE').then(() => {
        window.location.href = '/api/auth/logout'
      })
    },
    content: <span>Delete Profile</span>,
  },
  {
    id: 'settings',
    action: 'link',
    content: <span>Settings</span>,
    href: '#settings',
  },
  {
    id: 'logout',
    action: () => {
      window.location.href = '/api/auth/logout'
    },
    content: <span>Logout</span>,
  },
]
