const allTabsHead = document.querySelectorAll('.tab-head-single');
const allTabsBody = document.querySelectorAll('.tab-body-single');
const searchForm = document.querySelector('.app-header-search');
let searchList = document.getElementById('search-list');
let music = document.querySelector('audio');
let musicOn = document.querySelector('.music-on');
let musicOff = document.querySelector('.music-off');

function play(){
    musicOff.classList.add('.show-tab')
}
//////////////// i stopped here ////////////////
let activeTab = 1, allData;

const init = () =>{
    showActiveTabBody();
    showActiveTabHead();
}

const showActiveTabHead = () => allTabsHead[activeTab - 1].classList.add('active-tab');

const showActiveTabBody = () =>{
    hideAllTabBody();
    allTabsBody[activeTab - 1].classList.add('show-tab');
}

const hideAllTabBody = () => allTabsBody.forEach(singleTabBody => singleTabBody.classList.remove('show-tab'));

const hideAllTabHead = () => allTabsHead.forEach(singleTabHead => singleTabHead.classList.remove('active-tab'));

    // Event-Listeners
window.addEventListener('DOMContentLoaded', () =>{
    init();
});
// Button Event-Listeners

allTabsHead.forEach(singleTabHead =>{
    singleTabHead.addEventListener('click', () =>{
        hideAllTabHead();
        activeTab = singleTabHead.dataset.id;
        showActiveTabHead();
        showActiveTabBody();
    })
})
const getInputValue = (event) =>{
    event.preventDefault();
    let searchText = searchForm.search.value;
    fetchAllSuperHero(searchText);
}
    // search form submission
searchForm.addEventListener('submit', getInputValue);

// api key - 727054372039115
const fetchAllSuperHero = async(searchText) =>{
    let url = `https://www.superheroapi.com/api.php/727054372039115/search/${searchText}`
    try{
        const response = await fetch(url);
        allData = await response.json();
        if (allData.response === 'success'){
           // console.log(allData);
           showSearchList(allData.results);
        }
    } catch(error){
        console.log(error);
    }
}

const showSearchList = (data) =>{
    searchList.innerHTML = '';
    data.forEach(dataItem =>{
        const divElem = document.createElement('div');
        divElem.classList.add('search-list-item');
        divElem.innerHTML = `
            <img src = "${dataItem.image.url ? dataItem.image.url : ""}" alt = "">
            <p data-id="${dataItem.id}">${dataItem.name}</p>
        `;
        searchList.appendChild(divElem);
    });
}

searchForm.search.addEventListener('keyup', ()=>{
    if (searchForm.search.value.length > 1){
        fetchAllSuperHero(searchForm.search.value);
    }else{
        searchList.innerHTML = '';
    }
})

searchList.addEventListener('click',(event)=>{
    let searchId = event.target.dataset.id;
    console.log(searchId)
    let singleData = allData.results.filter(singleData => {
        return searchId === singleData.id;
    });
    showSuperheroDetails(singleData);
    searchList.innerHTML = ''
});

const showSuperheroDetails = (data) =>{
    document.querySelector('.app-body-content-thumbnail').innerHTML = `
        <img src="${data[0].image.url}">
    `;

    document.querySelector('.name').textContent = data[0].name;

    document.querySelector('.powerstats').innerHTML = `
                            <li>
                                <div>
                                    <i class="fa-solid fa-shield-halved"></i>
                                    <span>intelligence</span>
                                </div>
                                <span>${data[0].powerstats.intelligence}</span>
                            </li>
                            <li>
                                <div>
                                    <i class="fa-solid fa-shield-halved"></i>
                                    <span>strength</span>
                                </div>
                                <span>${data[0].powerstats.strength}</span>
                            </li>
                            <li>
                                <div>
                                    <i class="fa-solid fa-shield-halved"></i>
                                    <span>speed</span>
                                </div>
                                <span>${data[0].powerstats.speed}</span>
                            </li>
                            <li>
                                <div>
                                    <i class="fa-solid fa-shield-halved"></i>
                                    <span>durability</span>
                                </div>
                                <span>${data[0].powerstats.durability}</span>
                            </li>
                            <li>
                                <div>
                                    <i class="fa-solid fa-shield-halved"></i>
                                    <span>power</span>
                                </div>
                                <span>${data[0].powerstats.power}</span>
                            </li>
                            <li>
                                <div>
                                    <i class="fa-solid fa-shield-halved"></i>
                                    <span>combat</span>
                                </div>
                                <span>${data[0].powerstats.combat}</span>
                            </li>
                            <!-- end of powerstats tab -->
    `;

    document.querySelector('.biography').innerHTML = `
                            <!-- biography tab -->
                                <li>
                                    <span>full name</span>
                                    <span>${data[0].biography['full-name']}</span>
                                </li>
                                <li>
                                    <span>alert-egos</span>
                                    <span>${data[0].biography['alter-egos']}</span>
                                </li>
                                <li>
                                    <span>aliases</span>
                                    <span>${data[0].biography['aliases']}</span>
                                </li>
                                <li>
                                    <span>place-of-birth</span>
                                    <span>${data[0].biography['place-of-birth']}</span>
                                </li>
                                <li>
                                    <span>first-apperance</span>
                                    <span>${data[0].biography['first-appearance']}</span>
                                </li>
                                <li>
                                    <span>publisher</span>
                                    <span>${data[0].biography['publisher']}</span>
                                </li>
                            <!-- end of biography tab -->
    `;

    document.querySelector('.appearance').innerHTML = `
                                <li>
                                    <span>
                                        <i class="fas fa-star"></i> gender
                                    </span>
                                    <span>${data[0].appearance['gender']}</span>
                                </li>
                                <li>
                                    <span>
                                        <i class="fas fa-star"></i> race
                                    </span>
                                    <span>${data[0].appearance['race']}</span>
                                </li>
                                <li>
                                    <span>
                                        <i class="fas fa-star"></i> height
                                    </span>
                                    <span>${data[0].appearance['height']}</span>
                                </li>
                                <li>
                                    <span>
                                        <i class="fas fa-star"></i> weight
                                    </span>
                                    <span>${data[0].appearance['weight']}</span>
                                </li>
                                <li>
                                    <span>
                                        <i class="fas fa-star"></i> eye-color
                                    </span>
                                    <span>${data[0].appearance['eye-color']}</span>
                                </li>
                                <li>
                                    <span>
                                        <i class="fas fa-star"></i> hair-color
                                    </span>
                                    <span>${data[0].appearance['hair-color']}</span>
                                </li>
                                <!-- end of appearance -->
    `;
    document.querySelector('.connections').innerHTML = `
                                    <li>
                                        <span>group--affiliation</span>
                                        <span>${data[0].connections['group-affiliation']}</span>
                                    </li>
                                    <li>
                                        <span>relatives</span>
                                        <span>${data[0].connections['relatives']}</span>
                                    </li>
    `;
}