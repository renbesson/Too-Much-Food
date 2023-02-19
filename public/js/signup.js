const signupFormHandler = async (event) => {
  event.preventDefault();

  const formObj = {
    first_name: document.getElementById("f-name").value.trim(),
    last_name: document.getElementById("l-name").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value.trim(),
  };
  const repassword = document.getElementById("repassword").value.trim();

  if (!Object.values(formObj).includes("")) {
    if (formObj.password === repassword) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(formObj),
        headers: { "Content-Type": "application/json" },
      });

      if (response?.ok) {
        document.location.replace("/");
      } else {
        const myJson = await response.json();
        alert(`${response.statusText}\n${myJson.errors[0].message}`);
      }
    } else {
      alert("Password fields don't match.");
    }
  } else {
    alert("Please fill all fields.");
  }
};

document.getElementById("signupButton").addEventListener("click", signupFormHandler);
