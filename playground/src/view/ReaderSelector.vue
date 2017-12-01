<template>
    <PipelineSection title="Reader" class="reader-selector">
        <select v-model="model.type" slot="header" @change="readerChanged">
            <option v-for="option in readers" :value="option.type">
                {{ option.name }}
            </option>
        </select>
        <template slot="content">
            <div v-if="imageReaderSelected" class="image-reader-settings settings-section">
                <InputRow title="Select predefined image:">
                    <select v-model="model.url">
                        <option v-for="option in images" :value="option.value">
                            {{ option.text }}
                        </option>
                    </select>
                </InputRow>
                <div class="or-separator">or</div>

                <div class="upload-section">
                    Upload an image:
                    <input type="file" accept="image/*" @change="fileInputChanged" />
                </div>
            </div>

            <div v-if="videoReaderSelected" class="video-reader-settings settings-section">
                <InputRow title="Select predefined video:">
                    <select v-model="model.url">
                        <option v-for="option in videos" :value="option.value">
                            {{ option.text }}
                        </option>
                    </select>
                </InputRow>
            </div>

            <fieldset class="preview">
                <legend>Preview</legend>
                <img v-if="imageReaderSelected" class="preview-image" :src="model.url" />
                <video v-if="videoReaderSelected" class="preview-video" :src="model.url" controls></video>
            </fieldset>
        </template>
    </PipelineSection>
</template>

<script>
    import { READERS } from "../consts.js";
    import modelMixin from "./modelMixin.js";
    import InputRow from "./InputRow.vue";
    import PipelineSection from "./PipelineSection.vue";

    export default {
        name: "ReaderSelector",
        props: ["readers", "images", "videos"],
        components: { InputRow, PipelineSection },
        mixins: [modelMixin],

        methods: {
            fileInputChanged(e) {
                const file = e.target.files[0];

                if (!file) {
                    return;
                }

                const reader = new FileReader();
                reader.onload = e => this.model.url = e.target.result;

                reader.readAsDataURL(file);
            },

            readerChanged(e) {
                const predefined = e.target.value === READERS.VIDEO_READER
                    ? this.videos
                    : this.images;

                this.model.url = (predefined[0] || {}).value;
            }
        },

        computed: {
            imageReaderSelected() {
                return this.model.type === READERS.IMAGE_READER;
            },
            videoReaderSelected() {
                return this.model.type === READERS.VIDEO_READER;
            }
        }
    }
</script>

<style>
    .reader-selector {
        background: #ffecb3;
    }

    .reader-selector .settings-section select {
        width: 100%;
    }

    .reader-selector .upload-section {
        text-align: center;
    }

    .reader-selector .upload-section input[type="file"] {
        margin-top: 10px;
        width: 100%;
    }

    .reader-selector .preview {
        margin-top: 10px;
        border: 1px solid #afafaf;
        padding: 2px;
        border-radius: 2px;
    }

    .reader-selector .preview-image {
        width: 80%;
        margin: 5px auto 10px;
        display: block;
    }

    .reader-selector .preview-video {
        width: 100%;
    }

    .reader-selector .or-separator {
        display: block;
        text-align: center;
        margin: 10px;
        text-transform: uppercase;
    }

    .reader-selector .or-separator::before,
    .reader-selector .or-separator::after {
        content: "\2015";
        margin: 5px;
    }
</style>
