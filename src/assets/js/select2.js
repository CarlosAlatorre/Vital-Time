$(document).ready(function(){

    $('.selectbox').select({
        search: false
    });

    $('.selectbox-search').select();

});


// --------------------------------------------
//	Select Plugin - by Rapzac
// --------------------------------------------
//
//  This plugin makes it posible to style
//  your own selectboxes, cross browsers.
//
// --------------------------------------------
(function($) {


    var map = {
        wrapper: '<div id="%s" class="%s"></div>',



        caret: '<i class="%s caret">%s</i>',
        checkmark: '<i class="%s check">%s</i>',
        img: '<img src="%s">',
        icon: '<i class="icon %s"></i>',
    };

    var map = {
        wrapper: {
            id: '',
            class: 'select-wrapper',
            selector: '.select-wrapper'
        },
        button: {
            id: '',
            class: 'select-btn',
            selector: '.select-btn'
        },
        label:{
            id: '',
            class: 'label',
            selector: '.label'
        },
        list: {
            id: '',
            class: 'select-list',
            selector: '.select-list'
        },
        group: {
            id: '',
            class: 'group',
            selector: '.group'
        },
        option: {
            id: '',
            class: 'option',
            selector: '.option'
        },
        search: {
            id: '',
            class: 'search',
            selector: '.search',
            input: {
                id: '',
                class: '',
                name: 'search',
                type: 'search',
                selector: 'input',
                value: ''
            },
            noResult: {
                id: '',
                class: 'no-result',
                selector: '.no-result'
            },
            icon: {
                id: '',
                class: 'icon',
                selector: '.icon'
            },
            clear: {
                id: '',
                class: 'clear',
                selector: '.clear'
            }
        }
    }

    $.fn.select = function(options, callback) {

        // --------------------------------------------
        //	Settings
        // --------------------------------------------

        var settings = $.extend(true, {
            container: false,                 // Stick to Container | Default: false
            placeholder: 'Choose Something',  // No Value Placeholder | Default: 'Choose Something'
            closeOnSelect: true,              // Close Selectbox on select - NOT MULTiPLE

            search: {                         // Enable Search | Default: true
                name: 'search',                 // - Search Input Name | Default: search
                placeholder: 'Search...',       // - Search Input Placeholder | Default: Search...
                resetOnClose: true,             // - Reset Search Input On Close | Default: true
                noResult: 'No Result',          // - No Result Text | Default: No Result
                icons: {                        // # ICONS
                    search: 'mdi mdi-magnify',    // - Search icon | Default: mdi mdi-magnify
                    clear: 'mdi mdi-close',       // - Clear icon | Default: mdi mdi-close
                },
            },

            caret: {                          // Caret
                class: 'mdi mdi-chevron-down',  // - Caret Class | Default: mdi mdi-chevron-down
                html: ''                        // - Caret Html | Default: false
            },

            checkmark: {                      // Multiple Select Checkmark
                class: 'mdi mdi-check',         // - Icon Class | Default: mdi mdi-check
                html: ''                        // - Icon Html | Default: false
            }
        }, options);

        // --------------------------------------------
        //	Plugin Global Variables
        // --------------------------------------------
        var self = this,

            // selectbox type
            type = self.attr('type'),

            // Caret
            caret = '<i class="'+settings.caret.class+' caret">'+settings.caret.html+'</i>',

            // Checkmark
            checkmark = '<i class="'+settings.checkmark.class+' check">'+settings.checkmark.html+'</i>';


        // --------------------------------------------
        //	Initialize
        // --------------------------------------------
        self.each(function(e){
            var $this = $(this),
                initialized = $this.attr('select-box') == 'initialized' ? true : false,
                type = $this.attr('type'),
                multiple = $this.attr('multiple') != undefined ? true : false;

            if(!initialized){
                $this.wrap('<div id="'+map.wrapper.id+'" class="'+map.wrapper.class+'"></div>');
                $this.after(list($this));
                $this.after('<button type="button" id="'+map.button.id+'" class="'+map.button.class+'" select-box="hidden"><span id="'+map.label.id+'" class="'+map.label.class+'"></span> '+caret+'</button>');

                $this.attr('select-box', 'initialized');
            }

        });

        // --------------------------------------------
        //	Event Function
        // --------------------------------------------

        self.on({
            change: function(){
                var $this = $(this),
                    selected = $this.find(':selected'),
                    multiple = $this.attr('multiple') != undefined ? true : false,
                    list = $this.siblings(map.list.selector),
                    btn = $this.siblings(map.button.selector),
                    label = btn.find(map.label.selector),
                    labelTxt = "";

                list.find('[selected]').removeAttr("selected").find('.check').remove();

                $.each(selected, function(key, value){
                    var $this = $(value),
                        txt = $this.text(),
                        img = $this.attr('img') != undefined ? '<img src="'+$this.attr('img')+'">' : '',
                        icon = $this.attr('icon') != undefined ? '<i class="icon '+$this.attr('icon')+'"></i>' : '',
                        target = list.find('li[value="'+$this.attr('value')+'"]');

                    if(!multiple){
                        target.siblings().removeAttr('selected');
                        labelTxt += img+icon+txt;
                    } else {
                        target.attr('checked', '');
                        target.prepend(checkmark);
                        labelTxt += img+icon+txt+', ';
                    }

                    target.attr('selected', '');
                });

                if(labelTxt == ""){
                    if($this.attr('placeholder') != undefined){
                        labelTxt = $this.attr('placeholder');
                    } else {
                        labelTxt = settings.placeholder;
                    }
                } else {
                    if(multiple){
                        labelTxt = labelTxt.substring(0, labelTxt.length-2);
                    }
                }

                if(settings.closeOnSelect && !multiple){
                    btn.attr('select-box', 'hidden');
                    list.hide();
                }

                if(!multiple){
                    list.find(map.search.clear.selector).trigger('click');
                }

                label.html(labelTxt);
            }
        });

        self.trigger('change');

        // --------------------------------------------
        //	Helper Function
        // --------------------------------------------

        function list(element){

            var html = '';

            html += '<ul id="'+map.list.id+'" class="'+map.list.class+'">';

            if(settings.search){
                html += '<li id="'+map.search.id+'" class="'+map.search.class+'">';
                html +=   '<i id="'+map.search.icon.id+'" class="'+settings.search.icons.search+' '+map.search.icon.class+'"></i>';
                html +=   '<input id="'+map.search.input.id+'" type="'+map.search.input.type+'" name="'+settings.search.name+'" placeholder="'+settings.search.placeholder+'">';
                html +=   '<i id="'+map.search.clear.id+'" class="'+settings.search.icons.clear+' '+map.search.clear.class+'"></i>';
                html += '</li>';

                html += '<li id="'+map.search.noResult.id+'" class="'+map.search.noResult.class+'">'+settings.search.noResult+'</li>';
            }

            element.find('option').each(function(){
                var $this = $(this),
                    text = $this.html(),
                    value = $this.attr('value'),
                    select = $this.closest('select'),
                    multiple = select.attr('multiple') != undefined ? true : false,
                    disabled = $this.attr('disabled') != undefined ? 'disabled' : '',
                    selected = $this.attr('selected') != undefined ? 'selected' : '',
                    defaults = $this.attr('default') != undefined ? 'default' : '',
                    placeholder = $this.attr('placeholder') != undefined ? 'placeholder' : '',
                    img = $this.attr('img') != undefined ? '<img src="'+$this.attr('img')+'">' : '',
                    icon = $this.attr('icon') != undefined ? '<i class="icon '+$this.attr('icon')+'"></i>' : '';

                if(!$this.parents('optgroup').length > 0){
                    if(multiple){
                        var check = selected ? checkmark : '';
                    } else {
                        var check = '';
                    }

                    html += '<li id="'+map.option.id+'" class="'+map.option.class+'" value="'+value+'" '+placeholder+' '+defaults+' '+disabled+' '+selected+'>'+img+icon+check+text+'</li>';
                } else if($this.is(':first-child')) {
                    var parent = $this.parent(),
                        label = $this.parent().attr('label');

                    html += '<li id="'+map.group.id+'" class="'+map.group.class+'">';
                    html +=   '<span>'+label+'</span>';
                    html +=   '<ul>';

                    parent.find('option').each(function(){
                        var $this = $(this),
                            text = $this.html(),
                            value = $this.attr('value'),
                            select = $this.closest('select'),
                            multiple = select.attr('multiple') != undefined ? true : false,
                            disabled = $this.attr('disabled') != undefined ? 'disabled' : '',
                            selected = $this.attr('selected') != undefined ? 'selected' : '',
                            defaults = $this.attr('default') != undefined ? 'default' : '',
                            img = $this.attr('img') != undefined ? '<img src="'+$this.attr('img')+'">' : '',
                            icon = $this.attr('icon') != undefined ? '<i class="icon '+$this.attr('icon')+'"></i>' : '';

                        if(multiple){
                            var check = selected ? checkmark : '';
                        } else {
                            var check = '';
                        }

                        html += '<li id="'+map.option.id+'" class="'+map.option.class+'" value="'+value+'" '+disabled+' '+selected+'>'+img+icon+check+text+'</li>';
                    });

                    html +=   '</ul>';
                    html += '</li>';
                }
            });

            html += '</ul>';

            return html;
        }
    };


    // --------------------------------------------
    //	Global Event Functions
    // --------------------------------------------

    $(document).on({
        click: function(){
            var $this = $(this),
                multiple = $this.siblings('select').attr('multiple') != undefined ? true : false
            list = $this.siblings(map.list.selector);

            $(document).find(map.wrapper.selector+' '+map.button.selector).not($this).attr('select-box', 'hidden');
            $(document).find(map.wrapper.selector+' '+map.list.selector).hide();

            if($this.attr('select-box') != "visible"){
                $this.attr('select-box', 'visible');
                list.show();
            } else {
                $this.attr('select-box', 'hidden');
                list.hide();

                list.find(map.search.clear.selector).trigger('click');
            }
        }
    }, map.button.selector);

    $(document).on({
        click: function(){
            var $this = $(this),
                select = $this.parents(map.list.selector).siblings('select'),
                target = select.find('option[value="'+$this.attr('value')+'"]'),
                multiple = select.attr('multiple') != undefined ? true : false,
                disabled = target.attr('disabled') != undefined ? true : false,
                selected = target.is(':selected') ? true : false;

            if(!disabled){
                if(!selected){
                    target.prop('selected', true);
                } else {
                    if(multiple){
                        target.prop('selected', false);
                    }
                }
            }

            select.trigger('change');
        }
    }, map.list.selector+' '+map.option.selector);

    $(document).on({
        keyup: function(){
            var search = $(this).val(),
                parent = $(this).closest(map.list.selector),
                noresult = parent.find(map.search.noResult.selector),
                contain = parent.find('li'+map.option.selector+':not([placeholder]):Contains('+search+')');

            parent.find('li'+map.option.selector+':not(:Contains('+search+'))').hide();

            parent.find(map.group.selector).each(function(){
                var $this = $(this),
                    test = $(this).find('li'+map.option.selector+':Contains('+search+')');

                if(test.length > 0){
                    test.show();
                    $this.show();
                } else {
                    $this.hide();
                }
            });

            // Siblings with Matching Value
            if(contain.length > 0){
                contain.show();
                noresult.hide();
            } else {
                noresult.show();
            }

            if(search != ''){
                parent.find(map.search.clear.selector).css({ 'display': 'flex' });
            } else {
                parent.find(map.search.clear.selector).hide();
            }
        }
    }, map.wrapper.selector+' '+map.search.selector+' '+map.search.input.selector);

    $(document).on({
        click: function(){
            $(this).siblings('input').val('');
            $(this).siblings('input').keyup();
            $(this).siblings('input').focus();
        }
    }, map.wrapper.selector+' '+map.search.selector+' '+map.search.clear.selector);


    // --------------------------------------------
    //	Expressions
    // --------------------------------------------
    // Contains filter pseudo selector
    // non-case-sensitive Contains selector
    // --------------------------------------------

    jQuery.expr[':'].Contains = function(a,i,m){
        return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
    };

})(jQuery);
