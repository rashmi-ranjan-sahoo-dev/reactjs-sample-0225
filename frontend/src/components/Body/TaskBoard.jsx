import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

function TodoBoard( { setCompleted, setPending}) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const token = localStorage.getItem("token")
    try {
      const res = await axios.get("http://localhost:3000/api/v1/tasks/tasks",{
        headers :{ token:token}});
      //  console.log(res.data.todos)
       setTasks(res.data.tasks)
       const allTasks = res.data.tasks

       const copleted = allTasks.filter(task => task.isDone).length
       const pending = allTasks.filter(task => !task.isDone).length
       setCompleted(copleted);
       setPending(pending);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  }

  async function addTask() {

    const token = localStorage.getItem("token");
    try {
        await axios.post("http://localhost:3000/api/v1/tasks/task", {
        title,
        detail,
        isDone
      },{
        headers:{
            token:token
        }
    }
    )
      setTitle("");
      setDetail("");
       setIsDone(false);
      fetchTasks();
    } catch (err) {
      console.error("Error creating task:", err);
    }
  }

  async function deleteTask(id) {
    const token = localStorage.getItem("token");
    try {
      await axios.delete("http://localhost:3000/api/v1/tasks/task",{
      headers: { token },
      data: { taskId: id}
      });
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  }

async function toggleDone(task) {
    const token = localStorage.getItem("token")
    try {
      await axios.put("http://localhost:3000/api/v1/tasks/taskToggle",{
      taskId: task._id,
      isDone: !task.isDone
    }, {
      headers: { token }
    });
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  }

  function startEditTask(task) {
    setEditingTask(task);
    setTitle(task.title);
    setDetail(task.detail);
    setIsDone(task.isDone);
  }

  async function updateTask() {
    const token = localStorage.getItem("token");
    if (!editingTask) return;

    try {
      await axios.put(
        "http://localhost:3000/api/v1/tasks/task",
        {
          taskId: editingTask._id,
          title:title,
          detail:detail,
          isDone:isDone,
        },
        {
          headers: { token },
        }
      );
      setEditingTask(null);
      setTitle("");
      setDetail("");
      setIsDone(false);
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  }

  function cancelEdit() {
    setEditingTask(null);
    setTitle("");
    setDetail("");
    setIsDone(false);
  }


  return (
    <div className="p-6 max-w-5xl max-h-[600px] mx-auto  overflow-y-auto">
      {/* Add Task */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2 mb-6 w-full">
        <input
          type="text"
          placeholder="Title Of Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full sm:flex-1"
        />
        <input
          type="text"
          placeholder="Detail Of Your Task"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          className="border p-2 rounded w-full sm:flex-1"
        />
       <div className="flex gap-2 mt-2 sm:mt-0">
         <button
           onClick={editingTask ? updateTask : addTask}
           className={`${
             editingTask ? "bg-blue-500" : "bg-green-500"
           } text-white px-4 py-2 rounded whitespace-nowrap`}
         >
           {editingTask ? "Update" : "+"}
         </button>
     
         {/* Cancel button (only in edit mode) */}
         {editingTask && (
           <button
             onClick={cancelEdit}
             className="bg-gray-400 text-white px-4 py-2 rounded whitespace-nowrap"
           >
             Cancel
           </button>
         )}
       </div>
      </div>

      {/* Todo Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
     {tasks.map((task) => {
        return (
          <div 
          key={task._id} 
          className="border p-4 rounded shadow bg-[#F0D1A8] flex justify-between">
            <div>
            <p className="font-semibold">{task.title}</p>
            <p className="text-sm text-gray-600">{task.detail}</p>
            </div>
            <div className="grid grid-cols-1 gap-1">
               <button
               onClick={() => toggleDone(task)}
               className="mt-2 text-green-600 border rounded"
               title="Toggle Done">
               {task.isDone ? <MdDone /> : <RxCross1 />}            
               </button>
               <button
                  onClick={() => startEditTask(task)}
                  className="text-blue-600 text-sm border flex justify-center items-center rounded"
                   >
                  <FaRegEdit/>
                </button>
                <button 
                className="border rounded"
                  onClick={() => deleteTask(task._id)}><MdDelete/>
                </button>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default TodoBoard;
