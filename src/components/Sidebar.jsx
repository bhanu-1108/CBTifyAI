import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  UploadCloud, 
  BarChart2, 
  Trophy, 
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Upload Files', path: '/upload', icon: UploadCloud },
    { name: 'Analytics Dashboard', path: '/analytics', icon: BarChart2 },
    ...(currentUser?.role === 'organization' 
      ? [{ name: 'Organization Portal', path: '/organization', icon: Users }]
      : [])
  ];

  return (
    <aside className="w-64 h-[calc(100vh-80px)] sticky top-20 hidden md:flex flex-col border-r border-white/10 bg-darkBg/30 backdrop-blur-md p-4 justify-between">
      <div className="space-y-6">
        {/* User profile brief */}
        <div className="flex items-center space-x-3 p-3 rounded-2xl bg-white/5 border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purpleGlow to-cyanAccent flex items-center justify-center font-bold text-white shadow-glowBlue">
            {currentUser?.username?.substring(0, 2).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-semibold text-white truncate">{currentUser?.username}</h4>
            <p className="text-[11px] text-mutedGray truncate">{currentUser?.email}</p>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="flex flex-col space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-accentBlue/20 to-purpleGlow/10 border-l-4 border-accentBlue text-white shadow-glowBlue' 
                      : 'text-mutedGray hover:bg-white/5 hover:text-white border-l-4 border-transparent'
                  }`
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Logout */}
      <div className="pt-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-mutedGray hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
