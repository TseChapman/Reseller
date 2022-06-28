'use strict';

(function () {
  let convert_from_currency = "usd";
  let convert_to_currency = "cny";

  window.addEventListener("load", init);

  function init() {
    initCurrency();
  }

  function initCurrency() {
    // Initialize drop-down button's text
    setButtonText();
    // Initialize drop-down menu
    initConvert("from");
    initConvert("to");
    // Initialize the convertion input bar
    initConvertInput();
    // Initialize the switch button
    initSwitch();
  }

  function setButtonText() {
    let convert_from_button = qs("#convert_from .dropbtn");
    let convert_to_button = qs("#convert_to .dropbtn");
    convert_from_button.textContent = convert_from_currency.toUpperCase();
    convert_to_button.textContent = convert_to_currency.toUpperCase();
  }

  function initConvert(direction) {
    // Get the children from currecy_dropdown
    let qs_string = "#convert_" + direction + " > #currecy_dropdown"
    let currencies = qs(qs_string).children;
    // Add event listener to the currency options
    for (let i = 0; i < currencies.length; i++) {
      currencies[i].addEventListener("click", function() {
        selectConvert(direction, this);
      });
    }
  }

  function selectConvert(direction, item) {
    // Set the currency variable
    let currency = item.id;
    if (direction === "from") {
      convert_from_currency = currency;
    } else {
      convert_to_currency = currency;
    }
    // Change the text in the dropdown button
    let qs_string = "#convert_" + direction + " .dropbtn";
    let button = qs(qs_string);
    button.textContent = currency.toUpperCase();
    // Convert the result
    let term = document.getElementById("convert_item_from").value.trim();
    convertCurrency(term);

  }

  function initConvertInput() {
    let input = document.getElementById("convert_item_from");
    input.addEventListener("input", (event) => {
      let term = document.getElementById("convert_item_from").value.trim();
      convertCurrency(term);
    });
  }

  async function convertCurrency(term) {
    let convert_to_element = id("convert_item_to");
    if (term === "") {
      // If the term is empty, set the text content to "0" and add transparent class
      convert_to_element.textContent = "0";
      if (!convert_to_element.classList.contains("transparent")) {
        convert_to_element.classList.add("transparent");
      }
    } else if (isNaN(term)) {
      // Check if the term is a numeric number
      console.log(term + " is not a numeric number.");
    } else {
      try {
        let fetchString = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/" + convert_from_currency + "/" + convert_to_currency + ".json";
        // Get currency convertion
        let fetchedResponse = await fetch(fetchString);
        let response = await statusCheck(fetchedResponse);
        response = await response.json();
        // Display the convertion in convert_item_to
        let finalAmount = parseFloat(term) * response[convert_to_currency];
        convert_to_element.textContent = finalAmount;
        // Remove transparent class
        if (convert_to_element.classList.contains("transparent")) {
          convert_to_element.classList.remove("transparent");
        }
      } catch (error) {}
    }
  }

  function initSwitch() {
    // Get the button
    let switchBtn = id("switch");
    switchBtn.addEventListener("click", switchCurrency);
  }

  function switchCurrency() {
    // Get Convert buttons
    let convert_from_button = qs("#convert_from .dropbtn");
    let convert_to_button = qs("#convert_to .dropbtn");
    // Switch currencies
    let tmp = convert_from_currency;
    convert_from_currency = convert_to_currency;
    convert_to_currency = tmp;
    convert_from_button.textContent = convert_from_currency.toUpperCase();
    convert_to_button.textContent = convert_to_currency.toUpperCase();
    // Clear input text and convert result
    let input = id("convert_item_from");
    input.value = "";
    let result = id("convert_item_to");
    result.textContent = "0";
    if (!result.classList.contains("transparent")) {
      result.classList.add("transparent");
    }
  }

  /**
   * Check the status of the promise and makesure it is okay.
   * @param {Promise} response Response promise from fetching activity from API.
   * @returns {Promise} return the promise if the promise is ok.
   */
   async function statusCheck(response) {
    if (!response.ok) {
      let error = new Error(await response.text());
      error.status = response.status;
      throw error;
    }
    return response;
  }

  /**
   * id helper function
   * @param {String} idName name of id
   * @return {Object} element with id name
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }
})();