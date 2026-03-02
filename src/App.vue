<template>
  <v-app>
    <v-navigation-drawer permanent>
      <v-list-item title="My Application" subtitle="Vuetify"></v-list-item>
      <v-divider></v-divider>
      <v-list-item link title="List Item 1"></v-list-item>
      <v-list-item link title="List Item 2"></v-list-item>
      <v-list-item link title="List Item 3"></v-list-item>
    </v-navigation-drawer>
    
    <v-app-bar app color="primary">
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Application Bar</v-app-bar-title>
      
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn variant="text">Link One</v-btn>
        <v-btn variant="text">Link Two</v-btn>
        <v-btn variant="text">Link Three</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    
    <v-main>
      <v-chip>Chip</v-chip>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>