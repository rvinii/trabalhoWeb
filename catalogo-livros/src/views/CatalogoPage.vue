<!-- src/views/CatalogoPage.vue -->
<template>
    <div>
      <AppNavbar />
      <main>
        <div class="album py-5 bg-light">
          <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              <div class="col" v-for="livro in livros" :key="livro.id">
                <div class="card shadow-sm">
                  <img
                    v-if="livro.capa"
                    :src="getCapaUrl(livro)"
                    class="bd-placeholder-img card-img-top"
                    alt="Capa do Livro"
                  />
                  <div class="card-body">
                    <h5 class="card-title">{{ livro.titulo }}</h5>
                    <p class="card-text">{{ livro.autor }}</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <router-link :to="`/livro/${livro.id}`" class="btn btn-sm btn-outline-secondary">
                          Ver detalhes
                        </router-link>
                      </div>
                      <small class="text-muted">{{ formatCurrency(livro.preco) }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  </template>
  
  <script>
  import AppNavbar from '../components/AppNavbar.vue';
  import AppFooter from '../components/AppFooter.vue';
  import axios from 'axios';
  
  export default {
    name: 'CatalogoPage',
    components: {
      AppNavbar,
      AppFooter,
    },
    data() {
      return {
        livros: [],
      };
    },
    created() {
      this.carregarLivros();
    },
    methods: {
      async carregarLivros() {
        try {
          const response = await axios.get('http://localhost:1337/api/livros?populate=*');
          this.livros = response.data.data.map((item) => ({
            id: item.id,
            ...item.attributes,
          }));
        } catch (error) {
          console.error(error);
        }
      },
      getCapaUrl(livro) {
        return 'http://localhost:1337' + livro.capa.data.attributes.formats.thumbnail.url;
      },
      formatCurrency(value) {
        return 'R$ ' + parseFloat(value).toFixed(2).replace('.', ',');
      },
    },
  };
  </script>
  
  <style scoped>
  .card-img-top {
    height: 225px;
    object-fit: cover;
  }
  </style>
  