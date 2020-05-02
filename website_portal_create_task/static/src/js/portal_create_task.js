odoo.define('portal.create_task', function (require) {
'use strict';

var rpc = require('web.rpc');
var weContext = require('web_editor.context');
require('web.dom_ready');
/*
 * This file is intended to add interactivity to survey forms rendered by
 * the website engine.
 */

var new_task_form = $('.new_task_form');

if(!new_task_form.length) {
    return $.Deferred().reject("DOM doesn't contain website_create_task_portal elements");
}

$('.new_task_confirm').on('click',function(e){
    var $btn = $(this);
    $btn.prop('disabled', true);
    rpc.query({
            model: 'project.task',
            method: 'create_task_portal',
            args: [{
                project: parseInt($('.new_task_form .project').val()),
                title: $('.new_task_form .title').val(),
                description: $('.new_task_form .description').val(),
                deadline: $('.new_task_form .deadline').val(),
                added_file: $('.new_task_form .added_file').val(),
            }],
            context: weContext.get(), // TODO use this._rpc
        })
        .done(function(response){
            if (response.errors) {
                $('#new-opp-dialog .alert').remove();
                $('#new-opp-dialog div:first').prepend("<div class='alert alert-danger'>" + response.errors + "</div>");
                $btn.prop('disabled', false);

            }
            else {
                window.location = '/my/task/' + response.id;
            }
        })
        .fail(function() {
            $btn.prop('disabled', false);
        });
    return false;
});

});
