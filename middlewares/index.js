import express from 'express';
const app = express();
const PORT = 8080;

let count = 0;

function countRequest(res, req, next) {
    count++;
    console.log(count);
    next();
}

const loggerMiddleware = (req, res, next) => {
    console.log("HTTM method : ", req.method);
    console.log("Request URL : ", req.url);
    console.log("Request timestamp : ", new Date());
    next();
}

app.use(countRequest);
app.use(loggerMiddleware);

app.get('/add', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.send({
        ans: a+b
    })
})

app.listen(PORT, () => {
    console.log(`app is listening on PORT ${PORT}`);
})