import * as React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import io from 'socket.io-client'

function Editor() {
  
  const [userCode, setUserCode] = useState("");
  useEffect(() => {

  },[userCode])

  const handleCodeMirrorOnChange = (value, viewUpdate) =>{
    setUserCode(value)
  }

    return (
        <>
          <Grid container>
            <Grid item xs={7}>
              <CodeMirror
                value="console.log('hello world!');"
                height="700px"
                width = "auto"
                theme={dracula}
                extensions={[javascript({ jsx: true })]}
                onChange={handleCodeMirrorOnChange}
              />
            </Grid>
            <Grid item xs={5}>
              <iframe
                className="preview"
                srcDoc={userCode}
                title="output"
                sandbox="allow-scripts"
                frameBorder="0"
              />
            </Grid>
          </Grid> 
        </>
        
      );
}
export default Editor;