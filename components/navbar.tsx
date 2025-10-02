  "use client";
  import React, { useState, useRef, useEffect } from "react";
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
  import Link from "next/link";
  import gsap from "gsap";
  import { ThemeToggle } from "@/components/ThemeToggle";

  export default function Navbar() {
    const [open, setOpen] = useState(true);
    const sidebarRef = useRef(null);
    const itemRefs = useRef<HTMLDivElement[]>([]);
    const originRef = useRef<HTMLDivElement>(null);

    const menuItems = [
      { label: "Home", icon: <HomeIcon className="w-5 h-5 mr-3" /> },
      { label: "People", icon: <UsersIcon className="w-5 h-5 mr-3" /> },
      { label: "Activity", icon: <BellIcon className="w-5 h-5 mr-3" /> },
      { label: "Chats", icon: <MessageCircleIcon className="w-5 h-5 mr-3" /> },
      { label: "Settings", icon: <SettingsIcon className="w-5 h-5 mr-3" /> },
      { label: "Profile", icon: <UserIcon className="w-5 h-5 mr-3" /> },
    ];

    useEffect(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      if (!sidebarRef.current || !originRef.current) return;

      if (!open) {
        // Open: Slide in sidebar and explode items from center
        tl.to(sidebarRef.current, { x: 0, duration: 0.5 });

        const originBox = originRef.current.getBoundingClientRect();

        itemRefs.current.forEach((el) => {
          const box = el.getBoundingClientRect();
          const dx = originBox.left - box.left;
          const dy = originBox.top - box.top;

          gsap.set(el, { x: dx, y: dy, opacity: 0 });
        });

        tl.to(
          itemRefs.current,
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.,
            stagger: 0.05,
            ease: "back.out(1.7)",
          },
          "<0.1"
        );
      } else {
        // Close: Collapse items to center and slide out sidebar
        const originBox = originRef.current.getBoundingClientRect();

        itemRefs.current.forEach((el) => {
          const box = el.getBoundingClientRect();
          const dx = originBox.left - box.left;
          const dy = originBox.top - box.top;

          tl.to(
            el,
            {
              x: dx,
              y: dy,
              opacity: 0,
              duration: 0.2,
            },
            "<0.05"
          );
        });

        tl.to(sidebarRef.current, { x: "100%", duration: 0.5 }, "<");
      }
    }, [open]);

    return (<>
    <div className="sticky top-0 z-30 ">
      <div className="relative w-screen ">
        {/* Top Navbar */}
        <div className="w-full absolute top-0 left-0 bg-zinc-100/80 dark:bg-zinc-800/80 backdrop-blur-md backdrop-saturate-[1.8] flex items-center h-[11vh] z-30 justify-between px-4">
          <div className="logo text-4xl ml-1 dark:text-zinc-100">dinka</div>
          
          {/* Dark Mode Toggle - Always visible */}
          <div className="mr-20">
            <ThemeToggle />
          </div>
        </div>

        {/* Toggle Button */}
        <button
          className="text-3xl absolute top-0 p-4 bg-zinc-50 dark:bg-zinc-700 rounded-full text-zinc-700 dark:text-zinc-100 border dark:border-zinc-600 z-50 right-0 mt-[1.7vh] mr-[2vh]"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiOutlineMenuAlt3 /> : <IoClose />}
        </button>

        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className="fixed top-0 left-0 w-screen h-screen bg-zinc-100 dark:bg-zinc-800 z-40 translate-x-full overflow-hidden"
        >
          <div className="flex flex-col justify-between p-6 h-full bg-zinc-200 dark:bg-zinc-900 text-2xl rounded-l-3xl relative">
            <div>
              <div className="text-5xl z-40 font-bold px-3 mt-16 text-zinc-500 dark:text-zinc-400">Settings</div>
              
              <hr className="m-3" />

              <div className="relative">
                {/* Hidden origin point */}
                <div
                  ref={originRef}
                  className="absolute top-0 left-0 w-1 h-1 bg-transparent pointer-events-none"
                ></div>

                {menuItems.map((item, idx) => (
                  <Link
                    href={item.label==="Home"?"/":item.label.toLowerCase()}
                    key={idx}
                    onClick={()=> setOpen(true)}
                    ref={(el) => {
                      //@ts-ignore
                      if (el) itemRefs.current[idx] = el;
                    }}
                    className="menu-item w-full flex items-center text-[18px] bg-zinc-100 dark:bg-zinc-800 pl-6 rounded-3xl shadow-none py-4 my-2 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="absolute bottom-18 text-sm px-3 text-zinc-500 dark:text-zinc-400 mt-0 flex gap-2 justify-center items-center">
              <button className="flex items-center hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer text-left">
              <FileTextIcon className="w-4 h-4 mr-2" />
              Terms & Conditions
              </button>

              <button className="flex items-center hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer text-left">
              <ShieldCheckIcon className="w-4 h-4 mr-2" />
              Privacy Policy
              </button>

              <div className="text-center text-xs text-zinc-400 dark:text-zinc-500 mt-3">Version 1.2</div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </>
    );
  }
