import React from 'react';
import { useSelector } from 'react-redux';
import { selectCount } from './counterSlice';

function Counter() {
  const count = useSelector(selectCount);

  return (
  <div>
    <span>Page switch counter: {count}</span>
  </div>
  );
}

export default Counter;
