import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import TodolistPage from './TodolistPage';
import ListShow from './ListShow';
import ListForm from './ListForm';
import ListEdit from './ListEdit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={TodolistPage} />
          <Route exact path="/list/:listId" component={ListShow} />
          <Route exact path="/build" component={ListForm} />
          <Route exact path="/edit/:listId" component={ListEdit} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
