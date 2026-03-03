<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mt-5">
          <!-- Блок 1: Картинка -->
          <v-img
            height="400px"
            src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
            cover
          ></v-img>

          <!-- Блок 2: Текст -->
          <v-card-text>
            <h1 class="text--primary mb-3">Lorem Ipsum</h1>
            <p>
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type 
              specimen book. It has survived not only five centuries, but also the leap into 
              electronic typesetting, remaining essentially unchanged. It was popularised in 
              the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
              and more recently with desktop publishing software like Aldus PageMaker including 
              versions of Lorem Ipsum.
            </p>
          </v-card-text>

          <!-- Блок 3: Кнопки -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="warning">Edit</v-btn>
            <v-btn class="success">Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      // Временные данные
      ad: {
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        title: "Lorem Ipsum",
        desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..."
      }
    }
  }
}
</script>