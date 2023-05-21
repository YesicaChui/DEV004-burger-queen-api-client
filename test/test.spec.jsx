import React from 'react';
import { render, fireEvent, waitFor, queryByText } from '@testing-library/react';
import { NavAdmin } from '../src/components/admin/NavAdmin';
import { BrowserRouter } from 'react-router-dom';
import { Pedidos } from '../src/components/Mozo/Pedidos';
import { httpObtenerProductos, httpCrearPedido } from '../src/api/api.js';
// testing de componentes
// https://www.youtube.com/watch?v=FjJu3hcPSCY&ab_channel=Garajedeideas

describe('NavAdmin', () => {
  it('Deberia de renderizar el componente correctamente', () => {
    // simulo el dibujo del componente
    const { getByText } = render(
      <BrowserRouter>
        <NavAdmin />
      </BrowserRouter>
    );
    // se buscan los siguientes 4 textos en el NavAdmin
    const adminBrand = getByText('ADMINISTRACIÓN');
    const empleadosLink = getByText('Empleados');
    const productosLink = getByText('Productos');
    const salirLink = getByText('Salir');

    // Verifico si esta en el documento del NavAdmin los 4 textos para pasar el test
    expect(adminBrand).toBeInTheDocument();
    expect(empleadosLink).toBeInTheDocument();
    expect(productosLink).toBeInTheDocument();
    expect(salirLink).toBeInTheDocument();
  });

  it('deberia navegar a la correcta ruta cuando un link es clickeado', () => {
    const { getByText } = render(
      <BrowserRouter>
        <NavAdmin />
      </BrowserRouter>
    );
    // busco el texto Empleados en el NavAdmin
    const empleadosLink = getByText('Empleados');
    // Simulo el click a ese texto encontrado en el NavAdmin
    fireEvent.click(empleadosLink);
    // Se espera que el path del navegador sea /admin/empleados
    expect(location.pathname).toBe('/admin/empleados');

    const productosLink = getByText('Productos');
    fireEvent.click(productosLink);
    expect(location.pathname).toBe('/admin/productos');

    const salirLink = getByText('Salir');
    fireEvent.click(salirLink);
    expect(location.pathname).toBe('/');
  });
});
// mockeando la api para que no haga la peticion httpCrearPedido y httpObtenerProductos
jest.mock('../src/api/api.js');

describe('Pedidos', () => {
  // productos simulados para el test
  const productosMock = [
    {
      "id": 1,
      "name": "Sandwich de jamón y queso",
      "price": "12",
      "image": "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/sandwich.png",
      "type": "Desayuno",
      "dateEntry": "2022-03-05 15:14:10"
    },
    {
      "id": 2,
      "name": "Café americano",
      "price": "10",
      "image": "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/coffee.png",
      "type": "Desayuno",
      "dateEntry": "2022-03-05 15:14:10"
    },
    {
      "id": 3,
      "name": "Agua 500ml",
      "price": "4",
      "image": "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
      "type": "Almuerzo",
      "dateEntry": "2022-03-05 15:14:10"
    },
    {
      "name": "Gaseosa Coca Cola",
      "price": "6",
      "image": "https://mmkfoods.pe/wp-content/uploads/2020/06/GASEOSA-COCA-COLA-1.5-ENVASE-NO-RETOR.-1-600x600.png",
      "type": "cena",
      "id": 4
    },
    {
      "name": "Hamburguesa de Cordero",
      "price": "15",
      "image": "https://www.pngplay.com/wp-content/uploads/2/Burger-PNG-Photo-Image.png",
      "type": "cena",
      "id": 5
    },
    {
      "name": "Hotdog",
      "price": "12",
      "image": "https://i.pinimg.com/originals/e5/df/a9/e5dfa90ca6ad3c81d54051ecc7017ae2.png",
      "type": "cena",
      "id": 6
    }
  ];
  it('Mozo: los productos se renderizan correctamente en Pedidos', async () => {
    // indicamos que el retorno de la funcion httpObtenerProductos sean los productos mockeados
    httpObtenerProductos.mockReturnValue(productosMock);
    const { getByText } = render(
      <BrowserRouter>
        <Pedidos token={"token válido"} />
      </BrowserRouter>
    );

    await waitFor(() => {
      // busco los siguientes 4 textos de los productos
      const productoSandwich = getByText('Sandwich de jamón y queso');
      const productoCafe = getByText('Café americano');
      const productoAgua = getByText('Agua 500ml');
      const productoGaseosa = getByText('Gaseosa Coca Cola');
      // se espera que esten los 4 productos en el documento de la pantalla pedidos
      expect(productoSandwich).toBeInTheDocument();
      expect(productoCafe).toBeInTheDocument();
      expect(productoAgua).toBeInTheDocument();
      expect(productoGaseosa).toBeInTheDocument();
    });
  })

  it('Mozo: cuando se pulsa algun producto deberia aparecer en lista de los productos del Pedido', async () => {
    httpObtenerProductos.mockReturnValue(productosMock);
    const { getByText, getByAltText } = render(
      <BrowserRouter>
        <Pedidos token={"token válido"} />
      </BrowserRouter>
    );

    await waitFor(() => {
      // busco los siguientes 4 textos de los productos
      const productoSandwich = getByText('Sandwich de jamón y queso');
      const productoCafe = getByText('Café americano');
      const productoAgua = getByText('Agua 500ml');
      const productoGaseosa = getByText('Gaseosa Coca Cola');
      // simulo el click al Sandwich y al cafe
      fireEvent.click(productoSandwich);
      fireEvent.click(productoCafe);
    });

    // busco que existan dos imagenes con los textos de Orden Sandwich y Orden Cafe
    const PedidoOrdenSandwich = getByAltText('Orden Sandwich de jamón y queso')
    const PedidoOrdenCafe = getByAltText('Orden Café americano')
    // Se espera que las dos imagenes esten la pantalla de la orden del pedido
    expect(PedidoOrdenSandwich).toBeInTheDocument();
    expect(PedidoOrdenCafe).toBeInTheDocument();
  })

  it('Mozo: cuando se tiene un producto en el Pedido se debe incrementar al pulsar el +', async () => {
    httpObtenerProductos.mockReturnValue(productosMock);
    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <Pedidos token={"token válido"} />
      </BrowserRouter>
    );

    try {
      await waitFor(() => {
        // se busca el sandwich entre los productos
        const productoSandwich = getByText('Sandwich de jamón y queso');
        //simulo el click al sandwich
        fireEvent.click(productoSandwich);
      });
    } finally {
      // busco al boton de aumentar del elemento ingresado a la orden
      const aumentarButton = getByTestId('aumentar 0');
      // simulo el click en el boton de aumentar +
      fireEvent.click(aumentarButton);
      // busco el valor del Span que contiene la cantidad
      const cantidad = Number(getByTestId('cantidad 0').textContent);
      // se espera que la cantidad sea 2
      expect(cantidad).toBe(2);
    }
  })

  it('Mozo: cuando se tiene un producto en el Pedido se debe disminuir al pulsar el -', async () => {
    httpObtenerProductos.mockReturnValue(productosMock);
    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <Pedidos token={"token válido"} />
      </BrowserRouter>
    );

    try {
      await waitFor(() => {
        // se busca el sandwich entre los productos
        const productoSandwich = getByText('Sandwich de jamón y queso');
        // Simulo dos click en el sandwich 
        fireEvent.click(productoSandwich);
        fireEvent.click(productoSandwich);
      });
    } finally {
      // selecciono boton de disminuir del producto de la orden
      const disminuirButton = getByTestId('disminuir 0');
      // simulo el click al boton de disminuir
      fireEvent.click(disminuirButton);
      // selecciono el span de la cantidad del producto de la orden
      const cantidad = Number(getByTestId('cantidad 0').textContent);
      // Se espera que la cantidad sea 1
      expect(cantidad).toBe(1);
    }
  })

  it('Mozo: cuando se tiene un producto en el Pedido se debe borrar si se presiona en tachito', async () => {
    httpObtenerProductos.mockReturnValue(productosMock);
    const { getByText, queryByTestId } = render(
      <BrowserRouter>
        <Pedidos token={"token válido"} />
      </BrowserRouter>
    );
    try {
      await waitFor(() => {
        // se busca el sandwich entre los productos
        const productoSandwich = getByText('Sandwich de jamón y queso');
        // simulo dos click en el producto sandwich
        fireEvent.click(productoSandwich);
        fireEvent.click(productoSandwich);
      });
    } finally {
      // selecciono el boton del tachito
      const borrarButton = queryByTestId('borrar 0');
      // simulo el click al boton del tachito
      fireEvent.click(borrarButton);
      // selecciono el span de cantidad del producto de la orden
      const tdCantidad = queryByTestId('cantidad 0');
      // se espera que el span de ese producto no exista en el documento
      expect(tdCantidad).not.toBeInTheDocument();
    }
  })


  it('Mozo: Debe mostrar alert con "Se envio a cocina" cuando se tiene un producto en el Pedido y se pulsa enviar a cocina', async () => {
    // indicamos que retornamos el mock de los productos
    httpObtenerProductos.mockReturnValue(productosMock);
    // indicamos que el httpcrearPedido no realiza ninguna accion
    httpCrearPedido.mockImplementation(() => Promise.resolve());
    // mockeamos el alert para indicar que no haga nada
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });

    const { getByText, queryByTestId } = render(
      <BrowserRouter>
        <Pedidos token={"token válido"} />
      </BrowserRouter>
    );
    try {
      await waitFor(() => {
        // selecciono el Sandwich
        const productoSandwich = getByText('Sandwich de jamón y queso');
        // simulo dos click al sandwich
        fireEvent.click(productoSandwich);
        fireEvent.click(productoSandwich);
      });
    } finally {
      // selecciono el input del pedido
      const inputCliente = queryByTestId('input-cliente');
      // simulo el cambio del texto del inputo por el valor de Karen
      fireEvent.change(inputCliente, { target: { value: 'Karen' } });
      // selecciono el boton de Enviar a cocina
      const enviarButton = queryByTestId('boton-pedido');
      await waitFor(() => {
        // simulo el click al boton de Enviar a Cocina 
        fireEvent.click(enviarButton);
        // se espera que el alert haya sido llamado con el texto Se Envio a cocina el Pedido
        expect(alertMock).toHaveBeenCalledWith("Se Envio a cocina el Pedido");
      });

    }
  })
})

