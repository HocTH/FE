import {useEffect, useState} from "react";

import * as GradeService from "../service/GradeService"
import * as FacultyService from "../service/FacultyService"
import * as StudentService from "../service/StudentService"
import '../CSS/ListCSS.css'
import React from "react";
import {useNavigate} from "react-router-dom";
export const ListStudentAd = () => {
    const [students, setStudents] = useState([]);
    const [grades, setGrades] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [targetPage, setTargetPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageCount = totalPages;
    const [searchKey, setSearchKey] = useState("");
    const [searchKeyTmp, setSearchKeyTmp] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
            const fetchApi = async () => {
                try {
                    const result = await StudentService.findAll(pageNumber, searchKey)
                    setStudents(result.content);
                    setTotalPages(result.totalPages);
                    const resultGrade = await GradeService.findAll();
                    setGrades(resultGrade);
                    const resultFaculty = await FacultyService.findAll();
                    setFaculties(resultFaculty)
                } catch (error) {
                    // Handle errors from the API call
                    console.error('Error fetching data:', error);
                    // You can set students to an empty array or display an error message
                    setStudents([]);
                    setTotalPages(0);
                }
            }
            fetchApi()
        }, [pageNumber, searchKey]
    )

    const handleSearch = () => {
        setSearchKey(searchKeyTmp);
    };
    const handleOption = (e) => {
      const selectedValue = e.target.value;
      if (selectedValue==="1"){
          navigate("/add-student")
      }
        if (selectedValue==="2"){
            navigate("/add-multiple-students")
        }
    }
    return (
        <div className="container">
            <h2 className="mt-4 mb-4">Danh sách sinh viên</h2>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8">
                        <select className="btn btn-outline-success rounded-pill "
                                onChange={handleOption}
                        >
                            <option selected>Thêm mới sinh viên</option>
                            <option value="1" >
                                Thêm một sinh viên
                            </option>
                            <option value="2" >
                                Thêm nhiều sinh viên
                            </option>
                        </select>
                    </div>
                    <div className="col-4">
                        <div className="input-group mb-3 rounded-pill border p-2">
                            <input type="text" className="form-control border-0" placeholder="Tìm kiếm tên hoặc mã sinh viên "
                                   aria-label="Tìm kiếm" aria-describedby="button-addon2"
                                   value={searchKeyTmp}
                                   onChange={(e) => setSearchKeyTmp(e.target.value)}
                                   maxLength={30}
                            />
                            <button className="btn btn-outline-secondary border-0  btn-hover-none rounded-circle"
                                    type="button" id="button-addon2"
                                    onClick={handleSearch}
                            ><i className="bi bi-search"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {students.length === 0 ?
                    <h1 className="text-center">Dữ liệu không tồn tại</h1>
                    :
                    <>
                        {students.map((s, index) => (
                            <div className="col-md-3 mb-4" key={index}>
                                <div className="card">
                                    <img src={require(`../picture/${s.avatar}`)} className="card-img-top img-fluid"
                                         alt="Sinh viên 1"/>
                                    <div className="card-body">
                                        <h5 className="card-title student-name">{s.name}</h5>
                                        <p className="card-text"><b> <i className="bi bi-code-square"></i> Mã sinh
                                            viên:</b> {"MSV".concat(s.studentId.toString().padStart(4, "0"))}</p>
                                        <p className="card-text"><b><i className="bi bi-window-sidebar"></i> Lớp: </b>{
                                            grades.find((g) => String(g.gradeId) === String(s.grade.gradeId))?.name
                                        }
                                        </p>
                                        <p className="card-text"><b><i
                                            className="bi bi-envelope"></i> Email:</b> {s.email}</p>
                                        <p className="card-text"><b><i className="bi bi-phone"></i> Điện thoại:
                                        </b> {s.phone}
                                        </p>
                                        <p className="card-text"><b><i className="bi bi-collection"></i> Khoa: </b> {
                                            faculties.find((f) => String(f.facultyId) === String(s.grade.gradeId))?.name
                                        }</p>
                                    </div>
                                    <div className="card-footer">
                                        <div style={{float: 'right'}}>
                                            <button className="btn btn-danger rounded-circle"><i
                                                className="bi bi-trash"></i>
                                            </button>
                                            <button className="btn btn-success rounded-circle"><i
                                                className="bi bi-pencil"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="row justify-content-center">
                            <div className="col-7 justify-content-center">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        <li className={`page-item ${pageNumber === 0 ? "disabled" : ""}`}>
                                            <a
                                                className="page-link"
                                                href="#"
                                                aria-label="Previous"
                                                onClick={() => setPageNumber((prevPage) => {
                                                    const newPageNumber = Math.max(prevPage - 1, 0)
                                                    setTargetPage(newPageNumber);
                                                    return newPageNumber
                                                })
                                                }
                                            >
                                                <span aria-hidden="true">&laquo;</span>
                                                <span className="sr-only"></span>
                                            </a>
                                        </li>
                                        <li className="page-item">
                <span className="input-group">
                  <input
                      type="number"
                      value={targetPage + 1}
                      onChange={(e) => setTargetPage(parseInt(e.target.value, 10) - 1)}
                      className="form-control input-sm"
                      min={1}
                      max={pageCount}
                  />
                  <span className="input-group-text">/{pageCount}</span>
                  <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setPageNumber(Math.max(Math.min(targetPage, pageCount - 1), 0))}
                  >
                    Go
                  </button>
                </span>
                                        </li>
                                        <li className={`page-item ${pageNumber === totalPages - 1 ? "disabled" : ""}`}>
                                            <a
                                                className="page-link"
                                                href="#"
                                                aria-label="Next"
                                                onClick={() => setPageNumber((prevPage) => {
                                                    const newPageNumber = Math.min(prevPage + 1, totalPages - 1);
                                                    setTargetPage(newPageNumber);
                                                    return newPageNumber;
                                                })}
                                            >
                                                <span aria-hidden="true">&raquo;</span>
                                                <span className="sr-only"></span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </>

                }
            </div>
        </div>
    )
}