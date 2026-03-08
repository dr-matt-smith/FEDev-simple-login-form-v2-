export function load({ cookies }) {
    cookies.delete('username',  { path: '/' });

    return {
        success: true,
    };
}
