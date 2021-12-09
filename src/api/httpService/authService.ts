import endpoints from "../endpoints";
import signInUserDto from "../types/user/signInUserDto";
import signUpUserDto from "../types/user/signUpUserDto";

const requestOptions = (body: signUpUserDto | signInUserDto) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify(body),
});

class Auth {
  authenticated: boolean;

  constructor() {
    this.authenticated = false;
  }

  signIn = async (user: signInUserDto) => {
    const tdata = await fetch(`/api/auth/sign-in/`, requestOptions(user));
    return tdata;
  };

  signUp = async (user: signUpUserDto) => {
    const response = await fetch(endpoints.postSignUp, requestOptions(user));
    // const data = await httpService.post<signUpUserDto>(endpoints.postSignUp, user);

    return response;
  };

  // getState = () => {};
}

export default new Auth();
