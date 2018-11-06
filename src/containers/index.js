import '../css/common';
import '../css/index';

import Vue from 'vue';

import index from '../components/index';

new Vue({
    template: `<index></index>`,
    components: {
        index
    }
}).$mount('#root');