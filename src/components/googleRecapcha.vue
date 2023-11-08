<template>
    <div id="recaptcha" class="g-recaptcha" data-size="invisible"></div>
</template>

<script>
    export default {
        name: 'googleRecapcha',
        data() {
            return {
                sitekey: '6LesATkkAAAAAHgHm9WjM8k-r6GRS-buM0B32Bzk'
            }
        },
        methods: {
            execute() {
                window.grecaptcha.execute();
            },
            reset() {
                window.grecaptcha.reset();
            },
            render() {
                var me = this;
                if (window.grecaptcha) {
                    this.widgetId = window.grecaptcha.render('recaptcha', {
                        sitekey: this.sitekey,
                        size: 'invisible',
                        callback: (token) => {
                            me.$emit('getGoogle', token),
                                this.reset();
                        }
                    });
                }
            }
        },
        mounted() {
            this.render();
        }
    }
</script>
<style lang="scss">
    .grecaptcha-badge {
        visibility: hidden;
    }
</style>