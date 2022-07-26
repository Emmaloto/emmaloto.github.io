

// Initial Formats
var allTimeFormats = [new TimeFormatEntry("MM_DD_YYYY", "00_00_0000", "0"),
new TimeFormatEntry("DD_MM_YYYY", "00_00_0000", "0"), 
new TimeFormatEntry("YYYY_MM_DD", "0000_00_00", "0"),
new TimeFormatEntry("YY_MM_DD", "00_00_00", "0"),
new TimeFormatEntry("DD_MM_YY", "00_00_00", "0"),
new TimeFormatEntry("M_D_YY", "00_00_00", "0"),
new TimeFormatEntry("D_M_YY", "00_00_00", "0"),
new TimeFormatEntry("DD_Month_YYYY", "00_Maytember_0000", "0"),
new TimeFormatEntry("Month_DD_YYYY", "Maytember_00_0000", "0"),
new TimeFormatEntry("DD_Mon_YYYY", "00_May_0000", "0"),
new TimeFormatEntry("Mon_DD_YYYY", "May_00_0000", "0"),
new TimeFormatEntry("Wkd_DD_Mon_YYYY", "00_May_0000", "0"),
new TimeFormatEntry("Wkday_DD_Mon_YYYY", "00_May_0000", "0"),
new TimeFormatEntry("Wkday_DD_Month_YYYY", "00_May_0000", "0"),
];
// var selectedDate = {day: 52, dayName: "AllsDay", month: 10, monthName: "Maytember", year: 2030, time: "00:00:00" }; 
var selectedDate = new Date("00000000");
var separator = "_";

// let tableInPage = document.querySelector("table");
let tableInPage = document.getElementsByTagName('tbody')[0];
setFormatValues(allTimeFormats);
fillTable(tableInPage, allTimeFormats);


// TimeFormatEntry Object: Date & Time seperated by underscores initally
function TimeFormatEntry(format, date, time) {
	this.format = format;
	this.date = date;
	this.time = time;
	this.dateTime = function(){
		return this.date + "_" + this.time;
	}
  // this.id = 0;
  this.copyDate = function copyToClipboard() { // w3schools.com/howto/howto_js_copy_clipboard.asp 
  	/* Get the text field */
  	var copyText = document.getElementById(this.format);

  	/* Select the text field */
  	copyText.select();
  	copyText.setSelectionRange(0, 99999); /* For mobile devices */

  	/* Copy the text inside the text field */
  	document.execCommand("copy");

  	/* Alert the copied text */
  	alert("Copied the text: " + copyText.value);
  }
}

// ---------- CHANGING HTML ----------

// https://www.valentinog.com/blog/html-table/
// Fill the HTML table with the array values
function fillTable(table, tableData){
	table.innerHTML = '';

	var counter = 0;
	for (let formatEntry of tableData) {
		let row = table.insertRow();
		counter++;
    // First field: Counter
    let cellNum = row.insertCell();
    let countText = document.createTextNode(counter);
    cellNum.appendChild(countText);

    // Second field: Format
    let cellFormat = row.insertCell();
    let formatText = document.createTextNode(formatEntry.format);
    cellFormat.appendChild(formatText);    

    // Third field: Value
    let cellVal = row.insertCell();
    cellVal.innerHTML = "<b> " + formatEntry.date + " </b>"; // formatEntry.dateTime()
    

  }
}

// ---------- SETTING TABLE DATA ----------

// Set the date & time values of the format using regex
function setFormatValues(timeFormatList){
	timeFormatList.forEach(function (formatEntry, index) {
  // https://www.w3schools.com/js/js_regexp.asp
  // https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
  // https://www.freecodecamp.org/news/pipe-and-compose-in-javascript-5b04004ac937/
  const monthName = selectedDate.toLocaleString('default', { month: 'long' });
  const weekdayName = selectedDate.toLocaleString('default', { weekday: 'long' });


  var dateHolder = formatEntry.format;
  dateHolder = dateHolder.replace(/DD/g, String(selectedDate.getDate()).padStart(2, '0')); // Leading Zeroes
  dateHolder = dateHolder.replace(/MM/g, String(selectedDate.getMonth()+1).padStart(2, '0')); // Leading Zeroes
  dateHolder = dateHolder.replace(/YYYY/g, selectedDate.getFullYear());

  dateHolder = dateHolder.replace(/D/g, selectedDate.getDate());
  dateHolder = dateHolder.replace(/YY/g, String(selectedDate.getFullYear()).slice(2));
  dateHolder = dateHolder.replace(/M/g, selectedDate.getMonth()+1);

// These will cause problems: Mon, D,  M******
dateHolder = dateHolder.replace(/Month/g, monthName);
  dateHolder = dateHolder.replace(/Mon/g,   monthName.slice(0, 3)); // Trim

// Replacing the formats which were ruined by M
// Issues with no spaces
dateHolder = dateHolder.replace(/\d+onth/g, monthName);
  dateHolder = dateHolder.replace(/\d+on/g,   monthName.slice(0, 3)); // Trim

  dateHolder = dateHolder.replace(/Wkday/g, weekdayName);
  dateHolder = dateHolder.replace(/Wkd/g,   weekdayName.slice(0, 3));

  formatEntry.date = dateHolder;
  formatEntry.time = selectedDate.toString().slice(15, 24);
  // console.log(formatEntry.time);
});
}


function setDate(dateChosen){
	if(dateChosen === "") selectedDate = new Date();
	else selectedDate = new Date(dateChosen);

	
	setFormatValues(allTimeFormats);
	fillTable(tableInPage, allTimeFormats);

	// console.log("Date set! " + dateChosen);
}

// ---------- MANAGING SEPARATORS ----------
// "None" has specified behaviour
function setSeparator(){
	var newDivider = "";
	var radioButtons = document.getElementsByName("dividerRadios");
	for(const radioBtn of radioButtons){
		if(radioBtn.checked == true){
            // console.log("New: " + radioBtn.value + "|| Old: "+ separator);
            newDivider = radioBtn.value;
          }
        }

        replaceSeparator(allTimeFormats, newDivider);

      }

      function setCustomSeparator(){
      	var customSep = document.getElementById("customSepInput").value;
	// Possibly some input checks
	// NO numbers

	replaceSeparator(allTimeFormats, customSep);
}


function replaceSeparator(tableData, newDivider){
	var nullDivider = "<->";

	// Separator might actually be null string, so reload date values with separator
	if(separator === nullDivider) setFormatValues(allTimeFormats);

	for (let formatEntry of tableData) {
		// console.log(formatEntry.date);
		
		// console.log(formatEntry.format);
		if(newDivider !== ""){
			formatEntry.date   = formatEntry.date.replaceAll(separator, newDivider);
			formatEntry.format = formatEntry.format.replaceAll(separator, newDivider);
		}else{
			formatEntry.date   = formatEntry.date.replaceAll(separator, newDivider);
			formatEntry.format = formatEntry.format.replaceAll(separator, nullDivider);
		}
	}

	fillTable(tableInPage, tableData);
	separator = newDivider;

	if(newDivider === "") separator = nullDivider;

}

// Disables/enables input
$(function(){
	// Picking dates
	$('.datepicker').datepicker({
		format: 'mm-dd-yyyy',
		todayHighlight: true,
		autoclose: true
	});

	$('input[name="datePicker"]').change(function() {
		setDate($(this).val());
	});


	// Picking custom divider
	$('input:radio[name="dividerRadios"]').change(function() {
		if ($(this).val()=='_CUSTOM_') {
			$("#customSepButton").attr("disabled", false);
			$("#customSepInput").attr("disabled", false);
		} 
		else {
			$("#customSepButton").attr("disabled", true);
			$("#customSepInput").attr("disabled", true);
		}
	});

});





// MM_DD_YYYY
// DD_MM_YYYY
// YYYY_MM_DD
// YY_MM_DD
// DD_Month_YYYY
// DD_Mon_YYYY
// Month_DD_YYYY
// Mon_DD_YYYY
// Month_YYYY

// "Valid Symbols: :;`~!@#$%^&*()_+=-.,/|?/*-"
// Fill just the table value column with the date (time) property values
// function fillDateValues(table){}