const courses = [
  {
    id: 1,
    category: "course",
    title: "محصول اول",
    type: "ویدئو",
    price: 45,
    image: "../image/01-min.jpg",
  },
  {
    id: 2,
    category: "code",
    title: "محصول دوم",
    type: "ویدئو",
    price: 47,
    image: "../image/02-min.jpg",
  },
  {
    id: 3,
    category: "course",
    title: "محصول سوم",
    type: "مقاله",
    price: 96,
    image: "../image/03-min.jpg",
  },
  {
    id: 4,
    category: "code",
    title: "محصول چهارم",
    type: "ویدئو",
    price: 52,
    image: "../image/04-min.jpg",
  },
  {
    id: 5,
    category: "article",
    title: "محصول پنجم",
    type: "ویدئو",
    price: 45,
    image: "../image/05-min.png",
  },
  {
    id: 6,
    category: "course",
    title: "محصول ششم",
    type: "مقاله",
    price: 63,
    image: "../image/06-min.jpg",
  },
  {
    id: 7,
    category: "article",
    title: "محصول هفتم",
    type: "ویدئو",
    price: 35,
    image: "../image/07-min.jpg",
  },
  {
    id: 8,
    category: "article",
    title: "محصول هشتم",
    type: "مقاله",
    price: 40,
    image: "../image/08-min.jpg",
  },
];

function courseCategory() {
  return courses.reduce(
    (prevValue, currValue) => {
      return prevValue.includes(currValue.category)
        ? prevValue
        : prevValue.concat(currValue.category);
    },
    ["All"]
  );
}

function filterData(data) {
  if (data === "All") {
    appenedCourses(courses);
  } else {
    const filtered = courses.filter((c) => c.category === data);
    appenedCourses(filtered);
  }
}

function courseList() {
  const category = courseCategory();
  return category.map((category) => {
    return `<li>
        <button onclick = filterData("${category}") class="btn btn-info mr-2">${category}</button>
        </li>`;
  });
}
document.querySelector("#course-list ul").innerHTML = courseList().join(" ");

let list = document.querySelector("#courses");

function appenedCourses(dataFilter) {
  let output = "";
  let coursesList = courses;
  dataFilter.map((item) => {
    output += `
            <div class="col-12 col-md-4 col-lg-3 mt-4">
                <div class="card position-relative content-card custom-content-card">
                    <span class="position-absolute card-title-style rounded text-white">${item.type}</span>
                    <span class="badge badge-danger position-absolute new-post-badge  rounded text-white">${item.price}</span>
                    <img src=${item.image} class="card-img-top">
                    <div class="card-body content-card">
                    <button class="bag-btn" data-id=${item.id}>
                    خرید دوره
</button>
                        <a href="#">${item.title}</a>
                        <span class="float-left mt-1">2 فروردین 1399</span>
                    </div>
                    <div class="card-footer p-1 text-center custom-card-footer">
                        <ul class="list-inline p-0 m-0 post-meta">
                            <li class="list-inline-item"><span class="text-danger"><i class="material-icons ml-1">file_copy
</i>رایگان</span></li>
                            <li class="list-inline-item">45<i class="material-icons mr-1">comment</i></li>
                            <li class="list-inline-item">45<i class="material-icons mr-1">visibility</i></li>
                            <li class="list-inline-item">12<i class="material-icons mr-1">thumb_up_alt</i></li>
                        </ul>
                    </div>
                </div>
            </div>    
        `;
  });
  list.innerHTML = output;
}
appenedCourses(courses);

