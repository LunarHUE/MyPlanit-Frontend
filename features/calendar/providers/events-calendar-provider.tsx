'use client'

import type { CalendarEvent } from '@/lib/types';
import React, { createContext, useContext, useState } from 'react';

interface EventCalendarContextType {
  events: CalendarEvent[];
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const EventCalendarContext = createContext<EventCalendarContextType | undefined>(undefined);

interface CalendarEventsProviderProps {
  children: React.ReactNode;
}

const events: CalendarEvent[] = [
  {
    id: "1",
    title: "Project Kickoff",
    description: "Initial project meeting to outline goals and deliverables.",
    start: new Date(2024, 10, 18, 20, 6, 37),
    end: new Date(2024, 10, 18, 21, 47, 17),
  },
  {
    id: "2",
    title: "Design Review",
    description: "Review and feedback session for design prototypes.",
    start: new Date(2024, 10, 16, 5, 57, 44),
    end: new Date(2024, 10, 16, 7, 24, 24),
  },
  {
      id: "3",
      title: "Sprint Planning",
      description: "Outline tasks and objectives for the upcoming sprint.",
      start: new Date(2024, 10, 30, 19, 34, 7),
      end: new Date(2024, 10, 30, 21, 49, 7),
  },
  {
      id: "4",
      title: "Client Check-in",
      description: "Monthly check-in call with the client to discuss progress.",
      start: new Date(2024, 10, 21, 0, 26, 0),
      end: new Date(2024, 10, 21, 1, 36, 0),
  },
  {
      id: "5",
      title: "Team Sync",
      description: "Weekly sync-up meeting to discuss current projects.",
      start: new Date(2024, 10, 24, 6, 50, 50),
      end: new Date(2024, 10, 24, 8, 20, 50),
  },
  {
      id: "6",
      title: "Product Roadmap",
      description: "Session to discuss long-term product goals and roadmap.",
      start: new Date(2024, 10, 29, 21, 36, 6),
      end: new Date(2024, 10, 29, 22, 56, 6),
  },
  {
      id: "7",
      title: "Team Lunch",
      description: "Team-building lunch to foster collaboration.",
      start: new Date(2024, 10, 18, 21, 37, 8),
      end: new Date(2024, 10, 18, 23, 32, 8),
  },
  {
      id: "8",
      title: "Code Review",
      description: "Review of code submissions and peer feedback.",
      start: new Date(2024, 10, 12, 23, 53, 20),
      end: new Date(2024, 10, 13, 1, 6, 40),
  },
  {
      id: "9",
      title: "Testing Session",
      description: "Testing session for the new feature rollout.",
      start: new Date(2024, 10, 28, 5, 55, 32),
      end: new Date(2024, 10, 28, 7, 22, 12),
  },
  {
      id: "10",
      title: "Marketing Strategy",
      description: "Planning session for next quarter's marketing strategy.",
      start: new Date(2024, 10, 9, 18, 23, 30),
      end: new Date(2024, 10, 9, 19, 50, 10),
  },
  {
      id: "11",
      title: "Customer Feedback",
      description: "Reviewing customer feedback and addressing concerns.",
      start: new Date(2024, 10, 22, 9, 28, 42),
      end: new Date(2024, 10, 22, 10, 58, 42),
  },
  {
      id: "12",
      title: "Budget Meeting",
      description: "Monthly budget discussion with finance team.",
      start: new Date(2024, 10, 23, 22, 12, 49),
      end: new Date(2024, 10, 24, 0, 2, 49),
  },
  {
      id: "13",
      title: "Technical Workshop",
      description: "Workshop to improve technical skills in the team.",
      start: new Date(2024, 10, 22, 4, 0, 6),
      end: new Date(2024, 10, 22, 5, 46, 6),
  },
  {
      id: "14",
      title: "Stakeholder Presentation",
      description: "Presentation to stakeholders on the latest project milestones.",
      start: new Date(2024, 10, 11, 16, 30, 41),
      end: new Date(2024, 10, 11, 17, 49, 41),
  },
  {
      id: "15",
      title: "Quarterly Review",
      description: "Quarterly review of KPIs and metrics.",
      start: new Date(2024, 10, 21, 11, 56, 1),
      end: new Date(2024, 10, 21, 13, 26, 1),
  },
  {
      id: "16",
      title: "New Hire Orientation",
      description: "Orientation session for the new hires.",
      start: new Date(2024, 10, 25, 7, 40, 49),
      end: new Date(2024, 10, 25, 9, 20, 49),
  },
  {
      id: "17",
      title: "Product Demo",
      description: "Demo of the new product features to the sales team.",
      start: new Date(2024, 10, 24, 1, 29, 7),
      end: new Date(2024, 10, 24, 3, 15, 7),
  },
  {
      id: "18",
      title: "Partnership Discussion",
      description: "Exploration of potential partnership opportunities.",
      start: new Date(2024, 10, 24, 19, 51, 57),
      end: new Date(2024, 10, 24, 21, 18, 57),
  },
  {
      id: "19",
      title: "UX Research",
      description: "User experience research session to gather feedback.",
      start: new Date(2024, 10, 12, 15, 21, 40),
      end: new Date(2024, 10, 12, 17, 6, 40),
  },
  {
      id: "20",
      title: "Team Building Activity",
      description: "Outdoor activity to enhance team bonding.",
      start: new Date(2024, 10, 10, 13, 49, 40),
      end: new Date(2024, 10, 10, 15, 13, 40),
  },

]
export const EventsCalendarProvider = ({ children }: CalendarEventsProviderProps) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())

  return (
    <EventCalendarContext.Provider value={{ events, selectedDate, setSelectedDate }}>
      {children}
    </EventCalendarContext.Provider>
  );
};

export const useEventCalendarContext = () => {
  const context = useContext(EventCalendarContext);
  if (context === undefined) {
    throw new Error('useEventCalendarContext must be used within an EventCalendarProvider');
  }
  return context;
};
