export const CheckboxRadio = ({
  id,
  labelText,
  register,
  type,
  errors,
  rules,
  value,
  name,
}) => {
  return (
    <div className="form-check">
      <input
        className={`form-check-input ${errors[name] && 'is-invalid'} `} // 如果有錯誤的話,就加上is-invalid類別
        type={type}
        name={name}
        id={id}
        value={value}
        {...register(name, rules)} // 將表單驗證規則傳遞給react-hook-form
      />
      <label htmlFor={id} className="form-check-label">
        {labelText}
      </label>
      {errors[name] && <div className="invalid-feedback">{errors[name]?.message}</div>}
    </div>
  )
}

export const Input = ({
  id,
  labelText,
  register,
  type,
  errors,
  rules,
}) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input
        id={id}
        type={type}
        className={`form-control ${errors[id] && 'is-invalid'} `} // 如果有錯誤的話,就加上is-invalid類別
        {...register(id, rules)} // 將表單驗證規則傳遞給react-hook-form
      />
      {errors[id] && <div className="invalid-feedback">{errors[id]?.message}</div>}
    </>
  )
}

export const Select = ({
  id,
  labelText,
  register,
  type,
  errors,
  rules,
  children,
  disabled = false
}) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <select
        id={id}
        type={type}
        className={`form-select ${errors[id] && 'is-invalid'} `} // 如果有錯誤的話,就加上is-invalid類別
        {...register(id, rules)} // 將表單驗證規則傳遞給react-hook-form
        disabled={disabled}
      >
        {children}
      </select>
      {errors[id] && <div className="invalid-feedback">{errors[id]?.message}</div>}
    </>
  )

}