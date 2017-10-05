// todos = []

// console.log('My Todos', todos)

// todos.push(todoText);

// todos[index] = newTodoText

// todos.splice(index, 1)


var todoList = { 
    todos: [],
    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
    },
    toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function() {
        var totalTodos = this.todos.length;
        var completedTodos = 0;
        //Get number of completed Todos
        for(var i=0; i<totalTodos; i++) {
            if(this.todos[i].completed === true) {
                completedTodos ++;
            }
        }
        // 1. If all todos are complete, change them to not complete
        if(completedTodos === totalTodos) {
            for(var i=0; i<totalTodos; i++) {
                this.todos[i].completed = false;
            }
        // 2. Otherwise (if some or none are complete), change all to complete
        } else {
            for(var i=0; i<totalTodos; i++) {
                this.todos[i].completed = true;
            }
        }
    }
};


// var displayTodosButton = document.getElementById('displayTodosButton');
// var toggleAllButton = document.getElementById('toggleAllButton');

// displayTodosButton.addEventListener('click', function() {
//     todoList.displayTodos();
// });

// toggleAllButton.addEventListener('click', function() {
//     todoList.toggleAll();
// });

//Refactor lines 76-85.
var handlers = {
    addTodo: function() {
        var todoText = document.getElementById('addTodoTextInput');
        todoList.addTodo(todoText.value);
        todoText.value = '';
        view.displayTodos();
    },
    changeTodo: function() {
        var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
        var changeTodoTextInput     = document.getElementById('changeTodoTextInput');
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value ='';
        changeTodoTextInput.value = '';
        view.displayTodos();        
    },
    deleteTodo: function(position) {
        todoList.deleteTodo(position);
        view.displayTodos();
    },
    toggleCompleted: function() {
        var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
        todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
        toggleCompletedPositionInput.value = '';
        view.displayTodos();
    },
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    }
};

var view = {
    displayTodos: function() {
            var todosUl = document.querySelector('ul');
            todosUl.innerHTML = '';

        for (var i = 0; i < todoList.todos.length; i++) {
            var todoLi = document.createElement('li');
            var todo = todoList.todos[i];
            var todoTextWithCompletion = '';

            if (todo.completed === true) {
                todoTextWithCompletion = '(x) ' + todo.todoText;
            } else {
                todoTextWithCompletion = '( ) ' + todo.todoText;

            }

            todoLi.id = i;
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createDeleteButton());
            console.log(this);
            todosUl.appendChild(todoLi);
        }
    },
    createDeleteButton: function() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';

        return deleteButton;
    },
    setUpEventListeners: function() {
        var todosUl = document.querySelector('ul');

        todosUl.addEventListener('click', function(event) {
            //Get the element that was clicked.
            var elementClicked = event.target;

            // Check if the element clicked is a delete button.
            if(elementClicked.className === 'deleteButton') {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
        });
    }
};

view.setUpEventListeners();







