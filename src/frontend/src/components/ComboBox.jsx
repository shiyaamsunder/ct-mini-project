import { useState } from "react";

const ComboBox = ({ label, name, list, selected, onChange, setFeature, children, ...rest }) => {
  const [curr, setCurr] = useState(selected ?? list[0])
  const onChangeHandler =(e) => 
  {
    setCurr(e.target.value)
    setFeature(prev=> ({...prev, [name]: e.target.value}))
  }

  return (
    <div className="flex flex-col items-start p-4 my-4">
      <label htmlFor={label} className="mb-4 text-md">{label}</label>
      <select value={curr} onChange={onChangeHandler} name={label} className="w-full h-9 rounded-md" {...rest}>
        {list.map((item, i) => (
          <option key={`${i}_${item}`} value={item}>{item}</option>
        ))}
      </select>
    </div>
  )
}

export default ComboBox;