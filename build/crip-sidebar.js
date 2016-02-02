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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjcmlwLXNpZGViYXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChjcmlwLCAkKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgJC5mbi5jcmlwU2lkZWJhciA9IGNyaXBTaWRlYmFyO1xyXG5cclxuICAgIHZhciBzaWRlYmFyLCBzZXR0aW5ncyA9IHtcclxuICAgICAgICBjb250ZW50V3JhcHBlcjogJyNjcmlwLWNvbnRlbnQnXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyaXBTaWRlYmFyKG9wdGlvbnMpIHtcclxuICAgICAgICAvLyBUaGlzIGlzIHRoZSBlYXNpZXN0IHdheSB0byBoYXZlIGRlZmF1bHQgb3B0aW9ucy5cclxuICAgICAgICAkLmV4dGVuZChzZXR0aW5ncywgb3B0aW9ucyk7XHJcbiAgICAgICAgc2lkZWJhciA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciAkY29udGVudCA9ICQoc2V0dGluZ3MuY29udGVudFdyYXBwZXIpO1xyXG5cclxuICAgICAgICBpZiAoc2lkZWJhci5sZW5ndGggIT09IDEgfHwgJGNvbnRlbnQubGVuZ3RoICE9PSAxKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyaXBTaWRlYmFyIGRvIG5vdCBzdXBwb3J0IG11bHRpcGxlL3plcm8gZWxlbWVudHMhJyk7XHJcblxyXG4gICAgICAgIGV4cGFuZEFjdGl2ZShzaWRlYmFyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZXhwYW5kQWN0aXZlKCRlbGVtKSB7XHJcbiAgICAgICAgJGVsZW0uZmluZCgnLmFjdGl2ZScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBhY3RpdmUpIHtcclxuICAgICAgICAgICAgdmFyICRhY3RpdmUgPSAkKGFjdGl2ZSksXHJcbiAgICAgICAgICAgICAgICAkbmV4dCA9ICRhY3RpdmUubmV4dCgpO1xyXG4gICAgICAgICAgICBpZiAoJG5leHQubGVuZ3RoICYmICRuZXh0LmF0dHIoJ2NsYXNzJykuaW5kZXhPZignY3JpcC1kcm9wJykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgJG5leHQuYWRkQ2xhc3MoJ2luJyk7XHJcbiAgICAgICAgICAgICAgICAkZWxlbS5hZGRDbGFzcygnaW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYWN0aXZlLm9uKCdjbGljaycsIG9uQWN0aXZlQ2xpY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25BY3RpdmVDbGljaygpIHtcclxuICAgICAgICB2YXIgJGVsZW0gPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAkZHJvcCA9ICRlbGVtLm5leHQoKTtcclxuXHJcbiAgICAgICAgJGRyb3AucmVtb3ZlQ2xhc3MoJ2luJyk7XHJcbiAgICAgICAgaWYgKCFoYXNPcGVuQW55KCkpXHJcbiAgICAgICAgICAgIHNpZGViYXIucmVtb3ZlQ2xhc3MoJ2luJyk7XHJcblxyXG4gICAgICAgICRlbGVtXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcclxuICAgICAgICAgICAgLm9mZignY2xpY2snLCBvbkFjdGl2ZUNsaWNrKVxyXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgb25JbmFjdGl2ZUNsaWNrKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25JbmFjdGl2ZUNsaWNrKCkge1xyXG4gICAgICAgIHZhciAkZWxlbSA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICRkcm9wID0gJGVsZW0ubmV4dCgpO1xyXG5cclxuICAgICAgICBjbG9zZUFueU9wZW4oKTtcclxuICAgICAgICAkZHJvcC5hZGRDbGFzcygnaW4nKTtcclxuICAgICAgICBzaWRlYmFyLmFkZENsYXNzKCdpbicpO1xyXG5cclxuICAgICAgICAkZWxlbVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIC5vZmYoJ2NsaWNrJywgb25JbmFjdGl2ZUNsaWNrKVxyXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgb25BY3RpdmVDbGljayk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhc09wZW5BbnkoKSB7XHJcbiAgICAgICAgcmV0dXJuICEhc2lkZWJhci5maW5kKCcuY3JpcC1kcm9wLmluJykubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlQW55T3BlbigpIHtcclxuICAgICAgICBzaWRlYmFyLmZpbmQoJy5jcmlwLWRyb3AuaW4nKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWxlbSkge1xyXG4gICAgICAgICAgICB2YXIgJGVsZW0gPSAkKGVsZW0pO1xyXG4gICAgICAgICAgICBpZiAoJGVsZW0uaGFzQ2xhc3MoJ2luJykpIHtcclxuICAgICAgICAgICAgICAgICRlbGVtXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLnByZXYoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn0pKHdpbmRvdy5jcmlwIHx8ICh3aW5kb3cuY3JpcCA9IHt9KSwgalF1ZXJ5KTsiXSwiZmlsZSI6ImNyaXAtc2lkZWJhci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
