import { Col, Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddCourse from './Components/AddCourse';
import Category from './Components/CatPage';
import Courses from './Components/Courses';
import Details from './Components/Details';
import EditCourse from './Components/Edit';
import Home from './Components/Home';
import MyNavbar from './Components/NavBar';
import Sidebar from './Components/Sidebar';

function App() {
  return (
    <div className="App">
      <MyNavbar/>
      <Row>
        <Col xs={6} md={3} lg={2} className="sidebar-column">
          <Sidebar/>
        </Col>
        <Col xs={12} md={9} lg={10} className="pe-0">
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/courses' element={<Courses/>} />
            <Route path='/add-course' element={<AddCourse/>} />
            <Route path='/courses/:courseId' element={<Details/>} />
            <Route path='/courses/edit/:courseId' element={<EditCourse/>} />
            <Route path='/category/:cat' element={<Category/>} />
          </Routes>
        </Col>
      </Row>
    </div>
  );
}

export default App;
