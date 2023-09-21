const searchBox = document.getElementById('searchText');
const btnSearch = document.getElementById('btnSearch');
const alertWrongName = document.getElementById('alertWrongName');

btnSearch.addEventListener('click', e=>{
    console.log(searchBox.value);
    if(searchBox.value == "Colombo"){
        alertWrongName.style.display = "block";
    }
    searchBox.value = "";
});