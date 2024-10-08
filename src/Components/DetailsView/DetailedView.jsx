import React, { useState, useEffect } from "react";
import "./DetailedView.css";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { FaStar, FaExternalLinkAlt } from "react-icons/fa";
import { FaLocationDot, FaBriefcase } from "react-icons/fa6";
import Header from "../Header/Header";

const DetailedView = () => {
  const { id } = useParams();
  const token = Cookies.get("jwtToken");

  const [allDetails, setDetails] = useState(
    {
      jobDetail: null,
      error: null,
      isLoading: true
    });

  useEffect(() => {
    const fetchJobDetails = async () => {
      const api = `https://apis.ccbp.in/jobs/${id}`;

      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(api, options);
        const data = await response.json();
        if (response.ok === true) {
          setDetails({ jobDetail: data.job_details, error: null, isLoading: false });
          console.log(data.job_details)
        } else {
          setDetails({ jobDetail: null, error: "Failed to fetch job details", isLoading: false });
        }
      } catch (error) {
        setDetails({ jobDetail: null, error: "Failed to fetch job details", isLoading: false });
      }

    };
    fetchJobDetails();
  }, [id, token]);

  if (allDetails.isLoading) {
    return <div>Loading...</div>;
  }

  if (allDetails.error) {
    return <div>{allDetails.error}</div>;
  }

  const {
    company_logo_url,
    title,
    company_website_url,
    employment_type,
    job_description,
    life_at_company,
    location,
    package_per_annum,
    rating,
    skills,
  } = allDetails.jobDetail;
  const { description, image_url } = life_at_company;

  return (
    <>
      <Header />
      <div className="container">
        <div className="dl-cont">
          <div className="img-other-detail-cont">
            <img src={company_logo_url} alt="" className="detail-cont-img" />
            <div className="dl-title-rating">
              <h1>{title}</h1>
              <h3 className="rating-dl">
                <FaStar className="mr-2" /> {rating}
              </h3>
            </div>
          </div>

          <div className="dl-lc-et-pkg">
            <div className="lc-et">
              <span className="lc">
                <FaLocationDot className="mr-2" /> {location}
              </span>
              <span className="et">
                <FaBriefcase className="mr-2" /> {employment_type}
              </span>
            </div>
            <h3>{package_per_annum}</h3>
          </div>
          <br />
          <div className="visit">
            <h5>Description</h5>
            <h5><a href={company_website_url}>Visit <span><FaExternalLinkAlt /></span></a></h5>
          </div>
          <p>{job_description}</p>

          <h5>Skills</h5>
          <ul className="skill-ullist">
            {
              skills.map((skill, index) => {
                return (
                  <li key={index} className="skill-list">
                    <span><img src={skill.image_url} alt="" /></span>
                    <h6>{skill.name}</h6>
                  </li>
                );
              })
            }
          </ul>

          <h5>Life at Company</h5>
          <div className="life-at-cy">
            <p>{description}</p>
            <img src={image_url} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedView;