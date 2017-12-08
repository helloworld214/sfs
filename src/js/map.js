/**
 * Created by Lin on 2017/9/29.
 */

!function(){
    var TI = '<img src="{src}" alt="" style="display: block;width: 120px;height: auto;margin: 0 10px 0 0;padding: 0;">';
    var TPL = [
        '<div class="tinfow-wp" style="box-sizing: border-box;">',
        '<div class="tinfow-tb" style="display: table; table-layout: fixed;height: auto;">',
        '<div class="tinfow-img" style="display: table-cell;height: auto;vertical-align: middle;">I</div>',
        '<div class="tinfow-ct" style="display: table-cell;box-sizing:border-box;height: auto;vertical-align: top;">',
        '<h3 class="tinfow-tit" style="font-size: 16px;color: #000;font-weight: 500;text-align: left;margin: 0;padding: 0;">T</h3>',
        '<p class="tinfow-sum" style="font-size: 14px;color: #666;text-align: left;margin: 5px 0;padding: 0;line-height: 1.5;max-width: 260px;">S</p>',
        '<span class="tinfow-tel" style="display: block;font-size: 14px;color: #666;text-align: left;margin: 0;padding: 0;">E</span>',
        '</div></div></div>'
    ].join('');
    var style=[{featureType:"poi",elementType:"labels",stylers:{visibility:"off"}},{featureType:"subway",elementType:"all",stylers:{visibility:"off"}},{featureType:"local",elementType:"all",stylers:{color:"#ffffff",weight:"0.3"}},{featureType:"green",elementType:"all",stylers:{color:"#e6e6e6"}},{featureType:"water",elementType:"all",stylers:{color:"#ededed"}},{featureType:"land",elementType:"all",stylers:{color:"#f7f7f7"}},{featureType:"manmade",elementType:"all",stylers:{color:"#f7f7f7",visibility:"off"}},{featureType:"building",elementType:"all",stylers:{color:"#f2f2f2"}},{featureType:"highway",elementType:"geometry",stylers:{color:"#ffffff",weight:"0.5"}},{featureType:"arterial",elementType:"all",stylers:{color:"#ffffff",weight:"0.3"}},{featureType:"railway",elementType:"all",stylers:{visibility:"off"}},{featureType:"highway",elementType:"labels.text.fill",stylers:{color:"#9f9f9f"}},{featureType:"arterial",elementType:"labels.text.fill",stylers:{color:"#b4b4b4",weight:"0.1"}},{featureType:"label",elementType:"labels.text.fill",stylers:{color:"#666666"}},{featureType:"administrative",elementType:"all",stylers:{}},{featureType:"local",elementType:"labels.text.fill",stylers:{color:"#dfdfdf"}},{featureType:"highway",elementType:"labels.text.stroke",stylers:{color:"#ffffff"}},{featureType:"highway",elementType:"labels.icon",stylers:{visibility:"off"}},{featureType:"label",elementType:"labels.text.stroke",stylers:{color:"#ffffff"}},{featureType:"boundary",elementType:"all",stylers:{}}];
    var FN = 'function';
    var TeslaMap = function(selector, options){
        var df = {
            center: '114.081685,22.550677',
            zoom: 16,
            bindList: true,
            addressSelector: '.tmaddritem',
            mPointAttr: 'data-location',
            mTitleSeletor: '.tmtitle',
            mSummarySeletor: '.tmsummary',
            mTelSeletor: '.tmtel',
            markIconSrc: 'marker.png',
            marker: {
                point: '114.081685,22.550677',
                tips: 'tesla',
                title: 'Tesla215',
                summary: 'Tesla is a man...',
                tel: '1234567'
            },
            style: style,
            controler: [1, 1],
            wheelZoom: true,
            drawable: true,
            dbClickZoom: true,
            enableKeyboard: false,
        };
        this.wrap = $(selector).first();
        this.ops = $.extend(df, options || {});
        this.bMap = new BMap.Map(this.wrap.get(0));
        this.markers = {};
        this.init();
    };
    TeslaMap.prototype = $.extend({}, TeslaMap.prototype, {
        init: function(){
            var s = this.ops;
            s.style && this.bMap.setMapStyle({styleJson: s.style});
            s.wheelZoom ? this.bMap.enableScrollWheelZoom() : this.bMap.disableScrollWheelZoom();
            s.drawable ? this.bMap.enableDragging() : this.bMap.disableDragging();
            s.dbClickZoom ? this.bMap.enableDoubleClickZoom() : this.bMap.disableDoubleClickZoom();
            s.enableKeyboard ? this.bMap.enableKeyboard() : this.bMap.disableKeyboard();
            s.controler && this.addControl(s.controler[0], s.controler[1]);
            this.setCenter(this.ops.center);
            this.addMarkers(this.ops.marker);
            this.ops.bindList && _click(this, this.ops.addressSelector);
            return this;
        },
        addMarkers: function(marker, callback){
            if(!marker || marker.point.indexOf(',') === -1){
                return;
            }
            var self = this;
            _createIcon(this.ops.markIconSrc, function(c){
                var a = marker.point.split(','),
                    p = new BMap.Point(a[0], a[1]),
                    m = new BMap.Marker(p, {icon: c}),
                    w = _getInfoWindow(marker.title, marker.summary, marker.tel);
                self.bMap.addOverlay(m);
                marker.tips && m.setLabel(_getTips(marker.tips, c));
                m.addEventListener('click', function(){
                    this.openInfoWindow(w);
                }, false);
                self.markers[marker.point] = {point: p, marker: m, infoWindow: w};
                typeof callback === FN && callback.call(self, self.markers);
            });
            return this;
        },
        removeMarker: function(point){
            this.bMap.removeOverlay(this.markers[point].marker);
            this.markers[point] = void 0;
            return this;
        },
        update: function(center, zoom){
            this.setCenter(center, zoom);
            return this;
        },
        setCenter: function(point, zoom){
            if(point.indexOf(',') === -1){
                return;
            }
            var a = point.split(','),
                p = new BMap.Point(a[0], a[1]),
                z = +zoom ? zoom : this.ops.zoom;
            this.bMap.centerAndZoom(p, z);
            return this;
        },
        unBindList: function(){
            $(document).off('click.tm');
            return this;
        },
        addControl: function(anchor, type){
            var a, t, controler;
            switch (anchor){
                case 2: a = BMAP_ANCHOR_TOP_RIGHT; break;
                case 3: a = BMAP_ANCHOR_BOTTOM_LEFT; break;
                case 4: a = BMAP_ANCHOR_BOTTOM_RIGHT; break;
                default: a = BMAP_ANCHOR_TOP_LEFT;
            }
            switch (type){
                case 2: t = BMAP_NAVIGATION_CONTROL_SMALL; break;
                case 3: t = BMAP_NAVIGATION_CONTROL_PAN; break;
                case 4: t = BMAP_NAVIGATION_CONTROL_ZOOM; break;
                default: t = BMAP_NAVIGATION_CONTROL_LARGE;
            }
            controler = new BMap.NavigationControl({anchor: a, type: t});
            this.bMap.addControl(controler);
        },
        destroy: function(){
            this.unBindList();
            this.wrap.html('');
            this.bMap = null;
            this.markers = null;
            return this;
        }

    });

    function _createIcon(iconSrc, callback){
        if(!iconSrc){
            typeof callback === FN && callback(undefined);
            return;
        }
        var img = new Image();
        img.addEventListener('load', function(){
            var w = img.naturalWidth,
                h = img.naturalHeight,
                s = new BMap.Size(w, h),
                c = new BMap.Icon(iconSrc, s);
            typeof callback === FN && callback(c);
        }, false);
        img.src = iconSrc;
    }

    function _getTips(tips, style){
        var o = {
                offset: new BMap.Size(style ? style.size.width / 2 : 10, 0)
            },
            label = new BMap.Label(tips || '', o);
        label.setStyle({
            padding: '2px 5px',
            border: '1px solid #999',
            color : '#666',
            fontSize : '12px',
            height : 'auto',
            lineHeight : 1,
            fontFamily: 'micorsoft yahei',
            transform: 'translate(-50%, -100%)',
        });
        return label;
    }

    function _getInfoWindow(tit, sum, tel, img){
        var c = TPL.replace(/[I|T|S|E]/g, function(a){
                switch (a){
                    case 'I': return img ? TI.replace('{src}', img) : '';
                    case 'T': return tit ? tit : '';
                    case 'S': return sum ? sum : '';
                    case 'E': return tel ? tel : '';
                }
            }),
            w = new BMap.InfoWindow(c);
        return w;
    }

    function _click(self, s){
        var tm = self;
        $(document).off('click.tm').on('click.tm', s, function(){
            var t = $(this),
                s = tm.ops,
                p = t.attr(s.mPointAttr),
                ti = t.find(s.mTitleSeletor).text(),
                sm = t.find(s.mSummarySeletor).text(),
                te = t.find(s.mTelSeletor).text(),
                m = {
                    point: p,
                    tips: '',
                    title: ti,
                    summary: sm,
                    tel: te
                },
                ms = tm.bMap.getOverlays();
            ms.forEach(function(item){
                item.hide();
            });
            tm.setCenter(p, s.zoom);
            tm.addMarkers(m, function(mks){
                var omk = mks[p];
                omk.marker.openInfoWindow(omk.infoWindow);
            });

        });
    }

    window.TeslaMap = TeslaMap;
}();