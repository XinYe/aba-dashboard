import { getUserByEmail } from "../store/graphql/queries";

export async function fetchUserInfo(amplify, email) {
    if (email) {
        return amplify.API.graphql(
            amplify.graphqlOperation(getUserByEmail, {
                email: email
            })
        )
            .then(res => {
                const resultItems = res.data.getUserByEmail.items;
                if (resultItems.length > 0) {
                    console.debug(`Find user info `, resultItems[0]);
                    return resultItems[0];
                } else {
                    console.error(`Failed to find user from email `, email);
                }
            })
            .catch(e => {
                console.error(`Error listing SkillSets`, e);
            });
    }
}