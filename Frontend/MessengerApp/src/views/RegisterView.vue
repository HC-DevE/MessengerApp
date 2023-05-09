<template>
    <div class="register-form">
      <h2>Inscription</h2>
      <form @submit="handleSubmit">
        <div class="form-group">
          <label for="username">Username :</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="email">Email :</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Mot de passe :</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">S'inscrire</button>
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
  
        // Effectuez ici les actions d'inscription
        // Vous pouvez utiliser les valeurs de this.name, this.email et this.password
        
        // Exemple de redirection vers une autre page après l'inscription
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  .register-form {
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
  
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  </style>
  