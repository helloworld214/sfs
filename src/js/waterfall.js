/**
 * Created by Administrator on 2017/9/13/0013.
 */

$(function(){

    // 瀑布流
    var Waterfall = function(options){
        this.defaults = $.extend({
            container: '.grid',
            loader: '.grid-loader',
            showLoaderCls: 'grid-loader-show',
            item: '.grid-item',
            columnWidth: '.grid-sizer',
            scrollAtTarget: '.grid-loader',
            gutter: 0,
            percentPosition: true,
            renderFx: false,
            pageIndex: 0,
            scrollMore: true,
            format: null,
            relayout: false
        }, options || {});
        this.wrap = $(this.defaults.container);
        this.loader = $(this.defaults.loader);
        this.canload = true;
        this.hasMasonry = false;
        this.bindReLayout = false;
        this.maxRequestNum = 1;
        this.crrentIndex = this.defaults.pageIndex;
        this.requestCounter = 0;
        this.bindScrollEvent = false;
        this.defaults.relayout && this.reLayout();
    }

    Waterfall.prototype = $.extend(Waterfall.prototype, {
        init: function(){
            var self = this;
        },
        render: function(list){
            var seft = this,
                setting = this.defaults,
                $list = $(list);
            this.wrap.append($list);
            typeof setting.format === 'function' && setting.format.call(this, this.wrap.find(setting.item));
            if(this.hasMasonry){
                this.wrap.masonry('appended', $list);
            }else{
                this.wrap.masonry({
                    itemSelector: setting.item,
                    columnWidth: setting.columnWidth,
                    gutter: setting.gutter,
                    percentPosition: setting.percentPosition
                });
                setting.renderFx !== false && 'undefined' !== typeof GridFx && new GridFx(seft.wrap.get(0), setting.item + ' > .portfolio-link').render(setting.renderFx);
                this.hasMasonry = true;
            }
            this.wrap.masonry('layout');
            this.canload = this.crrentIndex < this.maxRequestNum;
            this.crrentIndex < this.maxRequestNum && this.crrentIndex++;
            this.hideloader();
        },
        reLayout: function () {
            if (!this.bindReLayout) {
                this.bindReLayout = true;
                var self = this,
                    setting = self.defaults;
                $(window).on('resize', function () {
                    if(!self.hasMasonry){
                        return;
                    }
                    typeof setting.format === 'function' && setting.format.call(self, self.wrap.find(setting.item));
                    self.wrap.masonry('layout');
                });
            }
        },
        showloader: function(){
            this.loader.addClass(this.defaults.showLoaderCls);
        },
        hideloader: function(){
            this.loader.removeClass(this.defaults.showLoaderCls);
        },
        scrollLoad: function(callback){
            if(this.requestCounter >= this.maxRequestNum){
                return;
            }
            var seft = this,
                win = $(window),
                target = $(this.defaults.scrollAtTarget);
            win.on('scroll', function(){
                if(!seft.canload){
                    return;
                }
                var startPos = target.offset().top - win.height(),
                    scrollTop = $(document).scrollTop();
                if(seft.requestCounter < seft.maxRequestNum && scrollTop > startPos){
                    seft.canload = false;
                    seft.showloader();
                    tesla.is(callback, 'function') && callback.call(seft);
                }
            });
        },
        getData: function(query, callback){
            var seft = this;
            if(this.requestCounter < this.maxRequestNum){

                Yfd.ajax.getMultiRecord(query, function(response){
                    query.pageIndex && query.pageIndex++;
                    seft.requestCounter++;
                    seft.maxRequestNum = Math.ceil(response.total / query.pageSize);
                    if(seft.requestCounter < seft.maxRequestNum && !seft.bindScrollEvent){
                        seft.scrollLoad(function(){
                            seft.getData(query, callback);
                        });
                    };
                    tesla.is(callback, 'function') && callback.call(seft, response);
                });
            }

        }
    });

    window.Waterfall = Waterfall;
});
