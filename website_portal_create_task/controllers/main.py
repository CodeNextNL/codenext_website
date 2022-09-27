import logging
import werkzeug
import odoo.http as http
from odoo.addons.portal.controllers.portal import CustomerPortal
import base64
from openerp.http import request

_logger = logging.getLogger(__name__)


class PortalCreateTaskController(CustomerPortal):

    def _prepare_portal_layout_values(self):
        values = super(PortalCreateTaskController,
                       self)._prepare_portal_layout_values()
        return values

    @http.route('/new/task', type="http", auth="user", website=True)
    def create_new_ticket(self, **kw):
        values = self._prepare_portal_layout_values()
        email = http.request.env.user.email
        name = http.request.env.user.name
        user_projects = http.request.env['project.project'].search([])
        values.update({
            'email': email,
            'name': name,
            'user_projects': user_projects,
            'page_name': 'new_task'
        })
        return http.request.render('website_portal_create_task.portal_create_task', values)

    @http.route('/submitted/task',
                type="http", auth="user", website=True, csrf=True)
    def submit_task(self, **kw):
        project_id = int(kw.get('project'))
        vals = {
            'project_id': project_id,
            'name': kw.get('title'),
            'description': kw.get('description'),
            'date_deadline': kw.get('date_deadline'),
            'user_id': request.env['project.project'].sudo().search([
                ('id', '=', project_id)]).user_id.id,
            'attachment_ids': False,
        }
        new_task = request.env['project.task'].sudo().create(
            vals)
        new_task.message_subscribe(
            partner_ids=request.env.user.partner_id.ids)
        if kw.get('attachment'):
            for c_file in request.httprequest.files.getlist('attachment'):
                data = c_file.read()
                if c_file.filename:
                    request.env['ir.attachment'].sudo().create({
                        'name': c_file.filename,
                        'datas': base64.b64encode(data),
                        # 'datas_fname': c_file.filename,
                        'res_model': 'project.task',
                        'res_id': new_task.id
                    })
        return werkzeug.utils.redirect("/my/task/" + str(new_task.id))
