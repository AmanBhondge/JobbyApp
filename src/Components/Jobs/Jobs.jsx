import React, { useEffect, useState } from 'react';
import "./Jobs.css";
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import DisplayAllJobs from '../DisplayAllJobs/DisplayAllJobs';
import FilterSection from '../FilterSection/FilterSection';

const Jobs = () => {

  const [allValues, setValues] = useState(
    {
      jobsArr: [],
      showLoader: false,
      emptypeList: [],
      minPakage: "",
      userinput: ""
    }
  );

  const token = Cookies.get("jwtToken");
  useEffect(() => {

    const ApiCalling = async () => {

      const { emptypeList, minPakage, userinput } = allValues;

      setValues({ ...allValues, showLoader: true });

      const api = `https://apis.ccbp.in/jobs?employment_type=${emptypeList}&minimum_package=${minPakage}&search=${userinput}`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const response = await fetch(api, options);
        const data = await response.json();
        console.log(data.jobs);

        if (response.ok === true) {
          setValues({ ...allValues, jobsArr: data.jobs, showLoader: false });
        }

      } catch (error) {
        console.log(error);

      }

    };
    ApiCalling();

  }, [allValues.userinput, allValues.emptypeList, allValues.minPakage])

  const searchbox = (e) => {

    if (e.key === "Enter") {
      setValues({ ...allValues, userinput: e.target.value });
    }
  };


  const onChangeEmpType = (value, check) => {
    if (check === true) {
      setValues({ ...allValues, emptypeList: [...allValues.emptypeList, value] })
    }
    else {
      setValues({ ...allValues, emptypeList: [...allValues.emptypeList.filter(each => each !== value)] });
    }

  }

  const onChangeMinPakage = (value) => {

    setValues({ ...allValues, minPakage: value })

  }

  return (
    <div>
      <Header />
      <div className="jobs-cont">
        <div className="jobs-filter">
          <FilterSection changeEmpType={onChangeEmpType} ChangeMinPakage={onChangeMinPakage} />
        </div>
        <ul className="jobs-search">

          <div className='search-bar-cont'>
            <input className="form-control search-bar " onKeyUp={searchbox} type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-primary mybtn "  type="submit">Search</button>
          </div>

          {allValues.showLoader ? (
            <div className="spinner-border text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )
            : (
              allValues.jobsArr.map(each => <DisplayAllJobs key={each.id} jobItem={each} />)
            )}
        </ul>
      </div>

    </div>
  )
}

export default Jobs;