import authService from "@/api/httpService/authService";
import userService from "@/api/httpService/user/userService";
import signInUserDto from "@/api/types/user/signInUserDto";
import userDto from "@/api/types/user/userDto";
import getRole from "@/helpers/role/getRole";
import getToken from "@/helpers/token/getToken";
import toastProps from "@/types/constants/toasts/toastProps";
import { Dispatch } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import actions from "./actions";

const signInDispatch =
  (user?: signInUserDto) =>
  async (
    dispatch: Dispatch<{
      type: string;
      payload: userDto | null | string;
    }>
  ): Promise<void> => {
    if (user) {
      const response = await authService.signIn(user);

      if (response.status === 200) {
        const JWT = await response.text();
        localStorage.setItem("token", JWT);
      } else {
        toast.error("We have troubles with getting you in, try later", toastProps);
      }
    }

    if (getToken()) {
      const userInfoPromise = await userService.getInfo();
      const updatedUser: userDto = await userInfoPromise.json();
      updatedUser.authencated = true;
      dispatch(actions.setRole(getRole()));
      dispatch(actions.setUser(updatedUser));
    }
  };

export default signInDispatch;
