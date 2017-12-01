<template>
    <PipelineSection title="AA" class="aa-selector">
        <template slot="content">
            <InputRow title="Width:">
                <input v-model.number="model.width" type="number" />
            </InputRow>
            <InputRow title="Height:">
                <input v-model.number="model.height" type="number" />
            </InputRow>
            <InputRow title="Color:">
                <input type="checkbox" v-model="model.colored" />
            </InputRow>
        </template>
    </PipelineSection>
</template>

<script>
    import debounce from "lodash.debounce";
    import modelMixin from "./modelMixin.js";
    import PipelineSection from "./PipelineSection.vue";
    import InputRow from "./InputRow.vue";

    export default {
        name: "AASelector",
        mixins: [modelMixin],
        components: { InputRow, PipelineSection }
    }
</script>

<style>
    .aa-selector {
        background: #ffcdd2;
    }
    .aa-selector .input-row-label {
        min-width: 60px;
        text-align: right;
    }
</style>
