import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./auth/AuthProvider";
import HomePage from "./pages/HomePage";
import CreateQuestion from "./pages/CreateQuestion";
import QuickTrainPage from "./pages/QuickTrainPage";
import ResultsPage from "./pages/ResultsPage";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/login'} element={<LoginPage/>}/>
                    <Route path={'/user'} element={<LoginPage/>}/>
                    <Route path={'/add'} element={<CreateQuestion/>}/>
                    <Route path={'/quickTrain'} element={<QuickTrainPage/>}/>
                    <Route path={'/result/:id'} element={<ResultsPage/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

