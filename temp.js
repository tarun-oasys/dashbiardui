const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Path to the CSV file in Downloads folder
const downloadsPath = path.join('/home/tarunv/Downloads', 'Logistics Improvement WBS - Assignees.csv');

// Function to read CSV and convert to array
function csvToArray(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
}

// Execute the function
csvToArray(downloadsPath)
    .then((data) => console.log(data))
    .catch((err) => console.error('Error reading CSV:', err));
