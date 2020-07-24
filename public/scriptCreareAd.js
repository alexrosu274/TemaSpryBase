function displayErrorMessage() {
     let titleError =  document.getElementsByClassName("titleError")[0]
     let descError  =  document.getElementsByClassName("descError")[0] 
     if(document.getElementById("title").value.length===150)
          titleError.style.display="block"
     else
          titleError.style.display="none"
     if(document.getElementById("description").value.length===500)
          descError.style.display="block"
     else
          descError.style.display="none"
}

function testPhoneNumber(){
     let regex = new RegExp('07[0-9]{8}');
     let phoneError=  document.getElementsByClassName("phoneError")[0]
     let phone=document.getElementById("phone").value;
     if(phone.length===10)
     {
          if(!regex.test(phone))
               phoneError.style.display="block"
          else
               phoneError.style.display="none"
     }
     else 
          phoneError.style.display="none"
}
