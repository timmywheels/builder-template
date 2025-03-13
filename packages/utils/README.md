# @app/utils

A collection of utility functions for string, number, and date manipulation.

## Installation

This package is part of a monorepo and is intended to be used internally.

## Usage

```typescript
// Import specific functions
import { capitalize, formatDate, clamp } from "@app/utils";

// Use namespace imports for better organization
import { StringUtils, NumberUtils, DateUtils } from "@app/utils";

// Examples
const capitalized = capitalize("hello"); // "Hello"
const formatted = NumberUtils.formatCurrency(1234.56); // "$1,234.56"
const nextWeek = DateUtils.addDays(new Date(), 7);
```

## Available Utilities

### String Utilities

- `capitalize(str)` - Capitalizes the first letter of a string
- `toCamelCase(str)` - Converts a string to camelCase
- `truncate(str, length, ending)` - Truncates a string to the specified length
- `slugify(str)` - Slugifies a string (for URLs)

### Number Utilities

- `clamp(num, min, max)` - Clamps a number between min and max values
- `formatCurrency(amount, currencyCode, locale)` - Formats a number as currency
- `formatNumber(num, locale)` - Formats a number with commas
- `randomInt(min, max)` - Returns a random integer between min and max (inclusive)

### Date Utilities

- `formatDate(date, format, locale)` - Formats a date according to the specified format
- `addDays(date, days)` - Adds the specified number of days to a date
- `isPast(date)` - Checks if a date is in the past
- `daysBetween(startDate, endDate)` - Calculates the difference between two dates in days
