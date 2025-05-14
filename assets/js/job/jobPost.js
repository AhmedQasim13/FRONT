// jobForm.js

// يتم تشغيله عند تحميل الصفحة
window.addEventListener("DOMContentLoaded", () => {
    getLocation();
    loadSubServices();
});

// جلب الموقع باستخدام Geolocation API
function getLocation() {
    console.log("Button clicked: trying to get location...");
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                console.log("Location retrieved:");
                console.log("Latitude:", position.coords.latitude);
                console.log("Longitude:", position.coords.longitude);
                document.getElementById("latitude").value = position.coords.latitude;
                document.getElementById("longitude").value = position.coords.longitude;
            },
            function (error) {
                console.error("Geolocation error:", error);
                alert("Unable to retrieve location: " + error.message);
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}



// جلب SubServices من الـ API
async function loadSubServices() {
    try {
        const response = await fetch("https://localhost:7289/api/SubServices");
        if (!response.ok) {
            throw new Error("Failed to load sub-services");
        }

        const subServices = await response.json();
        const select = document.getElementById("subService");
        select.innerHTML = "";

        subServices.forEach(service => {
            const option = document.createElement("option");
            option.value = service.id;
            option.textContent = service.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading sub-services:", error);
        alert("Could not load services. Please try again later.");
    }
}

// إرسال الطلب إلى API لإنشاء وظيفة جديدة
document.getElementById("jobForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const description = document.getElementById("description").value;
    const latitude = parseFloat(document.getElementById("latitude").value);
    const longitude = parseFloat(document.getElementById("longitude").value);
    const subServiceId = parseInt(document.getElementById("subService").value);
    const applicationUserId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token"); // التوكن يجب أن يكون محفوظ هنا بعد تسجيل الدخول

    if (!token) {
        alert("You must be logged in to post a task.");
        return;
    }

    if (!latitude || !longitude) {
        alert("Location data not available. Please allow location access.");
        return;
    }

    const requestData = {
        description,
        latitude,
        longitude,
        subServiceId,
    };

    try {
        const response = await fetch("https://localhost:7289/api/Jobs/PostJob", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // 💡 إرسال التوكن هنا
            },
            body: JSON.stringify(requestData)
        });

        if (response.ok) {
            document.getElementById("jobForm").classList.add("d-none");
            const taskCard = document.getElementById("taskCard");
            taskCard.classList.remove("d-none");

            try {
                const response = await fetch('https://localhost:7289/api/GetPaids');

                if (response.ok) {
                    const baidsResponse = await response.json();

                    if (baidsResponse.length > 0) {
                        const createdJob = baidsResponse[0]; // نأخذ أول عنصر من النتائج

                        document.getElementById("taskImage").src = `assets/images/${createdJob.imageUrl}`;
                        document.getElementById("taskName").textContent = `${createdJob.firstName} ${createdJob.lastName}`;
                        document.getElementById("taskRating").textContent = createdJob.rate || "N/A";
                        document.getElementById("taskPrice").textContent = `$${createdJob.price || 0}`;
                    } else {
                        document.getElementById("page-title").textContent = "Your request is pending";
                    }

                } else {
                    console.error("API returned error status:", response.status);
                }
            } catch (error) {
                console.error("Failed to load task data:", error);
            }

        }
        else {
            const errorText = await response.text();
            alert("Failed to post task: " + errorText);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong.");
    }
});


// يتم تشغيله عند تحميل الصفحة
window.addEventListener("DOMContentLoaded", () => {
    getLocation();
    loadSubServices();
});

// جلب الموقع باستخدام Geolocation API
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                document.getElementById("latitude").value = position.coords.latitude;
                document.getElementById("longitude").value = position.coords.longitude;
            },
            function (error) {
                alert("Unable to retrieve location. Make sure location access is allowed.");
                console.error(error);
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// جلب SubServices من الـ API
async function loadSubServices() {
    try {
        const response = await fetch("https://localhost:7289/api/SubServices");
        if (!response.ok) {
            throw new Error("Failed to load sub-services");
        }

        const subServices = await response.json();
        const select = document.getElementById("subService");
        select.innerHTML = "";

        subServices.forEach(service => {
            const option = document.createElement("option");
            option.value = service.id;
            option.textContent = service.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading sub-services:", error);
        alert("Could not load services. Please try again later.");
    }
}

