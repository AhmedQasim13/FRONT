function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

function updateNavbar() {
    const token = sessionStorage.getItem('token');
    const profileLink = document.getElementById('profileLink');
    const logoutLink = document.getElementById('logoutLink');
    const registerLink = document.getElementById('registerLink');
    const loginLink = document.getElementById('loginLink');
    const adminPanelLink = document.getElementById('adminPanelLink');

    if (token) {
        const decoded = parseJwt(token);
        const now = Math.floor(Date.now() / 1000);

        if (decoded && decoded.exp > now) {
            // ✅ التوكن صالح
            profileLink.style.display = 'block';
            logoutLink.style.display = 'block';
            registerLink.style.display = 'none';
            loginLink.style.display = 'none';

            // 🟢 تحديد رابط الصفحة حسب الدور
            if (decoded.role === 'User') {
                
            } else if (decoded.role === 'Doctor') {
                
            }

            // إظهار لوحة التحكم إذا كان Admin
            if (decoded.role === 'Admin') {
                adminPanelLink.style.display = 'none';
            } else {
                adminPanelLink.style.display = 'none';
            }

            return true;
        } else {
            // ❌ التوكن منتهي
            sessionStorage.removeItem('token');
        }
    }

    // ❌ لا يوجد توكن أو منتهي
    profileLink.style.display = 'none';
    logoutLink.style.display = 'none';
    registerLink.style.display = 'block';
    loginLink.style.display = 'block';
    if (adminPanelLink) adminPanelLink.style.display = 'none';
    return false;
}

// ✅ تسجيل الخروج
document.getElementById('logout')?.addEventListener('click', function () {
    sessionStorage.removeItem('token');
    alert('You have been logged out!');
    window.location.href = 'Login.html';
});

// ✅ استدعاء التحديث
updateNavbar();
