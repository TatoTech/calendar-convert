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

function convertToJalaali(year, month, day, weekDay) {
    // Convert the date to Jalaali
    const jalaaliDate = jalaali.toJalaali(year, month, day)

    // Set the values in the destination fields
    document.getElementById('destinationYear').value = jalaaliDate.jy
    document.getElementById('destinationMonth').value = jalaaliDate.jm
    document.getElementById('destinationDay').value = jalaaliDate.jd

    //---------------------------------------------------------------

    // // Calculate the Jalaali year
    // if (month < 3 || (month === 3 && day < 21)) {
    //     jalaaliYear = year - 622
    // }
    // else {
    //     jalaaliYear = year - 621
    // }

    // // Calculate the Jalaali month
    // monthLengths = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]

    // // Set the values in the destination fields
    // document.getElementById('destinationYear').value = jalaaliYear
    // document.getElementById('destinationMonth').value = jalaaliMonth
    // document.getElementById('destinationDay').value = jalaaliDay

    // Set the day of the week
    const weekDays = ['Yekshanbeh', 'Doshanbeh', 'Seshanbeh', 'Chaharshanbeh', 'Panjshanbeh', 'Jomeh', 'Shanbeh']
    document.getElementById('destinationDayOfTheWeek').value = weekDays[weekDay]
}

function convertToHijri(date, weekDay) {
    const hijriDate = moment(date).format('iYYYY/iM/iD')
    const dateString = hijriDate.split('/')
    document.getElementById('destinationYear').value = dateString[0]
    document.getElementById('destinationMonth').value = dateString[1]
    document.getElementById('destinationDay').value = dateString[2]

    const weekDays = ['Al-Ahad', 'Al-Ithnayn', 'Ath-Thulatha', 'Al-Arbaa', 'Al-Khamis', 'Al-Jumuah', 'As-Sabt']
    document.getElementById('destinationDayOfTheWeek').value = weekDays[weekDay]
}

function convertToHebrew(date, weekDay) {
    const hebrewDate = new Hebcal.HDate(date);
    console.log(hebrewDate)
    document.getElementById('destinationYear').value = hebrewDate.year
    document.getElementById('destinationMonth').value = hebrewDate.month
    document.getElementById('destinationDay').value = hebrewDate.day

    const weekDays = ['Yom Rishon', 'Yom Sheni', 'Yom Shlishi', 'Yom Revi`i', 'Yom Khamishi', 'Yom Shishi', 'Shabbat']
    document.getElementById('destinationDayOfTheWeek').value = weekDays[weekDay]
}

function convertToMetric(date, weekDay) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000)) + 1;
    const metricDate = `${date.getFullYear()}.${String(dayOfYear).padStart(3, '0')}`;

    document.getElementById('destinationYear').value = metricDate
    document.getElementById('destinationMonth').value = ''
    document.getElementById('destinationDay').value = ''

    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    document.getElementById('destinationDayOfTheWeek').value = weekDays[weekDay]

}

function startConversion() {    
    // Get source date
    const sourceYear = Number(document.getElementById('sourceYear').value)
    const sourceMonth = Number(document.getElementById('sourceMonth').value)
    const sourceDay = Number(document.getElementById('sourceDay').value)    
    const sourceDate = new Date(sourceYear,sourceMonth,sourceYear)

    // Determine day of week (Gregorian only?)
    const date = new Date(sourceYear, sourceMonth - 1, sourceDay)
    const weekDay = date.getDay()
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    document.getElementById('sourceDayOfTheWeek').value = weekDays[weekDay]

    const selectedCalendar = document.getElementById("destinationCalendar").value

    // Determine the caldendar to convert to
    switch (selectedCalendar) {
        case "Gregorian":
            convertToGregorian()
            break
        case "Jalaali":
            convertToJalaali(sourceYear, sourceMonth, sourceDay, weekDay)
            break
        case "Hijri":
            convertToHijri(sourceDate, weekDay)
            break
        case "Hebrew":
            convertToHebrew(date, weekDay)
            break
        case "Metric":
            convertToMetric(date, weekDay)
            break
      default:
        alert("Please select a valid option.");
    }
}