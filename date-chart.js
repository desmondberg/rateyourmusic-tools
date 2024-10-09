//https://github.com/desmondbergen/rateyourmusic-tools

// ==UserScript==
// @name         RYM tools - wishlist-random-picker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Pick random album from wishlist
// @author       Dessie
// @match        https://rateyourmusic.com/charts/
// @run-at       document-start
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/desmondberg/rateyourmusic-tools/main/wishlist-random-picker.js
// ==/UserScript==

//page_catalog_item_xx -- id of individual wishlist elements
//#page_catalog_item <- .mbgen <- .content <- .content_wrapper <- .content_wrapper_outer
