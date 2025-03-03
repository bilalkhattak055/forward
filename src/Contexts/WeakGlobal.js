import React, { createContext, useState, useContext } from "react";


const getCurrentWeek = () => {
  const now = new Date();
  const oneJan = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(
    (((now.getTime() - oneJan.getTime()) / 86400000) + oneJan.getDay() + 1) / 7
  );
  return `${now.getFullYear()}-W${weekNumber.toString().padStart(2, "0")}`;
};
const getPreviousWeek = () => {
  const now = new Date();
  const oneJan = new Date(now.getFullYear(), 0, 1);
  const currentWeekNumber = Math.ceil(
    (((now.getTime() - oneJan.getTime()) / 86400000) + oneJan.getDay() + 1) / 7
  );
  const previousWeekNumber = currentWeekNumber - 1;

  if (previousWeekNumber > 0) {
    // Return previous week of the current year
    return `${now.getFullYear()}-W${previousWeekNumber.toString().padStart(2, "0")}`;
  } else {
    // Handle edge case for the first week of the year
    const lastYear = now.getFullYear() - 1;
    const lastYearOneJan = new Date(lastYear, 0, 1);
    const lastYearDays = Math.ceil((new Date(lastYear, 11, 31) - lastYearOneJan) / 86400000);
    const lastYearWeeks = Math.ceil((lastYearDays + lastYearOneJan.getDay() + 1) / 7);
    return `${lastYear}-W${lastYearWeeks.toString().padStart(2, "0")}`;
  }
};


const WeekFilterContext = createContext();

export const WeekFilterProvider = ({ children }) => {
  const [CurrentweekForLeaderBoard, setCurrentweekForLeaderBoard] = useState(getPreviousWeek())
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());

  return (
    <WeekFilterContext.Provider value={{ selectedWeek, setSelectedWeek,setCurrentweekForLeaderBoard,CurrentweekForLeaderBoard }}>
      {children}
    </WeekFilterContext.Provider>
  );
};

export const useWeekFilter = () => {
  return useContext(WeekFilterContext);
};

export default WeekFilterProvider;