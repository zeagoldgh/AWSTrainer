import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./auth/AuthProvider";
import HomePage from "./pages/HomePage";
import Heading from "./components/Common/Heading";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Heading/>
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/login'} element={<LoginPage/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

