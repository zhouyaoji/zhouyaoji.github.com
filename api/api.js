YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "ActionContext",
        "Analytics.common",
        "Assets.common",
        "Carrier.common",
        "Composite.common",
        "Config.common",
        "Cookie.client",
        "Cookie.server",
        "Deploy.server",
        "Device.common",
        "Http.server",
        "I13n.server",
        "Intl.common",
        "Meta.common",
        "MojitProxy",
        "MojitoDispatcher",
        "MojitoServer",
        "OutputAdapter.common",
        "OutputHandler",
        "Params.common",
        "Partial.common",
        "ResourceStore.server",
        "Url.common",
        "Y.mojito.Client",
        "Y.mojito.lib.MojitoRouter",
        "Y.mojito.lib.REST"
    ],
    "modules": [
        "ActionContext",
        "ActionContextAddon",
        "CommonLibs",
        "MojitoClient",
        "MojitoServer"
    ],
    "allModules": [
        {
            "displayName": "ActionContext",
            "name": "ActionContext",
            "description": "The Action Context is a key part of the Mojito framework. The <em>ac</em>,\nfor short, gives you access to the frameworks features from within a\ncontroller function. The ac is an abstraction that allows you to execute\nmojit actions within either a server or client context."
        },
        {
            "displayName": "ActionContextAddon",
            "name": "ActionContextAddon",
            "description": "The <strong>Action Context</strong> uses a mechanism called\n<strong><em>Addons</em></strong> to provide functionality that lives both on\nthe server and/or client. Each Addon provides additional functions through a\nnamespace that is attached directly to the ac argument available in every\ncontroller function."
        },
        {
            "displayName": "CommonLibs",
            "name": "CommonLibs",
            "description": "Common Library"
        },
        {
            "displayName": "MojitoClient",
            "name": "MojitoClient",
            "description": "Client side Mojito runtime"
        },
        {
            "displayName": "MojitoServer",
            "name": "MojitoServer",
            "description": "The Mojito Server bootstrap"
        }
    ]
} };
});