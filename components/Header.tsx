
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
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

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
    
    useEffect(() => {
        if (isMobileSearchOpen && searchInputRef.current) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100); // For transition
        }
    }, [isMobileSearchOpen]);


    return (
        <header className="flex items-center justify-between h-16 px-4 md:px-6 flex-shrink-0">
           
            {/* --- Normal Header Content --- */}
            <div className={`flex-1 flex items-center justify-between ${isMobileSearchOpen ? 'hidden' : 'flex'} md:flex`}>
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
                
                <div className="hidden md:flex flex-1 max-w-2xl mx-6">
                    <div className="relative w-full">
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
                    <button
                        onClick={() => setIsMobileSearchOpen(true)}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors md:hidden"
                        aria-label="Ara"
                    >
                        <Icon name="search" className="w-5 h-5" />
                    </button>

                    <div className="hidden md:flex items-center space-x-2">
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Temayı değiştir">
                            {theme === 'light' ? <Icon name="moon" /> : <Icon name="sun" />}
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Yardım">
                            <Icon name="help" />
                        </button>
                        <Link to="/settings" className="hidden lg:inline-flex p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Ayarlar">
                            <Icon name="settings" />
                        </Link>
                        <button className="hidden lg:inline-flex p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Uygulamalar">
                           <Icon name="apps" />
                       </button>
                    </div>
                    
                    <div className="relative" ref={profileMenuRef}>
                        <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="w-8 h-8 rounded-full" aria-label="Profil menüsü">
                            <img src="https://picsum.photos/id/237/32/32" alt="Profil" className="w-full h-full object-cover rounded-full" />
                        </button>
                        {profileMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 z-10 border border-gray-200 dark:border-gray-700 animate-fade-in-down">
                                <button onClick={() => { toggleTheme(); setProfileMenuOpen(false); }} className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden">
                                    {theme === 'light' ? <Icon name="moon" className="w-5 h-5 mr-3" /> : <Icon name="sun" className="w-5 h-5 mr-3" />}
                                    <span>{theme === 'light' ? 'Karanlık Tema' : 'Aydınlık Tema'}</span>
                                </button>
                                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden">
                                    <Icon name="help" className="w-5 h-5 mr-3" />
                                    <span>Yardım</span>
                                </button>
                                <Link to="/settings" onClick={() => setProfileMenuOpen(false)} className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden">
                                    <Icon name="settings" className="w-5 h-5 mr-3" />
                                    <span>Ayarlar</span>
                                </Link>
                                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden">
                                    <Icon name="apps" className="w-5 h-5 mr-3" />
                                    <span>Uygulamalar</span>
                                </button>
                                <div className="border-t border-gray-200 dark:border-gray-600 my-1 lg:hidden"></div>
                                <Link to="/profile" onClick={() => setProfileMenuOpen(false)} className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <Icon name="user" className="w-5 h-5 mr-3" />
                                    <span>Profilim</span>
                                </Link>
                                <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
                                <a href="#" className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <Icon name="logout" className="w-5 h-5 mr-3" />
                                    <span>Oturumu Kapat</span>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- Mobile Search Bar --- */}
            <div className={`w-full ${isMobileSearchOpen ? 'flex' : 'hidden'} md:hidden animate-fade-in-down`}>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <Icon name="search" className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        ref={searchInputRef}
                        type="search"
                        placeholder={placeholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 py-2.5 pl-12 pr-10 bg-gray-200/80 dark:bg-[#191919] border border-transparent dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                    />
                    <button
                        onClick={() => setIsMobileSearchOpen(false)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        aria-label="Aramayı kapat"
                    >
                        <Icon name="x" className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;