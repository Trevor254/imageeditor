const fileInput = document.querySelector(".file-input"),
chooseImage = document.querySelector(".choose-img")

const loadImage = () => {
    let file = fileInput.files[0] //getting the selected file from the user
}


fileInput.addEventListener("change",loadImage)

//aadding event listener to the chooseImage functionality
chooseImage.addEventListener("click",()=> fileInput.click()) //clicking file input on choose image button
