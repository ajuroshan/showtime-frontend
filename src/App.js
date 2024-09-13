import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./components/HomePage";

import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ShowDetails from "./components/ShowDetails";
import Navbar from "./components/Navbar";
import SearchComponent from "./components/SearchComponent";
import UserContext, {UserProvider} from "./components/UserContext";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
    return (
        <div style={{backgroundColor: '#0A1627', minHeight: '100vh', color: "white"}}>
            <UserProvider>
                <Router>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/shows/:id" element={<ShowDetails/>}/> {/* Show details page */}
                        <Route path="/shows/search" element={<SearchComponent/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<Signup/>}/> 
                    </Routes>
                </Router>
            </UserProvider>
        </div>

    );
}

export default App;
