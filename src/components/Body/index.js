import React from 'react';
import TextInput from "../TextInput";
import TextAreaInput from "../TextAreaInput";
import SelectInput from "../SelectInput";

const Body = ({type, options}) => {
  let Component;
  if(type === 'text'){
    Component = TextInput;
  }else if(type === 'textarea'){
    Component = TextAreaInput;
  }else if(type === 'select'){
    Component = SelectInput;
  } else {
    return null;
  }

  return <Component options={options}/>
};

export default Body;
