

document.getElementById("edit-profile").addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("updated-profile").removeAttribute("class", "hide");
    document.getElementById("current-profile").setAttribute("class", "hide");
});

// initialize tool tips
var instance = M.Tooltip.getInstance(elem);
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems, options);
    instance.open();
  });