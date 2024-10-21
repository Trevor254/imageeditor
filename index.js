const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
previewImg = document.querySelector(".preview-img img"),
rotateOptions = document.querySelectorAll(".rotate button"),
chooseImage = document.querySelector(".choose-img"),
saveImage = document.querySelector(".save-img"),
resetImage = document.querySelector(".reset-filter")
//showing selected filter value
let brightness = 100
let saturation = 100
let inversion = 0
let grayscale = 0

let rotate = 0
let flipHorizontal = 1
let flipVertical = 1

const applyFilters = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}

const loadImage = () => {
    let file = fileInput.files[0] //getting the selected file from the user
    if(!file) return //set to default if user has not selected file
    previewImg.src = URL.createObjectURL(file) // this method creates a URL of passed file object
    //console.log(file)
    //removing disable class once user selects image
    previewImg.addEventListener("load",()=>{
        resetFilter.click() // this will reset filter value should the user select a new image
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

const resetFilter = () => {
    //reseting all conditons to default state
brightness = 100
saturation = 100
inversion = 0
grayscale = 0
rotate = 0
flipHorizontal = 1
flipVertical = 1
//resetting values
filterOptions[0].click() //click brightness btn, so the brightness selected by default
applyFilters()
}

const saveImg = () => {
    const canvas = document.createElement("canvas") //creating canvas element
    const draw = canvas.getContext("2d") //this method returns a drawing context on canvas
    canvas.width = previewImg.naturalWidth; // sets canvas width to actual image width
    canvas.height = previewImg.naturalHeight; // sets canvas height to actual uimage height

    //applying user selected images to canvas filter
    draw.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
    draw.translate(-canvas.width/ 2 , canvas.height / 2)// translates canvas from center
    if(rotate !==0){  // if condition to rotate the canvas if the rotate value is not zero
        draw.rotate(rotate * Math.PI/180)

    }
    draw.scale(flipHorizontal, flipVertical) // flips canvas either horizontal or vertical
    draw.drawImage(previewImg, -canvas.width/ 2 , canvas.height / 2, -canvas.width, canvas.height)
    //document.body.appendChild(canvas)
    const link = document.createElement("a") //creates link element
    link.download="image.jpg" // passes a tag download value to the jpeg image
    link.href = canvas.toDataURL() // this passes href value to canvas
    link.click() // clicking a tag to download the image
//TESTING
console.log("save image btn clicked")
}

rotateOptions.forEach(option => {
    option.addEventListener("click",() => {  //adding event listener to rotate & flip buttons
        if(option.id === "left"){
            rotate -= 90 // if clicked upon, decrement rotate value by - 90 degrees
        } else if(option.id === "right"){
            rotate += 90 //if clicked upon, decrement rotate value by - 90 degrees
        } else if(option.id === "horizontal"){
            //if flipHorizontal value is 1, set this value to -1 else set 1
            flipHorizontal = flipHorizontal === 1 ? -1 : 1
        } else {
            //if flipvertical value is 1, set this value to -1 else set 1
            flipVertical = flipVertical === 1 ? -1 : 1
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

//saving image
saveImage.addEventListener("click", saveImg)

//reset filter
resetImage.addEventListener("click", resetFilter)


