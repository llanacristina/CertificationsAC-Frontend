import axios from 'axios';

// Definição da URL do backend
const API_URL = 'http://localhost:3000/api/certificates';

interface CertificateData {
    data: string;
}

interface ApiResponse {
    message?: string;
    error?: string;
}

// Função para assinar um certificado
export const signCertificate = async (data: CertificateData): Promise<ApiResponse> => {
    try {
        const response = await axios.post<ApiResponse>(`${API_URL}/sign`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao assinar certificado:', error);
        throw error;
    }
};

// Função para verificar um certificado
export const verifyCertificate = async (data: CertificateData): Promise<ApiResponse> => {
    try {
        const response = await axios.post<ApiResponse>(`${API_URL}/verify`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao verificar certificado:', error);
        throw error;
    }
};

// Função para revogar um certificado
export const revokeCertificate = async (data: CertificateData): Promise<ApiResponse> => {
    try {
        const response = await axios.post<ApiResponse>(`${API_URL}/revoke`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao revogar certificado:', error);
        throw error;
    }
};
