export function load({ cookies }) {
    let username = cookies.get('username');
    return {
        username
    };
}

export const actions =  {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('username');

        cookies.set('username', username, { path: '/' });

        return {
            success: true,
        };
    }
};
