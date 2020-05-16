odoo.define("website_portal_create_task.website_editor", function (require) {
  "use strict";

  require("web.dom_ready");

  $("textarea.load_editor").each(function () {
    var $textarea = $(this);
    var editor_karma = $textarea.data("karma") || 0; // default value for backward compatibility
    if (!$textarea.val().match(/\S/)) {
      $textarea.val("<p><br/></p>");
    }
    var $form = $textarea.closest("form");
    var toolbar = [
      ["style", ["style"]],
      ["font", ["bold", "italic", "underline", "clear"]],
      ["para", ["ul", "ol", "paragraph"]],
      ["table", ["table"]],
      ["history", ["undo", "redo"]],
    ];
    if (parseInt($("#karma").val()) >= editor_karma) {
      toolbar.push(["insert", ["link", "picture"]]);
    }
    $textarea.summernote({
      height: 150,
      toolbar: toolbar,
      styleWithSpan: false,
    });

    // float-left class messes up the post layout OPW 769721
    $form
      .find(".note-editable")
      .find("img.float-left")
      .removeClass("float-left");
    $form.on("click", "button, .a-submit", function () {
      $textarea.html($form.find(".note-editable").code());
    });
  });
});
