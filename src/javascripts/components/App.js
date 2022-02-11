import React from 'react'
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min'
import RegisteredList from './RegisteredList'

export default function App() {
    
    return(
        <BrowserRouter>
            <div className='container'>
                <header>
                    <h1>User Registration: Jamison Wilkes</h1>
                </header>
                <RegisteredList/>
                <footer>&copy; All rights reserved</footer>
            </div>
        </BrowserRouter>
    )
}