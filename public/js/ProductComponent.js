Vue.component('products', {
   data(){
       return {
           catalogUrl: '/catalogData.json',
           filtered: [],
           products: [],
           imgProduct: 'https://placehold.it/200x150'
       }
   },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    item.imgPath = `img/card${item.id_product}.png`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
   template: `<div class="card__box">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="item.imgPath"
                :product="item"
                @add-product="$root.$refs.cart.addProduct"></product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `<div class="card__item">
    <a class="card__item_link" href="product.html"><img class="card__item_img" :src="img"
            alt="some img">
        <div class="card__item_description">
            <h4 class="card__item_header">{{product.product_name}}</h4>
            <p class="text card__item_text">Known for her sculptural takes on traditional tailoring,
                Australian
                arbiter of cool Kym Ellery teams up with Moda Operandi.</p> <span
                class="card__item_price">\${{product.price}}</span>
        </div>
    </a>
    <div class="add__item_box" @click="$emit('add-product', product)">
        <a href="#" class="card__item_addtocart">
            <i class="fas fa-shopping-cart"></i>
            <p class="add__item_txt">Add to Cart</p>
        </a>
    </div>
</div>`
})