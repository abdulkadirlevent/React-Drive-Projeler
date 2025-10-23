import { Project, ProjectStatus, TodoItem, Product, Expense, Payment, PaymentStatus } from './types';

// In-memory database
let projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Yeni E-ticaret Sitesi',
    description: 'Müşteri için modern ve duyarlı bir e-ticaret platformu geliştirilecek.',
    status: ProjectStatus.ACTIVE,
    dueDate: '2024-12-25',
    imageUrl: 'https://picsum.photos/seed/ecommerce/400/300',
  },
  {
    id: 'proj-2',
    name: 'Mobil Uygulama Arayüz Tasarımı',
    description: 'iOS ve Android için kullanıcı dostu bir arayüz tasarımı yapılacak.',
    status: ProjectStatus.ACTIVE,
    dueDate: '2025-01-15',
    imageUrl: 'https://picsum.photos/seed/mobileapp/400/300',
  },
  {
    id: 'proj-3',
    name: 'CRM Sistemi Entegrasyonu',
    description: 'Mevcut CRM sisteminin yeni platforma entegrasyonu sağlanacak.',
    status: ProjectStatus.ON_HOLD,
    dueDate: '2025-02-10',
    imageUrl: 'https://picsum.photos/seed/crm/400/300',
  },
  {
    id: 'proj-4',
    name: 'Yönetim Paneli Geliştirmesi',
    description: 'Eski yönetim paneli yenilendi ve özellikler eklendi.',
    status: ProjectStatus.COMPLETED,
    dueDate: '2024-11-30',
    imageUrl: 'https://picsum.photos/seed/dashboard/400/300',
  },
];

let todos: TodoItem[] = [
  { id: 'todo-1', projectId: 'proj-1', text: 'Ana sayfa tasarımını tamamla', completed: true },
  { id: 'todo-2', projectId: 'proj-1', text: 'Ürün listeleme sayfası backend entegrasyonu', completed: false },
  { id: 'todo-3', projectId: 'proj-1', text: 'Sepet ve ödeme altyapısını kur', completed: false },
  { id: 'todo-4', projectId: 'proj-2', text: 'Wireframe çizimleri hazırla', completed: true },
  { id: 'todo-5', projectId: 'proj-2', text: 'Renk paleti ve tipografi seçimi', completed: true },
  { id: 'todo-6', projectId: 'proj-2', text: 'Giriş ve kayıt ekranlarını tasarla', completed: false },
  { id: 'todo-7', projectId: 'proj-4', text: 'Kullanıcı yönetimi modülü eklendi', completed: true },
  { id: 'todo-8', projectId: 'proj-4', text: 'Raporlama ekranları tamamlandı', completed: true },
];

let products: Product[] = [
  { id: 'prod-1', projectId: 'proj-1', name: 'Frontend Framework Lisansı', quantity: 1, price: 500, supplier: 'React Co.', imageUrl: 'https://picsum.photos/seed/license/200/200' },
  { id: 'prod-2', projectId: 'proj-1', name: 'UI Kit Aboneliği', quantity: 1, price: 250, supplier: 'DesignSys', imageUrl: 'https://picsum.photos/seed/uikit/200/200' },
  { id: 'prod-3', projectId: 'proj-2', name: 'Stok İkon Seti', quantity: 3, price: 100, supplier: 'Icons Inc.', imageUrl: 'https://picsum.photos/seed/icons/200/200' },
];

let expenses: Expense[] = [
  { id: 'exp-1', projectId: 'proj-1', description: 'Sunucu Kiralama (Aylık)', amount: 150, date: '2024-12-01', category: 'Hosting' },
  { id: 'exp-2', projectId: 'proj-1', description: 'Domain Adı Tescili', amount: 20, date: '2024-11-15', category: 'Domain' },
  { id: 'exp-3', projectId: 'proj-2', description: 'Prototipleme Aracı Aboneliği', amount: 50, date: '2024-11-20', category: 'Yazılım' },
];

let payments: Payment[] = [
  { id: 'pay-1', projectId: 'proj-1', description: 'Proje Başlangıç Ödemesi', amount: 2500, date: '2024-11-10', status: PaymentStatus.PAID },
  { id: 'pay-2', projectId: 'proj-1', description: 'İlk Aşama Teslimat Ödemesi', amount: 5000, date: '2024-12-30', status: PaymentStatus.PENDING },
  { id: 'pay-3', projectId: 'proj-2', description: 'Tasarım Onay Ödemesi', amount: 1500, date: '2024-11-25', status: PaymentStatus.PAID },
];

// --- Projects API ---
export const getProjects = () => [...projects];
export const getProjectById = (id: string) => projects.find(p => p.id === id) || null;
export const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = { id: `proj-${Date.now()}`, ...project };
    projects.unshift(newProject);
    return newProject;
};
export const updateProject = (updatedProject: Project) => {
    const index = projects.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
        projects[index] = { ...projects[index], ...updatedProject };
        return projects[index];
    }
    return null;
};
export const deleteProject = (id: string) => {
    projects = projects.filter(p => p.id !== id);
    // Also delete related items
    todos = todos.filter(t => t.projectId !== id);
    products = products.filter(p => p.projectId !== id);
    expenses = expenses.filter(e => e.projectId !== id);
    payments = payments.filter(p => p.projectId !== id);
    return true;
};

// --- Todos API ---
export const getTodos = () => [...todos];
export const getTodoById = (id: string) => todos.find(t => t.id === id) || null;
export const getTodosByProjectId = (projectId: string) => todos.filter(t => t.projectId === projectId);
export const addTodo = (todo: Omit<TodoItem, 'id'>) => {
    const newTodo: TodoItem = { id: `todo-${Date.now()}`, ...todo };
    todos.unshift(newTodo);
    return newTodo;
};
export const updateTodo = (updatedTodo: TodoItem) => {
    const index = todos.findIndex(t => t.id === updatedTodo.id);
    if (index !== -1) {
        todos[index] = { ...todos[index], ...updatedTodo };
        return todos[index];
    }
    return null;
};
export const deleteTodo = (id: string) => {
    todos = todos.filter(t => t.id !== id);
    return true;
};


// --- Products API ---
export const getProducts = () => [...products];
export const getProductById = (id: string) => products.find(p => p.id === id) || null;
export const getProductsByProjectId = (projectId: string) => products.filter(p => p.projectId === projectId);
export const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = { id: `prod-${Date.now()}`, ...product };
    products.unshift(newProduct);
    return newProduct;
};
export const updateProduct = (updatedProduct: Product) => {
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        return products[index];
    }
    return null;
};
export const deleteProduct = (id: string) => {
    products = products.filter(p => p.id !== id);
    return true;
};

// --- Expenses API ---
export const getExpenses = () => [...expenses];
export const getExpenseById = (id: string) => expenses.find(e => e.id === id) || null;
export const getExpensesByProjectId = (projectId: string) => expenses.filter(e => e.projectId === projectId);
export const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = { id: `exp-${Date.now()}`, ...expense };
    expenses.unshift(newExpense);
    return newExpense;
};
export const updateExpense = (updatedExpense: Expense) => {
    const index = expenses.findIndex(e => e.id === updatedExpense.id);
    if (index !== -1) {
        expenses[index] = { ...expenses[index], ...updatedExpense };
        return expenses[index];
    }
    return null;
};
export const deleteExpense = (id: string) => {
    expenses = expenses.filter(e => e.id !== id);
    return true;
};

// --- Payments API ---
export const getPayments = () => [...payments];
export const getPaymentById = (id: string) => payments.find(p => p.id === id) || null;
export const getPaymentsByProjectId = (projectId: string) => payments.filter(p => p.projectId === projectId);
export const addPayment = (payment: Omit<Payment, 'id'>) => {
    const newPayment: Payment = { id: `pay-${Date.now()}`, ...payment };
    payments.unshift(newPayment);
    return newPayment;
};
export const updatePayment = (updatedPayment: Payment) => {
    const index = payments.findIndex(p => p.id === updatedPayment.id);
    if (index !== -1) {
        payments[index] = { ...payments[index], ...updatedPayment };
        return payments[index];
    }
    return null;
};
export const deletePayment = (id: string) => {
    payments = payments.filter(p => p.id !== id);
    return true;
};