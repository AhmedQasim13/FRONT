

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!navigator.geolocation) {
      Swal.fire({
        icon: "error",
        title: "Geolocation Not Supported",
        text: "Your browser does not support geolocation."
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(async function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const formData = new FormData(form);

      const data = {
        FirstName: formData.get("FirstName"),
        LastName: formData.get("LastName"),
        Email: formData.get("Email"),
        Password: formData.get("Password"),
        ConfirmPassword: formData.get("ConfirmPassword"),
        UserName: formData.get("Email"),
        LocationLatitude: latitude,
        LocationLongitude: longitude
      };

      try {
        const response = await fetch("https://localhost:7289/api/Account/Register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            if (result.token) {
        localStorage.setItem("token", result.token); // Save token for future use
      }
          await Swal.fire({
            icon: "success",
            title: "Registration Successful",
            text: "You have successfully registered!"
          });
          // Redirect after user confirms alert
          window.location.href = "index.html";
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: result.message || "Registration failed"
          });
        }
      } catch (err) {
        console.error("Registration Error:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong during registration."
        });
      }
    }, function (error) {
      Swal.fire({
        icon: "error",
        title: "Location Error",
        text: "Unable to retrieve your location: " + error.message
      });
    });
  });
});

