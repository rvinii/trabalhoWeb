<!-- src/views/EditarLivro.vue -->
<template>
  <div>
    <AppNavbar/>
    <div class="container py-5">
      <h2>Minhas Compras</h2>
      <div v-if="compras.length  > 0">
          <div v-for="compra in compras" :key="compra.id" class="card mb-3">
            <div class="card-header">
              Compra #{{ compra.id }} - Total: {{ currency(compra.attributes.preco) }}
            </div>
            <div class="card-body">
              <h5 class="card-title">Livro Comprado:</h5>
                <!-- <ul>
                  <li v-for="livro in compra.livros" :key="livro.id">
                    {{ livro.titulo }} - {{ livro.autor }}
                  </li>
                </ul> -->
            </div>
          </div>
        </div>
        <div v-else>
          <p>Você ainda não realizou nenhuma compra.</p>
        </div>
    </div>
    <AppFooter/> 
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../store/auth'
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';
import axios from 'axios';
export default {
  name: 'MinhasCompras',
  components: {
    AppNavbar,
    AppFooter,
  },
  setup() {
    const compras = ref([]);
    const authStore = useAuthStore();

    const carregarCompras = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/compras/`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        console.log('response', response)
        compras.value = response.data.data;
      } catch (error) {
        console.error('Erro ao carregar compras:', error);
        alert('Erro ao carregar suas compras. Tente novamente mais tarde.');
      }
    };

    onMounted(() => {
      carregarCompras();
    });

    return {
      carregarCompras,
      compras,
    };
  },
  methods: {
    currency(value) {
      return 'R$ ' + parseFloat(value).toFixed(2).replace('.', ',');
    },
  },
};
</script>

<style scoped>
.card-header {
  background-color: #f8f9fa;
  font-weight: bold;
}
</style>
