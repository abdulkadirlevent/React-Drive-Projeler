
import React, { useState, useEffect, useMemo } from 'react';
import { usePage, useLoading, useSearch } from '../../App';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { getProducts, deleteProduct, getProjects } from '../../data';
import Icon from '../../components/Icon';

const ITEMS_PER_PAGE = 10;

const ProductListPage: React.FC = () => {
    const { setTitle } = usePage();
    const { setLoading } = useLoading();
    const { searchQuery, setPlaceholder, setSearchQuery } = useSearch();
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState<Product[]>([]);

    const projectMap = useMemo(() => new Map(getProjects().map(p => [p.id, p.name])), []);

    useEffect(() => {
        setTitle("Tüm Ürünler");
        setPlaceholder("Ürünlerde arayın...");
        setLoading(true);
        setProducts(getProducts());
        const timer = setTimeout(() => setLoading(false), 500);
        
        return () => {
            clearTimeout(timer);
            setSearchQuery('');
        };
    }, [setTitle, setLoading, setPlaceholder, setSearchQuery]);
    
    const handleDelete = (id: string) => {
        if (window.confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
            deleteProduct(id);
            setProducts(getProducts());
        }
    };

    const filteredProducts = useMemo(() => {
        if (!searchQuery) return products;
        return products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.supplier.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [products, searchQuery]);
    
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);
    
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-end mb-4">
                 <Link to="/products/new" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                    <Icon name="plus" className="w-5 h-5 mr-2" />
                    Yeni Ürün Ekle
                </Link>
            </div>
            <div className="bg-white dark:bg-[#1f1f1f] rounded-lg shadow-md overflow-hidden">
                <table className="w-full table-auto">
                    <thead className="text-left text-xs text-gray-500 dark:text-gray-400 font-medium bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th className="px-4 py-3">Ürün</th>
                            <th className="px-4 py-3">Proje</th>
                            <th className="px-4 py-3">Miktar</th>
                            <th className="px-4 py-3">Birim Fiyat</th>
                            <th className="px-4 py-3">Tedarikçi</th>
                            <th className="px-4 py-3 text-center">Aksiyonlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item: Product) => (
                            <tr key={item.id} className="border-b border-gray-200 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-800/50 text-sm">
                                <td className="px-4 py-3">
                                    <div className="flex items-center">
                                        <img 
                                            src={item.imageUrl || 'https://via.placeholder.com/64?text=Ürün'} 
                                            alt={item.name} 
                                            className="w-12 h-12 object-cover rounded-md mr-4 flex-shrink-0"
                                        />
                                        <span>{item.name}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3"><Link to={`/projects/${item.projectId}`} className="hover:underline text-blue-600 dark:text-blue-400">{projectMap.get(item.projectId)}</Link></td>
                                <td className="px-4 py-3">{item.quantity}</td>
                                <td className="px-4 py-3">{item.price.toFixed(2)} ₺</td>
                                <td className="px-4 py-3">{item.supplier}</td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex items-center justify-center space-x-2">
                                        <Link to={`/products/${item.id}/edit`} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" title="Düzenle"><Icon name="edit" className="w-5 h-5" /></Link>
                                        <button onClick={() => handleDelete(item.id)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" title="Sil"><Icon name="trash" className="w-5 h-5 text-red-500" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredProducts.length === 0 && <p className="text-center text-gray-500 py-8">{searchQuery ? 'Arama kriterlerine uygun ürün bulunamadı.' : 'Gösterilecek ürün bulunamadı.'}</p>}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4 px-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        Toplam {filteredProducts.length} kayıttan {filteredProducts.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, filteredProducts.length)} arası gösteriliyor.
                    </span>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">Önceki</button>
                        <span className="text-sm font-medium">Sayfa {currentPage} / {totalPages}</span>
                        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">Sonraki</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductListPage;
