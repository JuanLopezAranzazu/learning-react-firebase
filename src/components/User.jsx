import { Link } from "react-router-dom";
import { db } from "../firebase/firebase-config";
import { doc, collection, deleteDoc } from "firebase/firestore";
import PropTypes from "prop-types";

// Componente para mostrar un usuario
export const User = ({ user }) => {
  const usersCollectionRef = collection(db, "users");

  // Funcion para eliminar un usuario
  const deleteUser = async (id) => {
    try {
      const userDoc = doc(usersCollectionRef, id);
      await deleteDoc(userDoc);
      console.log("Usuario eliminado correctamente");
    } catch (e) {
      console.error("Error al eliminar el usuario: ", e);
    }
  };

  return (
    <div>
      <Link to={`/edit/${user?.id}`}>
        <h1>Nombre: {user?.name}</h1>
      </Link>
      <p>Edad: {user?.age}</p>
      <button type="button" onClick={() => deleteUser(user?.id)}>
        Eliminar
      </button>
    </div>
  );
};

// Definir las propiedades que recibe el componente
User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    age: PropTypes.number,
  }),
};
