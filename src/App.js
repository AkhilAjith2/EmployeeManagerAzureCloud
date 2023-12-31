// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//
// const App = () => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');
//  
//   useEffect(() => {
//     // Fetch tasks from the server on component mount
//     fetchTasks();
//   }, []);
//
//
// const fetchTasks = () => {
//   console.log('Fetching tasks...');
//   axios.get('http://localhost:3000/tasks')
//     .then(response => {
//       console.log('Fetched tasks:', response.data);
//       setTasks(response.data);
//     })
//     .catch(error => console.error(error));
// };
//
//
//   const addTask = () => {
//     // Send a POST request to add a new task
//     axios.post('http://localhost:3000/tasks', { task: newTask })
//       .then(() => {
//         // After adding, fetch the updated task list
//         fetchTasks();
//       })
//       .catch(error => console.error(error));
//
//     // Clear the input field
//     setNewTask('');
//   };
//
//   return (
//     <div>
//       <h1>Task Manager</h1>
//       <div>
//         <input
//           type="text"
//           placeholder="New Task"
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//         />
//         <button onClick={addTask}>Add Task</button>
//       </div>
//       <ul>
//         {tasks.map((task, index) => (
//           <li key={index}>{task}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };
//
// export default App;

import './App.css';
import CharacterForm from './CharacterForm';
import CharacterList from './CharacterList';
import SearchBar from './Search';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [updatedList, setUpdatedList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
        fetchCharacters();
    }, []);

    const fetchCharacters = () => {
        console.log('Fetching characters...');
        axios.get('http://localhost:3000/characters')
            .then(response => {
                console.log('Fetched characters:', response.data);
                setUpdatedList(response.data);
                setFilteredList(response.data);
            })
            .catch(error => console.error(error));
    };

    const addCharacterHandler = (character) => {
        axios.post('http://localhost:3000/characters', character)
            .then(() => {
                fetchCharacters();
            })
            .catch(error => console.error(error));
    };

    const searchHandler = (searchTerm) => {
        const filteredCharacters = updatedList.filter((character) =>
            character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            character.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredList(filteredCharacters);
    };

    const deleteHandler = (email) => {
        axios.delete(`http://localhost:3000/characters/${email}`)
            .then(() => {
                fetchCharacters();
            })
            .catch(error => console.error(error));
    };

    const editCharacterHandler = (email, updatedCharacterData) => {
        axios.put(`http://localhost:3000/characters/${email}`, updatedCharacterData)
            .then(() => {
                fetchCharacters();  // Assuming this function fetches and updates the character list
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <SearchBar onSearch={searchHandler}></SearchBar>
            <CharacterList data={filteredList} onDelete={deleteHandler} onEdit={editCharacterHandler}></CharacterList>
            <CharacterForm onAdd={addCharacterHandler}></CharacterForm>
        </div>
    );
}

export default App;

