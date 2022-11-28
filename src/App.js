
import React,{useEffect,useState} from 'react';
import {BrowserRouter as Router , Switch,Route} from 'react-router-dom'
import Navbar from './Navbar';
import './App.css'
import Table from './Table';
import {db} from './firebase-config'
import QuickFilteringGrid from './TableM';
import { collection, getDocs,setDoc} from "firebase/firestore";

function App() {

  const [na,setna] = useState('')
  const [Users,setUsers] = useState(null)
  
 
  
// access the db collection
const getFirestoreData = async () => {
  // log each doc
}
useEffect(()=> {
  getDocs(collection(db, "Users"))
  .then((data)=>{ 
    const NewState = [];
    data.forEach((doc) => {
    NewState.push({id:doc.id, ...doc.data()})
    console.log(doc)
})
console.log(NewState)
    setUsers(NewState)

})},[]);
   



  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path='/'>
       
        {//Users.map((user) =>(
          //<div key={user.id}>{user.Fname}</div>
        /*))*/} 
        <QuickFilteringGrid dataA={Users}/>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
