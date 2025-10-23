import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductForm from './ProductForm';
import { usePage } from '../../App';
import { addProduct } from '../../data';
import { Product } from '../../types';

const ProductCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { setTitle } = usePage();

    const projectId = searchParams.get('projectId');

    React.useEffect(() => {
        setTitle('Yeni Ürün Ekle');
    }, [setTitle]);

    const handleSave = (data: Omit<Product, 'id'>) => {
        addProduct(data);
        navigate(data.projectId ? `/projects/${data.projectId}` : '/products');
    };

    return (
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-6">Yeni Ürün Bilgileri</h1>
            <ProductForm 
                onSave={handleSave} 
                onCancel={() => navigate(projectId ? `/projects/${projectId}` : '/products')} 
                initialData={{ projectId: projectId || '' }}
            />
        </div>
    );
};

export default ProductCreatePage;
