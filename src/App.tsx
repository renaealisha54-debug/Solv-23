import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/index";
import TicketsPage from "./pages/tickets";
import TicketDetail from "./pages/ticket-detail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/tickets/:id" element={<TicketDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
