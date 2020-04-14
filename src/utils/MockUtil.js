import Principals from '../mock/principals.json';
import Mentors from '../mock/mentors.json';
import Teachers from '../mock/teachers.json';
import Students from '../mock/students.json';

export function getPrincipals() {
    return Principals.items;
}

export function getMentors() {
    return Mentors.items;
}

export function getTeachers() {
    return Teachers.items;
}

export function getStudents() {
    return Students.items;
}
