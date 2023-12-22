import Headings from "./components/Headings";
import TodoList from "./components/TodoList";

function App(){
  return <div className="App container justify-center py-16 px-32 min-h-screen mx-auto">
    <Headings/>
    <TodoList/>
  </div>
}

export default App;