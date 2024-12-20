import * as XLSX from 'xlsx';

export function processActoresExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        
        // Get all rows starting from row 2
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        const actores = [];
        
        for (let row = 2; row <= range.e.r; row++) {
          const unidadSanitaria = worksheet[`A${row}`]?.v;
          const nombreCompleto = worksheet[`J${row}`]?.v;
          
          if (unidadSanitaria && nombreCompleto) {
            // Generate username from full name
            const nombres = nombreCompleto.trim().split(' ');
            const username = nombres.reduce((acc, curr, idx) => {
              if (idx === 0) return curr.toLowerCase();
              return acc + curr.charAt(0).toUpperCase();
            }, '');
            
            actores.push({
              nombreCompleto,
              unidadSanitaria,
              username,
              requirePasswordChange: true
            });
          }
        }
        
        resolve(actores);
      } catch (error) {
        reject(new Error('Error al procesar el archivo de actores'));
      }
    };
    
    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.readAsArrayBuffer(file);
  });
}