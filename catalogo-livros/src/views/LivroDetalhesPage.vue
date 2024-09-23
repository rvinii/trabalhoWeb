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
          <p><strong>Sinopse:</strong> <br/> {{ livro.sinopse }}</p>
          <div>
              <router-link :to="`/checkout/${livro.id}`" class="btn btn-sm btn-outline-secondary text-bg-danger">
                Comprar
              </router-link>
          </div>
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
import { api, baseUrl } from '@/config/api';
import { useRoute } from 'vue-router'

export default {
  name: 'LivroDetalhesPage',
  components: {
    AppNavbar,
    AppFooter,
  },
  setup() {
    const router = useRoute();
    console.log('router', router.params);
    return {
      router
    }
  },
  data() {
    return {
      livro: null,  // Inicializa como null até que os dados sejam carregados
    };
  },
  created() {
    console.log('passou1111')
    this.carregarLivro();
  },
  methods: {
    async carregarLivro() {
      console.log('passou')
      const id = this.router.params.id; 
      
      try {
        const response = await api.get(`/api/livros/${id}?populate=*`);
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
        return baseUrl + livro.capa.data.attributes.url;
      }
      return ''; // Retorna uma string vazia se não houver capa
    },
    formatCurrency(value) {
      return 'R$ ' + parseFloat(value).toFixed(2).replace('.', ',');
    },
  },
};
</script>
