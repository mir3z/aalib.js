import debounce from "lodash.debounce";

export default {
    props: ["value"],

    data() {
        return {
            model: {}
        };
    },

    methods: {
        serialize() {
            return Array.isArray(this.model)
                ? this.model.slice()
                : Object.assign({}, this.model);
        }
    },

    watch: {
        model: {
            handler: debounce(function () {
                this.$emit("input", this.serialize());
            }, 300),
            deep: true
        }
    },

    created: function () {
        if (Array.isArray(this.value)) {
            this.model = this.value.slice();
        } else {
            this.model = Object.assign({}, this.value);
        }
    }
};
