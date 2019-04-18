import React, { Component } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import './components/css/App.css';

class App extends Component {
  state = {
    presupuesto : '',
    restante : '',
    gastos : {}
  }

  //agregar un nuevo gasto al state
  agregarGasto = gasto => {
    //tomar una copia del state actual
    const gastos = {...this.state.gastos};

    console.log(gastos);

    //agregar el gasto al objeto del state
    gastos[`gasto${Date.now()}`] = gasto;

    console.log(gastos);
    //ponerlo en state
    this.setState({
      gastos
    })

  }

  render() {
    return (
      <div className="App container">
      <Header 
        titulo="Gasto Semanal"
      />
      <div className="contenido-principal contenido">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              agregarGasto= {this.agregarGasto}
            />
          </div>
          <div className="one-half column">
            <Listado />
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default App;
