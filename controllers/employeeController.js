// controllers/employeeController.js
const { Pool } = require('pg');
const crypto = require('crypto');
const path = require('path');
const { encryptValue, decryptValue } = require('../utils/encryption');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'contractor',
    password: process.env.DB_PASSWORD,
    port: '5432',
});

const users = {
    admin: { username: 'admin', password: 'admin123', role: 'admin' },
    employee: { username: 'employee', password: 'emp123', role: 'employee' }
};

const serveHome = (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'home.html'));
};

const login = (req, res) => {
    const { username, password } = req.body;
    const user = users[username];

    if (user && user.password === password) {
        if (user.role === 'admin') {
            res.sendFile(path.join(__dirname, '../public', 'admin.html'));
        } else if (user.role === 'employee') {
            res.sendFile(path.join(__dirname, '../public', 'employee.html'));
        }
    } else {
        res.status(401).send('Invalid username or password');
    }
};

const addEmployee = async (req, res) => {
    const {
        employeeId, employeeName, employeeSalary, employeeDepartment,
        employeeAadhar, employeePancard, employeeEmail,
        employeeHra, employeeTa, employeeDa, employeeOther,
        employeePfcompany, employeePf, employeeGrosssalary, employeeNetpay,
        employeeGender
    } = req.body;

    try {
        const key = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);

        const encryptedSalary = encryptValue(employeeSalary, key, iv);
        const encryptedHra = encryptValue(employeeHra, key, iv);
        const encryptedTa = encryptValue(employeeTa, key, iv);
        const encryptedDa = encryptValue(employeeDa, key, iv);
        const encryptedOther = encryptValue(employeeOther, key, iv);
        const encryptedPfcompany = encryptValue(employeePfcompany, key, iv);
        const encryptedPf = encryptValue(employeePf, key, iv);
        const encryptedGrosssalary = encryptValue(employeeGrosssalary, key, iv);
        const encryptedNetpay = encryptValue(employeeNetpay, key, iv);

        const client = await pool.connect();
        const queryText = `
            INSERT INTO employees (id, name, salary, department, aadhar_card, pan_card, email,
              hra, ta, da, other_allowances, pf_company, pf_employee,
              gross_salary, net_pay, gender, key, iv)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        `;
        console.log('Employee Gender:', employeeGender);

        const values = [
            employeeId, employeeName, encryptedSalary, employeeDepartment,
            employeeAadhar, employeePancard, employeeEmail,
            encryptedHra, encryptedTa, encryptedDa,
            encryptedOther, encryptedPfcompany, encryptedPf,
            encryptedGrosssalary, encryptedNetpay,
            employeeGender, key.toString('hex'), iv.toString('hex')
        ];

        await client.query(queryText, values);
        client.release();

        res.status(201).send('Employee added successfully!');
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).send('Internal Server Error');
    }
};

const fetchEmployees = async (req, res) => {
    try {
        const client = await pool.connect();

        const result = await client.query('SELECT id, name, salary, department, aadhar_card, pan_card, email, hra, ta, da, other_allowances, pf_company, pf_employee, gross_salary, net_pay, gender, key, iv FROM employees');

        client.release();

        const employees = result.rows;

        for (let employee of employees) {
            if (employee.key && employee.iv) {
                employee.salary = decryptValue(employee.salary, employee.key, employee.iv);
                employee.hra = decryptValue(employee.hra, employee.key, employee.iv);
                employee.ta = decryptValue(employee.ta, employee.key, employee.iv);
                employee.da = decryptValue(employee.da, employee.key, employee.iv);
                employee.other_allowances = decryptValue(employee.other_allowances, employee.key, employee.iv);
                employee.pf_company = decryptValue(employee.pf_company, employee.key, employee.iv);
                employee.pf_employee = decryptValue(employee.pf_employee, employee.key, employee.iv);
                employee.gross_salary = decryptValue(employee.gross_salary, employee.key, employee.iv);
                employee.net_pay = decryptValue(employee.net_pay, employee.key, employee.iv);
            } else {
                employee.salary = 'N/A';
                employee.hra = 'N/A';
                employee.ta = 'N/A';
                employee.da = 'N/A';
                employee.other_allowances = 'N/A';
                employee.pf_company = 'N/A';
                employee.pf_employee = 'N/A';
                employee.gross_salary = 'N/A';
                employee.net_pay = 'N/A';
            }
        }

        res.render('employees-list', { employees });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    serveHome,
    login,
    addEmployee,
    fetchEmployees
};
