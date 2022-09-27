# -*- coding: utf-8 -*-
{
    'name': "Portal Create Task",
    'summary': 'Add possibility to create task from portal as customer',
    'author': "codeNext",
    'website': "http:/www.codenext.nl",
    'version': '13.0.1.0.0',
    'installable': True,
    'license': 'LGPL-3',
    "depends": [
        'project',
        'website_profile',
    ],
    'data': [
        'views/website_layout.xml',
        'views/website_portal_create_task.xml',
    ]
}
