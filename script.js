//You can edit ALL of the code here
const root = document.getElementById("root");
const header = document.createElement("header");
const main = document.createElement("main");
const footer = document.createElement("footer");
const episodesArticle = document.createElement("article");
const episodesTitle = document.createElement("h1");
const allEpisodes = getAllEpisodes();
// --------------------creating header tags--------------------
const searchDiv = document.createElement("div");
const search_input = document.createElement("input");
searchDiv.appendChild(search_input);
search_input.addEventListener("input", (e) => createEpisodes(allEpisodes));
header.appendChild(searchDiv);
// ----------------------------Creating episodes select tag-----------------------
const episodesSelectTag = document.createElement("select");
header.appendChild(episodesSelectTag);
episodesSelectTag.addEventListener("change", (e) => getEpisode(e.target.value));
// ---------------------------Helper functions-------------------
const createTitle = (season, num, name) => {
  return `${name} - S${String(season).padStart(2, 0)}E${String(num).padStart(
    2,
    0
  )}`;
};
const getEpisode = (id) => {
  if (id === "none") {
    episodesArticle.innerHTML = "";
    return createEpisodes(allEpisodes);
  }
  const episodeId = Number(id);
  episodesArticle.innerHTML = "";
  const choosenEpisode = allEpisodes.filter((ep) => ep.id === episodeId);
  createEpisodes(choosenEpisode);
};
const createEpisodesOptions = () => {
  const myEpisodes = allEpisodes;
  episodesSelectTag.innerHTML = `<option value='none' selected='selected'>Select Episode</option>`;
  myEpisodes.forEach((ep, index) => {
    let opt = document.createElement("option");
    opt.innerText = createTitle(ep.season, ep.number, ep.name);
    opt.value = ep.id;
    opt.classList.add("episodes-option");
    episodesSelectTag.appendChild(opt);
  });
};
// -------------------------------------
const createEpisodes = (episodesList) => {
  let allEpisodes = episodesList;
  const filteredEpisodes = episodesList.filter(
    (item) =>
      item.name.toLowerCase().includes(search_input.value.toLowerCase()) ||
      item.summary.toLowerCase().includes(search_input.value.toLowerCase())
  );
  if (search_input.value === "") {
    allEpisodes = episodesList;
  } else {
    allEpisodes = filteredEpisodes;
    console.log(allEpisodes.length);
  }
  episodesArticle.innerHTML = "";
  episodesTitle.innerText = `${allEpisodes.length} / ${episodesList.length} Episodes found!`;
  allEpisodes.length === 0
    ? (episodesTitle.innerText = "Nothing found! :(")
    : allEpisodes.forEach((episode, index) => {
        let episodeDiv = document.createElement("div");
        episodeDiv.innerHTML = `
    <h1>${createTitle(episode.season, episode.number, episode.name)}</h1>
    <img src="${episode["image"]["medium"]}">
    <h3>Name: ${episode["name"]}</h3>
    <h3>Season: ${episode.season}</h3>
    <h3>Number: ${episode.number}</h3>
    <p>${episode.summary}</p>
    `;
        episodeDiv.classList.add("episode-div");
        episodesArticle.appendChild(episodeDiv);
      });
};
// Creating tags for main page to show episodes

// ---------Steps to create and append tags------------
// const episodesTitle=document.createElement("h1");
// episodesTitle.innerText="Hi"
// main.appendChild(episodesTitle)

function setup() {
  // ------------Setup page in three parts---------
  root.append(header, main, footer);
  makePageForEpisodes(allEpisodes);
  createEpisodesOptions();
}

function makePageForEpisodes(episodeList) {
  episodesTitle.innerText = `${episodeList.length} Episodes found!`;
  main.appendChild(episodesTitle);

  // -------------Showing episodes------------
  createEpisodes(episodeList);
  main.appendChild(episodesArticle);
}

const ShowAllEpisodes = (myEpisodes) => {};

window.onload = setup;
