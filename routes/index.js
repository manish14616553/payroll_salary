// routes/index.js
const express = require('express');
const { login, addEmployee, fetchEmployees, serveHome } = require('../controllers/employeeController');

const router = express.Router();

// Serve HTML form
router.get('/', serveHome);

// Login route
router.post('/login', login);

// Add Employee
router.post('/addEmployee', addEmployee);

// Fetch employees
router.get('/employees', fetchEmployees);

module.exports = router;
