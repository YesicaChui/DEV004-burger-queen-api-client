import axios from "axios";
// const dominiolocal = 'http://localhost:8080'
// api mock
// const dominio = 'https://burger-queen-api-mock-production-7906.up.railway.app'
// const dominio = ' https://yesica-burgerqueenapi.up.railway.app'
const dominio = 'http://165.227.206.236:3002'
export async function httpLogin(usuario, contrasena) {
  try {
    const response = await axios.post(`${dominio}/login`,
    // cuerpo: body de la peticion post, lo que yo envio al servidor
    {
      "email": usuario,
      "password": contrasena
    }, {
      // cabecera: indico el tipo de dato que envio en este caso un json
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // devuelvo la data si todo va bien
    return response.data;
  } catch (error) {
    console.log(error)
    return "error";
  }
}


export async function httpObtenerEmpleados(token) {
  try {
    const response = await axios.get(`${dominio}/users`, {
      // autorization envio el token de autorizacion
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}


export async function httpEliminarEmpleado(token, id) {
  try {
    const response = await axios.delete(`${dominio}/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function httpCrearEmpleado(token, user) {
  try {
    const response = await axios.post(`${dominio}/users`, user, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function httpActualizarEmpleado(token, user,id) {
  try {
    const response = await axios.patch(`${dominio}/users/${id}`, user, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function httpObtenerProductos(token) {
  try {
    const response = await axios.get(`${dominio}/products`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function httpCrearProducto(token, producto) {
  try {
    const response = await axios.post(`${dominio}/products`, producto, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function httpEliminarProducto(token, id) {
  try {
    const response = await axios.delete(`${dominio}/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function httpActualizarProducto(token, producto,id) {
  try {
    const response = await axios.patch(`${dominio}/products/${id}`, producto, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function httpCrearPedido(token, pedido) {
  try {
    const response = await axios.post(`${dominio}/orders`, pedido, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function httpObtenerPedidos(token) {
  try {
    const response = await axios.get(`${dominio}/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function httpActualizarPedido(token, status,id) {
  try {
    const response = await axios.patch(`${dominio}/orders/${id}`, status, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}