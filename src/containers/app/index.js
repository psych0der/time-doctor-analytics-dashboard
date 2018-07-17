import React from 'react'
import {Route} from 'react-router-dom'
import Home from '../Home'
// import About from '../about'

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

 export class App extends React.Component {
  render() {
    return (
      <div>
        {/* display Home at default path as of now */}
        <main>
          <Route exact path="/" component={Home}/>
        </main>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App);