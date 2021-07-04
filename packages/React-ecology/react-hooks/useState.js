
import React from 'react';

function useState (initialState) {
  let state = initialState;
  const setState = (newState) => {
    state = newState;
  }
  return [state, ]
}