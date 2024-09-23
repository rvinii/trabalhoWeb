<!-- src/views/AdminDashboard.vue -->
<template>
  <div>
    <AppNavbar />
    <div class="container py-5">
      <h2>Painel Administrativo</h2>
      <router-link to="/admin/novo-livro" class="btn btn-success mb-3">Adicionar Novo Livro</router-link>
      <table class="table">
        <thead>
          <tr>
            <th>Capa</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="livro in livros" :key="livro.id">
            <td>
              <img
                v-if="livro.capa"
                :src="getCapaUrl(livro)"
                alt="Capa do Livro"
                style="width: 50px;"
              />
            </td>
            <td>{{ livro.titulo }}</td>
            <td>{{ livro.autor }}</td>
            <td>
              <router-link
                :to="`/admin/editar-livro/${livro.id}`"
                class="btn btn-sm btn-primary me-1"
                >Editar</router-link
              >
              <button class="btn btn-sm btn-danger" @click="deletarLivro(livro.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from '../components/AppNavbar.vue';
import AppFooter from '../components/AppFooter.vue';
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { getBooks, deleteBook, getCapaUrl } from '@/service/apiRequests';

export default {
  name: 'AdminDashboard',
  components: {
    AppNavbar,
    AppFooter,
  },
  
  
  setup() {
    const livros = ref([]);
    const authStore = useAuthStore();

    const carregarLivros = async () => {
      try {
        const response = await getBooks();
        console.log('response', response);
        livros.value = response.map((item) => ({
          id: item.id,
          ...item.attributes,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    const deletarLivro = async (id) => {
      if (confirm('Deseja realmente excluir este livro?')) {
        try {
          await deleteBook(id, authStore.token);
          livros.value = livros.value.filter((livro) => livro.id !== id);
          alert('Livro excluído com sucesso!');
        } catch (error) {
          console.error(error);
          alert('Erro ao excluir o livro.');
        }
      }
    };
    onMounted(() => {
      carregarLivros();
    });

    return {
      livros,
      deletarLivro,
      getCapaUrl,
    };
  },
};
</script>
