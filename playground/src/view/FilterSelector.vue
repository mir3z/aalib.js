<template>
    <PipelineSection title="Filters" class="filter-selector">
        <template slot="content">
            <fieldset v-for="(filter, type) in model" class="filter-instance">
                <legend>{{ filter.title }}</legend>
                <InputRow title="Active:">
                    <input type="checkbox" v-model="filter.enabled" />
                </InputRow>
                <InputRow title="Value:" v-if="filter.widget === 'number'">
                    <input v-model.number="filter.value" type="number" :disabled="!filter.enabled" />
                </InputRow>
            </fieldset>
        </template>
    </PipelineSection>
</template>

<script>
    import InputRow from "./InputRow.vue";
    import modelMixin from "./modelMixin.js";
    import PipelineSection from "./PipelineSection.vue";

    export default {
        name: "FilterSelector",
        components: { InputRow, PipelineSection },
        mixins: [modelMixin]
    }
</script>

<style>
    .filter-selector {
        background: #dcedc8;
    }

    .filter-selector .input-row-label {
        min-width: 45px;
        text-align: right;
    }

    .filter-selector .filter-instance {
        margin-bottom: 10px;
        border: 1px solid #afafaf;
        padding: 5px 10px;
        border-radius: 2px;
    }
</style>
