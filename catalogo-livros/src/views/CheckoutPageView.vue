<!-- src/views/CheckoutPage.vue -->
<template>
    <div>
      <AppNavbar />
      <div class="container py-5">
        <h2>Finalizar Compra</h2>
        <div class="row">
          <div class="col-md-6">
            <h3>Resumo do Pedido</h3>
            <ul class="list-group mb-3">
              <li
                class="list-group-item d-flex justify-content-between lh-sm"
                v-for="livro in livrosSelecionados"
                :key="livro.id"
              >
                <div>
                  <h6 class="my-0">{{ livro.titulo }}</h6>
                  <small class="text-muted">{{ livro.autor }}</small>
                </div>
                <span class="text-muted">{{ currency(livro.preco) }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Total (BRL)</span>
                <strong>{{ currency(total) }}</strong>
              </li>
            </ul>
          </div>
          <div class="col-md-6">
            <h3>Informações de Pagamento</h3>
            <form @submit.prevent="comprarLivro">
              <div class="mb-3">
                <label for="nome" class="form-label">Nome Completo</label>
                <input type="text" class="form-control" id="nome" v-model="nome" required />
              </div>
              <!-- <div class="mb-3">
                <label for="email" class="form-label">E-mail</label>
                <input type="email" class="form-control" id="email" v-model="email" required />
              </div> -->
              <div class="mb-3">
                <label for="cartao" class="form-label">Número do Cartão</label>
                <input type="text" class="form-control" id="cartao" v-model="numeroCartao" required />
              </div>
              <div class="mb-3">
                <label for="validade" class="form-label">Validade (MM/AA)</label>
                <input type="text" class="form-control" id="validade" v-model="validadeCartao" required />
              </div>
              <div class="mb-3">
                <label for="cvv" class="form-label">CVV</label>
                <input type="text" class="form-control" id="cvv" v-model="cvvCartao" required />
              </div>
              <button type="submit" class="btn btn-primary">Confirmar Pagamento</button>
            </form>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  </template>
  
  <script >
  import AppNavbar from '../components/AppNavbar.vue';
  import AppFooter from '../components/AppFooter.vue';
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router'
  import { useAuthStore } from '../store/auth';
  import { buyBook, getFindBook } from '@/service/apiRequests';
  
  export default {
    name: 'CheckoutPage',
    components: {
      AppNavbar,
      AppFooter,
    },
    data() {
      return {
        livrosSelecionados: [],
      };
    },
    computed: {
      total() {
        return this.livrosSelecionados.reduce((total, livro) => {
          return (total + livro.preco);
        }, 0);
      },
    },
    setup() {
      const nome = ref('');
      const numeroCartao = ref('');
      const validadeCartao = ref('');
      const cvvCartao = ref('');
      const route = useRoute(); 
      const authStore = useAuthStore();
      const router = useRouter();
  
      return {
        nome,
        router,
        route,
        numeroCartao,
        validadeCartao,
        cvvCartao,
        authStore,
      };
    },
    created() {
      this.carregarLivro();
    },
    methods: {
      currency(value) {
        return 'R$ ' + parseFloat(value).toFixed(2).replace('.', ',');
      },
      async carregarLivro() {
        const id = this.route.params.id;
        try {
          const response = await getFindBook(id);
          console.log('response', response);
          
          const livro = {
            ...response.attributes,
            id: response.id,
          };
          
          this.livrosSelecionados.push(livro);
          console.log('livros', this.livrosSelecionados.filter((item) => item.id === id));
          
        } catch (error) {
          console.error(error);
        }
      },
      async comprarLivro(){
        try {
          
          const payment = {
            nome: this.nome,
            numeroCartao: this.numeroCartao,
            validadeCartao: this.validadeCartao,
            cvvCartao: this.cvvCartao,
            total: this.total,
          }
          console.log('this.livrosSelecionados[0].id', this.livrosSelecionados[0].id);
          console.log('authStore.user.id', this.authStore.user.id);
          await buyBook(this.livrosSelecionados[0].id, this.authStore.user.id, this.authStore.token, payment);
  
          alert('Compra realizada com sucesso!');
          this.router.push('/catalogo');
        } catch (error) {
          console.error('Erro ao processar pagamento:', error);
          alert('Erro ao processar pagamento. Tente novamente mais tarde.');
        }
      }
    },
  };
  </script>
  
  <style scoped>
  /* Estilos opcionais para melhorar a aparência da página */
  </style>