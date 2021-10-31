# react-use-navigate-list hook

Demo: [Sandbox](https://codesandbox.io/s/react-use-navigate-list-cgsn2?file=/src/App.js)

🎉 react-use-navigate-list hook makes the list interactive using arrow buttons. It is optimized to reduce unnecessary re-renders

## Installation

```
$ npm install react-use-navigate-list 
$ yarn add react-use-navigate-list 
```

## Features

- Navigate through the list using <kbd>ArrowUp</kbd> and <kbd>ArrowDown</kbd> buttons
- Select item by pressing <kbd>Enter</kbd>
- Supports vertical and horizontal navigation

## Props

|Name|Type|Default|Description|
|----|----|-------|-----------|
| **list** | <code>Array</code> |  | *required*. Array of items |
| **onSelect** | <code>Function</code> |  | *required*. Callback function called on item click or on <kbd>Enter</kbd> press. |
| **indexPath** | <code>String</code> | <code>"id"</code> | *optional*. Custom path to the item index |
| **vertical** | <code>Boolean</code> | <code>true</code> | *optional*. Switches between horizontal and vertical navigation | 



## Example

```jsx
import React from "react";
import useNavigateList from "react-use-navigate-list";

const itemList = [
  { id: 1, name: "Banana" },
  { id: 2, name: "Pineapple" },
  { id: 3, name: "Blueberry" },
];

function App() {
  const { activeIndex, itemProps } = useNavigateList({
    list: itemList,
    onSelect: (item) => {
      console.log(item);
    },
  });

  return itemList.map((item, index) => (
    <div
      {...itemProps(item)}
      key={item.id}
      className={activeIndex === index ? "active-className" : ""}
    >
      {item.name}
    </div>
  ));
}
```

## License

Licensed under MIT