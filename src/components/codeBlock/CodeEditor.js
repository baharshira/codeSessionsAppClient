import React, { useRef, useEffect } from 'react';
import io from 'socket.io-client';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-javascript';
import './CodeBlock.css';

const socket = io('https://code-session-app-server.onrender.com');


/**
 * Code Editor Component
 * @description A React component for displaying and editing code, with syntax highlighting and WebSocket synchronization.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.code - The code to be displayed and edited.
 * @param {Function} props.setSolution - A function to update the solution based on user input.
 * @param {boolean} props.isStudent - A boolean indicating whether the user is a student.
 * @returns {JSX.Element} The JSX element representing the Code Editor.
 */
const CodeEditor = (props) => {
    const editorRef = useRef(null);
    const hiddenTextareaRef = useRef(null);

    useEffect(() => {
        if (editorRef.current && hiddenTextareaRef.current) {
            editorRef.current.innerHTML = Prism.highlight(props.code, Prism.languages.javascript, 'javascript');
            hiddenTextareaRef.current.value = props.code;
        }
    }, [props.code]);


    /**
     * Sync Code
     * @description Syncs the code between the editor and hidden textarea, updating the solution and emitting a WebSocket event.
     */
    const syncCode = () => {
        const code = hiddenTextareaRef.current.value;
        props.setSolution(code);
        editorRef.current.innerHTML = Prism.highlight(code, Prism.languages.javascript, 'javascript');
        socket.emit('codeChange', code);
    };

    /**
     * Handle Key Down
     * @description Handles the keydown event, allowing indentation with the Tab key.
     */
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


    /**
     * Effect: Code Update from WebSocket
     * @description Listens for codeUpdate events from the WebSocket and updates the editor accordingly.
     */
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
                contentEditable={props.isStudent}
                disabled={!props.isStudent}
            />
        </div>
    );
};

export default CodeEditor;