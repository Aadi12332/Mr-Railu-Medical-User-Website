import { clsx, type ClassValue } from "clsx"
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const generateTodaySlots = () => {
  const now = new Date();
  const slots = [];

  for (let i = 0; i < 5; i++) {
    const start = new Date(now.getTime() + i * 30 * 60000);
    const end = new Date(start.getTime() + 20 * 60000);

    slots.push({
      id: i + 1,
      date: "Today",
      start: start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      end: end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
  }

  return slots;
};
export const getRandomSlot = () => {
  const now = new Date();
  const start = new Date(now.getTime() + Math.random() * 5 * 60 * 60000);
  const end = new Date(start.getTime() + 20 * 60000);

  return {
    id: 999,
    date: "Today",
    start: start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    end: end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
};
export const generateSlotsFromAvailability = (
  availability: any[],
  selectedDate: Date
) => {
  const dayName = dayjs(selectedDate).format("dddd");

  const dayAvail = availability.find(
    (d) => d.day.toLowerCase() === dayName.toLowerCase()
  );

  if (!dayAvail) return [];

  return dayAvail.slots.map((range: any) => {
  const fullStart = dayjs(
    `${dayjs(selectedDate).format("YYYY-MM-DD")} ${range.startTime}`
  );

  const fullEnd = dayjs(
    `${dayjs(selectedDate).format("YYYY-MM-DD")} ${range.endTime}`
  );

  return {
    id: `${dayjs(selectedDate).format("YYYY-MM-DD")}-${range.startTime}`,
    date: dayjs(selectedDate).format("YYYY-MM-DD"),
    start: fullStart.format("hh:mm A"),
    end: fullEnd.format("hh:mm A"),
  };
});
};
export function formatTo12Hour(time: string): string {
  const [hourStr, minute] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}