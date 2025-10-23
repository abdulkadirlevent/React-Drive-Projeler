import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProfilePage from './pages/profile/ProfilePage';
import SettingsPage from './pages/settings/SettingsPage';
import ProgressBar from './components/ProgressBar';
import Dashboard from './pages/dashboard/Dashboard';
import PlaceholderPage from './pages/placeholder/PlaceholderPage';

// Project Pages
import ProjectListPage from './pages/projects/ProjectListPage';
import ProjectDetailPage from './pages/projects/ProjectDetailPage';
import ProjectCreatePage from './pages/projects/ProjectCreatePage';
import ProjectEditPage from './pages/projects/ProjectEditPage';

// Task Pages
import TaskListPage from './pages/tasks/TaskListPage';
import TaskCreatePage from './pages/tasks/TaskCreatePage';
import TaskEditPage from './pages/tasks/TaskEditPage';

// Product Pages
import ProductListPage from './pages/products/ProductListPage';
import ProductCreatePage from './pages/products/ProductCreatePage';
import ProductEditPage from './pages/products/ProductEditPage';

// Expense Pages
import ExpenseListPage from './pages/expenses/ExpenseListPage';
import ExpenseCreatePage from './pages/expenses/ExpenseCreatePage';
import ExpenseEditPage from './pages/expenses/ExpenseEditPage';

// Payment Pages
import PaymentListPage from './pages/payments/PaymentListPage';
import PaymentCreatePage from './pages/payments/PaymentCreatePage';
import PaymentEditPage from './pages/payments/PaymentEditPage';


type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

interface PageContextType {
  title: string;
  setTitle: (title: string) => void;
}

interface LoadingContextType {
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;
}

interface SidebarContextType {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
}

interface SearchContextType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    placeholder: string;
    setPlaceholder: (text: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const PageContext = createContext<PageContextType | undefined>(undefined);
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);
const SearchContext = createContext<SearchContextType | undefined>(undefined);


export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const usePage = () => {
    const context = useContext(PageContext);
    if (!context) {
        throw new Error('usePage must be used within a PageProvider');
    }
    return context;
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
}

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme');
        return (savedTheme === 'dark' || savedTheme === 'light') ? savedTheme : 'dark';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

const PageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [title, setTitle] = useState("Gösterge Paneli");
    const value = useMemo(() => ({ title, setTitle }), [title]);
    return (
        <PageContext.Provider value={value}>
            {children}
        </PageContext.Provider>
    );
};

const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setLoading] = useState(false);
    const value = useMemo(() => ({ isLoading, setLoading }), [isLoading]);
    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    );
};

const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(prev => !prev);
    const closeSidebar = () => setSidebarOpen(false);
    const value = useMemo(() => ({ isSidebarOpen, toggleSidebar, closeSidebar }), [isSidebarOpen]);

    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    )
}

const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [placeholder, setPlaceholder] = useState('Projelerde arayın...');
    const value = useMemo(() => ({ searchQuery, setSearchQuery, placeholder, setPlaceholder }), [searchQuery, placeholder]);

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};


const Layout = () => {
  const { isLoading } = useLoading();
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  return (
    <div className="flex h-screen w-full bg-gray-100 dark:bg-[#282a2d] text-gray-800 dark:text-gray-200 overflow-hidden">
      {isLoading && <ProgressBar />}
       {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      <Sidebar />
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <Header />
        <main className="flex-1 bg-white dark:bg-[#191919] rounded-tl-2xl overflow-y-auto p-4 md:p-6">
          <div className={`transition-opacity duration-300 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  return (
    <ThemeProvider>
        <PageProvider>
            <LoadingProvider>
                <SidebarProvider>
                    <SearchProvider>
                        <HashRouter>
                            <Routes>
                                <Route path="/" element={<Layout />}>
                                    <Route index element={<Dashboard />} />
                                    
                                    {/* Projects */}
                                    <Route path="projects" element={<ProjectListPage />} />
                                    <Route path="projects/new" element={<ProjectCreatePage />} />
                                    <Route path="projects/:projectId" element={<ProjectDetailPage />} />
                                    <Route path="projects/:projectId/edit" element={<ProjectEditPage />} />

                                    {/* Tasks */}
                                    <Route path="tasks" element={<TaskListPage />} />
                                    <Route path="tasks/new" element={<TaskCreatePage />} />
                                    <Route path="tasks/:taskId/edit" element={<TaskEditPage />} />
                                    
                                    {/* Products */}
                                    <Route path="products" element={<ProductListPage />} />
                                    <Route path="products/new" element={<ProductCreatePage />} />
                                    <Route path="products/:productId/edit" element={<ProductEditPage />} />
                                    
                                    {/* Expenses */}
                                    <Route path="expenses" element={<ExpenseListPage />} />
                                    <Route path="expenses/new" element={<ExpenseCreatePage />} />
                                    <Route path="expenses/:expenseId/edit" element={<ExpenseEditPage />} />

                                    {/* Payments */}
                                    <Route path="payments" element={<PaymentListPage />} />
                                    <Route path="payments/new" element={<PaymentCreatePage />} />
                                    <Route path="payments/:paymentId/edit" element={<PaymentEditPage />} />

                                    {/* Other Pages */}
                                    <Route path="profile" element={<ProfilePage />} />
                                    {/* Fix: Changed _Route to Route to fix typo. */}
                                    <Route path="settings" element={<SettingsPage />} />
                                    <Route path="shared" element={<PlaceholderPage title="Benimle Paylaşılanlar" />} />
                                    <Route path="recent" element={<PlaceholderPage title="Son Aktiviteler" />} />
                                    <Route path="trash" element={<PlaceholderPage title="Çöp Kutusu" />} />
                                </Route>
                            </Routes>
                        </HashRouter>
                    </SearchProvider>
                </SidebarProvider>
            </LoadingProvider>
        </PageProvider>
    </ThemeProvider>
  );
};

export default App;