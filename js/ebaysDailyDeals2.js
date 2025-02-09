function toggleDropdown() {
    var dropdown = document.getElementById("dropdownMenu");
    if (dropdown.style.display === "flex") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "flex";
    }
}

// Close dropdown when clicking outside
document.addEventListener("click", function(event) {
    var dropdown = document.getElementById("dropdownMenu");
    var button = document.querySelector(".dropbtn");

    if (!button.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = "none";
    }
});
