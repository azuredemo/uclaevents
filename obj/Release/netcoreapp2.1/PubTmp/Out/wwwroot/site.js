const uri = 'api/UclaEvent';
let UclaEvents = null;
function getCount(data) {
    const el = $('#counter');
    let name = 'to-do';
    if (data) {
        if (data > 1) {
            name = 'to-dos';
        }
        el.text(data + ' ' + name);
    } else {
        el.html('No ' + name);
    }
}

$(document).ready(function () {
    getData();
});

function getData() {
    $.ajax({
        type: 'GET',
        url: uri,
        success: function (data) {
            $('#UclaEvents').empty();
            getCount(data.length);
            $.each(data, function (key, item) {
                $('<tr>' +
                    '<td>' + item.id + '</td>' +
                    '<td>' + item.name + '</td>' +
                    '<td>' + item.startDate + '</td>' +
                    '<td>' + item.location + '</td>' +
                    '<td>' + item.description + '</td>' +
                    '<td><button onclick="editItem(' + item.id + ')">Edit</button></td>' +
                    '<td><button onclick="deleteItem(' + item.id + ')">Delete</button></td>' +
                    '</tr>').appendTo($('#UclaEvents'));
            });

            UclaEvents = data;
        }
    });
}

function addUclaEvent() {
    const newEvent = {
        'startDate': $('#add-startDate').val(),
        'name': $('#add-name').val(),
        'location': $('#add-location').val(),
        'description': $('#add-description').val()    
     };

    alert(uri);
    $.ajax({
        type: 'POST',
        accepts: 'application/json',
        url: uri,
        contentType: 'application/json',
        data: JSON.stringify(newEvent),
        error: function (jqXHR, textStatus, errorThrown) {
            alert("ERROR White Submitting Data to WebAPI" + textStatus);
        },
        success: function (result) {
            getData();
            $('#add-name').val('');
            $('#add-startDate').val();
            $('#add-location').val('');
            $('#add-description').val('');                
        }
    });
}

function updateUclaEvent() {
    const newEvent = {
        'id': $('#edit-id').val(),
        'startDate': $('#edit-startDate').val(),
        'name': $('#edit-name').val(),
        'location': $('#edit-location').val(),
        'description': $('#edit-description').val()    
     };

    $.ajax({
        type: 'PUT',
        accepts: 'application/json',
        url: uri + '/' + $('#edit-id').val(),
        contentType: 'application/json',
        data: JSON.stringify(newEvent),
        error: function (jqXHR, textStatus, errorThrown) {
            $('#edit-description').val(JSON.stringify(jqXHR));
            alert(JSON.stringify(jqXHR) + "ERROR White Submitting Data to WebAPI" + textStatus + " " + errorThrown);
        },
        success: function (result) {
            getData();
        }
    });
}

function deleteItem(id) {
    $.ajax({
        url: uri + '/' + id,
        type: 'DELETE',
        success: function (result) {
            getData();
        }
    });
}

function editItem(id) {
    $.each(UclaEvents, function (key, item) {
        if (item.id === id) {
            $('#edit-name').val(item.name);
            $('#edit-id').val(item.id);
            $('#edit-startDate').val(item.startDate);
            $('#edit-location').val(item.location);
            $('#edit-description').val(item.description);                
        }
    });
    $('#spoiler').css({ 'display': 'block' });
}

function closeInput() {
    $('#spoiler').css({ 'display': 'none' });
}