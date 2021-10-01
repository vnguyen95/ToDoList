document.addEventListener('DOMContentLoaded', (event) => {
    const list = document.getElementById('task-list');
    const tskli = document.createElement('li');  
    const msg = document.createElement('p');
    const remove = document.createElement('button')
  
    list.appendChild(tskli);
    tskli.appendChild(msg);
    msg.appendChild(remove);    
    remove.innerText = 'X';
  
    // remove.className('remove');
    let hasRender = false;
  
    // couldn't display tasks, unknown error
  
    // render individual tasks
    function render (data) {
      hasRender = true;
  
      for (let i = 0; i < data.length; i++) {
        msg.innerHTML = data[i].item;
  
        tskli.appendChild(msg);
        msg.appendChild(remove);      
        // remove messages on click
        remove.addEventListener('click', () => {
          const payload = {
            id: data[i].id
          };
          const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload) 
          };
          fetch('/delete',
            options);
        });
      }
    }
  
    // display messages on button click
    const retrieveBtn = document.getElementById('retrieve') 
    retrieveBtn.addEventListener('click', () => {
      fetchMsg();
    });
    // post message on click
    const insert = document.getElementById('task-button');
    insert.addEventListener('click', () => {
      createTask();
    });
  
    // fetch all messages from api
    function fetchMsg () {
      const options = {
        method:'GET',
      };
      fetch('/get', options)
        .then(res => res.json())
        .then(result => console.log(result))  // then log it out
        .then(results => render(results))
        .catch(error => console.log('error', error));
    }
  
    // post request
    function createTask() {
      const item = document.getElementById('task').value;
      const created_at = new Date().toJSON();
      const payload = {
        item,
        created_at 
      };
      // console.log(payload);
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload) 
      };
  
      fetch('/post',
        options)
        .then(response => response.json())
        .then(result => render(result));
    }
  }); 