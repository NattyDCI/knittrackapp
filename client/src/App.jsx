
import AppRoutes from "./routes/AppRoutes.jsx";
import "./style.css";
import Navbar from "./pages/components/Navbar.jsx"

export default function App() {
  return (
    <main className="-translate-x-1/2 left-1/2" id="app">
      <div className="h-full overflow-y-auto pb-32">
        <AppRoutes />
      </div>
      <Navbar/>
    </main>
  );
}