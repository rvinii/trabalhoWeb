<!-- src/views/NovoLivro.vue -->
<template>
  <div>
    <AppNavbar />
    <div class="container py-5">
      <h2>Adicionar Novo Livro</h2>
      <form @submit.prevent="criarLivro">
        <div class="mb-3">
          <label for="titulo" class="form-label">Título</label>
          <input type="text" class="form-control" id="titulo" v-model="livro.titulo" required />
        </div>
        <div class="mb-3">
          <label for="autor" class="form-label">Autor</label>
          <input type="text" class="form-control" id="autor" v-model="livro.autor" required />
        </div>
        <div class="mb-3">
          <label for="sinopse" class="form-label">Sinopse</label>
          <textarea class="form-control" id="sinopse" v-model="livro.sinopse" required></textarea>
        </div>
        <div class="mb-3">
          <label for="genero" class="form-label">Gênero</label>
          <input type="text" class="form-control" id="genero" v-model="livro.genero" required />
        </div>
        <div class="mb-3">
          <label for="preco" class="form-label">Preço</label>
          <input type="number" class="form-control" id="preco" v-model="livro.preco" required />
        </div>
        <div class="mb-3">
          <label for="capa" class="form-label">Capa</label>
          <input type="file" class="form-control" id="capa" @change="onFileChange" required />
        </div>
        <button type="submit" class="btn btn-primary">Salvar</button>
      </form>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from '../components/AppNavbar.vue';
import AppFooter from '../components/AppFooter.vue';
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { createBook } from '@/service/apiRequests';
import { useRouter } from 'vue-router';

export default {
  name: 'NovoLivro',
  components: {
    AppNavbar,
    AppFooter,
  },
  setup() {
    const livro = ref({
      titulo: '',
      autor: '',
      sinopse: '',
      genero: '',
      preco: 0,
    });
    const capa = ref(null);
    const authStore = useAuthStore();
    const router = useRouter();

    const onFileChange = (event) => {
      capa.value = event.target.files[0];
    };

    const criarLivro = async () => {
      try {
        await createBook(capa, livro, authStore.token)

        alert('Livro criado com sucesso!');
        router.push('/admin');
      } catch (error) {
        console.error(error);
        alert('Erro ao criar o livro.');
      }
    };

    return {
      livro,
      capa,
      onFileChange,
      criarLivro,
    };
  },
};
</script>
