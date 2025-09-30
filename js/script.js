document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("message");

  if (username === "BARANI" && password === "123456") {
    msg.style.color = "green";
    msg.textContent = "Login successful!";
    window.location.href = "dashboard.html"; // Create another page later
  } else {
    msg.style.color = "red";
    msg.textContent = "Invalid username or password";
  }
});
