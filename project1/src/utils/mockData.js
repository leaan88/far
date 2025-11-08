// Mock data for development
export const mockStock = [
  {
    id: '1',
    medicamentoId: '1',
    lote: 'LOT-2024-001',
    fechaVencimiento: '2025-12-31',
    cantidad: 100,
    precioUnitario: 0.25,
    fechaIngreso: '2024-01-15',
    unidadSanitariaId: 'us1',
  },
  {
    id: '2',
    medicamentoId: '2',
    lote: 'LOT-2024-002',
    fechaVencimiento: '2025-06-30',
    cantidad: 50,
    precioUnitario: 0.35,
    fechaIngreso: '2024-01-20',
    unidadSanitariaId: 'us1',
  },
  {
    id: '3',
    medicamentoId: '3',
    lote: 'LOT-2024-003',
    fechaVencimiento: '2024-12-31',
    cantidad: 25,
    precioUnitario: 0.80,
    fechaIngreso: '2024-02-01',
    unidadSanitariaId: 'us1',
  },
  {
    id: '4',
    medicamentoId: '5',
    lote: 'LOT-2024-004',
    fechaVencimiento: '2026-03-15',
    cantidad: 8,
    precioUnitario: 1.20,
    fechaIngreso: '2024-02-10',
    unidadSanitariaId: 'us1',
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