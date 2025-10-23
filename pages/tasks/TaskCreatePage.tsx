import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TaskForm from './TaskForm';
import { usePage } from '../../App';
import { addTodo } from '../../data';
import { TodoItem } from '../../types';

const TaskCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { setTitle } = usePage();

    const projectId = searchParams.get('projectId');

    React.useEffect(() => {
        setTitle('Yeni Görev Oluştur');
    }, [setTitle]);

    const handleSave = (data: Omit<TodoItem, 'id'>) => {
        addTodo(data);
        navigate(data.projectId ? `/projects/${data.projectId}` : '/tasks');
    };

    return (
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-6">Yeni Görev Bilgileri</h1>
            <TaskForm 
                onSave={handleSave} 
                onCancel={() => navigate(projectId ? `/projects/${projectId}` : '/tasks')} 
                initialData={{ projectId: projectId || '' }}
            />
        </div>
    );
};

export default TaskCreatePage;
