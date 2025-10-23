
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Icon from './Icon';
import { useSidebar } from '../App';
import { getProjects, getTodos } from '../data';
import { ProjectStatus } from '../types';

const NavItem: React.FC<{ to: string; icon: string; text: string; onClick?: () => void; children?: React.ReactNode }> = ({ to, icon, text, onClick, children }) => (
    <NavLink
        to={to}
        onClick={onClick}
        end={to === '/'}
        className={({ isActive }) =>
            `flex items-center px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                isActive
                    ? 'bg-blue-100 dark:bg-[#a8c7fa] text-blue-700 dark:text-[#202124]'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#313235]'
            }`
        }
    >
        <Icon name={icon} className="w-5 h-5 mr-4" />
        <span className="flex-1">{text}</span>
        {children}
    </NavLink>
);

const Badge: React.FC<{ count: number }> = ({ count }) => (
    <span className="ml-2 px-2 py-0.5 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">
        {count}
    </span>
);


const Sidebar: React.FC = () => {
    const { isSidebarOpen, closeSidebar } = useSidebar();
    const location = useLocation();
    const [activeProjectsCount, setActiveProjectsCount] = useState(0);
    const [pendingTasksCount, setPendingTasksCount] = useState(0);

    useEffect(() => {
        const allProjects = getProjects();
        const activeCount = allProjects.filter(p => p.status === ProjectStatus.ACTIVE).length;
        setActiveProjectsCount(activeCount);

        const allTasks = getTodos();
        const pendingCount = allTasks.filter(t => !t.completed).length;
        setPendingTasksCount(pendingCount);
    }, [location]);


    return (
        <aside className={`fixed inset-y-0 left-0 z-30 w-64 p-4 flex flex-col bg-gray-100 dark:bg-[#282a2d] transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="mb-8">
                <Link 
                    to="/projects/new"
                    onClick={closeSidebar}
                    className="flex items-center justify-center w-auto h-12 px-5 bg-white dark:bg-[#e8eaed] dark:hover:bg-[#dadce0] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 dark:text-[#3c4043] font-semibold">
                    <Icon name="plus" className="w-6 h-6" />
                    <span className="ml-2">Yeni Proje</span>
                </Link>
            </div>

            <nav className="flex flex-col space-y-1">
                <NavItem to="/" icon="home" text="Gösterge Paneli" onClick={closeSidebar} />
                <NavItem to="/projects" icon="briefcase" text="Projelerim" onClick={closeSidebar}>
                    {activeProjectsCount > 0 && <Badge count={activeProjectsCount} />}
                </NavItem>
                <NavItem to="/tasks" icon="clipboard-list" text="Tüm Görevler" onClick={closeSidebar}>
                    {pendingTasksCount > 0 && <Badge count={pendingTasksCount} />}
                </NavItem>
                <NavItem to="/products" icon="briefcase" text="Tüm Ürünler" onClick={closeSidebar} />
                <NavItem to="/expenses" icon="dollar" text="Tüm Masraflar" onClick={closeSidebar} />
                <NavItem to="/payments" icon="receipt" text="Tüm Ödemeler" onClick={closeSidebar} />
            </nav>
            
            <div className="my-4 border-t border-gray-200 dark:border-gray-700/50"></div>
            
            <nav className="flex flex-col space-y-1">
                <NavItem to="/shared" icon="shared" text="Benimle Paylaşılanlar" onClick={closeSidebar} />
                <NavItem to="/recent" icon="recent" text="Son Aktiviteler" onClick={closeSidebar} />
                <NavItem to="/trash" icon="trash" text="Çöp Kutusu" onClick={closeSidebar} />
            </nav>
        </aside>
    );
};

export default Sidebar;
