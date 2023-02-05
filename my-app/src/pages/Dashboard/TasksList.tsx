import { Box,Grid } from "@chakra-ui/react"
import Card from "../../components/Card"
import SearchBox from "../../components/Form/SearchBox"
import Header from "../../components/Header"
import CardSkeleton from "../../components/Skeleton/CardSkeleton"

interface Task{
    id: string,
    nome: string,
    email: string,
    telefone: string,
    createdAt: Date,
    updatedAt: Date
}

interface TaskListProps{
    loading: boolean
    tasks: Task[]
    handleClickDetails: (task: Task) => void
    handleClickEdit: (task: Task) => void
}

const TaskList = ({handleClickDetails,loading,tasks, handleClickEdit}:TaskListProps) =>(
    <Box>
                <Header/>
                <SearchBox/>
                <Grid w="100%" templateColumns="repeat(auto-fill, minmax(420px, 1fr))" gap={10} paddingX="8px" mt="8">
                {
                    loading? (
                    <CardSkeleton repeatCount={9} />
                    ):
                    tasks.map(task => <Card onClickDetails={handleClickDetails} onClickEdit={handleClickEdit} key={task.id} task={task}/>)
                }
                </Grid>
    </Box>
)

export default TaskList