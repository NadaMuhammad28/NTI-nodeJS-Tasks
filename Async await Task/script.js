const commonApiUrl = "https://jsonplaceholder.typicode.com/posts";
const creadReadCard = function (res, parent) {
  const html = `
  <div class="container">
  <h4 class="read-title">User ID: <span class="read-content">${res.userId}</span></h4>
  <h4 class="read-title">Title: <span class="read-content">${res.title}</span></h4>

  <h4 class="read-title">Body: <span class="read-content">${res.body}</span></h4>
</div>
  `;
  parent.insertAdjacentHTML("beforeend", html);
};
//post
const add = document.querySelector("#add");
const postRes = document.querySelector("postRes");
const postData = async (data) => {
  try {
    const d = await fetch(commonApiUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const r = await d.json();
    console.log(r);
    creadReadCard(r, readcard);
  } catch (e) {
    console.log(e.message);
  }
};
if (add) {
  add.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = {
      title: this.elements.title.value,
      body: this.elements.body.value,
      userId: this.elements.userId.value,
    };
    // console.log(data);
    postData(data);
  });
}
//update
const update = document.querySelector("#update");
const updateData = async (id, data) => {
  try {
    const d = await fetch(`${commonApiUrl}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const res = await d.json();
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

if (update) {
  update.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      id: this.elements.title.value,
      title: this.elements.title.value,
      body: this.elements.body.value,
      userId: this.elements.userId.value,
    };
    updateData(data.id, data);
  });
}
//delete
const del = document.querySelector("#delete");

const deletData = async (id) => {
  try {
    const d = await fetch(`${commonApiUrl}/${id}`, {
      method: "DELETE",
    });
  } catch (e) {
    console.log(e.message);
  }
};

if (del) {
  del.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = this.elements.id.value;
    deletData(id);
  });
}

//read
// fetch("https://jsonplaceholder.typicode.com/posts?id=2")
//   .then((response) => response.json())
//   .then((json) => console.log(json));

const read = document.querySelector("#read");
const readcard = document.querySelector(".read-card");

const readData = async (id) => {
  try {
    const d = await fetch(`${commonApiUrl}/${id}`);
    const res = await d.json();
    creadReadCard(res, readcard);

    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
if (read) {
  read.addEventListener("submit", function (e) {
    e.preventDefault();
    const id = this.elements.id.value;
    readData(id);
  });
}
// const readRes = document.querySelector("#ReadRes");
