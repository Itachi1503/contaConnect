import React from 'react'
import './NavBar.css'
import Logo from './Logo.png'
import Search from './search.png'
import { useNavigate } from 'react-router-dom'


export default function NavBar(props) {
 const navigate = useNavigate();

 const handleSearchChange = (e)=> {
   props.onSearchChange(e.target.value);
 }

 const handleNavigation = ()=> {
  navigate("/homepage");
 }

  return (
    <div>
      <div className="wrap">
        <div className="container">
           
            <div className="logo">
                <img src={Logo} alt="logo"  width={40}/>
                <button onClick={handleNavigation} className='logo-name'>ContaConnect...</button>
            </div>
           
             <div className='search-container'>
              <input type='search'  placeholder='search contact' className='search-input' onChange={handleSearchChange}/>
              <img src={Search} alt="search-icon"  width={20} />
             </div>

             
            
            
        </div>
      </div>
    </div>
  )
}
