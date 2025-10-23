import React, { useState, useEffect } from 'react';
import { Expense, Project } from '../../types';
import { getProjects } from '../../data';

interface ExpenseFormProps {
    initialData?: Partial<Expense>;
    onSave: (data: any) => void;
    onCancel: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        description: initialData?.description || '',
        amount: initialData?.amount || 0,
        category: initialData?.category || '',
        date: initialData?.date ? initialData.date.split('T')[0] : '',
        projectId: initialData?.projectId || ''
    });
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        setProjects(getProjects());
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isNumber = (e.target as HTMLInputElement).type === 'number';
        setFormData(prev => ({ ...prev, [name]: isNumber ? parseFloat(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!formData.projectId) { alert('Lütfen bir proje seçin.'); return; }
        onSave({ ...initialData, ...formData });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputField name="description" label="Açıklama" value={formData.description} onChange={handleChange} required />
            <SelectField name="projectId" label="Proje" value={formData.projectId} onChange={handleChange} options={projects} required />
            <InputField name="amount" label="Tutar (₺)" type="number" value={formData.amount} onChange={handleChange} step="0.01" required />
            <InputField name="category" label="Kategori" value={formData.category} onChange={handleChange} />
            <InputField name="date" label="Tarih" type="date" value={formData.date} onChange={handleChange} required />
            
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg">İptal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Kaydet</button>
            </div>
        </form>
    );
};

const InputField: React.FC<any> = ({ name, label, ...props }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input id={name} name={name} {...props} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
);

const SelectField: React.FC<any> = ({ name, label, options, ...props }) => (
     <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <select id={name} name={name} {...props} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
             <option value="" disabled>Proje Seçin...</option>
            {options.map((opt: any) => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
        </select>
    </div>
);


export default ExpenseForm;
