const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory array (acts as temporary database)
let reports = [
    { id: '#WG-8092', location: 'Central Park East', wasteType: 'Overflowing Bin', priority: 'Low', status: 'Resolved' },
    { id: '#WG-8093', location: '12th St Industrial Area', wasteType: 'Illegal Dumping', priority: 'High', status: 'In Progress' }
];

// 1. GET all reports
app.get('/api/reports', (req, res) => {
    res.json({ success: true, data: reports });
});

// 2. POST a new report
app.post('/api/reports', (req, res) => {
    const { location, wasteType, priority, description } = req.body;
    const newReport = {
        id: `#WG-${Math.floor(1000 + Math.random() * 9000)}`,
        location,
        wasteType,
        priority: priority || 'Medium',
        description: description || '',
        status: 'Pending'
    };
    reports.unshift(newReport);
    res.status(201).json({ success: true, data: newReport });
});

app.listen(5000, () => console.log('Backend running at http://localhost:5000'));
