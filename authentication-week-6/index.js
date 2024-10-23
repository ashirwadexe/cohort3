import express from "express";
const app = express();
const PORT = 8001;

//middlewares
// this middleware provides us the access of body
app.use(express.json());

const users = [];

//generateToken function
const generateToken = () => {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = null;

    for(let i=0; i<options.length; i++) {
        token = token + options[Math.floor(Math.random() * options.length)];
    }

    return token;
}

//REGISTRATION BUSINESS LOGIC
app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    //checking if user already exist or not
    const userExist = users.find(user => user.username === username);
    if(userExist) {
        return res.status(400).json({
            message: "user already exist",
            success: false
        });
    }

    //strong data into users array
    users.push({
        username,
        password
    });

    return res.status(200).json({
        message: "Signup successful !!!",
        success: true
    });
});


//LOGIN BUSINESS LOGIC
app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    //verify user
    const userFound = users.find(user => user.username === username && user.password === password);

    if(userFound) {
        const token = generateToken();
        userFound.token = token;
        // res.json({
        //     token
        // });
        console.log(users)
    } 
    else {
        return res.status(404).json({
            message: "user not found, enter valid credentials",
            success: false
        })
    }

    return res.status(200).json({
        message:"Signin successfull",
        success: true
    });
})

//endpoint -> "/me"
app.get('/me', (req, res) => {
    const token = req.headers.authorization;

    const user = users.find(user => user.token === token);
    if(!user) {
        return res.status(401).json({
            message: "User is not authorized",
            success: false
        });
    }

    return res.status(200).json({
        message:`Welcome ${user.username}`,
        success: true
    });
})

app.listen(PORT, () => {
    console.log(`app is listening on port: ${PORT}`);
})