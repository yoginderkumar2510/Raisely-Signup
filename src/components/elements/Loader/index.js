import React from 'react';
import {CircularProgress} from '@material-ui/core';

export default ({size, color}) => {
  return(
    <CircularProgress 
      size={size || 20}
      style={{color: color || 'white'}} />
  );
}