<template>
  <div class="container mt-4">
   <div class="d-flex justify-content-between align-items-center">
     <h2>Список вопросов</h2>
     <div class="sort-panel">
       <b-button :disabled="$route.query.sort === 'desc'" :to="{name: 'List', query: {sort: 'desc'}}" type="submit" variant="primary">
         Сначала новые
       </b-button>
       <b-button :disabled="$route.query.sort === 'asc'" :to="{name: 'List', query: {sort: 'asc'}}" class="ms-3" type="submit" variant="primary">
         Сначала старые
       </b-button>
     </div>
   </div>
    <b-button :to="{name: 'Form'}" class="mt-3" variant="secondary">Задать вопрос</b-button>
    <div class="row mt-5">
      <div v-for="(item, id) in questions" :key="id" class="col-6 mb-4">
        <b-card :title="item.name" :sub-title="item.email">
          <b-card-body class="ps-0">
           <p class="mb-1">
             <span class="me-1 fw-bold">Вопрос задан:</span>
             {{item.date}}
           </p>
            <p>
              <span class="me-1 fw-bold">Идентификатор:</span>
              {{id}}
            </p>
            <p>
              <span class="me-1 fw-bold">Вопрос:</span>
              {{item.question}}
            </p>
          </b-card-body>
          <b-button type="submit"  variant="primary">
            <a :href="`mailto:${item.email}`">
              Ответить
            </a>
          </b-button>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import Vue from "vue"

export default {
  name: "list",
  data(){
    return{
        questions: {}
    }
  },
  methods: {
    async getQuestions(){
      this.questions = {}
      const sort = this.$route.query.sort ?? 'desc'
      await firebase.firestore().collection("questions").orderBy('date', sort).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          Vue.set(this.questions, doc.id, doc.data())
        })
      })
    }
  },
  created() {
    this.getQuestions()
  },
  watch:{
    '$route.query.sort'(){
      console.log('asdasd')
      this.getQuestions()
    }
  }
}
</script>

<style scoped>
a{
  color: white;
  text-decoration: none;
}
</style>