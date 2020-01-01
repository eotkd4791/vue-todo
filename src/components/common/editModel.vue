<template>
    <transition name="emodal">
        <div class="emodal-mask">
            <div class="emodal-wrapper">
                <div class="emodal-container">

                    <div class="emodal-header">
                        <slot name="eheader">
                            default header
                        </slot>
                    </div>

                    <div class="emodal-body">
                        <slot name="ebody">
                            default body
                        </slot>
                    </div>
                    <div class="emodal-footer">
                        <slot name="efooter">
                            default footer
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {

}
</script>

<style>
.emodal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.emodal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.emodal-container {
  width: 600px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.emodal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.emodal-body {
  margin: 20px 0;
}

.emodal-enter {
  opacity: 0;
}

.emodal-leave-active {
  opacity: 0;
}

.emodal-enter .emodal-container,
.emodal-leave-active .emodal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>