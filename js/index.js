//***************************************************//
//                AFFICHAGE CONTACTS                //
//*************************************************//

showAllContacts()

function showAllContacts(){
    //récupération du localStorage
    var allContactsLS = JSON.parse(localStorage.getItem("allContacts")) || []
    //création des tableaux des classes a ajouter pour la mise en forme
    const classesDiv = ["col-12", "my-1", "bg-secondary", "rounded", "col-md-5", "mx-md-1", "resSearchContacts", "resetContacts"];
    const classesH3 = ["my-3", "text-light", "fs-4"]
    //tri dans l'ordre alphabétique
    allContactsLS.sort(function(a,b){
        if(a.firstName < b.firstName){
            return -1
        } else {
            return 1
        }
    });

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
        divContact.classList.add(allContactsLS[i].firstName.toLowerCase() + "-" + allContactsLS[i].lastName.toLowerCase() + "-test")
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
    //console.log(allContactsLS[placeInLocalStorage])

    modalPhone.innerText = "Numéro : " + allContactsLS[placeInLocalStorage].numberPhone
    modalMail.innerText = "Mail : " + allContactsLS[placeInLocalStorage].email;
    modalAddress.innerText = "Adresse : " + allContactsLS[placeInLocalStorage].address
}

//***************************************************//
//               MODIFICATION CONTACT               //
//*************************************************//

//récupération des boutons
const modalModification = document.getElementById('modalModification')
const contactInformations = document.getElementById('contactInformations')
const btnCloseInformations = document.getElementById('closeInformations')
const btnCloseModify = document.getElementById('closeModify')
const btnModalModifyDismiss = document.getElementById('modal-modify-dismiss')

//récupération du formulaire de modification
var firstNameModify = document.getElementById('firstnameM');
var nameModify = document.getElementById('nameM');
var phoneModify = document.getElementById('phoneM');
var emailModify = document.getElementById('emailM');
var addressModify = document.getElementById('addressM');

var allContactsLS = JSON.parse(localStorage.getItem("allContacts")) || []
var contactPlace;

const modalModify = document.getElementById('modal-modify') //Bouton "Modifier"
modalModify.addEventListener('click', () => {
    //récupération des information du contact affiché dans le but de le modifier
    let numberPhoneActual = document.getElementById('modal-phone').innerText.split(' : ')[1]
    let firstNameActual = document.getElementById('modal-title').innerText.split(' ')[0]
    let nameActual = document.getElementById('modal-title').innerText.split(' ')[1]
    let emailActual = document.getElementById('modal-mail').innerText.split(' : ')[1]
    let addressActual = document.getElementById('modal-address').innerText.split(' : ')[1]
    //gestion email & adresse nulle
    if(emailActual === undefined || emailActual === null){
        emailActual = ""
    }
    if(addressActual === undefined || addressActual === null){
        addressActual = ""
    }

    //récupération de la place du contact dans le LS
    contactPlace = allContactsLS.findIndex(contactTest => contactTest.firstName == firstNameActual && contactTest.lastName == nameActual && contactTest.numberPhone == numberPhoneActual);

    modalModification.style.display = 'none';
    contactInformations.style.display = 'block';

    //préremplissage des inputs dans le but de les modifier
    firstNameModify.value = firstNameActual
    nameModify.value = nameActual
    phoneModify.value = numberPhoneActual
    emailModify.value = emailActual
    addressModify.value = addressActual
})

const modalModifyValidity = document.getElementById('modal-modify-validity') //Bouton "Confirmer"
modalModifyValidity.addEventListener('click', () => {
    //récupération du contact à modifier
    var contactActual = allContactsLS[contactPlace]

    var numberTempModify = ""
    if(phoneModify.value[0] === "0"){
        for(let i = 1 ; i < phoneModify.value.length ; i++){
            numberTempModify += phoneModify.value[i]
            console.log(numberTempModify)
        }
    } else if(phoneModify.value[0] === "+"){
        for(let j = 3 ; j < phoneModify.value.length ; j++){
            numberTempModify += phoneModify.value[j]
            console.log(numberTempModify)
        }
    }
    console.log(numberTempModify)

    var contactExists = allContactsLS.findIndex(contactTest => contactTest.firstName === firstNameModify.value && contactTest.lastName === nameModify.value && contactTest.numberPhone === phoneModify.value);
    var numberExists = allContactsLS.findIndex(contactTest => contactTest.numberPhone.includes(numberTempModify));
    console.log(contactExists)
    console.log(numberExists)

    if(contactExists != -1){
        alert("Ce contact existe déjà...")
    } else if(numberExists != -1){
        console.log("place : " + numberExists)
        if(firstNameModify.value !== allContactsLS[numberExists].firstName && nameModify.value !== allContactsLS[numberExists].lastName){
            alert("Ce numéro est déjà associé à " + allContactsLS[numberExists].firstName + " " + allContactsLS[numberExists].lastName)
        } else if((contactActual.firstName === firstNameModify.value && contactActual.lastName === nameModify.value) || (contactActual.firstName === firstNameModify.value && contactActual.numberPhone === phoneModify.value) || (contactActual.lastName === nameModify.value && contactActual.numberPhone === phoneModify.value)){
            //modification des informations déjà existante
            contactActual['firstName'] = firstNameModify.value;
            contactActual['lastName'] = nameModify.value;
            contactActual['numberPhone'] = phoneModify.value;
            contactActual['address'] = addressModify.value;
            contactActual['email'] = emailModify.value;

            alert("Le contact " + contactActual.firstName + " " + contactActual.lastName + " a bien été modifié.")

            //modification dans le LS
            localStorage.setItem("allContacts", JSON.stringify(allContactsLS))

            location.reload() 
        } else {
            alert("Ce numéro est déjà associé à " + allContactsLS[numberExists].firstName + " " + allContactsLS[numberExists].lastName)
        }
  } else {
        //modification des informations déjà existante
        contactActual['firstName'] = firstNameModify.value;
        contactActual['lastName'] = nameModify.value;
        contactActual['numberPhone'] = phoneModify.value;
        contactActual['address'] = addressModify.value;
        contactActual['email'] = emailModify.value;

        alert("Le contact " + contactActual.firstName + " " + contactActual.lastName + " a bien été modifié.")

        //modification dans le LS
        localStorage.setItem("allContacts", JSON.stringify(allContactsLS))

        location.reload()  
    }  
})

btnCloseModify.addEventListener('click', () => {
    modalModification.style.display = 'none';
    location.reload()
})

btnCloseInformations.addEventListener('click', () => {
    contactInformations.style.display = 'none';
    location.reload()
})

btnModalModifyDismiss.addEventListener('click', () => {
    modalModification.style.display = 'block';
    contactInformations.style.display = 'none';    
})

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
            alert("Le contact va être supprimé !")
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

//vérification input prénom
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

//vérification input nom
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

//vérification input numéro
numberPhoneFile.addEventListener('change', () => {
    if(numberPhoneFile.value.match(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/gmi)){
        numberPhoneError.innerText = ""
        numberPhoneFile.classList.remove('border-danger')
        numberPhoneFile.classList.add('border-success')
        boolPhoneNumber = true;  
    } else if (numberPhoneFile.value.match(/^\s*$/g)){
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
})

//vérification input email
emailFile.addEventListener('change', () => {
    if(!emailFile.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        if(emailFile.value.match(/^\s*$/g)){
            emailError.innerText = ""
            emailFile.classList.remove('border-danger')
            emailFile.classList.remove('border-success')
            boolMail = false;
        } else {
            emailError.innerText = "L'e-mail renseigné n'est pas correct."
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

//vérification champs avant écriture du contact dans le localStorage
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

    var numberTemp = ""
    if(contact.numberPhone[0] === "0"){
        for(let i = 1 ; i < contact.numberPhone.length ; i++){
            numberTemp += contact.numberPhone[i]
        }
    } else if(contact.numberPhone[0] === "+"){
        for(let j = 3 ; j < contact.numberPhone.length ; j++){
            numberTemp += contact.numberPhone[j]
        }
    }

    //on vérifie si le contact/numéro existe déjà
    var alreadyAdd =  allContactsLS.findIndex(contactTest => contactTest.firstName == contact.firstName  && contactTest.lastName == contact.lastName && contactTest.numberPhone == contact.numberPhone);
    var numberAlreadyKnown = allContactsLS.findIndex(contactTest => contactTest.numberPhone.includes(numberTemp));
    console.log(numberAlreadyKnown)

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

//***************************************************//
//              RECHERCHER UN CONTACT               //
//*************************************************//

const searchForm = document.getElementById("searchForm");
const searchFormButton = document.getElementById("searchFormButton");

function isSearchInContact(){
    //récupération du texte qui s'affichera en fonction de s'il y a un résultat ou non
    const searchResults = document.getElementById('searchResults')
    const resultNotFound = document.getElementById('resultNotFound')
    //récupération des sections pour cacher celles qui ne correspondent pas
    let allSections = document.getElementsByClassName('sectionContact')
    let otherSections = document.getElementsByClassName('resSearchSections')
    let otherContacts = document.getElementsByClassName('resSearchContacts')
    let showContact, parentNode;

    const restetSection = document.getElementsByClassName('reset')
    const resetContacts = document.getElementsByClassName('resetContacts')

    //on réinitialise les classes avant changement de recherche
    for(let r = 0 ; r < restetSection.length ; r++){            
        restetSection[r].classList.add('resSearchSections')
        restetSection[r].classList.remove('d-none')
        restetSection[r].classList.add('d-block')
    }

    for(let q = 0 ; q < resetContacts.length ; q++){
        resetContacts[q].classList.add('resSearchContacts')
        resetContacts[q].classList.remove('d-none')
        resetContacts[q].classList.add('d-block')
    }

    let searchText = searchForm.value;
    //Liste qui contiendra tout les matchs avant affichage
    let matchList = []

    if(searchText === "" || searchText === null || searchText === undefined){
        console.log("Recherche vide !")
    } else {
        for(let i = 0 ; i < allContactsLS.length ; i++){
            let searchNumerPhoneTemp = null;
            
            if(searchText[0] === "0"){
                searchNumerPhoneTemp = ""
                for(let l = 1 ; l < searchText.length ; l++){
                    searchNumerPhoneTemp += searchText[l]
                }
            } else if(searchText[0] === "+"){
                searchNumerPhoneTemp = ""
                for(let m = 3 ; m < searchText.length ; m++){
                    searchNumerPhoneTemp += searchText[m]
                }
            }
            
            if(allContactsLS[i].firstName.toLowerCase().includes(searchText.toLowerCase())){
                matchList.push(allContactsLS[i])
            } else if(allContactsLS[i].lastName.toLowerCase().includes(searchText.toLowerCase())){
                matchList.push(allContactsLS[i])
            } else if(allContactsLS[i].numberPhone.includes(searchNumerPhoneTemp)){
                matchList.push(allContactsLS[i])
            }
        }
    }


    if(matchList.length === 0){ //aucun résultat = on affiche le texte qui correspond
        resultNotFound.classList.remove('d-none')
        searchResults.classList.remove('d-block')
        resultNotFound.classList.add('d-block')
        searchResults.classList.add('d-none')
        for(let i = 0 ; i < allSections.length ; i++){ //et on cache toutes les sections
            allSections[i].classList.remove('d-block')
            allSections[i].classList.add('d-none')
        }
    } else { //sinon on affiche l'autre texte
        searchResults.classList.remove('d-none')
        resultNotFound.classList.remove('d-block')
        searchResults.classList.add('d-block')
        resultNotFound.classList.add('d-none')
        //on laisse les sections qui contiennent un résultat
        for(let j = 0 ; j < matchList.length ; j++){
            showContact = document.getElementsByClassName(matchList[j].firstName.toLowerCase() + "-" + matchList[j].lastName.toLowerCase() + "-test")
            showContact[0].classList.remove('resSearchContacts')
            parentNode = showContact[0].parentNode.parentNode.parentNode
            parentNode.classList.remove('resSearchSections')
        }
        //et on cache les autres
        for(let k = 0 ; k < otherSections.length ; k++){
            if(otherSections[k].classList.contains('d-block')){
                otherSections[k].classList.remove('d-block')
            }
            otherSections[k].classList.add('d-none')
        }

        for(let l = 0 ; l < otherContacts.length ; l++){
            otherContacts[l].classList.add('d-none')
        }
    }
}

searchForm.addEventListener('keyup', (e) => {
    if(e.keyCode === 13){
        isSearchInContact()
    }
})

searchFormButton.addEventListener('click', isSearchInContact)