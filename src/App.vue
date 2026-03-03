<template>
  <v-app>
    <!-- Боковое меню -->
    <v-navigation-drawer app v-model="drawer">
      <!-- Заголовок -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            КИПУ
          </v-list-item-title>
          <v-list-item-subtitle>
            Учебный проект
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- Разделитель -->
      <v-divider></v-divider>

      <!-- Динамическое меню в дровере -->
      <v-list dense>
        <v-list-item
          v-for="link in links"
          :key="link.title"
          :to="link.url"
        >
          <template v-slot:prepend>
            <v-icon :icon="link.icon"></v-icon>
          </template>
          <v-list-item-title>{{ link.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <!-- Верхняя панель -->
    <v-app-bar app dark color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      
      <!-- Ссылка на главную страницу -->
      <v-toolbar-title>
        <v-btn to="/" variant="text">
          Home
        </v-btn>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      
      <!-- Динамическое меню в хедере -->
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="link in links"
          :key="link.title"
          :to="link.url"
          variant="text"
        >
          <v-icon
            start
            :icon="link.icon"
          ></v-icon>
          {{ link.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    
    <!-- Основная область -->
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- для отображения ошибок  -->
    <v-snackbar
      v-model="error"
      multi-line
      :timeout="2000"
      color="primary"
    >
      {{ error }}
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="closeError"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      links: [
        {title: "Login", icon: "mdi-gift-outline", url: "/login"},
        {title: "Registration", icon: "mdi-gift-outline", url: "/registration"},
        {title: "Orders", icon: "mdi-gift-outline", url: "/orders"},
        {title: "New ad", icon: "mdi-gift-outline", url: "/new"},
        {title: "My ads", icon: "mdi-gift-outline", url: "/list"}
      ]
    }
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  methods: {
    closeError() {
      this.$store.dispatch('clearError')
    }
  }
}
</script>