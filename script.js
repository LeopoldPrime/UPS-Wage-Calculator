document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('#calculate').addEventListener('click', function() {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        let totalHours = 0;
        let totalMinutes = 0;
        const hourlyWage = parseFloat(document.getElementById('hourlyWage').value) || 0;
        let totalWage = 0;
        const use100MinuteFormat = document.getElementById('formatToggle').checked;
        const invalidDays = [];

        for (let i = 0; i < days.length; i++) {
            const hoursInput = document.getElementById(days[i]).value;
            const hours = hoursInput ? parseFloat(hoursInput) : 0;
            let dailyHours = Math.floor(hours);
            let dailyMinutes = 0;

            if (use100MinuteFormat) {
                dailyMinutes = (hours % 1) * 60; // If checkbox is checked, interpret input in 100-minute format
            } else {
                dailyMinutes = (hours % 1) * 100; // If checkbox is not checked, interpret input in 60-minute format
            }

            if (dailyMinutes >= 60) {
                invalidDays.push(days[i].charAt(0).toUpperCase() + days[i].slice(1));
                continue;
            }

            totalHours += dailyHours;
            totalMinutes += dailyMinutes;
        }

        if (invalidDays.length > 0) {
            const invalidDaysText = invalidDays.join(', ');
            const alertText = `Warning: Hours in 100-minute format detected on ${invalidDaysText}. Please toggle format to 100-minute format or use hours in 60-minute format.`;
            document.getElementById('customAlertText').innerText = alertText;
            document.getElementById('customAlert').style.display = 'block';
            return;
        }

        const overtimeHours = totalHours > 40 ? totalHours - 40 : 0;
        const regularHours = totalHours > 40 ? 40 : totalHours;

        totalWage += regularHours * hourlyWage;
        totalWage += overtimeHours * hourlyWage * 1.5;
        totalWage += (totalMinutes / 60) * hourlyWage; // Always calculate wage in 60-minute format

        totalHours += Math.floor(totalMinutes / 60); // Always calculate total hours in 60-minute format
        totalMinutes = totalMinutes % 60; // Always calculate total minutes in 60-minute format

        document.getElementById('totalHours').innerText = totalHours + '.' + Math.round(totalMinutes);
        document.getElementById('totalWage').innerText = totalWage.toFixed(2); // Format wage to two decimal places
    });
});