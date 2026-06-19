import React from "react";
import { useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaRegFolderOpen } from "react-icons/fa";
import { RiChat3Line } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";

function Navbar() {
  const navigate = useNavigate();

  const navItems = [
    {
      path: "/",
      icon: IoHome,
      label: "Home",
      activePaths: ["/"],
      enabled: true,
    },
    {
      path: "/projectspage",
      icon: FaRegFolderOpen,
      label: "Projects",
      activePaths: ["/projectspage", "/project/", "/new-project"],
      enabled: true,
    },
    {
      path: "/chat",
      icon: RiChat3Line,
      label: "Chat",
      activePaths: ["/chat"],
      enabled: false,
    },
    {
      path: "/community",
      icon: HiOutlineUsers,
      label: "Community",
      activePaths: ["/community"],
      enabled: false,
    },
    {
      path: "/settings",
      icon: IoSettingsOutline,
      label: "Settings",
      activePaths: ["/settings"],
      enabled: false,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-[min(100vw,430px)] mx-auto bg-mainMauve px-6 py-5 flex justify-between text-4xl">
      {navItems.map((item) => {
        const Icon = item.icon;

        const isActive = item.activePaths.some((path) =>
          location.pathname.startsWith(path),
        );

        return (
          <button
            key={item.label}
            onClick={() => item.enabled && navigate(item.path)}
            className="p-0"
            aria-label={item.label}
          >
            <Icon
              size={28}
              className={isActive ? "text-white" : "text-black"}
            />
          </button>
        );
      })}
    </nav>
  );
}

export default Navbar;
