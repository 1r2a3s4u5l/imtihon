<template>
  <AppModal v-model="dialog">
    <form>
      <select name="role" id="role">
        <option v-if="role[0]" :value="role[0]">{{ role[0] }}</option>
        <option v-if="role[1]" :value="role[1]">{{ role[1] }}</option>
      </select> 
      <button class="btn btn-success" @click="save">save</button>
    </form>
  </AppModal>
</template>

<script setup>
import AppModal from "../ui/app-modal.vue";
import { ref, watch } from "vue";
import http from "../plugins/axios";
import { createToast } from "mosha-vue-toastify";
const dialog = ref(false);
import { useRouter } from "vue-router";
const router = useRouter();

const toastcreate = () => {
  createToast("Successfully created! (Reloading...)", {
    position: "top-right",
    type: "success",
    transition: "bounce",
  });
};

const toastedit = () => {
  createToast("Successfully edited! (Reloading...)", {
    position: "top-right",
    type: "warning",
    transition: "bounce",
  });
};

const forms = ref({
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  confirm_password: "",
});
const token = ref();
const value2 = ref();
const role = ref();
const openModal = async (value) => {
  value2.value = value;
  await http
    .post("/admins/login", {
      username: value2.value,
      password: value2.value,
    })
    .then((res) => {
      console.log(res.data);
      role.value = res.data.roles;
      token.value = res.data.token;
      localStorage.setItem("token", token.value);
      console.log(role);
    }).catch(err=>{
      console.log(err);
    });
  dialog.value = true;
};
const selectOpt = ref()
const save = async (e) => {
  e.preventDefault();
  try {
    console.log(value2);
    if (!forms.value._id) {
      toastcreate();
    }
  } catch (err) {
    console.log(err);
  }
  function getSelectedOption() {
            const selectElement = document.getElementById("role");
            const selectedOption = selectElement.options[selectElement.selectedIndex].value;
            selectOpt.value = selectedOption
        }
  getSelectedOption();
  console.log("-----------------------------------------------");
  console.log(selectOpt.value);
  await http
    .post("/admins/set-role", {
      role: selectOpt.value,
    })
    .then((res) => {
      console.log(res.data.message,"mana");
      if(res.data.message == "selected"){
        if(selectOpt.value == "admin"){
          router.push({ name:  "admin"});
          console.log(1);
        }
        if(selectOpt.value == "superadmin"){
          console.log(2);
          router.push({ name:  "superadmin"});
        }
      }
    })
};
defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
