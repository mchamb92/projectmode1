//adding eventListener to DOM - all content being loaded
//adding eventListener to button  
document.addEventListener('DOMContentLoaded', () => { 
document.getElementById('brands').addEventListener('click', getBrands)
  getBrands()
})

function getBrands(){
  let main = document.getElementById('main ul')
  let info =  document.getElementById('info')
  let brandList = document.getElementById('brand-list')

  info.innerHTML = "" 
  fetch('http://makeup-api.herokuapp.com/api/v1/products.json?brand')
    .then(res => res.json())
    .then(brands => {
      brands.map(brand => {
        brandList.innerHTML += `
        <li> 
          <a href = "#" data-id="${brand.id}" data-brand="${brand.brand}"> ${brand.brand}-${brand.id}</a>
          <button data-likes="0" id="${brand.id}" class="buttons">like!</button>
          
          </li>
        `
      })
      brandClickLinks()
    })  
}

//adding event listeners to all brand links  
function brandClickLinks(){
    const likeButtons = document.querySelectorAll('li button')
    likeButtons.forEach(show =>{
      show.addEventListener('click', likeBrand)
    }) 

    const brands = document.querySelectorAll("li a")
    brands.forEach(brand =>  {
        brand.addEventListener("click", displayBrand)
    })

function likeBrand(e){
  //console.log(e.target.parentElement, e.target)
  const li = e.target.parentElement
  const button = e.target
  likes = li.querySelector('p')

  //console.log(li)
  //console.log(button)  

  if ( parseInt(button.dataset.likes) === 0){
    button.dataset.likes ++
    total = li.insertAdjacentHTML('beforeend', `<p id='likes'> Likes: ${button.dataset.likes} </p>`)
  } else {
    button.dataset.likes ++
    likes.innerText = `Likes: ${button.dataset.likes}`
  }

}

    
}

async function displayBrand(e){
  //The target property of the Event interface is a reference to the object onto which the event was dispatched
  let info =  document.getElementById('info')
  let brandList = document.getElementById('brand-list')

  brandList.innerHTML = ""
  fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${e.target.dataset.brand}`)
    .then(res => res.json())
    .then(brands => {
      brands.map(brand => {
        info.innerHTML += `
        <h1> ${brand.brand}-${brand.id} </h1>
        <h3> Description: <h3>
        <p style="font-size:18px;"> ${brand.description} </p>
        `
      })
    })
    
}

