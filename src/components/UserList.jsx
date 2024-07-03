import { User } from "./User";
import PropTypes from "prop-types";

// Componente para mostrar la lista de usuarios
export const UserList = ({ users }) => {
  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};

// Definir las propiedades que recibe el componente

UserList.propTypes = {
  users: PropTypes.array.isRequired,
};
