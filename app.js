var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var createJiraTask = require('./routes/create_jira_task');
var getAllJiraTicket = require('./routes/get_all_jira_ticket');
var getJiraTicket = require('./routes/get_jira_ticket');
var updateJiraTicket = require('./routes/update_jira_task');
var deleteJiraTicket = require('./routes/delete_jira_task');
var getJiraTransition = require('./routes/get_jira_transition');
var updateJiraTicketTransition = require('./routes/update_jira_task_transition');

var createAsanaTask = require('./routes/create_asana_task');
var getAllAsanaTask = require('./routes/get_all_asana_task');
var getAsanaTask = require('./routes/get_assan_ticket');
var updateAsanaTask = require('./routes/update_asana_task');
var deleteAsanaTask = require('./routes/delete_asana_task');

var getTaskList = require('./routes/get_task_list');
var getTask = require('./routes/get_task');
var createTask = require('./routes/create_task');
var updateTask = require('./routes/update_task');
var deleteTask = require('./routes/delete_task');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({origin: "*"}));

app.use('/api/create_jira_ticket', createJiraTask);
app.use('/api/get_all_jira_ticket', getAllJiraTicket);
app.use('/api/get_jira_ticket', getJiraTicket);
//app.use('/api/update_jira_ticket', updateJiraTicket);
app.use('/api/delete_jira_ticket', deleteJiraTicket);
// app.use('/api/get_jira_transition', getJiraTransition);
app.use('/api/update_jira_ticket', updateJiraTicketTransition);

//asana api
app.use('/api/create_asana_tasks', createAsanaTask);
app.use('/api/get_all_asana_task', getAllAsanaTask);
app.use('/api/get_asana_task', getAsanaTask);
app.use('/api/update_asana_task', updateAsanaTask);
app.use('/api/delete_asana_task', deleteAsanaTask);

//in database
app.use('/api/get_all_cubyts_task', getTaskList);
app.use('/api/get_cubyts_task', getTask);
app.use('/api/create_cubyts_task', createTask);
app.use('/api/update_cubyts_task', updateTask);
app.use('/api/delete_cubyts_task', deleteTask);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
