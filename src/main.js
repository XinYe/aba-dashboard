import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// amplify configuration
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import aws_exports from './aws-exports'
Amplify.configure(aws_exports)

// global styles (for auth ui)
require('./assets/main.css')

Vue.config.productionTip = false;

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(AmplifyPlugin, AmplifyModules)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
