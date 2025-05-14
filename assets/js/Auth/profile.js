// document.addEventListener("DOMContentLoaded", async function () {
//     const token = sessionStorage.getItem("token");

//     if (!token) {
//         console.error("JWT token not found in sessionStorage.");
//         Swal.fire({
//             icon: 'error',
//             title: 'Unauthorized',
//             text: 'You must be logged in to view this profile.',
//         });
//         return;
//     }

//     try {
//         const response = await fetch("https://localhost:7289/api/Profile/Profile", {
//             method: "GET",
//             headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "Content-Type": "application/json"
//             }
//         });

//         if (!response.ok) {
//             if (response.status === 401 || response.status === 403) {
//                 Swal.fire({
//                     icon: 'warning',
//                     title: 'Access Denied',
//                     text: 'You are not authorized to access this resource.',
//                 });
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error',
//                     text: `Server responded with status: ${response.status}`,
//                 });
//             }
//             return;
//         }

//         const data = await response.json();

//         console.log("User Profile Data:", data);

//         // ✅ تعبئة الحقول في الفورم الرئيسي
//         document.getElementById("firstName").value = data.firstName || "";
//         document.getElementById("lastName").value = data.lastName || "";
//         document.getElementById("displayName").value = data.userName || "";
//         document.getElementById("email").value = data.email || "";
//         document.getElementById("phoneNumber").value = data.phoneNumber || "";
//         document.getElementById("country").value = data.country || "";
//         document.getElementById("city").value = data.city || "";
//         document.getElementById("district").value = data.district || "";
//         document.getElementById("street").value = data.street || "";
//         document.getElementById("zipCode").value = data.zipCode || "";
//         document.getElementById("buildingNumber").value = data.buildingNumber || "";

//         // ✅ تعبئة الحقول في المودال
//         document.getElementById("modalFirstName").value = data.firstName || "";
//         document.getElementById("modalLastName").value = data.lastName || "";
//         document.getElementById("modalUserName").value = data.userName || "";
//         document.getElementById("modalEmail").value = data.email || "";
//         document.getElementById("modalPhone").value = data.phoneNumber || "";
//         document.getElementById("modalStreet").value = data.street || "";
//         document.getElementById("modalCity").value = data.city || "";
//         document.getElementById("modalCountry").value = data.country || "";
//         document.getElementById("modalDistrict").value = data.district || "";
//         document.getElementById("modalZipCode").value = data.zipCode || "";
//         document.getElementById("modalBuildingNumber").value = data.buildingNumber || "";

//         if(data.isRequested == true) {
//             let ele = document.getElementById("joinAsProviderLink");
//             ele.style.pointerEvents = "none";
//             ele.innerHTML = "you'r request is pending";
//             ele.classList.add("bg-primary", "text-white", "rounded", "p-2", "text-center"); 
//             document.getElementById("uploadDocuments").style.display = "block";

//             // let documents = ["Personal ID", "birth certificate", "Criminal record certificate"];
//             try {
//                 // الحصول على التوكن من sessionStorage
//                 const token = sessionStorage.getItem("token");
            
//                 if (!token) {
//                   throw new Error("No token found in sessionStorage.");
//                 }
            
//                 // استدعاء API مع التوكن في الترويسة
//                 const response = await fetch("https://localhost:7289/api/DocumentTypes", {
//                   method: "GET",
//                   headers: {
//                     "Authorization": `Bearer ${token}`, // إرسال التوكن في الترويسة
//                     "Content-Type": "application/json"
//                   }
//                 });
            
//                 if (!response.ok) {
//                   throw new Error("Failed to fetch document types.");
//                 }
            
//                 const documentTypes = await response.json();
//                 console.log("Document Types:", documentTypes);

//                 const form = document.getElementById("uploadDocumentsForm");

//                 form.addEventListener("submit", async function (e) {
//                 e.preventDefault();

//                 const fileInput = form.querySelector('input[name="document"]');
//                 const file = fileInput.files[0];

//                 if (!file) {
//                     Swal.fire({
//                     icon: "warning",
//                     title: "No File Selected",
//                     text: "Please choose a document to upload."
//                     });
//                     return;
//                 }

//                 // إعداد البيانات لاستخدامها في FormData
//                 const formData = new FormData();
//                 formData.append("File", file); // تأكد أن الاسم يطابق اسم الخاصية IFormFile File

//                 // الحصول على التوكن من sessionStorage
//                 const token = sessionStorage.getItem("token");

//                 let i = 0;
//                 document.getElementById("documentTitle").innerHTML += documentTypes[0].name;

//                 try {
//                     const response = await fetch("https://localhost:7289/api/Documents", {
//                     method: "POST",
//                     headers: {
//                         "Authorization": `Bearer ${token}`
//                         // لا تضف Content-Type هنا لأن fetch يضبطه تلقائيًا لـ multipart/form-data عند استخدام FormData
//                     },
//                     body: formData
//                     });

//                     const result = await response.json();
                    

//                     if (response.ok) {
//                         i++;
//                         if(i == documentTypes.length) {
//                             Swal.fire({
//                                 icon: "success",
//                                 title: "Upload Successful",
//                                 text: "Document uploaded successfully."
//                             })
//                         }
//                         document.getElementById("documentTitle").innerHTML += documentTypes[i].name;
//                     } else {
//                     Swal.fire({
//                         icon: "error",
//                         title: "Upload Failed",
//                         text: result.message || "An error occurred while uploading."
//                     });
//                     }
//                     } catch (err) {
//                         console.error("Upload Error:", err);
//                         Swal.fire({
//                         icon: "error",
//                         title: "Error",
//                         text: "Something went wrong while uploading the document."
//                         });
//                     }
//                 });

                

//                 // استخدام البيانات
//                 documentTypes.forEach(type => {
//                   console.log("ID:", type.id, "Name:", type.name);
//                 });
            
//               } catch (error) {
//                 console.error("Error fetching document types:", error.message);
//               }
            
//         }

//         // ✅ تعبئة قائمة الأدوار
//         if (data.roles && Array.isArray(data.roles)) {
//             const rolesList = document.getElementById("rolesList");
//             rolesList.innerHTML = "";
//             data.roles.forEach(role => {
//                 const li = document.createElement("li");
//                 li.textContent = role;
//                 li.classList.add("list-group-item");
//                 rolesList.appendChild(li);
//             });
//         }

//     } catch (error) {
//         console.error("Error fetching profile data:", error);
//         Swal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: 'Something went wrong while loading profile data.',
//         });
//     }
// });


// document.addEventListener("DOMContentLoaded", async function () {
//     const token = sessionStorage.getItem("token");

//     if (!token) {
//         console.error("JWT token not found in sessionStorage.");
//         Swal.fire({
//             icon: 'error',
//             title: 'Unauthorized',
//             text: 'You must be logged in to view this profile.',
//         });
//         return;
//     }

//     try {
//         const response = await fetch("https://localhost:7289/api/Profile/Profile", {
//             method: "GET",
//             headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "Content-Type": "application/json"
//             }
//         });

//         if (!response.ok) {
//             const message = response.status === 401 || response.status === 403 ?
//                 'You are not authorized to access this resource.' :
//                 `Server responded with status: ${response.status}`;
//             Swal.fire({ icon: 'error', title: 'Error', text: message });
//             return;
//         }

//         const data = await response.json();
//         console.log("User Profile Data:", data);

//         // Fill main form fields
//         const fields = ["firstName", "lastName", "displayName", "email", "phoneNumber",
//                         "country", "city", "district", "street", "zipCode", "buildingNumber"];
//         fields.forEach(field => {
//             const element = document.getElementById(field);
//             if (element) element.value = data[field] || "";
//         });

//         // Fill modal fields
//         const modalMap = {
//             modalFirstName: "firstName",
//             modalLastName: "lastName",
//             modalUserName: "userName",
//             modalEmail: "email",
//             modalPhone: "phoneNumber",
//             modalStreet: "street",
//             modalCity: "city",
//             modalCountry: "country",
//             modalDistrict: "district",
//             modalZipCode: "zipCode",
//             modalBuildingNumber: "buildingNumber"
//         };
//         Object.entries(modalMap).forEach(([modalId, dataKey]) => {
//             const element = document.getElementById(modalId);
//             if (element) element.value = data[dataKey] || "";
//         });

//         // Display role list
//         if (Array.isArray(data.roles)) {
//             const rolesList = document.getElementById("rolesList");
//             if (rolesList) {
//                 rolesList.innerHTML = "";
//                 data.roles.forEach(role => {
//                     const li = document.createElement("li");
//                     li.textContent = role;
//                     li.classList.add("list-group-item");
//                     rolesList.appendChild(li);
//                 });
//             }
//         }

//         // If user requested to be provider
//         if (data.isRequested === true) {
//             const joinLink = document.getElementById("joinAsProviderLink");
//             if (joinLink) {
//                 joinLink.style.pointerEvents = "none";
//                 joinLink.innerHTML = "you'r request is pending";
//                 joinLink.classList.add("bg-primary", "text-white", "rounded", "p-2", "text-center");
//             }
//             const uploadSection = document.getElementById("uploadDocuments");
//             if (uploadSection) uploadSection.style.display = "block";

//             // Fetch document types
//             const docResponse = await fetch("https://localhost:7289/api/DocumentTypes", {
//                 method: "GET",
//                 headers: {
//                     "Authorization": `Bearer ${token}`,
//                     "Content-Type": "application/json"
//                 }
//             });

//             if (!docResponse.ok) throw new Error("Failed to fetch document types.");

//             const documentTypes = await docResponse.json();
//             console.log("Document Types:", documentTypes);

//             const form = document.getElementById("uploadDocumentsForm");
//             let i = 0;
//             const documentTitle = document.getElementById("documentTitle");
//             if (documentTitle && documentTypes[i]) {
//                 documentTitle.innerHTML += documentTypes[i].name;
//             }

//             form.addEventListener("submit", async function (e) {
//                 e.preventDefault();

//                 const fileInput = form.querySelector('input[name="document"]');
//                 const file = fileInput?.files[0];

//                 if (!file) {
//                     Swal.fire({ icon: "warning", title: "No File Selected", text: "Please choose a document to upload." });
//                     return;
//                 }

//                 const formData = new FormData();
//                 formData.append("File", file);

//                 try {
//                     const uploadResponse = await fetch("https://localhost:7289/api/Documents", {
//                         method: "POST",
//                         headers: {
//                             "Authorization": `Bearer ${token}`
//                         },
//                         body: formData
//                     });

//                     const result = await uploadResponse.json();

//                     if (uploadResponse.ok) {
//                         i++;
//                         Swal.fire({ icon: "success", title: "Upload Successful", text: "Document uploaded successfully." });
//                         if (documentTypes[i]) {
//                             documentTitle.innerHTML = "Upload You'r " + documentTypes[i].name;
//                         }
//                     } else {
//                         Swal.fire({ icon: "error", title: "Upload Failed", text: result.message || "An error occurred while uploading." });
//                     }
//                 } catch (err) {
//                     console.error("Upload Error:", err);
//                     Swal.fire({ icon: "error", title: "Error", text: "Something went wrong while uploading the document." });
//                 }
//             });
//         }
//     } catch (error) {
//         console.error("Error fetching profile data:", error);
//         Swal.fire({ icon: 'error', title: 'Error', text: 'Something went wrong while loading profile data.' });
//     }
// });

document.addEventListener("DOMContentLoaded", async function () {
    const token = sessionStorage.getItem("token");

    if (!token) {
        console.error("JWT token not found in sessionStorage.");
        Swal.fire({
            icon: 'error',
            title: 'Unauthorized',
            text: 'You must be logged in to view this profile.',
        });
        return;
    }

    try {
        const response = await fetch("https://localhost:7289/api/Profile/Profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const message = response.status === 401 || response.status === 403 ? 
                'You are not authorized to access this resource.' :
                `Server responded with status: ${response.status}`;
            Swal.fire({ icon: 'error', title: 'Error', text: message });
            return;
        }

        const data = await response.json();
        console.log("User Profile Data:", data);

        // تحقق من إذا كانت البيانات فارغة
        if (!data || Object.keys(data).length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'No Data Found',
                text: 'No profile data available. Please try again later.',
            });
            return;
        }

        // Fill main form fields
        const fields = ["firstName", "lastName", "displayName", "email", "phoneNumber",
                        "country", "city", "district", "street", "zipCode", "buildingNumber"];
        fields.forEach(field => {
            const element = document.getElementById(field);
            if (element) element.value = data[field] || "";
        });

        // Fill modal fields
        const modalMap = {
            modalFirstName: "firstName",
            modalLastName: "lastName",
            modalUserName: "userName",
            modalEmail: "email",
            modalPhone: "phoneNumber",
            modalStreet: "street",
            modalCity: "city",
            modalCountry: "country",
            modalDistrict: "district",
            modalZipCode: "zipCode",
            modalBuildingNumber: "buildingNumber"
        };
        Object.entries(modalMap).forEach(([modalId, dataKey]) => {
            const element = document.getElementById(modalId);
            if (element) element.value = data[dataKey] || "";
        });

        // Display role list
        if (Array.isArray(data.roles)) {
            const rolesList = document.getElementById("rolesList");
            if (rolesList) {
                rolesList.innerHTML = "";
                data.roles.forEach(role => {
                    const li = document.createElement("li");
                    li.textContent = role;
                    li.classList.add("list-group-item");
                    rolesList.appendChild(li);
                });
            }
        }

        // If user requested to be provider
        if (data.isRequested === true) {
            const joinLink = document.getElementById("joinAsProviderLink");
            if (joinLink) {
                joinLink.style.pointerEvents = "none";
                joinLink.innerHTML = "your request is pending";
                joinLink.classList.add("bg-primary", "text-white", "rounded", "p-2", "text-center");
            }
            const uploadSection = document.getElementById("uploadDocuments");
            if (uploadSection) uploadSection.style.display = "block";

            // Fetch document types
            const docResponse = await fetch("https://localhost:7289/api/DocumentTypes", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!docResponse.ok) throw new Error("Failed to fetch document types.");

            const documentTypes = await docResponse.json();
            console.log("Document Types:", documentTypes);

            // إذا كانت النتيجة فارغة، قم بإظهار رسالة للمستخدم
            if (!documentTypes || documentTypes.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'No Document Types Available',
                    text: 'No document types available to upload. Please contact support.',
                });
                return;
            }

            const form = document.getElementById("uploadDocumentsForm");
            let i = 0;
            const documentTitle = document.getElementById("documentTitle");
            if (documentTitle && documentTypes[i]) {
                documentTitle.innerHTML += documentTypes[i].name;
            }

            form.addEventListener("submit", async function (e) {
                e.preventDefault();

                const fileInput = form.querySelector('input[name="document"]');
                const file = fileInput?.files[0];

                if (!file) {
                    Swal.fire({ icon: "warning", title: "No File Selected", text: "Please choose a document to upload." });
                    return;
                }

                const formData = new FormData();
                formData.append("File", file);

                try {
                    const uploadResponse = await fetch("https://localhost:7289/api/Documents", {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        body: formData
                    });

                    const result = await uploadResponse.json();
                    console.log("Upload Response:", result);

                    if (uploadResponse.ok) {
                        i++;
                        Swal.fire({ icon: "success", title: "Upload Successful", text: "Document uploaded successfully." });
                        if (documentTypes[i]) {
                            documentTitle.innerHTML = "Upload Your " + documentTypes[i].name;
                        }

                        // التمرير إلى أسفل التبويب بعد رفع المستند
                        const uploadTab = document.getElementById("upload-documents");
                        uploadTab.scrollIntoView({ behavior: "smooth", block: "end" });

                    } else {
                        Swal.fire({ icon: "error", title: "Upload Failed", text: result.message || "An error occurred while uploading." });
                    }
                } catch (err) {
                    console.error("Upload Error:", err);
                    Swal.fire({ icon: "error", title: "Error", text: "Something went wrong while uploading the document." });
                }
            });
        }
    } catch (error) {
        console.error("Error fetching profile data:", error);
        Swal.fire({ icon: 'error', title: 'Error', text: 'Something went wrong while loading profile data.' });
    }
});

// document.addEventListener("DOMContentLoaded", async function () {
//     const token = sessionStorage.getItem("token");
//     if (!token) {
//         Swal.fire({ icon: 'error', title: 'Unauthorized', text: 'You must be logged in to view this profile.' });
//         return;
//     }

//     try {
//         const profileRes = await fetch("https://localhost:7289/api/Profile/Profile", {
//             headers: { "Authorization": `Bearer ${token}` }
//         });

//         const profileData = await profileRes.json();
//         const uploadSection = document.getElementById("uploadDocuments");

//         if (profileData.isRequested === true && uploadSection) {
//             uploadSection.style.display = "block";

//             const docResponse = await fetch("https://localhost:7289/api/DocumentTypes", {
//                 headers: { "Authorization": `Bearer ${token}` }
//             });

//             const documentTypes = await docResponse.json();
//             const uploadedIds = JSON.parse(localStorage.getItem("uploadedDocuments") || "[]");

//             // current document index
//             let i = uploadedIds.length;

//             const documentTitle = document.getElementById("documentTitle");
//             const form = document.getElementById("uploadDocumentsForm");

//             function updateTitle() {
//                 if (i < documentTypes.length) {
//                     documentTitle.innerHTML = `Upload your ${documentTypes[i].name}`;
//                 }
//             }

//             function showStatusAlert() {
//                 const alertContainer = document.getElementById("alertContainer");
//                 alertContainer.innerHTML = "";

//                 if (i < documentTypes.length) {
//                     alertContainer.innerHTML = `
//                         <div class="alert alert-warning" role="alert">
//                             Please complete uploading all required documents.
//                         </div>`;
//                 } else {
//                     alertContainer.innerHTML = `
//                         <div class="alert alert-success" role="alert">
//                             You have uploaded all documents. Your request is now pending.
//                         </div>`;
//                 }
//             }

//             updateTitle();
//             showStatusAlert();

//             form.addEventListener("submit", async function (e) {
//                 e.preventDefault();

//                 if (i >= documentTypes.length) return;

//                 const fileInput = form.querySelector('input[name="document"]');
//                 const file = fileInput?.files[0];
//                 if (!file) {
//                     Swal.fire({ icon: "warning", title: "No File", text: "Please select a document to upload." });
//                     return;
//                 }

//                 const formData = new FormData();
//                 formData.append("File", file);
//                 formData.append("DocumentTypeId", documentTypes[i].id); // 🔴 نرسل ID نوع الوثيقة

//                 const uploadResponse = await fetch("https://localhost:7289/api/Documents", {
//                     method: "POST",
//                     headers: { "Authorization": `Bearer ${token}` },
//                     body: formData
//                 });

//                 const result = await uploadResponse.json();

//                 if (uploadResponse.ok) {
//                     Swal.fire({ icon: "success", title: "Uploaded", text: "Document uploaded successfully." });

//                     uploadedIds.push(documentTypes[i].id); // ✅ نحفظ ID في localStorage
//                     localStorage.setItem("uploadedDocuments", JSON.stringify(uploadedIds));

//                     i++;
//                     updateTitle();
//                     showStatusAlert();

//                     // إذا اكتملت كل الوثائق نحذف التخزين المؤقت
//                     if (i >= documentTypes.length) {
//                         localStorage.removeItem("uploadedDocuments");
//                     }

//                     // Reset input
//                     fileInput.value = "";
//                 } else {
//                     Swal.fire({ icon: "error", title: "Upload Failed", text: result.message || "Something went wrong." });
//                 }
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         Swal.fire({ icon: 'error', title: 'Error', text: 'Something went wrong while loading profile data.' });
//     }
// });


// Function to show alerts

function showAlert(type, message, title) {
    const alertContainer = document.getElementById("alertContainer");

    const alert = document.createElement("div");
    alert.classList.add("alert", `alert-${type}`, "alert-dismissible", "fade", "show");
    alert.role = "alert";

    const strong = document.createElement("strong");
    strong.textContent = title;
    alert.appendChild(strong);

    alert.appendChild(document.createTextNode(`: ${message}`));

    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("close");
    button.setAttribute("data-dismiss", "alert");
    button.setAttribute("aria-label", "Close");
    const span = document.createElement("span");
    span.setAttribute("aria-hidden", "true");
    span.textContent = "×";
    button.appendChild(span);

    alert.appendChild(button);
    alertContainer.appendChild(alert);
}








