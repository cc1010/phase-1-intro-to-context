// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
	return {
		firstName,
		familyName,
		title,
		payPerHour,
		timeInEvents: [],
		timeOutEvents: [],
	};
}

//
function createEmployeeRecords(dataEmployees) {
	return dataEmployees.map((i) => createEmployeeRecord(i));
}

//
let createTimeInEvent = function (employee, dateStamp) {
	let [date, hour] = dateStamp.split(" ");

	employee.timeInEvents.push({
		type: "TimeIn",
		hour: parseInt(hour, 10),
		date,
	});

	return employee;
};
//
let createTimeOutEvent = function (employee, dateStamp) {
	let [date, hour] = dateStamp.split(" ");

	employee.timeOutEvents.push({
		type: "TimeOut",
		hour: parseInt(hour, 10),
		date: date,
	});

	return employee;
};
//
function hoursWorkedOnDate(employee, dateStamp) {
	let timeIn = employee.timeInEvents.find((i) => i.date === dateStamp);
	let timeOut = employee.timeOutEvents.find((i) => i.date === dateStamp);

	return (timeOut.hour - timeIn.hour) / 100;
}
function wagesEarnedOnDate(employee, dateStamp) {
	return hoursWorkedOnDate(employee, dateStamp) * employee.payPerHour;
}

function allWagesFor(employee) {
	const dates = employee.timeInEvents.map((i) => i.date);

	let total = dates.reduce((previousValue, currentValue) => {
		return previousValue + wagesEarnedOnDate(employee, currentValue);
	}, 0);
	return total;
}
function calculatePayroll(employees) {
	let total = employees.reduce((previousValue, employee) => {
		return previousValue + allWagesFor(employee);
	}, 0);
	return total;
}
