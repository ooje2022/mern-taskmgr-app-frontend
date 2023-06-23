import TaskList from "./components/taskList";

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  return (
    <div className="app">
      <div className="task-container">
        <TaskList />
      </div>
    </div>
  );
}

export default App;
