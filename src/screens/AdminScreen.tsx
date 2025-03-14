import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SidebarMenu from '../components/Menu';
import Header from '../components/Header';

const AdminScreen: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]); 
  const [error, setError] = useState<string | null>(null); 

  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        setError("Token não encontrado. Você precisa estar autenticado.");
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/users/list', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setError("Houve um erro ao buscar os usuários.");
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div>
      <Header showHamburger={false} />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white text-center">
                <h4>Gerenciamento de Certificados - Admin</h4>
              </div>
              <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>} 
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Certificado</th>
                      <th>Status</th> 
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user.id}>
                          <td className="align-middle">{user.id}</td>
                          <td className="align-middle">
                            <pre>{user.certificate}</pre>
                          </td>
                          <td className="align-middle">
                            <span
                              className={`badge ${
                                user.status === 'Certificado válido'
                                  ? 'bg-success'
                                  : user.status === 'Certificado revogado'
                                  ? 'bg-danger'
                                  : 'bg-warning'
                              } p-2 text-white`}
                            >
                              {user.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="text-center">Nenhum usuário encontrado</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;
