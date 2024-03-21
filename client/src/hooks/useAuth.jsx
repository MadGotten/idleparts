export async function getUser(){
    const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/users/authenticate`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        mode: 'cors',
        credentials: 'include',
    })
    
    const user = await response?.json();
    return user
}

export async function loginUser(email, password){
    const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
            email,
            password,
        }),
    })

    const user = await response?.json();
    return user;
}

export async function registerUser(email, password, password2){
    const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
            email,
            password,
            password2,
        }),
    })

    const user = await response?.json();
    return user;
}

export async function logoutUser(){
    const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/users/logout`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        mode: 'cors',
        credentials: 'include',
    })

    const data = await response?.json();
    return data;
}