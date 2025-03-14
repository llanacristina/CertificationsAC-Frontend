import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { z } from 'zod';
import { object, string } from 'zod';
import Header from '../components/Header';
import { jwtDecode } from 'jwt-decode';

// Validação com Zod
const validationSchema = object({
  email: string()
    .email('Por favor, insira um email válido')
    .nonempty('Email é obrigatório'),
  password: string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .nonempty('Senha é obrigatória'),
});

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (values: { email: string, password: string }) => {
    try {
      const result = await axios.post('http://localhost:5000/api/users/login', {
        email: values.email,
        password: values.password,
      });
  
      if (result.data.token) {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('email', values.email); 
        navigate(values.email === 'admin' ? '/admin' : '/certificates');
      } else {
        alert('Erro ao fazer login');
      }
    } catch (error) {
      alert('Erro ao tentar fazer login');
    }
  };
  return (
    <div>
      <Header showHamburger={false} />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-header" style={{ backgroundColor: '#007bff', color: '#fff', textAlign: 'center' }}>
                <h4>Login</h4>
              </div>
              <div className="card-body">
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validate={(values) => {
                    if (values.email === 'admin') {
                      // Se for admin, ignora as validações
                      return {};
                    }

                    try {
                      validationSchema.parse(values);
                    } catch (err: any) {
                      const errors: { [key: string]: string } = {};
                      err.errors.forEach((error: any) => {
                        errors[error.path[0]] = error.message;
                      });
                      return errors;
                    }
                  }}
                  onSubmit={handleLogin}
                >
                  <Form>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Digite seu email"
                      />
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Senha</label>
                      <Field
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Digite sua senha"
                      />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary mx-auto d-block mt-3"
                      style={{ width: '100%' }}
                    >
                      Entrar
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-3">
          <div className="col-md-6">
            <div className="card" style={{ backgroundColor: '#f0f0f0' }}>
              <div className="card-body text-center">
                <p>
                  Não tem uma conta?{' '}
                  <button
                    className="btn btn-link"
                    onClick={() => navigate('/register')}
                  >
                    Criar conta
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
