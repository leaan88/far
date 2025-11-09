import api from '../utils/api';

const isDev = import.meta.env.DEV;

// Mock data para desarrollo
const mockMedicamentos = [
  {
    id: '1',
    codigoInterno: 'MED-001',
    nombreComercial: 'Paracetamol',
    principioActivo: 'Paracetamol',
    presentacion: 'Comprimido 500mg',
    unidadMedida: 'unidad',
    stockMinimo: 50,
    stockMaximo: 500,
    categoria: 'Analgésico',
    activo: true,
  },
  {
    id: '2',
    codigoInterno: 'MED-002',
    nombreComercial: 'Ibuprofeno',
    principioActivo: 'Ibuprofeno',
    presentacion: 'Comprimido 400mg',
    unidadMedida: 'unidad',
    stockMinimo: 40,
    stockMaximo: 400,
    categoria: 'Antiinflamatorio',
    activo: true,
  },
  {
    id: '3',
    codigoInterno: 'MED-003',
    nombreComercial: 'Amoxicilina',
    principioActivo: 'Amoxicilina',
    presentacion: 'Comprimido 500mg',
    unidadMedida: 'unidad',
    stockMinimo: 30,
    stockMaximo: 300,
    categoria: 'Antibiótico',
    activo: true,
  },
  {
    id: '4',
    codigoInterno: 'MED-004',
    nombreComercial: 'Omeprazol',
    principioActivo: 'Omeprazol',
    presentacion: 'Cápsula 20mg',
    unidadMedida: 'unidad',
    stockMinimo: 25,
    stockMaximo: 250,
    categoria: 'Antiácido',
    activo: true,
  },
  {
    id: '5',
    codigoInterno: 'MED-005',
    nombreComercial: 'Losartán',
    principioActivo: 'Losartán',
    presentacion: 'Comprimido 50mg',
    unidadMedida: 'unidad',
    stockMinimo: 30,
    stockMaximo: 300,
    categoria: 'Antihipertensivo',
    activo: true,
  },
  {
    id: '6',
    codigoInterno: 'MED-006',
    nombreComercial: 'Metformina',
    principioActivo: 'Metformina',
    presentacion: 'Comprimido 850mg',
    unidadMedida: 'unidad',
    stockMinimo: 35,
    stockMaximo: 350,
    categoria: 'Antidiabético',
    activo: true,
  },
  {
    id: '7',
    codigoInterno: 'MED-007',
    nombreComercial: 'Enalapril',
    principioActivo: 'Enalapril',
    presentacion: 'Comprimido 10mg',
    unidadMedida: 'unidad',
    stockMinimo: 30,
    stockMaximo: 300,
    categoria: 'Antihipertensivo',
    activo: true,
  },
  {
    id: '8',
    codigoInterno: 'MED-008',
    nombreComercial: 'Diclofenac',
    principioActivo: 'Diclofenac',
    presentacion: 'Comprimido 75mg',
    unidadMedida: 'unidad',
    stockMinimo: 20,
    stockMaximo: 200,
    categoria: 'Antiinflamatorio',
    activo: true,
  },
  {
    id: '9',
    codigoInterno: 'MED-009',
    nombreComercial: 'Loratadina',
    principioActivo: 'Loratadina',
    presentacion: 'Comprimido 10mg',
    unidadMedida: 'unidad',
    stockMinimo: 15,
    stockMaximo: 150,
    categoria: 'Antihistamínico',
    activo: true,
  },
  {
    id: '10',
    codigoInterno: 'MED-010',
    nombreComercial: 'Salbutamol',
    principioActivo: 'Salbutamol',
    presentacion: 'Aerosol 100mcg',
    unidadMedida: 'unidad',
    stockMinimo: 10,
    stockMaximo: 100,
    categoria: 'Broncodilatador',
    activo: true,
  },
];

/**
 * Obtiene todos los medicamentos activos
 */
export async function fetchMedicamentos() {
  if (isDev) {
    return mockMedicamentos;
  }
  const response = await api.get('/medicamentos');
  return response.data;
}

/**
 * Obtiene un medicamento por ID
 */
export async function fetchMedicamentoById(id) {
  if (isDev) {
    return mockMedicamentos.find(m => m.id === id);
  }
  const response = await api.get(`/medicamentos/${id}`);
  return response.data;
}

/**
 * Crea un nuevo medicamento
 */
export async function createMedicamento(data) {
  if (isDev) {
    return { ...data, id: Date.now().toString(), activo: true };
  }
  const response = await api.post('/medicamentos', data);
  return response.data;
}

/**
 * Actualiza un medicamento existente
 */
export async function updateMedicamento(id, data) {
  if (isDev) {
    return { ...data, id };
  }
  const response = await api.put(`/medicamentos/${id}`, data);
  return response.data;
}

/**
 * Desactiva un medicamento (soft delete)
 */
export async function deleteMedicamento(id) {
  if (isDev) {
    return { id, activo: false };
  }
  const response = await api.delete(`/medicamentos/${id}`);
  return response.data;
}

/**
 * Busca medicamentos por nombre o código
 */
export async function searchMedicamentos(query) {
  if (isDev) {
    const lowerQuery = query.toLowerCase();
    return mockMedicamentos.filter(
      m =>
        m.nombreComercial.toLowerCase().includes(lowerQuery) ||
        m.codigoInterno.toLowerCase().includes(lowerQuery) ||
        m.principioActivo.toLowerCase().includes(lowerQuery)
    );
  }
  const response = await api.get(`/medicamentos/search?q=${query}`);
  return response.data;
}
