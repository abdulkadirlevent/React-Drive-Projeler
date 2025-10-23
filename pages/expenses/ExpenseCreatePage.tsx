import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';
import { usePage } from '../../App';
import { addExpense } from '../../data';
import { Expense } from '../../types';

const ExpenseCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { setTitle } = usePage();

    const projectId = searchParams.get('projectId');

    React.useEffect(() => {
        setTitle('Yeni Masraf Ekle');
    }, [setTitle]);

    const handleSave = (data: Omit<Expense, 'id'>) => {
        addExpense(data);
        navigate(data.projectId ? `/projects/${data.projectId}` : '/expenses');
    };

    return (
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-6">Yeni Masraf Bilgileri</h1>
            <ExpenseForm 
                onSave={handleSave} 
                onCancel={() => navigate(projectId ? `/projects/${projectId}` : '/expenses')} 
                initialData={{ projectId: projectId || '' }}
            />
        </div>
    );
};

export default ExpenseCreatePage;
