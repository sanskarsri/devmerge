let cartContent = document.querySelector('.cartContent')

prods.forEach((elem,index)=>{
    let listDiv = document.createElement('div')

    let div1 = document.createElement('div')
    div1.innerHTML = `<img src='${elem.image}' class='productLogo'/>`
    div1.classList.add('img')


    let div2 = document.createElement('div')
    div2.innerHTML = `<div class='productInfo'><h3>${elem.title}</h3><h6>${elem.brand}</h6></div><div class='purchaseInfo'><h4>Quantity : <span>${Math.floor(Math.random()*10)+1}</span></h4><h4>Sub-Total : ${elem.price}</h4></div>`
    div2.classList.add('details')

    let div3 = document.createElement('div')
    div3.innerHTML= `<a href="#" class="removeBtn"><button class="btn">Remove</button></a>`
    div3.classList.add('action')

    let adiv = document.createElement('div')
    adiv.append(div1,div2)
    adiv.classList.add('listContent','flex')

    listDiv.append(adiv,div3)
    listDiv.classList.add('listDiv')
    listDiv.classList.add('flex')

    cartContent.appendChild(listDiv)

})
