const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors())
port = 3080;

const groupsRouter = require("./routers/groupRouters")
const rolesRouter = require("./routers/roleRouters");
const userInfoRouter = require('./routers/usersInfoRoutes');


app.use('/api/groups', groupsRouter);
app.use('/api/roles', rolesRouter);
app.use('/api/usersInfoData', userInfoRouter);


app.get('/', (req, res) => {
    res.send('App Works !!!!');
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});