function convertDate() {
    const gregorianDate = document.getElementById('gregorianDate').value;
    // console.log("Var: gregorianDate: " + gregorianDate)
    const date = new Date(gregorianDate);
    // console.log(date)

    // Convert to Jalaali
    const jalaaliDate = jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
    // console.log(date.getFullYear(), date.getMonth() + 1, date.getDate())
    document.getElementById('jalaaliDate').innerText = `Jalaali Date: ${jalaaliDate.jy}/${jalaaliDate.jm}/${jalaaliDate.jd}`;

    // Convert to Hijri
    const hijriDate = moment(date).format('iYYYY/iM/iD');
    document.getElementById('hijriDate').innerText = `Hijri Date: ${hijriDate}`;

    // Convert to Hebrew
    const hebrewDate = new Hebcal.HDate(date);
    document.getElementById('hebrewDate').innerText = `Hebrew Date: ${hebrewDate.getFullYear()}/${hebrewDate.getMonth() + 1}/${hebrewDate.getDate()}`;

    // Convert to Metric
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000)) + 1;
    const metricDate = `${date.getFullYear()}.${String(dayOfYear).padStart(3, '0')}`;
    document.getElementById('metricDate').innerText = `Metric Date: ${metricDate}`;
}

// TODO:
// Use drop down box to select destinaiton (and source) dates
// Add input validation to date fields
// Calulate day of the week using date fields. Done
// Make it so it calculates once all 3 valid have been entered
// All conversions currently expect input to be gregorian. Fix.

function convertToJalaali(year, month, day) {
    const jalaaliDate = jalaali.toJalaali(year, month, day)
    document.getElementById('destinationYear').value = jalaaliDate.jy
    document.getElementById('destinationMonth').value = jalaaliDate.jm
    document.getElementById('destinationDay').value = jalaaliDate.jd
}

function convertToHijri(date) {
    const hijriDate = moment(date).format('iYYYY/iM/iD')
    const dateString = hijriDate.split('/')
    document.getElementById('destinationYear').value = dateString[0]
    document.getElementById('destinationMonth').value = dateString[1]
    document.getElementById('destinationDay').value = dateString[2]

    // const test = moment(date).format('iYYYY')
    // console.log(test)
}

function startConversion() {    
    // Get source date
    const sourceYear = Number(document.getElementById('sourceYear').value)
    const sourceMonth = Number(document.getElementById('sourceMonth').value)
    const sourceDay = Number(document.getElementById('sourceDay').value)    
    const sourceDate = new Date(sourceYear,sourceMonth,sourceYear)
    // const sourceDate = `${sourceYear}-${sourceMonth}-${sourceDay}

    // Determine day of week (Gregorian only?)
    const date = new Date(sourceYear, sourceMonth - 1, sourceDay)
    let dayOfWeek = date.getDay()
    let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    document.getElementById('sourceDayOfTheWeek').value = daysOfWeek[dayOfWeek]

    const selectedCalendar = document.getElementById("destinationCalendar").value

    // Run the corresponding function
    switch (selectedCalendar) {
        case "Gregorian":
            convertToGregorian()
            break
        case "Jalaali":
            convertToJalaali(sourceYear, sourceMonth, sourceDay)
            break
        case "Hijri":
            convertToHijri(sourceDate)
            break
        case "Hebrew":
            convertToHebrew()
            break
        case "Metric":
            convertToMetric()
            break
      default:
        alert("Please select a valid option.");
    }
}