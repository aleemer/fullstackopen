sequenceDiagram
    participant browser
    participant server

    Note right of browser: Browser already has all the relevant files, see exercise 0.5

    Note right of browser: Upon user typing a note and clicking 'Save'...
    Note right of browser: A callback executes that pushes the note onto our local array storing the notes, and redraws the notes
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: {"message": "note created"}
    deactivate server