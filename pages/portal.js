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
                    <IconButton aria-label="send" color="primary">
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
                    <IconButton aria-label="send" color="primary">
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