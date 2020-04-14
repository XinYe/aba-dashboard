import { getUser, getUserByEmail } from "../store/graphql/queries";
import { createUser } from "../graphql/mutations";

export async function getUserProxy(amplify, id) {
    if (id) {
        return amplify.API.graphql(
            amplify.graphqlOperation(getUser, {
                id: id
            })
        )
            .then(res => {
                return res.data.getUser;
            })
            .catch(e => {
                console.error(e);
            });
    } else {
        console.error("Invalid argumnets: " + arguments);
    }
}

export async function getUserByEmailProxy(amplify, email) {
    if (email) {
        return amplify.API.graphql(
            amplify.graphqlOperation(getUserByEmail, {
                email: email
            })
        )
            .then(res => {
                const resultItems = res.data.getUserByEmail.items;
                if (resultItems.length > 0) {
                    return resultItems[0];
                } else {
                    console.error(`Failed to getUserByEmail ${email}`);
                }
            })
            .catch(e => {
                console.error(e);
            });
    } else {
        console.error("Invalid argumnets: " + arguments);
    }
}

export async function createUserProxy(amplify, email, name, role) {
    if (email && name && role) {
        return amplify.API.graphql(
            amplify.graphqlOperation(createUser, {
                input: {
                    email: email,
                    name: name,
                    role: role
                }
            })
        )
            .then(res => {
                return res.data.createUser;
            })
            .catch(e => {
                console.error(e);
            });
    } else {
        console.error("Invalid argumnets: " + arguments);
    }
}

// tbd, delete user
