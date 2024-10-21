const fileInput = document.querySelector(".file-input"),
previewImg = document.querySelector(".preview-img img")
chooseImage = document.querySelector(".choose-img")

const loadImage = () => {
    let file = fileInput.files[0] //getting the selected file from the user
    if(!file) return //set to default if user has not selected file
    previewImg.src = URL.createObjectURL(file) // this method creates a URL of passed file object
    //console.log(file)
    //removing disable class once user selects image
    previewImg.addEventListener("load",()=>{
        document.querySelector(".container").classList.remove("disable")
    })
}

//disabling all edit options if user has not selected any image 
fileInput.addEventListener("change",loadImage)

//aadding event listener to the chooseImage functionality
chooseImage.addEventListener("click",()=> fileInput.click()) //clicking file input on choose image button
