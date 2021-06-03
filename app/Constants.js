import React from 'react';
export const API_URL = 'http://192.168.1.13:8000/api';
export const LOGIN = `${API_URL}/login`;
export const REFRESH_TOKEN = `${API_URL}/refresh_token`;
export const USER_DETAIL = `${API_URL}/users`;
export const ATTENDANCE = `${API_URL}/attendances`;
export const GET_DETAIL_ATTENDANCE = `${API_URL}/attendances`;
export const GET_REPORT_ATTENDANCE = `${API_URL}/attendances/report`;
export const GET_LIST_ATTENDANCES = `${API_URL}/attendances`;
export const ATTENDANCE_STUDENTS = `${API_URL}/attendances/multiple_student/save`