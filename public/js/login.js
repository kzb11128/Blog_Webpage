const loginFormHandler = async (event) => {
    event.preventDefault();
    console.log("IN POST.jS")

    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if(email && password) {
        const response = await fetch("api/user/login", {
            method: "POST",
            body: JSON.stringify({ email, password}),
            headers: { "Content-Type": "application/json"},
        });
        console.log(response);
        if(response.ok){
            document.location.replace("/dashboard");
        }else{
            alert(response.statusText);
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if(username && email && password) {
        const response = await fetch("api/user", {
            method: "POST",
            body: JSON.stringify({ username, email, password}),
            headers: { "Content-Type": "application/json"},
        });

        if(response.ok){
            document.location.replace("/dashboard");
        }else{
            alert(response.statusText);
        }
    }
}

const loginForm = document.querySelector(".login-form");
const signUpForm = document.querySelector(".signup-form");

if(loginForm){
    loginForm.addEventListener("submit", loginFormHandler);
}
if(signUpForm){
    signUpForm.addEventListener("submit", signupFormHandler);
}

