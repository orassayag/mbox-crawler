const { Color } = require('../../core/enums/files/colors.enum');

class ColorUtils {

    constructor() { }

    createColorMessage(data) {
        const { message, color } = data;
        if (!message) {
            return '';
        }
        return `${Color[`Fg${color}`]}${message}${Color.Reset}`;
    }
}

const colorUtils = new ColorUtils();
module.exports = colorUtils;