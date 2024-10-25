document.getElementById('addTodo').addEventListener('click', function() {
    const todoInput = document.getElementById('todoInput').value;

    if (todoInput) {
        fetch('http://localhost:8080/todos', { // Update with your actual backend endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `task=${encodeURIComponent(todoInput)}`
        })
        .then(response => {
            if (response.ok) {
                // Clear input field after adding
                document.getElementById('todoInput').value = '';
                // Optionally, refresh the todo list
                loadTodos(); 
            } else {
                alert('Failed to add todo');
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter a todo item');
    }
});

function loadTodos() {
    fetch('http://localhost:8082/todos') // Adjust your API endpoint accordingly
        .then(response => response.json())
        .then(data => {
            const todoList = document.getElementById('todoList');
            todoList.innerHTML = ''; // Clear the list
            data.forEach(todo => {
                const li = document.createElement('li');
                li.textContent = todo.task; // Display the todo task
                todoList.appendChild(li);
            });
        });
}

// Load todos when the popup is opened
window.onload = loadTodos;
