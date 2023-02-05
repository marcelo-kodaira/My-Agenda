import { useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import ModalTaskDetails from "../../components/Modal/ModalTaskDetails"
import { useAuth } from "../../contexts/AuthContext"
import { useTasks } from "../../contexts/TasksContext"
import TaskList from "./TasksList"
import FirstTask from "./FirstTask"
import NotFound from "./NotFound"
import ModalEditCard from "../../components/Modal/ModalEditCard"

interface Task{
    id: string,
    nome: string,
    email: string,
    telefone: string,
    createdAt: Date,
    updatedAt: Date
}
const Dashboard = () =>{
    
    const [loading,setLoading] = useState(true)
    const {token} = useAuth()
    const {tasks, loadTasks, notFound, taskNotFound} = useTasks()

    const[selectedTask, setSelectedTask] = useState<Task>({} as Task)

    const {isOpen: isTaskDetailsOpen , onOpen: onTaskDetailsOpen, onClose: onTaskDetailsClose} = useDisclosure()


    const {isOpen: isEditCardOpen , onOpen: onEditCardOpen, onClose: onEditCardClose} = useDisclosure()
    

    useEffect(() =>{
        loadTasks(token)
        .then(res => setLoading(false))
    },[])

    const handleClickDetails = (task:Task) =>{
        setSelectedTask(task);
        onTaskDetailsOpen()
    }

    const handleClickEdit = (task:Task) =>{
        setSelectedTask(task);
        onEditCardOpen()
    }


    if(notFound){
        return <NotFound isTaskDetailsOpen={isTaskDetailsOpen} onTaskDetailsClose={onTaskDetailsClose} selectedTask={selectedTask} taskNotFound={taskNotFound}/>
    }

    return(
        <>
            <ModalTaskDetails isOpen={isTaskDetailsOpen} onClose={onTaskDetailsClose} task={selectedTask}/>
            <ModalEditCard isOpen={isEditCardOpen} onClose={onEditCardClose} task={selectedTask}/>
            {
            !tasks.length && !loading ?
            <FirstTask/>
            :   
            <TaskList tasks={tasks} handleClickDetails={handleClickDetails}  handleClickEdit={handleClickEdit} loading={loading} />
            }
        </>
    )
}

export default Dashboard