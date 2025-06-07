const convertTime = (time) => {
    const [hourStr, minuteStr] = time.split(':');
    let hours = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);

    let meridiem = 'am';
    if (hours >= 12) {
        meridiem = 'pm';
    }

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12 || 12; // 0 or 12 -> 12, 13 -> 1, etc.

    // Format with leading zeros if needed
    const formattedTime = `${hours}:${minuteStr.padStart(2, '0')} ${meridiem}`;
    return formattedTime;
};

export default convertTime;




