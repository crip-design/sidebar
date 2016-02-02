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

    function onActiveClick() {
        var $elem = $(this),
            $drop = $elem.next();

        $drop.removeClass('in');
        if (!hasOpenAny())
            sidebar.removeClass('in');

        $elem
            .removeClass('active')
            .off('click', onActiveClick)
            .on('click', onInactiveClick);
        return false;
    }

    function onInactiveClick() {
        var $elem = $(this),
            $drop = $elem.next();

        closeAnyOpen();
        $drop.addClass('in');
        sidebar.addClass('in');

        $elem
            .addClass('active')
            .off('click', onInactiveClick)
            .on('click', onActiveClick);
        return false;
    }

    function hasOpenAny() {
        return !!sidebar.find('.crip-drop.in').length;
    }

    function closeAnyOpen() {
        sidebar.find('.crip-drop.in').each(function (index, elem) {
            var $elem = $(elem);
            if ($elem.hasClass('in')) {
                $elem
                    .removeClass('in')
                    .prev()
                    .removeClass('active');
            }
        });
    }

})(window.crip || (window.crip = {}), jQuery);