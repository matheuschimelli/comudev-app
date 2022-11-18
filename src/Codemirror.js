import * as React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { useState, useEffect } from 'react';

function Editor() {
  
  const [userCode, setUserCode] = useState("");
  useEffect(() => {

  },[userCode])

  const handleCodeMirrorOnChange = (value, viewUpdate) =>{
    setUserCode(value)
  }

    return (
        <CodeMirror
          value="console.log('hello world!');"
          height="700px"
          width = "auto"
          theme={dracula}
          extensions={[javascript({ jsx: true })]}
          onChange={handleCodeMirrorOnChange}
        />
      );
}
export default Editor;