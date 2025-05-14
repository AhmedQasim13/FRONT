document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('updatePasswordForm');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const oldPassword = document.getElementById('oldPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: 'warning',
                title: 'Validation Error',
                text: 'New password and confirmation do not match.'
            });
            return;
        }

        const requestBody = {
            OldPassword: oldPassword,
            NewPassword: newPassword,
            ConfirmPassword: confirmPassword
        };

        try {
            const response = await fetch('https://localhost:7289/api/Profile/UpdatePassword', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const result = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: 'Password Updated',
                    text: 'Your password has been changed successfully.'
                });
                form.reset();
            } else {
                const errorText = await response.text();
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: errorText
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while updating your password.'
            });
            console.error(error);
        }
    });
});
