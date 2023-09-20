const searchBox = document.getElementById('searchText');
const btnSearch = document.getElementById('btnSearch');

btnSearch.addEventListener('click', e=>{
    console.log(searchBox.value);
    searchBox.value = "";
});