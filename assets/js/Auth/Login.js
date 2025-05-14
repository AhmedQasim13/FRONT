document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const data = {
      email: document.getElementById('email').value.trim(),
      password: document.getElementById('password').value
    };
  
    try {
      const response = await fetch('https://localhost:7289/api/Account/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        const token = await response.text(); // Get token as plain text
        sessionStorage.setItem('token', token);
        window.location.href = 'index.html'; // Redirect to index.html or another page after login
      } else {
        const errorData = await response.json();
        alert('Login failed: ' + (errorData.message || JSON.stringify(errorData)));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network or server error. Check console.');
    }
  });
  