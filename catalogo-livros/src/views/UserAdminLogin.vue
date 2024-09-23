<!-- src/views/UserAdminLogin.vue -->
<template>
  <div>
    <AppNavbar />
    <div class="container py-5">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">E-mail</label>
          <input type="email" class="form-control" id="email" v-model="email" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Senha</label>
          <input type="password" class="form-control" id="password" v-model="password" required />
        </div>
        <button type="submit" class="btn btn-primary">Entrar</button>
      </form>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from '../components/AppNavbar.vue';
import AppFooter from '../components/AppFooter.vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  name: 'UserLogin',
  components: {
    AppNavbar,
    AppFooter,
  },
  setup() {
    const email = ref('');
    const password = ref('');
    const authStore = useAuthStore();
    const router = useRouter();

    const login = async () => {
      try {
        await authStore.login({ email: email.value, password: password.value });
        router.push('/');
      } catch (error) {
        console.error(error);
        alert('Credenciais inválidas!');
      }
    };

    return {
      email,
      password,
      login,
    };
  },
};
</script>
