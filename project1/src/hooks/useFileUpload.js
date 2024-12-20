import { useState } from 'react';
import { processExcelFile, processCsvFile } from '../utils/fileProcessing';
import { uploadActores, uploadDetenidos } from '../services/adminService';

export function useFileUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const uploadFile = async (type, file) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const fileExtension = file.name.split('.').pop().toLowerCase();
      let data;

      try {
        if (fileExtension === 'csv') {
          data = await processCsvFile(file);
        } else {
          data = await processExcelFile(file);
        }
      } catch (err) {
        throw new Error(`Error al procesar el archivo: ${err.message}`);
      }
      
      let response;
      try {
        if (type === 'actores') {
          response = await uploadActores(data);
        } else if (type === 'detenidos') {
          response = await uploadDetenidos(data);
        }
      } catch (err) {
        throw new Error(`Error al subir el archivo: ${err.message}`);
      }

      setSuccess(true);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { uploadFile, loading, error, success };
}