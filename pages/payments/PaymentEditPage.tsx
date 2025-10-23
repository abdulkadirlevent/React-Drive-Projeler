import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PaymentForm from './PaymentForm';
import { usePage } from '../../App';
import { getPaymentById, updatePayment } from '../../data';
import { Payment } from '../../types';

const PaymentEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { paymentId } = useParams<{ paymentId: string }>();
    const { setTitle } = usePage();
    const [itemToEdit, setItemToEdit] = useState<Payment|null>(null);

    useEffect(() => {
        if(paymentId) {
            const item = getPaymentById(paymentId);
            setItemToEdit(item);
            setTitle(item ? `Ödemeyi Düzenle` : 'Ödeme Bulunamadı');
        }
    }, [paymentId, setTitle]);

    const handleSave = (data: Payment) => {
        updatePayment(data);
        navigate(data.projectId ? `/projects/${data.projectId}` : '/payments');
    };

    if (!itemToEdit) {
        return <div className="text-center p-8"><h1 className="text-2xl font-bold">Ödeme Bulunamadı</h1></div>;
    }

    return (
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-6">Ödemeyi Düzenle</h1>
            <PaymentForm 
                initialData={itemToEdit} 
                onSave={handleSave} 
                onCancel={() => navigate(itemToEdit.projectId ? `/projects/${itemToEdit.projectId}` : '/payments')} 
            />
        </div>
    );
};

export default PaymentEditPage;
