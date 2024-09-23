<template>
  <div>
    <header data-bs-theme="dark">
      <div class="collapse text-bg-dark" id="navbarHeader">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4">
              <h4>About</h4>
              <p class="text-body-secondary">Add some information about the album below, the author, or any other background context.</p>
            </div>
            <div class="col-sm-4 offset-md-1 py-4">
              <h4>Contact</h4>
              <ul class="list-unstyled">
                <li><a href="#" class="text-white">Follow on Twitter</a></li>
                <li><a href="#" class="text-white">Like on Facebook</a></li>
                <li><a href="#" class="text-white">Email me</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-dark bg-dark shadow-sm">
        <div class="container">
          <a href="#" class="navbar-brand d-flex align-items-center">
            <strong>Livros ao Toque</strong>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </header>

    <main>
      <section class="py-5 text-center container">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light">Livros ao Toque</h1>
            <p class="lead text-body-secondary">Explore nossa coleção de livros em formato PDF e tenha acesso a um vasto conteúdo.</p>
            <p>
              <a href="#" class="btn btn-primary my-2">Ver coleção</a>
              <a href="#" class="btn btn-secondary my-2">Ação secundária</a>
            </p>
          </div>
        </div>
      </section>

      <div class="album py-5 bg-body-tertiary">
        <div class="container">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <!-- Repita este bloco para exibir vários livros -->
            <div class="col" v-for="(livro, index) in livros" :key="index">
              <div class="card shadow-sm">
                <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                  <rect width="100%" height="100%" fill="#55595c"></rect>
                  <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
                </svg>
                <div class="card-body">
                  <p class="card-text">{{ livro.descricao }}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">Ver</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Editar</button>
                    </div>
                    <small class="text-body-secondary">{{ livro.tempo }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="text-body-secondary py-5">
      <div class="container">
        <p class="float-end mb-1">
          <a href="#">Voltar ao topo</a>
        </p>
        <p class="mb-1">Livros ao Toque © Bootstrap, personalizável para seu uso!</p>
        <p class="mb-0">Novo no Bootstrap? <a href="/">Visite a página inicial</a> ou leia nosso <a href="#">guia de introdução</a>.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LivrosAoToque',
  data() {
    return {
      livros: [
        { descricao: 'Este é um exemplo de livro em PDF.', tempo: '9 mins' },
        { descricao: 'Outro livro interessante disponível para leitura.', tempo: '15 mins' },
        // Adicione mais livros à lista conforme necessário
      ],
    };
  },
};
</script>

<style scoped>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  user-select: none;
}
</style>
