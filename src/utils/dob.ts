// Function to validate DOB
export function validateDOB(dob: any) {
    // Regular expression to match YYYY-MM-DD format
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    // Check if dob matches the regex
    if (!regex.test(dob)) {
        return 'Allowed Formate YYYY-MM-DD';
    }

    // Extract year, month, and day from dob
    const [year, month, day] = dob.split('-').map(Number);

    // Validate year range (from 1700)
    if (year < 1700) {
        return 'Year must be greater than or equal to 1700';
    }

    // Validate month range (1-12)
    if (month < 1 || month > 12) {
        return 'Month must be between 1 and 12';
    }

    // Validate day range based on the month
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        return `Day must be between 1 and ${daysInMonth}`;
    }

    return;
}