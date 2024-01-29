"use strict";

var resultArtist = document.getElementById("result-artist");
var playlistContainer = document.getElementById("result-playlists");
var searchInput = document.getElementById("search-input");

function requestApi(searchTerm) {
  fetch("http://localhost:3000/artists?name_like=".concat(searchTerm)).then(function (response) {
    return response.json();
  }).then(function (results) {
    return displayResults(results);
  });
}

function displayResults(results) {
  hidePlaylists();
  var artistImage = document.getElementById("artist-img");
  var artistName = document.getElementById("artist-name");
  results.forEach(function (element) {
    artistImage.src = element.urlImg;
    artistName.innerText = element.name;
  });
  resultArtist.classList.remove("hidden");
}

function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

searchInput.addEventListener("input", function () {
  var searchTerm = searchInput.value.toLowerCase();

  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }

  requestApi(searchTerm);
});