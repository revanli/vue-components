<template>
  <!-- Modal -->
  <div class="modal fade" :style="{display: displayAttr}" :class="{'in': isShowModal}">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- modal header -->
        <div class="modal-header">
          <div type="button" class="close" @click="closeModal">&times;</div>
          <slot name="header"></slot>
        </div>
        <!-- modal body -->
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <!-- modal footer -->
        <div class="modal-footer">
          <slot name="footer"></slot>
          <button type="button" class="btn btn-primary">Save changes</button>
          <button type="button" class="btn btn-default">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowModal: false,
      displayAttr: 'none'
    }
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeModal () {
      console.log('close')
      this.$emit('close-modal', false)
    }
  },
  watch: {
    isOpen (currVal) {
      if (currVal) {
        // open Modal
        setTimeout(() => {
          this.isShowModal = !this.isShowModal
        }, 100)
        this.displayAttr = this.displayAttr == 'none' ? 'block' : 'none'
        document.querySelector('body').className = 'modal-open noscroll'
      } else {
        // close Modal
        setTimeout(() => {
          this.displayAttr = this.displayAttr == 'none' ? 'block' : 'none'
        }, 100)
        this.isShowModal = !this.isShowModal
        document.querySelector('body').className = ''
      }
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  display: none;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .8);
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  outline: 0;
  color: #333;
}
/* open mdoal, allow scroll */
.modal-open .modal {
  overflow-x: hidden;
  overflow-y: auto;
}
.modal-dialog {
  position: relative;
  width: auto;
  margin: 1rem .54rem;
}
.fade {
  opacity: 0;
  -webkit-transition: opacity .15s linear;
  -o-transition: opacity .15s linear;
  transition: opacity .15s linear;
}
.fade.in {
  opacity: 1;
}
.modal-dialog {
  position: relative;
  width: 6.4rem;
  background: #fff;
  border-radius: .1rem;
}
/* size */
.modal-dialog.big {
  width: 6.66rem;
  margin: 1rem auto;
}
.modal-dialog.middle {
  width: 5.5rem;
  margin: 1rem auto;
}

/* header */
.modal-header {
  font-size: 14px;
  text-align: left;
  padding: .15rem;
  border-bottom: 1px solid #e5e5e5;
}
/* body */
.modal-body { 
  font-size: 14px;
  text-align: left;
  padding: .15rem;
  border-bottom: 1px solid #e5e5e5;
}
/* footer */
.modal-footer {
  padding: .15rem;
  text-align: right;
}
/* close btn */
div.close {
  float: right;
  font-size: 21px;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  filter: alpha(opacity=20);
  opacity: .2;
  margin-top: -.1rem;
}

/* button */
.btn {
  display: inline-block;
  padding: .06rem .12rem;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: .08rem;
}
.btn-default {
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}
.btn-primary {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
}
.modal-footer .btn + .btn {
  margin-bottom: 0;
  margin-left: .05rem;
}

/* -- modal transition --*/
.modal.fade .modal-dialog {
  -webkit-transition: -webkit-transform .3s ease-out;
  -o-transition: -o-transform .3s ease-out;
  transition: transform .3s ease-out;
  -webkit-transform: scale(.8, .8);  /* translate(0, -25%) */
  -ms-transform: scale(.8, .8);
  -o-transform: scale(.8, .8);
  transform: scale(.8, .8);
}
.modal.in .modal-dialog {
  -webkit-transform: scale(1, 1);  /* translate(0, 0) */
  -ms-transform: scale(1, 1);
  -o-transform: scale(1, 1);
  transform: scale(1, 1);
}
</style>

<style>
body.noscroll {
  overflow: hidden;
}
</style>

