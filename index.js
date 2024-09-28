const express = require('express');
const ccuRouter = require('./scripts/ccuRoute');

const app = express();
const port = 3000;

app.use(express.json());
app.use(`/ccu`, ccuRouter);

app.get('/', (req, res) => 
{
    res.send(`<h2>welcome to server</h2>`)
});

app.listen(port, () =>
{
    console.log(`server execute ${port}`);
});
