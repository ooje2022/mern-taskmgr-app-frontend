const TaskForm = ({
  createTask,
  name,
  handleInputChange,
  editBtnState,
  updateTask,
}) => {
  return (
    <form
      className="task-form"
      onSubmit={!editBtnState ? createTask : updateTask}
    >
      <input
        type="text"
        placeholder="Add task"
        name="name"
        value={name}
        onChange={handleInputChange}
      />
      <button type="submit">{!editBtnState ? "Add" : "Edit"}</button>
    </form>
  );
};

export default TaskForm;
