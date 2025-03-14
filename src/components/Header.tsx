import React from 'react';
import SidebarMenu from '../components/Menu'; 

interface HeaderProps {
  showHamburger: boolean; 
}

const Header: React.FC<HeaderProps> = ({ showHamburger }) => {
  return (
    <div
      className="d-flex justify-content-between align-items-center p-3"
      style={{
        backgroundColor: '#007bff', 
        color: '#ffffff', 
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Menu Hambúrguer alinhado à esquerda */}
      {showHamburger && (
        <div className="d-flex align-items-center">
          <SidebarMenu />
        </div>
      )}

      {/* Logo Alinhado à direita */}
      <div className="logo" style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: 'auto' }}>
        ACCert
      </div>
    </div>
  );
};

export default Header;
