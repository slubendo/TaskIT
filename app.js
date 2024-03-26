const express = require("express");
const bodyParser = require("body-parser")
const database = require('./databaseConnection');
const dbModel = require('./databaseAccessLayer');

const app = express();

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"))

const PORT = 8002


app.get('/', async (req, res) => {
  console.log("page hit");
  try {
    const result = await dbModel.getTasksInProgress();
    res.render('index', { taskInProgress: result });
    // console.log(result);
  }
  catch (err) {
    res.render('error', { message: 'Error reading from MySQL' });
    console.log("Error reading from mysql");
  }
});

app.post("/newTask", async (req, res) => {
    // console.log(req.body)
    try {
      const success = await dbModel.addTask(req.body);
      if (success) {
        res.redirect("/");
      }
      else {
        res.send("Error writing to MySQL" );
        console.log("Error writing to MySQL");
      }
    }
    catch (err) {
      res.send("Error writing to MySQL" );
      console.log("Error writing to MySQL");
      console.log(err);
    }
  });
  
  app.get('/deleteTask', async (req, res) => {
    console.log("delete task");
    console.log(req.query);
    let taskId = req.query.id;
    if (taskId) {
      const success = await dbModel.deleteTask(taskId);
      if (success) {
        res.redirect("/");
      }
      else {
        res.render('error', { message: 'Error writing to MySQL' });
        console.log("Error writing to mysql");
      }
    }
  });

  app.get('/completeTask', async (req, res) => {
    console.log("completed task");
    console.log(req.query);
    let taskId = req.query.id;
    if (taskId) {
      const success = await dbModel.completeTask(taskId);
      if (success) {
        res.redirect(req.get('referer'))
            
      } else {
        res.render('error', { message: 'Error writing to MySQL' });
        console.log("Error writing to mysql");
      }
    }
  });

  app.get('/incompleteTask', async (req, res) => {
    console.log("completed task");
    console.log(req.query);
    let taskId = req.query.id;
    if (taskId) {
      const success = await dbModel.incompleteTask(taskId);
      if (success) {
        res.redirect(req.get('referer'))
            
      } else {
        res.render('error', { message: 'Error writing to MySQL' });
        console.log("Error writing to mysql");
      }
    }
  });

  app.get('/completed', async (req, res) => {
    console.log("page hit");
    try {
      const result = await dbModel.getTasksCompleted();
      res.render('completed', { taskCompleted: result });
      // console.log(result);
    }
    catch (err) {
      res.render('error', { message: 'Error reading from MySQL' });
      console.log("Error reading from mysql");
    }
  });

  app.get('/today', async (req, res) => {
    console.log("page hit");

    try {
      const result = await dbModel.getTasksToday();
      res.render('today', { taskToday: result });
      console.log(result);
    }
    catch (err) {
      res.render('error', { message: 'Error reading from MySQL' });
      console.log("Error reading from mysql");
    }
  });

  app.get('/upcoming', async (req, res) => {
    console.log("page hit");

    try {
      const result = await dbModel.getTasksUpcoming();
      res.render('upcoming', { taskUpcoming: result });
      console.log(result);
    }
    catch (err) {
      res.render('error', { message: 'Error reading from MySQL' });
      console.log("Error reading from mysql");
    }
  });  

  app.get('/taskType', async (req, res) => {
    console.log("page hit");
    // let taskType = req.params.taskType
    console.log(req.query)
    let taskType = req.query.id;

    try {
      const result = await dbModel.getTasksType(taskType);
      res.render('taskType', { tasksType: result });
      console.log(result);
    }
    catch (err) {
      res.render('error', { message: 'Error reading from MySQL' });
      console.log("Error reading from mysql");
    }
  });  


app.listen(PORT, () => console.log(`server should be running at http://localhost:${PORT}/`))