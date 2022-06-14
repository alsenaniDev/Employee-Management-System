const express = require('express');
const app = express();
app.use(express.json());
port = 3080;

const groupsRouter = require("./routers/groupRouters")
const rolesRouter = require("./routers/roleRouters")


app.use('/api/groups', groupsRouter);
app.use('/api/roles', rolesRouter);


app.get('/', (req, res) => {
    res.send('App Works !!!!');
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});