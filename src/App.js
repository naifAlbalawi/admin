
import React,{useEffect,useState} from 'react';
import {BrowserRouter as Router , Switch,Route} from 'react-router-dom'
import Navbar from './Navbar';
import './App.css'
import TableFoundPosts from './TableFoundPosts';
import {db} from './firebase-config'
import TableUsers from './TableUsers';
import { collection, getDocs,setDoc} from "firebase/firestore";

function App() {

  const [na,setna] = useState('')
  const [Users,setUsers] = useState(null)
  
 
  

   



  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path='/'>
       
        <TableUsers/>
        </Route>
        <Route exact path='/LostPosts'>
        <TableFoundPosts/>
       
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
