import {useState, useEffect} from "react"
import {Dialog, DialogTitle, DialogContent, TextField,
    DialogActions, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

import { CreateTask, UnAuthorizedError } from "../apis/fetch";

export type DialogFormType = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TaskForm(props: DialogFormType){
    const navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [desp, setDesp] = useState("")
    const [isEmpTitle, setEmpTitle] = useState(false)

    const handleCreate = async () => {
        if(title === ""){
            setEmpTitle(true)
            return
        }
        try {
            await CreateTask(title, desp)
            
        } catch (err) {
            if (err instanceof UnAuthorizedError) {
                navigate('/login', { replace: true });
                return
            } 
        }
        setTitle("")
        setDesp("")
        setEmpTitle(false)
        props.setOpen(false)
    }

    const handleCancel = () => {
        setEmpTitle(false)
        setTitle("")
        setDesp("")
        props.setOpen(false)
    }

    return (
        <Dialog open={props.open} onClose={() => {}}>
        <DialogTitle>Create a New Task</DialogTitle>
        <DialogContent>
            <TextField
            autoFocus
            required
            margin="normal"
            id="title"
            label="Title"
            type="text"
            fullWidth
            multiline
            maxRows={2}
            variant="standard"
            onChange={(event) => setTitle(event.target.value)}
            error={isEmpTitle}
            />
            <TextField
            margin="dense"
            id="descrip"
            label="Description"
            type="text"
            fullWidth
            multiline
            maxRows={5}
            variant="standard"
            onChange={(event) => setDesp(event.target.value)}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreate}>Create</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    )
}
