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
      console.log(resJson);
      alert(`${response.statusText}\r${resJson.message}`);
    }
  }
};

document.getElementById("createItemBtn").addEventListener("click", createMenuItemFormHandler);

let isEditing = null;

const editItem = async (event) => {
  isEditing = true;
  console.log(event.target.id);
};

////////////////////////////////////////////////////////////////////////
// Deletes a specific item from the menu
////////////////////////////////////////////////////////////////////////
const deleteItem = async (event) => {
  const id = event.target.id.split("-")[1];

  const response = await fetch(`/api/menu/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    alert("Item deleted successfully!");
    location.reload();
  } else {
    const resJson = await response.json();
    console.log(resJson);
    alert(`${response.statusText}\r${resJson.message}`);
  }
};

const editCardsBtn = document.querySelectorAll(".editBtn");

const deleteCardsBtn = document.querySelectorAll(".deleteBtn");

editCardsBtn.forEach((card) => card.addEventListener("click", editItem));

deleteCardsBtn.forEach((card) => card.addEventListener("click", deleteItem));
