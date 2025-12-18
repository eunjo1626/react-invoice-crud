import "./global.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import SlipList from "./pages/SlipList";
import SlipCreate from "./pages/SlipCreate";
import SlipDetail from "./pages/SlipDetail";
import TaxList from "./pages/TaxList";
import TaxCreate from "./pages/TaxCreate";
import TaxDetail from "./pages/TaxDetail";
import TaxEdit from "./pages/TaxEdit";
import SlipEdit from "./pages/SlipEdit";
import SlipPrint from "./pages/SlipPrint";
import TaxPrint from "./pages/TaxPrint";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* MainLayout이 모든 페이지를 감싸는 구조 */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          
          {/* 거래명세서 */}
          <Route path="slips" element={<SlipList />} />
          <Route path="slips/create" element={<SlipCreate />} />
          <Route path="slips/:id" element={<SlipDetail />} /> 
          <Route path="slips/:id/edit" element={<SlipEdit />} />
        <Route path="slips/:id/print" element={<SlipPrint />} />


          {/* 세금계산서 */}
          <Route path="tax" element={<TaxList />} />
          <Route path="tax/create" element={<TaxCreate />} />
          <Route path="tax/:id" element={<TaxDetail />} /> 
          <Route path="tax/:id/edit" element={<TaxEdit />} />
          <Route path="tax/:id/print" element={<TaxPrint />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;