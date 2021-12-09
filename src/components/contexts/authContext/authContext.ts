import signUpUserDto from "@/api/types/user/signUpUserDto";
import React from "react";

const userDto: signUpUserDto | null = null;

const AuthContext = React.createContext<{ user: signUpUserDto | null }>({
  user: userDto,
});

export default AuthContext;
