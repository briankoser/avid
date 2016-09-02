<template>
    <form action="test" class="dropzone" id="formDropzone">
        Drag {{fileDescription}} to upload
    </form>
</template>

<script>
export default {
  created: function () {
    window.vueFileUpload = this
  },
  props: {
    fileDescription: {
      type: String
    }
  },
  methods: {
    sendFile: function (file) {
      this.$dispatch('send-file', file)
    }
  }
}

function dragenter (e) {
  e.stopPropagation()
  e.preventDefault()
  $(e.target).addClass('hover')
}

function dragleave (e) {
  e.stopPropagation()
  e.preventDefault()
  $(e.target).removeClass('hover')
}

function dragover (e) {
  e.stopPropagation()
  e.preventDefault()
}

function drop (e) {
  e.stopPropagation()
  e.preventDefault()

  var dt = e.dataTransfer
  var files = dt.files
  var file = files[0]

  var reader = new window.FileReader()
  reader.onload = (e) => {
    window.vueFileUpload.sendFile(JSON.parse(e.target.result))
  }
  reader.readAsText(file)

  $(e.target).hide()
}

let $ = require('jquery')
$(document).ready(function () {
  var dropbox = document.getElementById('formDropzone')
  dropbox.addEventListener('dragenter', dragenter, false)
  dropbox.addEventListener('dragleave', dragleave, false)
  dropbox.addEventListener('dragover', dragover, false)
  dropbox.addEventListener('drop', drop, false)
})
</script>

<style scoped>
form {
    line-height: 3.6em;
    text-align: center;
}
.dropzone {
    border: 2px solid rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    background: white;
    min-height: 150px;
    padding: 20px;
}

.hover {
    background-color: #ececec;
    border: 4px dashed black;
}
</style>