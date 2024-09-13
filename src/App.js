import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./components/HomePage";

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowDetails from "./components/ShowDetails";
import Navbar from "./components/Navbar";



function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shows/:id" element={<ShowDetails />} />  {/* Show details page */}
            </Routes>
        </Router>
    );
}

export default App;
