import {Stack, Box, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

import TodoList from './TodoList';
import { Logout } from '../apis/fetch';

export default function Container() {
    const navigate = useNavigate();

    const logout = () => {
        Logout()
        navigate( "/login" , { replace: true })
    }
    return (
    <Box sx={styles.container} >
        <Stack spacing={2} sx={styles.stack}>
            <Box sx={styles.topContainer}>
                <Typography variant='h5' sx={styles.title}> Todo List </Typography>
                <Button
                 variant="contained"
                 size='small'
                 onClick={logout}
                > Logout</Button>
            </Box>
            <TodoList />
        </Stack>
    </Box>
    )
}

const styles = {
    container : {
        display: "flex",
        justifyContent: "center",
        padding: "1%",
        minHeight: "500px"
    },
    stack : {
        // border: "2px solid black",
        padding: "20px",
        borderRadius: "20px",
        width: "40%",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)" 
    },
    title: {
        fontWeight: "bold"
    }, 
    topContainer: {
        display: "flex",
        justifyContent: "space-between"
    }
}
