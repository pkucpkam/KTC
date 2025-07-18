import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CarSelection from "./pages/CarSelection";
import CountDownTimer from "./pages/CountDownTimer";
import CurrentTime from "./pages/CurrentTime";
import Header from "./components/Header";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/carselect" replace />}
                />
                <Route path="/carselect" element={<CarSelection />} />
                <Route path="/countdown" element={<CountDownTimer />} />
                <Route path="/currenttime" element={<CurrentTime />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
