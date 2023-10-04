<template>
  <div class="container">
    <userm ref="users_modal" />
    <div class=" mb-3">
      <button @click="createItem" class="btn btn-success">Create User</button>
      <button @click="logOut" class="btn btn-warning">LogOut</button>
    </div>
    <div class="row">
      <div class="col-4 my-2" v-for="(item, index) in items.users" :key="index">
        <div class="card">
          <div class="card-body text-left">
            <h3>Name: {{ item.name }}</h3>
            <h3>Surname: {{ item.surname }}</h3>
            <h4>Age: {{ item.age }}</h4>
            <h4>Address: {{ item.address }}</h4>
            <h4>Diplom: {{ item.is_diploma }}</h4>
          </div>
          <div class="card-footer">
            <button class="btn btn-info" @click="editItem(item)">Edit</button>
            <button class="btn btn-danger" @click="deleteItem(item._id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import http from "../../components/plugins/axios";
import userm from "../../components/pages/user-m.vue";
import { createToast } from "mosha-vue-toastify";

const toastdelete = () => {
  createToast("Successfully deleted! (Reloading...)", {
    position: "top-right",
    type: "success",
    transition: "bounce",
  });
};

const items = ref([]);
const users_modal = ref();
const getUsers = () => {
  http
    .get("users")
    .then((res) => {
      res.data = res.data;
      items.value = res.data;
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteItem = (_id) => {
  http
    .delete(`/users/${_id}`)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        toastdelete();
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const createItem = () => {
  users_modal.value.openModal();
};

const editItem = (item) => {
  users_modal.value.openModal(item);
};

const logOut = () => {
  localStorage.removeItem("token");
  location.reload();
};
getUsers();
</script>

<style lang="scss" scoped>
.btn-first {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.card-footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
}
</style>
