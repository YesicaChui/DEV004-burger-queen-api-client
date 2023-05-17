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
    // se renderiza correctamente si estan los siguientes 4 textos
    const adminBrand = getByText('ADMINISTRACIÓN');
    const empleadosLink = getByText('Empleados');
    const productosLink = getByText('Productos');
    const salirLink = getByText('Salir');

    // Verifico si esta en el documento los 4 textos para pasar el test
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
    //si la localización en el navegador luego de hacer clic es corrrecta pasa el test
    const empleadosLink = getByText('Empleados');
    fireEvent.click(empleadosLink);
    expect(location.pathname).toBe('/admin/empleados');

    const productosLink = getByText('Productos');
    fireEvent.click(productosLink);
    expect(location.pathname).toBe('/admin/productos');

    const salirLink = getByText('Salir');
    fireEvent.click(salirLink);
    expect(location.pathname).toBe('/');
  });
});
jest.mock('../src/api/api.js');
/* jest.mock('../src/api/api.js', () => ({
  httpObtenerProductos: jest.fn(),
})); */



describe('Pedidos', () => {
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
    httpObtenerProductos.mockReturnValue(productosMock);
    const { getByText } = render(
      <BrowserRouter>
        <Pedidos token={"token válido"} />
      </BrowserRouter>
    );

    await waitFor(() => {
      const productoSandwich = getByText('Sandwich de jamón y queso');
      const productoCafe = getByText('Café americano');
      const productoAgua = getByText('Agua 500ml');
      const productoGaseosa = getByText('Gaseosa Coca Cola');
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
      const productoSandwich = getByText('Sandwich de jamón y queso');
      const productoCafe = getByText('Café americano');
      const productoAgua = getByText('Agua 500ml');
      const productoGaseosa = getByText('Gaseosa Coca Cola');
      fireEvent.click(productoSandwich);
      fireEvent.click(productoCafe);
    });

    const PedidoOrdenSandwich = getByAltText('Orden Sandwich de jamón y queso')
    const PedidoOrdenCafe = getByAltText('Orden Café americano')
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
        const productoSandwich = getByText('Sandwich de jamón y queso');
        fireEvent.click(productoSandwich);
      });
    } finally {
      const aumentarButton = getByTestId('aumentar 0');
      fireEvent.click(aumentarButton);
      const cantidad = Number(getByTestId('cantidad 0').textContent);
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
        const productoSandwich = getByText('Sandwich de jamón y queso');
        fireEvent.click(productoSandwich);
        fireEvent.click(productoSandwich);
      });
    } finally {
      const disminuirButton = getByTestId('disminuir 0');
      fireEvent.click(disminuirButton);
      const cantidad = Number(getByTestId('cantidad 0').textContent);
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
        const productoSandwich = getByText('Sandwich de jamón y queso');
        fireEvent.click(productoSandwich);
        fireEvent.click(productoSandwich);
      });
    } finally {
      const borrarButton = queryByTestId('borrar 0');
      fireEvent.click(borrarButton);
      const tdCantidad = queryByTestId('cantidad 0');
      expect(tdCantidad).not.toBeInTheDocument();
    }
  })


  it('Mozo: Debe mostrar alert con "Se envio a cocina" cuando se tiene un producto en el Pedido y se pulsa enviar a cocina', async () => {
    httpObtenerProductos.mockReturnValue(productosMock);
    httpCrearPedido.mockImplementation(() => Promise.resolve());
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });

    const { getByText, queryByTestId } = render(
      <BrowserRouter>
        <Pedidos token={"token válido"} />
      </BrowserRouter>
    );
    try {
      await waitFor(() => {
        const productoSandwich = getByText('Sandwich de jamón y queso');
        fireEvent.click(productoSandwich);
        fireEvent.click(productoSandwich);
      });
    } finally {
      const inputCliente = queryByTestId('input-cliente');
      fireEvent.change(inputCliente, { target: { value: 'Karen' } });
      const enviarButton = queryByTestId('boton-pedido');
      await waitFor(() => {
        fireEvent.click(enviarButton);

        expect(alertMock).toHaveBeenCalledWith("Se Envio a cocina el Pedido");
      });

    }
  })
})

