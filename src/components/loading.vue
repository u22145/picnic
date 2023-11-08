<template>
    <div v-if="loading" class="loading">
        <span class="loader"></span>
        <div class="letter-holder">
            <span class="l-1 letter">L</span>
            <span class="l-2 letter">o</span>
            <span class="l-3 letter">a</span>
            <span class="l-4 letter">d</span>
            <span class="l-5 letter">i</span>
            <span class="l-6 letter">n</span>
            <span class="l-7 letter">g</span>
            <span class="l-8 letter">.</span>
            <span class="l-9 letter">.</span>
            <span class="l-10 letter">.</span>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'loadIng',
        data() {
            return {
                loading: true,
            }
        },
        methods: {},
        mounted() {}
    }
</script>
<style lang="scss">
    .loading {
        z-index: 10;
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        width: 100vw;
        background-color: #C8E7ED;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .loader {
            width: 48px;
            height: 48px;
            display: inline-block;
            position: relative;
            margin-bottom: 20px;

            &::after,
            &::before {
                content: '';
                box-sizing: border-box;
                width: 48px;
                height: 48px;
                border-radius: 50%;
                border: 2px solid rgba(57, 98, 106, 1);
                position: absolute;
                left: 0;
                top: 0;
                animation: animloader 2s linear infinite;
            }

            &::after {
                animation-delay: 1s;
            }
        }

        @keyframes animloader {
            0% {
                transform: scale(0);
                opacity: 1;
            }

            100% {
                transform: scale(1);
                opacity: 0;
            }
        }

        .letter-holder .letter {
            font-size: 18px;
            margin-left: 4px;
            color: rgba(57, 98, 106, 1);
            animation-name: loadingF;
            animation-duration: 1.6s;
            animation-iteration-count: infinite;
            animation-direction: linear;

            @for $i from 1 through 10 {
                &.l-#{$i} {
                    animation-delay: 0.48+$i*0.12s;
                }
            }
        }

        @keyframes loadingF {
            0% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }
    }
</style>