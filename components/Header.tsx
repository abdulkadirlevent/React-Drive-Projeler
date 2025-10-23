
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { useTheme, usePage, useSidebar, useSearch } from '../App';

const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { title } = usePage();
    const { toggleSidebar } = useSidebar();
    const { searchQuery, setSearchQuery, placeholder } = useSearch();
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <header className="flex items-center justify-between h-16 px-6 flex-shrink-0">
            <div className="flex items-center text-xl font-medium text-gray-800 dark:text-gray-200">
                 <button
                    onClick={toggleSidebar}
                    className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors md:hidden"
                    aria-label="Menüyü aç/kapa"
                >
                    <Icon name="menu" className="w-6 h-6" />
                </button>
                <span>{title}</span>
            </div>
            <div className="flex-1 max-w-2xl mx-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <Icon name="search" className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        type="search"
                        placeholder={placeholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full py-2.5 pl-12 pr-4 bg-gray-200/80 dark:bg-[#191919] border border-transparent dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                     <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <Icon name="filter" className="w-5 h-5 text-gray-500" />
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                     {theme === 'light' ? <Icon name="moon" /> : <Icon name="sun" />}
                </button>
                <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <Icon name="help" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <Icon name="settings" />
                </button>
                 <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <Icon name="apps" />
                </button>
                <div className="relative" ref={profileMenuRef}>
                    <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="w-8 h-8 rounded-full">
                        <img src="https://picsum.photos/id/237/32/32" alt="Profil" className="w-full h-full object-cover rounded-full" />
                    </button>
                    {profileMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 z-10 border border-gray-200 dark:border-gray-700">
                            <Link to="/profile" onClick={() => setProfileMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Profil</Link>
                            <Link to="/settings" onClick={() => setProfileMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Ayarlar</Link>
                            <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Çıkış Yap</a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
