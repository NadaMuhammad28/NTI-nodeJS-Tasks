const articleWrap = document.querySelector("#articleWrap");

const readFromStorage = (key = "blogs") =>
  JSON.parse(localStorage.getItem(key)) || [];

const writeToStorage = (data, key = "blogs") => {
  localStorage.setItem(key, JSON.stringify(data));
};

//create blog elements for index.html card
const createBlog = (
  eleTag,
  eleParent,
  eleContent = "null",
  eleClasses = "null"
) => {
  const ele = document.createElement(eleTag);
  eleParent.appendChild(ele);
  ele.textContent = eleContent;
  ele.classList = eleClasses;
  return ele;
};

const showComments = () => {};

const singleBlog = document.querySelector(".single-blog");
const singleTitle = document.querySelector(".single-title");
const singleContent = document.querySelector(".single-Content");

const readMore = (blog) => {
  // console.log(blog);
  const msg = "hello";
  blog.msg = msg;
  writeToStorage(blog, "single");
  window.location.href = "singleblog.html";

  // singleTitle.textContent = currentBlog.title;
  // singleContent.textContent = currentBlog.body;
};

if (singleBlog) {
  const currentBlog = readFromStorage("single");
  console.log(currentBlog);
  singleTitle.textContent = currentBlog.title;
  singleContent.textContent = currentBlog.body;
}

//add an article to local storage
const addBLog = document.querySelector(".add-form");
if (addBLog) {
  addBLog.addEventListener("submit", function (e) {
    e.preventDefault();
    const blog = {
      id: Date.now(),
      title: this.elements.title.value,
      body: this.elements.body.value,
    };

    //return blogs obj
    const blogs = readFromStorage();
    console.log(blogs);
    blogs.push(blog);
    writeToStorage(blogs);
    addBLog.reset();
    window.location.href = "index.html";
  });
}
//show the articles in index.html
if (articleWrap) {
  /*const allBlogs = readFromStorage();
  allBlogs.forEach((blog) => {
    articleWrap.innerHTML += `
<div class="card col-md-6"> 
  <div class="card-body"> 
    <h5 class="card-title">${blog.title}</h5> 
    <p class="card-text">
     ${blog.body}
    </p> 
    <a href="#" class="btn btn-primary">Button</a>
  </div>
</div>
`;
  });*/

  //get all the blogs
  const allBlogs = readFromStorage();
  console.log(allBlogs);
  allBlogs.forEach((blog, index) => {
    // creare the container of the card
    const cardContaineer = createBlog(
      "div",
      articleWrap,
      null,
      "card col-md-6 gx-0 mb-2 ms-4  blog-card "
    );
    // create card body
    const cardBody = createBlog("div", cardContaineer, null, "card-body");
    //create title
    const cardTitleContent = blog.title;
    const cardTitle = createBlog(
      "h5",
      cardBody,
      cardTitleContent,
      null,
      "card-title"
    );
    //create body
    const cardPContent = blog.body;
    const cardP = createBlog("p", cardBody, cardPContent, "card-text");
    //create read more btn
    const readBtn = createBlog(
      "button",
      cardBody,
      "Read More",
      "btn btn-primary"
    );
    readBtn.addEventListener("click", () => readMore(blog));
  });
}

//show a single blog

////////////////////////////////
//commentsec
//Add comment
const cmntForm = document.querySelector(".comment-form");
if (cmntForm) {
  //read the current blog
  // const allBlogs = readFromStorage();
  // console.log(allBlogs);
  const blogIndex = readFromStorage("single");
  console.log(blogIndex.id);
  // console.log(allBlogs["blogIndex"]);
  // const shownBlog = allBlogs[blogIndex];

  cmntForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const cmnt = {
      id: blogIndex.id,
      name: this.elements.commentName.value,
      comment: this.elements.comment.value,
    };
    console.log(cmnt);
    const allComment = readFromStorage("comments");
    allComment.push(cmnt);
    writeToStorage(allComment, "comments");
    cmntForm.reset();
    window.location.href = "singleblog.html";
  });
}
//showing previous comments

//section
const previousComments = document.querySelector(".prev-cmnt-container");

if (previousComments) {
  //read the comments from the local storage
  const allPreviousComments = readFromStorage("comments");
  console.log(allPreviousComments);
  // get the current blog
  const getCrntBlog = readFromStorage("single");
  console.log(getCrntBlog.id);

  //do a for loop to get the comments with the same id
  allPreviousComments.forEach((cmnt, index) => {
    if (cmnt.id === getCrntBlog.id) {
      console.log(cmnt.id);

      const prevCmntBody = createBlog(
        "div",
        previousComments,
        null,
        "prev-cmnt-body"
      );
      createBlog("h5", prevCmntBody, cmnt.name, "cmntr-name");
      createBlog("div", prevCmntBody, cmnt.comment, "cmntr-body");
      /*  `
    
      <div class="prev-cmnt-container"> tamam 
        <div >
          <h5 class="cmntr-name">gg</h5> tamam
        </div>
        <div class="cmntr-body">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum,
          error?
        </div>
      </div>
    `;*/
    }
  });
  //draw these comments
}
