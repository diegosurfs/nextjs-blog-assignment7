// Imports functions from date-fns that can read and format dates.
import { parseISO, format } from "date-fns";

// Creates a reusable component for displaying formatted dates.
export default function Date({ dateString }) {
  // Converts the date string into a date object.
  const date = parseISO(dateString);

  // Displays the date in a readable format.
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}