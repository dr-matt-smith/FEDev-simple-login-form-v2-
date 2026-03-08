export function load({ cookies }) {
    let username = cookies.get('username');
    let isLoggedIn = false;
    if(username){
        isLoggedIn = true;
    }
    return {
        username,
        isLoggedIn
    };
}

export const actions =  {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('username');

        cookies.set('username', username, { path: '/' });
    }
};
