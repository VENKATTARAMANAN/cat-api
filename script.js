new Vue({ 
  el: '#app',
  vuetify: new Vuetify(),
  data: {
      country_flag_url:"",
    images: [],
    breeds:[],
    selected_breed: {},
    current_image: {}
  },
  created(){
      this.getBreeds();
  } ,
  watch: {
     
      selected_breed: function()
      {
          

          let country_code = this.selected_breed.country_code.toLowerCase();

          this.country_flag_url = `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/1x1/${country_code}.svg`;
          this.getImages();
      }
  },
  methods:{

      async getBreeds()
      {
          try{
              axios.defaults.headers.common['x-api-key'] = "live_r7wWRFtdxTmMKZL28dz2soSdyh57B9bTCpg3kqEMzGGApdRvg0vaDhtK42sHrhVz" 
              
              let response = await axios.get('https://api.thecatapi.com/v1/breeds/' ) 
              this.breeds = response.data;
              console.log("-- ("+this.breeds.length +") Breeds from TheCatAPI.com")
              
              
              this.selected_breed = this.breeds[10]
          }catch(err){
              console.log(err)
          }
      },
      async getImages()
      {
          try{
              
              let query_params = {
                  breed_ids: this.selected_breed.id,
                  limit:8
              }

              let response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: query_params} ) 
              
              this.pagination_count = response.headers['pagination-count'];
              this.images = response.data 
              this.current_image = this.images[0]

              console.log("-- ("+this.images.length +") Images from TheCatAPI.com")
              console.log( this.pagination_count ,'images available for this query.')
              
          }catch(err){
              console.log(err)
          }
      }
      
  }
})