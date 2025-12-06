'use client';

import {
  addDoc,
  collection,
  FieldValue,
  serverTimestamp,
  type Firestore,
} from 'firebase/firestore';
import { type Message } from './schemas';
import { errorEmitter } from '@/firebase/error-emitter';
import {
  FirestorePermissionError,
} from '@/firebase/errors';

export function createMessage(
  db: Firestore,
  userId: string,
  messageData: Message
): Promise<void> {
  const { message } = messageData;

  const data: {
    userId: string;
    content: string;
    createdAt: FieldValue;
  } = {
    userId,
    content: message,
    createdAt: serverTimestamp(),
  };

  // Save to the public 'messages' collection
  const messagesCollection = collection(db, 'messages');

  return addDoc(messagesCollection, data)
    .then(() => {}) // Prevent returning the DocumentReference to the client
    .catch((serverError) => {
      const permissionError = new FirestorePermissionError({
        path: messagesCollection.path,
        operation: 'create',
        requestResourceData: data,
      });
      errorEmitter.emit('permission-error', permissionError);
      throw serverError; // re-throw to allow the form to handle it
    });
}
