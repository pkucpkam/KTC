import React from "react";
import { useState } from "react";

function Table() {
    const [input, setInput] = useState<string>("0");
    const [prevValue, setPrevValue] = useState<string>("");
    const [operator, setOperator] = useState<string>("");

    const handleNumber = (num: string) => {
        setInput((prev) => (prev === "0" ? num : prev + num));
    };

    const handleOperator = (op: string) => {
        if (input !== "") {
            setPrevValue(input);
            setInput("");
            setOperator(op);
        }
    };

    const handleClear = () => {
        setInput("0");
        setPrevValue("");
        setOperator("");
    };

    const handleCalculate = () => {
        if (prevValue && input && operator) {
            const num1 = parseFloat(prevValue);
            const num2 = parseFloat(input);
            let result: number | string = "";

            switch (operator) {
                case "+":
                    result = num1 + num2;
                    break;
                case "-":
                    result = num1 - num2;
                    break;
                case "*":
                    result = num1 * num2;
                    break;
                case "/":
                    result = num2 !== 0 ? num1 / num2 : "Error";
                    break;
                case "%":
                    result = num1 % num2;
                    break;
                default:
                    return;
            }
            setInput(result.toString());
            setPrevValue("");
            setOperator("");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <div className="text-right text-2xl mb-4 p-2 bg-gray-200 rounded">
                    {input}
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {["7", "8", "9", "/"].map((btn) => (
                        <button
                            key={btn}
                            className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() =>
                                btn.match(/[0-9]/)
                                    ? handleNumber(btn)
                                    : handleOperator(btn)
                            }
                        >
                            {btn}
                        </button>
                    ))}
                    {["4", "5", "6", "*"].map((btn) => (
                        <button
                            key={btn}
                            className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() =>
                                btn.match(/[0-9]/)
                                    ? handleNumber(btn)
                                    : handleOperator(btn)
                            }
                        >
                            {btn}
                        </button>
                    ))}
                    {["1", "2", "3", "-"].map((btn) => (
                        <button
                            key={btn}
                            className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() =>
                                btn.match(/[0-9]/)
                                    ? handleNumber(btn)
                                    : handleOperator(btn)
                            }
                        >
                            {btn}
                        </button>
                    ))}
                    {["0", ".", "=", "+"].map((btn) => (
                        <button
                            key={btn}
                            className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() =>
                                btn === "="
                                    ? handleCalculate()
                                    : btn === "."
                                    ? handleNumber(btn)
                                    : handleOperator(btn)
                            }
                        >
                            {btn}
                        </button>
                    ))}
                    <button
                        className="p-4 bg-red-500 text-white rounded hover:bg-red-600 col-span-2"
                        onClick={handleClear}
                    >
                        C
                    </button>
                    <button
                        className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600 col-span-2"
                        onClick={() => handleOperator("%")}
                    >
                        %
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Table;
