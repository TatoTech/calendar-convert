function convertDate() {
    const gregorianDate = document.getElementById('gregorianDate').value;
    const date = new Date(gregorianDate);

    // Convert to Jalaali
    const jalaaliDate = jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
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