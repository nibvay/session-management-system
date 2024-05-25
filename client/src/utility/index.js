export function getThisWeek() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const daysUntilNextMonday = (8 - dayOfWeek) % 7;

  const nextMondayDate = new Date(today);
  nextMondayDate.setDate(today.getDate() + daysUntilNextMonday);
  nextMondayDate.setHours(0, 0, 0, 0); // Align time to 00:00:00

  const dates = [];

  for (let i = 0; i < 5; i++) {
    const date = new Date(nextMondayDate);
    date.setDate(nextMondayDate.getDate() + i);
    date.setHours(0, 0, 0, 0); // Align time to 00:00:00
    dates.push(date.getTime());
  }

  return dates;
}

export function isSameDay(t1, t2) {
  const date1 = new Date(t1);
  const date2 = new Date(t2);

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function generateFakeSessions(count) {
  const titles = ["MySQL", "Postgres", "Mongodb"];
  const timeSlots = ["morning", "afternoon"];
  const randomTimeSlot = timeSlots[Math.floor(Math.random() * timeSlots.length)];
  const date = getThisWeek();

  return [...new Array(count)].map((_, index) => {
    return {
      id: Math.floor(Math.random() * 10000),
      title: titles[Math.floor(Math.random() * titles.length)],
      date: date[index],
      timeSlot: randomTimeSlot,
    };
  });
}

export const timeFormatter = new Intl.DateTimeFormat("en-US", { month: "numeric", day: "2-digit" });
