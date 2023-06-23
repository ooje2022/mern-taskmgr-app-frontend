import { useEffect, useState } from "react";
import axios from "axios";

//import { toast } from "react-hot-toast";
import { URL } from "../App";
import Task from "./task";
import TaskForm from "./taskForm";
import loadingImg from "../assets/loader.gif";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editBtnState, setEditBtnState] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/tasks`);
      setTasks(data);
      setIsLoading(false);
    } catch (err) {
      alert(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const { name } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createTask = async (e) => {
    e.preventDefault();
    // console.log(formData);
    if (name === "") {
      return alert("Input field cannot be empty.");
    }
    try {
      await axios.post(`${URL}/api/tasks`, formData);
      setFormData({ ...formData, name: "" });
      getTasks();
      alert("Task added successfully");
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  const deleteTask = async (id) => {
    alert("Are you sure you want to delete.");
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      getTasks(); //to reload the page
    } catch (err) {
      alert(err.message);
    }
  };

  const getSingleTask = async (item) => {
    setFormData({ name: item.name, completed: false });
    setTaskId(item._id);
    setEditBtnState(true);
  };

  const updateTask = async (e) => {
    e.preventDefault();

    if (name === "") {
      return alert(
        "Input field cannot be empty. To delete task use the trash/delete button by each task item."
      );
    }

    try {
      await axios.patch(`${URL}/api/tasks/${taskId}`, formData);
      setFormData({ ...formData, name: "" });
      alert("Task updated successfully");
      setEditBtnState(false);
      getTasks();
    } catch (err) {
      alert(err.message);
    }
  };

  const setComplete = async (item) => {
    const newFormData = {
      name: item.name,
      completed: true,
    };

    try {
      await axios.patch(`${URL}/api/tasks/${item._id}`, newFormData);
      getTasks();
      alert("Task status set to complete.");
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const finishedTask = tasks.filter((task) => {
      return task.completed === true;
    });
    setCompletedTasks(finishedTask);
  }, [tasks]);

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        editBtnState={editBtnState}
        updateTask={updateTask}
      />
      {tasks.length > 0 && (
        <div className="--flex-between --pb">
          <p>
            <b>Total Task: </b> {tasks.length}
          </p>
          {completedTasks.length > 0 && (
            <p>
              <b>Completed Task: </b> {completedTasks.length}
            </p>
          )}
        </div>
      )}

      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={loadingImg} alt="Data loading indicator" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p className="--py">No task to display. Consider adding a task.</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                setComplete={setComplete}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default TaskList;
