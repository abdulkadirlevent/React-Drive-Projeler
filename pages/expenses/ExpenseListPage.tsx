
import React, { useState, useEffect, useMemo } from 'react';
import { usePage, useLoading, useSearch } from '../../App';
import { Link } from 'react-router-dom';
import { Expense } from '../../types';
import { getExpenses, deleteExpense, getProjects } from '../../data';
import Icon from '../../components/Icon';

const ITEMS_PER_PAGE = 10;

const ExpenseListPage: React.FC = () => {
    const { setTitle } = usePage();
    const { setLoading } = useLoading();
    const { searchQuery, setPlaceholder, setSearchQuery } = useSearch();
    const [currentPage, setCurrentPage] = useState(1);
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const projectMap = useMemo(() => new Map(getProjects().map(p => [p.id, p.name])), []);

    useEffect(() => {
        setTitle("Tüm Masraflar");
        setPlaceholder("Masraflarda arayın...");
        setLoading(true);
        setExpenses(getExpenses());
        const timer = setTimeout(() => setLoading(false), 500);
        
        return () => {
            clearTimeout(timer);
            setSearchQuery('');
        };
    }, [setTitle, setLoading, setPlaceholder, setSearchQuery]);
    
    const handleDelete = (id: string) => {
        if (window.confirm("Bu masrafı silmek istediğinizden emin misiniz?")) {
            deleteExpense(id);
            setExpenses(getExpenses());
        }
    };

    const filteredExpenses = useMemo(() => {
        if (!searchQuery) return expenses;
        return expenses.filter(expense =>
            expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            expense.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [expenses, searchQuery]);

    const totalPages = Math.ceil(filteredExpenses.length / ITEMS_PER_PAGE);

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);
    
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = filteredExpenses.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-end mb-4">
                 <Link to="/expenses/new" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                    <Icon name="plus" className="w-5 h-5 mr-2" />
                    Yeni Masraf Ekle
                </Link>
            </div>
            <div className="bg-white dark:bg-[#1f1f1f] rounded-lg shadow-md overflow-hidden">
                <table className="w-full table-auto">
                    <thead className="text-left text-xs text-gray-500 dark:text-gray-400 font-medium bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th className="px-4 py-3">Açıklama</th>
                            <th className="px-4 py-3">Proje</th>
                            <th className="px-4 py-3">Tutar</th>
                            <th className="px-4 py-3">Kategori</th>
                            <th className="px-4 py-3">Tarih</th>
                            <th className="px-4 py-3 text-center">Aksiyonlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item: Expense) => (
                            <tr key={item.id} className="border-b border-gray-200 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-800/50 text-sm">
                                <td className="px-4 py-3">{item.description}</td>
                                <td className="px-4 py-3"><Link to={`/projects/${item.projectId}`} className="hover:underline text-blue-600 dark:text-blue-400">{projectMap.get(item.projectId)}</Link></td>
                                <td className="px-4 py-3">{item.amount.toFixed(2)} ₺</td>
                                <td className="px-4 py-3">{item.category}</td>
                                <td className="px-4 py-3">{new Date(item.date).toLocaleDateString('tr-TR')}</td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex items-center justify-center space-x-2">
                                        <Link to={`/expenses/${item.id}/edit`} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" title="Düzenle"><Icon name="edit" className="w-5 h-5" /></Link>
                                        <button onClick={() => handleDelete(item.id)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" title="Sil"><Icon name="trash" className="w-5 h-5 text-red-500" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredExpenses.length === 0 && <p className="text-center text-gray-500 py-8">{searchQuery ? 'Arama kriterlerine uygun masraf bulunamadı.' : 'Gösterilecek masraf bulunamadı.'}</p>}
            </div>

             {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4 px-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        Toplam {filteredExpenses.length} kayıttan {filteredExpenses.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, filteredExpenses.length)} arası gösteriliyor.
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

export default ExpenseListPage;
