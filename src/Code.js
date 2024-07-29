function fetchEmployeeIds() {
    var sheet = SpreadsheetApp.openById('1FRguWbavY0HaS1UHsptXvSFxwq6E_N3gpfc_B6iA9wM').getSheetByName('Tasks');
    var data = sheet.getDataRange().getValues();
    var employeeIds = [];
    for (var i = 1; i < data.length; i++) {
        if (!employeeIds.includes(data[i][2])) {
            employeeIds.push(data[i][2]); // Assuming column 2 has the employee ID
        }
    }
    return employeeIds;
}

function showProfile(employeeId) {
    var employeeDetails = getEmployeeDetails(employeeId);
    var badgeLabels = getBadgeLabels(employeeId);
    if (employeeDetails) {
        return {
            name: employeeDetails.name,
            email: employeeDetails.email,
            badgeLabels: badgeLabels
        };
    } else {
        return null;
    }
}

function getEmployeeDetails(employeeId) {
    var sheet = SpreadsheetApp.openById('1FRguWbavY0HaS1UHsptXvSFxwq6E_N3gpfc_B6iA9wM').getSheetByName('Tasks');
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
        if (data[i][2] == employeeId) {
            return {
                name: data[i][1], // Assuming column 1 has the name
                email: data[i][8] // Assuming column 8 has the email
            };
        }
    }
    return null;
}

function getBadgeLabels(employeeId) {
    var sheet = SpreadsheetApp.openById('1R_NiF-Hzno-VOaqfcqgc2K1nUtvf4yFx7yPvLaX4tNQ').getSheetByName('badgesdetails');
    var data = sheet.getDataRange().getValues();
    var badgeLabels = [];
    for (var i = 1; i < data.length; i++) {
        if (data[i][0] == employeeId) {
            badgeLabels.push({ badgeLabel: data[i][1] });
        }
    }
    return badgeLabels;
}

function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('Custom Menu')
        .addItem('Show Profile', 'showProfile')
        .addToUi();
}

