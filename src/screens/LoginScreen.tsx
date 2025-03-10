import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

// Definindo o esquema de validação com Zod
const loginSchema = z.object({
  email: z.string().email('Por favor, insira um email válido').nonempty('Email é obrigatório'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres').nonempty('Senha é obrigatória'),
});

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string, password?: string }>({});
  const navigate = useNavigate();

  
  const validateForm = () => {
    try {
      loginSchema.parse({ email, password });
      setErrors({}); 
      return true;
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        const newErrors: { email?: string, password?: string } = {};
        validationError.errors.forEach(err => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });

      if (response.data.token) {
        navigate('/certificates');
      } else {
        setErrors({ email: 'Usuário ou senha inválidos' });
      }
    } catch (error) {
      setErrors({ email: 'Erro ao tentar fazer login' });
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4">Login</h3>

              {errors.email && <div className="alert alert-danger">{errors.email}</div>}

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={validateForm} 
                  placeholder="Digite seu email"
                />
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Senha</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validateForm} 
                  placeholder="Digite sua senha"
                />
                {errors.password && <div className="text-danger">{errors.password}</div>}
              </div>
              <div className="d-grid">
                <button className="btn btn-primary" onClick={handleLogin}>
                  Entrar
                </button>
              </div>
              <div className="text-center mt-3">
                <p>
                  Não tem uma conta?{' '}
                  <button
                    className="btn btn-link"
                    onClick={() => navigate('/register')}
                  >
                    Cadastre-se
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
