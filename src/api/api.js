import axios from "axios";

export async function httpLogin(usuario, contrasena) {
  try {
    const response = await axios.post(`http://localhost:8080/login`, {
      "email": usuario,
      "password": contrasena
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return "error";
  }
}


export async function httpObtenerEmpleados(token) {
  try {
    const response = await axios.get("http://localhost:8080/users", {
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
    const response = await axios.delete(`http://localhost:8080/users/${id}`, {
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
    const response = await axios.post(`http://localhost:8080/users`, user, {
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
    const response = await axios.patch(`http://localhost:8080/users/${id}`, user, {
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
    const response = await axios.get("http://localhost:8080/products", {
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
    const response = await axios.post(`http://localhost:8080/products`, producto, {
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
    const response = await axios.delete(`http://localhost:8080/products/${id}`, {
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
    const response = await axios.patch(`http://localhost:8080/products/${id}`, producto, {
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
    const response = await axios.post(`http://localhost:8080/orders`, pedido, {
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