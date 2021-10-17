/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/CartComponent.js":
/*!************************************!*\
  !*** ./public/js/CartComponent.js ***!
  \************************************/
/***/ (() => {

eval(" const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';\n\nVue.component('cart', {\n    data(){\n      return {\n          cartUrl: '/getBasket.json',\n          cartItems: [],\n          imgCart: 'https://placehold.it/200x150',\n          showCart: false\n      }\n    },\n    mounted(){\n        this.$parent.getJson(`/api/cart`)\n            .then(data => {\n                for (let item of data.contents){\n                    item.imgPath = `img/card${item.id_product}.png`;\n                    this.$data.cartItems.push(item);\n                }\n            });\n    },\n    methods: {\n        addProduct(item){\n            let find = this.cartItems.find(el => el.id_product === item.id_product);\n            if(find){\n                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})\n                    .then(data => {\n                        if(data.result === 1){\n                            find.quantity++\n                        }\n                    })\n            } else {\n                const prod = Object.assign({quantity: 1}, item);\n                item.imgPath = `img/card${item.id_product}.png`;\n                this.$parent.postJson(`/api/cart`, prod)\n                    .then(data => {\n                        if(data.result === 1){\n                            this.cartItems.push(prod)\n                        }\n                    })\n            }\n\n          \n        },\n        remove( product ) {\n            if ( product.quantity > 1 ) {\n                this.$parent.putJson( `/api/cart/${ product.id_product}`, { quantity: -1 } )\n                    .then( data => {\n                        if ( data.result ) {\n                            product.quantity--;\n                        }\n                    } )\n            } else {\n                this.$parent.delJson( `/api/cart/${ product.id_product}/${product.product_name}`, product )\n                    .then( data => {\n                        if ( data.result ) {\n                            this.cartItems.splice( this.cartItems.indexOf( product ), 1 );\n                        } else {\n                            console.log( 'error' );\n                        }\n                    } )\n            }\n        },\n        \n\n    },\n    template: `\n    <div>\n    <button class=\"btn-cart\" type=\"button\" @click=\"showCart = !showCart\"><i class=\"fas fa-shopping-cart btn-cart\"></i></button>\n    \n           \n            <div class=\"cart-block\" v-show=\"showCart\">   \n            <h2 v-if=\" cartItems.length === 0\">Корзина пуста</h2>\n                <div v-else> \n                 \n                 <cart-item v-for=\"item of cartItems\" :key=\"item.id_product\" :img=\"item.imgPath\" :cart-item=\"item\" @remove=\"remove\" @add-product=\"addProduct\">\n                 </cart-item>\n                </div>   \n            </div>  \n            \n        \n    </div>\n    `\n});\n\nVue.component('cart-item', {\n    props: ['img', 'cartItem'],\n    template: `\n    <div class=\"cart-item\">\n        <img class=\"cartImg\" :src=\"img\" alt=\"Some img\">\n        <div class=\"product-desc\">\n            <h3>{{ cartItem.product_name }}</h3>\n            <p>Цена: {{ cartItem.price }}</p>\n            <div class=\"changeQuantity\">\n                <button class=\"del-btn btnInCart\" @click=\"$emit('remove', cartItem)\"> &times; </button>\n                <p>&#160;{{ cartItem.quantity }}&#160; шт.&#160; </p>\n                <button class=\"btnInCart\" @click=\"$emit('add-product', cartItem)\"> + </button>\n            </div>          \n            <p>Сумма: {{ cartItem.price * cartItem.quantity }}</p>\n        </div>\n    </div>\n    `\n})\n\n//# sourceURL=webpack://internet_shop/./public/js/CartComponent.js?");

/***/ }),

/***/ "./public/js/ErrorComp.js":
/*!********************************!*\
  !*** ./public/js/ErrorComp.js ***!
  \********************************/
/***/ (() => {

eval("Vue.component('error', {\n    data(){\n        return {\n          text: ''\n        }\n    },\n    computed: {\n      isVisible(){\n          return this.text !== ''\n      }\n    },\n    template: `\n    <div class=\"error-block\" v-if=\"isVisible\">\n        <p class=\"error-msg\">\n        <button class=\"close-btn\" @click=\"text=''\">&times;</button>\n        {{ text }}\n</p>\n</div>\n    `\n})\n\n//# sourceURL=webpack://internet_shop/./public/js/ErrorComp.js?");

/***/ }),

/***/ "./public/js/FilterComp.js":
/*!*********************************!*\
  !*** ./public/js/FilterComp.js ***!
  \*********************************/
/***/ (() => {

eval("Vue.component('filter-el', {\n    data(){\n      return {\n          userSearch: ''\n      }\n    },\n    template: `<form action=\"#\" class=\"search-form\" @submit.prevent=\"$parent.$refs.products.filter(userSearch)\">\n                <input type=\"text\" placeholder=\"поиск\" class=\"search-field\" v-model=\"userSearch\">\n                <button type=\"submit\" class=\"btn-search\">\n                    <i class=\"fas fa-search\"></i>\n                </button>\n            </form>`\n})\n\n//# sourceURL=webpack://internet_shop/./public/js/FilterComp.js?");

/***/ }),

/***/ "./public/js/ProductComponent.js":
/*!***************************************!*\
  !*** ./public/js/ProductComponent.js ***!
  \***************************************/
/***/ (() => {

eval("Vue.component('products', {\n   data(){\n       return {\n           catalogUrl: '/catalogData.json',\n           filtered: [],\n           products: [],\n           imgProduct: 'https://placehold.it/200x150'\n       }\n   },\n    mounted(){\n        this.$parent.getJson(`/api/products`)\n            .then(data => {\n                for (let item of data){\n                    item.imgPath = `img/card${item.id_product}.png`;\n                    this.$data.products.push(item);\n                    this.$data.filtered.push(item);\n                }\n            });\n    },\n    methods: {\n        filter(userSearch){\n            let regexp = new RegExp(userSearch, 'i');\n            this.filtered = this.products.filter(el => regexp.test(el.product_name));\n        }\n    },\n   template: `<div class=\"card__box\">\n                <product v-for=\"item of filtered\" \n                :key=\"item.id_product\" \n                :img=\"item.imgPath\"\n                :product=\"item\"\n                @add-product=\"$root.$refs.cart.addProduct\"></product>\n               </div>`\n});\nVue.component('product', {\n    props: ['product', 'img'],\n    template: `<div class=\"card__item\">\n    <a class=\"card__item_link\" href=\"product.html\"><img class=\"card__item_img\" :src=\"img\"\n            alt=\"some img\">\n        <div class=\"card__item_description\">\n            <h4 class=\"card__item_header\">{{product.product_name}}</h4>\n            <p class=\"text card__item_text\">Known for her sculptural takes on traditional tailoring,\n                Australian\n                arbiter of cool Kym Ellery teams up with Moda Operandi.</p> <span\n                class=\"card__item_price\">\\${{product.price}}</span>\n        </div>\n    </a>\n    <div class=\"add__item_box\" @click=\"$emit('add-product', product)\">\n        <a href=\"#\" class=\"card__item_addtocart\">\n            <i class=\"fas fa-shopping-cart\"></i>\n            <p class=\"add__item_txt\">Add to Cart</p>\n        </a>\n    </div>\n</div>`\n})\n\n//# sourceURL=webpack://internet_shop/./public/js/ProductComponent.js?");

/***/ }),

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/***/ (() => {

eval("\nconst app = new Vue({\n    el: '#app',\n    data: {\n        userSearch: '',\n    },\n    methods: {\n        getJson(url){\n            return fetch(url)\n                .then(result => result.json())\n                .catch(error => {\n                    // console.log(error)\n                    this.$refs.error.text = error;\n                })\n        },\n        postJson(url, data){\n            return fetch(url, {\n                method: 'POST',\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify(data)\n            })\n                .then(result => result.json())\n                .catch(error => {\n                    // console.log(error)\n                    this.$refs.error.text = error;\n                })\n        },\n        putJson(url, data){\n            return fetch(url, {\n                method: 'PUT',\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify(data)\n            })\n                .then(result => result.json())\n                .catch(error => {\n                    // console.log(error)\n                    this.$refs.error.text = error;\n                })\n        },\n        delJson(url, data){\n            return fetch(url, {\n                method: 'DELETE',\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify(data)\n            })\n                .then(result => result.json())\n                .catch(error => this.$refs.error.setText(error))\n        },\n\n\n    },\n    mounted(){\n\n\n    }\n\n});\n\n\n\n//# sourceURL=webpack://internet_shop/./public/js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_modules__["./public/js/main.js"]();
/******/ 	__webpack_modules__["./public/js/CartComponent.js"]();
/******/ 	__webpack_modules__["./public/js/ErrorComp.js"]();
/******/ 	__webpack_modules__["./public/js/FilterComp.js"]();
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/ProductComponent.js"]();
/******/ 	
/******/ })()
;