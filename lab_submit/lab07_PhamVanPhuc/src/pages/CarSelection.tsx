import React from "react";

function CarSelection() {
    const carOptions = [
        { value: "volvo", label: "Volvo" },
        { value: "saab", label: "Saab" },
        { value: "mercedes", label: "Mercedes" },
        { value: "audi", label: "Audi" },
    ];

    const colorOptions = [
        { value: "red", label: "Red" },
        { value: "blue", label: "Blue" },
        { value: "green", label: "Green" },
        { value: "black", label: "Black" },
    ];

    const [car, setCar] = React.useState(carOptions[0].value);
    const [color, setColor] = React.useState(colorOptions[0].value);

    return (
        <div>
            <h1>Select your car</h1>

            <div>
                <label
                    htmlFor="select-car"
                    style={{ display: "inline-block", marginRight: "2rem" }}
                >
                    Select a car
                </label>
                <select
                    name=""
                    id="select-car"
                    onChange={(e) => setCar(e.target.value)}
                >
                    {carOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label
                    htmlFor="select-color"
                    style={{ display: "inline-block", marginRight: "2rem" }}
                >
                    Select color
                </label>
                <select
                    name=""
                    id="select-color"
                    onChange={(e) => setColor(e.target.value)}
                >
                    {colorOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <h2>
                You selected a {color} - {car}
            </h2>
        </div>
    );
}

export default CarSelection;
