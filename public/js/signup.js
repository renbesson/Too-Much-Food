const signupFormHandler = async (event) => {
  event.preventDefault();

  const first_name = document.getElementById("f-name").value.trim();
  const last_name = document.getElementById("l-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (first_name && last_name && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ first_name, last_name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      const myJson = await response.json();
      alert(`${response.statusText}\n${myJson.errors[0].message}`);
    }
  }
};

document.getElementById("signupButton").addEventListener("click", signupFormHandler);
