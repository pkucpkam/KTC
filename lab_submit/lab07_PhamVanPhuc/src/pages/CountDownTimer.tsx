import React from "react";

function CountDownTimer() {
    const [timeLeft, setTimeLeft] = React.useState(10);

    React.useEffect(() => {
        if (timeLeft === 0) {
            alert("Time's up!");
            return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    return (
        <div>
            <h1>Time left: {timeLeft} seconds</h1>
        </div>
    );
}

export default CountDownTimer;
