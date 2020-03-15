<template>
  <section class="todoapp">
    <header class="header">
      <h1>LTV Todo</h1>
      <input
        class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        v-model="newTodo"
        @keyup.enter="addTodo"
      />
    </header>
    <section class="main" v-show="todos.length" v-cloak>
      <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone" />
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <li
          v-for="todo in filteredTodos"
          class="todo"
          :key="todo.id"
          :class="{ completed: todo.completed, editing: todo == editedTodo }"
        >
          <div class="view">
            <input
              class="toggle"
              type="checkbox"
              v-model="todo.completed"
              @change="handleClickCompleteTodo(todo)"
            />
            <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input
            class="edit"
            type="text"
            v-model="todo.title"
            v-todo-focus="todo == editedTodo"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
          />
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="todos.length" v-cloak>
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize }} left
      </span>
      <ul class="filters">
        <li>
          <a href="#/all" :class="{ selected: visibility == 'all' }">All</a>
        </li>
        <li>
          <a href="#/active" :class="{ selected: visibility == 'active' }">Active</a>
        </li>
        <li>
          <a href="#/completed" :class="{ selected: visibility == 'completed' }">Completed</a>
        </li>
      </ul>
      <button
        class="clear-completed"
        @click="removeCompleted"
        v-show="todos.length > remaining"
      >Clear completed</button>
    </footer>
  </section>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Vue, Prop } from 'vue-property-decorator';
import { mapState, mapActions, mapGetters } from 'vuex';
import { Todo } from '../../store';

@Component({
  computed: {
    ...mapState(['todos']),
    ...mapGetters(['all', 'active', 'completed', 'filteredTodos']),
  },
  methods: {
    ...mapActions([
      'addNewTodo',
      'removeTodo',
      'removeCompleted',
      'updateTodo',
      'getTodoList',
    ]),
  },
  directives: {
    'todo-focus': (el, binding) => {
      if (binding.value) {
        el.focus();
      }
    },
  },
  filters: {
    pluralize: (n: number) => {
      return n === 1 ? 'item' : 'items';
    },
  },
})
export default class Home extends Vue {
  public todos!: Todo[];
  public all!: Todo[];
  public active!: Todo[];
  public completed!: Todo[];
  public newTodo: string = '';
  public editedTodo: Todo | null = null;
  public visibility: string = 'all';
  public beforeEditCache: string | null = null;

  public addNewTodo!: (value: string) => void;
  public setAllDone!: () => void;
  public removeTodo!: (todo: Todo) => void;
  public removeCompleted!: () => void;
  public updateTodo!: (todo: Todo) => void;
  public getTodoList!: (completed?: boolean) => Todo[];

  public get filteredTodos(): Todo[] {
    const filters: { [key: string]: Todo[] } = {
      all: this.all,
      active: this.active,
      completed: this.completed,
    };
    return filters[this.visibility];
  }

  public get remaining(): number {
    return this.active.length;
  }

  public get allDone(): boolean {
    return this.remaining === 0;
  }

  public set allDone(value: boolean) {
    this.setAllDone();
  }

  public addTodo() {
    const value = this.newTodo && this.newTodo.trim();
    if (!value) {
      return;
    }
    this.addNewTodo(value);
    this.newTodo = '';
  }

  public editTodo(todo: Todo) {
    this.beforeEditCache = todo.title;
    this.editedTodo = todo;
  }

  public doneEdit(todo: Todo) {
    if (!this.editedTodo) {
      return;
    }
    this.editedTodo = null;
    todo.title = todo.title.trim();
    if (!todo.title) {
      this.removeTodo(todo);
    } else {
      this.updateTodo(todo);
    }
  }

  public cancelEdit(todo: Todo) {
    this.editedTodo = null;
    todo.title = this.beforeEditCache || '';
  }

  public handleClickCompleteTodo(todo: Todo) {
    this.updateTodo(todo);
  }

  public onHashChange() {
    const visibility = window.location.hash.replace(/#\/?/, '');
    if (['all', 'active', 'completed'].indexOf(visibility) !== -1) {
      this.visibility = visibility;
    } else {
      window.location.hash = '';
      this.visibility = 'all';
    }
  }

  public created() {
    window.addEventListener('hashchange', this.onHashChange);
    this.getTodoList();
  }
}
</script>

<style lang="scss" scoped>
</style>
