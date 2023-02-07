//***************************************************//
//                AFFICHAGE CONTACTS                //
//*************************************************//

showAllContacts()

function showAllContacts(){
    //récupération du localStorage
    var allContactsLS = JSON.parse(localStorage.getItem("allContacts")) || []
    //création des tableaux des classes a ajouter pour la mise en forme
    const classesDiv = ["col-12", "border", "border-2", "border-danger", "my-1", "bg-primary", "rounded"];
    const classesH3 = ["my-3"]

    for(i = 0 ; i < allContactsLS.length ; i++){
        //création des éléments pour chaque contact
        const divContact = document.createElement("div");
        const contactName = document.createElement("h3");

        //association des classes aux éléments
        for(let j = 0 ; j < classesDiv.length ; j++){
        divContact.classList.add(classesDiv[j]);
        }

        for(let k = 0 ; k < classesH3.length ; k++){
            contactName.classList.add(classesH3[k])
        }

        const contactPlace = document.getElementById(allContactsLS[i].firstName[0].toLowerCase())
        divContact.appendChild(contactName);
        contactName.innerText = allContactsLS[i].firstName + " " + allContactsLS[i].lastName;
        divContact.setAttribute('data-bs-toggle','modal');
        divContact.setAttribute('data-bs-target','#contactInformations')
        divContact.addEventListener("click", (e) => { showModal(e) })
        contactPlace.appendChild(divContact)

    }
}

//***************************************************//
//          AFFICHAGE INFORMATIONS CONTACT          //
//*************************************************//

function showModal(e){
    //récupération des éléments du modal
    const modalTitle = document.getElementById('modal-title');
    const modalPhone = document.getElementById('modal-phone');
    const modalMail = document.getElementById('modal-mail');
    const modalAddress = document.getElementById('modal-address');
    //récupération du localStorage
    var allContactsLS = JSON.parse(localStorage.getItem("allContacts")) || []
    
    const actualContactName = e.target.innerText.split(" ");
    const placeInLocalStorage = allContactsLS.findIndex(contactTest => contactTest.firstName == actualContactName[0] && contactTest.lastName == actualContactName[1]);
            
    modalTitle.innerText = e.target.innerText
    console.log(allContactsLS[placeInLocalStorage])

    modalPhone.innerText = "Numéro : " + allContactsLS[placeInLocalStorage].numberPhone
    modalMail.innerText = "Mail : " + allContactsLS[placeInLocalStorage].email;
    modalAddress.innerText = "Adresse : " + allContactsLS[placeInLocalStorage].address
}

//***************************************************//
//                SUPPRESSION CONTACT               //
//*************************************************//

const modalDelete = document.getElementById('modal-delete')
modalDelete.addEventListener("click", () => {
    const allContactsLS = JSON.parse(localStorage.getItem("allContacts")) || []
    const modalPhone = document.getElementById('modal-phone').innerText.split(' : ')[1]
    console.log(modalPhone)

    for(let i = 0 ; i < allContactsLS.length ; i++){
        if(allContactsLS[i].numberPhone == modalPhone){
            allContactsLS.splice(i,1)
            localStorage.setItem("allContacts", JSON.stringify(allContactsLS));
            alert("Le contact va être supprimeé !")
            window.location.reload();
        }
    }
})

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

        let contact = {
            firstName : firstNameFile.value,
            lastName : nameFile.value,
            numberPhone : numberPhoneFile.value,
            email : emailFile.value,
            address : addressFile.value  
        }

        writeContact(contact)
    }
})

function writeContact(contact){
    //contact = [firstName, lastName, numberPhone, email, address]

    var allContactsLS = JSON.parse(localStorage.getItem("allContacts")) || []
    //console.log(allContactsLS)


    //on vérifie si le contact/numéro existe déjà
    var alreadyAdd =  allContactsLS.findIndex(contactTest => contactTest.firstName == contact.firstName  && contactTest.lastName == contact.lastName && contactTest.numberPhone == contact.numberPhone);
    var numberAlreadyKnown = allContactsLS.findIndex(contactTest => contactTest.numberPhone == contact.numberPhone);
    console.log(alreadyAdd)
    if(alreadyAdd == 0){
        window.alert(contact.firstName + " " + contact.lastName + " existe déjà...")
    } else if (numberAlreadyKnown == 0){
        window.alert(contact.numberPhone + " est déjà associé a " + allContactsLS[numberAlreadyKnown].firstName + " " + allContactsLS[numberAlreadyKnown].lastName)
    } else {
        allContactsLS.push(contact)  
        localStorage.setItem("allContacts", JSON.stringify(allContactsLS))

        window.alert(contact.firstName + " " + contact.lastName + " a bien été ajouté !")

        location.reload();
    }
}