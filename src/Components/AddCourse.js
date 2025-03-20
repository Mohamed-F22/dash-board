import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { Container } from "react-bootstrap";

function AddCourse () {
    // Using useEstate for changing values automaticlly
    let [title, setTitle] = useState("");
    let [category, setCategory] = useState("");
    let [description, setDescription] = useState("");
    let [instractor, setInstructor] = useState("");
    let [time, setTime] = useState(0);
    let endPoint = "http://localhost:9000/courses";
    // let endPoint = "https://my-json-server.typicode.com/Mohamed-F22/DB/courses";

    // Using useNavigate for going to courses page on submit
    let navigate = useNavigate();

    let formSubmit = (e) => {
        e.preventDefault()

        // Axios is easier for post
        axios.post(endPoint, {
            title,
            category,
            description,
            instractor,
            time
        })
        .then ((data) => navigate("/courses"))
    }

    return (
        <div className="add-course">
            <Container>
                <h1>Add New course</h1>
                <form className="addForm" onSubmit={formSubmit}>
                    <div className="mb-3">
                        <label htmlFor="courseTitle" className="form-label">Title</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="courseTitle" 
                            placeholder="course title"
                            aria-describedby="course title"
                            required
                            onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="courseCategory" className="form-label">Category</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="courseCategory" 
                            placeholder="course category"
                            aria-describedby="course category"
                            required
                            onChange={(e) => setCategory(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="courseDescription" className="form-label">Description</label>
                        <input 
                            as="texteara" 
                            className="form-control" 
                            id="courseDescription" 
                            placeholder="course description"
                            aria-describedby="course description"
                            required
                            onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="courseInstructor" className="form-label">Instructor Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="courseInstructor" 
                            placeholder="course Instructor"
                            aria-describedby="course Instructor"
                            required
                            onChange={(e) => setInstructor(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="courseTime" className="form-label">Time In Minute</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            id="courseTime" 
                            placeholder="course Time"
                            aria-describedby="course Time"
                            required
                            onChange={(e) => setTime(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary">ِAdd new Course</button>
                </form>
            </Container>
        </div>
    )
}

export default AddCourse

