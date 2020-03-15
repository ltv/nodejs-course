import Vue from 'vue';
import Vuex from 'vuex';

import { HomeService } from '../views/Home/HomeService';

const service = new HomeService();

Vue.use(Vuex);

export interface Todo {
  id: number;
  title: string;
  completed?: boolean;
}

interface RootState {
  todos: Todo[];
  visibility: 'all' | 'active' | 'completed';
}

export default new Vuex.Store<RootState>({
  state: {
    todos: [],
    visibility: 'all',
  },
  mutations: {
    ADD_NEW_TODO(state, todo) {
      const { todos } = state;
      todos.push(todo);
      state.todos = [...todos];
    },
    SET_ALL_DONE(state) {
      state.todos.forEach((todo: Todo) => {
        todo.completed = true;
      });
    },
    REMOVE_TODO(state, todo) {
      state.todos.splice(state.todos.indexOf(todo), 1);
    },
    REMOVE_COMPLETED(state) {
      state.todos = state.todos.filter((todo: any) => !todo.completed);
    },
    UPDATE_TODO(state, todo: Todo) {
      const { todos } = state;
      const todoIdx: number = todos.findIndex((t: Todo) => t.id === todo.id);
      if (todoIdx >= 0) {
        todos[todoIdx] = { ...todo };
      }
    },
    SET_TODO_LIST(state, todos: Todo[]) {
      state.todos = [...todos];
    },
  },
  actions: {
    async addNewTodo({ commit, state }, title: string) {
      // commit('ADD_NEW_TODO', title);
      // call API add new Todo. Add ok -> push store. Failed -> Alert Error.
      const { todos } = state;
      const todo = await service.createTodo({
        id: todos.length + 1,
        title,
      });
      if (todo) {
        commit('ADD_NEW_TODO', todo);
      }
    },
    setAllDone({ commit }) {
      commit('SET_ALL_DONE');
    },
    async removeTodo({ commit }, todo: Todo) {
      const delResult = service.deleteTodo(todo.id);
      if (delResult) {
        commit('REMOVE_TODO', todo);
      }
    },
    removeCompleted({ commit }) {
      commit('REMOVE_COMPLETED');
    },
    async updateTodo({ commit }, todo: Todo) {
      // commit('UPDATE_TODO', todo);
      const updated = await service.updateTodo(todo);
      if (updated) {
        commit('UPDATE_TODO', updated);
      }
    },
    async getTodoList({ commit }, completed) {
      const todos = await service.getTodoList(completed);
      commit('SET_TODO_LIST', todos);
    },
  },
  getters: {
    all(state) {
      return state.todos;
    },
    active(state) {
      return state.todos.filter((todo: any) => !todo.completed);
    },
    completed(state) {
      return state.todos.filter((todo: any) => todo.completed);
    },
  },
  modules: {},
});
