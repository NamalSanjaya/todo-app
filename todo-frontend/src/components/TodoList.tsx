import {useState, useEffect} from "react"
import {Task, TaskType} from './Task';
import TaskForm from "./Form";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Box, IconButton} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ListTasks, UnAuthorizedError } from "../apis/fetch";

export default function TodoList(){
    const navigate = useNavigate();
    const [tasks, addTasks] = useState<TaskType[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleAdd = () => {
        setDialogOpen(true)
    }

    useEffect(() => {
        (async () => {
            try {
                const data: TaskType[]  = await ListTasks()
                addTasks(data);
            } catch (err) {
                if (err instanceof UnAuthorizedError) {
                    navigate('/login', { replace: true });
                    return
                } 
                console.error('Error fetching tasks:', err);
            }
        })();
    }, [dialogOpen])

    return (
        <>
            {
                tasks.map(tsk=> {
                    return <Task key={tsk._id} _id={tsk._id} title={tsk.title} description={tsk.description} 
                    isChecked={tsk.isChecked}/>
                })
            }
            <Box>
                <IconButton aria-label="add-task" onClick={handleAdd}>
                    <AddCircleIcon />
                </IconButton>
            </Box>
            <TaskForm open={dialogOpen} setOpen={setDialogOpen}/>
        
        </>
    )
}