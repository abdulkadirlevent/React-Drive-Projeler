
import React, { useEffect } from 'react';
import { usePage, useLoading, useSearch } from '../../App';

const ProfilePage: React.FC = () => {
  const { setTitle } = usePage();
  const { setLoading } = useLoading();
  const { setPlaceholder, setSearchQuery } = useSearch();

  useEffect(() => {
    setTitle('Profilim');
    setPlaceholder('Projelerde arayın...');
    setSearchQuery('');
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [setTitle, setLoading, setPlaceholder, setSearchQuery]);

  return (
    <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Profilim</h1>
      <div className="flex items-center space-x-6">
        <img
          src="https://picsum.photos/id/237/128/128"
          alt="Profil Fotoğrafı"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Abdulkadir</h2>
          <p className="text-gray-500 dark:text-gray-400">abdulkadir@example.com</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Profili Düzenle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
