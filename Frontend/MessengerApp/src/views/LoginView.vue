<template>
    <div class="login-form">
      <h2>Connexion</h2>
      <form @submit="handleSubmit">
        <div class="form-group">
          <label for="username">Username :</label>
          <input type="username" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="email">Email :</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Mot de passe :</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  </template>
  
<script>
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: ''
      };
    },
    methods: {
      handleSubmit(event) {
        event.preventDefault();
        // Effectuez ici les actions de connexion
        // Vous pouvez utiliser les valeurs de this.email et this.password
        
        // Exemple de redirection vers une autre page après la connexion
        this.$router.push('/');
      }
    }
  };
</script>
  
  <style scoped>
  .login-form {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input[type="username"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  </style>
  