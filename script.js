const postCardContainer = document.getElementById('postCardContainer');
const createSpinner = document.createElement('div');
async function  fetchData() {
  createSpinner.innerHTML = `<span class="loading loading-dots loading-lg"></span>`
  const response = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
  const data = await response.json();
  console.log(data.posts);
  showPost(data.posts);
  if(data.posts.length > 0){

  }
}


fetchData();
const showPost = (data)=>{
  data.forEach(element => {
    const cardCreate = document.createElement('div');
    cardCreate.innerHTML =`
    <div class="">
                        <div class=" p-2 lg:p-6 card card-side bg-base-100 shadow-xl flex flex-col lg:flex-row">
                            <figure><img class="w-20 rounded-md"
                                    src="${element.image}"
                                    alt="" />
                            </figure>
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

                                        <button class="btn  rounded-full bg-green-500 border-none "><i
                                                class="fa-regular fa-envelope-open text-white"></i>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    `
    postCardContainer.appendChild(cardCreate);

    // console.log(element.title);
  });
}