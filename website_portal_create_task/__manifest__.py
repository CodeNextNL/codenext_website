# -*- coding: utf-8 -*-
{
    'name': "Portal Create Task",
    'summary': 'Add possibility to create task from portal as customer',
    'author': "codeNext",
    'website': "http:/www.codenext.nl",
    'version': '12.0.0.1',
    'installable': True,
    'license': 'LGPL-3',
    "depends": [
        'website',
        'website_js_below_the_fold',
        'project',
    ],
    'data': [
        'views/website_layout.xml',
        'views/website_portal_create_task.xml',
    ]
}
