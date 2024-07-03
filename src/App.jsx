import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Missing } from "./pages/Missing";
import { Users } from "./pages/Users";
import { UserAdd } from "./pages/UserAdd";
import { UserEdit } from "./pages/UserEdit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Users />} />
        <Route path="/add" element={<UserAdd />} />
        <Route path="/edit/:id" element={<UserEdit />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
