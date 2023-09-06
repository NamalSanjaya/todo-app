import SignInUpBase from "./SignInUpBase";
import { LoginAccount } from "../apis/fetch";

export default function Login(){

  const handleLogin = async (username: string, password: string) => {
        await LoginAccount({
          "username": username,
          "password": password,
        })
  };

  return <SignInUpBase 
    topMsg="Login to TodoList App" butMsg="Login"  
    accountMsg="Don't have an account? Sign Up" directLink="/signup"
    handleSubmit={handleLogin}
    afterLink="/" fallback="/login"
  />

}