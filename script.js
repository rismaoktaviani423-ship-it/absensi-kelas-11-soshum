function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user && pass) {
    localStorage.setItem("user", user);
    window.location.href = "dashboard.html";
  } else {
    alert("Username dan password harus diisi!");
  }
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

/* Proteksi halaman */
if (window.location.pathname.includes("dashboard")) {
  const user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "index.html";
  } else {
    document.getElementById("welcome").innerText =
      "Login sebagai: " + user;
    tampilkanAbsensi();
  }
}

function kirimAbsensi() {
  const nama = document.getElementById("nama").value;
  const status = document.getElementById("kehadiran").value;
  const tanggal = document.getElementById("tanggal").value;
  const foto = document.getElementById("foto").files[0];

  if (!nama || !status || !tanggal || !foto) {
    alert("Semua data wajib diisi!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const data = JSON.parse(localStorage.getItem("absensi")) || [];
    data.push({
      nama: nama,
      status: status,
      tanggal: tanggal,
      foto: reader.result
    });
    localStorage.setItem("absensi", JSON.stringify(data));
    tampilkanAbsensi();
  };
  reader.readAsDataURL(foto);
}

function tampilkanAbsensi() {
  const tbody = document.getElementById("dataAbsensi");
  tbody.innerHTML = "";

  const data = JSON.parse(localStorage.getItem("absensi")) || [];
  data.forEach(item => {
    const row = `
      <tr>
        <td>${item.nama}</td>
        <td>${item.status}</td>
        <td>${item.tanggal}</td>
        <td><img src="${item.foto}"></td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}
