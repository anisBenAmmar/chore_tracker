import { Route, Routes } from 'react-router-dom';
import Details from './View/Details';
import Main from './View/Main';
import Addjob from './View/Addjob'
import './App.css';
import Edit from './View/Edit';
import Register from './View/Register';
import Login from './View/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Main />} />
        <Route path="/view/:job_id" element={<Details />} />
        <Route path="/addJob" element={<Addjob />} />
        <Route path="/edit/:job_id" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
