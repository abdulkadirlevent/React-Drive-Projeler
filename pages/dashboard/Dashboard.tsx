
import React, { useEffect, useState } from 'react';
import { usePage, useLoading, useSearch } from '../../App';
import Icon from '../../components/Icon';
import { getProjects } from '../../data';
import { Project, ProjectStatus } from '../../types';
import { Link } from 'react-router-dom';

const StatCard: React.FC<{ icon: string; label: string; value: string; color: string; }> = ({ icon, label, value, color }) => (
    <div className="bg-white dark:bg-gray-800/50 p-4 rounded-xl shadow-md flex items-center transition-transform hover:scale-105 duration-300">
        <div className={`p-3 rounded-full mr-4 ${color}`}>
            <Icon name={icon} className="w-6 h-6 text-white" />
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{value}</p>
        </div>
    </div>
);

const QuickActionLink: React.FC<{ icon: string; label: string; to: string; }> = ({ icon, label, to }) => (
    <Link to={to} className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-800/50 rounded-xl shadow-md hover:bg-gray-200 dark:hover:bg-gray-700/60 transition-all duration-300 hover:shadow-lg">
        <Icon name={icon} className="w-8 h-8 text-blue-500 mb-2" />
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</span>
    </Link>
);

const Dashboard: React.FC = () => {
    const { setTitle } = usePage();
    const { setLoading } = useLoading();
    const { setPlaceholder, setSearchQuery } = useSearch();
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        setTitle('Gösterge Paneli');
        setPlaceholder('Projelerde arayın...');
        setSearchQuery('');
        setLoading(true);
        setProjects(getProjects());
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, [setTitle, setLoading, setPlaceholder, setSearchQuery]);
    
    const activeProjects = projects.filter(p => p.status === ProjectStatus.ACTIVE);
    const completedProjectsCount = projects.filter(p => p.status === ProjectStatus.COMPLETED).length;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Hoş geldin, Abdulkadir!</h1>
                <p className="text-gray-500 dark:text-gray-400">İşte projelerine hızlı bir bakış.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon="briefcase" label="Toplam Proje" value={projects.length.toString()} color="bg-blue-500" />
                <StatCard icon="folder-open" label="Aktif Projeler" value={activeProjects.length.toString()} color="bg-green-500" />
                <StatCard icon="clipboard-list" label="Tamamlananlar" value={completedProjectsCount.toString()} color="bg-indigo-500" />
                <StatCard icon="shared" label="Paylaşılanlar" value="3" color="bg-yellow-500" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold mb-4">Aktif Projeler</h2>
                    <div className="space-y-4">
                        {activeProjects.map(project => (
                            <Link to={`/projects/${project.id}`} key={project.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50">
                                <div className="flex items-center">
                                    <Icon name="briefcase" className="w-6 h-6 mr-4 text-blue-500" />
                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-gray-200">{project.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{project.description.substring(0, 50)}...</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(project.dueDate).toLocaleDateString('tr-TR')}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                     <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-bold mb-4">Hızlı Erişim</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <QuickActionLink icon="plus" label="Yeni Proje" to="/projects/new" />
                            <QuickActionLink icon="clipboard-list" label="Yeni Görev" to="/tasks/new"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
