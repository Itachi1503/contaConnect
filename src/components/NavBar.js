import React from 'react'
import './NavBar.css'
import Logo from './Logo.png'
import Search from './search.png'
import { Link } from 'react-router-dom'

export default function NavBar(props) {
 const handleSearchChange = (e)=> {
   props.onSearchChange(e.target.value);
 }

  return (
    <div>
      <div className="wrap">
        <div className="container">
           
            <div className="logo">
                <img src={Logo} alt="logo"  width={40}/>
                <Link to="/homepage" className='logo-name'>ContaConnect...</Link>
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
