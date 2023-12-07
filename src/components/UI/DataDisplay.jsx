import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from '@mui/material';

const DataDisplay = ({ data, onAdd }) => {
  const [newData, setNewData] = useState({
    license_plate: '',
    brand: '',
    vin: '',
  });

  const handleChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    onAdd(newData);
    setNewData({
      license_plate: '',
      brand: '',
      vin: '',
    });
  };

  return (
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>License Plate</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>VIN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.license_plate}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell>{item.vin}</TableCell>
                  </TableRow>
              ))}
              {/* Добавленная строка для новых данных */}
              <TableRow >
                <TableCell>
                  <TextField
                      size={ "small" }
                      name="license_plate"
                      value={newData.license_plate}
                      onChange={handleChange}
                      variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                      size={ "small" }
                      name="brand"
                      value={newData.brand}
                      onChange={handleChange}
                      variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                      size={ "small" }
                      name="vin"
                      value={newData.vin}
                      onChange={handleChange}
                      variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={handleAdd}>
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
};

export default DataDisplay;