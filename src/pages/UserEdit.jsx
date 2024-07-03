import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserForm } from "../components/UserForm";
import { db } from "../firebase/firebase-config";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";

// Componente para editar un usuario
export const UserEdit = () => {
  const [user, setUser] = useState({});
  const usersCollectionRef = collection(db, "users");
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // Funcion para obtener un usuario
  const getUser = async (id) => {
    try {
      const user = await getDoc(doc(usersCollectionRef, id));
      return user;
    } catch (e) {
      console.error("Error al obtener el usuario: ", e);
    }
  };

  // Funcion para editar un usuario
  const editUser = async (id, user) => {
    try {
      const userDoc = doc(usersCollectionRef, id);
      await updateDoc(userDoc, {
        ...user,
        age: Number(user.age),
      });
      console.log("Usuario actualizado correctamente!");
      navigate("/");
    } catch (e) {
      console.error("Error al actualizar el usuario: ", e);
    }
  };

  // Obtener el usuario al cargar el componente
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(id);
      console.log(user);
      setUser({ ...user.data(), id: user.id });
      setIsLoading(false);
    };
    fetchUser();
  }, [id]);

  return (
    <div>
      <h1>Editar Usuario</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <UserForm
          onSubmit={(data) => editUser(id, data)}
          name={user?.name}
          age={user?.age}
        />
      )}
    </div>
  );
};
