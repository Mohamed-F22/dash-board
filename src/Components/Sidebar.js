import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { faAnglesRight, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Sidebar () {
    let [cats , setCats] = useState([])
    let endPoint = "http://localhost:9000/courses";
    // let endPoint = "https://my-json-server.typicode.com/Mohamed-F22/DB/courses";

    useEffect (() => {
        fetch(endPoint)
        .then(res => res.json())
        .then(data => {
            // getting categories from data without repetition
            let catArray = [...new Set(data.map(course => course.category))];
            setCats(catArray);
        })
    },[])


    let secondaryList = document.querySelector(".secondary-list")
    function toggle () {
        if (secondaryList.classList.contains("active")) {
            secondaryList.classList.remove("active")
        } else {
            secondaryList.classList.add("active")
        }
    }

    function toggle () {
        let side = document.querySelector(".sidebar-column")
        if (side.classList.contains("active")) {
            side.classList.remove("active")
        } else {
            side.classList.add ("active")
        }
    }

    return (
        <div className="sidebar">
            <ul className="list-unstyled ms-2">
                <li className="main"><Link to="/courses">All Courses</Link></li>
                <li className="main"><Link to="/add-course">Add Course</Link></li>
                <li className="main"><div className="toggle" onClick={() => toggle()}>Categories <FontAwesomeIcon className="ms-2" icon={faAnglesRight} /></div>
                    <ul className="list-unstyled text-light active secondary-list">
                        {
                            cats.map (cat => {
                                return <li className="second" key={cat}><Link to={`/category/${cat}`}>{cat}</Link></li>
                            })
                        }
                    </ul>
                </li>
            </ul>
            <div className="sitting-toggle" onClick={() => toggle()}><FontAwesomeIcon icon={faBars} /></div>
        </div>
    )
}

export default Sidebar;