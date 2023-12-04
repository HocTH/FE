import logo from './logo.svg';
import './App.css';
import {ListStudentAd} from "./component/ListStudentAd";
import React from "react";
import {Route, Routes} from "react-router-dom";
import {Add} from "./component/Add";
import {AddN} from "./component/AddN";
import {ListStudentTeacher} from "./component/ListStudentTeacher";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<ListStudentAd/>}></Route>
                <Route path="/student-list-teacher" element={<ListStudentTeacher/>}></Route>
                <Route path="/add-student" element={<Add/>}></Route>
                <Route path="/add-multiple-students" element={<AddN/>}></Route>
            </Routes>
        </>
    )
}

export default App;
