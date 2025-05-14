document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');

  if (!form) {
    console.error('Form not found!');
    return;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // 🛑 Prevent default HTML form submission

    const loading = document.querySelector('.loading');
    const error = document.querySelector('.error-message');
    const sent = document.querySelector('.sent-message');

    loading.style.display = 'block';
    error.style.display = 'none';
    sent.style.display = 'none';

    const formData = new FormData(form);

    fetch('https://localhost:7289/api/ContactUs', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      loading.style.display = 'none';
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text); });
      }
      return response.text();
    })
    .then(data => {
      sent.style.display = 'block';
      console.log('Success:', data);
    })
    .catch(err => {
      error.textContent = 'Error: ' + err.message;
      error.style.display = 'block';
      console.error(err);
    });
  });
});
