import SignInUpBase from "./SignInUpBase";
import { CreateAccount } from "../apis/fetch";

export default function SignUp(){
  const handleSignUp = async (username: string, password: string) => {
      await CreateAccount({
        "username": username,
        "password": password
      })
  };

  return <SignInUpBase 
    topMsg="Create an Account in TodoList App" butMsg="Create"  
    accountMsg="Already have an account? Login" directLink="/login"
    handleSubmit={handleSignUp}
    afterLink="/login" fallback="/signup"
  />

}