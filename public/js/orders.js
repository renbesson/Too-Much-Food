/////////////////////////////////////////////////////////////////////
// Global variables
/////////////////////////////////////////////////////////////////////
let platesSelected = [];

/////////////////////////////////////////////////////////////////////
// Creates a new order
/////////////////////////////////////////////////////////////////////
const createOrderFormHandler = async (event) => {
  event.preventDefault();

  const table_no = document.getElementById("table_no").value.trim();
  const active = document.getElementById("isComplete").checked;

  if (platesSelected.length <= 0) {
    alert("You need to select at least one plate.");
    return;
  }
  if (table_no) {
    const response = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({ table_no, completed: active, menuIds: platesSelected }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("Order created successfully!");
      location.reload();
    } else {
      alert(`Error ${response.status}\n${response.statusText}`);
    }
  }
};

document.getElementById("createOrderBtn").addEventListener("click", createOrderFormHandler);

/////////////////////////////////////////////////////////////////////
// Gets all plates
/////////////////////////////////////////////////////////////////////
const getPlates = async () => {
  const response = await fetch("/api/menu/menuJson", {
    method: "GET",
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
  const plateSelect = document.getElementById("plateSelect");
  const plates = await getPlates();

  plates.forEach((plate) => {
    const option = document.createElement("option");
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

  const selectedPlatesTable = document.getElementById("selectedPlatesTable");
  const plateSelect = document.getElementById("plateSelect");
  const qty = document.getElementById("qty");

  const newPlate = document.createElement("tr");
  const newPlateName = document.createElement("td");
  const newPlateQty = document.createElement("td");
  const newPlateDeleteBtn = document.createElement("button");

  newPlate.classList.add("grid", "grid-cols-6");
  newPlateName.classList.add("col-span-4");
  newPlateQty.classList.add("col-span-1");
  newPlateDeleteBtn.classList.add("btn", "btn-error", "col-span-1", "deletePlateBtn");

  newPlateName.textContent = plateSelect.value;
  newPlateQty.textContent = qty.value;
  newPlateDeleteBtn.textContent = "X";

  newPlate.id = `plate-${plateSelect.selectedIndex}`;
  newPlateDeleteBtn.id = `delete-${plateSelect.selectedIndex}`;

  newPlateDeleteBtn.addEventListener("click", deletePlate);

  newPlate.append(newPlateName, newPlateQty, newPlateDeleteBtn);

  selectedPlatesTable.append(newPlate);

  const plateOption = document.getElementById(plateSelect.selectedIndex);
  plateOption.style.display = "none";

  //cleanup
  platesSelected.push({ item_id: plateSelect.selectedIndex, qty: qty.value });
  plateSelect.value = "Pick a plate";
  qty.value = 1;
};

document.getElementById("addPlateBtn").addEventListener("click", addPlate);

/////////////////////////////////////////////////////////////////////
// Event listener for Delete plate button
/////////////////////////////////////////////////////////////////////
const deletePlate = (event) => {
  event.preventDefault();

  const id = event.target.id.split("-")[1];
  const plateSelect = document.getElementById(`plate-${id}`);
  const plateOption = document.getElementById(id);

  plateSelect.remove();
  plateOption.style.display = "block";

  platesSelected = platesSelected.filter((item) => item.item_id != id);
};

// ACTIVATE EDIT FORM

const editItemForm = async (event) => {
  id = event.target.id.split("-")[1];
  const menu_item = document.getElementById("item-" + id).textContent;
  const get_price = document.getElementById("price-" + id).textContent;
  const menu_price = parseFloat(get_price.substring(8));
  const menu_active = document.getElementById("active-" + id).textContent;
  document.getElementById("editItemBtn").style.display = "block";
  document.getElementById("editHead").style.display = "block";
  document.getElementById("createItemBtn").style.display = "none";
  document.getElementById("createHead").style.display = "none";
  document.getElementById("cancelBtn").style.display = "block";

  document.getElementById("item").value = menu_item;
  document.getElementById("price").value = menu_price;
  if (menu_active == "Active") {
    document.getElementById("isActive").checked = true;
  } else {
    document.getElementById("isActive").checked = false;
  }
};
