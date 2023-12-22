import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { setTodoList,addTodo, sortTodo, updateTodo,toggleCompleted } from '../Todoslice';
// import { TiPencil } from "react-icon/ti";
// import { BsTrash } from "react-icon/bs";
import empty from "../assets/no-data.jpg"; 

const TodoList = () => {
    const dispatch = useDispatch();
    const todoList = useSelector((state) => state.todo.todoList);
    const sortCriteria = useSelector((state) => state.todo.sortCriteria);
    const [showModal, setShowModal] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        if(todoList.length > 0 ) {
            localStorage.setItem("todoList", JSON.stringify(todoList));
        }
    }, [todoList]);
    useEffect(() => {
        const localTodoList = JSON.parse(localStorage.getItem("todoList"));
        if (localTodoList) {
            dispatch(setTodoList(localTodoList));
        }
    },
    []);

    const handleAddTodo =(task) => {
        if (task.trim().length === 0) {
            alert("Please enter a task");
        } else {
            dispatch(addTodo({
                task: task,
                id: Date.now(),
            })
            );
            setNewTask("");
            setShowModal(true);
        }
    };
    const handleUpdateTodoList = (id,task) => {
        if (task.trim().length === 0) {
            alert("Please enter a task");
        } else {
            dispatch(addTodo({
                task: task, id: id
               
            })
            );
            setNewTask("");
            setShowModal(false);
        }
    }

    const handleDeleteTodo = (id) => {
    const updateTodoList = todoList.filter((todo) => todo.id != id);
    dispatch(setTodoList(updateTodoList));
    localStorage.setItem("todoList", JSON.stringify(updateTodoList));
    };

    const handleSort = (sortCriteria) => {
        dispatch(sortTodo(sortCriteria));
    }
    const sortTodoList = todoList.filter(todo => {
        if (sortCriteria === "All") return true;
        if (sortCriteria === "Completed" && todo.completed) return true;
        if (sortCriteria === "Not Completed" && !todo.completed) return false;
    });

    const handleToggleCompleted = (id) =>
    dispatch(toggleCompleted({ id }));
  return (
    <div>
        {showModal && (
            <div className="fixed w-full left-0 top-0 h-full bg-transparentBlack flex item-center justify-center">
                <div className='bg-white p-8 rounded-md'>
                    <input type='text' className='border p-2 rounded-md outline-none mb-8' value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder={currentTodo ? "Update Task here" : "Enter your Task here" }/>
                    <div className='flex justify-between'>
                        {currentTodo ? (
                            <>
                            <button className='bg-Tangaroa rounded-md text-black py-3 px-10' onClick={() => {
                                setShowModal(false);
                                handleUpdateTodoList(currentTodo.id, newTask);
                            }}>Save</button>
                            <button>Cancel</button>
                            </>

                        )  : (
                            <>
                            <button className='bg-red-500 rounded-md text-white py-3 px-10' onClick={()=> setShowModal(false)}>Cancel</button>
                            <button className='bg-red-500 rounded-md text-white py-3 px-10'onClick={()=> {setShowModal(false); handleAddTodo(newTask)}} >Add</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )}
        <div className="flex items-center justify-center flex-col">
           {todoList.length === 0 ? (
            <>
            <div>
                <div className="mb-8">
                    <div className="sm:w-[500px] sm:h-[500px] min-w-[250px]">
                    <img src={empty} alt='' className=" "/>
                    </div>
                </div>
                <p className="text-center text-gray-500">You have no Todo's</p>
            </div>
            </>
           ):(
        <div className="container mx-auto mt-6" >
            <div className='flex justify-center mb-6'>
                <select onChange={e => handleSort(e.target.value)} className="p-1 outline-none">
                  <option value="All">All</option> 
                  <option value="Completed">Completed</option>
                  <option value="Not Completed">Not Completed</option> 
                </select>
            </div>
                <div>
                    {sortTodoList.map((todo) => (
                        <div key={todo.id} className="flex item-center justify-between mb-6 bg-slate-900 mx-auto w-full md:w-[75%] rounded-md p-4">
                            <div className={`${todo.completed ? "line-through text-green-700" : "text-orange-300" }`} onClick={() =>{handleToggleCompleted(todo.id)} }>{todo.task}</div>
                            <div>
                                <button className="bg-blue-500 text-white p-1 rounded-md ml-2" onClick={() => {
                                    setShowModal(true);
                                    setCurrentTodo(todo);
                                    setNewTask(todo.task);
                                    }} >
                                        Edit

                                    </button >
                                <button className="bg-orange-400 text-white p-1 rounded-md ml-2" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
        </div>
            
           )}
           <button className="bg-cyan-300 text-center text-white py-3 px-10 rounded-md" onClick={() => {
            setShowModal(true);
           }}>Add Task</button>
        </div>
      
    </div>
  )
}

export default TodoList
