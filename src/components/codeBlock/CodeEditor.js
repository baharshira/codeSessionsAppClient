import React, { useRef, useEffect } from 'react';
import io from 'socket.io-client';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-javascript';
import './CodeBlock.css';

const socket = io('http://localhost:3001');

const CodeEditor = (props) => {
    const editorRef = useRef(null);
    const hiddenTextareaRef = useRef(null);

    useEffect(() => {
        if (editorRef.current && hiddenTextareaRef.current) {
            editorRef.current.innerHTML = Prism.highlight(props.code, Prism.languages.javascript, 'javascript');
            hiddenTextareaRef.current.value = props.code;
        }
    }, [props.code]);

    const syncCode = () => {
        const code = hiddenTextareaRef.current.value;
        props.setSolution(code);
        editorRef.current.innerHTML = Prism.highlight(code, Prism.languages.javascript, 'javascript');
        socket.emit('codeChange', code);
    };

    const handleKeyDown = (event) => {
        const { key } = event;
        if (key === 'Tab') {
            event.preventDefault();
            const start = hiddenTextareaRef.current.selectionStart;
            const end = hiddenTextareaRef.current.selectionEnd;
            const value = hiddenTextareaRef.current.value;
            hiddenTextareaRef.current.value = value.substring(0, start) + '\t' + value.substring(end);
            hiddenTextareaRef.current.selectionStart = hiddenTextareaRef.current.selectionEnd = start + 1;
            syncCode();
        }
    };

    useEffect(() => {
        socket.on('codeUpdate', (updatedCode) => {
            if (editorRef.current && hiddenTextareaRef.current) {
                editorRef.current.innerHTML = Prism.highlight(updatedCode, Prism.languages.javascript, 'javascript');
                hiddenTextareaRef.current.value = updatedCode;
            }
        });
    }, []);

    return (
        <div className="code-editor">
            <pre ref={editorRef}>
                <code className="language-js"></code>
            </pre>
            <textarea
                ref={hiddenTextareaRef}
                className="hidden-textarea"
                onKeyDown={handleKeyDown}
                onInput={syncCode}
                onBlur={syncCode}
                autoFocus
            />
        </div>
    );
};

export default CodeEditor;
