const signupFormHandler = async (event) => {
  event.preventDefault();

  const first_name = document.getElementById("firstNameSignup").value.trim();
  const last_name = document.getElementById("lastNameSignup").value.trim();
  const email = document.getElementById("emailSignup").value.trim();
  const password = document.getElementById("passwordSignup").value.trim();

  try {
    if (first_name && last_name && email && password) {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ first_name, last_name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/profile");
      } else {
        const myJson = await response.json();
        alert(myJson.errors[0].message);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const signinFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#emailSignin").value.trim();
  const password = document.querySelector("#passwordSignin").value.trim();

  if (email && password) {
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      const resJson = await response.json();
      alert(`${response.statusText}\n\n${resJson.message}`);
    }
  }
};

document.getElementById("signupButton").addEventListener("click", signupFormHandler);
document.getElementById("signinButton").addEventListener("click", signinFormHandler);
