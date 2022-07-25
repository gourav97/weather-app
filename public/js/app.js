console.log("client js file")


const weatherForm = document.querySelector("form");

const search = document.querySelector('input')

const messageBox = document.querySelector("#message-1")

const messageBox2 = document.querySelector('#message-2')


 weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    const location = search.value

    messageBox.textContent = "loading..."
    messageBox2.textContent = " "
    
    if(location.length === 0){
        messageBox.textContent = "Please provide a value"
    }
    else {
        fetch(`/weather?address=${location}`).then(
            res => res.json()).then(data =>{
                if(data.error){
                    messageBox.textContent = data.error
                }
                else{
                    messageBox.textContent = `Location =  ${data.location}`
                    messageBox2.textContent = `Forecast =  ${data.forecast}`
                    
                }
            })
        
    }

 })