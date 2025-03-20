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

const form = document.getElementById('validationForm');
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevents the page refresh
});

// Data Validation
function validateSourceDate() {
    const sourceYear = document.getElementById('sourceYear').value
    const sourceMonth = document.getElementById('sourceMonth').value
    const sourceDay = document.getElementById('sourceDay').value

    // Check year is valid
    if (isNaN(sourceYear) || sourceYear.length !== 4) { // Update to allow for years before 1000
        alert('Please enter a valid year')
        // errorMessage.textContent = ''; // Set a custom error message without using alerts
        return false
    }

    // Check month is valid
    if (isNaN(sourceMonth) || sourceMonth.length < 1 || sourceMonth.length > 2  || sourceMonth < 1 || sourceMonth > 12) {
        alert('Please enter a valid month')
        // errorMessage.textContent = ''; // Set a custom error message without using alerts
        return false
    }

    // Check day is valid
    const DayMonths31 = [1, 3, 5, 7, 8, 10, 12]
    const DayMonths30 = [4, 6, 9, 11]
    const isLeapYear = (sourceYear % 4 === 0 && sourceYear % 100 !== 0) || sourceYear % 400 === 0

    // alert("sourceMonth: " + sourceMonth + "\n" + "isLeapYear: " + isLeapYear + "\n" + "sourceDay: " + sourceDay + "\n" + "DayMonths31: " + DayMonths31 + "\n" + "DayMonths30: " + DayMonths30)

    // if (sourceDay > 31) {
    //     alert('Please enter a valid day')
    // } else 
    if (sourceMonth == 2 && isLeapYear) {
        if (isNaN(sourceDay) || sourceDay.length < 1 || sourceDay.length > 2  || sourceDay < 1 || sourceDay > 29) {
            alert('Please enter a valid day')
            // errorMessage.textContent = ''; // Set a custom error message without using alerts
            return false
        }
    } else if (sourceMonth == 2) {
        if (isNaN(sourceDay) || sourceDay.length < 1 || sourceDay.length > 2  || sourceDay < 1 || sourceDay > 28) {
            alert('Please enter a valid day')
            // errorMessage.textContent = ''; // Set a custom error message without using alerts
            return false
        }
    } else if (DayMonths31.includes(parseInt(sourceMonth))) {
        if (isNaN(sourceDay) || sourceDay.length < 1 || sourceDay.length > 2  || sourceDay < 1 || sourceDay > 31) {
            alert('Please enter a valid day')
            // errorMessage.textContent = ''; // Set a custom error message without using alerts
            return false
        }
    } else if (DayMonths30.includes(parseInt(sourceMonth))) {
        if (isNaN(sourceDay) || sourceDay.length < 1 || sourceDay.length > 2  || sourceDay < 1 || sourceDay > 30) {
            alert('Please enter a valid day')
            // errorMessage.textContent = ''; // Set a custom error message without using alerts
            return false
        }
    }

    // Check for no empty fields
    if (sourceYear === '' || sourceMonth === '' || sourceDay === '') {
        alert('Please enter a valid date')
        return false
    }

    return true
}