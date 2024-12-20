import React from 'react';
import {
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function UserRow({ user, onEdit, onDelete }) {
  return (
    <TableRow>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.nombre}</TableCell>
      <TableCell>{user.unidadSanitaria?.nombre || 'Sin asignar'}</TableCell>
      <TableCell>{user.rol === 'admin' ? 'Administrador' : 'Actor'}</TableCell>
      <TableCell>
        <Tooltip title="Editar">
          <IconButton onClick={onEdit} size="small">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton 
            onClick={onDelete} 
            size="small" 
            color="error"
            disabled={user.rol === 'admin'}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

export default UserRow;