console.log('login.js working');

const getCookie = document.cookie;
console.log(getCookie);

const nameUser = getCookie.slice(13)
const userSessionDiv = document.getElementById('user-session');
userSessionDiv.innerHTML = `<div class="col">Esta info ingresa por la cookie: ${nameUser}</div>`


// function logout() {
//     console.log('Ingresó a logout');
//     fetch('http://localhost:8080/api/logout', {
//         method:'POST'
//     });
    
// }

// const btnLogout = document.getElementById('btn-logout');
// console.log(btnLogout)
// btnLogout.addEventListener('click', logout);S