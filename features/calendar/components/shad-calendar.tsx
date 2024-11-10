"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { useEventCalendarContext } from '../providers/events-calendar-provider'
import { Badge } from '@/components/ui/badge'
import useWindowSize from '@/hooks/use-window-size'
import { useQueryState } from 'nuqs'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const { events } = useEventCalendarContext();
  const { width: screenWidth } = useWindowSize();
  const isMediumLg = screenWidth < 1100;
  const isSmall = screenWidth < 600;
  const [eventId, setEventId] = useQueryState("eventId");
  return (
    <DayPicker
      fixedWeeks
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 w-full",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex justify-between",
        head_cell:
          "text-muted-foreground rounded-md w-full font-normal text-[0.8rem] text-center",
        tbody: "w-full flex flex-col justify-between",
        row: "flex w-full mt-2 justify-between",
        cell: cn(
          "relative p-0 w-full text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: "w-full rounded-lg p-2",
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft {...props} className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight {...props} className="h-4 w-4" />,
        DayContent: ({...props }) => (
          <div className="flex wh-[calc(65vh/6)] h-[calc(100vh/6)] w-[calc(35vw/7)] md:w-[calc(45vw/7)] lg:w-[calc(70vw/7)]">
            <div className="flex flex-col w-full h-full gap-3">
              <div className="text-sm font-medium text-start">
                {props.date.getDate()}
              </div>
              {!isSmall && (


                <div className="text-xs flex text-start w-full flex-col gap-1 overflow-auto scroll-container">
                  {events
                    .filter((event) => event.start.toDateString() === props.date.toDateString())
                    .map((event) => {
                      const durationMinutes = (event.end.getTime() - event.start.getTime()) / (1000 * 60);
                      const badgeHeight = Math.max(12, durationMinutes * 0.5);
                      return (
                        <Badge key={event.title} variant={"destructive"} className={`w-full`}
                          style={{
                            minHeight: `${badgeHeight}px`,
                          }}
                          onClick={() => setEventId(event.id)}
                        >
                          {(!isMediumLg && screenWidth != 0) && (
                            <p className="truncate text-nowrap">
                              {event.title}
                            </p>
                          )}
                          {isMediumLg && (
                            <div className="h-2 w-full"/>
                          )}
                        </Badge>
                      )
                    })}
                </div>

              )}
            </div>
        </div>
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
