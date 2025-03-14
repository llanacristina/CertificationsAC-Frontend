import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { z } from 'zod';
import { object, string } from 'zod';
import Header from '../components/Header';

// Validação com Zod
const validationSchema = object({
  username: string()
    .min(3, 'O nome de usuário deve ter no mínimo 3 caracteres')
    .nonempty('Nome de usuário é obrigatório'),
  password: string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .nonempty('Senha é obrigatória'),
  name: string()
    .min(3, 'O nome completo deve ter no mínimo 3 caracteres')
    .nonempty('Nome completo é obrigatório'),
  email: string()
    .email('Por favor, insira um email válido')
    .nonempty('Email é obrigatório'),
});

const RegisterScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = async (values: { username: string, password: string, name: string, email: string }) => {
    try {
      const result = await axios.post('http://localhost:5000/api/users/register', {
        username: values.username,
        password: values.password,
        name: values.name,
        email: values.email,
      });

      localStorage.setItem('certificate', result.data.certificate);
      localStorage.setItem('userId', result.data.userId);
      localStorage.setItem('name', values.name);
      localStorage.setItem('username', values.username);
      localStorage.setItem('email', values.email);

      navigate('/certificates'); 
    } catch (error) {
      alert('Erro ao registrar usuário');
    }
  };

  return (
    <div>
      <Header showHamburger={false} />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white text-center">
                <h4>Criar Conta</h4>
              </div>
              <div className="card-body">
                <Formik
                  initialValues={{ username: '', password: '', name: '', email: '' }}
                  validate={(values) => {
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
                  onSubmit={handleRegister}
                >
                  <Form>
                    <div className="form-group">
                      <label htmlFor="username">Nome de Usuário</label>
                      <Field
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                      />
                      <ErrorMessage name="username" component="div" className="text-danger" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Senha</label>
                      <Field
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                      />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Nome Completo</label>
                      <Field
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                      />
                      <ErrorMessage name="name" component="div" className="text-danger" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                      />
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success mx-auto d-block mt-3"
                      style={{ width: '100%' }}
                    >
                      Registrar
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
                  Já possui uma conta?{' '}
                  <button
                    className="btn btn-link"
                    onClick={() => navigate('/')}
                  >
                    Faça login
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

export default RegisterScreen;
