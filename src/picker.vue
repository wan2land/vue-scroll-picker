<style src="./picker.css" scoped></style>
<template>
    <div class="picker">
        <div class="picker-list">
            <div class="picker-list-rotator" :style="{top: animatedTop + 'px'}">
                <div
                    class="picker-item-placeholder"
                    ref="placeholder"
                    v-if="placeholder"
                >{{ placeholder }}</div>
                <div
                    class="picker-item"
                    v-for="(option, index) in sanitizedOptions"
                    :key="option.key"
                    ref="items"
                >{{ option.name }}</div>
            </div>
        </div>
        <div class="picker-layer">
            <div class="top" ref="top"></div>
            <div class="middle" ref="selection"></div>
            <div class="bottom" ref="bottom"></div>
        </div>
    </div>
</template>
<script>

    import TWEEN from 'tween.js';
    const isTouchable = typeof window !== 'undefined' && 'ontouchstart' in window;
    
    export default {
        name :"Picker",
        props: {
            height: {
                type: Number,
            },
            options: {
                type: Array,
                "default": () => [],
            },
            placeholder: String,
        },
        data() {
            return {
                top: 0,
                animatedTop: 0,
                pivots: null,
                tween: null,
                lastIndex: this.placeholder ? -1 : 0,
                draggingInfo: {
                    startTop: null,
                    isMouseDown: false,
                    isDragging: false,
                    isScrolling: false,
                    startPageY: null,
                    maxScroll: null,
                },
            };
        },
        mounted() {
            if (isTouchable) {
                this.$el.addEventListener('touchstart', this.handleStart);
                this.$el.addEventListener('touchmove', this.handleMove);
                this.$el.addEventListener('touchend', this.handleEnd);
                this.$el.addEventListener('touchcancel', this.handleCancel);
            } else {
                this.$el.addEventListener('mousewheel', this.handleWheel);
                this.$el.addEventListener('mousedown', this.handleStart);
                this.$el.addEventListener('mousemove', this.handleMove);
                this.$el.addEventListener('mouseup', this.handleEnd);
                this.$el.addEventListener('mouseleave', this.handleCancel);
            }
            var rect = this.$refs.selection.getBoundingClientRect();
            var med = (rect.top + rect.bottom) / 2;
            this.pivots = this.$refs.items.map((item) => {
                var rect = item.getBoundingClientRect();
                return Math.round(((rect.top + rect.bottom) / 2 - med) * 10) / 10;
            });
            this.draggingInfo.maxScroll = this.pivots[this.pivots.length - 1] * (-1);
        },
        destroyed() {
            if (isTouchable) {
                this.$el.removeEventListener('touchstart', this.handleStart);
                this.$el.removeEventListener('touchmove', this.handleMove);
                this.$el.removeEventListener('touchend', this.handleEnd);
                this.$el.removeEventListener('touchcancel', this.handleCancel);
            } else {
                this.$el.removeEventListener('mousewheel', this.handleWheel);
                this.$el.removeEventListener('mousedown', this.handleStart);
                this.$el.removeEventListener('mousemove', this.handleMove);
                this.$el.removeEventListener('mouseup', this.handleEnd);
                this.$el.removeEventListener('mouseleave', this.handleCancel);
            }
        },
        watch: {
            top(top) {
                if (this.animatedTop == this.top) return;
                function animate(time) {
                    requestAnimationFrame(animate);
                    TWEEN.update(time);
                }

                requestAnimationFrame(animate);
                
                if (this.tween) {
                    this.tween.stop();
                }
                var vm = this;
                this.tween = new TWEEN.Tween({top: this.animatedTop})
                    .easing(TWEEN.Easing.Cubic.InOut)
                    .to({top: top}, 300)
                    .onUpdate(function () {
                        vm.animatedTop = this.top;
                    })
                    .start();
            },
        },
        computed: {
            sanitizedOptions() {
                return this.options.map((option) => {
                    if (option.key && option.name) {
                        return option;
                    }
                    return {
                        key: option,
                        name: option,
                    };
                });
            },
        },
        methods: {
            handleWheel(e) {
                if (this.animatedTop > 0) return;
                if (this < this.draggingInfo.maxScroll) return;

                e.preventDefault();
                e.stopPropagation();
                if (this.draggingInfo.isScrolling) return;
                this.draggingInfo.isScrolling = true;
                if (e.deltaY < 0) {
                    console.log(Math.floor(Math.abs(e.deltaY) / 10 + 1));
                    this.correction(this.lastIndex - Math.floor(Math.abs(e.deltaY) / 10 + 1));
                } else if (e.deltaY > 0) {
                    console.log((Math.abs(e.deltaY) / 10 + 1));
                    this.correction(this.lastIndex + Math.floor(Math.abs(e.deltaY) / 10 + 1));
                }
                setTimeout(function () {
                    this.draggingInfo.isScrolling = false;
                }.bind(this), 100);
            },
            getTouchInfo (e) {
                return isTouchable ? e.changedTouches[0] || e.touches[0] : e;
            },
            handleStart (e) {
                if (e.cancelable) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                const touchInfo = this.getTouchInfo(e);
                this.draggingInfo.startTop = this.top;
                this.draggingInfo.startPageY = touchInfo.pageY;
                if (!isTouchable) {
                    this.draggingInfo.isMouseDown = true
                }
            },
            handleMove(e) {
                e.preventDefault();
                e.stopPropagation();
                if (isTouchable || this.draggingInfo.isMouseDown) {
                    this.draggingInfo.isDragging = true;
                    const touchInfo = this.getTouchInfo(e);
                    this.animatedTop = this.top = this.draggingInfo.startTop + touchInfo.pageY - this.draggingInfo.startPageY;
                } else {
                }
            },
            handleEnd(e) {
                e.preventDefault();
                e.stopPropagation();
                if (!this.draggingInfo.isDragging) {
                    this.draggingInfo.isDragging = false;
                    this.draggingInfo.isMouseDown = false;
                    this.handleClick(e);
                    return;
                }
                this.draggingInfo.isDragging = false;
                this.draggingInfo.isMouseDown = false;
                this.correctionAfterDragging();
            },
            handleCancel(e) {
                e.preventDefault();
                e.stopPropagation();
                if (isTouchable || this.draggingInfo.isMouseDown) {
                    this.correctionAfterDragging();
                    this.draggingInfo.isMouseDown = false
                    this.draggingInfo.isDragging = false
                }
            },
            handleClick(e) {
                if (e.target == this.$refs.top) {
                    this.correction(this.lastIndex - 1);
                } else if (e.target == this.$refs.bottom) {
                    this.correction(this.lastIndex + 1);
                }
            },
            correctionAfterDragging () {
                var index = null;
                var diff = null;
                var top = this.animatedTop;
                if (this.placeholder) {
                    index = -1;
                    diff = 0 + top;
                }
                this.pivots.forEach((pivot, i) => {
                    var _diff = pivot + top;
                    if (diff === null || Math.abs(diff) > Math.abs(_diff)) {
                        index = i;
                        diff = _diff;
                    }
                });
                this.correction(index);
            },
            correction(index) {
                index = Math.min(Math.max(index, this.placeholder ? -1 : 0), this.pivots.length - 1);
                if (this.lastIndex !== index) {
                    this.lastIndex = index;
                    var value = null;
                    if (index > -1) {
                        value = this.options[index];
                    }
                    this.$emit('input', value);
                }
                var top = 0; 
                if (index > -1) {
                    top = this.pivots[index] * (-1);
                }
                this.top = top;
            },
        },
    };
</script>
