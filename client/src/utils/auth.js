import decode from 'jwt-decode';

class AuthService {
    //grabs data that was saved in the token 
    getProfile() {
        return decode(this.getToken());
    }

    // checks if your'e still logged in
    loggedIn() {
        //checks if there is a valid saved token 
        const token = this.getToken();
        //checks if token is not expired or not undefined
        return !!token && !this.isTokenExpired(token);
    }

    // check if the token has expired
    isTokenExpired(token) {
        try{
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
            }catch (err) {
            return false;
        }
    }

    // grab token from localStorage
    getToken() {
        // grabs user token form localStorage
        return localStorage.getItem('id_token');
    }

    // set token to LS and reloads page to home
    login(idToken) {
        //Saves the users token to localStorage
        localStorage.setItem('id_token', idToken);

        window.location.assign('/');
    }

    // clears token from LS and force logout and reload
    logout() {
        //clears user data from LS 
        localStorage.removeItem('id_token');
        //reloads page and resets state
        window.location.assign('/');
    }
}

export default new AuthService();