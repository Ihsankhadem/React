

import FormContact from '../components/FormContact';
import "../App.css";

import React from 'react'

const Contact = () => {
  return (
    <figure>
        <h1 className="contact-title">Contact</h1>
        <FormContact onSubmit={(data) => {
          console.log("Formulaire soumis :", data);
        }} />
    </figure>
  )
}

export default Contact