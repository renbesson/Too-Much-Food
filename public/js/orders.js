const { Menu, User } = require("../../models");

//CREATE ORDER

const createOrderFormHandler = async (event) => {
  event.preventDefault();

  const table = document.getElementById("table").value.trim();
  const active = document.getElementById("isComplete").checked;

  if (table) {
    const response = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({ table_no: table, active }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("Order created successfully!");
      location.reload();
    } else {
      const resJson = await response.json();
      alert(`${response.statusText}\r${resJson.errors[0].message}`);
    }
  }
};

document.getElementById("createOrderBtn").addEventListener("click", createOrderFormHandler);

const getPlates = async () => {
  try {
    const menuData = await Menu.findAll();
    const menuItems = menuData.map((menu) => menu.get({ plain: true }));

    return menuItems;
  } catch (error) {
    return { error: error };
  }
};

let loadPlates = () => {
  const plateSelect = document.getElementById("plateSelect");
  getPlates().forEach((plate) => {
    console.log(plate);
  });
};

loadPlates();

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
