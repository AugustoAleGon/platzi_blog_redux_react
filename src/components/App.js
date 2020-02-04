import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './Menu';
import User from './Users';
import Posts from './Posts';
import Task from './Tasks';
import SaveTasks from './Tasks/Save'

const App = () => (
  <BrowserRouter>
    <Menu />
    <div className="container">
      <Route exact path='/' component={User} />
      <Route exact path='/tasks' component={ Task } />
      <Route exact path='/posts/:key' component={ Posts } />
      <Route exact path='/tasks/save' component={ SaveTasks } />
      <Route exact path='/tasks/save/:userId/:taskId' component={ SaveTasks } />
    </div>
  </BrowserRouter>
);

export default App;
