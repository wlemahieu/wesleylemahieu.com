import './reset.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { createContext } from 'use-context-selector';

export const FirebaseContext = createContext<FirebaseApp | null>(null);

const firebaseConfig = {
  apiKey: 'AIzaSyB5BeJS3Vde5A8HQGHUDVKzd2SxO1WKDNk',
  authDomain: 'wesleylemahieu-com.firebaseapp.com',
  projectId: 'wesleylemahieu-com',
  storageBucket: 'wesleylemahieu-com.appspot.com',
  messagingSenderId: '92449758096',
  appId: '1:92449758096:web:5e54452786d451ccdcf115',
};

const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FirebaseContext.Provider value={app}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
);
