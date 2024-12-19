import React from 'react'
import useDocumentTitle from '../../hooks/dynamicTitle/dynamicTitle';

const Today = () => {
    useDocumentTitle("Host Dashboard - Airbnb");

  return (
    <div>
      today
    </div>
  )
}

export default Today
