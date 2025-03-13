/**
 * Date manipulation utilities
 */

/**
 * Formats a date according to the specified format
 */
export function formatDate(
  date: Date | string | number,
  format: string = "yyyy-MM-dd",
  locale: string = "en-US"
): string {
  const dateObject = date instanceof Date ? date : new Date(date);

  const options: Intl.DateTimeFormatOptions = {};
  if (format.includes("yyyy")) {
    options.year = "numeric";
  }
  if (format.includes("MM")) {
    options.month = "2-digit";
  } else if (format.includes("M")) {
    options.month = "numeric";
  }
  if (format.includes("dd")) {
    options.day = "2-digit";
  } else if (format.includes("d")) {
    options.day = "numeric";
  }

  return new Intl.DateTimeFormat(locale, options).format(dateObject);
}

/**
 * Adds the specified number of days to a date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Checks if a date is in the past
 */
export function isPast(date: Date | string | number): boolean {
  const dateObject = date instanceof Date ? date : new Date(date);
  return dateObject < new Date();
}

/**
 * Calculates the difference between two dates in days
 */
export function daysBetween(startDate: Date, endDate: Date): number {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.floor(diffTime / millisecondsPerDay);
}
