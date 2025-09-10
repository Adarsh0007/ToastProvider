import React, { useState } from 'react';
import CheckBoxNode from './CheckBoxNode';

const CheckBoxTree = ({data}) => {
    console.log("data", data);
    const initialSate = {};
  const [checkedItems, setCheckedItems] = useState(initialSate);


  return (
    <div>
      <h3>Checkbox Tree</h3>
      {data?.map((node) => <CheckBoxNode key={node.id} node={node} checkedItems={checkedItems} setCheckedItems={setCheckedItems}/>)}
      <pre>{JSON.stringify(checkedItems, null, 2)}</pre>
    </div>
  );
};

export default CheckBoxTree;
