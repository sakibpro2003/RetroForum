const postCardContainer = document.getElementById("postCardContainer");
const postViewContainer = document.getElementById("postViewContainer");
const latestPostContainer = document.getElementById("latestPostContainer");
const searchBtn = document.getElementById("searchBtn");
let readCount = 0;

function getCategory() {
  fetchData(document.getElementById("inputField").value);
}

async function fetchData(category) {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`
  );

  const data = await response.json();
  console.log(data.posts);
  showPost(data.posts);
}
async function fetchData2() {
  const response4 = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?`
  );

  const data4 = await response4.json();
  console.log(data4.posts);
  showPost(data4.posts);
}
fetchData2();

async function latestFetch() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data2 = await res.json();
  fetchLatest(data2);
}
const fetchLatest = (data2) => {
  data2.forEach((element2) => {
    const createnew3 = document.createElement("div");
    createnew3.innerHTML = `
<div class=" p-6 max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                    <a href="#">
                        <img class="rounded-t-lg" src="${
                          element2.cover_image
                        }" alt="" />
                    </a>

                    <div class="p-5">
                        <a href="#">

                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy
                                technology acquisitions 2021</h5>
                        </a>
                        <h3 class="font-extrabold">latest titele</h3>
                        <div class="flex items-center gap-4">
                            <i class="fa-regular fa-calendar"></i>
                            <p>${
                              element2.author.posted_date ?? "no pusblish date"
                            }</p>
                        </div>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise
                            technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        </a>
                        <!-- name pic  -->
                        <div class="flex items-center gap-4">
                            <div class="">
                                <img class="w-12 rounded-full" src="${
                                  element2.profile_image
                                }" alt="">
                            </div>
                            <div class="">
                                <p>${element2.author.name}</p>
                                <p>${
                                  element2.author.designation ?? "unknown"
                                }</p>
                            </div>

                        </div>
                    </div>
                </div>

`;

    latestPostContainer.appendChild(createnew3);
  });
};

latestFetch();
const viewCount = document.getElementById("viewCount");

const viewChange = () => {
  viewCount.innerText = readCount;
};
const addToRead = (postName, view_count) => {
  const createNew = document.createElement("div");
  createNew.innerHTML = `
<div class=" bg-white rounded-lg gap-10 flex p-4 mt-4">
                            <p>${postName}</p>
                            <div class="flex gap-1 items-center">
                                <i class="fa-regular fa-eye"></i>
                                <p>${view_count}</p>
                            </div>
                        </div>
`;
  postViewContainer.appendChild(createNew);
  readCount++;
  viewChange();
};


const showPost = (data) => {
  postCardContainer.textContent = "";

  data.forEach((element) => {
    const cardCreate = document.createElement("div");
    cardCreate.innerHTML = `
    <div class="">
                        <div class=" p-2 lg:p-6 card card-side bg-base-100 shadow-xl flex flex-col lg:flex-row">
                        <div>
                        <div class="${element.isActive ? 'avatar online' : 'avatar offline'}">
                        <div class="w-20 rounded-full">
                          <img src="${element.image}" />
                        </div>
                      </div>
                      <div class="${element.isActive ? 'avatar online' : 'avatar offline'}">
                        
                      </div></div>
                            <div class="card-body">
                                <div class="flex">
                                    <p>#${element.category}</p>
                                    <p>Author: ${element.author.name}</p>
                                </div>
                                <h2 class="card-title">${element.title}</h2>
                                <p class="mt-5">${element.description}</p>
                                <hr class="m-3 border-dashed ">
                                <div class="flex justify-between">
                                    <div class="flex flex-col lg:flex-row lg:gap-16">
                                        <div class="flex justify-center items-center gap-3">
                                            <i class="fa-regular fa-comment"></i>
                                            <p>${element.comment_count}</p>
                                        </div>
                                        <div class="flex justify-center items-center gap-3">
                                            <i class="fa-regular fa-eye"></i>
                                            <p>${element.view_count}</p>
                                        </div>
                                        <div class="flex justify-center items-center gap-3">
                                            <i class="fa-regular fa-clock"></i>
                                            <p>${element.posted_time}</p>
                                        </div>
                                    </div>
                                    <div class="card-actions justify-end ">
                                    
                                        <button onclick="addToRead('${element.title.replace(
                                          /'/g,
                                          "@"
                                        )}','${
      element.view_count
    }')" class="btn  rounded-full bg-green-500 border-none "><i
                                                class="fa-regular fa-envelope-open text-white"></i>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    `;
    postCardContainer.appendChild(cardCreate);
  });
};
