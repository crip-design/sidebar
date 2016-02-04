(function (crip, $) {
    'use strict';

    $.fn.cripSidebar = cripSidebar;

    var sidebar, settings = {
        contentWrapper: '#crip-content'
    };

    function cripSidebar(options) {
        // This is the easiest way to have default options.
        $.extend(settings, options);
        sidebar = this;

        var $content = $(settings.contentWrapper);

        if (sidebar.length !== 1 || $content.length !== 1)
            throw new Error('cripSidebar do not support multiple/zero elements!');

        expandActive(sidebar);
        addEventListeners(sidebar);

        return true;
    }

    function expandActive($elem) {
        $elem.find('.active').each(function (index, active) {
            var $active = $(active),
                $next = $active.next();
            if ($next.length && $next.attr('class').indexOf('crip-drop') > -1) {
                $next.addClass('in');
                $elem.addClass('in');

                $active.on('click', onActiveClick);
            }
        });
    }

    function addEventListeners($elem) {
        $elem.find('.crip-drop').each(function (i, drop) {
            var $drop = $(drop);
            if (!$drop.hasClass('in')) {
                console.log($drop, $drop.prev('a'));
                $drop.prev('a').on('click', onInactiveClick)
            }
        });

    }

    function onActiveClick() {
        var $elem = $(this),
            $drop = $elem.next('.crip-drop');

        $drop.removeClass('in');
        if (!hasOpenAny($drop))
            sidebar.removeClass('in');

        $elem
            .removeClass('active')
            .off('click', onActiveClick)
            .on('click', onInactiveClick);
        return false;
    }

    function onInactiveClick() {
        var $elem = $(this),
            $drop = $elem.next('.crip-drop');

        closeAnyOpen($elem);
        $drop.addClass('in');
        sidebar.addClass('in');

        $elem
            .addClass('active')
            .off('click', onInactiveClick)
            .on('click', onActiveClick);
        return false;
    }

    function hasOpenAny($except) {
        var except = !$except ? 0 : $except.find('.crip-drop.in').length;
        return !!(sidebar.find('.crip-drop.in').length - except);
    }

    function closeAnyOpen($exclude) {
        sidebar.find('.crip-drop.in').each(function (index, elem) {
            var $elem = $(elem);
            if (($exclude && !$exclude.find($elem) && $elem.hasClass('in')) || (!$exclude && $elem.hasClass('in')))
                $elem
                    .removeClass('in')
                    .prev()
                    .removeClass('active');
        });
    }

})(window.crip || (window.crip = {}), jQuery);