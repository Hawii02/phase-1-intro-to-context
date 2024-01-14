
// Your code here
function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeesData) {
  return employeesData.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(" ");

  employee.timeInEvents.push({
    type: "TimeIn",
    date,
    hour: parseInt(hour, 10),
  });

  return employee;
}

function createTimeOutEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(" ");

  employee.timeOutEvents.push({
    type: "TimeOut",
    date,
    hour: parseInt(hour, 10),
  });

  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeInEvent = employee.timeInEvents.find((event) => event.date === date);
  const timeOutEvent = employee.timeOutEvents.find((event) => event.date === date);

  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;

  return hoursWorked;
}

function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  const payRate = employee.payPerHour;
  const wagesEarned = hoursWorked * payRate;

  return wagesEarned;
}

function allWagesFor(employee) {
  const eligibleDates = employee.timeInEvents.map((event) => event.date);

  const payable = eligibleDates.reduce(function (memo, date) {
    return memo + wagesEarnedOnDate(employee, date);
  }, 0);

  return payable;
}

function findEmployeeByFirstName(firstName) {
  return this.find((employee) => employee.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
  const totalPayroll = employeeRecords.reduce(function (total, employee) {
    return total + allWagesFor(employee);
  }, 0);

  return totalPayroll;
}

// Sample data for testing
const dataEmployees = [
  ["Thor", "Odinsson", "Electrical Engineer", 45],
  ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
  ["Natalia", "Romanov", "CEO", 150],
  ["Darcey", "Lewis", "Intern", 15],
  ["Jarvis", "Stark", "CIO", 125],
  ["Anthony", "Stark", "Angel Investor", 300],
];

const employeeRecords = createEmployeeRecords(dataEmployees);
console.log(employeeRecords);

const thor = findEmployeeByFirstName.call(employeeRecords, "Thor");
console.log(thor);

createTimeInEvent(thor, "2024-01-10 0900");
createTimeOutEvent(thor, "2024-01-10 1700");

console.log(hoursWorkedOnDate(thor, "2024-01-10"));
console.log(wagesEarnedOnDate(thor, "2024-01-10"));

console.log(allWagesFor(thor));

console.log(calculatePayroll(employeeRecords));
