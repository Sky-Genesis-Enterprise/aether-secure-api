import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { create } from 'zustand';
import { FiChevronDown, FiChevronUp, FiMenu, FiX, FiChevronRight, FiChevronLeft } from 'react-icons/fi';

const NAV_ITEMS = [
  { label: 'Account Home', path: '/dashboard' },
  { label: 'Discover', path: '/dashboard/discover' },
  {
    label: 'Domain Registration',
    dropdown: [
      { label: 'Manage Domains', path: '/dashboard/domains/manage' },
      { label: 'Transfer Domains', path: '/dashboard/domains/transfer' },
      { label: 'Register Domains', path: '/dashboard/domains/register' },
    ],
  },
  {
    label: 'Log Analytics',
    dropdown: [
      { label: 'Web Analytics', path: '/dashboard/analytics/web' },
      { label: 'Carbon Impact Reports', path: '/dashboard/analytics/carbon' },
      { label: 'Magic Monitoring', path: '/dashboard/analytics/magic' },
    ],
  },
  {
    label: 'Security Center',
    dropdown: [
      { label: 'Infrastructure Security Info', path: '/dashboard/security/infrastructure' },
      { label: 'Investigate', path: '/dashboard/security/investigate' },
      { label: 'Blocked Content', path: '/dashboard/security/blocked' },
      { label: 'WAF', path: '/dashboard/security/waf' },
      { label: 'Turnstile', path: '/dashboard/security/turnstile' },
    ],
  },
  {
    label: 'IP Address',
    dropdown: [
      { label: 'Address Book', path: '/dashboard/ip/address-book' },
      { label: 'Zero Trust', path: '/dashboard/ip/zero-trust' },
    ],
  },
  {
    label: 'Email Security',
    dropdown: [
      { label: 'Overview', path: '/dashboard/email/overview' },
      { label: 'Retro Scan', path: '/dashboard/email/retro' },
      { label: 'Secret Store', path: '/dashboard/email/secret-store' },
    ],
  },
  { label: 'Worker Platform', path: '/dashboard/worker-platform' },
  {
    label: 'Database Storage',
    dropdown: [
      { label: 'KV', path: '/dashboard/database/kv' },
      { label: 'AetherDB', path: '/dashboard/database/aetherdb' },
      { label: 'Queues', path: '/dashboard/database/queues' },
    ],
  },
  {
    label: 'Account Management',
    dropdown: [
      { label: 'Members', path: '/dashboard/account/members' },
      { label: 'API Tokens', path: '/dashboard/account/api-tokens' },
      { label: 'Audit Log', path: '/dashboard/account/audit-log' },
      { label: 'Billing', path: '/dashboard/account/billing' },
      { label: 'Configurations', path: '/dashboard/account/configurations' },
    ],
  },
];

// Sidebar Zustand Store
type SidebarState = {
  collapsed: boolean;
  mobileOpen: boolean;
  toggleCollapse: () => void;
  setMobileOpen: (value: boolean) => void;
};
const useSidebarStore = create<SidebarState>(set => ({
  collapsed: false,
  mobileOpen: false,
  toggleCollapse: () => set(state => ({ collapsed: !state.collapsed })),
  setMobileOpen: (value: boolean) => set(() => ({ mobileOpen: value })),
}));

const DarkModeToggle = () => (
  <button
    aria-label="Toggle dark mode"
    className="mt-6 text-xs px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-900 w-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
    onClick={() => {
      document.documentElement.classList.toggle('dark');
    }}
  >
    Toggle Dark Mode
  </button>
);

const SidebarNav = ({ collapsed }: { collapsed: boolean }) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  return (
    <ul className="space-y-1 text-sm">
      {NAV_ITEMS.map(item => (
        <li key={item.label}>
          {item.dropdown ? (
            <div>
              <button
                className={`flex items-center w-full py-2 px-2 rounded font-semibold justify-between transition text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  collapsed ? 'justify-center px-0' : ''
                }`}
                aria-expanded={openDropdown === item.label}
                aria-controls={`dropdown-${item.label}`}
                onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
              >
                <span className={collapsed ? 'sr-only' : ''}>{item.label}</span>
                {collapsed ? null : openDropdown === item.label ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {/* Dropdown */}
              <ul
                id={`dropdown-${item.label}`}
                className={`ml-2 border-l dark:border-gray-800 space-y-1 pl-2 ${
                  openDropdown === item.label ? 'block' : 'hidden'
                }`}
              >
                {item.dropdown.map(child => (
                  <li key={child.label}>
                    <NavLink
                      to={child.path}
                      className={({ isActive }) =>
                        `block py-1 px-2 rounded transition hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${
                          isActive ? 'bg-gray-200 dark:bg-gray-800 font-bold' : ''
                        } ${collapsed ? 'text-xs px-0' : ''}`
                      }
                      tabIndex={openDropdown === item.label ? 0 : -1}
                    >
                      <span className={collapsed ? 'sr-only' : ''}>{child.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <NavLink
              to={item.path || '/'}
              className={({ isActive }) =>
                `block py-2 px-2 rounded font-semibold transition text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${
                  isActive ? 'bg-gray-200 dark:bg-gray-800 font-bold' : ''
                } ${collapsed ? 'text-xs px-0 justify-center' : ''}`
              }
              end={item.path === '/'}
            >
              <span className={collapsed ? 'sr-only' : ''}>{item.label}</span>
            </NavLink>
          )}
        </li>
      ))}
    </ul>
  );
};

const Sidebar = () => {
  const { collapsed, toggleCollapse, mobileOpen, setMobileOpen } = useSidebarStore();
  // Responsive close (mobile)
  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 flex items-center p-2 bg-gray-200 dark:bg-gray-700 rounded shadow-lg focus:outline-none"
        aria-label="Open sidebar"
        onClick={() => setMobileOpen(true)}
      >
        <FiMenu size={22} />
      </button>
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        tabIndex={-1}
        aria-hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
      />
      {/* Sidebar container */}
      <aside
        className={`z-50 h-full fixed lg:static top-0 left-0 bg-white dark:bg-gray-900 shadow flex flex-col ${
          collapsed ? 'w-20' : 'w-64'
        } transition-all duration-200 select-none ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="flex items-center h-16 px-6 border-b dark:border-gray-800 shadow-sm py-2">
          <span className={`font-bold text-lg tracking-wider ${collapsed ? 'sr-only' : ''}`}>Aether Secure</span>
          <button
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={toggleCollapse}
            className="ml-auto mr-0 text-gray-400 hover:text-blue-500 transition p-1 rounded focus:outline-none"
            tabIndex={0}
          >
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        </div>
        <nav className="flex-1 px-2 py-2 overflow-y-auto">
          <SidebarNav collapsed={collapsed} />
          <DarkModeToggle />
        </nav>
        {/* Mobile close button */}
        <button
          className="lg:hidden absolute top-4 right-4 z-50"
          onClick={() => setMobileOpen(false)}
          aria-label="Close sidebar"
        >
          <FiX size={24} />
        </button>
      </aside>
    </>
  );
};

export default Sidebar;