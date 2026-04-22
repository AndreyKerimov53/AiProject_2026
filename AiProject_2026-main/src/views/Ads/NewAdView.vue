<template>
  <v-container>
    <v-row>
      <v-col cols="8" offset="2">
        <h1 class="text--secondary mb-3 mt-3">Create Ad</h1>
        <v-form v-model="valid" ref="form" validation>
          <v-text-field
            name="title"
            label="Ad Title"
            type="text"
            v-model="title"
            :rules="[v => !!v || 'Title is required']"
          ></v-text-field>
          <v-textarea
            name="description"
            label="Ad Description"
            type="text"
            v-model="description"
            :rules="[v => !!v || 'Description is required']"
            class="mb-3"
          ></v-textarea>
        </v-form>
        
        <v-row>
          <v-col cols="12">
            <v-btn 
              class="mt-3" 
              color="warning"
              @click="$refs.fileInput.click()"
            >
              Upload
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
            <input 
              type="file" 
              ref="fileInput" 
              style="display: none" 
              @change="onFileSelected"
              accept="image/jpeg,image/png,image/jpg,image/gif"
            >
          </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="12">
            <img 
              :src="imagePreview || 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'" 
              height="150" 
              class="mt-3"
            >
          </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="12">
            <v-switch
              v-model="promo"
              label="Ad to Promo?"
            ></v-switch>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="12">
            <v-spacer></v-spacer>
            <v-btn
              color="success"
              @click="createAd"
              :loading="loading"
              :disabled="!valid || loading || !imageFile"
            >Create Ad</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      title: "",
      description: "",
      promo: false,
      imageFile: null,
      imagePreview: null
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  },
  methods: {
    onFileSelected(event) {
      const file = event.target.files[0]
      if (file) {
        this.imageFile = file
        const reader = new FileReader()
        reader.onload = e => {
          this.imagePreview = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    createAd() {
      if (this.$refs.form.validate() && this.imageFile) {
        const formData = new FormData()
        formData.append('title', this.title)
        formData.append('desc', this.description)
        formData.append('promo', this.promo)
        formData.append('image', this.imageFile)
        
        this.$store.dispatch("createAd", formData)
          .then(() => {
            this.$router.push("/list")
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
}
</script>