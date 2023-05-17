import React from 'react'
import { NavMozo } from './NavMozo'

export const MozoCanceladasEntregadas = ({token,tipoReporte}) => {
  return (
    <>
      <NavMozo/>
      <h1>{tipoReporte}</h1>
    </>
  )
}
