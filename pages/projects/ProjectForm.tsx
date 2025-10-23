import React, { useState, useEffect } from 'react';
import { Project, ProjectStatus } from '../../types';

interface ProjectFormProps {
    initialData?: Project;
    onSave: (data: any) => void;
    onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: ProjectStatus.ACTIVE,
        dueDate: '',
        imageUrl: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                description: initialData.description,
                status: initialData.status,
                // Ensure date is in YYYY-MM-DD for the input
                dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : '',
                imageUrl: initialData.imageUrl || '',
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...initialData, ...formData });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Proje Adı</label>
                <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
             <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Açıklama</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} required className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Resim URL'si</label>
                <input id="imageUrl" name="imageUrl" type="text" placeholder="https://example.com/image.png" value={formData.imageUrl} onChange={handleChange} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                 {formData.imageUrl && (
                    <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">Resim Önizlemesi:</p>
                        <img src={formData.imageUrl} alt="Proje Önizlemesi" className="w-full h-48 object-cover rounded-lg border dark:border-gray-600" onError={(e) => e.currentTarget.style.display = 'none'} onLoad={(e) => e.currentTarget.style.display = 'block'} />
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Durum</label>
                    <select id="status" name="status" value={formData.status} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {Object.values(ProjectStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bitiş Tarihi</label>
                    <input id="dueDate" name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
            </div>
             <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">İptal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Kaydet</button>
            </div>
        </form>
    );
};

export default ProjectForm;