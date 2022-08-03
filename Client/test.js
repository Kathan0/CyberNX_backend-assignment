function goToRegister(){
        var loc = window.location.pathname;
        var dir = loc.substring(0, loc.lastIndexOf('/'));
        dir += "/register.html";
        location.href = dir;
      }
function goToLogin(){
        var loc = window.location.pathname;
        var dir = loc.substring(0, loc.lastIndexOf('/'));
        dir += "/login.html";
        location.href = dir;
      }

function goRegister(){

    const form = new FormData();

    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const password = document.getElementById("password").value;
    const ph_no = document.getElementById("ph_no").value;
    const image = document.getElementById("image")

    document.getElementById("first_name").value = "";
    document.getElementById("last_name").value = "";
    document.getElementById("password").value = "";

    let config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data"
        }
    }
    form.append("first_name", first_name);
    form.append("last_name", last_name);
    form.append("password", password);
    form.append("ph_no", ph_no);
    form.append("image", image.files[0]);

    console.log(form);

    let URL = 'http://localhost:4000/register';

    axios.post(URL, form, config)
    .then(res=>{
        console.log(res.data);
    })


}

function onSubmit(){
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const password = document.getElementById("password").value;

    // document.getElementById("first_name").value = "";
    // document.getElementById("last_name").value = "";
    // document.getElementById("password").value = "";

    let config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
    }

    data = {first_name: first_name, last_name: last_name, password: password}

    let URL = 'http://localhost:4000/login';

    axios.get(URL, data, config)
    .then(res=>{
        data = res.data;
        if(data.message == 1){
            console.log("Request valid");

            localStorage.setItem("id", res.result.id);
            console.log(localStorage);
            
            var loc = window.location.pathname;
            var dir = loc.substring(0, loc.lastIndexOf('/'));
            dir += "/index.html";
            location.href = dir;
        }
        else if(data.message == 0){
            console.log("Missing data");

            alert('Please check your credentials and Try again !!');
            var loc = window.location.pathname;
            var dir = loc.substring(0, loc.lastIndexOf('/'));
            dir += "/login.html";
            location.href = dir;
        }
        else if(data.message == -1){
            console.log("Request invalid");

            alert('Please fill complete details !!');
        }
        else;
        
    })

}