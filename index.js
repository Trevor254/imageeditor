const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
previewImg = document.querySelector(".preview-img img"),
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

//adding functionality to filter button
filterOptions.forEach(option => {
    option.addEventListener("click",()=>{   //adding click event to all  filter buttons
        document.querySelector(".filter .active").classList.remove("active")
        option.classList.add("active") //this selects the active class and remove functionality from the button and adding this class on the current clicked button
        //changing filter name
        filterName.innerText = option.innerText

    })
    //testing
    console.log(option)
});

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}`
    //testing
    // console.log(filterSlider.value)
}

//disabling all edit options if user has not selected any image 
fileInput.addEventListener("change",loadImage)

//changing slider value
filterSlider.addEventListener("input", updateFilter)

//aadding event listener to the chooseImage functionality
chooseImage.addEventListener("click",()=> fileInput.click()) //clicking file input on choose image button


