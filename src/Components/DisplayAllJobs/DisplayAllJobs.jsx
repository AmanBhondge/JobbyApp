import React from 'react'
import { FaStar } from "react-icons/fa";
import "./DisplayAllJobs.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaBriefcase } from "react-icons/fa6";
import { Link } from 'react-router-dom';


function DisplayAllJobs(props) {
    const { jobItem } = props;
    const { id, title, rating, company_logo_url, location, job_description, employment_type, package_per_annum } = jobItem;

    return (
        <Link to={`/jobs/${id}`} style={{textDecoration:"none"}}>
            <li className="diplay-jobs-card">

                <div className="logo-rating-cont">
                    <img src={company_logo_url} style={{ width: "70px" }} />

                    <div className="title-rating-cont">
                        <h3>{title}</h3>
                        <FaStar style={{ color: "gold", marginRight: "5px" }} />
                        <span>{rating}</span>
                    </div>

                </div>
                <div className='mid-cont'>
                    <div>
                        <FaLocationDot />
                        <span style={{ marginRight: "10px", marginLeft: "5px" }}>{location}</span>
                        <FaBriefcase />
                        <span style={{ marginRight: "10px", marginLeft: "5px" }}>{employment_type}</span>

                    </div>
                    <div><h4>{package_per_annum}</h4></div>

                </div>
                <div style={{ marginTop: "10px" }}><h4>Description</h4>
                    <span>{job_description}</span></div>


            </li>
        </Link>

    )
}


export default DisplayAllJobs;
