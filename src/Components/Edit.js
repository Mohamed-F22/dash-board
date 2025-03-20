import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

function EditCourse() {
    let endPoint = "http://localhost:9000/courses";
    let { courseId } = useParams();
    let navigate = useNavigate();
    let [course, setCourse] = useState({ title: "", category: "", instructor: "", time: 0, description: "" });

    useEffect(() => {
        fetch(`${endPoint}/${courseId}`)
            .then(res => res.json())
            .then(data => setCourse(data));
    }, []);

    function handleChange(e) {
        setCourse({ ...course, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`${endPoint}/${courseId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(course)
        }).then(() => navigate(`/courses`));
    }

    // Using react bootstrap Form
    return (
        <div className="edit">
        <Container>
            <h1 className="mb-4">Edit Course</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={course.title}
                        onChange={handleChange} 
                        required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        value={course.category}
                        onChange={handleChange}
                        required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Instructor</Form.Label>
                    <Form.Control
                        type="text"
                        name="instructor"
                        value={course.instructor}
                        onChange={handleChange}
                        required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Time (minutes)</Form.Label>
                    <Form.Control
                        type="number"
                        name="time"
                        value={course.time}
                        onChange={handleChange}
                        required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={course.description}
                        onChange={handleChange}
                        required />
                </Form.Group>
                <Button variant="primary" type="submit">Save Changes</Button>
            </Form>
        </Container>
        </div>
    );
}

export default EditCourse;
