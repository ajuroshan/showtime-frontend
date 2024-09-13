import Navbar from "./Navbar";
import ShowList from "./ShowList";

const HomePage = () => {
    return (
        <div className="App " style={{backgroundColor: '#0A1627'}}>
            <Navbar/>
            {/*<SearchComponent/>*/}
            <ShowList/>
        </div>
    );
};

export default HomePage;
