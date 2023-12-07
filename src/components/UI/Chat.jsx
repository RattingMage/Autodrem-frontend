import React, {useEffect, useState} from 'react';
import Pusher from "pusher-js";
import {Button, List, ListItem, ListItemText, makeStyles, Paper, TextField} from "@material-ui/core";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginTop: 15,
        justifyContent: 'center',
    },
    messageInput: {
        display: 'flex',
        width: '100%',
        margin: theme.spacing(1),
    },
    messageList: {
        minHeight: 30,
        maxHeight: '300px',
        overflow: 'auto',
    },
    centerButton: {
        display: 'flex',
        justifyContent: 'right',
        marginTop: theme.spacing(2),
    },
}));

const Chat = ({disable, username,  repair_id, save_messages, state_messages}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // const [isLoad, setIsLoad] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        // if(!isLoad){
        //     setMessages(state_messages);
        //     setIsLoad(true);
        // }

        const pusher = new Pusher('1b73ff2cb6205e81e98b', {
            cluster: 'eu',
            encrypted: true,
        });

        const channel = pusher.subscribe(`chat-${repair_id}`);
        channel.bind('message', (data) => {
            setMessages([...messages, data]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [messages]);

    const handleSendMessage = async () => {
        if (newMessage.trim() !== '') {
            const response = await fetch('http://127.0.0.1:8000/api/chat/messages/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: newMessage, sender: username, chat_id: repair_id }),
            });

            const data = await response.json();
            setMessages([...messages, data]);
            setNewMessage('');
            save_messages({message: data});
            console.log(messages)
        }
    };

    if(disable){
        return <div/>;
    }

    return (
        <Paper className={classes.root} elevation={12}>

            <List className={classes.messageList}>
                {messages.map((message) => (
                    <ListItem key={message.id}>
                        <ListItemText primary={`${message.sender}: ${message.text}`}/>
                    </ListItem>
                ))}
            </List>
            <Box className={classes.centerButton}>
                <TextField
                    className={classes.messageInput}
                    label="Type a message"
                    variant="outlined"
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <Box margin={2}>
                    <Button variant="contained" endIcon={<SendIcon/>} onClick={handleSendMessage}>
                        Send
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default Chat;