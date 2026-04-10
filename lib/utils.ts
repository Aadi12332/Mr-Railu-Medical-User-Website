import { clsx, type ClassValue } from "clsx"
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