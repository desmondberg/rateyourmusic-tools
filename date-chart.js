//https://github.com/desmondberg/rateyourmusic-tools

// ==UserScript==
// @name         RYM tools - date-chart
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Get charts for specific date
// @author       Dessie
// @match        https://rateyourmusic.com/charts/*
// @run-at       document-start
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/desmondberg/rateyourmusic-tools/main/date-chart.js
// ==/UserScript==

function getDate(){
    //convert yyyy-mm-dd to yyyy.mm.dd
    let date = document.getElementById('chartDateInput').value.split("-").join(".");
    console.log(date);
    return date;
}

let template = `<div id="date-chart">
  <div>
  	<label for="birthday">Get charts for a specific date:</label>
  	<input type="date" id="chartDateInput" name="chartDateInput">
    <button id="dateChartConfirmButton" style="padding:0.5rem" onclick="">Confirm</button>
  </div>
</div>`;

//format - https://rateyourmusic.com/charts/top/album/yyyy.mm.dd/

//wait until the content has loaded before we try to inject anything
document.addEventListener('DOMContentLoaded', () => {

    let charts = document.getElementById("page_charts_group_main_left");
    charts.innerHTML = template + charts.innerHTML;

    let confirmButton = document.getElementById("dateChartConfirmButton");
    let chartDateInput = document.getElementById("chartDateInput");

    confirmButton.addEventListener(('click'), ()=>{
        document.location.href = `https://rateyourmusic.com/charts/top/album/${getDate()}`;
    });
});