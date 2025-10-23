
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePage, useLoading } from '../../App';
import { Project, TodoItem, Product, Expense, Payment, PaymentStatus } from '../../types';
import { 
    getProjectById, 
    getTodosByProjectId, 
    getProductsByProjectId, 
    getExpensesByProjectId, 
    getPaymentsByProjectId,
    updateTodo
} from '../../data';
import Icon from '../../components/Icon';

type ActiveTab = 'tasks' | 'products' | 'expenses' | 'payments';

const ProjectDetailPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const { setTitle } = usePage();
    const { setLoading } = useLoading();

    const [project, setProject] = useState<Project | null>(null);
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [activeTab, setActiveTab] = useState<ActiveTab>('tasks');

    const loadData = useCallback(() => {
        if (!projectId) return;
        setLoading(true);
        const currentProject = getProjectById(projectId);
        setProject(currentProject);

        if (currentProject) {
            setTitle(currentProject.name);
            setTodos(getTodosByProjectId(projectId));
            setProducts(getProductsByProjectId(projectId));
            setExpenses(getExpensesByProjectId(projectId));
            setPayments(getPaymentsByProjectId(projectId));
        } else {
            setTitle("Proje Bulunamadı");
        }
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, [projectId, setTitle, setLoading]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleToggleTodo = (todo: TodoItem) => {
        const updatedTodo = { ...todo, completed: !todo.completed };
        updateTodo(updatedTodo);
        setTodos(getTodosByProjectId(projectId!)); // Refresh from store
    };

    if (!project) {
        return (
            <div className="text-center p-8">
                <h1 className="text-2xl font-bold">Proje Bulunamadı</h1>
                <p className="text-gray-500">Aradığınız proje mevcut değil veya silinmiş olabilir.</p>
            </div>
        );
    }

    const tabs: { id: ActiveTab; label: string; icon: string; }[] = [
        { id: 'tasks', label: 'Görevler', icon: 'clipboard-list' },
        { id: 'products', label: 'Ürünler', icon: 'briefcase' },
        { id: 'expenses', label: 'Masraflar', icon: 'dollar' },
        { id: 'payments', label: 'Ödemeler', icon: 'receipt' },
    ];

    return (
        <div className="space-y-6">
            <div className="p-6 bg-white dark:bg-gray-800/50 rounded-xl shadow-md flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                {project.imageUrl && (
                    <img src={project.imageUrl} alt={project.name} className="w-full md:w-48 md:h-36 object-cover rounded-lg flex-shrink-0" />
                )}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{project.name}</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">{project.description}</p>
                </div>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {tabs.map(tab => (
                         <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`${
                                activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
                            } flex items-center whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors`}
                        >
                            <Icon name={tab.icon} className="w-5 h-5 mr-2" />
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800/50 rounded-xl shadow-md">
                {activeTab === 'tasks' && <TabContentList type="tasks" items={todos} onToggle={handleToggleTodo} projectId={projectId!} />}
                {activeTab === 'products' && <TabContentList type="products" items={products} projectId={projectId!} />}
                {activeTab === 'expenses' && <TabContentList type="expenses" items={expenses} projectId={projectId!} />}
                {activeTab === 'payments' && <TabContentList type="payments" items={payments} projectId={projectId!} />}
            </div>
        </div>
    );
};

const TabContentList: React.FC<{type: ActiveTab, items: any[], projectId: string, onToggle?: (item: any) => void}> = ({ type, items, projectId, onToggle }) => {
    
    const renderItem = (item: any) => {
        switch(type) {
            case 'tasks':
                return (
                    <div className="flex items-center">
                         <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => onToggle && onToggle(item)}
                            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
                        />
                        <span className={`ml-3 flex-grow ${item.completed ? 'line-through text-gray-500' : ''}`}>{item.text}</span>
                    </div>
                );
            case 'products':
                return (
                     <div className="flex items-center">
                        {item.imageUrl && (
                            <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-4 flex-shrink-0" />
                        )}
                        <div>
                            <p>{item.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Miktar: {item.quantity}, Fiyat: {item.price.toFixed(2)}₺</p>
                        </div>
                    </div>
                );
            case 'expenses':
                return <>{item.description} - Tutar: {item.amount.toFixed(2)}₺ ({item.category})</>;
            case 'payments':
                return <>{item.description} - Tutar: {item.amount.toFixed(2)}₺ - <span className={`font-semibold ${item.status === PaymentStatus.PAID ? 'text-green-600' : 'text-yellow-600'}`}>{item.status}</span></>;
        }
    }

    // `tasks` -> `task`, `expenses` -> `expense`
    const itemPath = type.endsWith('s') ? type.slice(0, -1) : type;

    return (
        <div>
            <div className="flex justify-end mb-4">
                 <Link to={`/${type}/new?projectId=${projectId}`} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                    <Icon name="plus" className="w-5 h-5 mr-2" />
                    Yeni Ekle
                </Link>
            </div>
            <div className="space-y-2">
                {items.length > 0 ? items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 flex-grow">{renderItem(item)}</div>
                        {type !== 'tasks' && (
                          <Link to={`/${type}/${item.id}/edit`} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ml-4 flex-shrink-0" title="Düzenle">
                              <Icon name="edit" className="w-4 h-4" />
                          </Link>
                        )}
                    </div>
                )) : <p className="text-center text-gray-500 py-8">Henüz kayıt eklenmemiş.</p>}
            </div>
        </div>
    )
}


export default ProjectDetailPage;
