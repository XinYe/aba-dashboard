import Owner from '../mock/owner.json';
import Principals from '../mock/principals.json';

export function getOwner() {
    return Owner;
}

export function getPrincipals(ownerEmail) {
    return Principals.items.filter(principal => {
        return principal.invitor === ownerEmail;
    });
}

export function getMentors(principalEmail) {
    
}

export function getTeachers(mentorEmail) {

}

export function getStudents(teacherEmail) {

}

export function getSkills(studentEmail) {

}

export function getActivities(skillEmail) {

}
