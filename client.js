//? TODO LIST
//? get data from inputs with val()
//? click listener on button to get inputs and add to table. clear inputs
//? Delete button to get rid of employees
//? Change color of totalAmount if more than 20,000
$(document).ready(onReady);

let totalMonthly = 0;

function onReady() {
	console.log('JQ is ready');
	//? Click listener for submit button
	$('.submitInfo').on('click', handleClick);
	//? Click listener for delete button
	$('.tableBody').on('click', '.deleteButton', handleDelete);
	$('.tableBody').on('click', '.editButton', handleEdit);
}

function handleClick() {
	console.log('Submit Click');
	//? Append info to dom and get values
	let firstName = $('.firstName').val();
	let lastName = $('.lastName').val();
	let idNumber = $('.idNumber').val();
	let title = $('.title').val();
	let annualSalary = $('.annualSalary').val();
	console.log('Annual Salary is:', annualSalary);
	let monthlyAmount = Math.round(annualSalary / 12);
	console.log('Monthly salary is:', monthlyAmount);
	//? Add val to the DOM
	$('.tableBody').append(`
		<tr class="newEmployee">
			<th class="thFirstName">${firstName}</th>
			<th class="thLastName">${lastName}</th>
			<th class="thIdNumber">${idNumber}</th>
			<th class="thTitle">${title}</th>
			<th class="salary">${annualSalary}</th>
			<th><button type="submit" class="deleteButton">Delete</button></th>
			<th><button type="submit" class="editButton">Edit</button></th>
		</tr>
	`);
	//? Add annual salary to the total
	Math.round((totalMonthly += Number(monthlyAmount)));
	//? Log the total
	console.log('Total Money:', totalMonthly);
	//? update total money on the DOM
	$('.totalMonthly').html(`Total Monthly: ${totalMonthly}`);
	//? Empty all values
	$('.firstName').val('');
	$('.lastName').val('');
	$('.idNumber').val('');
	$('.title').val('');
	$('.annualSalary').val('');
	colorChange();
}

function handleDelete() {
	//? Target parent element of the delete button?
	//? maybe .remove maybe .clear?
	console.log('Delete Click');
	//? get amount of salary box
	let amount = $(this).parent().parent().children('.salary').text();
	console.log('This is the amount:', amount);
	//? target the parents parent and delete it. should be tr tag
	totalMonthly -= Math.round(Number(amount) / 12);
	console.log('Total after subtraction:', totalMonthly);
	$('.totalMonthly').html(`Total Monthly: ${totalMonthly}`);
	$(this).parent().parent().remove();
	colorChange();
}

function handleEdit() {
	//? Target parent element of the delete button?
	//? maybe .remove maybe .clear?
	console.log('Edit Click');
	//? get value of current text in these fields
	let firstName = $(this).parent().parent().children('.thFirstName').text();
	let lastName = $(this).parent().parent().children('.thLastName').text();
	let idNumber = $(this).parent().parent().children('.thIdNumber').text();
	let title = $(this).parent().parent().children('.thTitle').text();
	let amount = $(this).parent().parent().children('.salary').text();
	//? append in Input fields with gathered data into table
	//? append first name row
	$(this)
		.parent()
		.parent()
		.children('.thFirstName')
		.html(`<input type="text" class="editFirstName">`);
	$('.editFirstName').val(`${firstName}`);
	//? append last name row
	$(this)
		.parent()
		.parent()
		.children('.thLastName')
		.html(`<input type="text" class="editLastName">`);
	$('.editLastName').val(`${lastName}`);
	//? append ID
	$(this)
		.parent()
		.parent()
		.children('.thIdNumber')
		.html(`<input type="text" class="editIdNumber">`);
	$('.editIdNumber').val(`${idNumber}`);
}

function submitEdit() {
	//? get the information of those input fields
	//? .html that info back in the table
	//? change button back to edit button
	//? handle change of salary both more and less salary (maybe if logic)
	//? update new monthly amount
	colorChange();
}

function colorChange() {
	console.log('Change Color');
	if (totalMonthly > 20000) {
		$('.totalMonthly').css('color', 'red');
	} else {
		$('.totalMonthly').css('color', 'white');
	}
}
