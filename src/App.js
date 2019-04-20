import React, { Component } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import {validarPresupuesto} from './helper';
import ControlPresupuesto from './components/ControlPresupuesto';
import './components/css/App.css';

class App extends Component {
 
  constructor(props) {
    super(props)
    this.state = {
      presupuesto : '',
      restante : '',
      gastos : {}
    }
  }

  componentDidMount() {
    this.obtenerPresupuesto();
  }

  obtenerPresupuesto() {
    let presupuesto = prompt('Cual es el presupuesto?');
   
    let resultado = validarPresupuesto(presupuesto);
    if(resultado) {
      this.setState({
        presupuesto: presupuesto,
        restante: presupuesto
      })
    }else {
      this.obtenerPresupuesto();
    }
  }

  //agregar un nuevo gasto al state
  agregarGasto = gasto => {
    //tomar una copia del state actual
    const gastos = {...this.state.gastos};

    //Restar presupuesto
    this.restarPresupuesto(gasto.cantidadGasto);

    //agregar el gasto al objeto del state
    gastos[`gasto${Date.now()}`] = gasto;

    
    //ponerlo en state
    this.setState({
      gastos
    })

  }

  //Restar el presupuesto cuando un gasto se crea
  restarPresupuesto = cantidad => {
    //Leer el gasto
    let restar = Number(cantidad);

    //tomar una copia del state actual
      let restante = this.state.restante;

    //lo restamos
      restante -= restar;

      restante = String(restante);

    //agregamos el nuevo state
    this.setState({
      restante
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
            <Listado 
              gastos={this.state.gastos}
            />
          <ControlPresupuesto
            presupuesto={this.state.presupuesto}
            restante={this.state.restante}
          />
            
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default App;
