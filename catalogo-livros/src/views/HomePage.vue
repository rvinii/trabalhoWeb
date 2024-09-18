<!-- src/views/HomePage.vue -->
<template>
  <div>
    <AppNavbar />
    <main>
      <section class="py-5 text-center container">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light">Bem-vindo ao Livros ao Toque</h1>
            <p class="lead text-muted">
              Explore uma variedade de livros eletrônicos disponíveis para você.
            </p>
            <p>
              <router-link to="/catalogo" class="btn btn-primary my-2">Ver Catálogo</router-link>
            </p>
          </div>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from '../components/AppNavbar.vue';
import AppFooter from '../components/AppFooter.vue';

export default {
  name: 'HomePage',
  components: {
    AppNavbar,
    AppFooter,
  },
};
</script>
