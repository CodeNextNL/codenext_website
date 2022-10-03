odoo.define("website_portal_create_task.website_editor", function (require) {
  "use strict";

  var publicWidget = require("web.public.widget");
  var wysiwygLoader = require("web_editor.loader");

  publicWidget.registry.websiteProfileEditor = publicWidget.Widget.extend({
    selector: ".o_wprofile_editor_form",

    /**
     * @override
     */
    start: function () {
      var def = this._super.apply(this, arguments);
      if (this.editableMode) {
        return def;
      }

      // Warning: Do not activate any option that adds inline style.
      // Because the style is deleted after save.
      var toolbar = [
        ["style", ["style"]],
        ["font", ["bold", "italic", "underline", "clear"]],
        ["para", ["ul", "ol", "paragraph"]],
        ["table", ["table"]],
        ["history", ["undo", "redo"]],
      ];

      var $textarea = this.$("textarea.o_wysiwyg_loader");
      var loadProm = wysiwygLoader
        .load(this, $textarea[0], {
          toolbar: toolbar,
          recordInfo: {
            context: this._getContext(),
            res_model: "res.users",
            res_id: parseInt(this.$("input[name=user_id]").val()),
          },
          disableResizeImage: true,
        })
        .then((wysiwyg) => {
          this._wysiwyg = wysiwyg;
        });

      return Promise.all([def, loadProm]);
    },
  });
});
