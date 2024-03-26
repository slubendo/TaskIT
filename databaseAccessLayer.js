const database = require('./databaseConnection');

async function getTasksInProgress() {
  let sqlQuery = `
  SELECT task_id, task, task.type_id, made_by, due, complete_id, priority_id, type
  FROM task
  INNER JOIN type
  ON task.type_id = type.type_id
  Where complete_id = 2 
  Order by due, priority_id DESC, task_id, task, type_id, made_by, complete_id
	`;

  try {
    const results = await database.query(sqlQuery);
    console.log(results[0]);
    return results[0];
  }
  catch (err) {
    console.log("Error selecting from todo table");
    console.log(err);
    return null;
  }
}

async function addTask(postData) {
  let sqlInsertSalt = `
     INSERT INTO task (task, type_id, made_by, due, complete_id, priority_id)
     VALUES (:task, :type_id, :made_by, :due, :complete_id, :priority_id);
     `;

  let params = {
    task: postData.task,
    type_id: postData.type,
    made_by: postData.madeBy,
    due: postData.due,
    complete_id: 2,
    priority_id: postData.priority
  };
  console.log(sqlInsertSalt);
  try {
    const results = await database.query(sqlInsertSalt, params);
    return results;
  }
  catch (err) {
    console.log(err);
    return false;
  }
}

async function deleteTask(taskId) {
  let sqlDeleteTask = `
     DELETE FROM task
     WHERE task_id = :taskId;
     `;
  let params = {
    taskId: taskId
  };
  console.log(sqlDeleteTask);
  try {
    await database.query(sqlDeleteTask, params);
    return true;
  }
  catch (err) {
    console.log(err);
    return false;
  }
}

async function completeTask(taskId) {
  let sqlQuery = `
  UPDATE task
  SET complete_id =  1
  WHERE task_id = :taskId;
     `;
  let params = {
    taskId: taskId
  };
  console.log(sqlQuery);
  try {
    await database.query(sqlQuery, params);
    return true;
  }
  catch (err) {
    console.log(err);
    return false;
  }
}

async function incompleteTask(taskId) {
  let sqlQuery = `
  UPDATE task
  SET complete_id =  2
  WHERE task_id = :taskId;
     `;
  let params = {
    taskId: taskId
  };
  console.log(sqlQuery);
  try {
    await database.query(sqlQuery, params);
    return true;
  }
  catch (err) {
    console.log(err);
    return false;
  }
}

async function getTasksCompleted() {
  let sqlQuery = `
SELECT task_id, task, task.type_id, made_by, due, complete_id, priority_id, type
FROM task
INNER JOIN type
ON task.type_id = type.type_id
Where complete_id = 1
Order by due, priority_id DESC, task_id, task, type_id, made_by, complete_id
`;

  try {
    const results = await database.query(sqlQuery);
    console.log(results[0]);
    return results[0];
  }
  catch (err) {
    console.log("Error selecting from todo table");
    console.log(err);
    return null;
  }
}

async function getTasksToday() {
  let sqlQuery = `
  SELECT task_id, task, task.type_id, made_by, due, complete_id, priority_id, type
  FROM task
  INNER JOIN type
  ON task.type_id = type.type_id
  Where complete_id = 2
  HAVING due = CURDATE()
  Order by priority_id DESC, due, task_id, task, type_id, made_by, complete_id

	`;

  console.log(sqlQuery);
  try {
    const results = await database.query(sqlQuery);
    console.log(results[0]);
    return results[0];
  }
  catch (err) {
    console.log(err);
    return false;
  }
}

async function getTasksUpcoming() {
  let sqlQuery = `
  SELECT task_id, task, task.type_id, made_by, due, complete_id, priority_id, type
  FROM task
  INNER JOIN type
  ON task.type_id = type.type_id
  Where complete_id = 2
  HAVING due < CURDATE() + 7
  Order by due, priority_id DESC, task_id, task, type_id, made_by, complete_id

	`;

  console.log(sqlQuery);
  try {
    const results = await database.query(sqlQuery);
    console.log(results[0]);
    return results[0];
  }
  catch (err) {
    console.log(err);
    return false;
  }
}

async function getTasksType(taskType) {
  let sqlQuery = `
  SELECT task_id, task, task.type_id, made_by, due, complete_id, priority_id, type
  FROM task
  INNER JOIN type
  ON task.type_id = type.type_id
  Where complete_id = 2 AND task.type_id = :taskType
  Order by due, priority_id DESC, task_id, task, type_id, made_by, complete_id
	`;

  let params = {
    taskType: taskType
  };
  console.log(sqlQuery);
  try {
    const results = await database.query(sqlQuery, params);
    return results[0];
  }
  catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = { getTasksInProgress, addTask, deleteTask, completeTask, getTasksCompleted, getTasksToday, getTasksUpcoming, getTasksType, incompleteTask}