"use client";
import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import {
  HomeIcon,
  UsersIcon,
  BellIcon,
  MessageCircleIcon,
  SettingsIcon,
  UserIcon,
  FileTextIcon,
  ShieldCheckIcon,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(true);

  const menuItems = [
    { label: "Home", icon: <HomeIcon className="w-5 h-5 mr-3" /> },
    { label: "Friends", icon: <UsersIcon className="w-5 h-5 mr-3" /> },
    { label: "Notifications", icon: <BellIcon className="w-5 h-5 mr-3" /> },
    { label: "Messages", icon: <MessageCircleIcon className="w-5 h-5 mr-3" /> },
    { label: "Settings", icon: <SettingsIcon className="w-5 h-5 mr-3" /> },
    { label: "Profile", icon: <UserIcon className="w-5 h-5 mr-3" /> }
  ];

  return (
    <div className="relative w-screen">
      {/* Navbar */}
      <div className="w-full flex items-center h-[11vh] z-30 backdrop-blur-md  backdrop-saturate-[1.8] justify-between px-4 relative">
        <div className="logo text-4xl ml-1">dinka</div>
      </div>

      {/* Toggle Button */}
      <button
        className="text-3xl absolute top-0 p-4 bg-zinc-50 rounded-full text-zinc-700 border z-50 right-0 mt-[1.7vh] mr-[2vh]"
        onClick={() => setOpen(!open)}
      >
        {open ? <HiOutlineMenuAlt3 /> : <IoClose />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 w-screen h-screen
          bg-zinc-100 z-40 
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-full" : "translate-x-0"}
        `}
      >
        <div className="flex flex-col justify-between p-6 h-full bg-zinc-200 text-2xl rounded-l-3xl">
          <div>
            <div className="text-5xl px-3 mt-24 text-zinc-600">Settings</div>
            <hr className="m-3" />
            <div>
              {menuItems.map((item, idx) => (
                <div
                  key={idx}
                  className="w-full flex items-center text-[18px] bg-zinc-100 pl-6 rounded-3xl shadow-none py-4 my-2 text-zinc-700 hover:bg-zinc-300 transition"
                >
                  {item.icon}
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Section */}
          <div className="text-sm px-3 text-zinc-500 space-y-2 mt-10">
            <div className="flex items-center hover:text-zinc-800 cursor-pointer">
              <FileTextIcon className="w-4 h-4 mr-2" />
              Terms & Conditions
            </div>
            <div className="flex items-center hover:text-zinc-800 cursor-pointer">
              <ShieldCheckIcon className="w-4 h-4 mr-2" />
              Privacy Policy
            </div>
            <div className="text-center text-xs text-zinc-400 mt-3">Version 1.2</div>
          </div>
        </div>
      </div>
    </div>
  );
}
