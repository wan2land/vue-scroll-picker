<style src="./picker.scss" lang="scss"></style>
<template>
    <div class="vue-scroll-picker">
        <div class="vue-scroll-picker-list">
            <div class="vue-scroll-picker-list-rotator" :style="{top: top + 'px'}" :class="{'-transition': transitioning}">
                <div
                    class="vue-scroll-picker-item -placeholder"
                    :class="{'-selected': lastIndex == -1}"
                    ref="placeholder"
                    v-if="placeholder"
                >{{ placeholder }}</div>
                <div
                    class="vue-scroll-picker-item"
                    :class="{'-selected': lastIndex == index}"
                    v-for="(option, index) in sanitizedOptions"
                    :key="option.value"
                    ref="items"
                >{{ option.name }}</div>
            </div>
        </div>
        <div class="vue-scroll-picker-layer">
            <div class="top" ref="top"></div>
            <div class="middle" ref="selection"></div>
            <div class="bottom" ref="bottom"></div>
        </div>
    </div>
</template>
<script>

    const isTouchable = typeof window !== 'undefined' && 'ontouchstart' in window;
    
    export default {
        props: {
            value: null,
            options: {
                type: Array,
                "default": () => [],
            },
            placeholder: String,
        },
        data() {
            var lastIndex = this.placeholder ? -1 : 0;
            if (this.value) {
                this.options.forEach(function(option, index) {
                    if (option == this.value || option.value == this.value) {
                        lastIndex = index;
                    }
                }.bind(this));
            }
            return {
                top: 0,
                pivots: null,
                lastIndex: lastIndex,
                transitioning: false,
                transitionTO: null,
                startTop: null,
                isMouseDown: false,
                isDragging: false,
                isScrolling: false,
                startY: null,
                scrollMax: null,
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
                this.$el.addEventListener('wheel', this.handleWheel); // for IE
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
            this.scrollMax = this.pivots[this.pivots.length - 1] * (-1);
            if (this.lastIndex > 0) {
                this.top = this.pivots[this.lastIndex] * (-1);
            }
            if (!this.value && this.sanitizedOptions[this.lastIndex]) {
                this.$emit('input', this.sanitizedOptions[this.lastIndex].value);
            }
        },
        destroyed() {
            if (isTouchable) {
                this.$el.removeEventListener('touchstart', this.handleStart);
                this.$el.removeEventListener('touchmove', this.handleMove);
                this.$el.removeEventListener('touchend', this.handleEnd);
                this.$el.removeEventListener('touchcancel', this.handleCancel);
            } else {
                this.$el.removeEventListener('mousewheel', this.handleWheel);
                this.$el.removeEventListener('wheel', this.handleWheel); // for IE
                this.$el.removeEventListener('mousedown', this.handleStart);
                this.$el.removeEventListener('mousemove', this.handleMove);
                this.$el.removeEventListener('mouseup', this.handleEnd);
                this.$el.removeEventListener('mouseleave', this.handleCancel);
            }
        },
        computed: {
            sanitizedOptions() {
                return this.options.map((option) => {
                    if (option.hasOwnProperty('value') && option.hasOwnProperty('name')) {
                        return option;
                    }
                    return {
                        value: option,
                        name: option,
                    };
                });
            },
        },
        watch: {
            value(newValue, oldValue) {
                var foundIndex = -1;
                this.sanitizedOptions.forEach(function (option, index) {
                    if (option.value == newValue) foundIndex = index;
                });
                if (this.lastIndex !== foundIndex) {
                    this.correction(foundIndex);
                }
            },
        },
        methods: {
            handleWheel(e) {
                if (this.top >= 0 && e.deltaY < 0) return;
                if (this.top <= this.scrollMax && e.deltaY > 0) return;

                e.preventDefault();
                e.stopPropagation();

                if (this.isScrolling) return;
                this.isScrolling = true;
                
                if (e.deltaY < 0) {
                    this.correction(this.lastIndex - Math.floor(Math.abs(e.deltaY) / 30 + 1));
                } else if (e.deltaY > 0) {
                    this.correction(this.lastIndex + Math.floor(Math.abs(e.deltaY) / 30 + 1));
                }
                setTimeout(function () {
                    this.isScrolling = false;
                }.bind(this), 80);
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
                this.startTop = this.top;
                this.startY = touchInfo.pageY;
                if (!isTouchable) {
                    this.isMouseDown = true
                }
                this.isDragging = false;
            },
            handleMove(e) {
                e.preventDefault();
                e.stopPropagation();
                if (isTouchable || this.isMouseDown) {
                    const touchInfo = this.getTouchInfo(e);
                    var diff = touchInfo.pageY - this.startY;
                    if (Math.abs(diff) > 1.5) {
                        this.isDragging = true;
                    }
                    this.top = this.startTop + diff * 1.7;
                }
            },
            handleEnd(e) {
                e.preventDefault();
                e.stopPropagation();
                if (!this.isDragging) {
                    this.isDragging = false;
                    this.isMouseDown = false;
                    this.handleClick(e);
                    return;
                }
                this.isDragging = false;
                this.isMouseDown = false;
                this.correctionAfterDragging();
            },
            handleCancel(e) {
                e.preventDefault();
                e.stopPropagation();
                if (isTouchable || this.isMouseDown) {
                    this.correctionAfterDragging();
                    this.isMouseDown = false
                    this.isDragging = false
                }
            },
            handleClick(e) {
                const touchInfo = this.getTouchInfo(e);
                var x = touchInfo.clientX; // not pageX (pageX = clientX + scrollLeft)
                var y = touchInfo.clientY; // not pageY (pageY = clientY + scrollTop)
                var topRect = this.$refs.top.getBoundingClientRect();
                var bottomRect = this.$refs.bottom.getBoundingClientRect();
                if (topRect.left <= x && x <= topRect.right && topRect.top <= y && y <= topRect.bottom) {
                    this.correction(this.lastIndex - 1);
                } else if (bottomRect.left <= x && x <= bottomRect.right && bottomRect.top <= y && y <= bottomRect.bottom) {
                    this.correction(this.lastIndex + 1);
                }
            },
            correctionAfterDragging () {
                var index = null;
                var diff = null;
                var top = this.top;
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
                        value = this.sanitizedOptions[index].value;
                    }
                    this.$emit('input', value);
                }
                var top = 0; 
                if (index > -1) {
                    top = this.pivots[index] * (-1);
                }
                this.top = top;

                this.transitioning = true;
                if (this.transitionTO) {
                    clearTimeout(this.transitionTO);
                    this.transitionTO = null;
                }
                this.transitionTO = setTimeout(function () {
                    this.transitioning = false;
                    this.transitionTO = null;
                }.bind(this), 100);
            },
        },
    };
</script>
