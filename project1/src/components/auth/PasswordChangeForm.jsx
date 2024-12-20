import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Alert } from '@mui/material';
import { passwordChangeSchema } from '../../utils/validation/schemas';
import PasswordField from '../forms/PasswordField';

function PasswordChangeForm({ onSubmit, error }) {
  return (
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      validationSchema={passwordChangeSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <PasswordField
            name="password"
            label="Nueva Contraseña"
            autoComplete="new-password"
          />
          
          <PasswordField
            name="confirmPassword"
            label="Confirmar Contraseña"
            autoComplete="new-password"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isSubmitting}
            sx={{ mt: 3 }}
          >
            Cambiar Contraseña
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default PasswordChangeForm;