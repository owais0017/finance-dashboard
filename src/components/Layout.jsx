import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ParticlesBackground from "./ParticlesBackground";

export default function Layout() {
  const { darkMode } = useSelector((state) => state.theme);

  return (
    <div className="min-h-screen">
      <ParticlesBackground darkMode={darkMode} />
      <Navbar />
      <Sidebar />
      <main className="ml-56 pt-16 p-6 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}