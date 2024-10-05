const express = require('express');
const classDAO = require('./classDAO');
require('dotenv').config();

const app = express();
app.use(express.json()); // For parsing application/json

// Route to get all classes
app.get('/api/classes', async (req, res) => {
    try {
        const classes = await classDAO.getAllClasses();
        res.json(classes);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to add a new class
app.post('/api/classes', async (req, res) => {
    const { className, teacherName } = req.body;
    if (!className || !teacherName) {
        return res.status(400).send('Class name and teacher name are required');
    }
    try {
        const success = await classDAO.addClass(className, teacherName);
        if (success) {
            res.status(201).send('Class added successfully');
        } else {
            res.status(500).send('Failed to add class');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to assign a teacher to a class
app.put('/api/classes/:id/teacher', async (req, res) => {
    const classId = req.params.id;
    const { teacherName } = req.body;

    if (!teacherName) {
        return res.status(400).send('Teacher name is required');
    }

    try {
        const success = await classDAO.assignTeacher(classId, teacherName);
        if (success) {
            res.status(200).send('Teacher assigned successfully');
        } else {
            res.status(500).send('Failed to assign teacher');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to delete a class
app.delete('/api/classes/:id', async (req, res) => {
    const classId = req.params.id;
    try {
        const success = await classDAO.deleteClass(classId);
        if (success) {
            res.status(200).send('Class deleted successfully');
        } else {
            res.status(500).send('Failed to delete class');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
