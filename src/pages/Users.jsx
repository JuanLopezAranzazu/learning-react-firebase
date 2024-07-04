import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserList } from "../components/UserList";
import { db } from "../firebase/firebase-config";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { Loading } from "../components/Loading/Loading";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Funcion para obtener los usuarios
  // const getUsers = async () => {
  //   try {
  //     const data = await getDocs(usersCollectionRef);
  //     console.log(data);
  //     return data;
  //   } catch (e) {
  //     console.error("Error al obtener los usuarios: ", e);
  //   }
  // };

  // Obtener los usuarios al cargar el componente
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const data = await getUsers();
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   fetchUsers();
  // }, []);

  // Usar onSnapshot para obtener los usuarios en tiempo real
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(
      usersCollectionRef,
      (snapshot) => {
        const users = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsers(users);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error al obtener los usuarios: ", error);
        setIsLoading(false);
      }
    );

    // Función de limpieza para desuscribirse
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>{import.meta.env.VITE_TEXT}</h1>
      <button type="button" onClick={() => navigate("/add")}>
        Crear Usuario
      </button>
      <UserList users={users} />
    </div>
  );
};
