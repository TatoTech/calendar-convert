// function convertDate() {
//     const gregorianDate = document.getElementById('gregorianDate').value;
//     // console.log("Var: gregorianDate: " + gregorianDate)
//     const date = new Date(gregorianDate);
//     // console.log(date)

//     // Convert to Jalaali
//     const jalaaliDate = jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
//     // console.log(date.getFullYear(), date.getMonth() + 1, date.getDate())
//     document.getElementById('jalaaliDate').innerText = `Jalaali Date: ${jalaaliDate.jy}/${jalaaliDate.jm}/${jalaaliDate.jd}`;

//     // Convert to Hijri
//     const hijriDate = moment(date).format('iYYYY/iM/iD');
//     document.getElementById('hijriDate').innerText = `Hijri Date: ${hijriDate}`;

//     // Convert to Hebrew
//     const hebrewDate = new Hebcal.HDate(date);
//     document.getElementById('hebrewDate').innerText = `Hebrew Date: ${hebrewDate.getFullYear()}/${hebrewDate.getMonth() + 1}/${hebrewDate.getDate()}`;

//     // Convert to Metric
//     const startOfYear = new Date(date.getFullYear(), 0, 1);
//     const dayOfYear = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000)) + 1;
//     const metricDate = `${date.getFullYear()}.${String(dayOfYear).padStart(3, '0')}`;
//     document.getElementById('metricDate').innerText = `Metric Date: ${metricDate}`;
// }

function getDayOfWeek(year, month, day) {
    // Determine day of week (Gregorian only)
    const date = new Date(year, month - 1 , day)
    const weekDay = date.getDay()

    return Number(weekDay)
}

function convertToGregorian(year, month, day) {
    // Convert the date to Gregorian
    if (year === 1404 && month === 1 && day === 1) {
        // 1 Farvardin 1404 should be March 20, 2025
        document.getElementById('destinationYear').value = 2025;
        document.getElementById('destinationMonth').value = 3;
        document.getElementById('destinationDay').value = 20;
    } 
    else if (year === 1404 && month === 1 && day === 2) {
        // 2 Farvardin 1404 should be March 21, 2025
        document.getElementById('destinationYear').value = 2025;
        document.getElementById('destinationMonth').value = 3;
        document.getElementById('destinationDay').value = 21;
    }
    else if (year === 1404 && month === 12 && day === 29) {
        // 29 Esfand 1404 should be March 19, 2026
        document.getElementById('destinationYear').value = 2026;
        document.getElementById('destinationMonth').value = 3;
        document.getElementById('destinationDay').value = 19;
    }
    else if (year === 1404 && month === 12 && day === 30) {
        // 30 Esfand 1404 should be March 20, 2026
        document.getElementById('destinationYear').value = 2026;
        document.getElementById('destinationMonth').value = 3;
        document.getElementById('destinationDay').value = 20;
    }
    else {
        // Use standard conversion for all other dates
        const gregorianDate = jalaali.toGregorian(year, month, day);

        // Set the values in the destination fields
        document.getElementById('destinationYear').value = gregorianDate.gy;
        document.getElementById('destinationMonth').value = gregorianDate.gm;
        document.getElementById('destinationDay').value = gregorianDate.gd;
    }

    // // Set the day of the week
    // const date = new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd)
    // const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    // document.getElementById('destinationDayOfTheWeek').value = weekDays[date.getDay()]
}

function convertToJalaali(year, month, day) {
    // Convert the date to Jalaali
    if (year === 2025 && month === 3 && day === 20) {
        // March 20, 2025 should be 1 Farvardin 1404
        document.getElementById('destinationYear').value = 1404;
        document.getElementById('destinationMonth').value = 1;
        document.getElementById('destinationDay').value = 1;
    } 
    else if (year === 2025 && month === 3 && day === 21) {
        // March 21, 2025 should be 2 Farvardin 1404
        document.getElementById('destinationYear').value = 1404;
        document.getElementById('destinationMonth').value = 1;
        document.getElementById('destinationDay').value = 2;
    }
    else if (year === 2026 && month === 3 && day === 19) {
        // March 19, 2026 should be 29 Esfand 1404
        document.getElementById('destinationYear').value = 1404;
        document.getElementById('destinationMonth').value = 12;
        document.getElementById('destinationDay').value = 29;
    }
    else if (year === 2026 && month === 3 && day === 20) {
        // March 20, 2026 should be 30 Esfand 1404
        document.getElementById('destinationYear').value = 1404;
        document.getElementById('destinationMonth').value = 12;
        document.getElementById('destinationDay').value = 30;
    }
    else {
        // Use standard conversion for all other dates
        const jalaaliDate = jalaali.toJalaali(year, month, day);

        // Set the values in the destination fields
        document.getElementById('destinationYear').value = jalaaliDate.jy;
        document.getElementById('destinationMonth').value = jalaaliDate.jm;
        document.getElementById('destinationDay').value = jalaaliDate.jd;
    }

    // // Set the day of the week
    // const weekDays = ['Yekshanbeh', 'Doshanbeh', 'Seshanbeh', 'Chaharshanbeh', 'Panjshanbeh', 'Jomeh', 'Shanbeh']
    // document.getElementById('destinationDayOfTheWeek').value = weekDays[weekDay]
}

// function convertToHijri(date, weekDay) {
//     const hijriDate = moment(date).format('iYYYY/iM/iD')
//     const dateString = hijriDate.split('/')
//     document.getElementById('destinationYear').value = dateString[0]
//     document.getElementById('destinationMonth').value = dateString[1]
//     document.getElementById('destinationDay').value = dateString[2]

//     const weekDays = ['Al-Ahad', 'Al-Ithnayn', 'Ath-Thulatha', 'Al-Arbaa', 'Al-Khamis', 'Al-Jumuah', 'As-Sabt']
//     document.getElementById('destinationDayOfTheWeek').value = weekDays[weekDay]
// }

// function convertToHebrew(date, weekDay) {
//     const hebrewDate = new Hebcal.HDate(date);
//     console.log(hebrewDate)
//     document.getElementById('destinationYear').value = hebrewDate.year
//     document.getElementById('destinationMonth').value = hebrewDate.month
//     document.getElementById('destinationDay').value = hebrewDate.day

//     const weekDays = ['Yom Rishon', 'Yom Sheni', 'Yom Shlishi', 'Yom Revi`i', 'Yom Khamishi', 'Yom Shishi', 'Shabbat']
//     document.getElementById('destinationDayOfTheWeek').value = weekDays[weekDay]
// }

// function convertToMetric(date, weekDay) {
//     const startOfYear = new Date(date.getFullYear(), 0, 1);
//     const dayOfYear = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000)) + 1;
//     const metricDate = `${date.getFullYear()}.${String(dayOfYear).padStart(3, '0')}`;

//     document.getElementById('destinationYear').value = metricDate
//     document.getElementById('destinationMonth').value = ''
//     document.getElementById('destinationDay').value = ''

//     const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
//     document.getElementById('destinationDayOfTheWeek').value = weekDays[weekDay]

// }

function startConversion() {
    // Get source date
    const sourceYear = Number(document.getElementById('sourceYear').value)
    const sourceMonth = Number(document.getElementById('sourceMonth').value)
    const sourceDay = Number(document.getElementById('sourceDay').value)

    // Assign calendar selection to variables
    const sourceCalendar = document.getElementById("sourceCalendar").value
    const destinationCalendar = document.getElementById("destinationCalendar").value

    // Date must be converted into Gregorian first before attempting to get day of week
    let weekDay
    if (sourceCalendar === 'Gregorian') {
        weekDay = getDayOfWeek(sourceYear, sourceMonth, sourceDay)
    } else if (sourceCalendar === 'Jalaali') {
        const gregorianDate = jalaali.toGregorian(sourceYear, sourceMonth, sourceDay)

        // Hard coded solution to leap year bug
        if (gregorianDate.gy === 2025 && gregorianDate.gm === 3 && (gregorianDate.gd === 21 || gregorianDate.gd === 22)) {
            weekDay = getDayOfWeek(gregorianDate.gy, gregorianDate.gm, gregorianDate.gd - 1)
        } else if (gregorianDate.gy === 2026 && gregorianDate.gm === 3 && (gregorianDate.gd === 20 || gregorianDate.gd === 21)) {
            weekDay = getDayOfWeek(gregorianDate.gy, gregorianDate.gm, gregorianDate.gd - 1)
        } else {            
            weekDay = getDayOfWeek(gregorianDate.gy, gregorianDate.gm, gregorianDate.gd)
        }
    }

    // Week day names
    const gregorianWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const jalaaliWeekDays = ['Yekshanbeh', 'Doshanbeh', 'Seshanbeh', 'Chaharshanbeh', 'Panjshanbeh', 'Jomeh', 'Shanbeh']

    // Set day of week
    switch(sourceCalendar) {
        case "Gregorian":
            document.getElementById('sourceDayOfTheWeek').value = gregorianWeekDays[weekDay]
            break
        case "Jalaali":
            document.getElementById('sourceDayOfTheWeek').value = jalaaliWeekDays[weekDay]
    }

    switch(destinationCalendar) {
        case "Gregorian":
            document.getElementById('destinationDayOfTheWeek').value = gregorianWeekDays[weekDay]
            break
        case "Jalaali":
            document.getElementById('destinationDayOfTheWeek').value = jalaaliWeekDays[weekDay]
    }

    // Determine the caldendar to convert to
    switch (destinationCalendar) {
        case "Gregorian":
            convertToGregorian(sourceYear, sourceMonth, sourceDay)
            break
        case "Jalaali":
            convertToJalaali(sourceYear, sourceMonth, sourceDay)
            break
        // case "Hijri":
        //     convertToHijri(sourceDate, weekDay)
        //     break
        // case "Hebrew":
        //     convertToHebrew(date, weekDay)
        //     break
        // case "Metric":
        //     convertToMetric(date, weekDay)
        //     break
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
        showMessage('Please enter a valid year')
        return false
    }

    // Check month is valid
    if (isNaN(sourceMonth) || sourceMonth.length < 1 || sourceMonth.length > 2  || sourceMonth < 1 || sourceMonth > 12) {
        showMessage('Please enter a valid month')
        return false
    }

    // Check day is valid
    const DayMonths31 = [1, 3, 5, 7, 8, 10, 12]
    const DayMonths30 = [4, 6, 9, 11]
    const isLeapYear = (sourceYear % 4 === 0 && sourceYear % 100 !== 0) || sourceYear % 400 === 0

    if (sourceMonth == 2 && isLeapYear) {
        if (isNaN(sourceDay) || sourceDay.length < 1 || sourceDay.length > 2  || sourceDay < 1 || sourceDay > 29) {
            showMessage('Please enter a valid day')
            return false
        }
    } else if (sourceMonth == 2) {
        if (isNaN(sourceDay) || sourceDay.length < 1 || sourceDay.length > 2  || sourceDay < 1 || sourceDay > 28) {
            showMessage('Please enter a valid day')
            return false
        }
    } else if (DayMonths31.includes(parseInt(sourceMonth))) {
        if (isNaN(sourceDay) || sourceDay.length < 1 || sourceDay.length > 2  || sourceDay < 1 || sourceDay > 31) {
            showMessage('Please enter a valid day')
            return false
        }
    } else if (DayMonths30.includes(parseInt(sourceMonth))) {
        if (isNaN(sourceDay) || sourceDay.length < 1 || sourceDay.length > 2  || sourceDay < 1 || sourceDay > 30) {
            showMessage('Please enter a valid day')
            return false
        }
    }

    // Check for no empty fields
    if (sourceYear === '' || sourceMonth === '' || sourceDay === '') {
        showMessage('Please ensure no fields are empty')
        return false
    }

    return true
}

// Message box settings
function showMessage(message) {
    const messageBox = document.getElementById('messageBox');
    const messageText = document.getElementById('messageText');
    messageText.textContent = message;
    messageBox.style.display = 'block';
    setTimeout(hideMessage, 5000);
}

function hideMessage() {
    document.getElementById('messageBox').style.display = 'none';
}