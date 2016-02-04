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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjcmlwLXNpZGViYXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChjcmlwLCAkKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgJC5mbi5jcmlwU2lkZWJhciA9IGNyaXBTaWRlYmFyO1xyXG5cclxuICAgIHZhciBzaWRlYmFyLCBzZXR0aW5ncyA9IHtcclxuICAgICAgICBjb250ZW50V3JhcHBlcjogJyNjcmlwLWNvbnRlbnQnXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyaXBTaWRlYmFyKG9wdGlvbnMpIHtcclxuICAgICAgICAvLyBUaGlzIGlzIHRoZSBlYXNpZXN0IHdheSB0byBoYXZlIGRlZmF1bHQgb3B0aW9ucy5cclxuICAgICAgICAkLmV4dGVuZChzZXR0aW5ncywgb3B0aW9ucyk7XHJcbiAgICAgICAgc2lkZWJhciA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciAkY29udGVudCA9ICQoc2V0dGluZ3MuY29udGVudFdyYXBwZXIpO1xyXG5cclxuICAgICAgICBpZiAoc2lkZWJhci5sZW5ndGggIT09IDEgfHwgJGNvbnRlbnQubGVuZ3RoICE9PSAxKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyaXBTaWRlYmFyIGRvIG5vdCBzdXBwb3J0IG11bHRpcGxlL3plcm8gZWxlbWVudHMhJyk7XHJcblxyXG4gICAgICAgIGV4cGFuZEFjdGl2ZShzaWRlYmFyKTtcclxuICAgICAgICBhZGRFdmVudExpc3RlbmVycyhzaWRlYmFyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZXhwYW5kQWN0aXZlKCRlbGVtKSB7XHJcbiAgICAgICAgJGVsZW0uZmluZCgnLmFjdGl2ZScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBhY3RpdmUpIHtcclxuICAgICAgICAgICAgdmFyICRhY3RpdmUgPSAkKGFjdGl2ZSksXHJcbiAgICAgICAgICAgICAgICAkbmV4dCA9ICRhY3RpdmUubmV4dCgpO1xyXG4gICAgICAgICAgICBpZiAoJG5leHQubGVuZ3RoICYmICRuZXh0LmF0dHIoJ2NsYXNzJykuaW5kZXhPZignY3JpcC1kcm9wJykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgJG5leHQuYWRkQ2xhc3MoJ2luJyk7XHJcbiAgICAgICAgICAgICAgICAkZWxlbS5hZGRDbGFzcygnaW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYWN0aXZlLm9uKCdjbGljaycsIG9uQWN0aXZlQ2xpY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnMoJGVsZW0pIHtcclxuICAgICAgICAkZWxlbS5maW5kKCcuY3JpcC1kcm9wJykuZWFjaChmdW5jdGlvbiAoaSwgZHJvcCkge1xyXG4gICAgICAgICAgICB2YXIgJGRyb3AgPSAkKGRyb3ApO1xyXG4gICAgICAgICAgICBpZiAoISRkcm9wLmhhc0NsYXNzKCdpbicpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkZHJvcCwgJGRyb3AucHJldignYScpKTtcclxuICAgICAgICAgICAgICAgICRkcm9wLnByZXYoJ2EnKS5vbignY2xpY2snLCBvbkluYWN0aXZlQ2xpY2spXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25BY3RpdmVDbGljaygpIHtcclxuICAgICAgICB2YXIgJGVsZW0gPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAkZHJvcCA9ICRlbGVtLm5leHQoJy5jcmlwLWRyb3AnKTtcclxuXHJcbiAgICAgICAgJGRyb3AucmVtb3ZlQ2xhc3MoJ2luJyk7XHJcbiAgICAgICAgaWYgKCFoYXNPcGVuQW55KCRkcm9wKSlcclxuICAgICAgICAgICAgc2lkZWJhci5yZW1vdmVDbGFzcygnaW4nKTtcclxuXHJcbiAgICAgICAgJGVsZW1cclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAub2ZmKCdjbGljaycsIG9uQWN0aXZlQ2xpY2spXHJcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBvbkluYWN0aXZlQ2xpY2spO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvbkluYWN0aXZlQ2xpY2soKSB7XHJcbiAgICAgICAgdmFyICRlbGVtID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgJGRyb3AgPSAkZWxlbS5uZXh0KCcuY3JpcC1kcm9wJyk7XHJcblxyXG4gICAgICAgIGNsb3NlQW55T3BlbigkZWxlbSk7XHJcbiAgICAgICAgJGRyb3AuYWRkQ2xhc3MoJ2luJyk7XHJcbiAgICAgICAgc2lkZWJhci5hZGRDbGFzcygnaW4nKTtcclxuXHJcbiAgICAgICAgJGVsZW1cclxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAub2ZmKCdjbGljaycsIG9uSW5hY3RpdmVDbGljaylcclxuICAgICAgICAgICAgLm9uKCdjbGljaycsIG9uQWN0aXZlQ2xpY2spO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYXNPcGVuQW55KCRleGNlcHQpIHtcclxuICAgICAgICB2YXIgZXhjZXB0ID0gISRleGNlcHQgPyAwIDogJGV4Y2VwdC5maW5kKCcuY3JpcC1kcm9wLmluJykubGVuZ3RoO1xyXG4gICAgICAgIHJldHVybiAhIShzaWRlYmFyLmZpbmQoJy5jcmlwLWRyb3AuaW4nKS5sZW5ndGggLSBleGNlcHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlQW55T3BlbigkZXhjbHVkZSkge1xyXG4gICAgICAgIHNpZGViYXIuZmluZCgnLmNyaXAtZHJvcC5pbicpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtKSB7XHJcbiAgICAgICAgICAgIHZhciAkZWxlbSA9ICQoZWxlbSk7XHJcbiAgICAgICAgICAgIGlmICgoJGV4Y2x1ZGUgJiYgISRleGNsdWRlLmZpbmQoJGVsZW0pICYmICRlbGVtLmhhc0NsYXNzKCdpbicpKSB8fCAoISRleGNsdWRlICYmICRlbGVtLmhhc0NsYXNzKCdpbicpKSlcclxuICAgICAgICAgICAgICAgICRlbGVtXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLnByZXYoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59KSh3aW5kb3cuY3JpcCB8fCAod2luZG93LmNyaXAgPSB7fSksIGpRdWVyeSk7Il0sImZpbGUiOiJjcmlwLXNpZGViYXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
