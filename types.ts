export enum ProjectStatus {
  ACTIVE = 'Aktif',
  COMPLETED = 'Tamamlandı',
  ON_HOLD = 'Beklemede',
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  dueDate: string;
  imageUrl?: string;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  projectId: string;
}

// Fix: Add FileType enum for use in FileBrowser component.
export enum FileType {
  FOLDER = 'FOLDER',
  IMAGE = 'IMAGE',
  SPREADSHEET = 'SPREADSHEET',
  DOCUMENT = 'DOCUMENT',
}

// Fix: Add FileItem interface for use in FileBrowser component.
export interface FileItem {
  id: string;
  name: string;
  type: FileType;
  owner: string;
  modified: string;
  size?: string;
}

export enum PaymentStatus {
  PAID = 'Ödendi',
  PENDING = 'Beklemede',
}

export interface Product {
  id: string;
  projectId: string;
  name: string;
  quantity: number;
  price: number;
  supplier: string;
  imageUrl?: string;
}

export interface Expense {
  id: string;
  projectId: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface Payment {
  id: string;
  projectId: string;
  description: string;
  amount: number;
  date: string;
  status: PaymentStatus;
}