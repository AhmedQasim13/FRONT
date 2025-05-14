document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("uploaddocumenttojoinasprovider");
    const fileInput = document.getElementById("fileInput");
    const uploadTrigger = document.getElementById("uploadTrigger");
  
    if (!form || !fileInput || !uploadTrigger) return;
  
    uploadTrigger.addEventListener("click", function () {
      fileInput.click();
    });
  
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
  
      if (!fileInput.files.length) {
        alert("Please select at least one document before uploading.");
        return;
      }
  
      const formData = new FormData(form);
      const token = sessionStorage.getItem("token");
  
      if (!token) {
        alert("You must be logged in to upload documents.");
        return;
      }
  
      try {
        const response = await fetch("https://localhost:7289/api/Documents/UploadDocuments", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        });
  
        // ✅ تأكد من وجود محتوى قبل قراءة JSON
        const contentType = response.headers.get("content-type");
  
        if (response.ok) {
          if (contentType && contentType.includes("application/json")) {
            const result = await response.json();
            alert("Documents uploaded successfully.");
            console.log("Uploaded Files:", result.files || result);
          } else {
            alert("Upload succeeded, but server returned no JSON.");
            console.log("Upload succeeded with empty body.");
          }
  
          form.reset(); // إعادة تعيين النموذج
        } else {
          let errorMessage = "Upload failed.";
          if (contentType && contentType.includes("application/json")) {
            const result = await response.json();
            errorMessage = result.message || errorMessage;
            console.error("Error Response:", result);
          }
          alert(errorMessage);
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert("An error occurred during upload.");
      }
    });
  });
  