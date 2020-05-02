# -*- coding: utf-8 -*-

from odoo import api, fields, models, _


class Task(models.Model):
    _inherit = "project.task"

    @api.model
    def create_task_portal(self, values):
        project_id = values['project']
        project = self.env['project.project'].search([('id', '=', project_id)])
        user_id = project.user_id.id
        self = self.sudo()
        if not (values['description'] and values['title']):
            return {
                'errors': _('All fields are required !')
            }
        values = {
            'project_id': values['project'],
            'name': values['title'],
            'description': values['description'],
            'date_deadline': values['deadline'],
            'attachments': values['added_file'],
            'user_id': user_id
        }

        task = self.create(values)
        return {
            'id': task.id
        }
