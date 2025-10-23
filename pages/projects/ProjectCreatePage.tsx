import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import { usePage } from '../../App';
import { addProject } from '../../data';
import { Project } from '../../types';

const ProjectCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const { setTitle } = usePage();

    React.useEffect(() => {
        setTitle('Yeni Proje Oluştur');
    }, [setTitle]);

    const handleSave = (data: Omit<Project, 'id'>) => {
        addProject(data);
        navigate('/projects');
    };

    return (
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-6">Yeni Proje Bilgileri</h1>
            <ProjectForm onSave={handleSave} onCancel={() => navigate('/projects')} />
        </div>
    );
};

export default ProjectCreatePage;
