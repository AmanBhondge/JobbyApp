import React, { useEffect, useState } from 'react'
import "./FilterSection.css";
import Cookies from 'js-cookie';



const FilterSection = (props) => {

  const { changeEmpType,ChangeMinPakage } = props;

  const [allValues, setvalue] = useState({
    profileDetails: {}
  })

  const token = Cookies.get("jwtToken");
  const [profileDetails, setProfileDetails] = useState({
    userDetails: {}
  });

  const employmentTypesList = [
    {
      label: 'Full Time',
      employmentTypeId: 'FULLTIME',
    },
    {
      label: 'Part Time',
      employmentTypeId: 'PARTTIME',
    },
    {
      label: 'Freelance',
      employmentTypeId: 'FREELANCE',
    },
    {
      label: 'Internship',
      employmentTypeId: 'INTERNSHIP',
    },
  ];

  const salaryRangesList = [
    {
      salaryRangeId: '1000000',
      label: '10 LPA and above',
    },
    {
      salaryRangeId: '2000000',
      label: '20 LPA and above',
    },
    {
      salaryRangeId: '3000000',
      label: '30 LPA and above',
    },
    {
      salaryRangeId: '4000000',
      label: '40 LPA and above',
    },
  ]

  useEffect(() => {
    const Apicalling = async () => {

      const api = "https://apis.ccbp.in/profile";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }

      }
      try {
        const response = await fetch(api, options);
        const data = await response.json();

        if (response.ok === true) {
          setProfileDetails({ ...profileDetails, userDetails: data.profile_details });
        }

      } catch (error) {
        console.log(error);

      }

    };
    Apicalling();

  }, [])

  const rendercheckbox = () => {

    const onChangeEmptype = (e) => {

      changeEmpType(e.target.value, e.target.checked);
      
    }

    return employmentTypesList.map(eachType => {

      return (
        <li className="fliters-list-item" key={eachType.employmentTypeId}>
          <input
            type="checkbox"
            className="checkbox-input"
            value={eachType.employmentTypeId}
            id={eachType.employmentTypeId}
            onChange={onChangeEmptype}
          />
          <label htmlFor={eachType.employmentTypeId} className="filter-label">
            {eachType.label}
          </label>
        </li>
      )
    })
  }

  const rendersalary = () => {

    const onChangeMinPakage=(e)=>{

      ChangeMinPakage(e.target.value)

    }

    return salaryRangesList.map(eachRange => {


      return (
        <li className="fliters-list-item" key={eachRange.salaryRangeId}>
          <input
            type="radio"
            className="checkbox-input"
            value={eachRange.salaryRangeId}
            name="salary ranges"
            onChange={onChangeMinPakage}
          />
          <label htmlFor={eachRange.salaryRangeId} className="filter-label">
            {eachRange.label}
          </label>
        </li>
      )
    })
  }
  return (
    <div className='main_cont'>
      <div className='profile-cont'>
        <img src={profileDetails.userDetails.profile_image_url} />
        <h1 >{profileDetails.userDetails.name}</h1>
        <p>{profileDetails.userDetails.short_bio}</p>
      </div>
      <br />
      <hr className='seperater' />
      <div >
        <h3 className="filter-heading">Type of Employment</h3>
        <ul className='checkbox.cont'>
          {rendercheckbox()}
        </ul>
      </div>
      <hr className='seperater' />
      <div>
        <h3 className="filter-heading">Salary Range</h3>
        <ul className='checkbox.cont'>
          {rendersalary()}
        </ul>

      </div>

    </div>

  )
}

export default FilterSection;