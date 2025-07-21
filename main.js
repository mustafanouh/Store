

let Parant_card = document.querySelector(".parant-card");

async function Product() {
    try {

        let response = await fetch("https://fakestoreapi.com/products");
        let data = await response.json();

    

        data.forEach(({ image, title, price }) => {
            Parant_card.innerHTML += `
    <div class=" bg-white border border-gray-50 rounded shadow p-4 text-center flex flex-col h-full">
        <img src="${image}" class="w-full h-40 object-contain mb-4" alt="img">
        <h3 class="text-base font-semibold mb-4 line-clamp-2">${title}</h3>
     
        <div class="mt-auto">
            <div class="flex justify-between items-center border-t-2 border-blue-500 pt-4">
                <div class="text-black font-bold text-2xl">${price}$</div>
                <div class="flex gap-2">
                    <button class=" love p-2 bg-gray-100 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition">
                        <i class="fa-regular fa-heart text-base"></i>
                    </button>
                    <button class="add_to_Cart p-2 bg-gray-100 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition">
                        <i class="fa-solid fa-cart-shopping text-base"></i>
                    </button>
                    <button  class=" details p-2 bg-gray-100 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition">
                        <i class="fa-solid fa-angles-right text-base" ></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
`;

        });

    
        let localProduct = JSON.parse(localStorage.getItem('products'));

        localProduct.forEach(localProduct => {

            Parant_card.innerHTML += `
             <div class="  bg-white border  border-gray-50  rounded shadow  p-4 text-center flex flex-col h-full ">
          <img src="${localProduct.image}" class="w-full h-40 object-contain mb-4" alt="img">
          <h3 class="text-base font-semibold mb-4 line-clamp-2">${localProduct.title}</h3>
           <div class="mt-auto bg-white">
            <div class="flex justify-between items-center border-t-2 border-blue-500 pt-4">
                <div class="text-black font-bold text-2xl">${localProduct.price}$</div>
                <div class="flex gap-2">
                    <button class=" love p-2 bg-gray-100 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition">
                        <i class="fa-regular fa-heart text-base"></i>
                    </button>
                    <button class="p-2 bg-gray-100 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition">
                        <i class="fa-solid fa-cart-shopping text-base"></i>
                    </button>
                    <button class= " details p-2 bg-gray-100 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition">
                        <i class="fa-solid fa-angles-right text-base"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
 
 `

        });




    
   



 

    } catch {

        // console.log("Error");
    }

    setTimeout(() => {
        let details = document.querySelectorAll(".details");

        details.forEach(button => {
            button.addEventListener("click", () => {

                const parentCard = button.closest("div.border");

                const title = parentCard.querySelector("h3").innerText;
                const image = parentCard.querySelector("img").src;
                const price = parentCard.querySelector(".text-2xl").innerText;

                Swal.fire({
                    title: title,
                    text: `Price: ${price}`,
                    imageUrl: image,
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: 'Product Image',
                    confirmButtonText: 'تم'
                });
            });
        });
    }, 500);


    // add to cart
    setTimeout(() => {
        let add_to_Cart = document.querySelectorAll(".add_to_Cart");

        add_to_Cart.forEach(button => {
            button.addEventListener("click", () => {

                const parentCard = button.closest("div.border");
                const image = parentCard.querySelector("img").src;
                Swal.fire({
                    title: "Do you want to add to cart ?",
                    imageUrl: image,
                    imageWidth: 200,
                    imageHeight: 200,
                    confirmButtonText: "Add",
                    cancelButtonText: "No",
                    showCancelButton: true,
                    showCloseButton: true
                });

            });
        });
    }, 500);


    //    add to love
    setTimeout(() => {

        let loveButtons = document.querySelectorAll(".love");

        loveButtons.forEach(button => {
            button.addEventListener("click", () => {
                // العثور على العناصر داخل الكرت
                const parentCard = button.closest("div.border");
                if (!parentCard) return; // التحقق من وجود الكرت 

                const title = parentCard.querySelector("h3")?.innerText;
                const image = parentCard.querySelector("img")?.src;
                const price = parentCard.querySelector(".text-2xl")?.innerText;

                if (!title || !image || !price) {
                    Swal.fire({
                        title: "error!",
                        text: " sory dont have any product    .",
                        icon: "error",
                        confirmButtonText: "ok"
                    });
                    return;
                }

                let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

                const isAlreadyFavorite = favorites.some(product => product.title === title);

                if (!isAlreadyFavorite) {
                    favorites.push({ title, image, price });
                    localStorage.setItem('favorites', JSON.stringify(favorites));

                    // change icon favorites
                    button.querySelector("i").classList.remove("fa-regular");
                    button.querySelector("i").classList.add("fa-solid");

                    Swal.fire({
                        title: "Favorite added !",
                        text: `${title} `,
                        imageUrl: image,
                        imageWidth: 200,
                        imageHeight: 200,
                        confirmButtonText: "OK",

                    });
                } else {
                    // remove from favoirt
                    favorites = favorites.filter(product => product.title !== title);
                    localStorage.setItem('favorites', JSON.stringify(favorites));

                    //change icon
                    button.querySelector("i").classList.remove("fa-solid");
                    button.querySelector("i").classList.add("fa-regular");

                    Swal.fire({
                        title: "The favorite was removed!",
                        text: `${title} .`,
                        imageUrl: image,
                        imageWidth: 200,
                        imageHeight: 200,
                        confirmButtonText: "OK",

                    });
                }
            });
        });
    }, 500);
}


// loader evevnt
window.addEventListener("load", Product);

//  posting data
function postProduct(title, imgSrc, price, description, category) {
    const data = {
        title: title,
        image: imgSrc,
        price: price,
        description: description,
        category: category
    };

    fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {



            let storedProducts = JSON.parse(localStorage.getItem('products')) || [];
            storedProducts.push(data);
            localStorage.setItem('products', JSON.stringify(storedProducts));



            const form = document.getElementById("productForm");
            if (form) form.reset();


            Swal.fire({
                title: 'The product has been added  !',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            });

            // loader evevnt
            window.addEventListener("load", Product);

        })
        .catch(error => {
            console.error('There is an error', error);
            Swal.fire({
                title: ' There is an error!',
                text: ' There is an error.',
                icon: 'error'
            });
        });
}





// add product
let button_add_product = document.getElementById("buttonPostProduct");

if (button_add_product) {

    button_add_product.addEventListener('click', (e) => {
        e.preventDefault();

        let title = document.getElementById("title");
        let imgSrc = document.getElementById("img");
        let price = document.getElementById("price");
        let description = document.getElementById("description");
        let category = document.getElementById("category");

        postProduct(title.value, imgSrc.value, price.value, description.value, category.value);

        // loader evevnt
        window.addEventListener("load", Product);

    });
}



// favorait Product in local storage fore Product display
let favorite = JSON.parse(localStorage.getItem('favorites')) || [];
let myFavorite = document.querySelector(".favorites");
if (myFavorite) {
    favorite.forEach(localFavorite => {
        myFavorite.innerHTML += `
  <div class=" bg-white border border-gray-50 rounded shadow p-4 text-center flex flex-col h-full  ">
        <img src="${localFavorite.image}" class="w-full h-40 object-contain mb-4" alt="img">
        <h3 class="text-base font-semibold mb-4 line-clamp-2">${localFavorite.title}</h3>
     
        <div class="mt-auto">
            <div class="flex justify-between items-center border-t-2 border-blue-500 pt-4">
                <div class="text-black font-bold text-2xl">${localFavorite.price}$</div>
                <div class="flex gap-2">
                    <button class=" love p-2 bg-gray-100 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition">
                        <i class="fa-solid fa-heart text-base"></i>
                    </button>
                    <button class="p-2 bg-gray-100 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition">
                        <i class="fa-solid fa-cart-shopping text-base"></i>
                    </button>
                    <button class= " details p-2 bg-gray-100 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition">
                        <i class="fa-solid fa-angles-right text-base"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
`
    })

}

//    bar or Menu
let bar = document.getElementById("bar");
let menue = document.getElementById("menue");
if (bar) {
    bar.addEventListener('click', () => {
        menue.classList.toggle("hidden");
    })
}

setTimeout( loader ,1000)
        function loader(){
         document.getElementById("loader").style.display = "none";
        document.getElementById("main").classList.remove("hidden");
     }



