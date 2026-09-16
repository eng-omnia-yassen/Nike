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

function sizes(sizes){
  let liOfSizes="";
  sizes.forEach(function(size,indexed){
    liOfSizes+=`
      <li class="mainColor mainButton d-flex justify-content-center align-items-center ${(indexed==0)? "active":""}" onclick="updataActive(this); updateSize('${size}',this)">${size}</li>
    `
  });
  return liOfSizes;
}

function colors(colors){
  let liOfColors="";
  colors.forEach(function(color,indexed){
    liOfColors+=`
        <li class="rounded-circle mainColor mainButton d-flex justify-content-center align-items-center ${(indexed==0)? 'active':''}" onclick="updataActive(this);updateColor('${color}',this)" style="background-color: ${color}"></li>
      `
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
     popupProduct=document.querySelector(`.popup[data-popup-name='product'] .box`);
     openPopup('product')
     popupProduct.innerHTML=`
        <div 
        class="row product"
        data-set-size="${product.sizes[0]}"
        data-set-colors="${product.colors[0]}"
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
                        <p >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, aspernatur. Eveniet, fugiat recusandae voluptatum odio placeat aperiam impedit architecto quod modi, possimus qui doloremque, vel aut! Eius totam sed numquam.</p>
                        <div class="sizes d-flex ">
                            <p class="fw-bolder m-0">Size :</p>
                            <ul class="list-unstyled d-flex m-0">
                                ${sizes(product.sizes)}
                            </ul>
                        </div>
                        <div class="colors d-flex ">
                            <p class="fw-bolder m-0">Color :</p>
                            <ul class="list-unstyled d-flex justify-content-center align-items-center m-0">
                                ${colors(product.colors)}
                            </ul>
                        </div>
                        <button class="btn mainButton mainColor" onclick="addToCart(${product.id},this)">Add To Cart</button>
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
    size:productEle.dataset.selectedSize,
    color:productEle.dataset.selectedColor,
  }
  cartProducts.push(newOrder);
  console.log(cartProducts)
}

function toggleOrderBtn(status,that){
  if (status=='add'){

  }
  else if(status=='remove'){

  }
}

function updateSize(size,that){
  let productEle=that.closest(".product");
  productEle.dataset.SelectedSize=size;
}

function updateColor(color,that){
  let productEle=that.closest(".product");
  productEle.dataset.SelectedColor=color;
}
