$( document ).ready(function() {
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/todos",
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            result.forEach(element => {
                let row = '<tr>'+
                        '<td>'+element.id+'</td>'+
                        '<td>'+element.title+'</td>'+
                        '<td>'+element.completed+'</td>'
                        '</tr>';
                $('#todoTable').append(row);
            });

            $('td:contains(true)')
            .parent()
            .addClass('complete');

            $('td:contains(false)')
            .parent()
            .addClass('incomplete');
        },
        error: function(result){
            console.log(result);
        }
    });

});
