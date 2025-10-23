import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PaymentForm from './PaymentForm';
import { usePage } from '../../App';
import { addPayment } from '../../data';
import { Payment } from '../../types';

const PaymentCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { setTitle } = usePage();

    const projectId = searchParams.get('projectId');

    React.useEffect(() => {
        setTitle('Yeni Ödeme Ekle');
    }, [setTitle]);

    const handleSave = (data: Omit<Payment, 'id'>) => {
        addPayment(data);
        navigate(data.projectId ? `/projects/${data.projectId}` : '/payments');
    };

    return (
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-6">Yeni Ödeme Bilgileri</h1>
            <PaymentForm 
                onSave={handleSave} 
                onCancel={() => navigate(projectId ? `/projects/${projectId}` : '/payments')} 
                initialData={{ projectId: projectId || '' }}
            />
        </div>
    );
};

export default PaymentCreatePage;
