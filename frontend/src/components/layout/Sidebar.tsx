import {
  LayoutDashboard,
  BrainCircuit,
  History,
  User,
  LogOut,
  FileText,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import { useAuth } from "../../hooks/useAuth";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "New Interview",
    path: "/interview",
    icon: BrainCircuit,
  },
  {
    name: "History",
    path: "/history",
    icon: History,
  },
  {
    name: "Resume Analyzer",
    path: "/resume",
    icon: FileText,
  },
  {
    name: "Resume History",
    path: "/resume/history",
    icon: FileText,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
];

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside
      className="
        h-screen
        w-72
        shrink-0
        border-r
        border-white/10
        bg-white/5
        backdrop-blur-2xl
        shadow-2xl
        flex
        flex-col
      "
    >
      {/* Logo */}
      <div className="border-b border-white/10 p-8">
        <h1
          className="
            text-2xl
            font-bold
            bg-gradient-to-r
            from-cyan-300
            via-blue-300
            to-indigo-400
            bg-clip-text
            text-transparent
          "
        >
          PrepGenius AI
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.path} to={item.path}>
              {({ isActive }) => (
                <motion.div
                  whileHover={{
                    x: 6,
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className={`
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    px-4
                    py-3
                    cursor-pointer
                    transition-all
                    duration-300

                    ${
                      isActive
                        ? `
                          bg-cyan-500/15
                          border
                          border-cyan-400/30
                          shadow-[0_0_30px_rgba(34,211,238,0.15)]
                          text-white
                        `
                        : `
                          text-slate-300
                          hover:bg-white/5
                          hover:text-white
                        `
                    }
                  `}
                >
                  {/* Active Indicator */}
                  <motion.div
                    animate={{
                      scaleY: isActive ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="
                      absolute
                      left-0
                      top-2
                      bottom-2
                      w-1
                      rounded-full
                      bg-cyan-400
                      origin-center
                    "
                  />

                  {/* Glow */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebarGlow"
                      className="
                        absolute
                        inset-0
                        rounded-2xl
                        bg-cyan-400/5
                      "
                    />
                  )}

                  <div className="relative flex items-center gap-4">
                    <motion.div
                      whileHover={{
                        rotate: 4,
                        scale: 1.12,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                    >
                      <Icon
                        size={20}
                        className={
                          isActive
                            ? "text-cyan-300"
                            : "text-slate-400 group-hover:text-cyan-300"
                        }
                      />
                    </motion.div>

                    <span className="font-medium">
                      {item.name}
                    </span>
                  </div>
                </motion.div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-4">
        <motion.button
          whileHover={{
            x: 6,
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={logout}
          className="
            group
            flex
            w-full
            items-center
            gap-4
            rounded-2xl
            px-4
            py-3

            bg-red-500/10
            border
            border-red-500/20

            text-red-300

            hover:bg-red-500/20
            hover:border-red-400/40

            transition-all
          "
        >
          <motion.div
            whileHover={{
              rotate: -8,
              scale: 1.1,
            }}
          >
            <LogOut size={20} />
          </motion.div>

          <span className="font-medium">
            Logout
          </span>
        </motion.button>
      </div>
    </aside>
  );
}