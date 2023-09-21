const searchBox = document.getElementById('searchText');
const btnSearch = document.getElementById('btnSearch');
const alertWrongName = document.getElementById('alertWrongName');
const locationOnNavbar = document.getElementById('locationOnNavbar');

btnSearch.addEventListener('click', e=>{
    console.log(searchBox.value);
    if(searchBox.value == "Colombo"){//condition needed
        alertWrongName.style.display = "block";
    }else{
        alertWrongName.style.display = "none";
        locationOnNavbar.innerText = searchBox.value;
    }


    
    searchBox.value = "";
});