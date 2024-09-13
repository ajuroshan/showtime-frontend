import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./components/HomePage";

import './App.css';
import ShowList from "./components/ShowList";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./components/Navbar";
import SearchComponent from "./components/SearchComponent";

function App() {
    return (

        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/*<Route path="/shows/:id" element={<ShowDetails />} />  /!* Show details page *!/*/}
            </Routes>
        </Router>
    );
}

export default App;
