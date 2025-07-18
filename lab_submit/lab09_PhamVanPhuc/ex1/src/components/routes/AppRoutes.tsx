import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoList from "../main/ToDoList";


const AppRoutes = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;