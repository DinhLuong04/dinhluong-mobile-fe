// src/main.tsx  ← SỬA THEO V1: import từ '@twind/core'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Import đúng cho v1 (không phải 'twind')
import { install } from '@twind/core';  // 'install' thay vì 'setup' (tương đương)
import config from './twind.config.ts';
import "./assets/variables.css";
install({
  ...config,
  hash: false, 
})  // Setup một lần, không cần Provider
import {BrowserRouter} from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    
  </React.StrictMode>
);