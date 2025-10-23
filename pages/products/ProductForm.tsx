import React, { useState, useEffect } from 'react';
import { Product, Project } from '../../types';
import { getProjects } from '../../data';

interface ProductFormProps {
    initialData?: Partial<Product>;
    onSave: (data: any) => void;
    onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        quantity: initialData?.quantity || 1,
        price: initialData?.price || 0,
        supplier: initialData?.supplier || '',
        projectId: initialData?.projectId || '',
        imageUrl: initialData?.imageUrl || '',
    });
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        setProjects(getProjects());
        if (initialData) {
             setFormData(prev => ({
                ...prev,
                name: initialData.name || '',
                quantity: initialData.quantity || 1,
                price: initialData.price || 0,
                supplier: initialData.supplier || '',
                projectId: initialData.projectId || '',
                imageUrl: initialData.imageUrl || '',
             }));
        }
    }, [initialData]);

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
            <InputField name="name" label="Ürün Adı" value={formData.name} onChange={handleChange} required />
            <SelectField name="projectId" label="Proje" value={formData.projectId} onChange={handleChange} options={projects} required />
             <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Resim URL'si</label>
                <input id="imageUrl" name="imageUrl" type="text" placeholder="https://example.com/image.png" value={formData.imageUrl} onChange={handleChange} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                 {formData.imageUrl && (
                    <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">Resim Önizlemesi:</p>
                        <img src={formData.imageUrl} alt="Ürün Önizlemesi" className="w-32 h-32 object-cover rounded-lg border dark:border-gray-600" onError={(e) => e.currentTarget.style.display = 'none'} onLoad={(e) => e.currentTarget.style.display = 'block'}/>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField name="quantity" label="Miktar" type="number" value={formData.quantity} onChange={handleChange} required />
                <InputField name="price" label="Birim Fiyat (₺)" type="number" value={formData.price} onChange={handleChange} step="0.01" required />
                <InputField name="supplier" label="Tedarikçi" value={formData.supplier} onChange={handleChange} />
            </div>
            
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


export default ProductForm;