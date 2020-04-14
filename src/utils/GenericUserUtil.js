import {
    getAdmin, getAdminByEmail,
    getPrincipal, getPrincipalByEmail,
    getMentor, getMentorByEmail,
    getTeacher, getTeacherByEmail
} from "../store/graphql/queries";
import {
    createAdmin, updateAdmin, deleteAdmin,
    createPrincipal, updatePrincipal, deletePrincipal,
    createMentor, updateMentor, deleteMentor,
    createTeacher, updateTeacher, deleteTeacher
} from "../graphql/mutations";

export async function getGenericUserProxy(role, amplify, id) {
    if (role && amplify && id) {
        return amplify.API.graphql(
            amplify.graphqlOperation(getUserFunction(role), {
                id: id
            })
        )
            .then(res => {
                return res.data[`get${toUserString(role)}`];
            })
            .catch(e => {
                console.error(e);
            });
    } else {
        console.error("Invalid argumnets: " + arguments);
    }
}

export async function getGenericUserByEmailProxy(role, amplify, email) {
    if (role && amplify && email) {
        return amplify.API.graphql(
            amplify.graphqlOperation(getUserByEmailFunction(role), {
                email: email
            })
        )
            .then(res => {
                const resultItems = res.data[`get${toUserString(role)}ByEmail`].items;
                if (resultItems.length > 0) {
                    return resultItems[0];
                } else {
                    console.error(`Failed to getUserByEmailProxy ${email}`);
                }
            })
            .catch(e => {
                console.error(e);
            });
    } else {
        console.error("Invalid argumnets: " + arguments);
    }
}

export async function createGenericUserProxy(role, amplify, email, parentId, name, note) {
    if (role && amplify && email && parentId && name) {
        const inputObject = {
            'email': email,
            'name': name,
            'note': note || ''
        };
        inputObject[`${getParentId(role)}`] = parentId;
        return amplify.API.graphql(
            amplify.graphqlOperation(createUserFunction(role), {
                input: inputObject
            })
        )
            .then(res => {
                return res.data[`create${toUserString(role)}`];
            })
            .catch(e => {
                console.error(e);
            });
    } else {
        console.error("Invalid argumnets: " + arguments);
    }
}

export async function updateGenericUserProxy(role, amplify, id, email, name, note) {
    if (role && amplify && id && email && name) {
        return amplify.API.graphql(
            amplify.graphqlOperation(updateUserFunction(role), {
                input: {
                    id: id,
                    email: email,
                    name: name,
                    note: note || ''
                }
            })
        )
            .then(res => {
                return res.data[`update${toUserString(role)}`];
            })
            .catch(e => {
                console.error(e);
            });
    } else {
        console.error("Invalid argumnets: " + arguments);
    }
}

export async function deleteGenericUserProxy(role, amplify, id) {
    if (role && amplify && id) {
        return amplify.API.graphql(
            amplify.graphqlOperation(deleteUserFunction(role), {
                input: {
                    id: id
                }
            })
        )
            .then(res => {
                return res.data[`delete${toUserString(role)}`];
            })
            .catch(e => {
                console.error(e);
            });
    }
}

function toUserString(role) {
    switch (role) {
        case 'admin':
            return 'Admin';
        case 'principal':
            return 'Principal';
        case 'mentor':
            return 'Mentor';
        case 'teacher':
            return 'Teacher';
        default:
            console.error('Invalid role to toUserString: ' + role);
            return '';
    }
}

function getParentId(role) {
    switch (role) {
        // case 'admin':
        //     console.error('No parent to getParentId for: ' + role);
        case 'principal':
            return 'principalAdminId';
        case 'mentor':
            return 'mentorPrincipalId';
        case 'teacher':
            return 'teacherMentorId';
        default:
            console.error('Invalid role to getParentId: ' + role);
    }
}

function getUserFunction(role) {
    switch (role) {
        case 'admin':
            return getAdmin;
        case 'principal':
            return getPrincipal;
        case 'mentor':
            return getMentor;
        case 'teacher':
            return getTeacher;
        default:
            console.error('Invalid role to getUserFunction: ' + role);
    }
}

function getUserByEmailFunction(role) {
    switch (role) {
        case 'admin':
            return getAdminByEmail;
        case 'principal':
            return getPrincipalByEmail;
        case 'mentor':
            return getMentorByEmail;
        case 'teacher':
            return getTeacherByEmail;
        default:
            console.error('Invalid role to getUserByEmailFunction: ' + role);
    }
}

function createUserFunction(role) {
    switch (role) {
        case 'admin':
            return createAdmin;
        case 'principal':
            return createPrincipal;
        case 'mentor':
            return createMentor;
        case 'teacher':
            return createTeacher;
        default:
            console.error('Invalid role to createUserFunction: ' + role);
    }
}

function updateUserFunction(role) {
    switch (role) {
        case 'admin':
            return updateAdmin;
        case 'principal':
            return updatePrincipal;
        case 'mentor':
            return updateMentor;
        case 'teacher':
            return updateTeacher;
        default:
            console.error('Invalid role to updateUserFunction: ' + role);
    }
}

function deleteUserFunction(role) {
    switch (role) {
        case 'admin':
            return deleteAdmin;
        case 'principal':
            return deletePrincipal;
        case 'mentor':
            return deleteMentor;
        case 'teacher':
            return deleteTeacher;
        default:
            console.error('Invalid role to deleteUserFunction: ' + role);
    }
}