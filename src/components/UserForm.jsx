import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Datos iniciales del formulario
const initialErrors = {
  nameMessage: "",
  ageMessage: "",
};

export const UserForm = ({ onSubmit, name = "", age = 0 }) => {
  const [formValues, setFormValues] = useState({
    name: name || "",
    age: age || 0,
  });
  const [formErrors, setFormErrors] = useState(initialErrors);
  const navigate = useNavigate();

  // Funcion para manejar los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    const errors = { ...formErrors };

    switch (name) {
      case "name":
        errors.nameMessage = value.length < 3 ? "El nombre es muy corto" : "";
        break;
      case "age":
        errors.ageMessage = value < 18 ? "Debes ser mayor de edad" : "";
        break;
      default:
        break;
    }
    setFormErrors(errors);
  };

  // Funcion para validar el formulario
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  // Funcion para manejar el envio del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm(formErrors)) {
      console.log("Formulario inválido");
      return;
    }
    onSubmit(formValues);
    navigate("..");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={formValues.name}
          name="name"
          placeholder="Nombre..."
          onChange={handleChange}
          required
        />
        {formErrors.nameMessage && <span>{formErrors.nameMessage}</span>}
      </div>
      <div>
        <input
          type="number"
          value={formValues.age}
          name="age"
          placeholder="Edad..."
          onChange={handleChange}
          required
        />
        {formErrors.ageMessage && <span>{formErrors.ageMessage}</span>}
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

// Definir las propiedades que recibe el componente
UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  name: PropTypes.string,
  age: PropTypes.number,
};
