//https://github.com/desmondberg/rateyourmusic-tools

// ==UserScript==
// @name         RYM tools - date-chart
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Get chart for specific date
// @author       Dessie
// @match        https://rateyourmusic.com/collection/*/wishlist*
// @run-at       document-start
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/desmondberg/rateyourmusic-tools/main/wishlist-random-picker.js
// ==/UserScript==

//page_catalog_item_xx -- id of individual wishlist elements
//#page_catalog_item <- .mbgen <- .content <- .content_wrapper <- .content_wrapper_outer

function copyHtml(node1, node2) {
    node1.innerHTML = node2.innerHTML;
}


function getRow(album) {
    let info = [];
    info.push(
        album.querySelector('.or_q_thumb_album')
    );
    info.push(
        album.querySelector('.or_q_rating_date_d')
    );
    info.push(
        album.querySelector('.or_q_rating_date_s')
    );
    info.push(
        album.querySelector('.or_q_albumartist_td')
    );
    info.push(
        album.querySelector('.or_q_tags_td')
    );
    return info;
}


let templateNode = document.createElement("tr"); //create the template element for the top row

let template = `
<td> <button id="pick_button" style="height:5rem; width:8rem; font-size:24px; color:#ff3333;">Pick</button> </td>

<td class="or_q_thumb_album"></td>
<td class="or_q_rating_date_d"></td>
<td class="or_q_rating_date_s"></td>
<td class="or_q_albumartist_td"></td>


<td class="or_q_tags_td">
<p><b>Don't know what to listen to? Click the button to pick a random release from the wishlist!</b></p>
<sub>due to technical limitations, this script can only pick a release that's on the current page</sub>
<br>
<sub>this also works on other users' wishlists. try it out!</sub>
</td>

<tr></tr>`;

//wait until the content has loaded before we try to inject anything
document.addEventListener('DOMContentLoaded', () => {
    let table = document.querySelector(".mbgen tbody");
    let tableHeader = document.querySelector("#page_catalog_item_");
    let albums = Array.prototype.slice.call(table.children); //all the albums that are on the current page
    albums = albums.filter(row => row.id !== "page_catalog_item_"); //this gets rid of the header row from the albums array

    //albums.forEach((row)=>console.log(row));

    //dont display the picker if there are no items besides the header in the table
    if(!table.length==1){
        let previous = document.createElement("tr");

        table.insertBefore(templateNode, tableHeader);

        templateNode.innerHTML += template;
        templateNode.setAttribute("id", "page_catalog_item_suggestion");

        let pickButton = document.getElementById("pick_button");
        pickButton.addEventListener('click', () => {
            let pick = albums[Math.floor(Math.random() * albums.length)]; //pick a random album from the table

            //if the album picked is the same as the previous one, generate a new one until it isn't
            if (pick.innerHTML == previous.innerHTML) {
                //console.log("same album picked twice");
                while (pick.innerHTML == previous.innerHTML) {
                    pick = albums[Math.floor(Math.random() * albums.length)];
                }
            }
            copyHtml(previous, pick);
            //console.log(pick);

            //get the columns
            let albumRows = getRow(pick);
            let templateRows = getRow(templateNode);

            //copy and paste every column from the album row to the top row
            for (let i = 0; i < albumRows.length; i++) {
                copyHtml(templateRows[i], albumRows[i]);
            }

        }
    )
    }
}
)



