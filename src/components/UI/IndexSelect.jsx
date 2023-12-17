import React, {Fragment, useEffect, useState} from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import axios from "axios";
import {LOAD_ORDER} from "../../reducers/types";

const IndexSelect = ({isService, indexArray, onSelectChange}) => {
    const [services, setServices] = useState([]);
    const [spares, setSpares] = useState([]);

    useEffect(() => {
        async function load_data(){
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            try {
                const res1 = await axios.get(`http://127.0.0.1:8000/api/service/spares/`, config);
                const res2 = await axios.get(`http://127.0.0.1:8000/api/service/services/`, config);

                setSpares(res1.data.results)
                setServices(res2.data.results)
            } catch (err) {
                console.log(`${err}`);
            }
        }
        load_data()
    }, []);

    return (
        <FormControl fullWidth>
            <InputLabel id="index-select-label">{isService ? "Выберите услугу" : "Выберите сотрудника"}</InputLabel>
            <Select
                labelId="index-select-label"
                id="index-select"
                label="Выберите индекс"
                onChange={(e) => onSelectChange(e.target.value)}
                sx={{marginTop: '12px'}}
            >

                {isService ?
                    <Fragment>
                        {
                            services.map((service) => (
                                <MenuItem key={service.id}>
                                    {service.name}
                                </MenuItem>
                            ))
                        }
                    </Fragment>
                    :
                    <Fragment>
                        {
                            spares.map((spare) => (
                                <MenuItem key={spare.id} >
                                    {spare.name}
                                </MenuItem>
                            ))
                        }
                    </Fragment>
                }
            </Select>
        </FormControl>
    );
};

export default IndexSelect;