const firstname = document.querySelector('#firstname')
const lastname = document.querySelector('#lastname')
const email = document.querySelector('#email')
const queryRadios = document.getElementsByName('query');
const queryLabel = document.querySelector('#query-label')
const msg = document.querySelector('#longTextInput')
const checkbox = document.querySelector('#checkbox')
const form = document.getElementById('form')
const errorTimeouts = {}
let timeoutId
let timeoutId2

console.log(errorTimeouts)

const confirm = {
    no1: false,
    no2: false,
    no3: false,
    no4: false,
    no5: false,
    no6: false
}


form.addEventListener('submit', e => {
    e.preventDefault()
    validateInput()
})

// function for set the error
function setError(element, message){
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector('.error')

    errorDisplay.innerText = message
    inputControl.classList.add('error')
    clearTimeout(errorTimeouts[element.id])

    errorTimeouts[element.id] = setTimeout(_ => {
        errorDisplay.innerText = ''
        inputControl.classList.remove('error')
    }, 2000)

}

// function to set to success
function setSuccess(element){
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.remove('error');
    
    clearTimeout(errorTimeouts[element.id])
}

// function to validate email
function isValidEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return re.test(String(email).toLowerCase())
}

function validateInput(){
    const firstnameValue = firstname.value.trim()
    const lastnameValue = lastname.value.trim()
    const emailValue = email.value.trim()
    const msgValue = msg.value.trim()

    if(firstnameValue === ''){
        setError(firstname, 'This field is required')
    }
    else{
        setSuccess(firstname)
        confirm.no1 = true
    }

    if(lastnameValue === ''){
        setError(lastname, 'This field is required')
    }
    else{
        setSuccess(lastname)
        confirm.no2 = true
    }

    if(emailValue === '') {
        setError(email, 'This field is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Please enter a valid email address');
    } else {
        setSuccess(email);
        confirm.no3 = true
    }
    
    if(validateRadio()){
        // setSuccess(queryLabel)
        document.querySelector('.error-msg').innerText = ''
        confirm.no4 = true
    }
    else{
        // setError(queryLabel, 'Please select a query type')
        document.querySelector('.error-msg').innerText = 'Please select a query type'
        clearTimeout(timeoutId2)
        timeoutId2 = setTimeout(_ => {
            document.querySelector('.error-msg').innerText = ''
        }, 2000) 
    }

    if(msgValue === ''){
        setError(msg, 'This field is required')
    }
    else{
        setSuccess(msg)
        confirm.no5 = true
    }

    if (!checkbox.checked) {
        
        document.querySelector('.error-checkbox').innerText = 'To submit this form, please consent to being contacted'
        clearTimeout(timeoutId)
        timeoutId = setTimeout(_ => {
            document.querySelector('.error-checkbox').innerText = ''
        }, 2000) 
    } else {
        document.querySelector('.error-checkbox').innerText = ''
        confirm.no6 = true
    }

    if(Object.values(confirm).every(value => value === true)){
        firstname.value = ''
        lastname.value = ''
        email.value = ''
        msg.value = ''

        queryRadios.forEach(radio => {
            radio.checked = false
        })

        checkbox.checked = false
        Object.keys(confirm).forEach(key => {
            confirm[key] = false;
        });
        popUp()
    }
}

function popUp(){
    const modal = document.querySelector('.js-pop-up')

    modal.showModal()

    setTimeout(_ => {
        modal.close()
    }, 4000)
}


function validateRadio(){
    let selectedQuery = null
    
    for (const radio of queryRadios) {
        if (radio.checked) {
            selectedQuery = radio.value;
            break;
        }
    }
    return selectedQuery
}

