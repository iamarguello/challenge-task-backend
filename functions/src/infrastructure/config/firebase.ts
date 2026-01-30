import * as admin from 'firebase-admin';

// Inicializa solo si no hay apps creadas (evita errores en Hot Reload)
if (!admin.apps.length) {
  admin.initializeApp();
}

export const db = admin.firestore();
export const auth = admin.auth();