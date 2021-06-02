import axios from 'axios';

import * as c from '../Constants';

export async function postAttendance(data){
    try{
        let res = await axios.post(c.ATTENDANCE, data);
        // console.log(data);
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function detailAttendance(attendanceId,data){
    try{
        let res = await axios.get(`${c.GET_DETAIL_ATTENDANCE}/${attendanceId}`, data);

        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function reportAttendance(employeeId,data){
    try{
        let res = await axios.get(`${c.GET_REPORT_ATTENDANCE}/${employeeId}`, data);

        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export function handler(err) {
    let error = err;

    if (err.response && err.response.data.hasOwnProperty("message"))
        error = err.response.data;
    else if (!err.hasOwnProperty("message")) error = err.toJSON();

    return new Error(error.message);
}

export async function getListAttendances(){
    try{
        let res = await axios.get(`${c.GET_LIST_ATTENDANCES}`);
        return res.data;
    }catch (e) {
        throw handler(e);
    }
}