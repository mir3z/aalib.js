<template>
    <div class="input-row">
        <label>
            <div class="input-row-label">{{ title }}</div>
            <div class="input-row-content">
                <slot></slot>
            </div>
        </label>
    </div>
</template>

<script>
    export default {
        name: "InputRow",
        props: ["title"]
    }
</script>

<style>
    .input-row label {
        height: 30px;
        line-height: 30px;
        display: flex;
    }

    .input-row-label {
        flex: 0 1 auto;
        white-space: nowrap;
    }

    .input-row-content {
        flex: 1 1 auto;
        margin-left: 8px;
    }

    .input-row-content input[type="text"],
    .input-row-content input[type="number"],
    .input-row-content input[type="color"] {
        width: 100%;
    }
</style>
