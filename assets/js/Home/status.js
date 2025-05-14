document.addEventListener("DOMContentLoaded", function () {
    fetch("https://localhost:7289/api/Status")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        // تعيين القيم
        document.getElementById("providers-count").setAttribute("data-purecounter-end", data.providers);
        document.getElementById("service-categories-count").setAttribute("data-purecounter-end", data.serviceCategories);
        document.getElementById("active-services-count").setAttribute("data-purecounter-end", data.activeServices);
        document.getElementById("customer-reviews-count").setAttribute("data-purecounter-end", data.customerReviews);
  
        // إعادة تهيئة purecounter
        if (window.PureCounter) {
          new PureCounter(); 
        }
      })
      .catch(error => {
        console.error("Error fetching stats:", error);
      });
  });
  