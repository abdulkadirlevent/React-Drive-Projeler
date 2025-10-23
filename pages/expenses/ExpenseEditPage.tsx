import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';
import { usePage } from '../../App';
import { getExpenseById, updateExpense } from '../../data';
import { Expense } from '../../types';

const ExpenseEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { expenseId } = useParams<{ expenseId: string }>();
    const { setTitle } = usePage();
    const [itemToEdit, setItemToEdit] = useState<Expense | null>(null);

    useEffect(() => {
        if(expenseId) {
            const item = getExpenseById(expenseId);
            setItemToEdit(item);
            setTitle(item ? `Masrafı Düzenle` : 'Masraf Bulunamadı');
        }
    }, [expenseId, setTitle]);

    const handleSave = (data: Expense) => {
        updateExpense(data);
        navigate(data.projectId ? `/projects/${data.projectId}` : '/expenses');
    };

    if (!itemToEdit) {
        return <div className="text-center p-8"><h1 className="text-2xl font-bold">Masraf Bulunamadı</h1></div>;
    }

    return (
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-6">Masrafı Düzenle</h1>
            <ExpenseForm 
                initialData={itemToEdit} 
                onSave={handleSave} 
                onCancel={() => navigate(itemToEdit.projectId ? `/projects/${itemToEdit.projectId}` : '/expenses')} 
            />
        </div>
    );
};

export default ExpenseEditPage;
