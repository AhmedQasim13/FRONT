document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('updateProfileForm');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('⚠️ لا يوجد توكن في الجلسة');
            Swal.fire({
                icon: 'error',
                title: 'Session Expired',
                text: 'الرجاء تسجيل الدخول مجددًا.',
            });
            return;
        }

        const data = {
            firstName: document.getElementById('modalFirstName').value.trim(),
            lastName: document.getElementById('modalLastName').value.trim(),
            userName: document.getElementById('modalUserName').value.trim(),
            email: document.getElementById('modalEmail').value.trim(),
            phoneNumber: document.getElementById('modalPhone').value.trim(),
            street: document.getElementById('modalStreet').value.trim(),
            city: document.getElementById('modalCity').value.trim(),
            country: document.getElementById('modalCountry').value.trim(),
            district: document.getElementById('modalDistrict').value.trim(),
            zipCode: document.getElementById('modalZipCode').value.trim(),
            buildingNumber: parseInt(document.getElementById('modalBuildingNumber').value) || null
        };

        console.log("📤 إرسال البيانات:", data);

        try {
            const response = await fetch('https://localhost:7289/api/Profile/UpdateProfile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'تم التحديث بنجاح',
                    text: result.message || 'تم تحديث معلوماتك.',
                    timer: 2000,
                    showConfirmButton: false
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'فشل التحديث',
                    text: result.message || 'تحقق من البيانات وأعد المحاولة.',
                });
                console.error("❌ استجابة غير ناجحة:", result);
            }
        } catch (error) {
            console.error("❌ فشل الاتصال:", error);
            Swal.fire({
                icon: 'error',
                title: 'خطأ في الاتصال',
                text: 'حدث خطأ أثناء إرسال البيانات إلى الخادم.',
            });
        }
    });
});
