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



// const convertTime = (time) => {
//     const timeParts = time.split(':');
//     let hours = parseInt(timeParts[0]);
//     const minutes = parseInt(timeParts[1]);

//     let meridiem = 'am';

//     if (hours >= 12) {
//         meridiem = 'pm';
//         if (hours > 12) {
//             hours -= 12;
//         }
//     }

//     if (hours === 0) {
//         hours = 12; // Midnight case
//     }

//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${meridiem}`;
// };

// export default convertTime;


