const fs = require("fs");
const path = require("path");

// Define the path to the data file
const dataFilePath = path.join(__dirname, "data.json");

// Sample data to write
const sampleData = {
  name: "John Doe",
  age: 30,
  city: "New York",
};

// Function to write data to the file
function writeDataToFile(data, filePath) {
  fs.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Data successfully written to file");
    }
  });
}

// Function to read data from the file
function readDataFromFile(filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Error reading from file:", err);
    } else {
      console.log("Data read from file:", JSON.parse(data));
    }
  });
}

// Write the sample data to the file
writeDataToFile(sampleData, dataFilePath);

// Read the data from the file
readDataFromFile(dataFilePath);
