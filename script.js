document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("appointmentForm");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;

    if (!name || !phone || !service || !date) {
      alert("Mohon lengkapi semua kolom formulir.");
      return;
    }

    // 1. Kirim ke Google Sheets (Webhook URL)
    const webhookURL = "https://script.google.com/macros/s/AKfycbxTVR6UA9PQC5jSqaeYAndj57PN3brgxMVB46BPoly_pSHYAaNW8ED2h93D3BKWvBHsOw/exec";

    try {
      const response = await fetch(webhookURL, {
        method: "POST",
        body: JSON.stringify({ name, phone, service, date }),
        headers: { "Content-Type": "application/json" }
      });

      const result = await response.json();
      if (result.result === "success") {
        // 2. Redirect ke WhatsApp
        const adminNumber = "6285811761720"; // ganti dengan nomor admin (tanpa +)
        const message = `Halo Klinik Sehat Ibu & Anak,%0ASaya *${name}*, ingin membuat janji untuk *${service}* pada *${date}*.%0ANomor saya: *${phone}*%0ATerima kasih.`;
        const whatsappURL = `https://wa.me/${adminNumber}?text=${message}`;
        window.location.href = whatsappURL;
      } else {
        alert("Gagal menyimpan data. Silakan coba lagi.");
      }
    } catch (error) {
      alert("Gagal mengirim. Cek koneksi atau izin Web App.");
    }
  });
});