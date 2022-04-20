import './App.css';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import {Routes, Route, Navigate} from "react-router-dom";


const ProtectedRoute = ({children}) =>{
  
  if(!window.localStorage.getItem("token")){
    return <Navigate to="/login" />
  }

  return children
}

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/login' element={<Login/>} />
        <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      </Routes>
    </div>
  );
}

export default App;
