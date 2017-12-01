<template>
    <PipelineSection title="Renderer" class="renderer-selector">
        <select v-model="model.type" slot="header">
            <option v-for="option in renderers" :value="option.type">
                {{ option.name }}
            </option>
        </select>
        <template slot="content">
            <InputRow title="Background color:">
                <input v-model="model.background" type="color" />
            </InputRow>
            <InputRow title="Text Color:">
                <input v-model="model.color" type="color" />
            </InputRow>
            <InputRow title="Charset:" class="charset-selector">
                <select v-bind:value="this.charsetLabel" v-on:input="this.onCharsetInput">
                <option v-for="charset in charsets" :value="charset.value">
                        {{ charset.title }}
                    </option>
                    <option value=" " custom>Custom</option>
                </select>
                <input v-model="model.charset" type="text" :disabled="!customSelected" />
            </InputRow>
            <InputRow title="Font size:">
                <input v-model.number="model.fontSize" type="number" step="0.5" />
            </InputRow>
            <InputRow title="Font family:">
                <select v-model="model.fontFamily" :style="{ fontFamily: model.fontFamily }">
                    <option v-for="font in fonts" :value="font" :style="{ fontFamily: font }">
                        {{ font }}
                    </option>
                </select>
            </InputRow>
            <template v-if="canvasSelected">
                <InputRow title="Canvas width:">
                    <input v-model.number="model.width" type="number" />
                </InputRow>
                <InputRow title="Canvas height:">
                    <input v-model.number="model.height" type="number" />
                </InputRow>
                <InputRow title="Line height:">
                    <input v-model.number="model.lineHeight" type="number" step="0.1" />
                </InputRow>
                <InputRow title="Character width:">
                    <input v-model.number="model.charWidth" type="number" step="0.1" />
                </InputRow>
            </template>
        </template>
    </PipelineSection>
</template>

<script>
    import debounce from "lodash.debounce";
    import InputRow from "./InputRow.vue";
    import PipelineSection from "./PipelineSection.vue";
    import { RENDERERS } from "../consts.js";
    import modelMixin from "./modelMixin.js";

    export default {
        name: "RendererSelector",
        props: ["renderers", "fonts", "charsets"],
        components: { InputRow, PipelineSection },
        mixins: [modelMixin],
        data() {
            return { customSelected: false };
        },

        methods: {
            onCharsetInput(e) {
                this.model.charset = e.target.value;
                this.customSelected = Array
                    .from(e.target.selectedOptions)
                    .some(option => option.hasAttribute("custom"));
            }
        },

        computed: {
            canvasSelected() {
                return this.model.type === RENDERERS.CANVAS_RENDERER;
            },

            charsetLabel() {
                return this.customSelected
                    ? " "
                    : this.model.charset;
            }
        }
    }
</script>

<style>
    .renderer-selector {
        background: #bbdefb;
    }

    .renderer-selector .input-row-label {
        min-width: 120px;
        text-align: right;
    }

    .renderer-selector .input-row-content select {
        width: 100%;
    }

    .renderer-selector .charset-selector label {
        height: auto;
    }
</style>
