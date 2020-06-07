import { createStudent, updateStudent, deleteStudent } from "../graphql/mutations";

export async function createStudentProxy(amplify, teacherId, name, note) {
    if (teacherId && name) {
        return amplify.API.graphql(
            amplify.graphqlOperation(createStudent, {
                input: {
                    studentTeacherId: teacherId,
                    name: name,
                    note: note || ''
                }
            })
        )
            .then(res => {
                return res.data.createStudent;
            })
            .catch(e => {
                console.error(e);
            });
    } else {
        console.error("Invalid argumnets: " + arguments);
    }
}

export async function updateStudentProxy(amplify, id, name, note) {
    if (id && name) {
        return amplify.API.graphql(
            amplify.graphqlOperation(updateStudent, {
                input: {
                    id: id,
                    name: name,
                    note: note || ''
                }
            })
        )
            .then(res => {
                return res.data.updateStudent;
            })
            .catch(e => {
                console.error(e);
            });
    } else {
        console.error("Invalid argumnets: " + arguments);
    }
}

export async function deleteStudentProxy(amplify, id) {
    return amplify.API.graphql(
        amplify.graphqlOperation(deleteStudent, {
            input: {
                id: id
            }
        })
    )
        .then(res => {
            return res.data.deleteStudent;
        })
        .catch(e => {
            console.error(e);
        });
}