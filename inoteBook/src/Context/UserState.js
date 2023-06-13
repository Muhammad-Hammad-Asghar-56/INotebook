import UserContext from "./userContext";


const UserState = (props) => {
    const baseURL="http://localhost:5000"

    const authenticateUser=async (email,password)=>{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            // body: JSON.stringify({ "email":email ,"password":password })
            body: JSON.stringify({ "email":email ,"password":password })
        };
        
        const response = await fetch(`${baseURL}/user/auth/login`, requestOptions);
        const data = await response.json();
        if(data.sucess){
            // Set a value
            localStorage.setItem('authToken', data.authToken);
            console.log(data.authToken);
        }
    }
    const createUser=async (name,email,password)=>{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            // body: JSON.stringify({ "email":email ,"password":password })
            body: JSON.stringify({"name":name, "email":email ,"password":password })
        };
        
        const response = await fetch(`${baseURL}/user/auth/createUser`, requestOptions);
        const data = await response.json();
        return data;
    }

    const sendEmail=async (email)=>{
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
              },
            // body: JSON.stringify({ "email":email ,"password":password })
            body: JSON.stringify({"email":email})
        };
        
        const response = await fetch(`${baseURL}/user/auth/send/authToken`, requestOptions);
        const data = await response.json();
        return data;
    }
    const updatePassword=async (authToken,newPassword)=>{
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
              },
            // body: JSON.stringify({ "email":email ,"password":password })
            body: JSON.stringify({"email":email, "authToken":authToken})
        };
        
        const response = await fetch(`${baseURL}/user/auth/send/authToken`, requestOptions);
        const data = await response.json();
        return data;
    }

    return (
        <UserContext.Provider value={{authenticateUser,createUser,sendEmail,updatePassword}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState
