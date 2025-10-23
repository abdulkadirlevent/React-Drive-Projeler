
import React, { useEffect, useState, useRef } from 'react';
import { FileItem as FileItemType, FileType } from '../../types';
import Icon from '../../components/Icon';
import { usePage, useLoading } from '../../App';

const FileItemRow: React.FC<{ item: FileItemType }> = ({ item }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleAction = (action: string, item: FileItemType) => {
        alert(`'${item.name}' için "${action}" işlemi tetiklendi.`);
        setMenuOpen(false);
    };

    const getIconName = (type: FileType) => {
        switch (type) {
            case FileType.FOLDER: return 'folder';
            case FileType.IMAGE: return 'image';
            case FileType.SPREADSHEET: return 'spreadsheet';
            case FileType.DOCUMENT: return 'document';
            default: return 'document';
        }
    };
    
    const getIconColor = (type: FileType) => {
        switch (type) {
            case FileType.FOLDER: return 'text-gray-500 dark:text-gray-400';
            case FileType.IMAGE: return 'text-red-500';
            case FileType.SPREADSHEET: return 'text-green-500';
            case FileType.DOCUMENT: return 'text-blue-500';
            default: return 'text-gray-500';
        }
    }

    return (
        <tr className="border-b border-gray-200 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-150">
            <td className="px-4 py-3 text-sm font-medium flex items-center">
                <Icon name={getIconName(item.type)} className={`w-5 h-5 mr-3 ${getIconColor(item.type)}`} />
                {item.name}
            </td>
            <td className="px-4 py-3 text-sm">
                <div className="flex items-center">
                    <img src={`https://i.pravatar.cc/24?u=${item.owner}`} alt="owner" className="w-6 h-6 rounded-full mr-2" />
                    {item.owner}
                </div>
            </td>
            <td className="px-4 py-3 text-sm">{item.modified}</td>
            <td className="px-4 py-3 text-sm">{item.size || '—'}</td>
            <td className="px-4 py-3 text-sm text-center relative">
                <button 
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <Icon name="dotsVertical" className="w-5 h-5" />
                </button>
                {menuOpen && (
                    <div ref={menuRef} className="absolute right-4 top-10 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 z-10 border border-gray-200 dark:border-gray-700 text-left">
                        <button onClick={() => handleAction('Ön izleme', item)} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Icon name="preview" className="w-4 h-4 mr-3" />
                            <span>Ön izleme</span>
                        </button>
                        <button onClick={() => handleAction('Düzenle', item)} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Icon name="edit" className="w-4 h-4 mr-3" />
                            <span>Düzenle</span>
                        </button>
                         <button onClick={() => handleAction('Gönder', item)} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Icon name="send" className="w-4 h-4 mr-3" />
                            <span>Gönder</span>
                         </button>
                        <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
                        <button onClick={() => handleAction('Sil', item)} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Icon name="trash" className="w-4 h-4 mr-3" />
                            <span>Sil</span>
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
};

const FilterButton: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <button className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
        {children}
        <Icon name="chevronDown" className="w-4 h-4 ml-2" />
    </button>
);


const FileBrowser: React.FC<{ items: FileItemType[]; title: string }> = ({ items, title }) => {
    const { setTitle } = usePage();
    const { setLoading } = useLoading();

    useEffect(() => {
        setTitle(title);
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, [title, setTitle, setLoading]);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <FilterButton>Tür</FilterButton>
                    <FilterButton>Kullanıcılar</FilterButton>
                    <FilterButton>Değiştirilme</FilterButton>
                </div>
            </div>

            <div className="bg-white dark:bg-[#1f1f1f] rounded-lg">
                <table className="w-full table-auto">
                    <thead className="text-left text-xs text-gray-500 dark:text-gray-400 font-medium">
                        <tr className="border-b border-gray-200 dark:border-gray-700/50">
                            <th className="px-4 py-2">
                                <div className="flex items-center">
                                    Adı
                                    <Icon name="sortAsc" className="w-4 h-4 ml-2 rotate-180" />
                                </div>
                            </th>
                            <th className="px-4 py-2">Sahibi</th>
                            <th className="px-4 py-2">Değiştirilme tarihi</th>
                            <th className="px-4 py-2">Dosya boyutu</th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(file => (
                            <FileItemRow key={file.id} item={file} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FileBrowser;
