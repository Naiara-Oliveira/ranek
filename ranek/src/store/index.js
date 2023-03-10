import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/service/service.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,

  state: {
    login: false,
    usuario: {
      id: "",
      nome: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
    usuario_produtos: null
  },

  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign({}, state.usuario, payload);
    },
      UPDATE_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos = payload;
  },
ADD_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos.unshit(payload);
  },
  },

  actions: {

    getUsuarioProdutos(context) {
      api.get(`/produtos?usuario_id=${context.state.usuario.id}`)
        .then(response => {
          context.commit("UPDATE_USUARIO_PRODUTOS", response.data);
        });
    },
    getUsuario(context, payload) {
      return api.get(`/usuario/${payload}`).then((response) => {
        context.commit("UPDATE_USUARIO", response.data);
        context.commit("UPDATE_LOGIN", true);
      });
    },
    criarUsuario(context, payload) {
      context.commit("UPDATE_USUARIO", { id: payload.email });
      return api.post("/usuario", payload);
    },
    editarUsuario(context, payload) {
      return api.put(`/usuario/${context.state.usuario.id}`, payload);
    },
    loginUsuario(context, payload) {
      return api.login(payload).then((response) => {
        context.commit("UPDATE_USUARIO", { id: response.data.usuario_id });
        context.commit("UPDATE_LOGIN", true);
      });
    },
    
    deslogarUsuario(context){
      context.commit("UPDATE_LOGIN", false);
      context.commit("UPDATE_USUARIO", {
        id: "",
        nome: "",
        email: "",
        senha: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
      });
    }
  },
});
