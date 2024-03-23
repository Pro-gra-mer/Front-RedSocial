// Función que recorre todo el formulario y saca la clave y el valor
export const SerializeForm = (form) => {
  const formData = new FormData(form);
  const completeObj = {};
  for (let [name, value] of formData) {
    completeObj[name] = value;
  }

  return completeObj;
};
