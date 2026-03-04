<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mt-5">
          <v-img
            height="400px"
            :src="ad.src"
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
      return this.$store.getters.adById(this.id)
    },
    isOwner() {
      return this.ad.userId === this.$store.getters.user.id
    }
  }
}
</script>