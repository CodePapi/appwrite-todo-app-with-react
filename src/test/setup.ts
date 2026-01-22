import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock LocalStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
});

// Mock Appwrite module entirely to prevent network calls
vi.mock('../lib/appwrite', () => ({
  databases: {
    listDocuments: vi.fn(() => Promise.resolve({ documents: [] })),
    createDocument: vi.fn(),
    deleteDocument: vi.fn(),
    updateDocument: vi.fn(),
  },
  account: {
    get: vi.fn(),
    createEmailPasswordSession: vi.fn(),
  },
  TODO_CONFIG: { databaseId: 'db', collectionId: 'col' },
  ID: { unique: () => '123' },
  Query: {},
}));
