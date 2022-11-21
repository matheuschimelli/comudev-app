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
import{ useRef } from 'react';
import { useToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { useStore } from '../src/store';
import axios from 'axios';

const inputRef = useRef();
const roomIdRef = useRef();
const toast = useToast();

const { setUsername, setRoomId } = useStore(({ setUsername, setRoomId }) => ({
      setUsername,
      setRoomId,
}))
  
const { mutateAsync } = useMutation(({ username, roomId, uri }) => {
      return axios.post(`http://localhost:3000/${uri}`, {
        username,
        roomId,
    })
})
  
const createRoom = async () => {
    const value = inputRef.current?.value
  
    if (!value) {
        toast({
          title: 'Please enter your username',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        return
      }
    await mutateAsync(
        { username: value, uri: '/sua-sala' },
        {
          onSuccess: ({ data }) => {
            setRoomId(data.roomId)
            toast({
              title: 'We created your username, you will find yourself in a room',
              description: 'Share the room id with anyone',
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
          },
        }
      )
      setUsername(value)
    }
  
const enterRoom = async () => {
    const value = inputRef.current?.value
    const roomIdValue = roomIdRef.current?.value
  
    if (!value || !roomIdValue) {
        toast({
          title: 'Please enter text in both inputs',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        return
      }
      setRoomId(roomIdValue)
      setUsername(value)
    }


export default function Portal() {
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
                    
                    <Grid item ={3}>
                        <TextField
                            required
                            id="outlined-required"
                            defaultValue="Seu apelido"
                        />
                    </Grid>
                    
                    <Grid item = {1}>
                    <IconButton aria-label="send" color="primary" onClick={createRoom}>
                        <SendIcon />
                    </IconButton>
                    </Grid>
                    <Grid item = {8}></Grid>
                </Grid>
                </Box>
                <Box mt={2}>
                <Grid container spacing={1}>
                    <Grid item ={3}>
                        <TextField
                            required
                            id="id"
                            label="ID SALA"
                        />
                    </Grid>
                    <Grid item = {1}>
                    <IconButton aria-label="send" color="primary" onClick={enterRoom}>
                        <SendIcon />
                    </IconButton>
                    </Grid>
                    <Grid item = {8}></Grid>
                </Grid>
                </Box>
            </Box>
        </Box>
               
  );
}