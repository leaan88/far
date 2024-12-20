// Mock data for development
export const mockStock = [
  {
    id: '1',
    medicamentoId: 'med1',
    nombre: 'Paracetamol',
    cantidad: 100,
    fechaIngreso: '2023-12-01',
  },
  {
    id: '2',
    medicamentoId: 'med2',
    nombre: 'Ibuprofeno',
    cantidad: 50,
    fechaIngreso: '2023-12-01',
  },
];

export const mockDetenidos = [
  {
    id: '1',
    nombre: 'Juan Pérez',
    unidadSanitariaId: 'us1',
    medicamentos: [
      {
        id: 'med1',
        nombre: 'Paracetamol',
        cantidadDiaria: 2,
        fechaRecetado: '2023-12-01',
      },
    ],
  },
];

export const mockUnidadesSanitarias = [
  {
    id: 'us1',
    nombre: 'Unidad Sanitaria 1',
    actorId: 'actor1',
  },
  {
    id: 'us2',
    nombre: 'Unidad Sanitaria 2',
    actorId: null,
  },
];

export const mockActores = [
  {
    id: 'actor1',
    nombre: 'Carlos',
    apellido: 'González',
    dni: '12345678',
    unidadesSanitarias: ['us1'],
  },
];