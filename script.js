//You can edit ALL of the code here
const root = document.getElementById("root");
const header = document.createElement("header");
const main = document.createElement("main");
const footer = document.createElement("footer");

const createTitle = (season, num, name) => {
  return `${name} - S${String(season).padStart(2, 0)}E${String(num).padStart(
    2,
    0
  )}`;
};
// Creating tags for main page to show episodes

// ---------Steps to create and append tags------------
// const episodesTitle=document.createElement("h1");
// episodesTitle.innerText="Hi"
// main.appendChild(episodesTitle)

function setup() {
  // ------------Setup page in three parts---------
  root.append(header, main, footer);

  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const episodesTitle = document.createElement("h1");
  episodesTitle.innerText = `${episodeList.length} Episodes found!`;
  main.appendChild(episodesTitle);
  const episodesArticle = document.createElement("article");

  // -------------Showing episodes------------
  episodeList.forEach((episode, index) => {
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
  main.appendChild(episodesArticle);
}

const ShowAllEpisodes = (myEpisodes) => {};

window.onload = setup;
