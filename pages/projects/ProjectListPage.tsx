
import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Project, ProjectStatus } from '../../types';
import { getProjects, deleteProject } from '../../data';
import Icon from '../../components/Icon';
import { usePage, useLoading, useSearch } from '../../App';

const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
        case ProjectStatus.ACTIVE:
            return <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">{status}</span>;
        case ProjectStatus.COMPLETED:
            return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200">{status}</span>;
        case ProjectStatus.ON_HOLD:
            return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full dark:bg-yellow-900 dark:text-yellow-200">{status}</span>;
        default:
            return <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-200">{status}</span>;
    }
};

const ProjectListPage: React.FC = () => {
    const { setTitle } = usePage();
    const { setLoading } = useLoading();
    const { searchQuery, setPlaceholder, setSearchQuery } = useSearch();
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        setTitle("Projelerim");
        setPlaceholder("Projelerde arayın...");
        setLoading(true);
        setProjects(getProjects());
        const timer = setTimeout(() => setLoading(false), 500);
        
        return () => {
            clearTimeout(timer);
            setSearchQuery('');
        };
    }, [setTitle, setLoading, setPlaceholder, setSearchQuery]);

    const handleDelete = (projectId: string) => {
        if (window.confirm("Bu projeyi ve ilişkili tüm görev, masraf vb. öğeleri silmek istediğinizden emin misiniz?")) {
            deleteProject(projectId);
            setProjects(getProjects()); // Refresh list from store
        }
    };

    const filteredProjects = useMemo(() => {
        if (!searchQuery) {
            return projects;
        }
        return projects.filter(project =>
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [projects, searchQuery]);

    return (
        <div className="w-full">
            <div className="flex items-center justify-end mb-4">
                <Link to="/projects/new" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                    <Icon name="plus" className="w-5 h-5 mr-2" />
                    Yeni Proje Ekle
                </Link>
            </div>

            <div className="bg-white dark:bg-[#1f1f1f] rounded-lg shadow-md overflow-hidden">
                <table className="w-full table-auto">
                    <thead className="text-left text-xs text-gray-500 dark:text-gray-400 font-medium bg-gray-50 dark:bg-gray-800">
                        <tr className="border-b border-gray-200 dark:border-gray-700/50">
                            <th className="px-4 py-3">Proje</th>
                            <th className="px-4 py-3">Durum</th>
                            <th className="px-4 py-3">Bitiş Tarihi</th>
                            <th className="px-4 py-3 text-center">Aksiyonlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProjects.map(project => (
                             <tr key={project.id} className="border-b border-gray-200 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-150">
                                <td className="px-4 py-3 text-sm font-medium">
                                     <Link to={`/projects/${project.id}`} className="flex items-center text-left group">
                                        <img 
                                            src={project.imageUrl || 'https://via.placeholder.com/80x60?text=Proje'} 
                                            alt={project.name} 
                                            className="w-20 h-15 object-cover rounded-md mr-4 flex-shrink-0"
                                        />
                                        <div>
                                            <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.name}</span>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">{project.description.substring(0, 40)}...</p>
                                        </div>
                                    </Link>
                                </td>
                                <td className="px-4 py-3 text-sm">{getStatusBadge(project.status)}</td>
                                <td className="px-4 py-3 text-sm">{new Date(project.dueDate).toLocaleDateString('tr-TR')}</td>
                                <td className="px-4 py-3 text-sm text-center">
                                    <div className="flex items-center justify-center space-x-2">
                                        <Link to={`/projects/${project.id}/edit`} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" title="Düzenle">
                                            <Icon name="edit" className="w-5 h-5" />
                                        </Link>
                                        <button onClick={() => handleDelete(project.id)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" title="Sil">
                                            <Icon name="trash" className="w-5 h-5 text-red-500" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredProjects.length === 0 && <p className="text-center text-gray-500 py-8">{searchQuery ? 'Arama kriterlerine uygun proje bulunamadı.' : 'Gösterilecek proje bulunamadı.'}</p>}
            </div>
        </div>
    );
};

export default ProjectListPage;
