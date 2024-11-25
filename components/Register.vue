<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" xl="8" xxl="8">
      <v-form ref="signInForm" @submit.prevent="register()">
        <p
          class="d-flex justify-center text-white align-center pa-0 mr-6 text-h5"
        >
          <span>
            <v-btn
              @click="$emit('registerOnFunc')"
              variant="text"
              rounded="xl"
              icon="mdi-arrow-left"
            />
          </span>
          Solicitar cadastro
        </p>
        <v-card-text>
          <v-row>
            <v-col cols="12" class="flex-start pb-0">
              <v-text-field
                :rules="[required]"
                class="pb-0"
                type="text"
                variant="solo-filled"
                requiredSenha
                placeholder="Digite aqui seu nome"
                outlined
                label="Nome"
                v-model="nome"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="flex-start py-0">
              <v-text-field
                :rules="[min8, required]"
                v-mask="['########']"
                class="pb-0"
                type="text"
                variant="solo-filled"
                required
                autocomplete="off"
                counter="8"
                placeholder="Digite aqui sua matrícula"
                outlined
                label="Matrícula"
                v-model="matricula"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="flex-start py-0">
              <v-text-field
                :rules="[min11, required, validCpf]"
                v-mask="['###.###.###-##']"
                class="pb-0"
                required
                variant="solo-filled"
                autocomplete="off"
                type="text"
                placeholder="Ex: 123.345.678-90"
                outlined
                label="CPF"
                v-model="cpf"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="flex-start py-0">
              <v-text-field
                :rules="[validEmail, required]"
                class="pb-0"
                required
                variant="solo-filled"
                autocomplete="off"
                type="text"
                placeholder="E-mail"
                outlined
                label="E-mail"
                v-model="email"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="flex-start pb-0 pt-0">
              <v-text-field
                v-model="celular"
                :rules="[min15, required]"
                v-mask="['(##)#####-####']"
                class="pb-0"
                type="text"
                variant="solo-filled"
                autocomplete="off"
                placeholder="ex: (71)98888-5555"
                outlined
                label="Celular"
              /> </v-col
          ></v-row>
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col justify-center class="d-flex justify-center pt-1 pb-8">
              <v-btn
                type="submit"
                elevation="4"
                variant="elevated"
                color="#A2A644"
                class="px-8 text-capitalize"
                dark
                @click="register()"
              >
                Enviar
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-form>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineEmits(["registerOnFunc"]);
const nome = ref("");
const cpf = ref("");
const celular = ref("");
const matricula = ref("");
const email = ref("");
const signInForm = ref(null);

const register = async (): Promise<void> => {
  const isValid = await signInForm.value.validate();
  if (isValid.valid) {
    return navigateTo("/login");
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

const min8 = (value: string): string | boolean => {
  if (value.length === 8) {
    return true;
  }
  return "A matrícula deve ter 8 números.";
};

const min11 = (value: string): string | boolean => {
  if (value.length === 14) {
    return true;
  }
  return "O CPF deve ter apenas 11 dígitos.";
};

const min15 = (value: string): string | boolean => {
  if (value.length === 14) {
    return true;
  }
  return "O telefone deve conter apenas 11 números.";
};

const required = (value: string): string | boolean => {
  if (value) {
    return true;
  }
  return "Este campo é necessario.";
};

const validCpf = (value: string): string | boolean => {
  if (typeof value !== "string") {
    return false;
  }
  if (
    !value.replace(/[\s.-]*/gim, "") ||
    value.replace(/[\s.-]*/gim, "").length !== 11 ||
    value.replace(/[\s.-]*/gim, "") === "00000000000" ||
    value.replace(/[\s.-]*/gim, "") === "11111111111" ||
    value.replace(/[\s.-]*/gim, "") === "22222222222" ||
    value.replace(/[\s.-]*/gim, "") === "33333333333" ||
    value.replace(/[\s.-]*/gim, "") === "44444444444" ||
    value.replace(/[\s.-]*/gim, "") === "55555555555" ||
    value.replace(/[\s.-]*/gim, "") === "66666666666" ||
    value.replace(/[\s.-]*/gim, "") === "77777777777" ||
    value.replace(/[\s.-]*/gim, "") === "88888888888" ||
    value.replace(/[\s.-]*/gim, "") === "99999999999"
  ) {
    return "Este CPF não é válido.";
  }
  let soma = 0;
  let resto;
  for (let i = 1; i <= 9; i++) {
    soma =
      soma +
      parseInt(value.replace(/[\s.-]*/gim, "").substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(value.replace(/[\s.-]*/gim, "").substring(9, 10))) {
    return "Este CPF não é válido";
  }
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma =
      soma +
      parseInt(value.replace(/[\s.-]*/gim, "").substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(value.replace(/[\s.-]*/gim, "").substring(10, 11))) {
    return "Este CPF não é válido";
  }
  value.replaceAll(/[.-]/g, "");
  return true;
};
</script>
