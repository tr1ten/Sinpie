
export const API_ENDPOINT = "http://localhost:3001";
export const AUTH_ENDPOINT = `${API_ENDPOINT}/auth`;
export function getToken(){
    return sessionStorage.getItem("token");
}
export async function registerUser(uname:string,email:string,pass:string){
    if(!uname || !email || !pass){
        return false;
    }
    // post data to server
    try{
        const res = await fetch(AUTH_ENDPOINT+"/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username:uname,
                email:email,
                password:pass
        })
    });
    if(!res.ok) throw new Error("Error while registering user");
    const data = await res.json();
    // save token to session storage
    sessionStorage.setItem("token",data.token);
    }
    catch(err){
        console.log(err);
        throw err;
    }
    return true;
}

// create similar function for login
export async function loginUser(email:string,pass:string){
    if(!email || !pass){
        return false;
    }
    // post data to server
    try{
        const res = await fetch(AUTH_ENDPOINT+"/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                password:pass
        })
    });
    // return error messege from server

    const data = await res.json();
    if(!res.ok) {throw new Error(data.error ?? "Something is wrong, please try again later")}
    // save token to session storage
    sessionStorage.setItem("token",data.token);
    }
    catch(err){
        console.log(err);
        throw err;
    }
    return true;
}