import React from 'react'

export const CardPedido = ({ pedido }) => {
  return (
    <div className="card-body">
      <h5 className="card-title">{pedido.client}</h5>
      <p className="card-text">{pedido.dateEntry}</p>
      <p className="card-text fw-bold">Pedido</p>
      <ul className="product-pedidos list-group ">
        {pedido.products?.map((producto, indice) => (
          <li key={indice} className="list-group-item">{producto.product.name} {producto.qty}</li>
        ))}
      </ul>
    </div>
  )
}
