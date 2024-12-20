import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

function FormField({ name, ...props }) {
  const [field, meta] = useField(name);
  
  return (
    <TextField
      {...field}
      {...props}
      fullWidth
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      margin="normal"
    />
  );
}

export default FormField;