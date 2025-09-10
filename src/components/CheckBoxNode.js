import { useEffect } from "react";

const CheckBoxNode = ({node, checkedItems, setCheckedItems}) => {
    console.log("CheckBoxNode", node);
    const children = node?.children || [];
    const isChecked = checkedItems[node.id];
    const isIndeterminate = checkedItems[node.id] && children.some(child => !checkedItems[child.id]);

    const handleCheck = (e) => {
        const checked = e.target.checked;
        const newCheckedItems = {...checkedItems};
         // update this node + all children recursively
         const updateChildren = (n, value) => {
            newCheckedItems[n.id] = value;
            n.children?.forEach(child => updateChildren(child, value));
         }
         updateChildren(node, checked);
         setCheckedItems(newCheckedItems);
    };

    useEffect(() => {
        if (children.length) {
            const childStates = children.map((c) => checkedItems[c.id]);
            if (childStates.every(state => state === true)) {
                checkedItems[node.id] = true;
            } else if (childStates.every(state => state === false)) {
                checkedItems[node.id] = false;
            } else {
                checkedItems[node.id] = 'indeterminate';
            }
            setCheckedItems({...checkedItems});
        }
    }, [node.id, children.map(c => checkedItems[c.id]).join(',')]);

    return (
        <div style={{ marginLeft: '20px' }}>
            <label>
                <input type="checkbox" checked={isChecked} onChange={handleCheck} ref={(el) => {
            if (el) el.indeterminate = isIndeterminate;
          }}/>
                {node.label}
            </label>
            {children.map(child => <CheckBoxNode key={child.id} node={child} checkedItems={checkedItems} setCheckedItems={setCheckedItems}/>)}
        </div>
    )
};

export default CheckBoxNode;