 function DeleteUserApi(id) {
    console.log(id);
    const element = document.getElementById(id);
    element.remove();
    fetch(`/user/delete?id=${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
        }
        
    }).then(response => {
        console.log('data is seccessful sent');
    }).catch(err => {
        console.log(err);
    })
}
function SortByAge() {
    console.log('sortByAge');
     const newState = { page: 'new-page' }; // Your custom state object
const newTitle = 'New Page Title'; // A new title for the page (optional)
const newUrl = '/sortByAge'; // The new URL

    history.replaceState(newState, newTitle, newUrl);
    window.location.reload();
    
}

function SortByName() {
    console.log('sortByName');
    const newState = { page: 'new-page' }; // Your custom state object
const newTitle = 'New Page Title'; // A new title for the page (optional)
const newUrl = '/sortByName'; // The new URL

    history.replaceState(newState, newTitle, newUrl);
    window.location.reload();
   
}