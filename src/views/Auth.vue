<template>
  <auth ref="countries_modal" />
  <div class="card container mt-5">
    <Form class="card-body d-flex">
      <Field
        rules="required"
        :modelValue="info.username"
        v-slot="{ errors }"
        name="username"
      >
        <input
          type="text"
          placeholder="username"
          class="form-control"
          v-model="info.username"
          id="username"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>





      <Field
        rules="required"
        :modelValue="info.password"
        v-slot="{ errors }"
        name="Password"
      >
      <input
      type="password"
      placeholder="Password"
      class="form-control"
      v-model="info.password"
      id="password"
      />
      <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
    </Field>
    </Form>
    <div class="card-footer d-flex flex-row gap-2">
      <Btn :title="'success'" @click="createItem">Submit</Btn>
    </div>
  </div>
  <template>
    <button @click="toast">Toast it!</button>
  </template>
</template>

<script setup>
import { ref } from "vue";
import Btn from "../components/ui/Btn.vue";
import { useRouter } from "vue-router";
import auth from "../components/pages/auth-role.vue";
import $http from "../components/plugins/axios";
import { Form, Field } from "vee-validate";
const router = useRouter();
const countries_modal = ref();
const info = ref({
  username: "",
  password: "",
});
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const toast = () => {
  createToast("Name or password is wrong!", {
    position: "top-right",
    type: "danger",
    transition: "bounce",
  });
};

const createItem = async () => {
  await countries_modal.value.openModal(info.value.username);
};
</script>

<style lang="scss" scoped>
.d-flex {
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.form-control {
  width: 50%;
}

.card-footer {
  display: flex;
  justify-content: center;
}
</style>
