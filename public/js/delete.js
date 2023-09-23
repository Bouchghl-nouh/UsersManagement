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
