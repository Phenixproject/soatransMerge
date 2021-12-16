import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import './App.css';
import Login from './components/Login/Login';
import Home from './components/Home/Home';

function App() {
  return (
    <Home/>
    // <Router>
    //   <div className="container">
    //     <Routes>
    //       <Route path="/" exact component={Login}/>
    //       <Route path="/Home" exact component={Home}/>
    //     </Routes>
    //   </div>
    // </Router>
  );
}

export default App;
