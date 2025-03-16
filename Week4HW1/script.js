const usersContainer = document.querySelector(".ins-api-users");

const addStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
    .user-card {
      border: 1px solid #ddd;
      padding: 10px;
      margin: 10px 0;
      border-radius: 5px;
      background: #EAFAEA;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    }
    .user-card h3 {
      margin: 0;
      font-size: 18px;
    }
    .user-card p {
      margin: 5px 0;
      font-size: 14px;
    }
    .delete-btn {
      background: #780C28;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      border-radius: 3px;
    }
    .delete-btn:hover {
      background: #B82132;
    }
  `;
  document.head.appendChild(style);
};

const getUsersData = () => {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Kullanıcı verisi alınamadı!");
        }
        return response.json();
      })
      .then((users) => {
        saveToLocalStorage(users);
        displayUsers(users);
        resolve(users);
      })
      .catch((error) => {
        console.error("Hata:", error.message);
        usersContainer.innerHTML = `<p style="color: red;">Hata: ${error.message}</p>`;
        reject(error);
      });
  });
};

const saveToLocalStorage = (users) => {
  const data = {
    users,
    timestamp: Date.now(),
  };
  localStorage.setItem("usersData", JSON.stringify(data));
};

const loadUsers = () => {
  const dataString = localStorage.getItem("usersData");
  const data = dataString ? JSON.parse(dataString) : null;

  if (data) {
    const currentTime = Date.now();
    const timeDiff = currentTime - data.timestamp;
    const oneDay = 24 * 60 * 60 * 1000;

    if (timeDiff < oneDay) {
      console.log("LocalStorage'dan veri alınıyor...");
      displayUsers(data.users);
      return;
    } else {
      console.log("Veri eski, API'den tekrar çekiliyor...");
      localStorage.removeItem("usersData");
    }
  }

  getUsersData()
    .then((data) => console.log("Kullanıcı verisi başarıyla alındı:", data))
    .catch((error) => console.log("Hata oluştu:", error));
};

const displayUsers = (users) => {
  if (users.length === 0) {
    usersContainer.innerHTML = `<p>Kayıtlı kullanıcı bulunmamaktadır.</p>`;
    return;
  }

  usersContainer.innerHTML = users
    .map(
      (user) => `
      <div class="user-card" data-id="${user.id}">
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Adres:</strong> ${user.address.city}, ${user.address.street}</p>
        <button class="delete-btn">Sil</button>
      </div>
    `
    )
    .join("");

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", deleteUser);
  });
};

const deleteUser = (event) => {
  const userCard = event.target.closest(".user-card");
  const userId = Number(userCard.dataset.id);

  let storedDataString = localStorage.getItem("usersData");
  let storedData = storedDataString ? JSON.parse(storedDataString) : null;

  if (storedData) {
    storedData.users = storedData.users.filter((user) => user.id !== userId);
    localStorage.setItem("usersData", JSON.stringify(storedData));

    if (storedData.users.length === 0) {
      localStorage.removeItem("usersData");
      usersContainer.innerHTML = `<p>Kayıtlı kullanıcı bulunmamaktadır.</p>`;
    }
  }

  userCard.remove();
};

addStyles();
loadUsers();
