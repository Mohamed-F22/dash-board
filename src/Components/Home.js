import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"

function Home () {
    return (
        <div className="home">
            <div>
                <h1>Hello admin</h1>
                <Button><Link to="/add-Course" className="text-light">Add New Course</Link></Button>
            </div>
        </div>
    )
}

export default Home