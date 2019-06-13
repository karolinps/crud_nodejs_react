const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const jwt= require("jsonwebtoken");
var router=express.Router();

process.env.SECRET_KEY="thisismysecretkey";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const {allTodos, addTask , searchTask, allTodoId, updateTask, deleteTask} = require('./controllers/tasksController');
const {register} = require ('./controllers/registerController')
const { authenticate } = require ('./controllers/authenticateController')
const { allRoles, allRoleId, addRole, updateRole, deleteRole } = require ('./controllers/rolController')
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
app.get('/todos', allTodos);
app.post('/todo/save', addTask);
app.get('/todos/search/:keyword', searchTask);
app.get('/todo/:id', allTodoId);
app.put('/todo/update/:id', updateTask);
app.delete('/todo/delete/:id', deleteTask);

app.post('/register', register)
app.post('/login', authenticate)

/*--Routes roles--*/
app.get('/roles', allRoles)
app.get('/roles/:id', allRoleId)
app.post('/role/save', addRole)
app.put('/role/update/:id', updateRole)
app.delete('/role/delete/:id', deleteRole)

// all other requests redirect to 404
/*app.all("*", function (req, res) {
    return res.status(404).send('page not found')
});*/

// See the react auth blog in which cors is required for access
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});

app.use('/secure-api',router);
// validation middleware
router.use(function(req,res,next){
    var token=req.body.token || req.headers['token'];
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,function(err,ress){
            if(err){
                res.status(500).send('Token Invalid');
            }else{
                next();
            }
        })
    }else{
        res.send('Please send a token')
    }
})
router.get('/home',function(req,res){
    res.send('Token Verified')
})
// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(8080, function () {
    console.log('app node corre en en puerto 8080');
});
 
// allows "grunt dev" to create a development server with livereload
//module.exports = app;