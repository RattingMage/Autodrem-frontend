import React, {useEffect, useState} from 'react';
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
  const [formData, setFormData] = useState([]);
  const [newData, setNewData] = useState({
    license_plate: '',
    brand: '',
    vin: '',
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    setFormData(data)
  }, []);

  const validateLicense = (value) => {
    const licenseRegex = /^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/ui
    return licenseRegex.test(value);
  };

  const handleChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
    if(e.target.name === "license_plate"){
      setError(!validateLicense(e.target.value));
    }
  };

  const handleAdd = () => {
    onAdd(newData);
    setFormData([...formData, newData])
    setNewData({
      license_plate: '',
      brand: '',
      vin: '',
    });
  };

  const generateTableBody = () => {
    return (
        <TableBody>
          {formData.map((item) => (
              <TableRow key={item.id}>
                <TableCell sx={{ color: "white" }}>{item.license_plate}</TableCell>
                <TableCell sx={{ color: "white" }}>{item.brand}</TableCell>
                <TableCell sx={{ color: "white" }}>{item.vin}</TableCell>
              </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <TextField
                  size={"small"}
                  name="license_plate"
                  value={newData.license_plate}
                  onChange={handleChange}
                  variant="outlined"
                  error={error}
                  helperText={error ? 'Некорректный гос.номер' : ''}
              />
            </TableCell>
            <TableCell>
              <TextField
                  size={"small"}
                  name="brand"
                  value={newData.brand}
                  onChange={handleChange}
                  variant="outlined"
              />
            </TableCell>
            <TableCell>
              <TextField
                  size={"small"}
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
    );
  };

  return (
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Гос. номер</TableCell>
                <TableCell sx={{ color: "white" }}>Марка</TableCell>
                <TableCell sx={{ color: "white" }}>ВИН номер</TableCell>
              </TableRow>
            </TableHead>
            {generateTableBody()}
          </Table>
        </TableContainer>
      </div>
  );
};

export default DataDisplay;