import * as React from 'react';
import Entrar  from '../src/rooms/entrar';
import Criar  from '../src/rooms/criar';
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

export default function Portal() {
  return (
        <Box>
            <Box>
                <ThemeProvider theme={theme}>
                    <Typography variant="h1">
                        COMUDEV
                    </Typography>
                    <Typography variant="h5">
                        Para Comunidade Brasileira de Desenvolvimento Web
                    </Typography>
                </ThemeProvider>
            </Box>
            
            <Grid container spacing={1}>
            <Grid item xs={1}>
                <Entrar/>
            </Grid>
            <Grid item xs={1}>
                <Criar/>
            </Grid>
            <Grid item xs={10}>
            </Grid>               
        </Grid>
        </Box>
               
  );
}