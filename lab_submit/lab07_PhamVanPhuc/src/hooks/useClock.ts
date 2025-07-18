// hooks/useClock.ts
import { useEffect, useState } from "react";

const formatTime = (date: Date) => {
    return date.toLocaleTimeString();
};

export const useClock = (): string => {
    const [time, setTime] = useState(formatTime(new Date()));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(formatTime(new Date()));
        }, 1000);

        return () => clearInterval(interval); // cleanup
    }, []);

    return time;
};
