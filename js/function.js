function changeColor(colorName){
    let html=document.querySelector("html"),
    newColor=getComputedStyle(html).getPropertyValue(`--${colorName}-color`);
    html.style.setProperty(`--main-color`,newColor)
    
}

function changeImage(selectedSlid,selectedImg,commonName){
    let currentSrc= selectedImg.src,
        currentSrcArr=currentSrc.split('/');
        currentSrcArr[currentSrcArr.length-1]=`${selectedSlid}-${commonName}.png` ;
        let newSrc=currentSrcArr.join('/');
        selectedImg.setAttribute('src',newSrc)
}

function changeLogoImg(selectedSlid){
    let currentSrc=headIcon.getAttribute('href'),
    currentSrcArr=currentSrc.split('/'),
    newSrc;
    currentSrcArr[currentSrcArr.length-1]=`${selectedSlid}-logo.png`;
    newSrc=currentSrcArr.join("/");
    headIcon.setAttribute('href',newSrc);
}

function checkScrolledNav(){
    if(window.scrollY>10){
      navEle.classList.add("scrolled");
    }else{
    navEle.classList.remove("scrolled");
  }  
}

function updateNavLink(section){
    let topOfSection=section.offsetTop;
    heightOfSection=topOfSection+section.clientHeight;
      if(window.scrollY>topOfSection&& window.scrollY< heightOfSection){
        let currentNavLink=navEle.querySelector(".nav-link.active"),
        sectionId=section.getAttribute("id"),
        navLinkOfSection=document.querySelector(`a[href='#${sectionId}']`);
        currentNavLink.classList.remove("active");
        navLinkOfSection.classList.add("active");
        }
}
function createLatestLi(images,isProduct=false){
  let latestLi="";
  images.forEach(function(image){
    latestLi +=`<li class="p-2 ${(isProduct) ? '':'mainBorder rounded-2'}"><img src="images/products/${image}" alt="products/${image}" onclick="updateSelectedImg('${image}',this)" class="img-fluid"></li>`;
  })
  return latestLi
}

function countTheDiscount(price,discount){
  return `
      <p class="m-0">
          <span class="text-decoration-line-through mainColor me-1 ${(discount==0) ? 'd-none' :''}">${price} <sup>$</sup></span>
          <span class="bold">${(price*(1-discount)).toFixed(2)}<sup>$</sup></span>
      </p>
      `;
  
}

function sizes(sizes,isProductInToCart=null){
  let  liOfSizes="";
  sizes.forEach(function(size,indexed){
    if(isProductInToCart == null){
      liOfSizes+=
      `
        <li class="mainColor mainButton d-flex justify-content-center align-items-center ${(indexed == 0)? "active":""}" onclick="updataActive(this); updateSize('${size}',this)">${size}</li>
      `
    } else{
      liOfSizes+=
      `
        <li class="mainColor mainButton d-flex justify-content-center align-items-center ${(isProductInToCart.size == size)? "active":""}" onclick="updataActive(this); updateSize('${size}',this)">${size}</li>
      `
    }
  });
  return liOfSizes;
}

function colors(colors,isProductInToCart=null){
  let liOfColors="";
  colors.forEach(function(color,indexed){
    if(isProductInToCart == null){
      liOfColors+=`
          <li class="rounded-circle mainColor mainButton d-flex justify-content-center align-items-center ${(indexed==0)? 'active':''}" onclick="updataActive(this);updateColor('${color}',this)" style="background-color: ${color}"></li>
        `
    }else{
        liOfColors+=`
          <li class="rounded-circle mainColor mainButton d-flex justify-content-center align-items-center ${(isProductInToCart.color ==color)? "active":""}" onclick="updataActive(this);updateColor('${color}',this)" style="background-color: ${color}"></li>
        `
    }
  });
  return liOfColors;
}

function createFeaturedList(imagesList){
  let featuredLi='';
  imagesList.forEach(function(imageList,indexed){
        featuredLi+=`<li class="rounded-circle mainColor ${(indexed==0)? 'active':''}" onclick="updateSelectedImg('${imageList}',this);updataActive(this)"></li>`

  })
  return featuredLi
}
function updateSelectedImg(image,that){
  let selectedImg=that.closest(".product").querySelector(".selectedImg img"),
  srcArr=selectedImg.src.split("/");
  srcArr[srcArr.length-1]=image;
  let newSrcImg=srcArr.join("/");
    selectedImg.setAttribute("src",newSrcImg)
}
function updataActive(that){
  let currentActive=that.parentElement.querySelector(".active");
  currentActive.classList.remove("active");
  that.classList.add("active")
}

function openPopup(popupName){
  let popupEle=document.querySelector(`.popup[data-popup-name=${popupName}]`);
  popupEle.classList.add("active");
  setTimeout(function(){
    popupEle.classList.add("show")
  },100)  
} 

function closePopup(){
  clickedPopup.forEach(function(clickedPopup){
    clickedPopup.classList.remove("show");
    setTimeout(function(){
    clickedPopup.classList.remove("active")
    },1000)
  })
}

function getProduct(productId){
  return products.filter(product => product.id==productId)[0]; 
}

function showProduct(productId){
  
  let product=getProduct(productId),
      isProductInToCart=checkLocalStorage(product.id),  
     popupProduct=document.querySelector(`.popup[data-popup-name='product'] .box`);
     openPopup('product')
     popupProduct.innerHTML=`
        <div 
        class="row product"
        data-set-size="${isProductInToCart?.sizes ?? product.sizes[0]}"
        data-set-colors="${isProductInToCart?.colors ?? product.colors[0]}"
        >
            <div class="col-lg-6 col-md-6">
                <div class="item">
                    <div class="selectedImg">
                        <img src="images/products/${product.images[0]}" alt="products/1-1" class="img-fluid">
                    </div>
                        <ul class="list-unstyled d-flex">
                         ${createLatestLi(product.images,true)}
                        </ul>
                </div>
            </div>
            <div class="col-lg-6 col-md-6">
                <div class="item">
                    <div class="body">
                        <h3 class="mb-3">Triumph 19 Women</h3>
                        <div class="price d-flex column-gap-3">
                            ${countTheDiscount(product.price,product.discount)}
                        </div>
                        <hr>
                        <p >${product.description}</p>
                        <div class="sizes d-flex ">
                            <p class="fw-bolder m-0">Size :</p>
                            <ul class="list-unstyled d-flex m-0">
                                ${sizes(product.sizes , isProductInToCart)}
                            </ul>
                        </div>
                        <div class="colors d-flex ">
                            <p class="fw-bolder m-0">Color :</p>
                            <ul class="list-unstyled d-flex justify-content-center align-items-center m-0">
                                ${colors(product.colors , isProductInToCart)}
                            </ul>
                        </div>
                          ${creationOfButton(product.id)}
                    </div>
                    </div>
            </div>
        </div>
     `;
}

function addToCart(productId,that){
  let productEle=that.closest('.product'),
  newOrder={
    id:productId,
    size:productEle.dataset.setSize,
    color:productEle.dataset.setColors,
  }
  
  cartProducts.push(newOrder);
  updateLocalStorage();
  that.setAttribute('onclick',`removeFromCart(${productId},this)`);
  toggleOrderBtn("remove",that)
}
function removeFromCart(productId,that){
  cartProducts=cartProducts.filter(function (product){
    return product.id != productId;
  })
  updateLocalStorage();
  if(that!=null){
    that.setAttribute('onclick',`addToCart(${productId},this)`);
    toggleOrderBtn('add',that)

  }
}


function toggleOrderBtn(status,that){
  if (status=='remove'){
    that.classList.add("remove")
    that.textContent='Remove From Cart'
  }
  else if(status=='add'){
    that.classList.remove("remove")
    that.textContent='Add To Cart'
  }
}

function updateLocalStorage(){
  localStorage.setItem('cartProducts',JSON.stringify(cartProducts))
}

function checkLocalStorage(productId){
  let result = cartProducts.filter(function(product){
    return product.id == productId;
  })
  return result.length==1 ? result[0] : null;
}

function updateSize(size,that){
  let productEle=that.closest(".product");
  productEle.dataset.setSize=size;
}

function updateColor(color,that){
  let productEle=that.closest(".product");
  productEle.dataset.setColors=color;
}
function creationOfButton(productid){
 let isProductInToCart=checkLocalStorage(productid),
 result= (isProductInToCart == null) ?
    `<button class="btn mainButton mainColor" onclick="addToCart(${productid},this)">Add To Cart</button>`
    :
    `<button class="btn mainButton mainColor remove" onclick="removeFromCart(${productid},this)">Remove From Cart</button>` ;
  return result                   
}

function showCart(){
  let contentEle=document.querySelector(".popup[data-popup-name='shop'] .box .row"),
      buyNowBtn=document.querySelector(".buyNow");

  if(cartProducts.length == 0){
    contentEle.innerHTML=`
        <p class="text-center alert alert-warning">There are no products</p>
    `
    buyNowBtn.classList.add("d-none");
  }else{
    contentEle.innerHTML='';
  cartProducts.forEach(function(cartProduct){
    let product=getProduct(cartProduct.id);
      contentEle.innerHTML += `
         <div class="col-md-4 col-sm-6">
            <div class="item">
                <div class="product bg-light p-3 rounded-3" data-product-id="${product.id}">
                    <img src="images/products/${product.images[0]}" alt="1-1.png" class="img-fluid">
                    <h6>${product.name.slice(0,10)}...</h6>
                    <div class="price d-flex column-gap-3">
                        <p class="fw-bolder m-0">Price :</p>
                        ${countTheDiscount(product.price,product.discount)}
                    </div>
                    <div class="sizes d-flex ">
                        <p class="fw-bolder m-0">Size :</p>
                        <ul class="list-unstyled d-flex m-0">
                            ${sizes([cartProduct.size])}
                        </ul>
                    </div>
                    <div class="colors d-flex ">
                        <p class="fw-bolder m-0">Color :</p>
                        <ul class="list-unstyled d-flex justify-content-center align-items-center m-0">
                            ${colors([cartProduct.color])}
                        </ul>
                    </div>
                    <button class="btn btn-danger w-100" onclick="removeFromShop(${product.id})">Remove</button>
                </div>
            </div>
          </div>
      `;
    buyNowBtn.classList.remove("d-none");
    })
  }
  openPopup(`shop`);
}
function removeFromShop(productId){
  let productEle=document.querySelector(`.popup[data-popup-name='shop'] .box .row .product[data-product-id="${productId}"]`).parentElement.parentElement,
  latestProductBtn=document.querySelector(`#Latest .content .product[data-product-id="${productId} button"]`)
  productEle.remove();
  console.log(latestProductBtn)
  removeFromCart(productId,latestProductBtn)
}

 