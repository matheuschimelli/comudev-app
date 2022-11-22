import * as React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { useState, useEffect } from 'react';
import { Box } from "@chakra-ui/react"
import io from 'socket.io-client'

function Editor({ roomId }) {
  const [userCode, setUserCode] = useState("");

  useEffect(() => {
    alert(roomId)
  }, [roomId])

  const handleCodeMirrorOnChange = (value, viewUpdate) => {
    setUserCode(value)
  }

  return (
    <Box display="flex" flexDir="row">
      <Box w="30%">
        <CodeMirror
          value="console.log('hello world!');"
          height="700px"
          width="auto"
          theme={dracula}
          extensions={[javascript({ jsx: true })]}
          onChange={handleCodeMirrorOnChange}
        />
      </Box>
      <Box>

        <iframe
          className="preview"
          srcDoc={userCode}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
        />
      </Box>

    </Box>

  );
}
export default Editor;