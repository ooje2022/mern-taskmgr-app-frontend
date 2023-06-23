import { FaEdit, FaRegTrashAlt, FaCheckDouble } from "react-icons/fa";

const Task = ({ task, index, deleteTask, getSingleTask, setComplete }) => {
  return (
    <div className={task.completed ? "task completed" : "task"}>
      <p>
        <b> {index + 1}. </b>
        {task.name}
      </p>
      <div className="task-icons">
        <FaCheckDouble color="green" onClick={() => setComplete(task)} />
        <FaEdit color="blue" onClick={() => getSingleTask(task)} />
        <FaRegTrashAlt color="red" onClick={() => deleteTask(task._id)} />
      </div>
    </div>
  );
};

export default Task;
