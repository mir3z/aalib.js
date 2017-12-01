<template>
    <div class="selector-section">
        <div class="selector-header">
            <div class="toggle-btn" v-bind:class="{ collapsed: isCollapsed }" @click="toggleFoldState">&#8963;</div>
            {{ title }}
            <slot name="header"></slot>
        </div>
        <div class="content-wrapper" v-bind:class="{ collapsed: isCollapsed }">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PipelineSection",
        props: ["title"],

        data() {
            return {
                isCollapsed: false
            }
        },

        methods: {
            toggleFoldState() {
                this.isCollapsed = !this.isCollapsed;
            }
        }
    }
</script>

<style>
    .selector-header {
        text-align: center;
        /*border-bottom: 1px solid #ababab;*/
        /*padding: 0 8px 8px;*/
        margin-bottom: 4px;
        font-size: 16px;
        font-weight: 500;
        position: relative;
    }

    .selector-header select {
        position: absolute;
        right: 0;
    }

    .selector-section {
        box-shadow: 0 0 2px 0 rgba(122, 122, 122, 0.5);
        border: 1px solid #ababab;
        border-radius: 4px;
        padding: 8px;
        margin-bottom: 28px;
        position: relative;
    }

    .selector-section .content-wrapper {
        border-top: 1px solid #ababab;
        padding-top: 8px;
        margin-top: 12px;
    }

    .selector-section .content-wrapper.collapsed {
        display: none;
    }

    .selector-section .toggle-btn {
        position: absolute;
        left: 0;
        top: 4px;
        width: 15px;
        height: 15px;
        border-radius: 2px;
        cursor: pointer;
        color: #444;
        font-size: 18px;
    }

    .selector-section .toggle-btn.collapsed {
        transform: rotate(180deg);
    }

    .selector-section ~ .selector-section::before {
        content: "➧";
        font-size: 35px;
        position: absolute;
        top: -36px;
        color: #efefef;
        left: 0;
        right: 0;
        text-align: center;
        transform: rotate(90deg);
        text-shadow: 0 0 1px rgb(27, 27, 27);
        pointer-events: none;
    }
</style>
