

document.getElementById("edit-profile").addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("updated-profile").removeAttribute("class", "hide");
    document.getElementById("current-profile").setAttribute("class", "hide");
});

