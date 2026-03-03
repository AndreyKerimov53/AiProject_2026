<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" lg="6">
        <h1 class="text--secondary mb-3 mt-3">My ads</h1>
        
        <!-- Список объявлений с данными из store -->
        <v-card 
          v-for="ad in myAds" 
          :key="ad.id" 
          class="mb-3" 
          max-width="1000"
        >
          <v-row>
            <!-- Блок картинки - 4 колонки -->
            <v-col xs="4">
              <v-img 
                :src="ad.src" 
                height="175px" 
                cover
              ></v-img>
            </v-col>

            <!-- Блок текста и кнопки - 8 колонок -->
            <v-col xs="8">
              <h2 class="text--primary">{{ ad.title }}</h2>
              <p style="height: 85px; overflow: hidden; text-overflow: ellipsis;">
                {{ ad.desc }}
              </p>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                  color="primary" 
                  variant="text" 
                  :to="'/ad/' + ad.id"
                >
                  Open
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    myAds() {
      return this.$store.getters.myAds
    }
  }
}
</script>