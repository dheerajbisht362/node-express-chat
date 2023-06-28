const socket = io()
const messageForm = document.querySelector('#message-form')
const messageFormInput =  messageForm.querySelector('input')
const messageFormButton =  messageForm.querySelector('button')

socket.on('message', (message)=>{
    console.log(message)
})

messageForm.addEventListener('submit' , (e)=>{
    e.preventDefault();

    messageFormButton.setAttribute('disabled', 'disabled')


    const message =  document.querySelector('input').value

    socket.emit('sendMessage',message, (message)=>{
        messageFormButton.removeAttribute('disabled')
        messageFormInput.value = ''
        messageFormInput.focus()
        
        console.log(message)
    })
})