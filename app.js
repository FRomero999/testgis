var mapImage = '/assets/images/hyrule.jpg';

const createInfoDialog = (data) => {
    let info = ``;
    if (data.title) {
        info += `<h1 class="title">${data.title}</h1>`;
    }
    if (data.date) {
        info += `<h2 class="date">[${data.date}]</h2>`;
    }
    if (data.description) {
        info += `<p class="description">${data.description}</p>`;
    }
    if (data.infoLink) {
        info += `<span class="info-link-container"><a class="info-link" href="${data.infoLink}" target="_blank">Learn more on Tolkien Gateway</a></span>`;
    }
    console.log(info);
    return info;
}

const createMarker = (map, data) => {
    const sol = L.latLng([4375 - data.y, data.x]);
    return L.marker(sol).bindPopup(createInfoDialog(data));
}

const addToList = (el)=>{
    const lista = document.querySelector("ul");
    const template = document.querySelector("template");
    let li = template.content.cloneNode(true);
    li.querySelector("h4").textContent=el.title;
    li.querySelector("p").textContent=el.description;
    lista.appendChild(li);
}

const  loadMarkers = (url,map) =>{
    fetch(url)
    .then(response => response.json())
    .then(data=>{
        console.log(data);
        data.forEach(el => {
            console.log(el);
            createMarker(map,el).addTo(map);
            addToList(el);
        });
    }).catch((error) => {
        console.log(error);
    });
}

function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}


const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2,
    maxZoom: 2
});

const bounds = [[0, 0], [4375, 7000]];

L.imageOverlay(mapImage, bounds).addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById("lds-ring").style.opacity = '0';
        const loader = document.getElementById("loader-screen");
        loader.style.opacity = '0';
        loader.addEventListener('transitionend', () => loader.remove());
    }, 1500)
}).addTo(map);

loadMarkers("/server/markers.php",map);


map.on('click', onMapClick);

map.fitBounds(bounds);
map.setMaxBounds(bounds);
