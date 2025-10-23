import React, { useState, useEffect } from 'react';
import { TodoItem, Project } from '../../types';
import { getProjects } from '../../data';

interface TaskFormProps {
    initialData?: Partial<TodoItem>;
    onSave: (data: any) => void;
    onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        text: initialData?.text || '',
        completed: initialData?.completed || false,
        projectId: initialData?.projectId || ''
    });
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        setProjects(getProjects());
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!formData.projectId) {
            alert('Lütfen bir proje seçin.');
            return;
        }
        onSave({ ...initialData, ...formData });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Görev Açıklaması</label>
                <input id="text" name="text" type="text" value={formData.text} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
                <label htmlFor="projectId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Proje</label>
                <select id="projectId" name="projectId" value={formData.projectId} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="" disabled>Proje Seçin...</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
            </div>
            <div className="flex items-center">
                <input id="completed" name="completed" type="checkbox" checked={formData.completed} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                 <label htmlFor="completed" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Tamamlandı</label>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">İptal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Kaydet</button>
            </div>
        </form>
    );
};

export default TaskForm;
