export const generateTimeSlots = (startingTime, endingTime, numberOfSlots = 4) => {
      const toMinutes = (timeStr) => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        return hours * 60 + minutes;
      };

      const toTimeStr = (minutes) => {
        const hrs = String(Math.floor(minutes / 60)).padStart(2, "0");
        const mins = String(minutes % 60).padStart(2, "0");
        return `${hrs}:${mins}`;
      };

      const start = toMinutes(startingTime);
      const end = toMinutes(endingTime);
      const gap = Math.floor((end - start) / (numberOfSlots + 1));

      const slots = [];
      for (let i = 1; i <= numberOfSlots; i++) {
        slots.push(toTimeStr(start + i * gap));
      }
      return slots;
    };