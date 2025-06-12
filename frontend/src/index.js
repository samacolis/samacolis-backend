import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 1️⃣ Import du CSS de React-Toastify
import 'react-toastify/dist/ReactToastify.css';

// 2️⃣ Import de ToastContainer
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* 3️⃣ Place ToastContainer ici, une seule fois pour toute l'app */}
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnHover
      draggable
      pauseOnFocusLoss
    />
  </React.StrictMode>
);
