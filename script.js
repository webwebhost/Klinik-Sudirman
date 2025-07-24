	document.addEventListener("DOMContentLoaded", () => {
	  const form = document.getElementById("appointmentForm");
	  const loading = document.getElementById("loading");
	  const successMessage = document.getElementById("successMessage");
	
	  form.addEventListener("submit", async function (e) {
	    e.preventDefault();
	
	    loading.classList.remove("hidden");
	
	    const data = {
	      name: document.getElementById("name").value,
	      phone: document.getElementById("phone").value,
	      service: document.getElementById("service").value,
	      date: document.getElementById("date").value,
	    };
	
	    try {
	      const response = await fetch("https://script.google.com/macros/s/AKfycbwmmT7J6npGF-2U3DOxmplL48f8nNNRQTvkBvXPyS1HW84vN-Dy2KtDgJ7XRFQfMmdG/exec", {
	        method: "POST",
	        mode: "no-cors",
	        headers: {
	          "Content-Type": "application/x-www-form-urlencoded",
	        },
	        body: new URLSearchParams(data),
	      });
	
	      form.reset();
	      loading.classList.add("hidden");
	      successMessage.classList.remove("hidden");
	
	      // Redirect ke WhatsApp
	      const whatsappMsg = `Halo, saya ${data.name} ingin membuat janji untuk ${data.service} pada ${data.date}. No telp: ${data.phone}`;
	      window.location.href = `https://wa.me/6285811761720?text=${encodeURIComponent(whatsappMsg)}`;
	
	    } catch (error) {
	      alert("Terjadi kesalahan. Silakan coba lagi.");
	      loading.classList.add("hidden");
	    }
	  });
	});
