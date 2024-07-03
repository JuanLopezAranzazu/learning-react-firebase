import { useNavigate } from "react-router-dom";
import { UserForm } from "../components/UserForm";
import { db } from "../firebase/firebase-config";
import { collection, addDoc } from "firebase/firestore";

// Componente para agregar un usuario
export const UserAdd = () => {
  const usersCollectionRef = collection(db, "users");
  const navigate = useNavigate();

  // Funcion para agregar un usuario
  const addUser = async (user) => {
    try {
      const userDoc = await addDoc(usersCollectionRef, {
        ...user,
        age: Number(user.age),
      });
      console.log("Usuario guardado con el ID:  ", userDoc.id);
      navigate("/");
    } catch (e) {
      console.error("Error al guardar el usuario: ", e);
    }
  };

  return (
    <div>
      <h1>Crear Usuario</h1>
      <UserForm onSubmit={addUser} />
    </div>
  );
};
