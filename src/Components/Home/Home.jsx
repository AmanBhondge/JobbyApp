import React from 'react'
import './Home.css'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Header />
      <div className="home-small">
        <div style={{padding:"20px"}}><h1 className='home-heading'>Find The Job That Fits Your Life</h1>
        <p>Millions of people are searching for jobs, sallry, information, company reviews.
          Find the jobs that firts your ability and your potential</p>
        <Link to="/jobs">
          <button className='btn btn-primary home-btn'>Find Jobs</button>
        </Link></div>
      </div>
      <div className="home-large">

      </div>
    </div>
  )
}

export default Home;