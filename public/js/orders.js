/////////////////////////////////////////////////////////////////////
// Global variables
/////////////////////////////////////////////////////////////////////
let platesSelected = [];
let editMode = false;

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
  plateSelect.innerHTML = '<option disabled selected>Pick a plate</option>';
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
  newPlate.id = `plate-${plateSelect.selectedIndex}`;
  newPlate.classList.add('grid', 'grid-cols-6');

  const deleteBtn = `<button class="btn-xs btn-error deletePlateBtn" id="delete-${plateSelect.selectedIndex}">X</button>`;

  newPlate.innerHTML = `
  <th class="col-span-4">${plateSelect.value}</th> 
  <th class="col-span-1">${qty.value}</th> 
  <th class="col-span-1">${deleteBtn}</th> 
`;

  selectedPlatesTable.append(newPlate);

  const plateOption = document.getElementById(plateSelect.selectedIndex);
  plateOption.style.display = 'none';

  //cleanup
  platesSelected.push({ item_id: plateSelect.selectedIndex, qty: qty.value });
  plateSelect.value = 'Pick a plate';
  qty.value = 1;
  refreshELs();
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

  const table_no = document.getElementById('table_no');
  const active = document.getElementById('isComplete');
  const plateSelect = document.getElementById(`plate-${id}`);

  table_no.value = order.table_no;
  active.checked = order.completed;

  const tableBody = document.getElementById('selectedPlatesTable');
  tableBody.innerHTML = '';

  order.orderedItems.forEach((item) => {
    const orderedItem = document.createElement('tr');
    orderedItem.id = `plate-${item.id}`;
    const deleteBtn = `<button class="btn-xs btn-error deletePlateBtn" id="delete-${item.id}">X</button>`;

    orderedItem.classList.add('grid', 'grid-cols-6');
    orderedItem.innerHTML = `
    <td class="col-span-4">${item.menu.item}</td> 
    <th class="col-span-1">${item.quantity}</th> 
    <td class="col-span-1">${deleteBtn}</td> 
 `;

    tableBody.appendChild(orderedItem);

    // swapSelectOption(item.menu.id);
    const plateOption = document.getElementById(item.menu.id);
    plateOption.remove();
  });

  editModeOn();
  refreshELs();
};

/////////////////////////////////////////////////////////////////////
// Swap Edit Mode and Create Mode
/////////////////////////////////////////////////////////////////////
const editModeOn = () => {
  const title = document.getElementById('title');
  const createBtn = document.getElementById('createOrderBtn');
  const editBtn = document.getElementById('editOrderBtn');
  const cancelBtn = document.getElementById('cancelBtn');

  if (!editMode) {
    title.textContent = 'Edit Order';
    createBtn.style.display = 'none';
    editBtn.style.display = 'block';
    cancelBtn.style.display = 'block';
    editMode = true;
  }
};

/////////////////////////////////////////////////////////////////////
// CANCEL EDIT AND SWITCH BACK TO CREATE FORM
/////////////////////////////////////////////////////////////////////

const cancelBtnHandler = async (event) => {
  event.preventDefault();

  document.getElementById('title').innerHTML = 'Create New Order';
  document.getElementById('editOrderBtn').style.display = 'none';
  document.getElementById('cancelBtn').style.display = 'none';
  document.getElementById('createOrderBtn').style.display = 'block';

  document.getElementById('table_no').value = '';
  document.getElementById('isComplete').checked = false;

  const tableBody = document.getElementById('selectedPlatesTable');
  tableBody.innerHTML = '';
};

document.getElementById('cancelBtn').addEventListener('click', () => location.reload());

/////////////////////////////////////////////////////////////////////
// Event Listener for Save Order Button
/////////////////////////////////////////////////////////////////////

const saveEditedItem = async (event) => {
  event.preventDefault();

  const table_no = document.getElementById('table_no').value.trim();
  const active = document.getElementById('isComplete').checked;

  if (platesSelected.length <= 0) {
    alert('You need to select at least one plate.');
    return;
  }
  if (table_no) {
    const response = await fetch(`/api/orders/${event.target}`, {
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

  if (item && price) {
    const response = await fetch(`/api/menu/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ item, price, active }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Item modified successfully!');
      location.reload();
    } else {
      const resJson = await response.json();
      alert(`${response.statusText}\r${resJson.message}`);
    }
  }
};

document.getElementById('editOrderBtn').addEventListener('click', saveEditedItem);

/* const swapSelectOption = (id) => {
  const plateSelected = document.getElementById(`plate-${id}`);
  const plateOption = document.getElementById(id);

  if (plateSelected) {
    plateSelected.remove();
    plateOption.style.display = 'block';
  } else {
    const plateSelect = document.getElementById('plateSelect');
    console.log(plateSelect);
  }
}; */

/////////////////////////////////////////////////////////////////////
// Event listener refresher
/////////////////////////////////////////////////////////////////////
const refreshELs = () => {
  const editBtns = document.querySelectorAll('.editBtn');
  editBtns.forEach((btn) => btn.addEventListener('click', editOrder));

  const deleteBtns = document.querySelectorAll('.deletePlateBtn');
  deleteBtns.forEach((btn) => btn.addEventListener('click', deletePlate));
};

refreshELs();
