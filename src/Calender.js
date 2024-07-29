function createEvent(form) {
    Logger.log(form);  // Log the form data to check its structure
    
    var calendar = CalendarApp.getDefaultCalendar();
    
    if (!form.date || !form.time) {
        return 'Date or time is missing';
    }
    
    // Create date and time for the event start
    var startDateTime = new Date(form.date + 'T' + form.time + ':00');
    // Set the event duration to 1 hour
    var endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + 1);
    
    // Set the event with the correct timezone (Malaysia Time Zone)
    var event = calendar.createEvent(form.title, startDateTime, endDateTime, {
        description: form.description,
        guests: form.email.split(',').map(email => email.trim()).join(','),
        sendInvites: true
    }).setTimeZone('Asia/Kuala_Lumpur');

    return 'Event created: ' + event.getTitle();
}
