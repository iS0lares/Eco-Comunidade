<template>
  <v-form ref="forgetPassword" @submit.prevent="recoverPassword()">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="8" xl="8" xxl="8">
        <p
          class="justify-center pa-0 text-center text-white align-center text-h5 mb-4 mr-6"
        >
          <span>
            <v-btn
              @click="$emit('passwordOnFunc')"
              variant="text"
              rounded="xl"
              icon="mdi-arrow-left"
            />
          </span>
          Esqueceu a senha
        </p>
        <v-row>
          <v-col cols="12" class="flex-start pb-0">
            <v-text-field
              :rules="[validEmail, required]"
              class="pb-0"
              type="text"
              variant="solo-filled"
              placeholder="E-mail"
              outlined
              label="E-mail"
              v-model="email"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col justify-center class="text-center pt-0 pb-8">
            <v-btn
              type="submit"
              class="text-capitalize px-"
              elevation="4"
              color="#A2A644"
              dark
            >
              Enviar
            </v-btn>
            <v-progress-circular
              v-if="isLoading"
              indeterminate
              color="#A2A644"
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isLoading = ref(false);
const email = ref("");

defineEmits(["passwordOnFunc"]);

const recoverPassword = async (): Promise<void> => {
  const isValid = await forgetPassword.value.validate();
  if (isValid.valid) {
    navigateTo("/login");
  }
};

const validEmail = (email: string): string | boolean => {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)) {
    return true;
  }
  return "Email inválido.";
};

const required = (value: string | boolean): string | boolean => {
  if (value) {
    return true;
  }
  return "este campo é necessario";
};
</script>
