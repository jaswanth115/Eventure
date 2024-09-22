const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const EmployeeModel = require('./models/Employee');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://jaswanthreddy:jaswanthreddy123@cluster0.yyrsyde.mongodb.net/Eventure?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('DB connected..........'));

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.json({ message: "Email is required" });
    }
    if (!password) {
        return res.json({ message: "Password is required" });
    }

    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    // Include the user's name in the response
                    res.json({ message: "Success", name: user.name });
                } else {
                    res.json("Password is incorrect");
                }
            } else {
                res.json("No record existed");
            }
        })
        .catch(err => res.json("An error occurred"));
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!name) {
        return res.json("Name is required");
    }
    if (!email) {
        return res.json("Email is required");
    }
    if (!password) {
        return res.json("Password is required");
    }

    // Check if the email already exists
    EmployeeModel.findOne({ email: email })
        .then(existingUser => {
            if (existingUser) {
                return res.json("Email is already taken");
            } else {
                // Create new user
                EmployeeModel.create(req.body)
                    .then(newUser => res.json(newUser))
                    .catch(err => res.json("An error occurred"));
            }
        })
        .catch(err => res.json("An error occurred"));
});

app.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    // Logic to send email with a reset link (to be implemented)
    // Send the reset link to the specified Gmail account
    res.json({ message: 'Reset link sent' });
});

app.post('/reset-password', (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOneAndUpdate({ email }, { password }, { new: true })
        .then(user => {
            if (user) {
                res.json({ message: 'Password updated successfully' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch(err => res.status(500).json({ message: 'An error occurred', error: err }));
});

app.listen(3001, () => {
    console.log("Server is running.............");
});