// Load packages and access services
const express = require("express");
const app = express();

// encType - multipart/form-data
const multer = require("multer");
const upload = multer();

// Setup view engine to ejs
app.set('view engine', 'ejs');

// Serve static content directly
app.use(express.static("css"));

// Add middleware to parse default urlencoded form
app.use(express.urlencoded({
    extended: false
}));

// Enable CORS (see https://enable-cors.org/server_expressjs.html)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Route to welcome page
app.get('/', (request, response) => {
    response.render("home");
});

// Route to services page
app.get('/services', (request, response) => {
    //Data
    const name = "Upasana";
    const data = {
        years: 5,
        serviceList: [{
                name: "Consulting",
                desc: "State of the art consulting services!"
            },
            {
                name: "Education",
                desc: "Educate your work force!"
            },
            {
                name: "Security",
                desc: "Secure your network!"
            }
        ]
    };
    response.render("service", {
        name: name,
        othData: data
    });
});

// GET Route to form page
app.get('/usePost', (request, response) => {
    const message = "get";
    const data = {
        name: "",
        email: "",
        payment: ""
    };
    response.render("usePost", {
        message: message,
        data: data
    });
});

// POST Route to form page
app.post('/usePost', (request, response) => {
    const message = "post";
    // Send form data back to the form
    const data = {
        name: request.body.name,
        email: request.body.email,
        payment: request.body.payment
    }
    //Call formPost passing message and name
    response.render("usePost", {
        message: message,
        data: data
    });
});

// GET Route to form page
app.get('/useMultipart', (request, response) => {
    const message = "get";
    const data = {
        name: "",
        email: "",
        payment: ""
    };
    response.render("multipart", {
        message: message,
        data: data
    });
});

// POST Route to form page
app.post('/useMultipart', upload.array(), (request, response) => {
    const message = "post";
    // Send form data back to the form
    const data = {
        name: request.body.name,
        email: request.body.email,
        payment: request.body.payment
    }
    //Call formPost passing message and name
    response.render("multipart", {
        message: message,
        data: data
    });
});

// GET Route to form page
app.get('/useAjax', (request, response) => {
    response.render("useAjax")
});

// POST Route to form page
app.post('/useAjax', upload.array(), (request, response) => {
    // Send form data back to the form
    const data = {
        name: request.body.name,
        email: request.body.email,
        payment: request.body.payment
    };
    //Call formPost passing message and name
    response.json(data);
});


// Start listening to incoming requests
// If process.env.PORT is not defined, port number 3000 is used
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});