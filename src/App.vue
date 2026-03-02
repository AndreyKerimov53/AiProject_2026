<template>
  <v-app>
    <!-- Боковое меню -->
    <v-navigation-drawer app></v-navigation-drawer>
    
    <!-- Верхняя панель -->
    <v-app-bar app dark color="primary">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      
      <v-spacer></v-spacer>
      
      <!-- Кнопки в панели -->
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn>
          <v-icon start icon="mdi-gift-outline"></v-icon>
          Link One
        </v-btn>
        <v-btn>Link Two</v-btn>
        <v-btn>Link Three</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    
    <!-- Основная область -->
    <v-main>
      <v-container>
        <!-- Здесь будет контент -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>