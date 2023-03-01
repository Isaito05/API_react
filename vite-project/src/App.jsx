
import { Fragment, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

function App() {
  const Url = 'https://localhost:7052/api/T_USUARIO';
  const [Estado, setEstado] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalAgregar, setModalAgregar] = useState(false);

  const Mostrar = () => {
    axios.get(Url).then(Response => {
      console.log(Response.data);
    })
  }

  const editar = () => setModalEditar(!modalEditar);
  const agregar = () => setModalAgregar(!modalAgregar);

  

  const Cargardatos = async () => {
    await axios.get(Url).then(Response => {
      console.log(Response.data);
      setEstado(Response.data);
    })
  }

  useEffect(() => {
    Cargardatos();
  }, [])


  return (

    <Fragment>
      <button className="btn btn-success" onClick={agregar}>Agregar Usuario</button>
      <ModalHeader> Datos de usuario</ModalHeader>
      <table className="table table-bordered" >
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Tipo de documento</th>
            <th>Numero de documento</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {Estado.map(gestor => (
            <tr key={gestor.usU_ID}>
              <td>{gestor.usU_ID}</td>
              <td>{gestor.usU_NOMBRES}</td>
              <td>{gestor.usU_APELLIDOS}</td>
              <td>{gestor.usU_TIPO_DOCUMENTO}</td>
              <td>{gestor.usU_NUM_DOCUMENTO}</td>
              <td>{gestor.usU_TELEFONO}</td>
              <td>{gestor.usU_CORREO}</td>
              <td>
                <button className="btn btn-primary" onClick={editar}>Editar</button>{' '}
                <button className="btn btn-danger" onClick={() => seleccionarGestor(gestor, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Modal isOpen={modalAgregar}>
        <ModalHeader>Agregar Usuarios</ModalHeader>
        <ModalBody>
          <form action="">
            <p> Nombre</p>
            <input className='form-control' type="text" name="" id="" />
            <p> Apellido</p>
            <input  className='form-control' type="text" name="" id="" />
            <p> Tipo de documento</p>
            <select  className='form-control' name="" id="">
              <option value="">Seleccione</option>
              <option value="">CC</option>
              <option value="">CE</option>
              <option value="">TI</option>
            </select>
            <p> Numero de documento</p>
            <input  className='form-control' type="number" name="" id="" />
            <p> Telefono</p>
            <input  className='form-control' type="number" name="" id="" />
            <p> Correo</p>
            <input  className='form-control' type="email" name="" id="" /><br />
            <button className="btn btn-primary" onClick={agregar}>Agregar</button>{' '}
            <button className="btn btn-primary" onClick={agregar}>cancelar</button>
          </form>
        </ModalBody>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Usuarios</ModalHeader>
        <ModalBody>
          <form action="">
            <p> Nombre</p>
            <input type="text" name="" id="" />
            <p> Apellido</p>
            <input type="text" name="" id="" />
            <p> Tipo de documento</p>
            <input type="text" name="" id="" />
            <p> Numero de documento</p>
            <input type="text" name="" id="" />
            <p> Telefono</p>
            <input type="text" name="" id="" />
            <p> Correo</p>
            <input type="text" name="" id="" /><br />
            <button className="btn btn-primary" onClick={editar}>Editar</button>{' '}
            <button className="btn btn-primary" onClick={editar}>cancelar</button>
          </form>
        </ModalBody>
      </Modal>
    </Fragment>


  )


}

export default App
