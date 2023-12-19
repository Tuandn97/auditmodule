import './App.css';
import 'boxicons/css/boxicons.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Member from "./pages/member/Member";
import Audit from "./pages/audit/Audit";
import Note from "./pages/note/Note";


function App() {
  return (
    <BrowserRouter>
        <Routes>
            < Route path='/' element = {<AppLayout/>}>
                <Route path = '' element  = {<Dashboard/>}/>
                <Route path = '/dashboard' element  = {<Dashboard/>}/>
                <Route path = '/note' element = {<Note/>}/>
                <Route path = '/audit' element = {<Audit/>}/>
                <Route path = '/member' element = {<Member/>}/>
            </Route>
        </Routes>

    </BrowserRouter>
  );
}

export default App;
