<template>
    <div class="home">
      <div class="home__wrapper">
        <b-button :to="{name: 'List'}" variant="primary mb-3">Перейти к списку результатов</b-button>
        <b-button :to="{name: 'Form'}" variant="secondary">Задать вопрос</b-button>
      </div>
    </div>
</template>

<script>
export default {
name: "home"
}
</script>

<style scoped>
  .home__wrapper{
    min-height: 100vh;
    width: max-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0  auto;
  }
</style>