import { Account, Client, Databases, ID, Query } from 'appwrite';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);

export const TODO_CONFIG = {
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  collectionId: import.meta.env.VITE_APPWRITE_TODOS_COLLECTION_ID,
};

export { ID, Query };
