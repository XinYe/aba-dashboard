import { getStudent, listActivitys } from "../graphql/queries";
import { createRecord, updateRecord, deleteRecord, createActivity } from "../graphql/mutations";

export async function getStudentProxy(amplify, id) {
    if (id) {
        return amplify.API.graphql(
            amplify.graphqlOperation(getStudent, {
                id: id
            })
        )
            .then(res => {
                return res.data.getStudent;
            })
            .catch(e => {
                console.error(e);
            });
    } else {
        console.error("Invalid argumnets: " + arguments);
    }
}

export async function createRecordProxy(amplify, studentId, skillId, note) {
    if (studentId) {
        return amplify.API.graphql(
            amplify.graphqlOperation(createRecord, {
                input: {
                    recordStudentId: studentId,
                    skillId: skillId,
                    note: note || ''
                }
            })
        )
            .then(res => {
                return res.data.createRecord;
            })
            .catch(e => {
                console.error(e);
            });
    } else {
        console.error("Invalid argumnets: " + arguments);
    }
}

export async function updateRecordProxy(amplify, id, note) {
    if (id) {
        return amplify.API.graphql(
            amplify.graphqlOperation(updateRecord, {
                input: {
                    id: id,
                    note: note || ''
                }
            })
        )
            .then(res => {
                return res.data.updateRecord;
            })
            .catch(e => {
                console.error(e);
            });
    } else {
        console.error("Invalid argumnets: " + arguments);
    }
}

export async function deleteRecordProxy(amplify, id) {
    return amplify.API.graphql(
        amplify.graphqlOperation(deleteRecord, {
            input: {
                id: id
            }
        })
    )
        .then(res => {
            return res.data.deleteRecord;
        })
        .catch(e => {
            console.error(e);
        });
}

export async function createActivityProxy(amplify, recordId, datetime, rate, note) {
    if (recordId) {
        return amplify.API.graphql(
            amplify.graphqlOperation(createActivity, {
                input: {
                    recordId: recordId,
                    datetime: datetime,
                    rate: rate,
                    note: note || ''
                }
            })
        )
            .then(res => {
                return res.data.createActivity;
            })
            .catch(e => {
                console.error(e);
            });
    } else {
        console.error("Invalid argumnets: " + arguments);
    }
}

export async function getActivitiesByRecordIdProxy(amplify, recordId) {
    if (recordId) {
        return amplify.API.graphql(
            amplify.graphqlOperation(listActivitys, {
                filter: {
                    recordId: {
                        eq: recordId
                    }
                }
            })
        ).then(res => {
            return res.data.listActivitys.items;
        }).catch(e => {
            console.error(e);
        });

        // // do not work locally!!!
        // return amplify.API.graphql(
        //     amplify.graphqlOperation(getActivitiesByRecordId, {
        //         recordId: recordId
        //     })
        // )
        //     .then(res => {
        //         return res.data.getActivitiesByRecordId.items;
        //     })
        //     .catch(e => {
        //         console.error(e);
        //     });
    } else {
        console.error("Invalid argumnets: " + arguments);
    }
}