import { Client, Account, Databases, ID, Query } from 'appwrite';

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('69715cd90039d4952d91'); // Replace with your actual ID

export const account = new Account(client);
export const databases = new Databases(client);

export const TODO_CONFIG = {
    databaseId: 'todos_db',
    collectionId: 'todos',
};

export { ID, Query };