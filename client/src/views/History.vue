<template>
  <div class="about">
    <h1>Entstehungsgeschichte</h1>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
// Import the editor: https://github.com/scrumpy/tiptap
import { Editor, EditorContent } from 'tiptap'

export default {
  components: {
    EditorContent,
  },
  data() {
    return {
      editor: null,
    }
  },
  mounted() {
    this.editor = new Editor({
      content: '<p>This is just a boring paragraph</p>',
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>
