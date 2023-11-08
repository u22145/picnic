import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  // 遊戲圖片
    prizes: [{
        x: 0,
        y: 0,
        imgs: [{
          src: require('@/assets/img/gam/jiugongge/cube1.png'),
          activeSrc: require('@/assets/img/gam/jiugongge/cube1hover.png'),
          width: '100%',
          height: '100%',
        }]
      },
      {
        x: 1,
        y: 0,
        imgs: [{
          src: require('@/assets/img/gam/jiugongge/cubeB.png'),
          activeSrc: require('@/assets/img/gam/jiugongge/cubeBhover.png'),
          width: '100%',
          height: '100%',
        }]
      },
      {
        x: 2,
        y: 0,
        imgs: [{
          src: require('@/assets/img/gam/jiugongge/cube3.png'),
          activeSrc: require('@/assets/img/gam/jiugongge/cube3hover.png'),
          width: '100%',
          height: '100%',
        }]
      },
      {
        x: 2,
        y: 1,
        imgs: [{
          src: require('@/assets/img/gam/jiugongge/cubeB.png'),
          activeSrc: require('@/assets/img/gam/jiugongge/cubeBhover.png'),
          width: '100%',
          height: '100%',
        }]
      },
      {
        x: 2,
        y: 2,
        imgs: [{
          src: require('@/assets/img/gam/jiugongge/cube5.png'),
          activeSrc: require('@/assets/img/gam/jiugongge/cube5hover.png'),
          width: '100%',
          height: '100%',
        }]
      },
      {
        x: 1,
        y: 2,
        imgs: [{
          src: require('@/assets/img/gam/jiugongge/cubeB.png'),
          activeSrc: require('@/assets/img/gam/jiugongge/cubeBhover.png'),
          width: '100%',
          height: '100%',
        }]
      },
      {
        x: 0,
        y: 2,
        imgs: [{
          src: require('@/assets/img/gam/jiugongge/cubeL.png'),
          activeSrc: require('@/assets/img/gam/jiugongge/cubeLhover.png'),
          width: '100%',
          height: '100%',
        }]
      },
      {
        x: 0,
        y: 1,
        imgs: [{
          src: require('@/assets/img/gam/jiugongge/cubeB.png'),
          activeSrc: require('@/assets/img/gam/jiugongge/cubeBhover.png'),
          width: '100%',
          height: '100%',
        }]
      },
    ],
    // 遊戲編筐
    blocks: [{
      padding: '10px',
      background: '#ffffff'
    }],
    // 遊戲按鈕
    buttons: [{
      x: 1,
      y: 1,
      pointer: true,
      background: 'rgba(0,0,0,0)',
      imgs: [{
        src: require('@/assets/img/gam/btn.svg'),
        width: '100%',
        height: '100%',
      }],
    }, ],
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
})