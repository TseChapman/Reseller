'use strict';

(function () {
  let convert_from_currency = "usd";
  let convert_to_currency = "cny";
  let selected_system = "eu";
  let db;

  window.addEventListener("load", init);

  function init() {
    db = openDatabase("shoe.db", "1.0", "Shoe Size DB", 2 * 1024 * 1024);
    setupDB();
    initCurrency();
    initShoeSystem();
  }

  function setupDB() {
    console.log(db);
    db.transaction(function(tx) {
      //tx.executeSql("DROP TABLE shoeSize");
      tx.executeSql("CREATE TABLE IF NOT EXISTS shoeSize(id INTEGER PRIMARY KEY UNIQUE, eu FLOAT, usMen FLOAT, usWomen FLOAT, uk FLOAT, cm FLOAT, usKid TEXT);", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (1, 32.5, 1, 2.5, 0.5, 20, '1Y');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (2, 33, 1.5, 3, 1, 20.5, '1.5Y');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (3, 33.5, 2, 3.5, 1.5, 21, '2Y');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (4, 34, 2.5, 4, 2, 21.5, '2.5Y');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (5, 35, 3, 4.5, 2.5, 22, '3Y');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (6, 35.5, 3.5, 5, 3, 22.5, '3.5Y');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (7, 36, 4, 5.5, 3.5, 23, '4Y');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (8, 36.5, 4.5, 6, 4, 23.5, '4.5Y');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (9, 37.5, 5, 6.5, 4.5, 23.5, '5Y');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (10, 38, 5.5, 7, 5, 24, '5.5Y');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (11, 38.5, 6, 7.5, 5.5, 24, '6Y');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (12, 39, 6.5, 8, 6, 24.5, '6.5Y');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (13, 40, 7, 8.5, 6, 25, '7Y');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (14, 40.5, 7.5, 9, 6.5, 25.5, '7.5Y');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (15, 41, 8, 9.5, 7, 26, '8Y');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (16, 42, 8.5, 10, 7.5, 26.5, '8.5Y');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (17, 42.5, 9, 10.5, 8, 27, '9Y');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (18, 43, 9.5, 11, 8.5, 27.5, '9.5Y');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (19, 44, 10, 11.5, 9, 28, '10Y');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (20, 44.5, 10.5, 12, 9.5, 28.5, '10.5Y');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (21, 45, 11, 12.5, 10, 29, '');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (22, 45.5, 11.5, 13, 10.5, 29.5, '');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (23, 46, 12, 13.5, 11, 30, '');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (24, 47, 12.5, 14, 11.5, 30.5, '');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (25, 47.5, 13, 14.5, 12, 31, '');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (26, 48, 13.5, 15, 12.5, 31.5, '');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (27, 48.5, 14, 15.5, 13, 32, '');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (28, 49, 14.5, 16, 13.5, 32.5, '');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (29, 49.5, 15, 16.5, 14, 33, '');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (30, 50, 15.5, 17, 14.5, 33.5, '');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (31, 50.5, 16, 17.5, 15, 34, '');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (32, 51, 16.5, 18, 15.5, 34.5, '');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (33, 51.5, 17, 18.5, 16, 35, '');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (34, 52, 17.5, 19, 16.5, 35.5, '');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (35, 52.5, 18, 19.5, 17, 36, '');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (36, 53, 18.5, 20, 17.5, 36.5, '');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (37, 53.5, 19, 20.5, 18, 37, '');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (38, 54, 19.5, 21, 18.5, 37.5, '');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (39, 54.5, 20, 21.5, 19, 38, '');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (40, 55, 20.5, 22, 19.5, 38.5, '');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (41, 55.5, 21, 22.5, 20, 39, '');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (42, 56, 21.5, 23, 20.5, 39.5, '');", [], null, function(tx, error) {console.error(error);});
      tx.executeSql("INSERT INTO shoeSize (id, eu, usMen, usWomen, uk, cm, usKid) VALUES (43, 56.5, 22, 23.5, 21, 40, '');", [], null, function(tx, error) {console.error(error);});
    });
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

  function initShoeSystem() {
    // Initialize the system selection button
    initSystemSelection();
    // Initialize the size selection button
    initSizeSelection();
  }

  function setButtonText() {
    let convert_from_button = qs("#convert_from .dropbtn");
    let convert_to_button = qs("#convert_to .dropbtn");
    convert_from_button.textContent = convert_from_currency.toUpperCase();
    convert_to_button.textContent = convert_to_currency.toUpperCase();
  }

  function initConvert(direction) {
    // Get the children from dropdown_item
    let qs_string = "#convert_" + direction + " > .dropdown_item";
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

  function initSystemSelection() {
    // Get the children from #system_selection > .dropdown_item
    let systems = qs("#system_selection > .dropdown_item").children;
    for (let i = 0; i < systems.length; i++) {
      // Add event listener to the child
      systems[i].addEventListener("click", function() {
        selectSystem(this);
      });
    }
    updateSystemRow();
    updateSizeRow();
  }

  function selectSystem(system) {
    // Save the selected system
    selected_system = system.id;
    // Change the text content on the button
    let button = qs("#system_selection .dropbtn");
    button.textContent = system.textContent;
    // Update the size selection list
    updateSizeSelection(selected_system);
    //  Change the system and size row
    updateSystemRow();
    updateSizeRow();
    // Reset Size Selection
    resetSizeRow();
  }

  function updateSystemRow() {
    // Get a list of system table's row entries
    let headings = id("system_row").children;
    for (let i = 0; i < headings.length; i++) {
      if (headings[i].id == "system_dropdown") {
        // Ignore the dropdown list
        continue;
      }
      else if (headings[i].id == selected_system + "_heading") {
        // Hide the column
        if (!headings[i].classList.contains("hidden")) {
          headings[i].classList.add("hidden");
        }
      } else {
        if (headings[i].classList.contains("hidden")) {
          headings[i].classList.remove("hidden");
        }
      }
    }
  }

  function updateSizeRow() {
    // Hide and unhide specific entry based on the selected system
    let row = id("size_row").children;
    for (let i = 0; i < row.length; i++) {
      if (row[i].id == "size_dropdown") {
        continue;
      }
      else if (row[i].id == selected_system + "_size") {
        if (!row[i].classList.contains("hidden")) {
          row[i].classList.add("hidden");
        }
      } else {
        if (row[i].classList.contains("hidden")) {
          row[i].classList.remove("hidden");
        }
      }
    }
  }

  function resetSizeRow() {
    // Get the table row
    let row = id("size_row").children;
    for (let i = 0; i < row.length; i++) {
      if (row[i].id == "size_dropdown") {
        continue;
      } else {
        // Reset the content in the element
        row[i].textContent = "";
      }
    }
  }

  function initSizeSelection() {
    updateSizeSelection("eu");
  }

  function updateSizeSelection(system) {
    try {
      // Get a list of size of the eu shoe system
      let sqlString = "SELECT " + system + " FROM shoeSize;";
      db.transaction(function(tx) {
        tx.executeSql(sqlString, [], function(tx, results) {
          console.log("hello");
          handleSizeSelectionResult(system, results);
        }, function(tx, error) {console.error(error);});
      });
    } catch (error) {
      console.error(error);
    }
  }

  function handleSizeSelectionResult(system, results) {
    // Clear the dropdown items
    let dropdown = qs("#size_selection > .dropdown_item");
    removeAllChildNodes(dropdown);
    let button = qs("#size_selection .dropbtn");
    for (let i = 0; i < results.rows.length; i++) {
      if (i == 0) {
        button.textContent =  results.rows.item(i)[system];
      }
      let shoeSize = results.rows.item(i)[system];
      // Create an element for each size
      let p = gen("p");
      p.textContent = shoeSize;
      // Add event listener to the element
      p.addEventListener("click", function() {
        clickSizeSelection(shoeSize);
      });
      // Add them to the dropdown list in size selection
      dropdown.appendChild(p);
    }
  }

  function clickSizeSelection(shoeSize) {
    let button = qs("#size_selection .dropbtn");
    button.textContent = shoeSize;
    // Get same shoe size from database
    let sizeString = parseFloat(shoeSize);
    db.transaction(function(tx) {
      let sql =  "SELECT * FROM shoeSize WHERE " + selected_system + " = " + sizeString + ";";
      tx.executeSql(sql, [], function (tx, res) {
        for (let i = 0; i < res.rows.length; i++) {
          // display in table
          let eu = id("eu_size");
          eu.textContent = res.rows.item(i)["eu"];
          let usMen = id("usMen_size");
          usMen.textContent = res.rows.item(i)["usMen"];
          let usWomen = id("usWomen_size");
          usWomen.textContent = res.rows.item(i)["usWomen"];
          let uk = id("uk_size");
          uk.textContent = res.rows.item(i)["uk"];
          let cm = id("cm_size");
          cm.textContent = res.rows.item(i)["cm"];
          let usKid = id("usKid_size");
          usKid.textContent = res.rows.item(i)["usKid"];
        }
      }, function (tx, error) {console.error(error)});
    });
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

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
  }
})();