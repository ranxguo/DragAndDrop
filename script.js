const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
  ];

  //Store list items
  const listItems = [];

  let dragStarIndex;

  createList();

  //Insert list items into DOM
  function createList() {
      [...richestPeople]
      .map(a => ({value: a, sort: Math.random()}))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value)
      .forEach((person, index) => {
          //console.log(person);
          const listItem = document.createElement('li');

          listItem.setAttribute('data-index', index);

          listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            <div>
          `;

          listItems.push(listItem);

          draggable_list.appendChild(listItem);
      });

      addEventListeners();
  }

    function dragStart() {
        dragStarIndex = +this.closest('li').getAttribute('data-index');
        //console.log(dragStarIndex);
    }
    function dragEnter() {
        this.classList.add('over');
    }
    function dragLeave() {
        this.classList.remove('over');
    }
    function dragOver(e) {
        e.preventDefault();
    }
    function dragDrop() {
        const dragEndIndex = this.getAttribute('data-index');
        swapItems(dragStarIndex, dragEndIndex);
        this.classList.remove('over');
    }

    function swapItems(fromIndex, toIndex) {
        const itemOne = listItems[fromIndex].querySelector('.draggable');
        const itemTwo = listItems[toIndex].querySelector('.draggable');

        listItems[fromIndex].appendChild(itemTwo);
        listItems[toIndex].appendChild(itemOne);
    }

    function checkOrder() {
        listItems.forEach((listItem, index) => {
            const personName = listItem.querySelector('.draggable').innerText.trim();

            if (personName !== richestPeople[index]) {
                listItem.classList.add('wrong');
            } else {
                listItem.classList.remove('wrong');
                listItem.classList.add('right');
            }
        });
    }

  function addEventListeners() {
      const draggables = document.querySelectorAll('.draggable');
      const dragListItems = document.querySelectorAll('.draggable-list li');

      draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
      });

      dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
      });
  }

  check.addEventListener('click', checkOrder);