import {useState, useEffect} from "react"
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

import Container from '@mui/material/Container';
import { IsLoggedIn, UnAuthorizedError } from "../apis/fetch";

export type SignInUpType = {
    topMsg: string;
    accountMsg: string;
    butMsg: string;
    directLink: string
    handleSubmit: (username: string, password: string) => Promise<void>
    afterLink: string
    fallback: string
}

export default function SignInUpBase(props: SignInUpType) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleClick = async() => {
    try {
        await props.handleSubmit(username, password)
        setUsername("")
        setPassword("")
        navigate( props.afterLink , { replace: true })
      } catch (err) {
        setUsername("")
        setPassword("")
        // navigate( props.fallback , { replace: true })
      }
  }

  useEffect(() => {
    (async () => {
      try {
        await IsLoggedIn()
        navigate('/', { replace: true });
        return
      } catch (err) {
        if (err instanceof UnAuthorizedError) {
          navigate(props.fallback, { replace: true });
          return
        } 
        console.error("failed to check the login state: ", err)
      }
    })()
  }, [])

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{marginBottom: "20px"}}>
            {props.topMsg}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              type='text'
              name='username'
              autoFocus
              onChange={(event) => setUsername(event.target.value)}
              value={username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              name='password'
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClick}
            >
              {props.butMsg}
            </Button>
  
            <Link href={props.directLink} variant="body2">
                {props.accountMsg}
            </Link>
          </Box>
        </Box>
      </Container>
  );
}