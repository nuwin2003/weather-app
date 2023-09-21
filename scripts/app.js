const searchBox = document.getElementById('searchText');
const btnSearch = document.getElementById('btnSearch');
const alertWrongName = document.getElementById('alertWrongName');

btnSearch.addEventListener('click', e=>{
    console.log(searchBox.value);
    if(searchBox.value == "Colombo"){//condition needed
        alertWrongName.style.display = "block";
    }else{
        alertWrongName.style.display = "none";
    }

    searchBox.value = "";
});