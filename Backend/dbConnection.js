const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sa:Aa112233@employeemanagementsyste.eocfy.mongodb.net/EmployeeManagementSystem", (err, db) => {
    console.log("Database connected");
});