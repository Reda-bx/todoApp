/* eslint-disable */
import Index from 'src/components/Index'
import Vue from 'vue'

describe('Index.vue', () => {
  it('should render 0 li element', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Index),
      data () {
        return {
          todos: []
        }
      }
    })
    expect(vm.$el.querySelectorAll('li.todo').length).toBe(0)
  })
})
