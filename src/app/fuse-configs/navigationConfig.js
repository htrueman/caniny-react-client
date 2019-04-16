const navigationConfig = [
    {
        'id': 'applications',
        'title': 'Applications',
        'type': 'group',
        'icon': 'apps',
        'children': [
            {
                'id': 'example-component',
                'title': 'Example',
                'type': 'item',
                'icon': 'whatshot',
                'url': '/example'
            }
        ]
    },
    // {
    //     'id': 'auth',
    //     'title': 'Auth',
    //     'type': 'group',
    //     'icon': 'apps',
    //     'children': [
    //         {
    //             'id': 'login',
    //             'title': 'Login',
    //             'type': 'item',
    //             'url': '/login',
    //             'icon': 'lock'
    //         },
    //         {
    //             'id': 'register',
    //             'title': 'Register',
    //             'type': 'item',
    //             'url': '/register',
    //             'icon': 'person_add'
    //         }
    //     ]
    // }
];

export default navigationConfig;
