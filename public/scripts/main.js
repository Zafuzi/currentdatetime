$(function () {
    addWarningListeners();
    addEditableListeners();
    addAddListener();
})

function addAddListener() {
    $('#add_form')
        .on('submit', function (evt) {
            evt.preventDefault();
            let key = this.elements['key'].value
            let value = this.elements['value'].value
            if (key.length > 0 && value.length > 0) {
                post("/add/" + key + "/" + value);
                window
                    .location
                    .reload()
            } else {
                alert("Please fill out both inputs to add a new pair.")
            }
        })
}

function addEditableListeners() {
    $('.update').on('click', (evt) => {
        let self = $(evt.currentTarget)
        let editable = self
            .siblings()
            .filter('.editable')
            .children();
        let key = editable.find('input[name=key]')[0].value;
        let value = editable.find('input[name=value]')[0].value;
        var res = post("/update/" + key + "/" + value);
        window
            .location
            .reload()
        if (res == "OK") {}
    })
}

function addWarningListeners() {
    $('.delete').on('click', (evt) => {
        let result = confirm('Are you sure you would like to complete this action?');
        if (result) {
            let self = $(evt.currentTarget)
            let editable = self
                .siblings()
                .filter('.editable')
                .children();
            console.log(editable);
            let key = editable.find('input[name=key]')[0].value;
            post('delete/' + key)
            window
                .location
                .reload()
        }
    })
}

function post(route) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            return this.responseText
        }
    };
    if (route.length > 0) {
        xhttp.open("GET", route, true);
        xhttp.send();
    }
}