const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST route for /bfhl endpoint
app.post('/bfhl', (req, res) => {
    try {
        // Extracting input array from request body
        const inputArray = req.body.array;

        // Checking if inputArray is provided
        if (!inputArray || !Array.isArray(inputArray)) {
            return res.status(400).json({
                user_id: "fullname_dob",
                is_success: false,
                message: "Input array is missing or invalid."
            });
        }

        // Extracting user_id from request body
        const userId = req.body.user_id || "fullname_dob";

        // Extracting email from request body
        const email = req.body.email || "";

        // Extracting college roll number from request body
        const collegeRollNumber = req.body.college_roll_number || "";

        // Logic to separate even, odd numbers and uppercase alphabets
        const evenNumbers = [];
        const oddNumbers = [];
        const upperCaseAlphabets = [];
        for (const element of inputArray) {
            if (typeof element === 'number') {
                if (element % 2 === 0) {
                    evenNumbers.push(element);
                } else {
                    oddNumbers.push(element);
                }
            } else if (typeof element === 'string' && /^[a-zA-Z]$/.test(element)) {
                upperCaseAlphabets.push(element.toUpperCase());
            }
        }

        // Sending response with required data
        res.json({
            user_id: userId,
            is_success: true,
            status: "Success",
            email_id: email,
            college_roll_number: collegeRollNumber,
            even_numbers_array: evenNumbers,
            odd_numbers_array: oddNumbers,
            upper_case_alphabets_array: upperCaseAlphabets
        });
    } catch (error) {
        // Handling exceptions
        console.error("Error:", error);
        res.status(500).json({
            user_id: "fullname_dob",
            is_success: false,
            message: "Internal server error."
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
