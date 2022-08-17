import React from 'react';
import logoGif from '../../assets/images/projectIntro.gif';
import style from './style.module.css';

export default function Loading() {
  return (
    <div className={ style.loading_container }>
      <img src={ logoGif } alt="" className={ style.gif } />
    </div>
  );
}
