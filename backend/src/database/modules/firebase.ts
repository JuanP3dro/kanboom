import * as admin from 'firebase-admin';

const serviceAccount = require('./keyFirebase.json');
 // Caminho para o arquivo de credenciais do Firebase
 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'kanbam-backend.appspot.com/', // Substitua com a URL do seu banco de dados do Firebase
});

export const bucket = admin.storage().bucket();