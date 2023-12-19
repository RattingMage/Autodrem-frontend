import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
} from '@material-ui/core';
import Box from "@mui/material/Box";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Chat from "./UI/Chat";
import {connect} from "react-redux";
import {save_messages, update_repair} from "../actions/service";
import {FormControl, InputAdornment, InputLabel, OutlinedInput, Paper, Typography} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import dayjs from "dayjs";
import IndexSelect from "./UI/IndexSelect";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },
}));

const Repair = ({username, password, is_staff, repair_id, state_messages, update_repair, save_messages}) => {
    const classes = useStyles();

    const [problem, setProblem] = useState('');
    const [isRepairCreated, setIsRepairCreated] = useState(true)
    const [isRepairLoaded, setIsRepairLoaded] = useState(false)
    const [requests, setRequests] = useState([])
    const [value, setValue] = React.useState(dayjs());
    const [selectedIndex, setSelectedIndex] = useState(0); // Индекс, выбранный по умолчанию

    const indexArray = [0, 1, 2, 3, 4]; // Ваш массив индексов

    const handleIndexChange = (index) => {
        setSelectedIndex(index);
        // Здесь вы можете выполнить дополнительные действия при изменении индекса
    };

    useEffect( () => {
        if (repair_id !== null) setIsRepairLoaded(true)
        async function load_request() {
            const token = btoa(`${username}:${password}`);

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${token}`,
                }
            };

            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/service/repair-requests/`, config);
                setRequests(res.data)
            } catch (err) {
                console.log(`${err}`);
            }
        }
        load_request()
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProblem(value);
    };

    const handleSave = () => {
        update_repair({username: username, password: password, problem: problem, repair_id: repair_id})
        if(isRepairCreated) setIsRepairCreated((prevIsRepairCreated) => !prevIsRepairCreated);
    };

    const handleSaveRequest = () => {

    };

    const handleOpen = () => {
        setIsRepairCreated((prevIsRepairCreated) => !prevIsRepairCreated);
    }

    if(is_staff){
        return (
            <div>
                {requests.map((request) => (
                    <Paper key={request.id} className={classes.paper} elevation={3}>
                        <Typography variant="h6" gutterBottom>
                            Заявка #{request.id}
                        </Typography>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': {m: "10px", width: '28ch'},
                                '& .MuiBox-root': {m: "10px", width: '28ch'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Box>
                                <TextField
                                    id="outlined-helperText"
                                    label="Проблема"
                                    defaultValue={request.problem}
                                />
                            </Box>
                            <Box >
                                <DatePicker
                                    label="Дедлайн выполнения"
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                    sx={{m: 1}}
                                />
                            </Box>
                            <Box sx={{pl: 1}}>
                                <FormControl fullWidth sx={{m: 1}}>
                                    <InputLabel htmlFor="outlined-adornment-amount"
                                                sx={{marginTop: '-12px'}}>Стоимость</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        endAdornment={<InputAdornment position="end">$</InputAdornment>}
                                        label="Стоимость"

                                        sx={{pl: "5px"}}
                                    />
                                </FormControl>
                            </Box>
                            <Box sx={{pl: 1}}>
                                <IndexSelect isService={1} indexArray={request.services} onSelectChange={handleIndexChange}/>
                            </Box>
                            <Box sx={{pl: 1}}>
                                <IndexSelect isService={0} indexArray={request.employees} onSelectChange={handleIndexChange}/>
                            </Box>
                            <Box sx={{pl: 1}}>
                                <Button variant="contained" color="primary" onClick={handleSaveRequest}>
                                    Сохранить
                                </Button>
                            </Box>
                        </Box>
                        <Box>
                            <Button variant="contained" color="primary" onClick={handleOpen}>
                                Открыть чат
                            </Button>
                        </Box>
                        <Chat disable={isRepairCreated} username={username} repair_id={request.id} save_messages={save_messages} state_messages={state_messages}/>
                    </Paper>
                ))}
            </div>
        );
    }

    if(!isRepairLoaded) return (
        <Typography variant="h4" m={2} gutterBottom>
            Кажется сервис не работает попробуйте заново
        </Typography>
    )

    return (
        <Box
            sx={{
                width: "80%",
                position: 'absolute',
                top: '10%',
                left: '10%',
            }}
        >
            <Typography variant="h4" m={2} gutterBottom>
                Опишите вашу проблему
            </Typography>
            <TextField fullWidth label={'Описание проблемы'} id="margin-dense" margin="dense" onChange={handleChange}/>
            <Button variant="contained" color="primary" onClick={handleSave}>
                Отправить
            </Button>
            <Chat disable={isRepairCreated} username={username} repair_id={repair_id} save_messages={save_messages} state_messages={state_messages}/>
        </Box>
    );
};

const mapStateToProps = state => ({
    username: state.auth.username,
    password: state.auth.password,
    is_staff: state.auth.is_staff,
    repair_id: state.service.repair_request,
    state_messages: state.service.messages,
});

export default connect(mapStateToProps, {update_repair, save_messages})(Repair);