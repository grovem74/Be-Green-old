// document.getElementById("edit-profile").addEventListener("click", function(e){
//     e.preventDefault();
//     document.getElementById("updated-profile").removeAttribute("class", "hide");
//     document.getElementById("current-profile").setAttribute("class", "hide");
// });

document.getElementById('register-button').addEventListener('click', function(e){
    e.preventDefault();
    console.log('whatever');
    var newUser = {
        name: $('#register-name').val(),
        email: $('#register-email').val(),
        password: $('#register-password').val()
    };
    $.ajax('/api/user', {
        type: 'POST',
        data: newUser
    }).then(function(data) {
        console.log('yup', data);
    });
    $.ajax('/api/user', {
        type: 'GET',
        data: newUser
    }).then(function(data) {
        console.log('yup', data);
    });
});