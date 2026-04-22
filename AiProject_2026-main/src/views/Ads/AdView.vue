<template>
  <v-container v-if="ad">
    <v-row>
      <v-col cols="12">
        <v-card class="mt-5">
          <v-img
            height="400px"
            :src="getImageUrl(ad.src)"
            cover
          ></v-img>
          <v-card-text>
            <h1 class="text--primary mb-3">{{ ad.title }}</h1>
            <p>{{ ad.desc }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <modal-dialog :ad="ad" v-if="isOwner"></modal-dialog>
            <buy-ad-modal :ad="ad"></buy-ad-modal>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <p>Загрузка объявления...</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditAdModal from './EditAdModal.vue'

export default {
  props: ['id'],
  components: {
    'modal-dialog': EditAdModal
  },
  computed: {
    ad() {
      // Ищем по _id (MongoDB) или по id
      return this.$store.getters.ads.find(ad => ad._id === this.id || ad.id === this.id)
    },
    isOwner() {
      if (!this.ad || !this.$store.getters.user) return false
      return this.ad.userId === this.$store.getters.user.id
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
    // Если объявления еще не загружены - загружаем
    if (this.$store.getters.ads.length === 0) {
      this.$store.dispatch('fetchAds').then(() => {
        // Проверяем найдено ли объявление после загрузки
        if (!this.ad) {
          console.error('Объявление не найдено, id:', this.id)
        }
      })
    }
  }
}
</script>