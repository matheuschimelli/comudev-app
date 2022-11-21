import * as React from 'react';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { useRef, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { useStore } from '../src/store';
import axios from 'axios';

export default function Portal() {

    const inputRef = useRef();
    const roomIdRef = useRef();
    const toast = useToast();
    const [username, setUsername] = useState("")
    const [roomId, setRoomId] = useState("")

    /*const { mutateAsync } = useMutation(({ username, roomId, uri }) => {
          return axios.post(`http://localhost:3000/${uri}`, {
            username,
            roomId,
        })
    })*/

    const createRoom = async () => {
        const value = inputRef.current?.value

        if (!value) {
            alert("usuario em branco")
        }
        const result = await fetch("/sua-sala", {
            method: "POST",
            data: {
                username
            }
        })
        const idSala = await result.json()
        setRoomId(data.roomId)
        setUsername(value)
    }

    const enterRoom = async () => {
        const value = inputRef.current?.value
        const roomIdValue = roomIdRef.current?.value

        if (!value || !roomIdValue) {
            toast({
                title: 'Informe um id e nome válido',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            return
        }
        setRoomId(roomIdValue)
        setUsername(value)
    }

    return (
        <Box>
            <Box
                mt={20}
                ml={5}
            >
                <ThemeProvider theme={theme}>
                    <Typography variant="h1" color={'#fff'}>
                        COMUDEV
                    </Typography>
                    <Typography variant="h5" color={'#fff'}>
                        Para Comunidade Brasileira de Desenvolvimento Web
                    </Typography>
                </ThemeProvider>
                <Box mt={5}>
                    <Grid container spacing={1}>

                        <Grid item={3}>
                            <TextField
                                required
                                id="outlined-required"
                                placeholder="Seu apelido"
                                onChange={(e) => setUsername(e.target.value)}
                                ref={inputRef}
                            />
                        </Grid>

                        <Grid item={1}>
                            <IconButton aria-label="send" color="primary" onClick={createRoom}>
                                <SendIcon />
                            </IconButton>
                        </Grid>
                        <Grid item={8}></Grid>
                    </Grid>
                </Box>
                <Box mt={2}>
                    <Grid container spacing={1}>
                        <Grid item={3}>
                            <TextField
                                required
                                id="id"
                                placeholder="ID SALA"
                                ref={roomIdRef}
                                onChange={(e) => setRoomId(e.target.value)}
                            />
                        </Grid>
                        <Grid item={1}>
                            <IconButton aria-label="send" color="primary" onClick={enterRoom}>
                                <SendIcon />
                            </IconButton>
                        </Grid>
                        <Grid item={8}></Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>

    );
}