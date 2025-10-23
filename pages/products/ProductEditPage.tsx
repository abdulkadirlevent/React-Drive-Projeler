import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from './ProductForm';
import { usePage } from '../../App';
import { getProductById, updateProduct } from '../../data';
import { Product } from '../../types';

const ProductEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { productId } = useParams<{ productId: string }>();
    const { setTitle } = usePage();
    const [itemToEdit, setItemToEdit] = useState<Product | null>(null);

    useEffect(() => {
        if (productId) {
            const item = getProductById(productId);
            setItemToEdit(item);
            setTitle(item ? `Ürünü Düzenle: ${item.name}` : 'Ürün Bulunamadı');
        }
    }, [productId, setTitle]);

    const handleSave = (data: Product) => {
        updateProduct(data);
        navigate(data.projectId ? `/projects/${data.projectId}` : '/products');
    };

    if (!itemToEdit) {
        return <div className="text-center p-8"><h1 className="text-2xl font-bold">Ürün Bulunamadı</h1></div>;
    }

    return (
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-6">Ürünü Düzenle</h1>
            <ProductForm 
                initialData={itemToEdit} 
                onSave={handleSave} 
                onCancel={() => navigate(itemToEdit.projectId ? `/projects/${itemToEdit.projectId}` : '/products')} 
            />
        </div>
    );
};

export default ProductEditPage;
