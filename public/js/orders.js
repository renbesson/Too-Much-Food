/////////////////////////////////////////////////////////////////////
// Global variables
/////////////////////////////////////////////////////////////////////
let platesSelected = [];

/////////////////////////////////////////////////////////////////////
// Creates a new order
/////////////////////////////////////////////////////////////////////
const createOrderFormHandler = async (event) => {
  event.preventDefault();

  const table_no = document.getElementById('table_no').value.trim();
  const active = document.getElementById('isComplete').checked;

  if (platesSelected.length <= 0) {
    alert('You need to select at least one plate.');
    return;
  }
  if (table_no) {
    const response = await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify({ table_no, completed: active, menuIds: platesSelected }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Order created successfully!');
      location.reload();
    } else {
      alert(`Error ${response.status}\n${response.statusText}`);
    }
  }
};

document.getElementById('createOrderBtn').addEventListener('click', createOrderFormHandler);

/////////////////////////////////////////////////////////////////////
// Gets all plates
/////////////////////////////////////////////////////////////////////
const getPlates = async () => {
  const response = await fetch('/api/menu/menuJson', {
    method: 'GET',
  });

  if (response.ok) {
    const plates = await response.json();
    return plates;
  } else {
    alert(`${response.status}\r${response.statusText}`);
  }
};

/////////////////////////////////////////////////////////////////////
// Loads all plate options to the select input
/////////////////////////////////////////////////////////////////////
let loadPlates = async () => {
  const plateSelect = document.getElementById('plateSelect');
  const plates = await getPlates();

  plates.forEach((plate) => {
    const option = document.createElement('option');
    option.id = plate.id;
    option.text = plate.item;

    plateSelect.add(option);
  });
};

loadPlates();

/////////////////////////////////////////////////////////////////////
// Event listener for add plate button
/////////////////////////////////////////////////////////////////////

const addPlate = (event) => {
  event.preventDefault();

  const selectedPlatesTable = document.getElementById('selectedPlatesTable');
  const plateSelect = document.getElementById('plateSelect');
  const qty = document.getElementById('qty');

  const newPlate = document.createElement('tr');
  const newPlateName = document.createElement('td');
  const newPlateQty = document.createElement('td');
  const newPlateDeleteBtn = document.createElement('button');

  newPlate.classList.add('grid', 'grid-cols-6');
  newPlateName.classList.add('col-span-4');
  newPlateQty.classList.add('col-span-1');
  newPlateDeleteBtn.classList.add('btn', 'btn-error', 'col-span-1', 'deletePlateBtn');

  newPlateName.textContent = plateSelect.value;
  newPlateQty.textContent = qty.value;
  newPlateDeleteBtn.textContent = 'X';

  newPlate.id = `plate-${plateSelect.selectedIndex}`;
  newPlateDeleteBtn.id = `delete-${plateSelect.selectedIndex}`;

  newPlateDeleteBtn.addEventListener('click', deletePlate);

  newPlate.append(newPlateName, newPlateQty, newPlateDeleteBtn);

  selectedPlatesTable.append(newPlate);

  const plateOption = document.getElementById(plateSelect.selectedIndex);
  plateOption.style.display = 'none';

  //cleanup
  platesSelected.push({ item_id: plateSelect.selectedIndex, qty: qty.value });
  plateSelect.value = 'Pick a plate';
  qty.value = 1;
};

document.getElementById('addPlateBtn').addEventListener('click', addPlate);

/////////////////////////////////////////////////////////////////////
// Event listener for Delete plate button
/////////////////////////////////////////////////////////////////////
const deletePlate = (event) => {
  event.preventDefault();

  const id = event.target.id.split('-')[1];

  const plateSelect = document.getElementById(`plate-${id}`);
  const plateOption = document.getElementById(id);

  plateSelect.remove();
  plateOption.style.display = 'block';

  platesSelected = platesSelected.filter((item) => item.item_id != id);
};

/////////////////////////////////////////////////////////////////////
// Event listener for Edit order button
/////////////////////////////////////////////////////////////////////
const editOrder = (event) => {
  event.preventDefault();

  const id = event.target.id.split('-')[1];
  const order = JSON.parse(event.target.dataset.order);
  console.log(order);

  const table_no = document.getElementById('table_no');
  const active = document.getElementById('isComplete');
  const plateSelect = document.getElementById(`plate-${id}`);
  const plateOption = document.getElementById(id);

  table_no.value = order.table_no;
  active.checked = order.completed;

  const tableBody = document.getElementById('selectedPlatesTable');
  tableBody.innerHTML = '';

  order.orderedItems.forEach((item) => {
    const orderedItem = document.createElement('tr');
    orderedItem.id = `plate-${item.id}`;
    const deleteBtn = `<button class="btn btn-error col-span-1 deletePlateBtn" id="delete-${item.id}">X</button>`;

    orderedItem.classList.add('grid', 'grid-cols-6');
    orderedItem.innerHTML = `
    <th class="col-span-4">${item.menu.item}</th> 
    <th class="col-span-1">${item.quantity}</th> 
    <th class="col-span-1">${deleteBtn}</th> 
 `;

    tableBody.appendChild(orderedItem);
  });
  //plateSelect.remove();
  //plateOption.style.display = 'block';

  //platesSelected = platesSelected.filter((item) => item.item_id != id);
  refreshELs();
};

/////////////////////////////////////////////////////////////////////
// Event listener refresher
/////////////////////////////////////////////////////////////////////
const refreshELs = () => {
  console.log('dasd');
  const editBtns = document.querySelectorAll('.editBtn');
  editBtns.forEach((btn) => btn.addEventListener('click', editOrder));

  const deleteBtns = document.querySelectorAll('.deletePlateBtn');
  deleteBtns.forEach((btn) => btn.addEventListener('click', deletePlate));
};

refreshELs();
