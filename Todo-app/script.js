let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
      const taskList = document.getElementById('task-list');
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item' + (task.completed ? ' completed' : '');
        
        const taskLeft = document.createElement('div');
        taskLeft.className = 'task-left';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onclick = () => toggleComplete(index);

        const span = document.createElement('span');
        span.textContent = task.text;

        taskLeft.appendChild(checkbox);
        taskLeft.appendChild(span);

        const taskRight = document.createElement('div');
        taskRight.className = 'task-right';

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.onclick = () => deleteTask(index);

        taskRight.appendChild(delBtn);

        li.appendChild(taskLeft);
        li.appendChild(taskRight);

        taskList.appendChild(li);
      });
    }

    function addTask() {
      const input = document.getElementById('task-input');
      const text = input.value.trim();
      if (text === '') return;
      tasks.push({ text, completed: false });
      input.value = '';
      saveTasks();
      renderTasks();
    }

    function toggleComplete(index) {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }

    renderTasks();