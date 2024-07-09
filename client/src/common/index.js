const backendDomin = "http://localhost:8080"

const summaryApi = {

    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    login : {
        url : `${backendDomin}/api/login`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api//userLogout`,
        method : "get"
    }
}

export default summaryApi