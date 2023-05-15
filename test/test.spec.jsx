import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { NavAdmin } from '../src/components/admin/NavAdmin';
import { BrowserRouter } from 'react-router-dom';
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