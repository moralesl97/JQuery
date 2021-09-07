$( document ).ready(function() {
    
    getNotes();

    $(document).on("click", "#deleteBtn" , function() {
        var id = $(this).parents("tr").attr('id');
        $.ajax({
            url: `http://localhost:3000/notes/${id}`,
            contentType: "application/json",
            type:'DELETE',
            success: function(result){
                alert('Nota borrada Exitosamente')
                getNotes();
            },
            error: function(result){
                console.log(result);
            }
        });
    });

    function getNotes(){
        $("#notesTable tr:not(:nth-child(1))").remove();

        $.ajax({
            url: "http://localhost:3000/notes/",
            contentType: "application/json",
            dataType: 'json',
            success: function(result){
                result.forEach(element => {
                        let row = `<tr id=${element._id}>
                                <td id="noteTitle">${element.title}</td>
                                <td id="noteContent">${element.content}</td>
                                <td>
                                    <button id="editBtn">Edit</button>
                                    <button id="deleteBtn">Delete</button>
                                </td>
                                </tr>`;
                        $('#notesTable').append(row);
                });
            },
            error: function(result){
                alert('No se pude eliminar la nota');
                console.log(result);
            }
        });
    }

    $('#saveNoteBtn').click(function() {
        let noteTitle = document.getElementById("newNoteTitle");
        let noteContent = document.getElementById("newNoteContent");
        let data = JSON.stringify({
            title: noteTitle.value,
            content: noteContent.value
        })
        $.ajax({
            url: "http://localhost:3000/notes/",
            contentType: "application/json",
            dataType: 'json',
            type:'POST',
            data,
            success: function(result){
                alert('Nota Agregada Exitosamente')
                getNotes();
                noteTitle.value = '';
                noteContent.value = '';
            },
            error: function(result){
                alert('No se pude agregar la nota');
                console.log(result);
            }
        });
    });

    $(document).on("click", "#editBtn" , function() {
        var id = $(this).parents("tr").attr('id');
        
        noteTitle = $(this).parents("tr").children('#noteTitle');
        noteContent = $(this).parents("tr").children('#noteContent');

        console.log(noteTitle);

        noteTitle.replaceWith(`<td><input type="text" id="noteTitle" style="width: 80%;" value=${noteTitle[0].outerText}/></td>`);
        noteContent.replaceWith(`<td><input type="text" id="noteContent" style="width: 80%;" value=${noteContent[0].outerText}/></td>`);

        $(this).replaceWith(`<button id="confirmBtn">Confirm</button>`)
    });

    $(document).on("click", "#confirmBtn" , function() {
        var id = $(this).parents("tr").attr('id');
        noteTitle = $(this).parents("tr").children('td').children('#noteTitle').val();
        noteContent = $(this).parents("tr").children('td').children('#noteContent').val();

        console.log(`${noteTitle} ${noteContent}`);
    });

});

