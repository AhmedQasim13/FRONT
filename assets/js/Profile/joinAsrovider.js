document.addEventListener('DOMContentLoaded', function () {
    const joinLink = document.getElementById('joinAsProviderLink');

    if (joinLink) {
        joinLink.addEventListener('click', async function (e) {
            e.preventDefault(); // منع التنقل الفوري

            try {
                const token = sessionStorage.getItem('token'); // تأكد أن التوكن محفوظ بهذا الاسم

                console.log('Sending request to JoinAsProvider API...');

                const response = await fetch('https://localhost:7289/api/PendingProviderVerification/JoinAsProvider', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                let result = {};
                const text = await response.text();
                if (text) {
                    result = JSON.parse(text);
                }

                console.log('Response received:', result);

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: result.message || 'Joined successfully!'
                    });
                } else {
                    console.error('API Error:', result);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: result.message || 'Something went wrong!'
                    });
                }
            } catch (error) {
                console.error('Fetch Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to connect to server.'
                });
            }
        });
    }
});
