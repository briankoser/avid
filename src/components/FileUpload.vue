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
    sendFile: function (ext, file) {
      this.$emit('upload', ext, file)
    }
  },
  mounted () {
    var dropzone = document.getElementById('formDropzone')

    if (dropzone) {
      dropzone.addEventListener('dragenter', dragenter, false)
      dropzone.addEventListener('dragleave', dragleave, false)
      dropzone.addEventListener('dragover', dragover, false)
      dropzone.addEventListener('drop', drop, false)
    }
  }
}

let $ = require('jquery')

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
    let fileNameParts = file.name.split('.')
    let ext = fileNameParts[fileNameParts.length - 1]
    let result = e.target.result
    if (ext === 'json') {
      result = JSON.parse(e.target.result)
    }

    window.vueFileUpload.sendFile(ext, result)
  }
  reader.readAsText(file)

  $(e.target).hide()
}
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