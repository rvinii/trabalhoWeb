<!-- src/views/EditarLivro.vue -->
<template>
  <div>
    <div class="container py-5">
      <h2>Editar Livro</h2>
      <form @submit.prevent="atualizarLivro">
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
          <label for="capa" class="form-label">Capa (deixe em branco para manter a atual)</label>
          <input type="file" class="form-control" id="capa" @change="onFileChange" />
        </div>
        <button type="submit" class="btn btn-primary">Salvar Alterações</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRoute, useRouter } from 'vue-router';
import  {getFindBook, update} from '@/service/apiRequests';

export default {
  name: 'EditarLivro',
  setup() {
    const livro = ref({
      titulo: '',
      autor: '',
      sinopse: '',
      genero: '',
      preco: 0,
      capa: '',
    });
    console.log('livro.value', livro);
    const capa = ref(null);
    const authStore = useAuthStore();
    const route = useRoute();
    const router = useRouter();

    const carregarLivro = async () => {
      const id = route.params.id;
      try {
        const response = await getFindBook(id);
        console.log('dataaaaa', response);
        livro.value = {
          ...response.attributes,
          id: response.id,
          capa: response.attributes.capa.data.attributes.url,
        };
      } catch (error) {
        console.error(error);
        alert('Erro ao carregar o livro.');
        router.push('/admin');
      }
    };

    const onFileChange = (event) => {
      capa.value = event.target.files[0];
    };

    const atualizarLivro = async () => {
      const id = route.params.id;
      try {
        await update(livro, capa, authStore.token, id);

        alert('Livro atualizado com sucesso!');
        router.push('/admin');
      } catch (error) {
        console.error(error);
        alert('Erro ao atualizar o livro.');
      }
    };

    onMounted(() => {
      carregarLivro();
    });

    return {
      livro,
      capa,
      onFileChange,
      atualizarLivro,
    };
  },
};
</script>
