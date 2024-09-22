<template>
    <div>
      <AppNavbar />
      <div class="container py-5" v-if="livro">
        <div class="row">
          <div class="col-md-4">
            <img
              v-if="livro.capa && livro.capa.data && livro.capa.data.attributes"
              :src="getCapaUrl(livro)"
              class="img-fluid"
              alt="Capa do Livro"
            />
          </div>
          <div class="col-md-8">
            <h2>{{ livro.titulo }}</h2>
            <p><strong>Autor:</strong> {{ livro.autor }}</p>
            <p><strong>Gênero:</strong> {{ livro.genero }}</p>
            <p><strong>Preço:</strong> {{ formatCurrency(livro.preco) }}</p>
            <p><strong>Sinopse:</strong></p>
            <p v-html="livro.sinopse"></p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Carregando dados do livro...</p>
      </div>
      <AppFooter />
    </div>
  </template>
  
  <script>
  import AppNavbar from '../components/AppNavbar.vue';
  import AppFooter from '../components/AppFooter.vue';
  import axios from 'axios';
  
  export default {
    name: 'LivroDetalhesPage',
    components: {
      AppNavbar,
      AppFooter,
    },
    data() {
      return {
        livro: null,  // Inicializa como null até que os dados sejam carregados
      };
    },
    created() {
      this.carregarLivro();
    },
    methods: {
      async carregarLivro() {
        const id = this.$route.params.id;
        try {
          const response = await axios.get(`http://localhost:1337/api/livros/${id}?populate=*`);
          const data = response.data.data;
          this.livro = {
            ...data.attributes,
            id: data.id,
          };
        } catch (error) {
          console.error(error);
        }
      },
      getCapaUrl(livro) {
        if (livro.capa && livro.capa.data && livro.capa.data.attributes) {
          return 'http://localhost:1337' + livro.capa.data.attributes.url;
        }
        return ''; // Retorna uma string vazia se não houver capa
      },
      formatCurrency(value) {
        return 'R$ ' + parseFloat(value).toFixed(2).replace('.', ',');
      },
    },
  };
  </script>
  