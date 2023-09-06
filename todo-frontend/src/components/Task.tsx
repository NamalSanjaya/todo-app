import {useState, useEffect} from 'react';
import {Box, Paper, Typography, IconButton, Checkbox}  from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

import { ChangeCheckStatus, RemoveTask, UnAuthorizedError } from '../apis/fetch';

export type TaskType = {
    _id: string,
    title : string;
    description: string;
    isChecked: boolean;
}

export  function Task(props: TaskType){
    const navigate = useNavigate();
    const [checked, setChecked] = useState(props.isChecked)
    const [itemState, DelItem] = useState(true)

    const handleClick = () => {
        setChecked(preState => !preState)
    }

    const removeTask = () => {
        DelItem(false)
    }

    useEffect( () => {
        if(!itemState) return
        (async () => {
            try {
                await ChangeCheckStatus(props._id, checked)
            } catch (err) {
                if (err instanceof UnAuthorizedError) {
                    navigate('/login', { replace: true });
                    return
                } 
              console.error(`Failed to update checked status of id=${props._id}: ${err}`)
            }
        })();

    }, [checked])

    useEffect(() => {
        if(itemState) return
        (async () => {
            try {
                await RemoveTask(props._id)
            } catch (err) {
                if (err instanceof UnAuthorizedError) {
                    navigate('/login', { replace: true });
                    return
                } 
                console.error(`Failed to remove task of id=${props._id}: ${err}`)
            }
        })();

    }, [itemState])

    return itemState ? 
        (
            <Box sx={styles.container}>
            <Checkbox checked={checked} onClick={handleClick}/>
            <Paper sx={styles.paper} elevation={1}> 
                <Typography variant='h6' sx={styles.title}> {props.title} </Typography>
                <Typography variant='body2'> {props.description} </Typography>
            </Paper>
            <IconButton aria-label="delete" onClick={removeTask}>
                <DeleteIcon />
            </IconButton>
            </Box>
        ): null
}

const styles = {
    container : {
        display: "flex",
        justifyContent: "row"
    },
    paper: {
        width: "90%",
        paddingY: "5px",
        paddingX: "10px"
    },
    title: {
        fontWeight: "bold"
    }
}