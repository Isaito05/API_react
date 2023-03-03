
import { Fragment, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

function App() {
  const Url = 'https://localhost:7052/api/T_USUARIO';
  const [data, setData] = useState([]);
  const [Estado, setEstado] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalAgregar, setModalAgregar] = useState(false);
  // const [id, setid] = useState('');
  // const [nombre, setnombre] = useState('');
  // const [apellido, setapellido] = useState('');
  // const [tp_doc, settp_doc] = useState('');
  // const [num_doc, setnum_doc] = useState('');
  // const [telefono, settelefono] = useState('');
  // const [correo, setcorreo] = useState('');
  const [gestorSeleccionado, setGestorseleccionado] = useState({
    usU_ID: '',
    usU_NOMBRES: '',
    usU_APELLIDOS: '',
    usU_TIPO_DOCUMENTO: '',
    usU_NUM_DOCUMENTO: '',
    usU_TELEFONO: '',
    usU_CORREO: ''
  })

  const Mostrar = () => {
    axios.get(Url).then(Response => {
      console.log(Response.data);
    })
  }

  const editar = () =>
    setModalEditar(!modalEditar);
  // setid(id)
  // setnombre(nombre)
  // setapellido(apellido)
  // settp_doc(tp_doc)
  // setnum_doc(num_doc)
  // settelefono(telefono)
  // setcorreo(correo)

  const agregar = () => setModalAgregar(!modalAgregar);
  const eliminar = () => setModalEliminar(!modalEliminar);
  


  const handlechange = e => {
    const { name, value } = e.target;
    setGestorseleccionado({
      ...gestorSeleccionado,
      [name]: value
    });
    console.log(gestorSeleccionado);
  }

  const peticionPost = async () => {
    delete gestorSeleccionado.usU_ID;
    gestorSeleccionado.lanzamiento = parseInt(gestorSeleccionado.lanzamiento);
    await axios.post(Url, gestorSeleccionado)
      .then(response => {
        setData(data.concat(response.data));
        agregar();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionPut=async()=>{
    gestorSeleccionado.lanzamiento=parseInt(gestorSeleccionado.lanzamiento);
    await axios.put(Url+"/"+gestorSeleccionado.usU_ID, gestorSeleccionado)
    .then(response=>{
      var respuesta=response.data;
      var dataAuxiliar=data;
      dataAuxiliar.map(gestor=>{
        if(gestor.usU_ID===gestorSeleccionado.usU_ID){
          gestor.usU_NOMBRES=respuesta.usU_NOMBRES;
          gestor.lanzamiento=respuesta.lanzamiento;
          gestor.desarrollador=respuesta.desarrollador;
        }
      });
      editar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete = async () => {
    await axios.delete(Url + "/" + gestorSeleccionado.usU_ID)
      .then(response => {
        setData(data.filter(gestor => gestor.usU_ID !== response.data));
        eliminar();
      }).catch(error => {
        console.log(error);
      })
  }

  const seleccionarGestor = (gestor, caso) => {
    setGestorseleccionado(gestor);
    (caso === "Editar") ?
      editar() : eliminar();
  }


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
       <ModalHeader> Datos de usuario</ModalHeader>
      <button className="btn btn-success" onClick={agregar}>Agregar Usuario</button><br /><br />
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
                <button className="btn btn-primary"
                  onClick={() => seleccionarGestor(gestor, "Editar")}>Editar</button>{' '}
                <button className="btn btn-danger" onClick={() => seleccionarGestor(gestor, "eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalAgregar}>
        <ModalHeader>Agregar Usuarios</ModalHeader>
        <ModalBody>
          <form action="" >
            <p> Nombre</p>
            <input className='form-control' type="text" name="usU_NOMBRES" onChange={handlechange} id="" />
            <p> Apellido</p>
            <input className='form-control' type="text" name="usU_APELLIDOS" onChange={handlechange} id="" />
            <p> Tipo de documento</p>
            <input type="text" className='form-control' name="usU_TIPO_DOCUMENTO"  onChange={handlechange}  id="" />
            {/* <select className='form-control' name="usU_TIPO_DOCUMENTO" onChange={handlechange} id="">
              <option value="">Seleccione</option>
              <option value="CC">CC</option>
              <option value="CE">CE</option>
              <option value="TI">TI</option>
            </select> */}
            <p> Numero de documento</p>
            <input className='form-control' type="number" name="usU_NUM_DOCUMENTO" onChange={handlechange} id="" />
            <p> Telefono</p>
            <input className='form-control' type="number" name="usU_TELEFONO" onChange={handlechange} id="" />
            <p> Correo</p>
            <input className='form-control' type="email" name="usU_CORREO" onChange={handlechange} id="" /><br />
            <button className="btn btn-primary" onClick={ () =>peticionPost ()}>Agregar</button>{' '}
            <button className="btn btn-primary" onClick={agregar}>cancelar</button>
          </form>
        </ModalBody>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Usuarios</ModalHeader>
        <ModalBody>
          <form onSubmit={(e) => editar()}>
            {/* <p> Id</p> */}
            <input className='form-control' type="hidden" readOnly value={gestorSeleccionado && gestorSeleccionado.usU_ID} id="" />
            <p> Nombre</p>
            <input className='form-control' type="text" name="usU_NOMBRES" onChange={handlechange} value={gestorSeleccionado && gestorSeleccionado.usU_NOMBRES} id="" />
            <p> Apellido</p>
            <input className='form-control' type="text" name="usU_APELLIDOS" onChange={handlechange} value={gestorSeleccionado && gestorSeleccionado.usU_APELLIDOS} id="" />
            <p> Tipo de documento</p>
            <input type="text" className='form-control' name="usU_TIPO_DOCUMENTO"  onChange={handlechange} value={gestorSeleccionado && gestorSeleccionado.usU_TIPO_DOCUMENTO} id="" />
            {/* <select className='form-control' name="usU_TIPO_DOCUMENTO" onChange={handlechange} value={gestorSeleccionado && gestorSeleccionado.usU_TIPO_DOCUMENTO} id="">
              <option value="">Seleccione</option>
              <option value="">CC</option>
              <option value="">CE</option>
              <option value="">TI</option>
            </select> */}
            <p> Numero de documento</p>
            <input className='form-control' type="number" name="usU_NUM_DOCUMENTO" onChange={handlechange} value={gestorSeleccionado && gestorSeleccionado.usU_NUM_DOCUMENTO} id="" />
            <p> Telefono</p>
            <input className='form-control' type="number" name="usU_TELEFONO" onChange={handlechange} value={gestorSeleccionado && gestorSeleccionado.usU_TELEFONO} id="" />
            <p> Correo</p>
            <input className='form-control' type="email" name="usU_CORREO" onChange={handlechange} value={gestorSeleccionado && gestorSeleccionado.usU_CORREO} id="" /><br />
            <button className="btn btn-primary" onClick={()=>peticionPut()}>Agregar</button>{' '}
            <button className="btn btn-primary" onClick={editar}>cancelar</button>
          </form>
        </ModalBody>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Estás seguro que deseas eliminar el Gestor de Base de datos {gestorSeleccionado && gestorSeleccionado.usU_NOMBRES}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => eliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </Fragment>


  )


}

export default App
