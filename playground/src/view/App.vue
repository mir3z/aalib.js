<template>
    <div id="app">
        <div class="pipeline">
            <ReaderSelector v-model="reader" :readers="readers" :images="predefinedImages" :videos="predefinedVideos" />
            <FilterSelector v-model="preFilters" />
            <AASelector v-model="aa" />
            <FilterSelector v-model="postFilters" />
            <RendererSelector v-model="renderer" :renderers="renderers" :fonts="fonts" :charsets="charsets" />
        </div>
        <div class="screen"></div>
    </div>
</template>

<script>
    import debounce from "lodash.debounce";

    import ReaderSelector from "./ReaderSelector.vue";
    import AASelector from "./AASelector.vue";
    import RendererSelector from "./RendererSelector.vue";
    import FilterSelector from "./FilterSelector.vue";

    import { READERS, RENDERERS, FILTERS } from "../consts.js";

    import "./style.css";

    export default {
        name: "app",
        props: ["initialData"],
        components: { ReaderSelector, AASelector, RendererSelector, FilterSelector },

        data() {
            return this.initialData
        },

        methods: {
            notify() {
                const data = JSON.parse(JSON.stringify({
                    reader: this.reader,
                    preFilters: this.preFilters,
                    postFilters: this.postFilters,
                    aa: this.aa,
                    renderer: this.renderer
                }));

                this.$emit("updated", data);
            }
        },

        watch: {
            reader() {
                this.notify();
            },

            aa() {
                this.notify();
            },

            renderer() {
                this.notify();
            },

            preFilters() {
                this.notify();
            },

            postFilters() {
                this.notify();
            }
        }
    }
</script>

<style>
    #app {
        font-family: "Lato", sans-serif;
        display: flex;
        align-items: stretch;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        background: #fffaf0;
    }

    .pipeline {
        flex: 0 0 300px;
        font-size: 14px;
        padding: 15px;
        overflow: auto;
    }

    .screen {
        box-shadow: 0 0 5px rgba(0,0,0,0.2);
        border-radius: 4px;
        flex: 1 1 auto;
        margin: 15px;
        overflow: auto;
        display: flex;
        position: relative;
        background: #fff;
    }

    .screen > * {
        margin: auto;
    }
</style>
