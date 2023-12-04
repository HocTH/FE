import axios from "axios";

const URL_API = "http://localhost:8080/api/student-list";
const URL_API1 = "http://localhost:8080/api/student-list-teacher/";

export const findAll = async (pageNumber,searchKey) => {
    try {
        const result = await axios.get(URL_API+"?page="+pageNumber+"&find="+searchKey);
        console.log(result.data)
        return result.data;
    } catch (e) {
        console.log(e)
    }
}

export const findAllWithTeacher = async (pageNumber, teacherId, searchKey) => {
    try {
        const result = await axios.get(URL_API1+"?page="+pageNumber+"&find="+searchKey+"&teacherId="+teacherId);
        console.log(result.data)
        return result.data;
    } catch (e) {
        console.log(e)
    }
}