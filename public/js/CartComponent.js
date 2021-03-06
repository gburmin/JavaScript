 const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cart', {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
          imgCart: 'https://placehold.it/200x150',
          showCart: false
      }
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    item.imgPath = `img/card${item.id_product}.png`;
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item){
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                item.imgPath = `img/card${item.id_product}.png`;
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod)
                        }
                    })
            }

          
        },
        remove( product ) {
            if ( product.quantity > 1 ) {
                this.$parent.putJson( `/api/cart/${ product.id_product}`, { quantity: -1 } )
                    .then( data => {
                        if ( data.result ) {
                            product.quantity--;
                        }
                    } )
            } else {
                this.$parent.delJson( `/api/cart/${ product.id_product}/${product.product_name}`, product )
                    .then( data => {
                        if ( data.result ) {
                            this.cartItems.splice( this.cartItems.indexOf( product ), 1 );
                        } else {
                            console.log( 'error' );
                        }
                    } )
            }
        },
        

    },
    template: `
    <div>
    <button class="btn-cart" type="button" @click="showCart = !showCart"><i class="fas fa-shopping-cart btn-cart"></i></button>
    
           
            <div class="cart-block" v-show="showCart">   
            <h2 v-if=" cartItems.length === 0">?????????????? ??????????</h2>
                <div v-else> 
                 
                 <cart-item v-for="item of cartItems" :key="item.id_product" :img="item.imgPath" :cart-item="item" @remove="remove" @add-product="addProduct">
                 </cart-item>
                </div>   
            </div>  
            
        
    </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
    <div class="cart-item">
        <img class="cartImg" :src="img" alt="Some img">
        <div class="product-desc">
            <h3>{{ cartItem.product_name }}</h3>
            <p>????????: {{ cartItem.price }}</p>
            <div class="changeQuantity">
                <button class="del-btn btnInCart" @click="$emit('remove', cartItem)"> &times; </button>
                <p>&#160;{{ cartItem.quantity }}&#160; ????.&#160; </p>
                <button class="btnInCart" @click="$emit('add-product', cartItem)"> + </button>
            </div>          
            <p>??????????: {{ cartItem.price * cartItem.quantity }}</p>
        </div>
    </div>
    `
})