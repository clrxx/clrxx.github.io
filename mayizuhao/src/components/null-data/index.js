import nullDataComponent from './null-data.vue';

const nullData = {
    install (Vue) {
        Vue.component('nullData', nullDataComponent)
    }
}

export default nullData;