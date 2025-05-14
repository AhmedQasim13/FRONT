document.addEventListener("DOMContentLoaded", function () {
    const servicesContainer = document.getElementById("services-list");
  
    fetch("https://localhost:7289/api/Services")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        return response.json();
      })
      .then(services => {
        servicesContainer.innerHTML = "";
  
        services.forEach((service, index) => {
          const delay = 100 * (index + 1);
  
          const serviceHTML = `
            <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${delay}">
              <div class="service-item position-relative">
                <div class="icon">
                  <img src="${service.imgUrl}" alt="${service.name}" style="width: 40px; height: 40px; object-fit: contain;" />
                </div>
                <a href="#" class="stretched-link">
                  <h3>${service.name}</h3>
                </a>
                <p>${service.description}</p>
              </div>
            </div>
          `;
          servicesContainer.insertAdjacentHTML("beforeend", serviceHTML);
        });
      })
      .catch(error => {
        console.error("Error fetching services:", error);
        servicesContainer.innerHTML = `<div class="col-12"><p class="text-danger">Failed to load services. Please try again later.</p></div>`;
      });
  });
  