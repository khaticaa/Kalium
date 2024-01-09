let s1cards = document.querySelector(".s1-o");
let searchInput = document.querySelector(".search");
let filteredArr = [];
let copyArr = []

async function GetAllCards() {
    let res = await axios("http://localhost:3000/data");
    let data = await res.data;
    // console.log(res.data);
    copyArr=data
    s1cards.innerHTML = "";
    //  filteredArr = filteredArr.length ? filteredArr : data;
    filteredArr = filteredArr.length || searchInput.value ? filteredArr : data;
    filteredArr.forEach((element) => {
        s1cards.innerHTML += `
    <div class="s1card">
    <div class="img">
        <img src="${element.image}" alt="">
    </div>
    <h3>${element.name}</h3>
    <p>${element.description}</p>
    <div class="Crud"> 
    <button onclick="DeleteBtn(${element.id})" > Delete</button> 
    <button onclick= "UptadeBtn(${element.id})">
    Update
    </button>
    <button onclick= "Favorite(${element.id})">
    Favorite
    </button>
    
    </div>
</div>

    `;
    });
}

GetAllCards();


// ------Search-------


searchInput.addEventListener("input", function (e) {
    filteredArr = copyArr;
    filteredArr = filteredArr.filter((element) =>
        element.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    );
    GetAllCards();
});

// ---------Delete-----

function DeleteBtn(id) {
    axios.delete(`http://localhost:3000/data/${id}`);
    window.location.reload();
}

// -----Update------