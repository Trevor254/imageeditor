const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
previewImg = document.querySelector(".preview-img img"),
rotateOptions = document.querySelectorAll(".rotate button"),
chooseImage = document.querySelector(".choose-img")

//showing selected filter value
let brightness = 100
let saturation = 100
let inversion = 0
let grayscale = 0

let rotate = 0

const applyFilters = () => {
    previewImg.style.transform = `rotate(${rotate}deg)`
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}

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
        //if conditon to add level if its brightness
        if(option.id === "brightness"){
            filterSlider.max = "200"
            filterSlider.value = brightness
            filterValue.innerText = `${brightness}%`
        } else if(option.id === "saturation"){
            filterSlider.max = "200"
            filterSlider.value = saturation
            filterValue.innerText = `${saturation}%`
        } else if(option.id === "inversion"){
            filterSlider.max = "100"
            filterSlider.value = inversion
            filterValue.innerText = `${inversion}%`
        } else {
            filterSlider.max = "100"
            filterSlider.value = grayscale
            filterValue.innerText = `${grayscale}%`
        }

    })
    //testing
    console.log(option)
});

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}`
    const selectedFilter = document.querySelector(".filter .active") // getting selected filter button
    if(selectedFilter.id === "brightness"){
        brightness = filterSlider.value
    } else if(selectedFilter.id === "saturation"){
        saturation = filterSlider.value
    }  else if(selectedFilter.id === "inversion"){
        inversion = filterSlider.value
    } else {
        grayscale = filterSlider.value
    }
    //testing
    // console.log(filterSlider.value)

    //applying filters to image functionality
    applyFilters()
}

rotateOptions.forEach(option => {
    option.addEventListener("click",() => {  //adding event listener to rotate & flip buttons
        if(option.id === "left"){
            rotate -= 90 // if clicked upon, decrement rotate value by - 90 degrees
        } else if(option.id === "right"){
            rotate += 90 //if clicked upon, decrement rotate value by - 90 degrees
        }
        //call apply filters function
        applyFilters()
        //testing 2
        //console.log(option)
    })
})

//disabling all edit options if user has not selected any image 
fileInput.addEventListener("change",loadImage)

//changing slider value
filterSlider.addEventListener("input", updateFilter)

//aadding event listener to the chooseImage functionality
chooseImage.addEventListener("click",()=> fileInput.click()) //clicking file input on choose image button


