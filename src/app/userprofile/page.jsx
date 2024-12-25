'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ username: '', email: '', rol: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [message, setMessage] = useState('');

  // Función para cargar usuarios
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener los usuarios', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Manejar la creación o actualización de un usuario
  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await axios.put(`/api/users/${editingUser.id}`, formData);
        setMessage('Usuario actualizado correctamente');
      } else {
        await axios.post('/api/users', formData);
        setMessage('Usuario creado correctamente');
      }
      setFormData({ username: '', email: '', rol: '' });
      setEditingUser(null);
      fetchUsers(); // Actualiza la lista de usuarios
    } catch (error) {
      console.error('Error al crear o actualizar el usuario', error);
      setMessage('Hubo un error al crear o actualizar el usuario');
    }
  };


  const handleEdit = (user) => {
    setFormData({ username: user.username, email: user.email, rol: user.rol });
    setEditingUser(user);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Maneja la eliminación de un usuario
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      setMessage('Usuario eliminado correctamente');
      fetchUsers(); // Actualizar la lista después de eliminar
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      setMessage('Hubo un error al eliminar el usuario');
    }
  };

  return (
    <div className="bg-[#95B6BF] container mx-auto mt-4 p-6 rounded-md">
      <h1 className="text-3xl font-bold text-center mb-6">Administrar Usuarios</h1>

      {/* Mostrar el mensaje */}
      {message && (
        <div
          className="mb-4 p-4 text-white rounded-md"
          style={{ backgroundColor: message.includes('error') ? 'red' : 'green' }}
        >
          {message}
        </div>
      )}

      {/* Formulario para Crear o Actualizar Usuario */}
      <form onSubmit={handleCreateOrUpdate} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre:</label>
          <input
            id="username"
            type="text"
            placeholder="Nombre"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico:</label>
          <input
            id="email"
            type="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="rol" className="block text-sm font-medium text-gray-700">Rol:</label>
          <select
            id="rol"
            value={formData.rol}
            onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
            required
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Seleccionar rol</option>
            <option value="Administrador">Administrador</option>
            <option value="Verificado">Verificado</option>
            <option value="No Verificado">No Verificado</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 text-white bg-[#447380] rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {editingUser ? 'Actualizar' : 'Crear'} Usuario
        </button>
      </form>

      {/* Tabla de Usuarios */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Lista de Usuarios</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100 ">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Nombre</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Correo</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Rol</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b ">
              <td className="px-6 py-4 text-sm text-gray-800">{user.username}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{user.rol}</td>
              <td className="px-6 py-4 text-sm text-gray-800">
                <button
                  onClick={() => handleEdit(user)}
                  className="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 ml-2"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;
