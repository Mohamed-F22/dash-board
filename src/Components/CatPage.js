import { faGear } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect } from "react"
import { useState } from "react"
import { Table, Button, Container } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import Swal from "sweetalert2"

function Category () {
    let [courses, setCourses] = useState([])
    let endPoint = "http://localhost:9000/courses";
    // let endPoint = "https://my-json-server.typicode.com/Mohamed-F22/DB/courses";
    let param = useParams()

    // useEffect runs on first load and when param changes
    useEffect (() => {
        getAllCourses()
    }, [param])

    // Function for getting products
    let getAllCourses = () => {
        fetch(endPoint)
        .then(res => res.json())
        .then(data => {
            let catCourses = data.filter((course) => course.category === param.cat)
            setCourses(catCourses)
        })
    }
    
    // Function for deleting
    let deleteCourse = (course) => {
        // swal for making sure of deleting
        Swal.fire({
            title: `Are you sure of deleting ${course.title}?`,
            showCancelButton: true
        })
        .then ((data) => {
            if (data.isConfirmed) {
                fetch(`${endPoint}/${course.id}`, {
                    method: "DELETE"
                })
                .then(res => res.json())
                .then(data => getAllCourses())
            }
        })
    }

    // Function for toggle menu at small screans
    function toggle () {
        let spans = document.querySelectorAll(".options span")
        spans.forEach (span => {
            span.addEventListener("click", (event) => {
                document.querySelectorAll("ul").forEach((ul) => ul.classList.remove("active"))
                let list = event.target.parentElement.querySelector("ul")
                if (list.classList.contains("active")) {
                    list.classList.remove("active")
                } else {
                    list.classList.add("active")
                }
            })
        })
    }

    return (
        <div className="courses">
            <Container>
            <h1>Our courses</h1>
            <span>{param.cat}</span>
            {courses.length > 0 ?  <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Tilte</th>
                                <th>Category</th>
                                <th>Instractor</th>
                                <th className="time">Time</th>
                                <th><span>Options</span> <FontAwesomeIcon icon={faGear} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map (course => {
                                // Time in hours and minuets
                                let hours = Math.round(course.time/60)
                                let minuets = course.time%60
                                return (
                                    <tr key={course.id}>
                                        <td>{course.title}</td>
                                        <td>{course.category}</td>
                                        <td>{course.instructor}</td>
                                        <td className="d-block">{hours} : {minuets}</td>
                                        <td className="options">
                                            <Button><Link to={`/courses/${course.id}`}>Details</Link></Button>
                                            <Button variant="secondary"><Link to={`/courses/edit/${course.id}`}>Edit</Link></Button>
                                            <Button variant="danger" onClick={() => deleteCourse(course)}>Delete</Button>
                                            <ul className="ul">
                                                <li><Link to={`/courses/${course.id}`}>Details</Link></li>
                                                <li><Link to={`/courses/edit/${course.id}`}>Edit</Link></li>
                                                <li onClick={() => deleteCourse(course)}>Delete</li>
                                            </ul>
                                            <span onClick={() => toggle()}>...</span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table> : <p>Loading...</p>
            }
            </Container>
        </div>
    )
}

export default Category