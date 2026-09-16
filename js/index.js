let sCarousel=document.querySelector(".s-carousel"),
nextButton=document.querySelector("#Home .next"),
prevButton=document.querySelector("#Home .prev"),
logoEle=document.querySelector(".navbar .navbar-brand #Logo"),
headIcon=document.querySelector( "head link[rel='icon']"),
correctImgs=document.querySelectorAll(".title img"),
navEle=document.querySelector(".navbar"),
navLinkEle=navEle.querySelectorAll(".nav-link"),
sections=document.querySelectorAll("section ,header"),
loadingPage=document.querySelector('.loadingPage'),
latestContent=document.querySelector("#Latest .content"),
featuredContent=document.querySelector("#Featured .content .row"),
clickedPopup=document.querySelectorAll(".popup"),
popupBox=document.querySelectorAll(".popup .box"),
cartProducts=[];

checkScrolledNav();

nextButton.addEventListener("click", function(){
    let currentCarouseSlide=document.querySelector("#Home .inner-carousel-item.active"),
    nextCarouseSlide=currentCarouseSlide.nextElementSibling ??sCarousel.querySelector(".inner-carousel .inner-carousel-item:first-child");
    currentCarouseSlide.classList.remove("active");
    nextCarouseSlide.classList.add("active"),
    newSlide=nextCarouseSlide.dataset.colorName;
    changeColor(newSlide);
    changeImage(newSlide,logoEle,"logo");
    changeLogoImg(newSlide);
    correctImgs.forEach(function(correctImg){
        changeImage(newSlide,correctImg,"correct")
    })
})

prevButton.addEventListener("click", function(){
    let currentCarouseSlide=document.querySelector("#Home .inner-carousel-item.active"),
    prevCarouseSlide=currentCarouseSlide.previousElementSibling ??sCarousel.querySelector(".inner-carousel .inner-carousel-item:last-child");
    currentCarouseSlide.classList.remove("active");
    prevCarouseSlide.classList.add("active"),
    newSlide=prevCarouseSlide.dataset.colorName;
    changeColor(newSlide);
    changeImage(newSlide,logoEle,"logo");
    changeLogoImg(newSlide);
    correctImgs.forEach(function(correctImg){
        changeImage(newSlide,correctImg,"correct")
    })
})

window.addEventListener("scroll",function(){
  checkScrolledNav();
  let section=document.querySelector("#Latest");
  
    sections.forEach(function(section){
        updateNavLink(section);       
    })
    
})

navLinkEle.forEach(function(navLinkEle){
    navLinkEle.addEventListener("click",function(e){
        e.preventDefault();
        let currentNavLink=navEle.querySelector(".nav-link.active"),
        currentSection=document.querySelector(navLinkEle.getAttribute("href")),
        topOfSection=currentSection.offsetTop;
        currentNavLink.classList.remove("active");
        navLinkEle.classList.add("active");
        window.scrollTo(0,topOfSection-(navEle.clientHeight))  
    })
})

window.addEventListener("DOMContentLoaded",function(){
    loadingPage.classList.add("hide")
    setTimeout(function(){
        loadingPage.classList.add("d-none")
    },1000)
})

latest.forEach(function(product){
    latestContent.innerHTML+= `
        <div class="row m-auto mb-3 box bg-body mainBorder p-3">
            <div class="col-lg-6 m-auto">
                <div 
                class="product"
                data-set-size="${product.sizes[0]}"
                data-set-colors="${product.colors[0]}"
                >
                <div class="item ">
                        <div class="row">
                            <div class="col-lg-2 col-md-2 part1 m-auto mb-lg-0 mb-md-3">
                                <div class="item">
                                    <ul class="list-unstyled m-0 d-flex flex-lg-column flex-md-column">
                                        ${createLatestLi(product.images)}
                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-10 col-md-10 d-flex justify-content-center align-items-center part2">
                                <div class="item">
                                    <div class="selectedImg">
                                        <img src="images/products/${product.images[0]}" alt="products/${product.images[0]}" class="img-fluid" >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 d-flex align-content-start mb-md-3">
                <div class="product">
                <div class="item text">
                        <h3 class="mainColor">${product.name}</h3>
                        <p class="text-secondary">${product.description}</p>
                        <div class="price d-flex column-gap-3">
                            <p class="fw-bolder m-0">Price :</p>
                            ${countTheDiscount(product.price,product.discount)}
                        </div>
                        <div class="sizes d-flex ">
                            <p class="fw-bolder m-0">Size :</p>
                            <ul class="list-unstyled d-flex m-0">
                                ${sizes(product.sizes)}    
                            </ul>
                        </div>
                        <button class="btn mainButton mainColor" onclick="addToCart(${product.id},this)">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    `;
})

features.forEach(function(product){
    featuredContent.innerHTML+=`
        <div class="col-sm-6 col-lg-3">
            <div class="product">
                <div class="item bg-body text-center p-3 position-relative overflow-hidden">
                    <p class="discount ${(product.discount==0)? 'd-none':''}">${product.discount*100}%</p>
                    <div class="head position-relative mb-4">
                        <div class="selectedImg">
                            <img src="images/products/${product.images[0]}" alt="products/${product.images[0]}" class="img-fluid">
                        </div>
                        <i class="fa-solid fa-magnifying-glass" onclick="showProduct(${product.id})"></i>
                        <ul class="list-unstyled d-flex justify-content-center align-items-center">
                           ${createFeaturedList(product.images) }
                        </ul>
                    </div>
                    <div class="body">
                        <h6>${product.name}</h6>
                        ${countTheDiscount(product.price,product.discount)}
                    </div>
                </div>
            </div>
        </div>
    `;
})
popupBox.forEach(function(box){
    box.addEventListener("click",function(e){
        e.stopPropagation();
    })
})


