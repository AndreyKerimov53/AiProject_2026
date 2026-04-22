<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" lg="6">
        <h1 class="text--secondary mb-3 mt-3">My ads</h1>
        
        <div v-if="ads.length === 0">
          <p class="text-center">У вас пока нет объявлений. <router-link to="/new">Создать?</router-link></p>
        </div>
        
        <v-card 
          v-for="ad in ads" 
          :key="ad._id || ad.id" 
          class="mb-3" 
          max-width="1000"
        >
          <v-row>
            <v-col cols="4">
              <v-img 
                :src="getImageUrl(ad.src)" 
                height="175px" 
                cover
              ></v-img>
            </v-col>
            <v-col cols="8">
              <h2 class="text--primary">{{ ad.title }}</h2>
              <p style="height: 85px; overflow: hidden; text-overflow: ellipsis;">
                {{ ad.desc }}
              </p>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                  color="primary" 
                  variant="text" 
                  :to="'/ad/' + (ad._id || ad.id)"
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
    ads() {
      return this.$store.getters.myAds
    }
  },
  methods: {
    getImageUrl(src) {
      if (!src) return ''
      if (src.startsWith('http')) return src
      return 'http://localhost:3000' + src
    }
  },
  mounted() {
    // Загружаем объявления если их нет
    if (this.$store.getters.ads.length === 0) {
      this.$store.dispatch('fetchAds')
    }
  }
}
</script>