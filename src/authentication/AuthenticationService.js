class AuthenticationService {

    registerSuccessfulLogin(username, password){
        console.log('registerSuccessfulLogin')
        const URL = "https://antlogic-backend-services.herokuapp.com/antlogic/api/auth/signin";
        const requestBody = JSON.stringify({
            usernameOrEmail: username,
            password: password
        });

        const otherParam = {
            headers:{
                'Content-Type':'application/json; charset=UTF-8',
                'Accept':'application/json; charset=UTF-8',
                'userId':'anon'
            },
            body: requestBody,
            method: 'POST'
        };

        fetch(URL, otherParam)
            .then(data=>{
                return data.json();
            }).then(result =>{
                sessionStorage.setItem('authenticatedUser', result.tokenType + " " + result.accessToken);
            }).catch(err=>{
                console.log("ERROR");
                console.log(err);
        });
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if(user===null) return false
        return true
    }

    async getSecureMessage(){
        let URL = "https://antlogic-backend-services.herokuapp.com/antlogic/api/secure";
        const otherParam = {
            headers:{
                'Authorization': sessionStorage.getItem('authenticatedUser')
            },
            method: 'GET'
        };

        return await fetch(URL, otherParam)
            .then(data=>{
                return data.json();
            }).then(result =>{
                return result.response
            }).catch(err=>{
                console.log("ERROR");
                console.log(err);
        });
    }
}

export default new AuthenticationService()