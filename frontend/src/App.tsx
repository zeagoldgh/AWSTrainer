import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ExamplePage from "./ExamplePage";
import TestPage from "./TestPage";

export default function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<ExamplePage/>}/>
                <Route path={'/testme'} element={<TestPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

