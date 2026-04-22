<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="ad in ads"
          :key="ad._id || ad.id"
        >
          <v-card>
            <v-img
              :src="getImageUrl(ad.src)"
              height="200px"
              cover
            ></v-img>
            <v-card-title>
              <div>
                <h3 class="headline mb-0">{{ ad.title }}</h3>
                <div>{{ ad.desc }}</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text :to="'/ad/' + (ad._id || ad.id)">Open</v-btn>
              <buy-ad-modal :ad="ad"></buy-ad-modal>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    ads() {
      return this.$store.getters.ads
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
    this.$store.dispatch('fetchAds')
  }
}
</script>