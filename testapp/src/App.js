import Login from "./components/Login";
import Home from "./components/Home";
import Form from "./components/Form";
import Chart from "./components/Chart";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ModelExplainability from "./components/ModelExplainability";
function App() {
 
  return (

    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/chart" element={<Chart/>}/>
        <Route path="/model" element={<ModelExplainability/>}/>

      </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
