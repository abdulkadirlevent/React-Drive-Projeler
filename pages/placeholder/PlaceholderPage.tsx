
import React, { useEffect } from 'react';
import { usePage, useLoading, useSearch } from '../../App';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  const { setTitle } = usePage();
  const { setLoading } = useLoading();
  const { setPlaceholder, setSearchQuery } = useSearch();

  useEffect(() => {
    setTitle(title);
    setPlaceholder('Projelerde arayın...');
    setSearchQuery('');
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [title, setTitle, setLoading, setPlaceholder, setSearchQuery]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">{title}</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">Bu sayfanın içeriği yakında eklenecektir.</p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
