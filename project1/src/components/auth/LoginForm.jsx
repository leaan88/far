import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Alert } from '@mui/material';
import { loginSchema } from '../../utils/validation/schemas';
import FormField from '../forms/FormField';
import PasswordField from '../forms/PasswordField';

function LoginForm({ onSubmit, error }) {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <FormField
            name="username"
            label="Usuario"
            autoComplete="username"
          />
          
          <PasswordField
            name="password"
            label="Contraseña"
            autoComplete="current-password"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isSubmitting}
            sx={{ mt: 3 }}
          >
            Iniciar Sesión
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;