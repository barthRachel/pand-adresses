//***************************************************//
//                  AJOUT CONTACT                   //
//*************************************************//

//récupération des inputs
const firstNameFile = document.getElementById("firstname");
const nameFile = document.getElementById('name');
const numberPhoneFile = document.getElementById('phone');
const emailFile = document.getElementById('email');
const addressFile = document.getElementById('address');
//récupérations des messages d'erreur respectifs
const firstNameError = document.getElementById('errorFirstName');
const nameError = document.getElementById('errorName');
const numberPhoneError = document.getElementById('errorPhone');
const emailError = document.getElementById('errorEmail');
//récupération du bouton d'ajout
const addButton = document.getElementById('add_btn');
//initialisation des constantes à envoyer
let firstName, lastName, numberPhone, email, address;
//création de booléens
let boolFirstName = true, boolName = true, boolPhoneNumber = true, boolMail = true;

firstNameFile.addEventListener('change', () => {
    if(firstNameFile.value.match("[0-9]")){
        firstNameError.innerText = "Votre prénom ne peut pas contenir de chiffre."
        firstNameFile.classList.remove('border-success')
        firstNameFile.classList.add('border-danger')
        boolFirstName = false;
    } else {
        if(firstNameFile.value.match(/^\s*$/g)) {
            firstNameError.innerText = "Ce champ est obligatoire."
            firstNameFile.classList.remove('border-success')
            firstNameFile.classList.add('border-danger')
            boolFirstName = false;
        } else if(firstNameFile.value.length < 3){
            firstNameError.innerText = "Vous devez rentrer un prénom valide..."
            firstNameFile.classList.remove('border-success')
            firstNameFile.classList.add('border-danger')
            boolFirstName = false;
        } else {
            firstNameError.innerText = ""
            firstNameFile.classList.remove('border-danger')
            firstNameFile.classList.add('border-success')
            boolFirstName = true;
        }
    }
})

nameFile.addEventListener('change', () => {
    if(nameFile.value.match("[0-9]")){
        nameError.innerText = "Votre nom ne peut pas contenir de chiffre."
        nameFile.classList.remove('border-success')
        nameFile.classList.add('border-danger')
        boolName = false;
    } else {
        if(nameFile.value.match(/^\s*$/g)) {
            nameError.innerText = "Ce champ est obligatoire."
            nameFile.classList.remove('border-success')
            nameFile.classList.add('border-danger')
            boolName = false;
        } else if(nameFile.value.length < 3){
            nameError.innerText = "Vous devez rentrer un nom valide..."
            nameFile.classList.remove('border-success')
            nameFile.classList.add('border-danger')
            boolName = false;
        } else {
            nameError.innerText = ""
            nameFile.classList.remove('border-danger')
            nameFile.classList.add('border-success')
            boolName = true;
        }
    }
})

numberPhoneFile.addEventListener('change', () => {
    if(numberPhoneFile.value.match("[0-9]")){
        if(numberPhoneFile.value.length !== 10){
            numberPhoneError.innerText = "Vous devez entrer un numéro de téléphone valide."
            numberPhoneFile.classList.remove('border-success')
            numberPhoneFile.classList.add('border-danger')
            boolPhoneNumber = false;
        } else {
            numberPhoneError.innerText = ""
            numberPhoneFile.classList.remove('border-danger')
            numberPhoneFile.classList.add('border-success')
            boolPhoneNumber = true;
        }
    } else {
        if(numberPhoneFile.value.match(/^\s*$/g)){
            numberPhoneError.innerText = "Ce champ est obligatoire."
            numberPhoneFile.classList.remove('border-success')
            numberPhoneFile.classList.add('border-danger')
            boolPhoneNumber = false;
        } else {
            numberPhoneError.innerText = "Vous devez entrer un numéro de téléphone valide."
            numberPhoneFile.classList.remove('border-success')
            numberPhoneFile.classList.add('border-danger')
            boolPhoneNumber = false;
        }
    }
})

emailFile.addEventListener('change', () => {
    if(!emailFile.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        if(emailFile.value.match(/^\s*$/g)){
            emailError.innerText = ""
            emailFile.classList.remove('border-danger')
            emailFile.classList.remove('border-success')
            boolMail = false;
        } else {
            emailError.innerText = "L'e-mail renseigner n'est pas correcte."
            emailFile.classList.remove('border-success')
            emailFile.classList.add('border-danger')
            boolMail = false;
        }
    } else {
        emailError.innerText = ""
        emailFile.classList.remove('border-danger')
        emailFile.classList.add('border-success')
        boolMail = true;
    }
})

addButton.addEventListener('click', (e) => {
    e.preventDefault();

    let boolTest = boolFirstName==true && boolName==true && boolPhoneNumber==true && boolMail==true;

    if(firstNameFile.value === "" && nameFile.value === "" && numberPhoneFile.value === ""){
        firstNameError.innerText = "Ce champ est obligatoire."; boolFirstName = false;
        nameError.innerText = "Ce champ est obligatoire."; boolName = false;
        numberPhoneError.innerText = "Ce champ est obligatoire."; boolPhoneNumber = false;

        firstNameFile.classList.remove('border-succes');
        nameFile.classList.remove('border-success');
        numberPhoneFile.classList.remove('border-success');

        firstNameFile.classList.add('border-danger');
        nameFile.classList.add('border-danger');
        numberPhoneFile.classList.add('border-danger');
    } else if(firstNameFile.value === "" || nameFile.value === "" || numberPhoneFile.value === ""){
        if(firstNameFile.value === "") {
            firstNameError.innerText = "Ce champ est obligatoire."; boolFirstName = false;
            firstNameFile.classList.remove('border-succes');
            firstNameFile.classList.add('border-danger');
        } else if(nameFile.value === ""){
            nameError.innerText = "Ce champ est obligatoire."; boolName = false;
            nameFile.classList.remove('border-succes');
            nameFile.classList.add('border-danger');
        } else if(numberPhoneFile.value === ""){
            numberPhoneError.innerText = "Ce champ est obligatoire."; boolPhoneNumber = false;
            numberPhoneFile.classList.remove('border-succes');
            numberPhoneFile.classList.add('border-danger');
        }
    } else if(boolTest == true){
        firstName = firstNameFile.value;
        lastName = nameFile.value;
        numberPhone = numberPhoneFile.value;
        email = emailFile.value;
        address = addressFile.value;

        createContact(firstName, lastName, numberPhone, email, address)
    }
})

function createContact(firstName, lastName, numberPhone, email, address){
    const classes = ["col-12", "border", "border-2", "border-danger", "my-1", "bg-primary", "rounded-pill"];
    console.log("Ca marche !")
    console.log(firstName)
    console.log(lastName)
    console.log(numberPhone)
    console.log(email)
    console.log(address)

    const contactPlace = document.getElementById(firstName[0].toLowerCase())
    console.log(contactPlace)

    const divContact = document.createElement("div");
    const contactName = document.createElement("h3");

    contactName.innerText = firstName + " " + lastName;

    divContact.appendChild(contactName);
    contactPlace.appendChild(divContact);
}