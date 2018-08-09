﻿(function ($) {
    var debug = true;
    window.IE = !!window.ActiveXObject || 'ActiveXObject' in window;
    window.Moblie = /(iPhone|iPod|Android|ios|SymbianOS)/i.test(navigator.userAgent);
    window['mozlite-ready-functions'] = [];
    window.$onready = function (func) {
        ///<summary>当前文档或弹窗完成时候执行的方法。</summary>
        ///<param name="func" type="Function">方法。</param>
        window['mozlite-ready-functions'].push(func);
    };
    //查询字符串
    window.$query = {};
    if (location.search) {
        function split(current) {
            if (!current) return;
            var index = current.indexOf('=');
            if (index != -1)
                $query[current.substr(0, index)] = current.substr(index + 1);
        };
        var qs = location.search.substr(1);
        var index = qs.indexOf('&');
        while (index != -1) {
            split(qs.substr(0, index));
            qs = qs.substr(index + 1);
            index = qs.indexOf('&');
        }
        split(qs);
    }
    window.$href = function () {
        if (arguments.length == 0) {
            location.href = location.href;
            return;
        }
        if (arguments.length == 2)
            $query[arguments[0]] = arguments[1];
        else if (typeof arguments[0] == "object") {
            var args = arguments[0];
            for (var i in args) {
                $query[i] = args[i];
            }
        }
        var search = [];
        for (var i in $query) {
            search.push(i + '=' + $query[i]);
        }
        if (search.length > 0)
            location.href = '?' + search.join('&');
        else
            location.href = location.href;
    };
    $.fn.checkedVal = function () {
        var values = [];
        this.find('input[type=checkbox], input[type=radio]').each(function () {
            if (this.checked)
                values.push(this.value);
        });
        return values.join(',');
    };
    $.fn.dset = function (key, func) {
        ///<summary>获取对象的缓存数据。</summary>
        ///<param name="key" type="String">缓存键。</param>
        ///<param name="func" type="Function">如果数据不存在返回的数据值函数。</param>
        ///<returns type="String">返回当前存储的值。</returns>
        var value = this.data(key);
        if (value) {
            return this.data(key);
        }
        value = func();
        this.data(key, value);
        return value;
    };
    $.fn.exec = function (func) {
        ///<summary>如果当前选择器的元素存在[可以使用no-js样式忽略]，则执行func方法，并将当前元素对象作为参数。</summary>
        ///<param name="func" type="Function">执行方法。</param>
        if (this.length > 0) {
            return this.each(function () {
                var current = $(this);
                if (!current.hasClass('no-js')) {
                    func(current);
                }
            });
        }
        return this;
    };
    $.fn.createObjectURL = function () {
        ///<summary>预览文件地址，当前元素必须为input[type=file]。</summary>
        if (!this.is('input') || this.attr('type') !== 'file')
            return null;
        if (navigator.userAgent.indexOf("MSIE") > 0) return this.val();
        if (window.createObjectURL) return window.createObjectURL(this[0].files[0]);
        if (window.URL) return window.URL.createObjectURL(this[0].files[0]);
        if (window.webkitURL) return window.webkitURL.createObjectURL(this[0].files[0]);
        return null;
    };
    $.fn.js = function (name, value) {
        ///<summary>获取或设置js-开头的属性。</summary>
        ///<param name="name" type="String">属性名称。</param>
        ///<param name="value" type="Object">属性值。</param>
        if (value) return this.attr('js-' + name, value);
        return this.attr('js-' + name);
    };
    $.fn.targetElement = function (def) {
        ///<summary>返回当前元素内js-target属性指示的元素对象，如果不存在就为当前实例对象。</summary>
        ///<param name="def" type="Object">没找到对象默认对象，没设置表示当前对象。</param>
        var target = $(this.js('target'));
        if (target.length > 0)
            return target;
        return def || this;
    };
    $.fn.formSubmit = function (success, error) {
        ///<summary>提交表单。</summary>
        var form = this;
        var data = new FormData(this[0]);
        var submit = form.find('[js-submit=true],[type=submit]').attr('disabled', 'disabled');
        var icon = submit.find('i.fa');
        var css = icon.attr('class');
        icon.attr('class', 'fa fa-spinner fa-spin');
        $.ajax({
            type: "POST",
            url: form.attr('action') || location.href,
            contentType: false,
            processData: false,
            data: data,
            success: function (d) {
                submit.removeAttr('disabled').find('i.fa').attr('class', css);
                if (success) {
                    success(d, form);
                    return;
                }
                if (d.message) {
                    $alert(d.message, d.type, function () {
                        if (d.data && d.data.url)
                            location.href = d.data.url;
                        else if (d.type === 'success')
                            location.href = location.href;
                    });
                }
            },
            error: function (e) {
                submit.removeAttr('disabled').find('i.fa').attr('class', css);
                if (e.status === 401) {
                    $alert('需要登入才能够执行此操作！<a onclick="location.href = \'/login\';" href="javascript:;">点击登入...</a>', 'warning');
                    return;
                }
                else if (error) error(e);
                else if (debug) document.write(e.responseText);
                else $alert('很抱歉，发生了错误！');
            }
        });
        return false;
    };
    $.fn.loadModal = function (url) {
        ///<summary>显示当前地址的Modal模式窗口。</summary>
        ///<param name="url" type="string">URL地址。</param>
        var s = this;
        var current = s.dset('js-modal', function () {
            return $('<div class="js-modal modal fade" data-backdrop="static"><div>')
                .appendTo(document.body)
                .data('target', s.targetElement());
        });
        current.load(url,
            function () {
                var form = current.find('form');
                if (form.length > 0) {
                    if (!form.attr('action'))
                        form.attr('action', url);
                    if (form.find('input[type=file]').length > 0)
                        form.attr('enctype', 'multipart/form-data');
                    current.find('[js-submit=true]').click(function () {
                        form.formSubmit(function (d, form) {
                            var func = s.js('submit');
                            if (func) {
                                $call(s.js('submit'), d, form);
                                return;
                            }
                            if (d.message) {
                                var errmsg = current.find('div.modal-alert');
                                if (errmsg.length > 0 && d.type !== 'success') {
                                    errmsg.attr('class', 'modal-alert text-' + d.type).show().find('.errmsg').html(d.message);
                                    return;
                                }
                                $alert(d.message, d.type, function () {
                                    if (d.data && d.data.url)
                                        location.href = d.data.url;
                                    else if (d.type === 'success')
                                        location.href = location.href;
                                });
                                if (d.type === 'success')
                                    current.data('bs.modal').hide();
                            }
                            else if (d.data && d.data.url)
                                location.href = d.data.url;
                            else if (d.type === 'success')
                                location.href = location.href;
                        });
                    });
                }
                $readyExec(current);
            }).modal();
    };
    window.$call = function (name) {
        ///<summary>执行方法。</summary>
        ///<param name="name" type="String">方法名称。</param>
        var func = window;
        name = name.split('.');
        for (var i in name) {
            func = func[name[i]];
        }
        if (typeof func === 'function') {
            var args = [];
            for (var j = 1; j < arguments.length; j++) {
                args.push(arguments[j]);
            }
            return func.apply(null, args);
        }
        return null;
    };
    window.$alert = function (message, type, func) {
        ///<summary>显示警告消息。</summary>
        if (typeof message === 'object' && message) {
            type = message.type;
            message = message.message;
        }
        if (!message) return;
        var modal = $(document.body)
            .dset('js-alert',
            function () {
                return $('<div class="js-alert modal fade" data-backdrop="static"><div class="modal-dialog"><div class="modal-content"><div class="modal-body" style="padding: 50px 30px 30px;"><div class="col-sm-2"><i style="font-size: 50px;"></i></div> <span class="col-sm-10" style="line-height: 26px; padding-left: 0;"></span></div><div class="modal-footer"><button type="button" class="btn btn-primary"><i class="fa fa-check"></i> 确定</button></div></div></div></div>')
                    .appendTo(document.body);
            });
        var body = modal.find('.modal-body');
        type = type || 'warning';
        if (type === 'success')
            body.attr('class', 'modal-body row text-success').find('i').attr('class', 'fa fa-check');
        else
            body.attr('class', 'modal-body row text-' + type).find('i').attr('class', 'fa fa-warning');
        body.find('span').html(message);
        var button = modal.find('button').attr('class', 'btn btn-' + type);
        if (func) {
            button.removeAttr('data-dismiss').bind('click', function () {
                if (typeof func === 'function') {
                    func(modal.data('bs.modal'));
                    modal.data('bs.modal').hide();
                } else {
                    location.href = location.href;
                }
            });
        }
        else button.attr('data-dismiss', 'modal').unbind('click');
        modal.modal('show');
    };
    window.$ajax = function (url, data, success, error) {
        $('#js-loading').fadeIn();
        $.ajax({
            url: url,
            data: data,
            dataType: 'JSON',
            type: 'POST',
            success: function (d) {
                $('#js-loading').fadeOut();
                var callback = d.data && success;
                if (d.message && d.type)
                    $alert(d.message, d.type, d.type === 'success' && !callback);
                if (callback)
                    success(d.data);
            },
            error: function (resp) {
                $('#js-loading').fadeOut();
                if (resp.status === 401) {
                    $alert('需要登陆才能够执行此操作！<a href="/login">点击登陆...</a>', 'warning');
                    return;
                }
                if (error) error(resp);
                else document.write(resp.responseText);
            }
        });
    };
    window.$readyExec = function (context) {
        function exec(name, func) {
            var selector = $('[' + name + ']', context);
            if (selector.length > 0) {
                selector.each(function () {
                    var current = $(this);
                    var value = current.attr(name);
                    if (!current.hasClass('no-js') && value !== 'no-js') {
                        func(current, value);
                    }
                });
            }
        };
        //href
        exec('_href',
            function (s, v) {
                if (!v || v === 'javascript:;' || v === 'javascript:void(0);')
                    return;
                s.css('cursor', 'pointer')
                    .click(function () {
                        var target = s.attr('target') || s.js('target');
                        if (target)
                            window.open(v, target);
                        else
                            location.href = v;
                    });
            });
        //hover
        exec('_hover',
            function (s, v) {
                s.mouseenter(function (e) {
                    var $this = $(this);
                    var target = $this.target();
                    target.addClass(v);
                    target.mouseleave(function () {
                        target.removeClass(v);
                    }).click(function (ev) {
                        ev.stopPropagation();
                    });
                    $(document).one("click", function () {
                        target.removeClass(v);
                    });
                    e.stopPropagation();
                });
            });
        //focus
        exec('_focus',
            function (s, v) {
                s.focusin(function () {
                    $(this).targetElement().toggleClass(v);
                }).focusout(function () {
                    $(this).targetElement().toggleClass(v);
                });
            });
        //click
        exec('_click',
            function (s, v) {
                s.click(function () {
                    $(this).jsTarget().toggleClass(v);
                });
            });
        //modal
        exec('_modal', function (s, v) {
            s.on('click', function () {
                var url = s.js('url');
                if (!url) {
                    url = s.attr('href');
                    if (!url || url === 'javascript:;' || url === 'javascript:void(0);')
                        url = v;
                }
                s.loadModal(url);
                return false;
            });
        });
        //action
        exec('_action', function (s, v) {
            s.on('click',
                function () {
                    var confirmStr = s.js('confirm');
                    if (confirmStr && !confirm(confirmStr))
                        return;
                    var error = s.js('error');
                    if (error)
                        error = function (d) { $call(s.js('error'), s, d); }
                    $ajax(v, { id: s.js('value') }, function (d) {
                        var success = s.js('success');
                        if (success)
                            $call(success, s, d);
                        else
                            location.href = location.origin + location.pathname;
                    }, error);
                });
        });
        //maxlength
        exec('_maxlength',
            function (s, v) {
                v = parseInt(v);
                if (isNaN(v))
                    return;
                s.keyup(function () {
                    var length = s.val().length;
                    if (length > v) {
                        s.val(s.val().substr(0, v));
                        length = v;
                    }
                    s.targetElement().html(length + ' 个字符');
                });
            });
        window['mozlite-ready-functions'].forEach(function (func) {
            func(context);
        });
    };
    Date.prototype.toFormatString = function (fmt) {
        ///<summary>格式化日期字符串。</summary>
        ///<param name="fmt" type="String">格式化字符串：yyyy-MM-dd HH:mm:ss</param>
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours() % 12, //小时 
            "H+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    String.prototype.toJsonDateString = function (fmt) {
        ///<summary>格式化日期字符串。</summary>
        ///<param name="fmt" type="String">格式化字符串：yyyy-MM-dd HH:mm:ss</param>
        var date = new Date(this.replace('T', ' '));
        return date.toFormatString(fmt || 'yyyy-MM-dd hh:mm:ss');
    };
    String.prototype.randomSuffix = function () {
        ///<summary>添加随机码。</summary>
        if (this.indexOf('?') === -1)
            return this + '?_=' + (+new Date);
        return this + '&_=' + (+new Date);
    };
    window.$selectedText = function () {
        ///<summary>获取当前鼠标选中的字符串。</summary>
        if (window.getSelection)
            return window.getSelection().toString();
        if (document.selection)
            return document.selection.createRange().text;
        return null;
    };
    window.$selectedHtml = function () {
        ///<summary>获取当前鼠标选中的HTML字符串。</summary>
        if (window.getSelection) {
            var docFragment = window.getSelection().getRangeAt(0).cloneContents();
            var tempDiv = document.createElement("div");
            tempDiv.appendChild(docFragment);
            return tempDiv.innerHTML;
        }
        else if (document.selection)
            return document.selection.createRange().htmlText;
        return null;
    };
    window.$replaceSelection = function (html) {
        ///<summary>替换当前鼠标选中的字符串。</summary>
        if (window.getSelection) {
            var sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                var range = sel.getRangeAt(0);
                range.deleteContents();
                var el = document.createElement("div");
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if (document.selection && document.selection.type !== "Control") {
            document.selection.createRange().pasteHTML(html);
        }
    };

    window.$upload = function (url, file, success) {
        ///<summary>上传图片。</summary>
        ///<param name="url" type="String">上传地址。</param>
        ///<param name="file" type="HTMLElement">当前文件实例。</param>
        ///<param name="success" type="Function">回调函数。</param>
        var data = new FormData();
        data.append("file", file);
        $.ajax({
            type: "POST",
            url: url,
            contentType: false,
            processData: false,
            data: data,
            success: function (d) {
                if (d.message && d.type !== 'success') {
                    $alert(d.message, d.type);
                }
                if (d.type === 'success' && success)
                    success(d.data);
            },
            error: function (e) {
                if (e.status === 401) {
                    $alert('需要登陆才能够上传文件！<a href="/login">点击登陆...</a>', 'warning');
                    return;
                }
                $alert(e.responseText);
            }
        });
    };

    function Mozmd(md) {
        var me = this;
        this.md = typeof md === 'string' ? document.querySelector(md) : md;
        this.edit = this.md.querySelector('.mozmd-edit');
        //更新预览
        this.edit.onkeyup = update;
        //黏贴截图
        var uploadUrl = this.md.getAttribute('upload');
        if (uploadUrl)
            this.edit.onpaste = function (e) {
                var clipboardData = e.clipboardData || e.originalEvent.clipboardData;
                if (!(clipboardData && clipboardData.items)) {
                    $alert("该浏览器不支持粘贴操作！");
                    return;
                }
                for (var i = 0, len = clipboardData.items.length; i < len; i++) {
                    var item = clipboardData.items[i];
                    if (item.kind === "file" && item.type.indexOf('image') !== -1) {
                        var pasteFile = item.getAsFile();
                        me.upload(pasteFile);
                    }
                }
            };
        this.preview = this.md.querySelector('.mozmd-preview');
        this.toolbar = this.md.querySelector('.mozmd-toolbar');
        this.isFullscreen = false;
        var counter = attr('counter');
        if (counter)
            this.counter = document.querySelector(counter);

        this.getMD = function () {
            ///<summary>获取Markdown字符串。</summary>
            return me.edit.innerText;
        };

        this.upload = function (file) {
            ///<summary>上传图片。</summary>
            $upload(uploadUrl, file, function (data) {
                me.replace(function (r) { return '![](' + data.url + ')' });
            });
        };

        this.getHTML = function () {
            ///<summary>获取HTML字符串。</summary>
            update();
            return me.preview.innerHTML;
        };

        this.append = function (text) {
            ///<summary>附加代码。</summary>
            if (typeof text === 'function')
                text = text();
            this.edit.appendChild(document.createTextNode(text));
            this.edit.focus();
            update();
        };

        this.replace = function (prefix, suffix) {
            ///<summary>替换当前选中代码。</summary>
            ///<param name="prefix" type="Function|String">前缀或者格式化当前选中字符串的函数。</param>
            ///<param name="suffix" type="String">后缀字符串。</param>
            if (!prefix) return;
            var sel = getSelection();
            if (!sel || sel.rangeCount === 0 || sel.anchorNode.parentNode !== this.edit) {
                this.edit.focus();
            }
            var range = sel.getRangeAt(0);
            var text = range.toString();
            range.deleteContents();
            if (typeof prefix === 'function') {
                text = prefix(text);
            } else
                range.insertNode(document.createTextNode(prefix));
            var node = document.createTextNode(text);
            range.insertNode(node);
            if (suffix)
                range.insertNode(document.createTextNode(suffix));
            range = range.cloneRange();
            range.setStartAfter(node);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            update();
        };

        function attr(name) {
            ///<summary>获取当前属性值。</summary>
            return me.md.getAttribute('js-' + name);
        };

        function update() {
            ///<summary>更新格式化源码。</summary>
            var source = me.getMD();
            me.preview.innerHTML = marked(source);
            if (me.counter) {
                var count = (me.preview.textContent || me.preview.innerText).length;
                me.counter.innerHTML = me.counter.getAttribute('js-format').replace('$count', count);
                me.counter.style.display = 'block';
            }
        };

        var items = {
            bold: function () {
                me.replace('__ ', ' __');
            },
            italic: function () {
                me.replace(' _', '_ ');
            },
            ol: function () {
                me.replace(function (r) {
                    if (r) {
                        var lines = r.replace(/\r/g, '').split('\n');
                        var result = [];
                        for (var i = 0; i < lines.length; i++) {
                            result.push((i + 1) + '. ' + lines[i]);
                        }
                        return result.join('\r\n');
                    }
                    return '1. ';
                });
            },
            ul: function () {
                me.replace(function (r) {
                    if (r) {
                        var lines = r.replace(/\r/g, '').split('\n');
                        var result = [];
                        for (var i = 0; i < lines.length; i++) {
                            result.push('* ' + lines[i]);
                        }
                        return result.join('\r\n');
                    }
                    return '* ';
                });
            },
            quote: function () {
                me.replace(function (r) {
                    if (r) return '\r\n> ' + r + '\r\n';
                    return '> ';
                });
            },
            fullscreen: function () {
                var classes = [];
                me.isFullscreen = false;
                me.md.className.split(' ').forEach(function (c) {
                    if (c !== 'mozmd-fullscreen')
                        classes.push(c);
                    else
                        me.isFullscreen = true;
                });
                if (!me.isFullscreen) {
                    classes.push('mozmd-fullscreen');
                }
                me.md.className = classes.join(' ');
            },
            head: function () {
                me.replace(function (r) {
                    if (r && r[0] === '#')
                        return '#' + r;
                    else
                        return '# ' + r;
                });
            },
            quora: function () {
                me.replace(function (r) {
                    r = r || '';
                    return '`' + r + '`';
                });
            },
            code: function () {
                me.replace(function (r) {
                    r = r || '';
                    return '\r\n``` \r\n' + r + '\r\n```\r\n';
                });
            }
        };
        this.toolbar.querySelectorAll('button[js-action]').forEach(function (el) {
            el.onclick = function () {
                items[el.getAttribute('js-action')]();
            }
        });
    };

    $.fn.mozmd = function () {
        ///<summary>Markdown编辑器。</summary>
        return this.each(function () {
            var md = new Mozmd(this);
            $(this).data('mozmd', md);
            return md;
        });
    };
})(jQuery);
$(document).ready(function () {
    window.$container = $('#modal-container');
    if (window.$container.length === 0)
        window.$container = document.body;
    $readyExec();
});
$onready(function (context) {
    $('.moz-checkbox', context).click(function () {
        $(this).toggleClass('checked');
        if ($(this).hasClass('checked')) {
            $(this).find('input')[0].checked = 'checked';
        } else {
            $(this).find('input').removeAttr('checked');
        }
    });
    $('.moz-radiobox', context).click(function () {
        if ($(this).hasClass('checked')) {
            return;
        }
        $(this).parents('.moz-radioboxlist')
            .find('.moz-radiobox')
            .removeClass('checked')
            .each(function () {
                $(this).find('input').removeAttr('checked');
            });
        $(this).addClass('checked');
        $(this).find('input')[0].checked = 'checked';
    });
    $('.mozmd', context).mozmd();
});
