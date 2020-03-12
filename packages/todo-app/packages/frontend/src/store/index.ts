import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export interface Todo {
  id: number;
  completed: boolean;
  title: string;
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
    ADD_NEW_TODO(state, title) {
      const { todos } = state;
      todos.push({
        id: todos.length + 1,
        title,
        completed: false,
      });
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
  },
  actions: {
    addNewTodo({ commit }, title: Todo) {
      commit('ADD_NEW_TODO', title);
    },
    setAllDone({ commit }) {
      commit('SET_ALL_DONE');
    },
    removeTodo({ commit }, todo: Todo) {
      commit('REMOVE_TODO', todo);
    },
    removeCompleted({ commit }) {
      commit('REMOVE_COMPLETED');
    },
    updateTodo({ commit }, todo: Todo) {
      commit('UPDATE_TODO', todo);
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
