import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';

const SidebarMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [userData, setUserData] = useState<{ name: string, email: string, certificate: string } | null>(null);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Função para logout
  const handleLogout = () => {
    localStorage.removeItem('certificate');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    navigate('/'); 
  };

  const username = localStorage.getItem('username');
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');

  return (
    <div>
      <button 
        className="btn btn-dark hamburger-btn" 
        onClick={toggleMenu}
        style={{
          fontSize: '30px',
          background: 'transparent',
          border: 'none',
          color: '#fff',
          position: 'relative', 
          zIndex: 1100,
        }}
      >
        &#9776;
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <h3>Meu Perfil</h3>
          <div className="user-info">
            <p><strong>Nome:</strong> {name}</p>
            <p><strong>Usuário:</strong> {username}</p>
            <p><strong>Email:</strong> {email}</p>
          </div>
          <button className="btn btn-danger logout-btn" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>

      <style>{`
        .hamburger-btn {
          font-size: 30px;
          background: transparent;
          border: none;
          color: #fff;
          position: relative;
          z-index: 1100;
          top: 0;
          left: 0;
        }

        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 250px;
          height: 100%;
          background-color: #007bff;
          color: white;
          padding-top: 30px;
          transition: transform 0.3s ease;
          z-index: 999;
          transform: translateX(-100%);
        }

        .sidebar.open {
          transform: translateX(0);
        }

        .sidebar-content {
          padding: 20px;
          margin-top: 50px;
        }

        .user-info p {
          margin: 10px 0;
        }

        .logout-btn {
          margin-top: 20px;
          background-color: #d9534f;
          color: white;
          border: none;
          padding: 10px;
          width: 100%;
          cursor: pointer;
        }

        .logout-btn:hover {
          background-color: #c9302c;
        }
      `}</style>
    </div>
  );
};

export default SidebarMenu;
