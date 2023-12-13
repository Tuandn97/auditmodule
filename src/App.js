import './App.css';
import 'boxicons/css/boxicons.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./components/pages/Dashboard";
import Member from "./components/pages/member/Member";
import Audit from "./components/pages/Audit";
import Note from "./components/pages/Note";


function App() {
  return (
    <BrowserRouter>
        <Routes>
            < Route path='/' element = {<AppLayout/>}>
                <Route index element  = {<Dashboard/>}/>
                <Route path = '/note' element = {<Note/>}/>
                <Route path = '/audit' element = {<Audit/>}/>
                <Route path = '/member' element = {<Member/>}/>
            </Route>
        </Routes>

    </BrowserRouter>
  );
}

export default App;
