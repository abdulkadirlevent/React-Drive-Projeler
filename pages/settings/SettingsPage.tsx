
import React, { useEffect } from 'react';
import { useTheme, usePage, useLoading, useSearch } from '../../App';

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { setTitle } = usePage();
  const { setLoading } = useLoading();
  const { setPlaceholder, setSearchQuery } = useSearch();

  useEffect(() => {
    setTitle('Ayarlar');
    setPlaceholder('Projelerde arayın...');
    setSearchQuery('');
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [setTitle, setLoading, setPlaceholder, setSearchQuery]);


  return (
    <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Ayarlar</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Görünüm</h2>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-gray-600 dark:text-gray-300">Karanlık Tema</span>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Bildirimler</h2>
           <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
             Bildirim ayarları burada yer alacak.
           </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Depolama</h2>
           <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
             Depolama yönetimi seçenekleri burada yer alacak.
           </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
