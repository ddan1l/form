<template>
  <div class="callback">
    <div class="callback__wrapper container">
        <div :class="{'hidden': !dataSaved}" class="success-message">
           <h2> Вопрос успешно задан!</h2>
          <b-button :to="{name: 'List'}" variant="primary mt-3">Перейти к списку результатов</b-button>
        </div>
        <div  :class="{'hidden': dataSaved}">
          <h1 class="mb-5 text-start w-100">Форма обратной связи</h1>
          <b-form class="callback__form" @submit="onSubmit">
            <b-form-group label="Ваше имя:" label-for="name">
              <b-form-input
                  id="name"
                  class="mt-2"
                  v-model="form.name"
                  :state="validator(() => form.name !== '')"
                  placeholder="Введите ваше имя"
              ></b-form-input>
              <b-form-invalid-feedback :state="validator(() => form.name !== '')">
                Введите ваше имя
              </b-form-invalid-feedback>
              <b-form-valid-feedback :state="validator(() => form.name !== '')">
                Вас зовут: {{form.name}}!
              </b-form-valid-feedback>
            </b-form-group>
            <b-form-group
                label="Ваш email"
                label-for="email"
                class="mt-3"
            >
              <b-form-input
                  id="email"
                  class="mt-2"
                  v-model="form.email"
                  :state="validator(() => emailReg.test(form.email))"
                  placeholder="Введите ваш email"
              ></b-form-input>
              <b-form-invalid-feedback :state="validator(() => emailReg.test(form.email))">
                Введите ваш email
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
                label="Интересующий вопрос"
                label-for="question"
                class="mt-3"
                description="Это может быть что-угодно!"
            >
              <b-form-textarea
                  id="question"
                  class="mt-2"
                  :state="validator(() => form.question !== '')"
                  v-model="form.question"
                  type="text"
                  placeholder="Введите ваш вопрос"
              ></b-form-textarea>
              <b-form-invalid-feedback :state="validator(() => form.question !== '')">
                Введите ваш вопрос
              </b-form-invalid-feedback>
            </b-form-group>
            <b-button :disabled="loading" type="submit" class="mt-4 callback__submit" variant="primary">
              <b-spinner v-if="loading" small></b-spinner>
              <span v-else>Отправить вопрос</span>
            </b-button>
          </b-form>
        </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  name: "callback-form",
  data() {
    return {
      form: {
        email: '',
        name: '',
        question: '',
      },
      loading: false,
      dataSaved: false,
      isValid: true,
      validate: false,
      //eslint-disable-next-line
      emailReg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      if (this.name !== '' && this.question !== '' &&  this.emailReg.test(this.form.email)){
        this.save()
      }
      else {
        this.validate = true
      }
    },
     save(){
      this.loading = true
      setTimeout(async () => {
        const raw = Object.assign({date: new Date().toLocaleString()}, this.form)
        await firebase.firestore().collection('questions').add(raw)
        this.loading = false
        this.dataSaved = true
      }, 1000)
    },
    validator(callback){
      return this.validate ? callback() : null
    }
  },

}
</script>

<style scoped>
  .success-message{
    transition: .3s;
    transition-delay: .5s;
    position: absolute;
    text-align: center;
  }
  .hidden{
    transition: .3s;
    transform: scale(0);
  }
  .callback__submit{
    width: 100%;
  }
  .callback__wrapper{
    position: relative;
    min-height: 100vh;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .callback__form{
    width: 100%;
  }
</style>