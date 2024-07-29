function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function assignNewTask(taskName, employeeId, assigned, status, progress, deadline, taskWeight, email) {
  try {
    const sheet = SpreadsheetApp.openById('1FRguWbavY0HaS1UHsptXvSFxwq6E_N3gpfc_B6iA9wM').getSheetByName('Tasks');
    const taskId = sheet.getLastRow() + 1;
    sheet.appendRow([taskId, taskName, employeeId, assigned, status, progress, new Date(deadline), taskWeight, email]);

    const subject = `Task Update: ${taskName}`;
    const body = `Hi ${employeeId},\n\nI hope this message finds you well.\n\nHere are the details:\n\n` +
                 `Task ID: ${taskId}\nTask Name: ${taskName}\nAssigned To: ${employeeId}\n` +
                 `Task: ${assigned}\nDeadline: ${new Date(deadline).toLocaleString()}\nTask Weight: ${taskWeight}\n\n` +
                 `Best regards,`;
    MailApp.sendEmail(email, subject, body);
  } catch (error) {
    Logger.log('Error in assignNewTask: ' + error.toString());
  }
}

function getTasksForToDoList() {
  try {
    const sheet = SpreadsheetApp.openById('1FRguWbavY0HaS1UHsptXvSFxwq6E_N3gpfc_B6iA9wM').getSheetByName('Tasks');
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
    const employeeID = 'ID210';

    const tasks = data
      .filter(row => row[2] === employeeID)
      .map(row => ({
        taskName: row[1],
        assigned: row[3],
        status: row[4],
        deadline: new Date(row[6]).toLocaleDateString(),
        email: row[8]
      }));

    return tasks;
  } catch (error) {
    Logger.log('Error in getTasksForToDoList: ' + error.toString());
    return [];
  }
}
