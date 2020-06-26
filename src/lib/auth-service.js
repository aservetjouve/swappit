import axios from "axios";
require ('dotenv').config()

class Auth {
	constructor() {
		this.auth = axios.create({
			baseURL: 'http://localhost:4000',
			withCredentials: true,
        });
        console.log('API is')
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
		//.catch(err => console.log("username taken"))
		// .then((response) => response.data);
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