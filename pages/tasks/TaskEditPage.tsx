import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from './TaskForm';
import { usePage } from '../../App';
import { getTodoById, updateTodo } from '../../data';
import { TodoItem } from '../../types';

const TaskEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { taskId } = useParams<{ taskId: string }>();
    const { setTitle } = usePage();
    const [itemToEdit, setItemToEdit] = useState<TodoItem | null>(null);


    useEffect(() => {
        if (taskId) {
            const item = getTodoById(taskId);
            setItemToEdit(item);
            setTitle(item ? `Görevi Düzenle` : 'Görev Bulunamadı');
        }
    }, [taskId, setTitle]);

    const handleSave = (data: TodoItem) => {
        updateTodo(data);
        navigate(data.projectId ? `/projects/${data.projectId}` : '/tasks');
    };

    if (!itemToEdit) {
        return (
            <div className="text-center p-8">
                <h1 className="text-2xl font-bold">Görev Bulunamadı</h1>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-6">Görevi Düzenle</h1>
            <TaskForm 
                initialData={itemToEdit} 
                onSave={handleSave} 
                onCancel={() => navigate(itemToEdit.projectId ? `/projects/${itemToEdit.projectId}` : '/tasks')} 
            />
        </div>
    );
};

export default TaskEditPage;
