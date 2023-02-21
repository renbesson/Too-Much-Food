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
