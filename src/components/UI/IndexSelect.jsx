import React, {Fragment, useEffect, useState} from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import axios from "axios";
import {LOAD_ORDER} from "../../reducers/types";

const IndexSelect = ({isService, indexArray}) => {
    const [services, setServices] = useState([]);
    const [spares, setSpares] = useState([]);
    const [value, setValue] = React.useState('');

    useEffect(() => {
        async function load_data(){
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            try {
                const res1 = await axios.get(`http://127.0.0.1:8000/api/auth/employees/`, config);
                const res2 = await axios.get(`http://127.0.0.1:8000/api/service/services/`, config);

                setSpares(res1.data)
                setServices(res2.data.results)
            } catch (err) {
                console.log(`${err}`);
            }
        }
        load_data()
    }, []);

    const handleChange = (event) => {
        console.log(event.target.value)
        setValue(event.target.value);
    };


    return (
        <FormControl fullWidth>
            <InputLabel id="index-select-label">{isService ? "Выберите услугу" : "Выберите сотрудника"}</InputLabel>
            <Select
                labelId="index-select-label"
                id="index-select"
                label="Выберите индекс"
                value={value}
                onChange={handleChange}
                sx={{marginTop: '12px'}}
            >

                {isService ? services.map((service) => (
                        <MenuItem key={service.id}  value={service.name} style={{ display: 'block' }}>
                            {service.name}
                        </MenuItem>
                    ))
                    : spares.map((spare) => (
                        <MenuItem key={spare.id} value={spare.first_name + " " + spare.last_name} style={{ display: 'block' }}>
                            {spare.first_name + " " + spare.last_name}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
};

export default IndexSelect;