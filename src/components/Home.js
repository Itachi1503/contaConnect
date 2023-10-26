import React from 'react'
import { Link } from 'react-router-dom';
import './Home.css'
import Phone from './phone.png'
export default function Home() {
  return (
    <div >
      <div className='wrapper'>
          <div className="card">
            <img src={Phone} alt="" className='phone-img' />
            <div className="name">
            <h1 className='logo-heading'>ContaConnect..</h1>
            <p className='tagline'>my contact book</p>
            </div>
            
            <Link to="/contacts" className='btn'>Open</Link>
          </div>
      </div>
    </div>
  )
}
