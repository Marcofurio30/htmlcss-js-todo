window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');
    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    nameInput.addEventListener('change', (e) => {
        localStorage.setItem('username', e.target.value);
    })


    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }
        /* if (todo.content == '') {
            var warning_notif = document.querySelector('.warning.default');
            warning_notif.classList.remove("default");
            warning_notif.classList.add("show");
            warning_notif.addEventListener('animationend', function() {
                warning_notif.classList.remove("show");
                warning_notif.classList.add("hide");
                warning_notif.addEventListener('animationend', function() {
                    warning_notif.classList.remove("hide");
                    warning_notif.classList.add("default");
                    
                  });
              });

              
        } */      
        if (todo.content == '') {
            createNotification("warning");
            const submitButton = document.querySelector("#new-todo-form > input[type=submit]:nth-child(5)");
            submitButton.disabled = true; //disable submit button to prevent bug
            var warning_notif = document.querySelector('.notif.default');
            warning_notif.classList.remove("default");
            warning_notif.classList.add("show");
          
            setTimeout(function() {
              warning_notif.classList.remove("show");
              warning_notif.classList.add("hide");
          
              setTimeout(function() {
                warning_notif.classList.remove("hide");
                warning_notif.classList.add("default");
                submitButton.disabled = false; //re-enable sumbit button
                // animation ended we can delete here

                if (warning_notif) {
                    warning_notif.remove();
                } 
              }, 800);
            }, 800);
          }
          else {

            console.log(todo.content);

            todos.push(todo);

            localStorage.setItem('todos', JSON.stringify(todos));

            e.target.reset();

            DisplayTodos();

          }
          
        
    })

    DisplayTodos()
})

function DisplayTodos () {
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');

        if (todo.category == 'personal') {
            span.classList.add('personal');
        }
        else {
            span.classList.add('business');
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        editButton.classList.add('edit');
        deleteButton.classList.add('delete');

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        editButton.innerHTML = "Editer";
        deleteButton.innerHTML = "Supprimer";

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add('done');
        }

        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todos.done) {
                todoItem.classList.add('done');
            }
            else {
                todoItem.classList.remove('done');
            }
//https://youtu.be/6eFwtaZf6zc?t=2156
            DisplayTodos();
        })

        editButton.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
        })

        deleteButton.addEventListener('click', e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        })

    });
}

function createNotification(type) {

    var title = ""
    var customtext = ""

    if (type == "warning") {
        title = "Attention!"
        customtext = "Votre tâche ne peut pas être vide!"
    }
    if (type == "success") {
        title = "Succès"
        customtext = "Votre tâche a bien été ajoutée"
    }

    const body = document.querySelector('body'); // il fallait append la notifbox au body...

    const notifbox = document.createElement('div');
    notifbox.classList.add('notif',type,'default');
    const icon = document.createElement('img'); // create icon
    icon.className = 'notificon';
    icon.src = 'img/' + type + '.svg';

    notifbox.appendChild(icon); // append icon to notifbox
    const notiftitle = document.createElement('span');
    notiftitle.classList.add('notiftext');
    notiftitle.innerHTML = title;
    const notiftext = document.createElement('span');
    notiftext.classList.add('customnotiftext');
    notiftext.innerHTML = customtext;
    notifbox.appendChild(notiftitle);
    notifbox.appendChild(notiftext);
    body.appendChild(notifbox);
}



// DONE prevent void task
//prevent no category selected
//add added time somewhere