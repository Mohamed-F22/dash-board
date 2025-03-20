import { useEffect, useState } from "react";
import { Row, Container, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

function Details () {
    let endPoint = "http://localhost:9000/courses"
    let param = useParams()
    let [course, setCourse] = useState([])

    // Fetch one product by id
    useEffect(() => {
        fetch (`${endPoint}/${param.courseId}`)
        .then (res => res.json())
        .then (data => setCourse(data))
    }, [])

    // Time in hours and minuets
    let hours = Math.round(course.time/60)
    let minuets = course.time%60

    return (
        <div>
            <Container>
                <h1 className="mb-5">{course.title}</h1>
                <Row>
                    <Col xs={12} md={4}>
                        <ul className="fs-5">
                            <li>Category : {course.category}</li>
                            <li>Instractor : {course.instractor}</li>
                            <li>Time : ({hours} : {minuets}) hours</li>
                        </ul>
                    </Col>
                    <Col xs={12} md={8}>
                        <h4>About Course</h4>
                        <p className="fs-4">{course.description}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Details