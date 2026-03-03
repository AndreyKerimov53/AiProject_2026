<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mt-5">
          <!-- Картинка из данных объявления -->
          <v-img
            height="400px"
            :src="ad.src"
            cover
          ></v-img>

          <!-- Текст из данных объявления -->
          <v-card-text>
            <h1 class="text--primary mb-3">{{ ad.title }}</h1>
            <p>{{ ad.desc }}</p>
          </v-card-text>

          <!-- Кнопки -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="warning" color="orange">Edit</v-btn>
            <v-btn class="success" color="green">Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    ad() {
      return this.$store.getters.adById(this.id)
    }
  }
}
</script>