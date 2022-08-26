import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./auth/AuthProvider";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path={'/login'} element={<LoginPage/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

