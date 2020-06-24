/**
 * Javascript Video for the Moodle videodatabase
 *
 * The component lists all user comments
 *
 * @module     mod_videodatabase/videodatabase
 * @package    mod_videodatabase
 * @class      Comments
 * @copyright  2018 Niels Seidel, info@social-machinables.com
 * @license    MIT
 * @since      3.1
 *
 *
 */

define([
  'amd/src/lib/vue.js',
  'amd/src/components/Utils.js',
  'js/moment-with-locales.min.js',
], (Vue, Utils, moment) => {
  function Comments(store, course, user, token, utils) {
    this.store = store
    this.course = course
    this.user = user

    const _this = this

    this.comments = {
      template: '#app-comments-template',
      data() {
        return {
          all_comments: [],
        }
      },
      methods: {
        moment(t) {
          return moment(Number(t), 'x').fromNow()
        },
        edit(id) { },
        remove(id, video) {
          utils.get_ws('annotations', {
            courseid: course.id,
            id,
            videoid: video,
            operation: 'remove',
          }, function (msg) {
            try {
              const d = JSON.parse(msg.data)
              _this.all_comments = Object.keys(d).map(o => d[o])
              this.$forceUpdate()
            } catch (e) {
              console.log('Could not parse comments from database after remove')
              console.log(msg)
            }
          })
        },
      },
      created() {
        const _this = this
        utils.get_ws('annotations', { courseid: course.id }, (msg) => {
          try {
            const d = JSON.parse(msg.data)
            _this.all_comments = Object.keys(d).map(o => d[o])
          } catch (e) {
            console.log('Could not parse comments from database')
            console.log(msg)
          }
        })
      },
      updated() {
        const _this = this
        utils.get_ws('annotations', { courseid: course.id }, (msg) => {
          try {
            const d = JSON.parse(msg.data)
            _this.all_comments = Object.keys(d).map(o => d[o])
          } catch (e) {
            console.log('Could not parse comments from database')
            console.log(msg)
          }
        })
      },

    }
  }

  return Comments
})
