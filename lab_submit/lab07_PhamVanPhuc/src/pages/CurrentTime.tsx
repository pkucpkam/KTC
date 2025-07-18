// App.tsx
import React from "react";
import { useClock } from "../hooks/useClock";

const CurrentTime = () => {
    const currentTime = useClock();

    return (
        <div
            style={{
                textAlign: "center",
                marginTop: "20%",
                fontSize: "3rem",
                fontFamily: "Arial",
                color: "white",
                backgroundColor: "darkblue",
                padding: "0 20px",
                borderRadius: "10px",
            }}
        >
            <p>{currentTime}</p>
        </div>
    );
};

export default CurrentTime;
