import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import { usePage } from '../../App';
import { getProjectById, updateProject } from '../../data';
import { Project } from '../../types';

const ProjectEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { projectId } = useParams<{ projectId: string }>();
    const { setTitle } = usePage();
    const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

    useEffect(() => {
        if (projectId) {
            const project = getProjectById(projectId);
            setProjectToEdit(project);
            setTitle(project ? `Projeyi Düzenle: ${project.name}` : 'Proje Bulunamadı');
        }
    }, [projectId, setTitle]);

    const handleSave = (data: Project) => {
        updateProject(data);
        navigate('/projects');
    };

    if (!projectToEdit) {
        return (
            <div className="text-center p-8">
                <h1 className="text-2xl font-bold">Proje Bulunamadı</h1>
                <p className="text-gray-500">Aradığınız proje mevcut değil veya silinmiş olabilir.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-6">Proje Bilgilerini Düzenle</h1>
            <ProjectForm initialData={projectToEdit} onSave={handleSave} onCancel={() => navigate('/projects')} />
        </div>
    );
};

export default ProjectEditPage;
