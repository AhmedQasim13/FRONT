document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('updateProfilePictureForm');
    const fileInput = document.getElementById('img');
    const imgTrigger = document.getElementById('imgTrigger');

    imgTrigger.addEventListener('click', function () {
        fileInput.click(); // يفتح نافذة اختيار الملف
    });

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        if (fileInput.files.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'No Image Selected',
                text: 'Please choose an image to upload.'
            });
            return;
        }

        const formData = new FormData();
        formData.append('ImgUrl', fileInput.files[0]);

        try {
            const response = await fetch('https://localhost:7289/api/Profile/UpdateProfilePicture', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: result.message || 'Profile picture updated.'
                });

                // تحديث صورة البروفايل في الصفحة (اختياري)
                // document.getElementById('profileImgTag').src = result.imageUrl;

                form.reset();
            } else {
                const errorText = await response.text();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorText
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Network Error',
                text: 'Something went wrong.'
            });
            console.error(err);
        }
    });
});
