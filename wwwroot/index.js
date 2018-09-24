const uri = 'api/UclaEvent';

let UclaEvents = null;

function getCount(data) {
    const el = $('#counter');
    let name = 'Event';
    if (data) {
        if (data > 1) {
            name = 'Events';
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
                    '<th scope="row">' + item.id + '</th>' +
                    '<td>' + item.name + '</td>' +
                    '<td>' + item.startDate + '</td>' +
                    '<td>' + item.location + '</td>' +
                    '<td>' + item.description + '</td>' +
                    '<td><button onclick="editUclaEvent(' + item.id + ')" class="btn btn-info">Edit</button></td>' +
                    '<td><button onclick="deleteUclaEvent(' + item.id + ')" class="btn btn-danger">Delete</button></td>' +
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
            alert(JSON.stringify(jqXHR) + "ERROR White submitting data to WebAPI" + textStatus + " " + errorThrown);
        },
        success: function (result) {
            toggleEdit(false);
            getData();
            $('#edit-name').val('');
            $('#edit-startDate').val();
            $('#edit-location').val('');
            $('#edit-description').val('');                
        }
    });
}

function deleteUclaEvent(id) {
    if (confirm('Are you sure you want to delete ' + id + '?')) {
        $.ajax({
            url: uri + '/' + id,
            type: 'DELETE',
            success: function (result) {
                getData();
            }
         });
        toggleEdit(false);
    }
}

function editUclaEvent(id) {
    $.each(UclaEvents, function (key, item) {
        if (item.id === id) {
            $('#edit-name').val(item.name);
            $('#edit-id').val(item.id);
            $('#edit-startDate').val(item.startDate);
            $('#edit-location').val(item.location);
            $('#edit-description').val(item.description);  
            toggleEdit(true);
        }
    });
    $('#spoiler').css({ 'display': 'block' });
}

function closeInput() {
    $('#edit-block').css({ 'display': 'none' });
}

function toggleAdd() {
    var x = document.getElementById("add-block");
    if (x.style.display === "none") {
        toggleEdit(false);
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function toggleEdit(force) {
    var x = document.getElementById("edit-block");
    var addBlock = document.getElementById("add-block");
    if (force) {
        addBlock.style.display = "none";
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}