//CREATE MENU ITEM

const createMenuItemFormHandler = async (event) => {
  event.preventDefault();

  const item = document.getElementById("item").value.trim();
  const price = document.getElementById("price").value.trim();
  const active = document.getElementById("isActive").checked;

  if (item && price) {
    const response = await fetch("/api/menu", {
      method: "POST",
      body: JSON.stringify({ item, price, active }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("Item created successfully!");
      location.reload();
    } else {
      const resJson = await response.json();
      alert(`${response.statusText}\r${resJson.message}`);
    }
  }
};

document.getElementById("createItemBtn").addEventListener("click", createMenuItemFormHandler);

// ID TO MODIFY MENU ITEM

var id = null;

// ACTIVATE EDIT FORM

const editItemForm = async (event) => {
  id = event.target.id.split("-")[1];
  const menu_item = document.getElementById("item-"+id).textContent;
  const get_price = document.getElementById("price-"+id).textContent;
  const menu_price = parseFloat(get_price.substring(8));
  const menu_active = document.getElementById("active-"+id).textContent;
  document.getElementById("editItemBtn").style.display = "block";
  document.getElementById("editHead").style.display = "block";
  document.getElementById("createItemBtn").style.display = "none";
  document.getElementById("createHead").style.display = "none";
  document.getElementById("cancelBtn").style.display = "block";

  document.getElementById("item").value = menu_item;
  document.getElementById("price").value = menu_price;
  if (menu_active == "Active") {
    document.getElementById("isActive").checked = true;
  }
  else {
    document.getElementById("isActive").checked = false;
  }
  
};

const editCardsBtn = document.querySelectorAll(".editBtn");
editCardsBtn.forEach((card) => card.addEventListener("click", editItemForm));

// CANCEL EDIT AND SWITCH BACK TO CREATE FORM

const cancelBtnHandler = async () => {
  event.preventDefault();
  
  document.getElementById("editItemBtn").style.display = "none";
  document.getElementById("editHead").style.display = "none";
  document.getElementById("createItemBtn").style.display = "block";
  document.getElementById("createHead").style.display = "block";
  document.getElementById("cancelBtn").style.display = "none";

  document.getElementById("item").value = "";
  document.getElementById("price").value = "";
  document.getElementById("isActive").checked = false;
};

document.getElementById("cancelBtn").addEventListener("click", cancelBtnHandler);


// EDIT MENU ITEM

const editItem = async (event) => {
  event.preventDefault();

  const item = document.getElementById("item").value.trim();
  const price = document.getElementById("price").value.trim();
  const active = document.getElementById("isActive").checked;

  if (item && price) {
    const response = await fetch(`/api/menu/${id}`, {
      method: "PUT",
      body: JSON.stringify({ item, price, active }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("Item modified successfully!");
      location.reload();
    } else {
      const resJson = await response.json();
      alert(`${response.statusText}\r${resJson.message}`);
    }
  }
};

document.getElementById("editItemBtn").addEventListener("click", editItem);
