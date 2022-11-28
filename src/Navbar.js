import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as BsIcons from 'react-icons/bs'
import { IconContext } from 'react-icons/lib'
import './NavBar.css'
function Navbar() {
  const [sidebar,setSideBar] = useState(false)
  const showSideBar = () => {
    setSideBar(!sidebar)
  }
  return (
    <IconContext.Provider  value ={{color:'#fff'}}>
    <div className='navbar'>
      
      <Link to="#" className="menu-bars">
      <FaIcons.FaBars onClick={showSideBar}/>
      </Link>

    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
      
      <ul className="nav-menu-items">
   
        <li className='navbar-toggle'><Link to="#" className='menu-bars'> <AiIcons.AiOutlineClose onClick={showSideBar}/> </Link></li>
        <li className="nav-text" onClick={showSideBar}>
        <Link to='/'>
          <AiIcons.AiOutlineUser />
          <span>Users</span>
          </Link>
        </li>
        <li className="nav-text" onClick={showSideBar}>
        <Link to = "/LostPosts">
          <BsIcons.BsQuestionSquare />
          <span> Lost Posts </span>
          </Link>
        </li>
       <li className="nav-text" onClick={showSideBar}>
       <Link to = "/foundPosts">
        <AiIcons.AiOutlineFileDone />
       <span>
        Found Posts
       </span>


       </Link>
       </li>
       </ul>
    </nav>
    </div>
    </IconContext.Provider>
  )
  }

export default Navbar