import axios from "axios";
require ('dotenv').config()

class Auth {
	constructor() {
		this.auth = axios.create({
			baseURL: 'https://swapp-it.herokuapp.com',
			withCredentials: true,
        });
	}

	signup({ firstName, lastName, location, email, password }) {
		return this.auth
			.post("/auth/signup", {
				firstName,
				lastName,
				location,
				email,
				password,
			})
			.then(({ data }) => data);
	}

	signin({ email, password }) {
		return this.auth
			.post("/auth/signin", { email, password })
			.then(({ data }) => data);
	}

	logout() {
		return this.auth.post("/auth/logout", {}).then(({ data }) => data);
		// return this.auth.post("/auth/logout", {}).then((response) => response.data);
	}

	user() {
		return this.auth.get("/auth/user").then(({ data }) => data);
		// return this.auth.get("/auth/me").then((response) => response.data);
	}
}

const authService = new Auth();
// `authService` is the object with the above axios request methods

export default authService;