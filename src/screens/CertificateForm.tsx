import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SidebarMenu from '../components/Menu';
import Header from '../components/Header';

const CertificateForm: React.FC = () => {
    const [userId, setUserId] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [certificateData, setCertificateData] = useState<string>('');
    const [expirationDate, setExpirationDate] = useState<string>(''); 
    const [signature, setSignature] = useState<string>('');
    const [response, setResponse] = useState<string | null>(null);
    const [revoked, setRevoked] = useState<boolean>(false);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const storedRevoked = localStorage.getItem(`revoked_user_${storedUserId}`);
        const storedCertificate = localStorage.getItem('certificate');
        const storedExpiration = localStorage.getItem(`expirationDate_${storedUserId}`);
        const storedEmail = localStorage.getItem('email');

        if (storedUserId) setUserId(storedUserId);
        if (storedRevoked === 'true') setRevoked(true);
        if (storedCertificate) setCertificateData(storedCertificate);
        if (storedExpiration) setExpirationDate(storedExpiration);
        if (storedEmail) setEmail(storedEmail);
    }, []);

    const handleSign = async () => {
        if (revoked) {
            setResponse('Este certificado foi revogado e não pode ser assinado novamente.');
            return;
        }

        try {
            const result = await axios.post('http://localhost:5000/api/certificates/sign', {
                userId,
                certificateData,
                expirationDate
            });

            setSignature(result.data.signature);
            setCertificateData(result.data.certificate);
            localStorage.setItem('certificate', result.data.certificate);
            localStorage.setItem(`expirationDate_${userId}`, expirationDate); 
            setResponse('Certificado assinado com sucesso!');
        } catch (error) {
            setResponse('Erro ao assinar o certificado');
        }
    };

    const handleVerify = async () => {
        if (revoked) {
            setResponse('Este certificado foi revogado e não pode ser verificado.');
            return;
        }

        try {
            const result = await axios.post('http://localhost:5000/api/certificates/verify', {
                userId,
                certificateData,
                signature
            });
            setResponse(result.data.message || 'Certificado válido!');
        } catch (error) {
            setResponse('Erro ao verificar certificado');
        }
    };

    const handleRevoke = async () => {
        try {
            const result = await axios.post('http://localhost:5000/api/certificates/revoke', {
                userId,
                email, 
               certificateData,
            });
            setResponse(result.data.message || 'Certificado revogado!');
            setRevoked(true);
            setSignature('');
            setCertificateData('');

            localStorage.setItem(`revoked_user_${userId}`, 'true');
            localStorage.removeItem(`expirationDate_${userId}`); 
        } catch (error) {
            setResponse('Erro ao revogar certificado');
        }
    };

    return (
        <div>
            <Header showHamburger={true}/>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-sm">
                            <div className="card-header bg-primary text-white text-center">
                                <h4>Gerenciamento de Certificados</h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="userId">ID do Usuário</label>
                                        <input type="text" className="form-control" id="userId" value={userId} disabled />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="certificateData">Dados do Certificado</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="certificateData"
                                            placeholder="Digite os dados do certificado"
                                            value={certificateData}
                                            onChange={(e) => setCertificateData(e.target.value)}
                                            disabled={revoked}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="expirationDate">Data de Expiração</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="expirationDate"
                                            value={expirationDate}
                                            onChange={(e) => setExpirationDate(e.target.value)}
                                            disabled={revoked}
                                        />
                                    </div>
                                    {!revoked ? (
                                        <div className="form-group">
                                        <button type="button" className="btn btn-success btn-block mt-3" style={{ marginRight: '10px' }} onClick={handleSign}>
                                            Assinar Certificado
                                        </button>
                                        <button type="button" className="btn btn-warning btn-block mt-3" style={{ marginRight: '10px' }} onClick={handleVerify}>
                                            Verificar Certificado
                                        </button>
                                        <button type="button" className="btn btn-danger btn-block mt-3" onClick={handleRevoke}>
                                            Revogar Certificado
                                        </button>
                                    </div>
                                    ) : (
                                        <div className="alert alert-danger text-center mt-3">
                                            Certificado Revogado - Nenhuma ação disponível
                                        </div>
                                    )}
                                </form>
                                {response && (
                                    <div className="mt-3">
                                        <h5>Resposta:</h5>
                                        <p className={`alert ${response.includes('não pode') ? 'alert-danger' : 'alert-success'}`}>
                                            {response}
                                        </p>
                                    </div>
                                )}
                                {certificateData && !revoked && (
                                    <div className="mt-3">
                                        <h5>Certificado Gerado:</h5>
                                        <p>{certificateData}</p>
                                    </div>
                                )}
                                {signature && (
                                    <div className="mt-3">
                                        <h5>Assinatura gerada:</h5>
                                        <p>{signature}</p>
                                    </div>
                                )}
                                {expirationDate && !revoked && (
                                    <div className="mt-3">
                                        <h5>Data de Expiração:</h5>
                                        <p>{expirationDate}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateForm;
