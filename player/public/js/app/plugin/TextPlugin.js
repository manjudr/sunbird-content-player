var TextPlugin = Plugin.extend({
    _type: 'text',
    _isContainer: false,
    _render: true,
    initPlugin: function(data) {
        var instance = this;
        var fontsize = data.fontsize || 20;
        var dims = this.relativeDims();
        if (data.w) {
            var exp = parseFloat(PluginManager.defaultResWidth * data.w / 100);
            var cw = this._parent.dimensions().w;
            var width = parseFloat(cw * data.w / 100);
            var scale = parseFloat(width / exp);
            fontsize = parseFloat(fontsize * scale);
        }
        var font = fontsize + 'px ' + data.font || 'Arial';
        if (data.weight) {
            font = data.weight + ' ' + font;
        }
        
        var textStr = '';
        if (data.$t || data.__text) {
            textStr = (data.$t || data.__text);
        } else if (data.model) {
            textStr = (this._stage.getModelValue(data.model) || '');
        } else if (data.param) {
            textStr = (this._stage.params[data.param.trim()] || '');
        }
        var text = new createjs.Text(textStr, font, data.color || '#000000');
        
        var align  = (data.align ? data.align.toLowerCase() : 'left');
        var valign = (data.valign ? data.valign.toLowerCase() : 'top');

        text.x = dims.x;
        if (align == 'left') {
            text.x = dims.x;
        } else if (align == 'right') {
            text.x = dims.x + dims.w;
        } else if (align == 'center') {
            text.x = dims.x + dims.w/2;
        }

        if (valign == 'top') {
            text.y = dims.y;
            text.textBaseline = 'top';
        } else if (valign == 'bottom') {
            text.y = dims.y + dims.h;
            text.textBaseline = 'bottom';
        } else if (valign == 'middle') {
            text.y = dims.y + dims.h / 2 ;
            text.textBaseline = 'middle';
        }

        text.lineWidth = dims.w;
        text.textAlign = align;
        text.valign = valign;
        
        this._self = text;
    }
});
PluginManager.registerPlugin('text', TextPlugin);
