const appendLocation = "#user-list";

const addStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
        #user-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 300px;
            margin: 20px auto;
        }
        
        .user-card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #F6DED8;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
        }

        .delete-btn {
            background: #D2665A;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 3px;
            transition: background 0.3s ease;
        }

        .delete-btn:hover {
            background: #B82132;
        }

        #reload-users-btn {
            display: block;
            margin: 20px auto;
            padding: 10px 15px;
            background: #6A80B9;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background 0.3s ease;
        }

        #reload-users-btn:hover {
            background: #155E95;
        }
    `;
  document.head.appendChild(style);
};

const fetchUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    localStorage.setItem(
      "users",
      JSON.stringify({ data: users, expire: Date.now() + 1000 * 60 * 5 })
    );
    renderUsers();
  } catch (error) {
    console.error("Kullanıcıları çekerken hata oluştu:", error);
  }
};

const renderUsers = () => {
  const container = document.querySelector(appendLocation);
  container.innerHTML = "";

  const storedUsers = JSON.parse(localStorage.getItem("users"));

  if (!storedUsers || storedUsers.data.length === 0) {
    return;
  }

  storedUsers.data.forEach(({ id, name }) => {
    const userDiv = document.createElement("div");
    userDiv.textContent = name;
    userDiv.dataset.id = id;
    userDiv.classList.add("user-card");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Sil";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => deleteUser(id);

    userDiv.appendChild(deleteBtn);
    container.appendChild(userDiv);
  });

  console.log("Kullanıcılar yüklendi:", storedUsers.data);
};

const deleteUser = (id) => {
  let storedUsers = JSON.parse(localStorage.getItem("users"));

  storedUsers.data = storedUsers.data.filter((user) => user.id !== id);

  if (storedUsers.data.length === 0) {
    localStorage.removeItem("users");
  } else {
    localStorage.setItem("users", JSON.stringify(storedUsers));
  }

  renderUsers();
};

const showReloadButton = () => {
  if (sessionStorage.getItem("reloadClicked")) {
    console.log("Bu buton zaten kullanıldı, tekrar gösterilmeyecek.");
    return;
  }

  if (document.querySelector("#reload-users-btn")) {
    console.log("Buton zaten eklenmiş.");
    return;
  }

  console.log("Buton ekleniyor...");
  const reloadBtn = document.createElement("button");
  reloadBtn.textContent = "Yeniden Kullanıcıları Çek";
  reloadBtn.id = "reload-users-btn";
  reloadBtn.onclick = () => {
    sessionStorage.setItem("reloadClicked", "true");
    reloadBtn.remove();
    fetchUsers();
  };

  document.body.appendChild(reloadBtn);
};

const observer = new MutationObserver(() => {
  const container = document.querySelector(appendLocation);
  if (container && container.children.length === 0) {
    showReloadButton();
  }
});
observer.observe(document.querySelector(appendLocation), { childList: true });

addStyles();
fetchUsers();
