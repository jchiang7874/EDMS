//Employee Data Mgmt System
	//Build a form to accept employees' info and generates on the page

$("#display").hide();

//Form - validate user input before populating on the page
	var inputs = document.getElementsByTagName('input');
	var btns = document.getElementsByTagName('button');

	//first & last name input field - accept letters only
	function namesTest() {
		var names = document.getElementsByName('name');
		for (var i = 0; i < names.length; i++) {
			var str = names[i].value;
			var valid = /^[a-zA-Z]+$/.test(str);
			var result; 

			if (!valid) {
				alert('Please enter your name');
				result = 0;
			}  else {
				result = 1;
			}
		} return result;
	}

	//phone input field - accept numbers only
	function phoneTest () {
		var str = document.getElementsByName('phone')[0].value;
		
		var result;

		if (str !== null || str !== undefined) {
			var valid = str.match(/\d/g);
			if (valid && valid.length == 10) {
				result = 1;
			} else {
				alert('Please enter 10 digit phone number');
				result = 0;
			}
		} return result;
	}

	//email input field - accepts all
	function emailTest() {
		var str = document.getElementsByName('email')[0].value;
		var valid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
		var result;

		if(!valid) {
			alert('Please enter valid email');
			result = 0;
		} else {
			result = 1;
		} return result;
	}

	//EventListener for buttons
	for (var i = 0; i < btns.length; i++) {
		if (btns[i].getAttribute('data-value') === 'reset') {
			btns[i].addEventListener('click', clear);
		} else if (btns[i].getAttribute('data-value') === 'submit') {
			btns[i].addEventListener('click', validate);
		}
	}

	//reset button - once pressed, it will clear the form
	function clear() {
		for (var i = 0; i < inputs.length; i++) {
			inputs[i].value = null;
		}
	}
	
	//submit button - once pressed, it will validate user input
	function validate () {
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].getAttribute('name') === 'name') {
				var resultNames = namesTest();
			}
			if (inputs[i].getAttribute('data-value') === 'phone') {
				var resultPhone = phoneTest();
			}
			if (inputs[i].getAttribute('data-value') === 'email') {
				var resultEmail = emailTest();
			}
		} 

		//If invalid:
			//please enter valid info
			//does NOT add to employee list

		if ((resultNames == 0) && (resultPhone == 0) && (resultEmail == 0)) {
		
			alert("Please enter valid information");

		//Else if valid:
			//stores it in JSON

		} else if ((resultNames == 1) && (resultPhone == 1) && (resultEmail == 1)) {
			list();
			var div = document.getElementById('list');
			show();
		}

		clear();

	}
			
	//Stores in JSON
	var info = [];
	function list() {
		var textValue = document.querySelectorAll('input');
		var firstArr = [],
			lastArr = [],
			phoneArr = [],
			emailArr = [];

		for (var i = 0; i < textValue.length; i++) {
			if (textValue[i].getAttribute('data-value') === 'firstName') {	
				var first = document.getElementsByName('name')[0].value.toUpperCase();
				firstArr.push(first);
			}
			if (textValue[i].getAttribute('data-value') === 'lastName') {
				var last = document.getElementsByName('name')[1].value.toUpperCase();
				lastArr.push(last);
			}
			if (textValue[i].getAttribute('data-value') === 'phone') {
				var phone = document.getElementsByName('phone')[0].value;
				phoneArr.push(phone);
			}
			if (textValue[i].getAttribute('data-value') === 'email') {
				var email = document.getElementsByName('email')[0].value;
				emailArr.push(email);
			}
		}

		var employee = {};
		employee ["First_name"] = firstArr;
		employee ["Last_name"] = lastArr;
		employee ["Phone"] = phoneArr;
		employee ["Email"] = emailArr;
		info.push(employee);

		return info;
	}

	//Employee list - generate list and append it to #list
		//loop through JSON and populate employee list
	function display () {
		var table = document.getElementById('data');
		var data = ""; 

		for (var i = 0; i < info.length; i++) {
			var employee = info[i];
				header = "<tr>" + "<th>" + "Name" + "</th>" + 
							"<th>" + "Phone Number" + "</th>" + 
							"<th>" + "Email" + "</th>" + "</tr>";
			data += "<tr>" + "<td>" +employee["First_name"][0] +
					 " " + employee["Last_name"][0] + "</td>" +
					"<td>" + " " + employee["Phone"][0] + "</td>" +
					"<td>" + " " + employee["Email"][0] + "</td>" + "</tr>"; 
			
		}

		table.innerHTML = header + data;
	}

	//Show list
	function show() {
		$("#display").show();
		display();
	}










