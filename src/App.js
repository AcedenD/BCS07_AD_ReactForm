import SinhVienForm from "./Components/SinhVienForm";
// import HocSinhForm from "./Components/HocSinhForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/HS" element={<HocSinhForm />} /> */}
        <Route path="/" element={<SinhVienForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
